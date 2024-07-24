from rest_framework import serializers
from .models import Product, Images, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__' #['name',]


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ['id', 'image', 'uploaded_at', 'thumbnail']


class ProductSerializer(serializers.ModelSerializer):
    image = ImagesSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id',
            'title',
            'content',
            'image',
            'created',
            'price',
            'category',
            'avaliable'
        ]
        
        