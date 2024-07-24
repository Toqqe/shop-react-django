from django.db import models
from django.conf import settings

from django.contrib.auth import get_user_model

User = get_user_model()
# Create your models here.

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.user} Cart'

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    quantity = models.PositiveBigIntegerField(default=1)
    
    def __str__(self):
        return f'{self.product} - {self.user}'


