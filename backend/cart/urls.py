from django.urls import path
from rest_framework.routers import DefaultRouter

from cart import views

router = DefaultRouter()
router.register(r'', views.CartViewSet, basename="cart")
router.register(r'items', views.CartItemViewSet, basename="cartitem")

urlpatterns = router.urls