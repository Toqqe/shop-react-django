# Generated by Django 5.0 on 2024-07-16 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_category_product_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='avaliable',
            field=models.BooleanField(default=True),
        ),
    ]
