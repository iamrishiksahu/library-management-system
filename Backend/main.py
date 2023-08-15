from flask import Flask, jsonify, request
app = Flask(__name__)
import psycopg2
import random
from flask_cors import CORS

from dbQueries.dashboardQueries import getDashboardCounts
from dbQueries.memberQueries import getAllMembers, getMember, deleteMember, createMember, updateMember
from dbQueries.bookQueries import getAllBooks, createBook, deleteBook, updateBook, searchBookFromFrappe, searchBookByTitle, searchBookByAuthor
from dbQueries.returnQueries import getAllReturns, createReturn, getAllNotReturned
from dbQueries.issueQueries import getAllIssues, createIssue
from dbQueries.transactionQueries import getAllTransactions, createTransaction

import requests

# ['http://localhost:3000', 'https://frappe-lms-frontend.vercel.app/', 'https://lms-frontend-frappe.onrender.com/']

CORS(app, origins='*')

conn = psycopg2.connect("postgres://rishiksahu:GrmVGlse61NYTtj06FDXXIVmOfFAcF7H@dpg-cjaddoq683bs73bsq99g-a.singapore-postgres.render.com/maindb_vndy")

cursor = conn.cursor()

if not conn.closed:
    print("Connection to PostgreSQL database successful!")
else:
    print("Connection to PostgreSQL database failed!")

# -------------- DASHBOARD APIS ---------------

@app.route("/api/dashboard", methods=['GET'])
def getDashboardData():

    if request.method == 'GET':
        res = getDashboardCounts(cursor=cursor)
        return res;
    else:
        return "Invalid Request!"



# -------------- END  DASHBOARD APIS ---------------

# -------------- BOOK APIS ---------------

@app.route("/api/books/search-book/all")
def searchBookAll():
        res = searchBookFromFrappe()
        return res

@app.route("/api/books/search-book/title")
def searchBookByTitles():
        a = request.args.get("value")
        print(a)
        res = searchBookByTitle(title=a)
        return res

@app.route("/api/books/search-book/author")
def searchBookByAuth():
        a = request.args.get("value")
        res = searchBookByAuthor(author=a)
        return res


@app.route("/api/books", methods=['GET', 'POST', 'DELETE', 'PATCH'])
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
    elif request.method == 'PATCH':
        body = request.get_json()
        res = updateBook(conn, body)
        return res
    else:
        return "Invalid request!"


# -------------- END BOOK APIS ---------------

# -------------- TRANSACTION APIS ---------------

@app.route("/api/transactions", methods=['GET', 'POST'])
def getAlltrns():
    if request.method == 'GET':
        res = getAllTransactions(cursor=cursor)
        return jsonify(res)

    elif request.method == 'POST':
        body = request.get_json()
        res = createTransaction(conn=conn, data=body)
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
        res = createReturn(conn=conn, data=body)
        return jsonify(res)
    else:
        return "Invalid Request!"
    
@app.route("/api/not-returned", methods=['GET'])
def notReturneds():
    if request.method == 'GET':

        res = getAllNotReturned(cursor=cursor)
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
            res = updateMember(conn, body)
            return res
    
    return "Invalid Request!"

# -------------- END MEMBER APIS -------------

@app.route("/")
def hello_world():
    return "Server is running!"

if __name__ == "__main__":
    app.run(debug=True)