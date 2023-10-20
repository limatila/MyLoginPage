# My Login Page <img src="images/Licon.png" title="Login Main Icon" alt="Login Main Icon" height="28"><br>
* By Átila Lima, 2023
* **BR**s: ainda sem tradução do site para Português

# English
A simple project of a LogIn/SignUp, with the assignment of clients(Users), and Access of their accounts.  

* **Status**: In development, already have the possibility to sign up and log in to the site, still it does not save the information about the accounts. 
 
  That means that if you successfully LogIn the site or reload it, all the accounts data will vanish.

All the information of these accounts is storaged in the form of the "User" class, and transfered to "Users" object,  
Which divides the users into "online" and "total" arrays, The online users and the total signed users respectly. Along with them, a storage for numbers counting the ammout of users from the respective categorys.
 
### SignUp stage
The 'SignUp' method has the principal purpose to sign a new user. It will basically get the data of the user and treat them to then be storaged.
 
To create a user, solely input an Email, Username, and Password (and confirm it) in the sign up areas in 'login.html'.

### SignUp Rules 
There's some rules to fill the query, that filter the insertion of data, to maintain the data uniformally. 
If they one of them is ouscious, the code will throw an alert to the user, and will abort. 
1. The SignUp area must not be empty in any input
2. A second password input for checking must not be different from the first
3. The Email needs to be in the valid format (as email@domain.com)
4. The Username needs to have at least one character
5. No account can have duplicate Emails

***

### Login stage
The Login method has the principal purpose to login a user. It will receive the requested login, search for a valid user in the storage, and give the access to the given user. 
 
To Login, input Email and Password in the login areas in 'login.html'.
 
### Login Rules
As for Login, there's some rules for to give the access of the given account to the user, too. If one of them is disatisfied, the code will throw an alert to the user, and abort.
1. The Login area must not have any empty input
2. The user **must** be alredy signed to the website. If not signed yet, proceed to SignUp area
3. The selected account (by Email) must match the inputed password.
4. The account cannot be already logged. 


## Console Debugging
* There are several infos about the execution of the code that are logged in the console. some of them are unsafe to be displayed and must be removed in the JS corresponding source code.
* Several errors are thrown into console, to stop and inform what's gone wrong in the execution. The complete list of error's codes are in "errorCodes.txt" in the repo.

***
 
# PT-BR

Um projeto de um Login/Signin simples, com a inscrição de clientes(Users), e acesso de suas contas.

* **Status**: Em desenvolvimento. Já está disponível as funcionalidades de se cadastrar(SignUp) e entrar(LogIn) em uma conta criada, mas o site não salva as informações.

 Isso significa que se um Login for feito com sucesso ou se recarregar a página, todos os dados das contas vão sumir.

Toda a informação destas contas são guardadas na forma de uma classe 'User', e então transferida para o objeto 'Users',
Que se divide os usuários em arrays "online" e "total", os usuários onlines e cadastrados respectivamente. Está também incluído no objeto um armazenamento que conta o total de usuários das categorias respectivas.

### Formulário de SignUp (Cadastro) 
O método 'SignUp' tem o propósito principal de cadastrar um usuário novo. Ele vai basicamente conseguir os dados do usuário e tratá-los para então serem armazenados.

Para criar um usuário, apenas insira um Email, Nome de usuário, e Senha (e confirme ela) nas áreas de SignUp no 'login.html'.

### Regras de Cadastro
Existem algumas regras sendo aplicadas no momento de inserir o formulário de cadastro, para filtrar a inserção de dados e mantê-los uniformes.
Se alguma delas está ausente, o código vai mostrar um alerta para o usuário, e abortar a operação.
1. A área de SignUp não pode ter um dado ausente
2. Uma segunda confirmação da senha inserida não pode ser diferente dela
3. O Email inserido deve estar no formato válido de email (como email@domain.com)
4. O Nome de usuário deve ter um caractére ao menos
5. Nenhuma conta deve ter Emails duplicados

***

### Formulário de LogIn (Acesso)
O método de 'Login' tem o propósito principal de dar acesso a um usuário. Ele recebe o desejado acesso, pesquisa por um usuário válido no armazenamento, e então dá acesso para o dado usuário.

Para logar, apenas insira Email e Senha nas áreas de LogIn em 'login.html'

### Regras de Acesso
Para o LogIn, também existem algumas regras para que o acesso ao usuário desejado seja concedido.
Se alguma delas não for satisfeita, o código vai mostrar um alerta para o usuário, e abortar a operação.
1. A área de LogIn não pode ter um dado ausente
2. O usuário **deve** já ser cadastrado no site. Se não cadastrado ainda, se dirija à area de SignUp
3. A senha inserida para a conta selecionada (por Email) deve ser igual à senha desta conta
4. A conta não pode já estar logada e ativa.
 

## Debug no Console
* Há algumas infos sobre a execução do código que são apresentadas no console do navegador. Algumas delas não devem ser mostradas para usuários comuns por motivos de segurança, e devem ser removidas do código-fonte JS correspondente.
* Alguns erros sobre a execução do código são apresentados no console, para abortar e informar alguma operação em execução. A lista completa de códigos dos erros está disponível em "errorCodes.txt", no repositório.


***
@ALB, 2023