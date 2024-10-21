from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

urlpatterns = [
    path('register/', views.UserCreateView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    path('password-restart/', views.PasswordReset.as_view(), name="password-reset"),
    path('password-restart-confirm/', views.PasswordResetConfirm.as_view(), name="password-reset-confirm")
]


router = DefaultRouter()
router.register(r'address', views.AddressView, basename="address")
router.register(r'user', views.UserGetInfo, basename="user")

urlpatterns += router.urls
