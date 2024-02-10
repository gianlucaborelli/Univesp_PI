#
# Build stage
#
FROM maven:3.9.6-eclipse-temurin AS build
COPY . .
RUN mvn clean install

#
# Package stage
#
FROM eclipse-temurin:21-jdk
COPY --from=build /target/main-0.0.1-SNAPSHOT.jar main.jar
# ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","main.jar"]