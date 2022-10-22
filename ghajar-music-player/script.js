let musics = [
    {name: "Galadriel", src: "/music/Galadriel.mp3", isFav: false, cover: "/cover/Galadriel.png"},
    {name: "Sauron", src: "/music/Sauron.mp3", isFav: false, cover: "/cover/Sauron.png"},
    {name: "Valinor", src: "/music/Valinor.mp3", isFav: false, cover: "/cover/Valinor.jpg"},
    {name: "The Rings of Power", src: "/music/The Rings of Power.mp3", isFav: false, cover: "/cover/TheRingsofPower.jpg"},
    {name: "Numenor", src: "/music/Numenor.mp3", isFav: false, cover: "/cover/Numenor.jpg"},
    {name: "Bronwyn and Arondir", src: "/music/Bronwyn and Arondir.mp3", isFav: false, cover: "/cover/BronwynandArondir.jpg"},
    {name: "Nampat", src: "/music/Nampat.mp3", isFav: false, cover: "/cover/Nampat.jpg"}
];
let currentMusicObj = musics[0], currentMusicNumber = 0;

let musicPlayer = document.querySelector("audio");
let musicName = document.querySelector(".musicName");
let previous = document.querySelector(".previous");
let backward = document.querySelector(".backward");
let play = document.querySelector(".play");
let playIcon = document.querySelector(".play img")
let forward = document.querySelector(".forward");
let next = document.querySelector(".next");
let currentTimeBar = document.querySelector(".currentTime");
let duration = document.querySelector(".duration");
let heart = document.querySelector(".like img");
let elapsedTime = document.querySelector(".elapsedTime")
let remainingTime = document.querySelector(".remainingTime")
let volume = document.querySelector(".volume");
let currentVolumeBar = document.querySelector(".currentVolume")
let background = document.querySelector(".image");
let TwoX = document.querySelector(".rate");
let mute = document.querySelector(".soundControl .Speaker img");
let playBack = document.querySelector(".repeat img");
let shuffle = document.querySelector(".shuffle img");

let paused = true, fast = false, isMute = false, repeat = false, isShuffle = false, isPlaying = false ;
let savedVolume;
musicPlayer.volume = 0.5;


setInterval(function () {
    //timeBar check
    currentTimeBar.style.width = (musicPlayer.currentTime / musicPlayer.duration) * 100 + "%";


    //elapsed and remaining time

    let EminuteNum = Math.floor(Math.floor(musicPlayer.currentTime) / 60);
    let EsecondNum = Math.floor(musicPlayer.currentTime) % 60;
    let RminuteNum = Math.floor(Math.floor(musicPlayer.duration - musicPlayer.currentTime) / 60);
    let RsecondNum = Math.floor(musicPlayer.duration - musicPlayer.currentTime) % 60;

    let EsecondP, RsecondP;
    if(EsecondNum < 10)
            EsecondP = "0" + EsecondNum;
    else
        EsecondP = EsecondNum;

    if(RsecondNum < 10)
        RsecondP = "0" + RsecondNum;
    else
        RsecondP = RsecondNum;

    elapsedTime.innerHTML = "0" + EminuteNum + ":" + EsecondP;
    remainingTime.innerHTML = "0" + RminuteNum + ":" + RsecondP;

    //like check
    if(!musics[currentMusicNumber].isFav) {
        heart.src = "/image/heart-empty.png"
    }else {
        heart.src = "/image/heart-full.png"
    }

    //repeat and shuffle and next song check
    if(repeat) {
        if(musicPlayer.duration === musicPlayer.currentTime)
            musicPlayer.play();
    }else {
        if(isShuffle) {
            if(musicPlayer.duration === musicPlayer.currentTime) {
                currentMusicNumber = Math.floor(Math.random() * 7);
                currentMusicObj = musics[currentMusicNumber];
                musicPlayer.src = currentMusicObj.src;
                playIcon.src = "/image/pause.png";
                musicName.innerHTML = "« " + musics[currentMusicNumber].name + " »";
                background.style.backgroundImage = "url(" + musics[currentMusicNumber].cover + ")";
                musicPlayer.play();
            }
        }else {
            if(musicPlayer.duration === musicPlayer.currentTime) {
                if(currentMusicNumber < musics.length) {
                    currentMusicNumber = (currentMusicNumber + 1) % 7;
                    currentMusicObj = musics[currentMusicNumber];
                    musicPlayer.play();
                }else {
                    currentMusicNumber = 0;
                    currentMusicObj = musics[currentMusicNumber];
                }
                musicPlayer.src = currentMusicObj.src;
                playIcon.src = "/image/pause.png";
                musicName.innerHTML = "« " + musics[currentMusicNumber].name + " »";
                background.style.backgroundImage = "url(" + musics[currentMusicNumber].cover + ")";
                musicPlayer.play();
            }
        }
    }
}, 200)

TwoX.addEventListener("click", function () {
    if(fast) {
        musicPlayer.playbackRate = 1;
        TwoX.style.color = "black";
        TwoX.style.filter = "none";
        fast = false;
    }else {
        musicPlayer.playbackRate = 2;
        TwoX.style.color = "white";
        TwoX.style.filter = "drop-shadow(0 0 2px white)";
        fast = true;
    }
})
next.addEventListener("click", function () {
    currentMusicNumber = (currentMusicNumber + 1) % 7;
    PlayMusic();
})
previous.addEventListener("click", function () {
    if(currentMusicNumber === 0) {
        currentMusicNumber = 6;
    }else  {
        currentMusicNumber = (currentMusicNumber - 1) % 7;
    }
    PlayMusic();
})
play.addEventListener("click", function () {
    if(paused) {
        playIcon.src = "/image/pause.png";
        musicName.innerHTML = "« " + musics[currentMusicNumber].name + " »";
        background.style.backgroundImage = "url(" + musics[currentMusicNumber].cover + ")";
        musicPlayer.play();
        paused = false;
    }else {
        playIcon.src = "/image/play.png";
        musicPlayer.pause();
        paused = true;
    }
})
forward.addEventListener("click", function () {
    musicPlayer.currentTime += 10;
})
backward.addEventListener("click", function () {
    musicPlayer.currentTime -= 10;
})
heart.addEventListener("click", function () {
    if(!musics[currentMusicNumber].isFav) {
        heart.src = "/image/heart-empty.png"
        musics[currentMusicNumber].isFav = true
    }else {
        heart.src = "/image/heart-full.png"
        musics[currentMusicNumber].isFav = false
    }
})
mute.addEventListener("click", function () {
    if(isMute) {
        musicPlayer.volume = savedVolume;
        mute.src = "image/unmute.png";
        isMute = false;
    }else {
        savedVolume = musicPlayer.volume;
        musicPlayer.volume = 0;
        mute.src = "image/mute.png";
        isMute = true;
    }
    currentVolumeBar.style.width = musicPlayer.volume * 100 + "%";
})
playBack.addEventListener("click", function () {
    shuffle.style.filter = "brightness(100%)"
    isShuffle = false;
    if(repeat) {
        playBack.style.filter = "brightness(100%)";
        repeat = false;
    }else {
        playBack.style.filter = "brightness(300%)";
        repeat = true;
    }

})
shuffle.addEventListener("click", function () {
    playBack.style.filter = "brightness(100%)"
    repeat = false;
    if(isShuffle) {
        shuffle.style.filter = "brightness(100%)"
        isShuffle = false;
    }else {
        shuffle.style.filter = "brightness(400%)"
        isShuffle = true;
    }
})




function PlayMusic() {
    currentMusicObj = musics[currentMusicNumber];
    musicPlayer.src = currentMusicObj.src;
    paused = false;
    isPlaying = true;
    if(isPlaying) {
        playIcon.src = "/image/pause.png";
        musicName.innerHTML = "« " + musics[currentMusicNumber].name + " »";
        background.style.backgroundImage = "url(" + musics[currentMusicNumber].cover + ")";
        musicPlayer.play();
    }else {
        musicName.innerHTML = "« " + musics[currentMusicNumber].name + " »";
        background.style.backgroundImage = "url(" + musics[currentMusicNumber].cover + ")";
        playIcon.src = "/image/play.png";
        musicPlayer.pause();
        // isPlaying = false
    }
}


duration.addEventListener("click", function (e) {
    musicPlayer.currentTime = e.offsetX * musicPlayer.duration / duration.offsetWidth;
})
duration.addEventListener("mouseenter", function (e) {
    duration.style.height = "5px";
})
duration.addEventListener("mouseleave", function (e) {
    duration.style.height = "2px";
})
volume.addEventListener("click", function (e) {
    musicPlayer.volume = e.offsetX  / volume.offsetWidth;
    currentVolumeBar.style.width = musicPlayer.volume * 100 + "%";

})
volume.addEventListener("mouseenter", function (e) {
   volume.style.height = "5px";
})
volume.addEventListener("mouseleave", function (e) {
    volume.style.height = "2px";
})





//background animation
const colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7"];
const numBalls = 50;
const balls = [];
for (let i = 0; i < numBalls; i++) {
    let ball = document.createElement("div");
    ball.classList.add("ball");
    let color = colors[Math.floor(Math.random() * colors.length)];
    ball.style.background = color;
    ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
    ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
    ball.style.transform = `scale(${Math.random()})`;
    ball.style.width = `${Math.random() * 2}em`;
    ball.style.filter = "drop-shadow(0 0 10px " + color + ")";
    ball.style.height = ball.style.width;

    balls.push(ball);
    document.body.append(ball);
}
// Keyframes
balls.forEach((el, i, ra) => {
    let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12
    };

    let anim = el.animate(
        [
            { transform: "translate(0, 0)" },
            { transform: `translate(${to.x}rem, ${to.y}rem)` }
        ],
        {
            duration: (Math.random() + 1) * 2000, // random duration
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
        }
    );
});
