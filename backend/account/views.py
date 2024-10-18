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

from .models import Addressess

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


