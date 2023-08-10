from flask import Flask, jsonify, request
app = Flask(__name__)
import psycopg2
import random
from flask_cors import CORS


from dbQueries.memberQueries import getAllMembers, getMember, deleteMember, createMember, updateMember
from dbQueries.bookQueries import getAllBooks, createBook, deleteBook, updateBook
from dbQueries.returnQueries import getAllReturns, createReturn
from dbQueries.issueQueries import getAllIssues, createIssue
from dbQueries.transactionQueries import getAllTransactions, createTransaction

CORS(app, origins=['http://localhost:3000', 'https://example.com'])

conn = psycopg2.connect("postgres://rishiksahu:GrmVGlse61NYTtj06FDXXIVmOfFAcF7H@dpg-cjaddoq683bs73bsq99g-a.singapore-postgres.render.com/maindb_vndy")

cursor = conn.cursor()

if not conn.closed:
    print("Connection to PostgreSQL database successful!")
else:
    print("Connection to PostgreSQL database failed!")

# -------------- BOOK APIS ---------------

@app.route("/api/books", methods=['GET', 'POST', 'DELETE', 'UPDATE'])
def booksCRUD():

    if request.method == 'GET':
        res = getAllBooks(cursor=cursor)
        return res;
    elif request.method == 'POST':
        body = request.get_json()
        res = createBook(conn, body)
        return res;
    elif request.method == 'DELETE':
        id = request.args.get("id")
        if id is not None: 
            res = deleteBook(conn, id)
            return res;
        else:
            return "Invalid request!"
    elif request.method == 'UPDATE':
        body = request.get_json()
        res = updateBook(conn, body)
        return res
    else:
        return "Invalid request!"


# -------------- END BOOK APIS ---------------

# -------------- TRANSACTION APIS ---------------

@app.route("/api/transctions", methods=['GET', 'POST'])
def getAlltrns():
    if request.method == 'GET':
        res = getAllTransactions(cursor=cursor)
        return jsonify(res)

    elif request.method == 'POST':
        body = request.get_json()
        res = createTransaction(cursor=cursor, data=body)
        return jsonify(res)

    else:
        return "Invalid Request!"
    

# -------------- END TRANSACTION APIS ---------------

# -------------- ISSUE APIS ---------------

@app.route("/api/issue", methods=['GET', 'POST'])
def getIssues():
    if request.method == 'GET':
        res = getAllIssues(cursor=cursor)
        return jsonify(res);
    elif request.method == 'POST':
        body = request.get_json()
        res = createIssue(conn=conn, data=body)
        return jsonify(res)
    else:
        return "Invalid Request!"


# -------------- END ISSUE APIS ---------------

# -------------- RETURN APIS ---------------

@app.route("/api/return", methods=['GET', 'POST'])
def getReturns():
    if request.method == 'GET':

        res = getAllReturns(cursor=cursor)
        return jsonify(res)
    elif request.method == 'POST':
        body = request.get_json();
        res = createReturn(cursor=cursor, data=body)
        return jsonify(res)
    else:
        return "Invalid Request!"


# -------------- END RETURN APIS ---------------


# -------------- MEMBER APIS -------------
@app.route("/api/members", methods=['GET', 'POST', 'DELETE', 'PATCH'])
def manageMembers():
    if request.method == 'GET':
        id = request.args.get('id')
        if id is None:
            # Handle code for getting all members
            res = getAllMembers(cursor=cursor)
            return jsonify(res)
        else:
            # Handle code for getting a specific member by ID
            return "getone"
    elif request.method == 'POST':
        body = request.get_json()
        if body is not None:
            res = createMember(conn, body)
            return res
    elif request.method == 'DELETE':
        # body = request.get_json()
        id = request.args.get("del")
        if id is not None:
            res = deleteMember(conn, id)
            return res
    elif request.method == 'PATCH':
        body = request.get_json()
        if body is not None:
            # Handle code for updating a member
            return "upd"
    
    return "Invalid Request!"

# -------------- END MEMBER APIS -------------

@app.route("/dontTouchIT")
def dontTouch():



#     cursor.execute("""CREATE TABLE issued_books (
#   issueId serial PRIMARY KEY,
#   memberId int NOT NULL,
#   bookId int NOT NULL,
#   issued_at timestamp DEFAULT now(),
#  returned_at timestamp,
#     is_returned boolean NOT NULL
# );""")

    conn.commit()


@app.route("/")
def hello_world():
    return "Server is running!"

# @app.route("/deleteTable/<string:name>")
# def deleteTable(name):
#     cursor.execute(f"DROP TABLE IF EXISTS {name}")
#     return "kuch hua"

# @app.route("/api/addMember")
# def addMember():

#     title = random.choice(["The Alchemist", "The Lord of the Rings", "Harry Potter and the Sorcerer's Stone"])
#     authors = random.choice(["Paulo Coelho", "J.R.R. Tolkien", "J.K. Rowling"])
#     isbn = random.randint(100000000, 999999999)
#     average_rating = random.randint(1, 5)
#     language_code = random.choice(["en", "fr", "de", "es", "zh"])
#     num_pages = random.randint(100, 1000)
#     ratings_count = random.randint(100, 100000)
#     text_reviews_count = random.randint(10, 10000)
#     publication_date = random.randint(1900, 2023)
#     publisher = random.choice(["HarperCollins", "Penguin Random House", "Macmillan", "Simon & Schuster", "Hachette Book Group"])


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


# # Insert a member in members table
#     # cursor.execute("""
#     # INSERT INTO members (username, full_name, address, phone, created_at, total_books_borrowed)
#     # VALUES (%s, %s, %s, %s, NOW(), 0);
#     # """, ("rishik", "RKSAHU", "Ranchi", "8987400143"))

# # Insert a book in Books table
#     cursor.execute("""
# INSERT INTO books (title, authors, isbn, average_rating, language_code, num_pages, ratings_count, text_reviews_count, publication_date, publisher, created_at, stock)
# VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), 1);
# """, (title, authors, isbn, average_rating, language_code, num_pages, ratings_count, text_reviews_count, publication_date, publisher))

#     conn.commit()

#     return "added"





if __name__ == "__main__":
    app.run(debug=True)