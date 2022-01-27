<h1 align="center">
  <img src="public/images/logo.png" width="50%" />
</h1>

<p align="center">
  <a href="#contexto-">Contexto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desafio-">Desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#como-acessar-%EF%B8%8F">Como Acessar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias-">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licença-">Licença</a>
</p>

## Contexto 📝

Projeto desenvolvido para o desafio proposto pelo MundoJix como parte do processo de seleção para Pessoa Desenvolvedora Full Stack Junior.

Trata-se de um modulo/sistema para validação de horas extracurriculares, onde os alunos podem anexar seus documentos e controlar a quantidade de horas que já concluíram.

## Desafio ✅

Foi solicitada a implementação de uma interface de exibição dos documentos enviados pelo estudante, contendo:

[x] Grid com a lista de documentos enviados pelo aluno;
[x] Coluna com link do nome do documento para acesso ao documento;
[x] Coluna com o tipo de atividade do certificado;
[x] Coluna com a quantidade de horas;
[x] Coluna com o status do documento: Homologado / Não-Homologado.

Além disso, foi sugerida a implementação da função de backend para consultar os dados no banco e retornar um objeto ao front com a lista dos certificados do usuário.

## Como Acessar ▶️

A interface da aplicação está disponível no endereço https://sysdoc.vercel.app. Para o login, você pode optar por um dos seguintes usuários:

**Administrativo**
Matrícula: ```123456```
Senha: ```123456```

**Aluno 1**
Matrícula: ```1234567890```
Senha: ```123456```

**Aluno 2**
Matrícula: ```1234567891```
Senha: ```123456```

**Aluno 3**
Matrícula: ```1234567892```
Senha: ```123456```

**Aluno 4**
Matrícula: ```1234567893```
Senha: ```123456```

Se desejar rodar a aplicação na sua maquina local, seguem as instruções.
Para executar o projeto, você precisa ter o [Node.js](https://nodejs.org) instalado em sua máquina.

1. Clonando o projeto:
```
git clone https://github.com/nataliafonseca/sysdoc_frontend
```
2. Acessando a pasta clonada:
```
cd sysdoc_frontend
```
3. Instalando as dependências
```
npm i
```
4. Executando a aplicação
```
npm run dev
```

A interface poderá ser acessada em http://localhost:3000.

## Tecnologias 💻

O frontend da aplicação foi implementado em **React.js** com **Next.js** utilizando a linguagem **TypeScript**.
Para a estilização dos componentes, foi utilizada a biblioteca **chakra-ui**.
O deploy do frontend da aplicação foi feito no **Vercel**.

## Licença 📃

Este projeto está sob a licença MIT. Para mais detalhes, veja o arquivo [LICENSE](LICENSE).

---
<div align="center">
  
  ![Deploy Status Badge](https://img.shields.io/github/deployments/nataliafonseca/sysdoc_frontend/Production?label=vercel&logo=vercel&style=for-the-badge)

</div>
