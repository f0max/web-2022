import pymysql
from ozon.models import *
from rest_framework import serializers
from django.db.models import Max, Min, Sum


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class SellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sell
        fields = "__all__"


class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'


class MinMaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ''

    def to_representation(self, instance):
        representation = Product.objects.aggregate(Max('product_price'))
        representation.update(Product.objects.aggregate(Min('product_price')))
        return representation


class PurchaseStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ''

    def to_representation(self, instance):
        connection = pymysql.connect(
            host="localhost",
            user="dbuser",
            password="123",
            database="second_db",
            cursorclass=pymysql.cursors.DictCursor
        )

        cur = connection.cursor()
        sql = """
            SELECT ozon_purchase.id, product_name, product, product_price, product_pic, quantity, sell, user, status, sell_date
            FROM ozon_product
            INNER JOIN ozon_purchase
            ON ozon_product.id = ozon_purchase.product
            INNER JOIN ozon_sell
            ON ozon_sell.id = ozon_purchase.sell;
        """
        cur.execute(sql)
        rows = cur.fetchall()
        connection.close()
        representation = rows

        return representation
