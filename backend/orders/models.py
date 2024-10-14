from django.db import models
from django.contrib.auth import get_user_model
from cart.models import CartItem
from products.models import Product

User = get_user_model()

# Create your models here.

class Orders(models.Model):
    ORD_STATUS = [
        (1, "New"),
        (2, "Waiting for payment"),
        (3, "Paid"),
        (4, "Canceled"),
        (5, "Ended"),
    ]
    
    PAYMENT_METHOD = [
        (1, "PayPal"),
        (2, "BLIK"),
        (3, "Card"),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_ordered = models.DateTimeField(auto_now_add=True)
    sum = models.DecimalField(default=0,decimal_places=2 , max_digits=10)
    status = models.IntegerField(choices=ORD_STATUS, default=1)
    payment = models.IntegerField(choices=PAYMENT_METHOD)
    
    def __str__(self):
        return f'{self.user} -- {self.date_ordered}'
    
class OrderItems(models.Model):
    order = models.ForeignKey(Orders, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()