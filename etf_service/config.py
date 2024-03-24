import os
import dotenv
import pymongo


def get_config() -> dict:
    path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
    env_vals = dotenv.dotenv_values(path)
    return env_vals


def get_db(config: dict):
    client = pymongo.MongoClient(config["MONGO_URL"])
    return client.get_database(config["MONGO_DATABASE"])
