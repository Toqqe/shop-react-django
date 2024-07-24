from django.urls import path

from . import views
urlpatterns = [
    # path('user/<int:pk>/', views.UserView.as_view()),
    
    path('register/', views.UserCreateView.as_view()),
    
    path('logout/', views.LogoutView.as_view()),
    
]
