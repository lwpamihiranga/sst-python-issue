from sst import Resource

def handler(evt, ctx):
    print('Hello from Python!')
    print(Resource.BackendRds.database)
    return {"message": "Hello, World!"}
