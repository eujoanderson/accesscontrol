# AccessControl - Controle de Acesso

#### Nesse projeto iremos desenvolver um sistema para controle de acessos de usuários de uma umpresa
##### Site criado por: Joanderson para o projeto de DW

<br>

Primeira tela:<br>
*A tela de login está quase pronta. Abaixo um esbolço da nossa primeira tela onde o usuário autorizado vai ter acesso.*

![Tela de Login](./img/img-pages/Tela-login.png)

Para que o projeto funcione é preciso instalar o Vite, Bootstrap e Json-Server

*npm i bootstrap* <br>
*npm create vite@latest control -- --template vanilla*<br>
*npm install js-md5*<br>
*npm install express*<br>
*npx prisma migrate dev --name app*<br>

Para poder rodar o prisma é preciso acessar a pasta Prisma e rodar os seguinte comando:
*npm run dev*

Para poder rodar o vite na raiz do projeto rode o comando:
*npm run dev*

Tela Principal - Dashboard:<br>
![Tela de Dashboard](./img/img-pages/Tela-Dashboard.png)

Tela De Users - Usuários:<br>
![Tela de Users](./img/img-pages/Tela-users.png)

Tela De Alerts - Alerts:<br>
![Tela de Alertas](./img/img-pages/Tela-alerts.png)