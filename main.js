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

//defining Elements to use
fullLoginForm = document.querySelectorAll("form")[0].querySelectorAll("input");
fullSignForm = document.querySelectorAll("form")[1].querySelectorAll("input"); 
console.log(fullSignForm)

statusSignText = document.getElementById("signInStatusShow")

const SignInFirst = () => {
    statusSignText.style.color = "greenyellow";
    document.getElementById("checkPasswordSignIn").hidden = false
    document.getElementById("checkPassBr").hidden = false

    document.getElementById("SignInButton").onclick = function(){ SignIn(fullSignForm[0].value, fullSignForm[1].value, fullSignForm[2].value, fullSignForm[3].value) }; //notworking
    if(statusSignText.textContent !== undefined ){
        statusSignText.textContent = undefined 
    }
}

const resetSignIn = () => {
    //TODO: add condition if spaces are missing


    document.getElementById("checkPasswordSignIn").hidden = true
    document.getElementById("checkPassBr").hidden = true

    document.getElementById("SignInButton").onclick = function(){ SignInFirst(); };
    
    fullSignForm[0].value = null
    fullSignForm[1].value = null
    fullSignForm[2].value = null
    fullSignForm[3].value = null
}

const SignIn = (signEmail, signUser, signPassword, confirmPassword) => {

    //checkPassword validation
    if (signPassword != confirmPassword){
        statusSignText.style.color = "red";
        statusSignText.textContent = "Password Check Failed!"
        resetSignIn()
        console.error("Sign In Failed!")

        return //!: não está parando, learn try/catch
    }
    
    signInputs = [signEmail, signUser, signPassword]
    //TODO: check if email is unique

    //TODO: check if email has @; check if username has a char.


    newUser1 = new User(...signInputs)
    Users.offline.push(newUser1)

    //show success
    console.log("User Signed!")
    document.getElementById("signInStatusShow").textContent = "User Successfully Signed!"

    //return to initial state
    resetSignIn()

    return 0
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