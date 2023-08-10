from db import db
from datetime import datetime

class Member(db.Model):
    member_id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String(50))
    # first_name = db.Column(db.String(50))
    # last_name = db.Column(db.String(50))
    # address = db.Column(db.String)
    # phone: db.Column(db.Integer)
    # created_at: db.Column(db.DateTime, default = datetime.utcnow)
    # total_books_borrowed: db.Column(db.Integer)


class Book(db.Model):
    bookId = db.Column(db.Integer, primary_key=True)
    # title = db.Column(db.String)
    # authors = db.Column(db.String)
    # isbn = db.Column(db.String)
    # isbn13 = db.Column(db.String)
    # average_rating = db.Column(db.String)
    # language_code = db.Column(db.String)
    # num_pages = db.Column(db.String)
    # ratings_count = db.Column(db.String)
    # text_reviews_count = db.Column(db.String)
    # publication_date = db.Column(db.String)
    # publisher = db.column(db.String)
    # added_At = db.column(db.DateTime, default = datetime.utcnow)
    # qty = db.Column(db.Integer, default = 1)

class Transaction(db.Model):
    transaction_id = db.Column(db.Integer, primary_key = True)
    # transaction_at = db.Column(db.DateTime, default = datetime.utcnow)
    # amount = db.Column(db.Integer)
    # member_id = db.Column(db.Integer)
    # bookId = db.Column(db.Sting)

class BooksIssued(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    # issued_at = db.Column(db.DateTime, default = datetime.utcnow)
    # bookId = db.Column(db.String)
    # member_id = db.Column(db.String)

class BooksReturned(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    # returned_at = db.Column(db.DateTime, default = datetime.utcnow)
    # bookId = db.Column(db.String)
    # member_id = db.Column(db.String)


    