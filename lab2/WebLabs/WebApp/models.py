# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Category(models.Model):
    category_id = models.BigAutoField(primary_key=True)
    category_name = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'category'


class Product(models.Model):
    product_id = models.BigAutoField(primary_key=True)
    product_name = models.CharField(max_length=50)
    category = models.ForeignKey(Category, models.DO_NOTHING, db_column='category')
    product_pic = models.ImageField(upload_to='images')
    product_price = models.DecimalField(max_digits=13, decimal_places=2)
    characteristics = models.TextField(max_length=5000)

    class Meta:
        managed = False
        db_table = 'product'


class User(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    user_login = models.CharField(max_length=20)
    user_password = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'user'
