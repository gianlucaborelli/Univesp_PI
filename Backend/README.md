# Backend

## Configuração do ambiente de desenvolvimento

Neste projeto utilizamos 
- [Java JDK 21.0](https://www.oracle.com/java/technologies/downloads/#jdk21-windows);
- [Maven Apache 3.9](https://maven.apache.org/download.cgi);
- [PostgreSQL](https://www.postgresql.org/).

### Primeiro Passo: Instalar Java JDK

Para utilização em conjunto com o Maven 3.9 deve instalar um JDK versão 8 ou superior, portanto, neste projeto utilizamos o JDK versão 21.

### Segundo Passo: Instalar Maven Apache

Neste passo deve-se baixar a imagem com os binários do Maven [neste link](https://maven.apache.org/download.cgi) e descompacta-lo em uma pasta de sua preferência e de fácil localização.

Neste exemplo realizamos o download do Maven conforme imagem:

![downloadMaven](https://user-images.githubusercontent.com/90393104/224877632-20bb6ea3-d165-4ac0-9459-32c93690cbf0.jpg)

E descompactamos no diretório `C:\Maven`

![descompactarMaven](https://user-images.githubusercontent.com/90393104/224877665-a31100a5-e2e7-459b-9127-7ae5ef9c79d1.jpg)

### Terceiro Passo: Configuração das Variáveis de Ambiente

- Clique com o botão direito do mouse no ícone do seu computador e clique em Propriedades.

![variavel1](https://user-images.githubusercontent.com/90393104/224878693-346b641a-d16d-438a-94f6-0b5329e7e6ee.jpg)

- Clique em Configurações avançadas do sistema.

![variavel2](https://user-images.githubusercontent.com/90393104/224879247-b3b88332-0b4c-406c-9b30-73c6cd817d4e.jpg)

- Clique no botão Variáveis de ambiente dentro da aba Avançado.

![variavel3](https://user-images.githubusercontent.com/90393104/224879505-9d15bea5-58c1-49eb-9c76-1493df2d6d28.jpg)

- Selecione a variável de ambiente PATH na lista e clique em Editar.

![variavel4](https://user-images.githubusercontent.com/90393104/224879876-e838014a-ae89-48f6-b8da-8f3f225e3d9c.jpg)

- Clique no botão Novo e adicione o caminho da pasta bin do maven: `C:\Maven\bin`.

![variavel5](https://user-images.githubusercontent.com/90393104/224880203-fe0a0d7a-891f-4d69-b9ef-11324faf93e7.jpg)

- Verifique se existe a variável de ambiente `JAVA_HOME`.

![variavel6](https://user-images.githubusercontent.com/90393104/224880555-6f681819-8106-46c1-a5b6-e1abd62f86bd.jpg)

- Caso não estiver deve-se clicar em *Novo* e informar o nome JAVA_HOME e o valor com o caminho para a pasta onde o seu JDK está instalado.

![variavel7](https://user-images.githubusercontent.com/90393104/224881360-94e43edb-ecd4-4518-a814-d80f07464262.jpg)

- Reinicie o Computador.

### Quarto Passo: Teste se o Maven está funcionando corretamente

- Abra o Prompt de comando e digite `$ mvn`.
  
![mavenRun](https://user-images.githubusercontent.com/90393104/224882442-2b6f32f8-3d8f-44aa-96f4-780bbaa991f5.jpg)

Caso o resultado seja proximo a este exibido, a instalação esta correta, caso não deve-se verificar todos os passos se estão corretos.

### Quinto passo: Instalação do MySQL

Faça o download do [MySQL Community](https://dev.mysql.com/downloads/mysql/) e instale seguindo todas as instruções oferecida pelo instalador.

