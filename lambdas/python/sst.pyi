# Automatically generated by SST
# pylint: disable=all
from typing import Any

class Resource:
    class BackendLambda:
        name: str
        type: str
        url: str
    class BackendRds:
        database: str
        host: str
        password: str
        port: float
        type: str
        username: str
    class BackendVpc:
        bastion: str
        type: str
