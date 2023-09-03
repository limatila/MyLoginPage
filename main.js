//SignIn deve obter as infos
//Ao aceitar os dados, um objeto da classe User deve ser criado e movido para a memória do banco
Users = {
    'description': `This is a storage for all users in the site`,
    'offline': [],
    'online': [],
    'banned': [],

    offlineCount: 0,
    onlineCount: 0,
    bannedCount: 0
}

class User{ //should change to save in files
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

//secondary functions
const checkMissingSpaces = () => { //! to finish.
    missingSpaces = false
    for (var i = 0; i < fullSignForm.length; i++) {
        if (fullSignForm[i].value === null || undefined || false) {
            missingSpaces = true
            break
        }
        console.log("iterating ", i)
        console.log("value ", i, fullSignForm[i].value)
    }
    if (missingSpaces === true) {
        alert("Fill all Sign In Spaces!")
        throw console.error("Fill all spaces!")
    }
}

//to use in login and signin
const userCount = (type) => {
    quantityUsers = Users[type].length
    switch(type){
        case 'offline':{
            Users['offlineCount'] = quantityUsers;
            break;
        }
        case 'online':{
            Users['onlineCount'] = quantityUsers;
            break;
        }
        case 'banned':{
            Users['bannedCount'] = quantityUsers;
            break;
        }
    }
}

//when finished or failed
const resetSignIn = () => {
    document.getElementById("checkPasswordSignIn").hidden = true
    document.getElementById("checkPassBr").hidden = true
    document.getElementById("SignInButton").onclick = function(){ SignInFirst(); };
    
    fullSignForm[0].value = null
    fullSignForm[1].value = null
    fullSignForm[2].value = null
    fullSignForm[3].value = null
}

//primary sign functions
const SignInFirst = () => {
    statusSignText.style.color = "greenyellow";
    document.getElementById("checkPasswordSignIn").hidden = false
    document.getElementById("checkPassBr").hidden = false

    document.getElementById("SignInButton").onclick = function(){ SignIn(fullSignForm[0].value, fullSignForm[1].value, fullSignForm[2].value, fullSignForm[3].value) }; //notworking
    if(statusSignText.textContent !== undefined ){
        statusSignText.textContent = undefined 
    }
}

const SignIn = (signEmail, signUser, signPassword, confirmPassword) => {
    //TODO: add condition if spaces are missing
    //check if inputs are missing
    checkMissingSpaces()
    
    //checkPassword validation
    if (signPassword != confirmPassword){
        statusSignText.style.color = "red";
        statusSignText.textContent = "Password Check Failed!"
        resetSignIn()
        throw console.error("Sign In Failed!") //!: não está parando, learn try/catch
    }
    
    signInputs = [signEmail, signUser, signPassword]
    //TODO: check if email has @; check if username has a char.
    
    //TODO: check if email is unique


    newUser1 = new User(...signInputs)
    Users.offline.push(newUser1)

    //show success
    console.log("User Signed!")
    document.getElementById("signInStatusShow").textContent = "User Successfully Signed!"

    //return to initial state
    resetSignIn()

    //attribute to counter
    userCount("offline")

    return 0
}


//LogIn deve acessar a memória do banco e verificar se as infos do input coincidem
const LogIn = (uservar) => {


    uservar.push(Users[online])
}

const LogOut = () => {

}

//admins?
//TODO: adicionar listener para contagem dos usuários(ativos e inativos)