//SignIn deve obter as infos
//Ao aceitar os dados, um objeto da classe User deve ser criado e movido para a memória do banco
Users = {
    'description': `This is a storage for all users in the site`,
    'offline': [0,],
    'online': [0,],
    //banned?
}

class User{
    constructor(email, userName, password){
        this.email = email
        this.userName = userName
        this.password = password
        console.log("User Created!")
    }

    sayHello(){
        console.log(`Hello ${this.userName}!!`)
    }
}

buttons = document.querySelectorAll("button") //! not working, first problem
fullLoginForm = document.querySelectorAll("form"); 
console.log(buttons)

const SignInFirst = () =>{
    document.getElementById("checkPasswordSignIn").hidden = false
    document.getElementById("checkPassBr").hidden = false

    document.getElementById("SignInButton").onclick = function () { SignIn() }; //notworking
    if(document.getElementById("signInStatusShow").textContent !== undefined ){
        document.getElementById("signInStatusShow").textContent = undefined 
    }
}

const SignIn = (signEmail, signUser, SignPassword) => {
    signInputs = [signEmail, signUser, SignPassword]
    newUser1 = new User(...signInputs)
    Users.offline.push(newUser1)

    //show success
    console.log("User Signed!")
    document.getElementById("signInStatusShow").textContent = "User Successfully Signed!"
    

    //return to initial state
    document.getElementById("checkPasswordSignIn").hidden = true
    document.getElementById("checkPassBr").hidden = true

    document.getElementById("SignInButton").onclick = function () { SignInFirst(); };
    //TODO: add inputs value's reset
}


//LogIn deve acessar a memória do banco e verificar se as infos do input coincidem
const LogIn = (uservar) => {
    Users.offline[0] = Users.offline.length; //setting counter

    uservar.push(Users[online])
}

const LogOut = () => {

}

//admins?
//TODO: adicionar listener para contagem dos usuários(ativos e inativos)