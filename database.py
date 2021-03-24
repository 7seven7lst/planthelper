from mongoengine import connect
from datetime import datetime
from dotenv import load_dotenv
import os
from os.path import join, dirname
from flask import current_app

load_dotenv(join(dirname(__file__), '.flaskenv'))

connect(host=os.environ['DATABASE_URI'], alias='db1')

def init_db():
    pass