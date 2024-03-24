FROM python:3.11.8-slim

WORKDIR /app

COPY .. /app/

WORKDIR /app/etf_service

RUN pip install -r requirements.txt

COPY ../.env /app/.env

ENTRYPOINT [ "python", "-u", "main.py" ]
