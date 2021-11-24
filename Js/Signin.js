import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js'
import { getDatabase, ref, update } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js'


    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAXL_AZAbJyx9_LObJUTW8yX-78hHBTyEY",
        authDomain: "mathpuzzlegame-c9bbd.firebaseapp.com",
        databaseURL: "https://mathpuzzlegame-c9bbd-default-rtdb.firebaseio.com",
        projectId: "mathpuzzlegame-c9bbd",
        storageBucket: "mathpuzzlegame-c9bbd.appspot.com",
        messagingSenderId: "244402458568",
        appId: "1:244402458568:web:5ad3c470e4e51a6ee4fafd"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth();  

    //User Login
    SignInBtn.addEventListener('click', () => {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // set lastLogin
            const date = new Date();
            update(ref(database,'Users/' + user.uid), {
            last_login : date
            });
            //navigate to mainmenu 
            window.location.href = "../Index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //customize firebase error code
            var customError = errorCode.split("auth/")[1];
            //toast error
            siiimpleToast.alert(customError);
        });
    });


    document.getElementById("forgotPW").onclick = function(){

        var email = document.getElementById('email').value;
        sendPasswordResetEmail(auth, email)
        .then(() => {
            siiimpleToast.success('Reset Password verification sent to your email');
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //customize firebase error code
            var customError = errorCode.split("auth/")[1];
            //toast error
            siiimpleToast.alert(customError);
        });
    }

    //Implement Show/Hide password on Eye icon click
    var eye = document.getElementById("eye");
    eye.onclick = function(){
        var password = document.getElementById('password');
        if(eye.className === 'fa fa-eye'){
            password.type = 'text';
            eye.className = 'fa fa-eye-slash';
        }else {
            password.type = 'password';
            eye.className = 'fa fa-eye';
        }     
    }