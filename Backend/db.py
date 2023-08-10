from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from app import app;
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///lms.db"
# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///lms.db"  
db = SQLAlchemy(app)