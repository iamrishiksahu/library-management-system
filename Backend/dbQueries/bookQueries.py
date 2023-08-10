def getAllBooks(cursor):
    cursor.execute("SELECT * FROM books")

    results = cursor.fetchall()

    return results
def getBook(cursor, id):
    return id