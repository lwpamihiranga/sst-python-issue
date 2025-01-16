from sst import Resource
import psycopg2

def handler(evt, ctx):
    print('Hello from Python!')
    conn = psycopg2.connect(
        host=Resource.BackendRds.host,
        database=Resource.BackendRds.database,
        user=Resource.BackendRds.username,
        password=Resource.BackendRds.password,
        port=Resource.BackendRds.port
    )
    print('Database connection: ', conn)
    conn.close()
    return {"message": "Hello, World!"}
