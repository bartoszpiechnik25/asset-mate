from get_articles import getNArticles, getFullArticle
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache
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


FastAPICache.init(RedisBackend('redis://localhost:6379'), prefix='fastapi-cache')
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/news/{key}", dependencies=[Depends(validateUser)])
@cache(expire=60*60)
async def getArticles(key: str, limit: int=5):
    return jsonable_encoder(getNArticles(key, limit))

@app.get("/api/v1/news", dependencies=[Depends(validateUser)])
@cache(expire=60*60*24)
async def getArticleContent(article_url: str):
    article_content = getFullArticle(article_url)
    if article_url:
        return jsonable_encoder(article_content)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not fetch article details",
            headers={"Content-Type": "application/json"},
    )