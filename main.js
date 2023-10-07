//Site com Login, SignIn, verificações de formulário e armazenamento de usuários
//By Átila Lima
Users = {
    description: `This is a storage for all users in the site`,
    offline: [], //!: remove this?, count offlines with the diff from total
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
statusLoginText = document.getElementById("loginStatusShow");
statusSignText = document.getElementById("signInStatusShow");

//Secondary SignIn functions
const decideFormError = (selectedForm) => {
    switch(selectedForm){
        case fullSignForm:{
            statusSignText.style.color = "red";
            statusSignText.textContent = "SignIn inputs are incomplete!";
            
            alert("Fill all Sign In Spaces!");
            throw console.error("Fill all spaces in SignIn! Code 1");
            break;
        }
        case fullLoginForm:{
            statusLoginText.textContent = "LogIn inputs are incomplete!";
            
            alert("Fill all Log In Spaces!");
            throw console.error("Fill all spaces in LogIn! Code 8")
        }
        default: {
            alert("Error ocurred! See console for info.")
        }
    }
}

const checkMissingSpaces = (selectedForm) => {
    for (let i = 0; i < selectedForm.length; i++) {
        console.log("value ", i, selectedForm[i].value); //debugging
        if (selectedForm[i].value.length === 0) {  //if value is >empty<, err

            decideFormError(selectedForm);
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
	        resetForm("sign")

            statusSignText.style.color = "red";
            statusSignText.textContent = "Email Already Existant!";

	        throw console.error("Duplicate Email! Code 5")
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
    	    alert("Error ocurred! See console for info.")
    	    console.warning("Not valid counting typo inserted. Code 7")
    	    break;
    	}
    }
};

//when finished or failed
const resetForm = (selectedForm) => { //shall have a switch for login
    switch(selectedForm){
        case "sign" || "SignIn":{
            document.getElementById("checkPasswordSignIn").hidden = true;
            document.getElementById("checkPassBr").hidden = true;
            document.getElementById("SignInButton").onclick = function () {
                SignInFirst()
            };

            fullSignForm[0].value = null;
            fullSignForm[1].value = null;
            fullSignForm[2].value = null;
            fullSignForm[3].value = null;
            break;
        }
        case "login" || "LogIn": {
            statusLoginText.textContent = undefined;

            fullLoginForm[0].value = null;
            fullLoginForm[1].value = null;
        }
        default:{
            alert("Error ocurred! See console for info.")
            console.warning("Not valid form inserted to reset. Code 6")
        }
    }
};


//Primary SignIn functions
const SignInFirst = () => {
    
    //first check. One Email per User.
    checkExistingEmail(fullSignForm[0].value)
    
    statusSignText.style.color = "greenyellow";
    document.getElementById("checkPasswordSignIn").hidden = false;
    document.getElementById("checkPassBr").hidden = false;

    document.getElementById("SignInButton").onclick = function () { 
        SignIn( fullSignForm[0].value, fullSignForm[1].value, fullSignForm[2].value, fullSignForm[3].value )
     };

    statusSignText.textContent = undefined;
};

const SignIn = (signEmail, signUser, signPassword, confirmPassword) => {
    //check if inputs are missing
    checkMissingSpaces(fullSignForm);

    //checkPassword validation
    if (signPassword != confirmPassword) {
        statusSignText.style.color = "red";
        statusSignText.textContent = "Password Check Failed!"; 
        resetForm("sign");

        throw console.error("Password's check don't match! Code 2");
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
    
    //second check! if user change it after the first, it'll pass
    checkExistingEmail(fullSignForm[0].value)

    newUser1 = new User(...signInputs);
    Users.offline.push(newUser1);
    Users.total.push(newUser1);

    //return to initial state
    resetForm("sign");
    
    //add in counting
    userCount("offline");
    userCount("total");
    
    //show success
    console.log("User Signed!");
    statusSignText.textContent = "User Successfully Signed!";
};


//Secondary Login functions
//search for email, verify password, push to online status, remove from offline status(or remove "offline").
const searchUser = (email) => {
    try {
        for(let i = 0; i <= Users.offline.length; i++){
                if(email === Users.offline[i].email){
                    console.log("email found.");

                    return Users.offline[i];
                }
            }
    } catch(err) {
        if(err instanceof TypeError){
            alert("Email not found/signed. Please check your typo \nor try another email.");
            throw console.error(err.name + ": Email not found in Users object. Code 9");
        } else {throw err}
    }
}

//cant login what's logged. error if already logged.
const searchLoggedUser = (objectUser) => {
    for(let i = 0; i <= Users.offline.length; i++){
        console.log("iterating logged, pos" + i);

        if(objectUser.email === Users.online[i].email){ //err if found.
            statusLoginText.textContent = "Account already logged in!"

            alert("Email already logged in! However's logged need to leave it. \nTry another account to enter!")
            throw console.error("Email already in logged array! Code 11")
        }
    }
}

//Primary Login functions
const LogIn = (logEmail, logPassword) => {
    statusLoginText.textContent = undefined
	
    checkMissingSpaces(fullLoginForm);
    
    //search and storing user
    let selectedUser = searchUser(logEmail);
    
    if(logPassword != selectedUser.password){
        statusLoginText.textContent = "Password Check Failed!";
        
        alert("Wrong account password! Try again."); //should allow only 3 attempts, after that, count 30mins to try again.
        throw console.error("Wrong password. Code 10");
    }

    //check if already logged
    searchLoggedUser(selectedUser);
    
    console.log("Login Succesfull! proceeding...");
    
    Users.online.push(selectedUser); //TODO: and remove from offline (or remove offline)

    resetForm("login");

    //how to save info about onlines?
    //how to go to logged.html?
};


const LogOut = () => { //?: mover para a classe?


};

//! add method to quickly add users in console
//admins?
