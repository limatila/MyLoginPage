//Site com Login, SignIn, verificações de formulário e armazenamento de usuários
//By Átila Lima
Users = {
    description: `This is a storage for all users in the site`,
    offline: [],
    online: [],
    banned: [],

    offlineCount: 0,
    onlineCount: 0,
    bannedCount: 0,
};

class User {
    //should change to save in files
    constructor(email, userName, password) {
        this.email = email;
        this.userName = userName;
        this.password = password;
        console.log("User Created!");
    }

    sayHello() {
        console.log(`Hello ${this.userName}!!`);
    }
}

//defining Elements to use
fullLoginFormCrude = document.querySelectorAll("form")[0].querySelectorAll("input");
fullLoginForm = Array.from(fullLoginFormCrude); //array

fullSignFormCrude = document.querySelectorAll("form")[1].querySelectorAll("input");
fullSignForm = Array.from(fullSignFormCrude); //array

console.log(fullSignForm);

statusSignText = document.getElementById("signInStatusShow");

//secondary functions
const checkMissingSpaces = (selectedForm) => {
    for (var i = 0; i < selectedForm.length; i++) {
        console.log("value ", i, selectedForm[i].value); //debugging
        if (selectedForm[i].value.length === 0) {  //if value is >empty<, err
            alert("Fill all Sign In Spaces!");
            throw console.error("Fill all spaces!");
        }
    }
};

const checkUsernameChar = (string) => {
    let lettersLow = "abcdefghijklmnopqrstwxyz"; let lettersHigh = lettersLow.toUpperCase();
    let allLetters = lettersLow + lettersHigh;

    let ZeroLetters = 0  //if continues 0, err
    for(i = 0; i < string.length; i++){
        if(allLetters.includes(string[i]) === true){ //!not working: no iterations are being accused.
            ZeroLetters++
        }
    }

    if(ZeroLetters === 0){ //err
        alert("Username MUST have at least one alphabetic character.")
        throw console.error("Username bad format.")
    }
}

const checkExistingUser = (arg = {});

//to use in login and signin
const userCount = (type) => {
    quantityUsers = Users[type].length;
    switch (type) {
        case "offline": {
            Users["offlineCount"] = quantityUsers;
            break;
        }
        case "online": {
            Users["onlineCount"] = quantityUsers;
            break;
        }
        case "banned": {
            Users["bannedCount"] = quantityUsers;
            break;
        }
    }
};

//when finished or failed
const resetSignIn = () => {
    document.getElementById("checkPasswordSignIn").hidden = true;
    document.getElementById("checkPassBr").hidden = true;
    document.getElementById("SignInButton").onclick = function () {
        SignInFirst();
    };

    fullSignForm[0].value = null;
    fullSignForm[1].value = null;
    fullSignForm[2].value = null;
    fullSignForm[3].value = null;
};

//primary sign functions
const SignInFirst = () => {
    statusSignText.style.color = "greenyellow";
    document.getElementById("checkPasswordSignIn").hidden = false;
    document.getElementById("checkPassBr").hidden = false;

    document.getElementById("SignInButton").onclick = function () {
        SignIn(
            fullSignForm[0].value,
            fullSignForm[1].value,
            fullSignForm[2].value,
            fullSignForm[3].value
        );
    };


    if (statusSignText.textContent !== undefined) {
        statusSignText.textContent = undefined;
    }
};

const SignIn = (signEmail, signUser, signPassword, confirmPassword) => {
    //check if inputs are missing
    checkMissingSpaces(fullSignForm);

    //checkPassword validation
    if (signPassword != confirmPassword) {
        statusSignText.style.color = "red";
        statusSignText.textContent = "Password Check Failed!"; 
        resetSignIn(); //!: não deveria resetar tudo, só as senhas. um throw seria bom
        throw console.error("Sign In Failed!");
    }

    signInputs = [signEmail, signUser, signPassword];

    //checks if a valid email is correctly typed
    if (signEmail.includes("@") === false || signEmail.includes(".com") === false) { //second and last check, after browser warning.
        alert("Email is not well inserted! insert a valid like this: example@exampledomain.com");
        throw console.error("Email bad format.");
    }
    
    //TODO: check if username has a char.
    checkUsernameChar(signEmail)

    //TODO: check if email is unique in Users object
    //dica: iteração nos users? function.

    newUser1 = new User(...signInputs);
    Users.offline.push(newUser1);

    //show success
    console.log("User Signed!");
    document.getElementById("signInStatusShow").textContent =
        "User Successfully Signed!";

    //return to initial state
    resetSignIn();

    //attribute to counter
    userCount("offline");

    return 0;
};

//LogIn deve acessar a memória do banco e verificar se as infos do input coincidem
const LogIn = (uservar) => {

    uservar.push(Users[online]);

};

const LogOut = () => {


};

//admins?
//TODO: adicionar listener para contagem dos usuários(ativos e inativos)
