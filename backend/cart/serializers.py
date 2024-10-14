from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Cart, CartItem
from products.serializer import ProductSerializer

User = get_user_model()

        
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    
    class Meta:
        model = CartItem 
        fields = ['id', 'product', 'quantity']
    
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']