import MySQLdb

db = MySQLdb.connect(
    host="localhost",
    user="dbuser",
    passwd="123",
    db="first_db"
)

c = db.cursor()
# c.execute("INSERT INTO book (name, description) VALUES ('Преступление и наказание', 'Ф.Достоевский')")
c.execute("DELETE FROM book WHERE id = 4")
db.commit()
c.close()
db.close()