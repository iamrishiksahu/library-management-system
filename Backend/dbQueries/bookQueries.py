#     # cursor.execute("""CREATE TABLE books (
#     # bookId serial PRIMARY KEY,
#     # title varchar(255) NOT NULL,
#     # authors varchar(255) NOT NULL,
#     # isbn varchar(255) NOT NULL,
#     # average_rating varchar(255) NOT NULL,
#     # language_code varchar(255) NOT NULL,
#     # num_pages varchar(255) NOT NULL,
#     # ratings_count varchar(255) NOT NULL,
#     # text_reviews_count varchar(255) NOT NULL,
#     # publication_date varchar(255) NOT NULL,
#     # publisher varchar(255) NOT NULL,
#     # created_at timestamp NOT NULL DEFAULT NOW(),
#     # stock integer DEFAULT 1
#     # );""")
import requests



def searchBookByAuthor(author):
    try:
        response = requests.get(f'https://frappe.io/api/method/frappe-library?authors={author}')
        return response.content
    except Exception as e:
        return "FAILURE"
    

def searchBookByTitle(title):
    try:
        response = requests.get(f'https://frappe.io/api/method/frappe-library?title={title}')
        return response.content
    except Exception as e:
        return "FAILURE"
def searchBookFromFrappe():
    try:
        response = requests.get('https://frappe.io/api/method/frappe-library?title=and')
        return response.content
    except Exception as e:
        return "FAILURE"

def getAllBooks(cursor):
    cursor.execute("SELECT * FROM books")
    results = cursor.fetchall()
    books = []
    for row in results:
        item = {
            "bookId" : row[0],
            "title": row[1],
            "authors": row[2],
            "isbn": row[3],
            "avg_rating": row[4],
            "lang": row[5],
            "pages": row[6],
            "ratings_count": row[7],
            "reviews": row[8],
            "pub_date": row[9],
            "publisher": row[10],
            "created_at": row[11],
            "stock": row[12],
        }
        books.append(item)
    return books

def updateBook(conn, data):

    try:
        bookId = data["bookId"]
        qty = data["qty"]

        cursor = conn.cursor()
        cursor.execute(f"""UPDATE books SET stock = {qty} WHERE bookId = {bookId}""")
        conn.commit()

        return 'SUCCESS'
    except Exception as e:
        print("An error occurred:", e)
        conn.rollback()
        return "FAILURE"



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
        bookId = int(data["bookID"])
        title = data["title"]
        authors = data["authors"]
        isbn = data["isbn"]
        average_rating = data["average_rating"]
        language_code = data["language_code"]
        num_pages = data["pages"]
        ratings_count = data["ratings_count"]
        text_reviews_count = data["text_reviews_count"]
        publication_date = data["publication_date"]
        publisher = data["publisher"]
        stock = data["qty"]

        cursor.execute(f"""INSERT INTO books (bookId, title, authors, isbn, average_rating, language_code, num_pages, ratings_count, text_reviews_count, publication_date, publisher, stock ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) 
                       ON CONFLICT (bookId) DO UPDATE SET stock = books.stock + EXCLUDED.stock""", (bookId, title, authors, isbn, average_rating, language_code, num_pages, ratings_count, text_reviews_count, publication_date, publisher, stock))

        conn.commit()
        return "SUCCESS"
    except Exception as e:
        print("An error occurred:", e)
        conn.rollback()
        return "FAILURE"

def getBook(cursor, id):
    return id