from django.forms.models import model_to_dict
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework.views import APIView
from rest_framework import status

from .serializers import ContactMessageSerializer, CustomTokenObtainPairSerializer, CustomTokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# from products.models import Product
# from products.serializers import ProductSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken 


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer
    
class ContactMessageView(APIView):
    permission_classes = []
    def post(self, request, *args, **kwargs):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def api_home(request, *args, **kwargs):
    """
    DRF API View
    """
    # serializer = ProductSerializer(data=request.data)
    # if serializer.is_valid(raise_exception=True):
    #     # instance = serializer.save()
    #     # instance = form.save()
    #     print(serializer.data)
    #     return Response(serializer.data)
    return Response({"invalid": "not good data"}, status=400)

