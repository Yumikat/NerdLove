$(document).ready(function() {
    var loginForm = $("form.login");
    var emailInput = $("input#emailInput");
    var passwordInput = $("input#passwordInput");

    loginForm.on("submit", function(event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };
        
        if (!userData.email || !userData.password) {
            return;
        }
        
        loginUser(userData.email, userData.password);
        registerUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        }).then(function(data) {
            window.location.replace(data);
        }).catch(function(err) {
            console.log(err);
        });
    }

    function registerUser(email, password) {
        $.post("/api/register", {
            email: email,
            password: password
        }).then(function(data) {
            window.location.replace(data);
        }).catch(function(err) {
            console.log(err);
        });
    }

    // var answersChosen = [];
    //
    // $("#submit").on("click", function() {
    //     event.preventDefault();
    //     for (var i = 1; i < 16; i++) {
    //         var dropdownValue = $("#q"+[i]).value;
    //         answersChosen.push(dropdownValue);
    //     }
    //     var newUser = {
    //         answers: answersChosen
    //     }
    //     $.post("/api/matches", newUser).then(function(data) {
    //         console.log(data);
    //     });
    // });
});