from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

urlpatterns = [
    path('register/', views.UserCreateView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    
]


router = DefaultRouter()
router.register(r'address', views.AddressView, basename="address")
router.register(r'user', views.UserGetInfo, basename="user")

urlpatterns += router.urls
