# My Login Page
* By Átila Lima, 2023

## English
A simple project of a LogIn/SignUp, with the assignment of clients(Users), and Access of them.  

* **Status**: Currently in development, already have the possibility to sign up and log in to the site, still it does not save the information about the accounts.

All the information is storaged in the form of the "User" class, and transfered to "Users" object,  
Which divides the users into "online" and "total" arrays, The online users and the total signed users respectly. Along with them, a storage for numbers counting the ammout of users.
 
### Sign stage
The Sign method has the principal purpose to sign a new user. It will basically get the data of the user and treat them to then be storaged.
 
To create a user, solely input an Email, Username, and Password (and confirm it) in the sign up areas in 'login.html'.

#### Sign Rules 
There's some rules to fill the query, that filter the insertion of data, to maintain the data uniformally. 
If they one of them is ouscious, the code will throw an alert to the user, and will abort. 
1. The SignUp area must not be empty in any input
2. A second password input for checking is incorrect
3. The Email needs to be in the valid format (as email@domain.com)
4. The Username needs to have a character
5. No account can have duplicate Emails

### Login stage
The Login method has the principal purpose to login a user. It will receive the requested login, search for a valid user in the storage, and give the access to the given user. 
 
To Login, input Email and Password in the login areas in 'login.html'.
 
#### Login Rules
As for Login, there's some rules for to give the access of the given account to the user, too. If one of them is disatisfied, the code will throw an alert to the user, and abort.
1. The Login area must not have any empty input
2. The user **must** be alredy signed to the website. If not signed yet, proceed to SignUp area
3. The selected account (by Email) must match the inputed password.
4. The account cannot be already logged. 


## Console Debugging
* There are several infos about the execution of the code that are logged in the console.
* Several errors are thrown into console, to stop and inform what's gone wrong in the execution. The complete list of error's codes are in "errorCodes.txt" in the repo.

## PT-BR

Um projeto de um Login/Signin simples. Ainda em desenvolvimento.