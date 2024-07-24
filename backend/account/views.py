from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework import status

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken 

from rest_framework.response import Response
# Create your views here.

class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny, ) # HasAPIKey

# class UserView(generics.RetrieveAPIView):
#     serializer_class = UserSerializer
#     permission_classes = () #HasAPIKey

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


