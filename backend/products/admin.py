from django.contrib import admin

from .models import Product, Images, Category
# Register your models here.

admin.site.register(Product)
admin.site.register(Images)
admin.site.register(Category)