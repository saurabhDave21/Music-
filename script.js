var arr = [
    { img: "images/animal.jpg", SongName: "Phele mai bhi", Singer: "Saurabh", url: "songs/Pehle Bhi Main.mp3", time: "2:46" },
    { img: "images/Desi kalkar.jpeg", SongName: "Yo Yo honey", Singer: "Honey Paji", url: "songs/Yo yo.mp3", time: "15:00" },
    { img: "images/jale.jpg", SongName: "Jale 2", Singer: "Bhagy", url: "songs/Jale 2.mp3", time: "3:20" },
    { img: "images/ram.jpg", SongName: "Ram Siya Ram", Singer: "Saurabh", url: "songs/Ram Siya Ram.mp3", time: "1:45" },
    { img: "images/kk.png", SongName: "KK Playlist", Singer: "KK", url: "songs/KK.mp4", time: "5:10" },
    { img: "images/animal.jpg", SongName: "Arjan Vailly", Singer: "Saurabh", url: "songs/Arjan Vailly Ne.mp3", time: "1:10" },
];

var allSongs = document.querySelector("#song-continer")
var play = document.querySelector("#play")
var backward = document.querySelector("#backward")
var forward = document.querySelector("#forward")
var audio = new Audio()
var selectedSong = 0;


function showSong() {


    let cultter = "";
    arr.forEach(function (obj, index) {
        cultter += `<div class="part" data-index="${index}">
                    <div class="img"><img src="${obj.img}" /></div>
                    <h2>${obj.SongName}</h2>
                    <h3>${obj.Singer}</h3>
                </div>`;
    });
    document.querySelector('#song-continer').innerHTML = cultter;

    let cut = ""
    arr.forEach(function (pr, index) {
        cut += `<div class="left-Popular">
                            <div class="simg"><img src="${pr.img}"/></div>
                            <h3>${index + 1}</h3>
                            <h3>${pr.SongName}</h3>
                            <h3>${pr.time}</h3>
                            <h3>...</h3>
                        </div>`;
    })
    document.querySelector('.popular-part').innerHTML = cut;
    audio.src = arr[selectedSong].url

}
showSong();

allSongs.addEventListener("click", function (e) {
    const clickedPart = e.target.closest(".part");
    if (clickedPart) {
        selectedSong = parseInt(clickedPart.getAttribute("data-index"));
        audio.src = arr[selectedSong].url;
        audio.play();
        play.innerHTML = `<i class="ri-pause-mini-fill"></i>`;
        flag = 1;
    }
});


var flag = 0
play.addEventListener("click", function () {
    if (flag === 0) {
        play.innerHTML = `<i class="ri-pause-mini-fill"></i>`;
        audio.play();
        flag = 1;
    } else {
        play.innerHTML = `<i class="ri-play-mini-fill"></i>`;
        audio.pause();
        flag = 0;
    }
});


forward.addEventListener("click", function () {
    if (selectedSong < arr.length - 1) {
        selectedSong++
        showSong()
        audio.play()
    } else {
        forward.style.opacity = 0.4
    }
})
backward.addEventListener("click", function () {
    if (selectedSong > 0) {
        selectedSong--
        showSong()
        audio.play()
    } else {
        backward.style.opacity = 0.4
    }
})




const timeline = document.querySelector("#timeline");
const timeLeft = document.getElementById("timeLeft");

// Format time helper
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

// Sync timeline and time left
audio.addEventListener("timeupdate", function () {
    timeline.max = audio.duration;
    timeline.value = audio.currentTime;

    // Progress bar visual
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    timeline.style.setProperty("--progress", `${progressPercent}%`);

    // Time left display
    const remaining = audio.duration - audio.currentTime;
    timeLeft.textContent = `-${formatTime(remaining)}`;
});

// Seek with input
timeline.addEventListener("input", function () {
    audio.currentTime = timeline.value;
});
