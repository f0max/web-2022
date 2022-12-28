import sqlite3

# conn = sqlite3.connect('db.sqlite3')
#
# cur = conn.cursor()
#
# cur.execute("SELECT product_name, product_price FROM ozon_product;")
# res = cur.fetchall()
# for product in res:
#     print(product)

from django.contrib.auth.models import User
user = User.objects.get( username='admin')
user.set_password("123")
user.save()