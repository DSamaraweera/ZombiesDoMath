import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js'
import { getDatabase, onValue, ref, update } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js'


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



    //get the currentscore
    var score = location.href.split("score")[1];

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Check current user
            const uid = user.uid;
            // Database reference
            const db_ref = ref(database, 'Users/' + uid);

            //retrieve highscore from database
            onValue(db_ref, (snapshot) => {
            var highScore = snapshot.val().highScore;

            //show score in page
            document.getElementById("scr").innerHTML = `Score : ${score}`; 
           
            //check score higher than highest score
            if(score > highScore){
                document.getElementById("highScr").innerHTML = `High Score : ${score}`;
                //update highscore
                updateHighScore(db_ref);
            }else{
                document.getElementById("highScr").innerHTML = `High Score : ${highScore}`;
            }

            //Show ScoreBoard and hide LoadingSpinner after getting HighScore from Database
            document.getElementById('SBoard').style.display = "block";
            document.getElementById('LoadSpinner').style.display = "none";

            });
            
        } else {
            // User is signed out
            siiimpleToast.alert('No user exist');
        }
    })



    //Web Animation API for points
    var point1 = document.getElementById('star1');
    var point2 = document.getElementById('star2');
    var point3 = document.getElementById('star3');

    if(score >= 800){
        point1.src = '../Images/star.png';
        point2.src = '../Images/star.png';
        point3.src = '../Images/star.png';
    }else if(score >= 600) {
        point1.src = '../Images/star.png';
        point2.src = '../Images/star.png';
    }else if(score >= 400){
        point1.src = '../Images/star.png';
    }else{

    }
    //set rotating effect
    const rotateKeyframes = [
        {transform: 'rotate(0deg)'},
        {transform: 'rotate(360deg)'}
    ]
    const rotateTiming = {
        duration: 2000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    }
    point1.animate(rotateKeyframes, rotateTiming);
    point2.animate(rotateKeyframes, rotateTiming);
    point3.animate(rotateKeyframes, rotateTiming);


    //Update highscore in database when score > highscore
    function updateHighScore(db_ref) {
        update(db_ref, {
            highScore : score
          });
        siiimpleToast.success('New HighScore');
    }


