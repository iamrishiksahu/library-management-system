def getAllBooks(cursor):
    cursor.execute("SELECT * FROM books")
    results = cursor.fetchall()
    return results

def updateBook(conn, data):
    return data;

def deleteBook(conn, id):
    try:
        cursor = conn.cursor()
        sql = "DELETE FROM books WHERE bookId = " + id 
        cursor.execute(sql)
        
        conn.commit()
        return "SUCCESS"
    except Exception as e:
        print("An error occurred:", e)
        conn.rollback()
        return "FAILURE"

def createBook(conn, data):
    try:
        cursor = conn.cursor()
        bookId = int(data["id"])
        title = data["title"]
        authors = data["authors"]
        isbn = data["isbn"]
        average_rating = data["avg_rating"]
        language_code = data["lang"]
        num_pages = data["pages"]
        ratings_count = data["ratings_count"]
        text_reviews_count = data["reviews"]
        publication_date = data["pub_date"]
        publisher = data["publisher"]
        stock = data["stock"]

        cursor.execute("""INSERT INTO books (bookId, title, authors, isbn, average_rating, language_code, num_pages, ratings_count, text_reviews_count, publication_date, publisher, stock ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", (bookId, title, authors, isbn, average_rating, language_code, num_pages, ratings_count, text_reviews_count, publication_date, publisher, stock))

        conn.commit()
        return "SUCCESS"
    except Exception as e:
        print("An error occurred:", e)
        conn.rollback()
        return "FAILURE"

def getBook(cursor, id):
    return id