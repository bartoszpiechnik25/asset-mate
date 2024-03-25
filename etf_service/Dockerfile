FROM python:3.11.8-slim

WORKDIR /app/etf_service

ADD ./etf_service/requirements.txt .

RUN pip install -r requirements.txt

COPY . /app/

ENTRYPOINT [ "python", "-u", "main.py" ]
