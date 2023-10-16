//Site com Login, SignUp, verificações de formulário e armazenamento de usuários
//By Átila Lima
Users = {
    description: `This is a storage for all users in the site`,
    online: [], 
    banned: [], //TODO: develop admins
    total: [], //total

    offlineCount: 0,
    onlineCount: 0,
    bannedCount: 0,
    totalCount: 0
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
fullLoginFormCrude = document.querySelectorAll("form")[0].querySelectorAll("input"); //! erroing in logged.html (should create another js)
fullLoginForm = Array.from(fullLoginFormCrude); //array

fullSignFormCrude = document.querySelectorAll("form")[1].querySelectorAll("input");
fullSignForm = Array.from(fullSignFormCrude); //array

console.log(fullLoginForm);
statusLoginText = document.getElementById("loginStatusShow");
statusSignText = document.getElementById("signUpStatusShow");

//Secondary SignUp functions
const decideFormError = (selectedForm) => {
    switch(selectedForm){
        case fullSignForm:{
            statusSignText.style.color = "red";
            statusSignText.textContent = "SignUp inputs are incomplete!";
            
            alert("Fill all SignUp Spaces!");
            throw console.error("Fill all spaces in SignUp! Code 1");
        }
        case fullLoginForm:{
            statusLoginText.textContent = "LogIn inputs are incomplete!";
            
            alert("Fill all LogIn Spaces!");
            throw console.error("Fill all spaces in LogIn! Code 8")
        }
        default: {
            alert("Error ocurred! See console for info.")
            break;
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

//counts into Users variables. To use in login and signup
const userCount = (type) => {
    //counting offlines
    Users["offlineCount"] = Users["total"].length - Users["online"].length;
	//TODO: MOVE TO BOTTOM

    quantityUsers = Users[type].length;
    switch (type) {
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
        case "sign" || "SignUp":{
            document.getElementById("checkPasswordSignUp").hidden = true;
            document.getElementById("checkPassBr").hidden = true;
            document.getElementById("SignUpButton").onclick = function () {
                SignUpFirst()
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
            break;
        }
        default:{
            alert("Error ocurred! See console for info.")
            console.error("Not valid form inserted to reset. Code 6")
        }
    }
};


//Primary SignUp functions
const SignUpFirst = () => {
    
    //first check. One Email per User.
    checkExistingEmail(fullSignForm[0].value)
    
    statusSignText.style.color = "greenyellow";
    document.getElementById("checkPasswordSignUp").hidden = false;
    document.getElementById("checkPassBr").hidden = false;

    document.getElementById("SignUpButton").onclick = function () { 
        SignUp( fullSignForm[0].value, fullSignForm[1].value, fullSignForm[2].value, fullSignForm[3].value )
     };

    statusSignText.textContent = undefined;
};

const SignUp = (signEmail, signUser, signPassword, confirmPassword) => {
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
    Users.total.push(newUser1);

    //return to initial state
    resetForm("sign");
    
    //add in counting
    userCount("total");
    
    //show success
    console.log("User Signed!");
    statusSignText.textContent = "User Successfully Signed!";
};


//Secondary Login functions
//search for email, verify password, push to online status, remove from offline status(or remove "offline").
const searchUser = (email) => {
    try {
        for(let i = 0; i <= Users.total.length; i++){
                if(email === Users.total[i].email){
                    console.log("email found.");

                    return Users.total[i];
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
    for(let i = 0; i < Users.online.length; i++){
        console.log("iterating logged, pos" + i);

        if(objectUser.email === Users.online[i].email){ //err if found.
            statusLoginText.textContent = "Account already logged in!";

            alert("Email already logged in! However's logged need to leave it. \nTry another account to enter!");
            throw console.error("Email already in logged array! Code 11");
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
        
        alert("Wrong account password! Try again."); //?: should allow only 3 attempts, after that, count 30mins to try again.
        throw console.error("Wrong password. Code 10");
    }

    //check if already logged
    searchLoggedUser(selectedUser);
    
    console.log("Login Succesfull! proceeding...");
    
    Users.online.push(selectedUser);
    userCount("online");

    resetForm("login");

    //redirect to 'logged' page
    window.location.assign("logged.html");
};

//!: use Json to save 'Users';
//!: and window.localStorage to know which account is logged.

//TODO: add method to quickly add users in console

//TODO: admins
