
from rest_framework import serializers

from .models import Orders, OrderItems

class OrderItemSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source='product.title', read_only=True)
    product_price = serializers.DecimalField(source='product.price',max_digits=10,decimal_places=2, read_only=True)
    
    class Meta:
        model = OrderItems
        fields = ['product', 'product_title', 'product_price', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    date_ordered = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    payment_display = serializers.CharField(source='get_payment_display', read_only=True)
    
    class Meta:
        model = Orders
        fields = ['id', 'user', 'items','date_ordered', 'status', 'status_display', 'sum', 'payment', 'payment_display']
