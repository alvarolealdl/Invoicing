# Desafio Frontend - Vibbra

## • **_Projeto Invoicing - Controle de Notas Fiscais_**

### • **Ideia Geral:**

Foi Implementado uma aplicação utilizando React.js seguindo o escopo solicitado.

Essa aplicação conta com:

--> Tela de Login: A tela de login principal da aplicação. Nela o usuário insere usuário e senha e o sistema valida se existe usuário e senha. Caso exista ele entra no painel de controle, caso não retorna erro.

--> Tela Criação de Usuário: É possível criar um novo usuário preenchendo nome de usuário, senha e confirmando a senha. Esses campos tem validações padrão como quantidade mínima e máxima para nome de usuário e requisitos mínimos de senha (ao menos um caractere especial, número e letra maiúscula, por exemplo). Se tudo for atendido, é criado com sucesso e salvo no nosso backend fake (json-server)
-
-> Ao logar na aplicação entramos no nosso painel de controle onde o cliente se depara com as principais funcionalidades como cadastrar notas, gráficos e listagem de Notas, entre outros.

--> O usuário pode cadastrar uma nova nota fiscal inserindo valores base e conferindo o quantitativo de notas que já foram inseridas e quanto ele ainda pode inserir, afim de não estourar o limite máximo de um MEI.

--> Também é possível visualizar um gráfico, baseado no envio de Notas fiscais. Esse gráfico é totalmente dinâmico e você consegue visualizar todos os envios por mês e os envios específicos de cada empresa, filtrando pelo seletor de empresas ou diretamente no gráfico.

--> No campo de controle de notas é listado todas as notas, baseado no cadastro. Lá você verá todas as notas e poderá editar ou excluir, podendo eliminar alguma nota fiscal cadastrada ou inserir novos valores.

--> Você também poderá declarar as despesas que já teve no ano, baseado no mês. Isso ajudará num melhor controle dos gastos.

--> Tudo com estilo bem minimalista e simples, nada muito agressivo nem com cores fortes.

### • **Ações esperadas:**

--> Como é utilizado o *json-server* como uma simulação de backend, é necessário rodar o servidor do json-server para utilizar a aplicação.

--> Basta rodar **json-server --watch db.json** no terminal para deixar o servidor funcionando.

--> A aplicação foi construida utilizando o Vite. Se quiser utilizar o servidor do Vite para visualizar a aplicação, basta rodar **yarn dev** e clicar no link gerado.


### *Desde já grato, espero que gostem. Algumas complicações pessoais aconteceram durante o curso do desafio, se as coisas não estivessem tão caóticas certamente a entrega seria de melhor qualidade :D*
