FROM maven:3.9.5-jdk-21 AS build
COPY . /app
WORKDIR /app
RUN mvn package -DskipTests

FROM openjdk:11-jre-slim
COPY --from=build /app/target/sisgem.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]