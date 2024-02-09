<<<<<<< HEAD
FROM eclipse-temurin:21-jdk-alpine

RUN apk add --no-cache bash procps curl tar

# common for all images
ENV MAVEN_HOME /usr/share/maven

=======
# Use a imagem do Eclipse Temurin com JDK 21 no Alpine
FROM eclipse-temurin:21-jdk-alpine

# Instale algumas ferramentas úteis
RUN apk add --no-cache bash procps curl tar

# Defina a variável de ambiente MAVEN_HOME
ENV MAVEN_HOME /usr/share/maven

# Copie o Maven e as configurações do Maven a partir de outra imagem Maven
>>>>>>> 53e2d09dfd89f517805b242f9d560ac17ba6fbf0
COPY --from=maven:3.9.6-eclipse-temurin-11 ${MAVEN_HOME} ${MAVEN_HOME}
COPY --from=maven:3.9.6-eclipse-temurin-11 /usr/local/bin/mvn-entrypoint.sh /usr/local/bin/mvn-entrypoint.sh
COPY --from=maven:3.9.6-eclipse-temurin-11 /usr/share/maven/ref/settings-docker.xml /usr/share/maven/ref/settings-docker.xml

<<<<<<< HEAD
RUN ln -s ${MAVEN_HOME}/bin/mvn /usr/bin/mvn

=======
# Crie um link simbólico para o executável mvn
RUN ln -s ${MAVEN_HOME}/bin/mvn /usr/bin/mvn

# Defina variáveis de ambiente relacionadas ao Maven
>>>>>>> 53e2d09dfd89f517805b242f9d560ac17ba6fbf0
ARG MAVEN_VERSION=3.9.6
ARG USER_HOME_DIR="/root"
ENV MAVEN_CONFIG "$USER_HOME_DIR/.m2"

<<<<<<< HEAD
ENTRYPOINT ["/usr/local/bin/mvn-entrypoint.sh"]
CMD ["mvn"]
=======
# Configuração do diretório de trabalho
WORKDIR /app

# Copie o arquivo pom.xml para o diretório de trabalho
COPY pom.xml .

# Executar o script de entrada personalizado
ENTRYPOINT ["/usr/local/bin/mvn-entrypoint.sh"]

# Comando para executar o aplicativo Spring Boot
CMD ["mvn", "clean", "package", "-DskipTests"]
>>>>>>> 53e2d09dfd89f517805b242f9d560ac17ba6fbf0
