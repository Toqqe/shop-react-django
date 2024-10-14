# Generated by Django 5.0 on 2024-08-21 21:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cart', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_ordered', models.DateTimeField(auto_now_add=True)),
                ('sum', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('status', models.IntegerField(choices=[(1, 'New'), (2, 'Waiting for payment'), (3, 'Paid'), (4, 'Canceled'), (5, 'Ended')], default=1)),
                ('payment', models.IntegerField(choices=[(1, 'PayPal'), (2, 'BLIK'), (3, 'Card')])),
                ('items', models.ManyToManyField(to='cart.cartitem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]