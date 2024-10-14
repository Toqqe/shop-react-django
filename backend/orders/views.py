from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .models import Orders, OrderItems
from .serializers import OrderSerializer
from rest_framework.exceptions import ValidationError
from cart.models import CartItem
# Create your views here.

class OrderViewSet(ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [] 
    
    def get_queryset(self):
        user_id = self.request.headers.get('user-id')
        return Orders.objects.filter(user_id=user_id)
    
    def perform_create(self, serializer):
        user_id = self.request.data['user']
        user = self.request.user
        cart_items = CartItem.objects.filter(user_id=user_id)
        total_sum = sum( item.product.price * item.quantity for item in cart_items)
        order = serializer.save(user=user, sum=total_sum, status=1)

        for cart_item in cart_items:
            OrderItems.objects.create(
                order=order,
                product = cart_item.product,
                quantity = cart_item.quantity
            )
        cart_items.delete()