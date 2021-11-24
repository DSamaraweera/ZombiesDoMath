var audio = new Audio('../Media/Music1.mp3');
audio.loop = true;
var musicCheck = document.getElementById('sound');
musicCheck.onclick = function(){
    if(audio.paused){
      audio.play();
      musicCheck.src = '../Images/mute.png';
    }else{
      audio.pause();
      audio.currentTime = 0;
      musicCheck.src = '../Images/sound.png';
    }
}