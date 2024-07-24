from rest_framework.response import Response
from rest_framework import generics
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from rest_framework_api_key.permissions import HasAPIKey
from rest_framework.pagination import PageNumberPagination

from .models import Product, Category
from .serializer import ProductSerializer, CategorySerializer
# Create your views here.

class ProductPagination(PageNumberPagination):
    page_size = 8

class ProductListAPIView(generics.ListAPIView):
    permission_classes = [] # HasAPIKey
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer
    filterset_fields = ['id', 'category__id']
    pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    
    
class CategoryListAPIView(generics.ListAPIView):
    permission_classes = [] # HasAPIKey
    queryset = Category.objects.all()
    serializer_class = CategorySerializer