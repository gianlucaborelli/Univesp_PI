FROM eclipse-temurin:21-jdk-alpine AS build
COPY . /app
WORKDIR /app
RUN mvn package -DskipTests

FROM openjdk:11-jre-slim
COPY --from=build /app/target/sisgem.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]