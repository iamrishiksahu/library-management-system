from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
# from models import Book
from db import app
from db import db

from models import Book



class Abc(db.Model):
    user = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50))


    def __repr__(self) -> str:
        return f"{self.user} + {self.name}"

@app.route("/")
def hello_world():
    db.create_all()
    return "<p>Hello, World!</p>"


@app.route("/test")
def test(n):

    bookData = {
     "bookID": 17828,
      "title": "The Master and  Margarita",
      "authors": "Mikhail Bulgakov/Michael  Karpelson",
      "average_rating": "4.30",
      "isbn": "1411683056",
      "isbn13": "9781411683051",
      "language_code": "e ng",
      " num_pages": "332",
      "ratings_count": "493",
      "text_reviews_count": "47",
      "publication_date": "4/1 /2006",
      "publisher": "Lulu Press"
    }
    newBook = Book(bookData)
    db.session.add(newBook)
    db.session.commit()

if __name__ == "__main__":
    app.run(debug=True)