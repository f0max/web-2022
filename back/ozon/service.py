import django_filters
from django_filters import rest_framework as filters
from ozon.models import Product, Cart, Sell, Purchase


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class ProductFilter(filters.FilterSet):
    product_name = django_filters.CharFilter(lookup_expr='icontains')
    product_price = filters.RangeFilter()

    class Meta:
        model = Product
        fields = ['product_price', 'product_name']


class CartFilter(filters.FilterSet):
    user = CharFilterInFilter(field_name='user', lookup_expr='in')

    class Meta:
        model = Cart
        fields = ['user']


class PurchasesFilter(filters.FilterSet):
    user = CharFilterInFilter(field_name='user', lookup_expr='in')

    class Meta:
        model = Sell
        fields = ['user']


class BuyesFilter(filters.FilterSet):
    user = CharFilterInFilter(field_name='sell', lookup_expr='in')

    class Meta:
        model = Purchase
        fields = ['sell']