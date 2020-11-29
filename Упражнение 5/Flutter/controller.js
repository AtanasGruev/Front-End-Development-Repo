/*
Да се отвори register.html и за полето user-name да се промени типа от "email" на "text".
Да се валидира формата за регистрация на нов потребител за следното:
 - email
   - да е задължително
   - да съдържа @
   - да има . в името на домейна
   - да има поне 5 символа
 	При грешка - резултатът от валидацията да се запише в елемент с id "errors".
 - паролата
   - минимален брой символи 6
   - да съдържа поне една главна буква
   - да съдържа поне една цифра
   - да съдържа поне един специален символ от списъка
 	 "!@#$%^&"

При грешка - резултатът от валидацията да се запише в елемент с id "errors".

Ако и двете полета са успешно въведени, да се покаже
прозорец със съобщение "Регистрацията е успешна".

*/

document.getElementsByTagName("button")[0].addEventListener("click", validateInput);

function validateInput() {
    // Prevent page from refreshing when submitting form
    event.preventDefault();

    // Get buttons, prepare variables
    var button = document.getElementsByClassName("auth-button")[0];
    var emailInput = ""; var passwordInput = "";

    // Perform checks depending on whether we are at index.html or register.html
    if (button.getAttribute("id") == "register-button") 
    {
        var emailInput = document.getElementsByClassName("auth-input")[1].value;
        var passwordInput = document.getElementsByClassName("auth-input")[2].value;
    }
    else if(button.getAttribute("id") == "login-button")
    {
        var emailInput = document.getElementsByClassName("auth-input")[0].value;
        var passwordInput = document.getElementsByClassName("auth-input")[1].value;      
    }

    // Common password / email checks
    if(emailInput.length < 5 || emailInput.indexOf('@') == -1 ||  
        (emailInput.indexOf('@') == -1 && emailInput.split('@')[1].indexOf('.') == -1)) {
            var errorLog = document.getElementById("errors");
            errorLog.innerHTML += "Email Validation failed! Please enter valid email address!</br>";
        }

    if(passwordInput.length < 6 || passwordInput.search(/[A-Z]/) < 0 || 
        passwordInput.search(/[0-9]/) < 0 || passwordInput.search(/[!@#$%^&]/) < 0) {
            var errorLog = document.getElementById("errors");
            errorLog.innerHTML += "Password Vlidation failed! Please enter valid password!</br>";
        }

    // Perform checks depending on whether we are at index.html or register.html    
    if (button.getAttribute("id") == "register-button") 
    {
        var errorLogText = document.getElementById("errors").innerHTML;    
        if(errorLogText == "") {
            alert("Registration is successful!");
        }

        // Solution to Task 3 - backend;
        var usernameInput = document.getElementsByName("username")[0].value;
        window.auth.register(usernameInput, emailInput, passwordInput, 
            function(isCorrect, errorCode, errorMessage) {
                if(isCorrect) {
                    window.location.href = "posts.html";
                }
                else {
                    document.getElementById("errors").innerHTML += errorMessage;
                }
            }) 
    }
    else if(button.getAttribute("id") == "login-button") 
    {
        var errorLogText = document.getElementById("errors").innerHTML;    
        if(errorLogText == "") {
            alert("Login is successful!");
        }
    }
}