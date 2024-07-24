from django.db import models
from django.conf import settings
from django.utils.html import mark_safe
from django.contrib.auth import get_user_model


from PIL import Image, ImageOps
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys

User = get_user_model()

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=50, db_index=True)
    
    def __str__(self):
        return self.name

class Images(models.Model):
    image = models.ImageField(upload_to="product_images/%Y-%m-%d/", default="blank-product.png")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    thumbnail = models.ImageField(upload_to="product_images/thumbnail/%Y-%m-%d/", blank=True)
    
    def __str__(self):
        return self.image.url
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.image:
            self.create_thumbnail()

    def create_thumbnail(self):
        if not self.thumbnail:
            image = Image.open(self.image)
            thumbnail = ImageOps.pad(image, (200, 200), color=(255, 255, 255))
            thumbnail = thumbnail.convert('RGB')
            thumbnail_io = BytesIO()
            thumbnail.save(thumbnail_io, format='JPEG', quality=85)
            self.thumbnail.save(self.image.name, InMemoryUploadedFile(
                thumbnail_io, None, self.image.name, 'image/jpeg', sys.getsizeof(thumbnail_io), None))
            
    def thumb_preview(self): #new
        first_thumb = self.thumbnail
        if first_thumb:
            return mark_safe(f'<img src="{first_thumb.url}" width="100"/>')
        else:
            return 'No thumbnail'

class Product(models.Model):
    user = models.ForeignKey(User, default=1, null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=120)
    content = models.TextField(blank=True, null=True)
    image = models.ManyToManyField(Images, blank=True, related_name="product_img")
    created = models.DateTimeField(auto_now=True)
    price = models.DecimalField(max_digits=15, decimal_places=2, default=99.99)
    public = models.BooleanField(default=True)
    avaliable = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.title