from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .serializers import CartSerializer, CartItemSerializer
from .models import Cart, CartItem
from products.models import Product
# Create your views here.

class CartViewSet(ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [] #IsAuthenticated

    def get_queryset(self):
        print(self.request.user)
        return self.queryset.filter(user=self.request.user)

class CartItemViewSet(ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [] #IsAuthenticated
    
    def create(self, request, *args, **kwargs):
        print(request)
        cart, created = Cart.objects.get_or_create(user=request.user)
        product = Product.objects.get(id=request.data['product_id'])
        cart_item, created_item = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created_item:
            cart_item.quantity += int(request.data['quantity'])
        cart_item.save()
        serializer = self.get_serializer(cart_item)
    
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
    def perform_destroy(self, instance):
        instance.delete()