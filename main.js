music2="";
music="";
song1status="";
song2status="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
scorerightwrist=0;
function preload(){
    music=loadSound("music.mp3");
    music2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    v=createCapture(VIDEO);
    v.hide();
    y=ml5.poseNet(v,modelloded);
    y.on('pose',gotposes);
}
function draw(){
    image(v,0,0,600,500);
    song1status=music.isPlaying();
    song2status=music2.isPlaying();
    if(scorerightwrist>0.2){
        circle(rightwristx,rightwristy,20);
        music2.stop();
        if(song1status==false){ 
            music.play();
            document.getElementById("b").innerHTML="Song name : Harrypotter theme song."
        }
    }
    if(scoreleftwrist>0.2){
        circle(leftwristx,lefttwristy,20);
        music.stop();
        if(song2status==false){ 
            music2.play();
            document.getElementById("b").innerHTML="Song name : Peter pan song."
        }
    }
}
function modelloded(){
    console.log("Model is loaded");
}
function gotposes(ans){
    if(ans.length>0){
        console.log(ans);
        leftwristx=ans[0].pose.leftWrist.x;
        leftwristy=ans[0].pose.leftWrist.y;
        rightwristx=ans[0].pose.rightWrist.x;
        rightwristy=ans[0].pose.rightWrist.y;
        console.log("left wrist x is ",leftwristx+"left wrist y is ",leftwristy);
        console.log("right wrist x is ",rightwristx+"right wrist y is ",rightwristy);
        scoreleftwrist=ans[0].pose.keypoints[9].score;
        scorerightwrist=ans[0].pose.keypoints[10].score;
        console.log("score of left wrist is",scoreleftwrist);
        console.log("score of right wrist is",scorerightwrist);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}