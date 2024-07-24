from django.urls import path

from products import views

urlpatterns = [
    path('', views.ProductListAPIView.as_view()),
    path('category/', views.CategoryListAPIView.as_view()),
    #path('<int:pk>/update'),
    #path('<int:pk>/delete'),
    #path('<int:pk>/')
]
