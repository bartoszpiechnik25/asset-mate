from get_articles import getNArticles
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from dotenv import dotenv_values
from typing import Dict
from db import getUser
import jwt
import base64
import time

env = dotenv_values()
bearer_scheme = HTTPBearer()


def decodeToken(token: str) -> Dict:
    padding = '=' * ((4 - len(env['key']) % 4) % 4)
    secret_key = base64.b64decode(env['key'] + padding)
    payload = jwt.decode(token, secret_key, algorithms=["HS256"])
    return payload

def validateUser(credentials: HTTPAuthorizationCredentials=Depends(bearer_scheme)):
    if credentials:
        try:
            payload = decodeToken(credentials.credentials)
            if getUser(payload['sub'], payload['id']) and payload['exp'] > int(time.time()):
                return
            else:
                raise Exception
            
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
                headers={"WWW-Authenticate": "Bearer"},
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/news/{key}", dependencies=[Depends(validateUser)])
async def getArticles(key: str, limit: int=5):
    return jsonable_encoder(getNArticles(key, limit))
