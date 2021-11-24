import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js'

var newLayer = new ol.layer.Tile({
    source: new ol.source.OSM({
        url: 'Js/Menu.js',
        crossOrigin: null
        })
});
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
    initializeApp(firebaseConfig);
    const auth = getAuth();

    //Check user has signed in or not
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            const uid = user.uid;
            document.getElementById('signin_text').innerHTML = "SignOut";
        } else {
            // User is signed out
            document.getElementById('signin_text').innerHTML = "SignIn";
        }
    })

   
    //User Signout 
    signin_out.addEventListener('click', (event) => {
        event.preventDefault();
        //Check user signned in
        if(document.getElementById('signin_text').innerHTML == "SignOut"){
            signOut(auth).then(() => {
            // Sign-out successful.
            document.getElementById('signin_text').innerHTML = "SignIn";
            siiimpleToast.success('You have been loggedout');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                //customize firebase error code
                var customError = errorCode.split("auth/")[1];
                //toast error
                siiimpleToast.alert(customError);
            });
        }
        else{
            window.location.href = "Html/Signin.html";
        }
    });

    //Validation for play button to check user signed in or not
    document.getElementById('Play').onclick = function() {
        if(document.getElementById('signin_text').innerHTML == "SignOut"){
            window.location.href = "Html/Level.html";
        }else{
            siiimpleToast.alert('You should SignIn first');  
        }
    }

    