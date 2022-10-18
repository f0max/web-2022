from django.shortcuts import render
from rest_framework import viewsets
from ozon.serializers import CategorySerializer, ProductSerializer, UserSerializer
from ozon.models import Category, Product, User


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('date_modified')
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('product_name')
    serializer_class = ProductSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('user_login')
    serializer_class = UserSerializer
