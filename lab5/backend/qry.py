import sqlite3

conn = sqlite3.connect('db.sqlite3')

cur = conn.cursor()

cur.execute("SELECT product_name, product_price FROM ozon_product;")
res = cur.fetchall()
for product in res:
    print(product)
