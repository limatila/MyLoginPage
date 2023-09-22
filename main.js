//Site com Login, SignIn, verificações de formulário e armazenamento de usuários
//By Átila Lima
Users = {
    description: `This is a storage for all users in the site`,
    offline: [],
    online: [],
    banned: [],
    total: [], //total

    offlineCount: 0,
    onlineCount: 0,
    bannedCount: 0,
    totalCount: 0
};

class User { //might need to change method.
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

console.log(fullLoginForm);

statusSignText = document.getElementById("signInStatusShow");

//secondary functions
const checkMissingSpaces = (selectedForm) => {
    for (let i = 0; i < selectedForm.length; i++) {
        console.log("value ", i, selectedForm[i].value); //debugging
        if (selectedForm[i].value.length === 0) {  //if value is >empty<, err
            alert("Fill all Sign In Spaces!");
            statusSignText.style.color = "red";
            statusSignText.textContent = "SignIn inputs are incomplete!";
           
            throw console.error("Fill all spaces! Code 1");
        }
    }
};

const checkUsernameChar = (username) => {
    let lettersLow = "abcdefghijklmnopqrstwxyz"; let lettersHigh = lettersLow.toUpperCase();
    let allLetters = lettersLow + lettersHigh;

    let zeroLetters = 0  //if continues 0, err
    for(let i = 0; i < username.length; i++){
        if(allLetters.includes(username.charAt(i)) === true){
            zeroLetters++
        }
    }

    if(zeroLetters === 0){ //err
        alert("Username MUST have at least one alphabetic character.")
        statusSignText.style.color = "red";
        statusSignText.textContent = "Put a Char in your username!"
        
        throw console.error("Username bad format. Code 4")
    }
}

//checks if user exists. One user per email.
const checkExistingEmail = (userEmail) => { 
    for(let i=0; i < Users.total.length; i++){    //BAD METHOD! not efficient.
	    console.log("iterating through total: pos" + i)
	    if(Users.total[i].email === userEmail){
	        alert("Email already registered! \nPlease fill with another valid Email.")
	        resetSignIn()
            statusSignText.style.color = "red";
            statusSignText.textContent = "Email Already Existant!";

	        throw console.error("Duplicate Email! Chosse another. Code 5")
	    }
    }
};

//counts into Users variables. To use in login and signin
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
        case "total": {
            Users["totalCount"] = quantityUsers;
            break;
        }
    	default: {
    	    alert("Error ocurred! see console for info.")
    	    console.warning("Not valid counting typo inserted. Code 6")
    	    break;
    	}
    }
};

//when finished or failed
const resetSignIn = () => { //shall have a switch for login
    document.getElementById("checkPasswordSignIn").hidden = true;
    document.getElementById("checkPassBr").hidden = true;
    document.getElementById("SignInButton").onclick = function () {
        SignInFirst()
    };

    fullSignForm[0].value = null;
    fullSignForm[1].value = null;
    fullSignForm[2].value = null;
    fullSignForm[3].value = null;
};


//primary sign functions
const SignInFirst = () => {
    
    //first check. One Email per User.
    checkExistingEmail(fullSignForm[0].value)
    
    statusSignText.style.color = "greenyellow";
    document.getElementById("checkPasswordSignIn").hidden = false;
    document.getElementById("checkPassBr").hidden = false;

    document.getElementById("SignInButton").onclick = function () { 
        SignIn( fullSignForm[0].value, fullSignForm[1].value, fullSignForm[2].value, fullSignForm[3].value )
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
        resetSignIn();

        throw console.error("Sign In Failed! Code 2");
    }

    signInputs = [signEmail, signUser, signPassword];

    //checks if a valid email format is correctly typed
    if (signEmail.includes("@") === false || signEmail.includes(".com") === false) { //second and last check, after browser warning.
        alert("Email is not well inserted! insert a valid like this: example@exampledomain.com");
        statusSignText.style.color = "red";
        statusSignText.textContent = "Enter a valid email format!";
      
        throw console.error("Email bad format. Code 3");
    }
    //if changed, back again
    statusSignText.style.color = "greenyellow";
    
    //check if username has a char.
    checkUsernameChar(signUser)
    

    newUser1 = new User(...signInputs);
    Users.offline.push(newUser1);
    Users.total.push(newUser1);

    //return to initial state
    resetSignIn();
    
    //add in counting
    userCount("offline");
    userCount("total");
    
    //show success
    console.log("User Signed!");
    statusSignText.textContent = "User Successfully Signed!";

    return newUser1;//debug
};

//LogIn deve acessar a memória do banco e verificar se as infos do input coincidem
const LogIn = (logEmail, logPassword) => {

    checkMissingSpaces(fullLoginForm);


    //search for email, push to online status.
    
    
    //uservar.push(Users[online]);

};

const LogOut = () => {


};

//admins?
