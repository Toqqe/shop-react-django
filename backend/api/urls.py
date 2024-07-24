from django.urls import path

from rest_framework_simplejwt import views as jwt_views

from api import views



urlpatterns = [
    
    path('token/', views.CustomTokenObtainPairView.as_view()),
    path('token/refresh/', views.CustomTokenRefreshView.as_view()),
    
    path('', views.api_home),
    path('contact/', views.ContactMessageView.as_view())
]
