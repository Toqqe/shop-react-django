from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from .serializers import CartSerializer, CartItemSerializer
from .models import Cart, CartItem
from products.models import Product


# Create your views here.

class CartViewSet(ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated,] #IsAuthenticated

    def get_queryset(self):
        user_id = self.request.headers.get('user-id')
        return self.queryset.filter(user=user_id)
        
        #print("user: ", self.request.user)
        #return self.queryset.filter(user=self.request.user)

class CartItemViewSet(ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated,] #IsAuthenticated
    
    def create(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        product = Product.objects.get(id=request.data['product_id'])
        cart_item, created_item = CartItem.objects.get_or_create(user=request.user,cart=cart, product=product)
        if not created_item:
            cart_item.quantity += int(request.data['quantity'])
            cart_item.save()
            serializer = self.get_serializer(cart_item)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        cart_item.save()
        serializer = self.get_serializer(cart_item)
    
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
    def update(self, request, pk=None):
        cart_item = CartItem.objects.get(id=pk)
        if cart_item:
            if int(request.data['quantity']) > 10:
                request.data['quantity'] = 10
                
        serializer = self.get_serializer(cart_item, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
        
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    
    @action(detail=False, methods=['delete'])
    def clear_cart(self, request):
        CartItem.objects.all().delete()
        return Response({"message":"Cart cleared"}, status=status.HTTP_204_NO_CONTENT)
    
    def perform_destroy(self, instance):
        instance.delete()