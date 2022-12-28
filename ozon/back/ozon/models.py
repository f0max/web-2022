from django.db import models

# Create your models here.


class Category(models.Model):
    category_name = models.CharField(max_length=20, verbose_name="Название категории")
    date_modified = models.DateTimeField(auto_now=True, verbose_name="Время последнего обновления")


class Product(models.Model):
    product_name = models.CharField(max_length=50, verbose_name="Название товара")
    category = models.ForeignKey(Category, models.DO_NOTHING, db_column='category', verbose_name="Категория товара")
    product_pic = models.ImageField(upload_to='images', default='1.jpg')
    product_price = models.DecimalField(max_digits=13, decimal_places=2, verbose_name="Цена товара")
    characteristics = models.TextField(max_length=5000, verbose_name="Характеристики товара")
    date_modified = models.DateTimeField(auto_now=True, verbose_name="Время последнего обновления")


class User(models.Model):
    user_login = models.CharField(max_length=20, verbose_name="Логин пользователя")
    user_password = models.CharField(max_length=20, verbose_name="Пароль пользователя")
    date_modified = models.DateTimeField(auto_now=True, verbose_name="Время последнего обновления")


class Cart(models.Model):
    id_user = models.IntegerField( verbose_name="Пользователь")
    id_product = models.ForeignKey(Product, models.DO_NOTHING, db_column='product', verbose_name="Товар")
    quantity = models.IntegerField(verbose_name="Количество")


class Sell(models.Model):
    user = models.IntegerField(verbose_name="Пользователь")
    sell_date = models.DateTimeField(auto_now=True, verbose_name="Дата продажи")
    status = models.IntegerField(verbose_name="Статус")


class Purchase(models.Model):
    sell = models.ForeignKey(Sell, models.DO_NOTHING, db_column='sell', verbose_name="Продажа")
    product = models.ForeignKey(Product, models.DO_NOTHING, db_column='product', verbose_name="Товар")
    quantity = models.IntegerField(verbose_name="Количество")
