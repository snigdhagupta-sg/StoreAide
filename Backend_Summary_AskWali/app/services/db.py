from pymongo import MongoClient
import os

MONGO_URI = os.getenv("mongodb://localhost:27017/")
DB_NAME = "Walmart"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]


# python -m pip install "pymongo[srv]==3.11"

# mongodb+srv://sarahmandal2004:jMynZbxJMxkfvIYV@walmartdb.h5jrkpm.mongodb.net/