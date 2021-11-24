import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js'
import { getDatabase, set, ref, update } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js'


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

  //User Registration
  reg_btn.addEventListener('click', () => {
    //Get values from user inputs
    var user_name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var high_score = 0;
    var confirmPassword = document.getElementById('confirmPassword').value;
    
    
    validateConfirmPassword(password, confirmPassword);
    validateField(user_name, confirmPassword);

    createUserWithEmailAndPassword( auth, email, password )
    .then((userCredential) => {
      // Signed in Authentication
      const user = userCredential.user;

      // Create User data
      var user_data = {
        name : user_name,
        email : email,
        highScore : high_score,

      }
      // Push data into Firebase Database
      set(ref(database,'Users/' + user.uid), user_data);
      // Show account create toast
      siiimpleToast.success('Your account have been created successfully');
      //Wait until toast clear and redirect to signin page
      window.setTimeout(function(){
        window.location.href = "Signin.html";
      }, 4000);  
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

  function validateConfirmPassword(password, confirmPassword){
    if(password !== confirmPassword){
      siiimpleToast.alert('Password do not match');
      return;
    }
    
  }

  function validateField(user_name, confirmPassword) {
    if (user_name == null || confirmPassword || null) {
      siiimpleToast.alert('Please fill all fields');
      return;
    }   
    if (user_name.length <= 0 || confirmPassword.length <= 0) {
      siiimpleToast.alert('Please fill all fields');
      return;
    }
  }

  //Implement Show/Hide password on Eye icon click
  var eye = document.getElementById("eye");
  eye.onclick = function(){
      var password = document.getElementById('password');
      var confirmPassword = document.getElementById('confirmPassword');
      if(eye.className === 'fa fa-eye'){
          password.type = 'text';
          confirmPassword.type = 'text';
          eye.className = 'fa fa-eye-slash';
      }else {
          password.type = 'password';
          confirmPassword.type = 'password';
          eye.className = 'fa fa-eye';
      }     
  }
    




