FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY . /app/

RUN ./mvnw clean install

ENTRYPOINT [ "java", "-jar", "./target/backend-0.0.1-SNAPSHOT.jar"]