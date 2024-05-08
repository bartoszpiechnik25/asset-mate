FROM python:3.11.8-alpine3.19

WORKDIR /app/news-service

ADD ./requirements.txt .

RUN pip install fastapi gnews newspaper3k psycopg2-binary PyJWT pymongo lxml_html_clean

COPY . /app/news-service

ENTRYPOINT [ "fastapi", "run", "main.py" ]