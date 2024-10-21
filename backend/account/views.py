from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer, AddressSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.viewsets import ModelViewSet

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken 

from rest_framework.response import Response
# Create your views here.

from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str

from django.core.mail import send_mail
from .models import Addressess

import os
from dotenv import load_dotenv
load_dotenv()

class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny, ) # HasAPIKey

class UserGetInfo(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = ()
    
    def get_queryset(self):
        user_id = self.request.headers.get('user-id')
        return self.queryset.filter(id=user_id)
        
    def update(self, request, pk=None):
        user = User.objects.get(id=pk)

        
        if user:
            serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AddressView(ModelViewSet):
    queryset = Addressess.objects.all()
    serializer_class = AddressSerializer
    permission_classes = () 

    def get_queryset(self):
        user_id = self.request.headers.get('user-id')
        return self.queryset.filter(user=user_id)

    def update(self, request, pk=None):
        address = Addressess.objects.get(id=pk)
        if address:
            serializer = self.get_serializer(address, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PasswordReset(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.filter(email__iexact=email).first()
            
        except User.DoesNotExist:
            Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
            
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        reset_link = f"{os.environ.get('PASSWORD_RESET_BASE_URL')}/password-restart-confirm/{uid}/{token}/"
        
        send_mail(
            "Password reset",
            f'Click there to restart password {reset_link}',
            os.environ.get('EMAIL_HOST_USER'),
            [email]
        )
        return Response({"message" : "Password reset link sent"}, status=status.HTTP_200_OK)
        
class PasswordResetConfirm(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        uidb64 = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        
        if not uidb64 or not token or not new_password:
            return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uidb64 = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uidb64)
        except User.DoesNotExist:
            return Response({"error": "Invalid user"}, status=status.HTTP_400_BAD_REQUEST)
        
        if default_token_generator.check_token(user, token):
            user.set_password(new_password)
            user.save()
            return Response({"message":"Password has been reset successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error":"Invalid token"}, status=status.HTTP_400_BAD_REQUEST)