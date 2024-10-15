from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

urlpatterns = [
    # path('user/<int:pk>/', views.UserView.as_view()),
    
    path('register/', views.UserCreateView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    
]


router = DefaultRouter()
router.register(r'address', views.AddressView, basename="address")

urlpatterns += router.urls
