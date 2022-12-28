from rest_framework import viewsets
from ozon.serializers import *
from ozon.models import *
from django_filters.rest_framework import DjangoFilterBackend
from .service import ProductFilter, CartFilter, PurchasesFilter, BuyesFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('date_modified')
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductFilter
    permission_classes = (IsAuthenticatedOrReadOnly,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('user_login')
    serializer_class = UserSerializer


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all().order_by('id')
    serializer_class = CartSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = CartFilter
    permission_classes = (IsAuthenticatedOrReadOnly,)


class SellViewSet(viewsets.ModelViewSet):
    queryset = Sell.objects.all().order_by('id')
    serializer_class = SellSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = PurchasesFilter
    permission_classes = (IsAuthenticatedOrReadOnly,)


class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all().order_by('id')
    serializer_class = PurchaseSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = BuyesFilter
    permission_classes = (IsAuthenticatedOrReadOnly,)


class PurchaseStatusViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.aggregate(Max('product_price'))
    serializer_class = PurchaseStatusSerializer
    permission_classes = (IsAuthenticated,)


class MinMaxViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = MinMaxSerializer

