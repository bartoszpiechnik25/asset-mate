import psycopg2
from dotenv import dotenv_values

env = dotenv_values()

connection = psycopg2.connect(
    database=env['database'],
    user=env['user'],
    host=env['host'],
    password=env['password'],
    port=env['port']
)

def getUser(username: str, userId: str|None=None):
    cursor = connection.cursor()
    cursor.execute(
        f"select username, user_id from public.user where username='{username}' and user_id='{userId}';"
    )
    rows = cursor.fetchall()
    if len(rows) == 1:
        return True
    return False
    