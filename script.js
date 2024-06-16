let timerInterval;
let timeLeft = 25 * 60;

const imgAni = document.querySelector(".imageAnimation");

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
  document.getElementById("startBtn").disabled = true;
  document.getElementById("stopBtn").disabled = false;
  document.getElementById("resetBtn").disabled = false;
  movingCat.style.display = "block";
  stopCat.style.display = "none";
  resetBtn.style.display = "block";
  imgAni.style.animationPlayState = "running";
}

function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById("startBtn").disabled = false;
  document.getElementById("stopBtn").disabled = true;
  document.getElementById("resetBtn").disabled = false;
  movingCat.style.display = "none";
  stopCat.style.display = "block";
  imgAni.style.animationPlayState = "paused";
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 25 * 60;
  updateTimer();
  document.getElementById("startBtn").disabled = false;
  document.getElementById("stopBtn").disabled = true;
  document.getElementById("resetBtn").disabled = true;
  resetBtn.style.display = "none";
  movingCat.style.display = "none";
  stopCat.style.display = "block";
  imgAni.style.animationPlayState = "paused";
}

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  let formattedTime =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  document.getElementById("timer").textContent = formattedTime;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("resetBtn").disabled = false;
  }

  timeLeft--;

  if (formattedTime === "00:00") {
    alert("Time to Rest !");
    resetBtn.style.display = "block";
    movingCat.style.display = "none";
    stopCat.style.display = "block";
    imgAni.style.animationPlayState = "paused";
  }
}

const movingCat = document.querySelector(".movingCat");
const stopCat = document.querySelector(".stopCat");
const resetBtn = document.querySelector("#resetBtn");

function hide() {
  movingCat.style.display = "none";
  resetBtn.style.display = "none";
}

hide();

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

// Quote API

const quoteArr = [];
const authorArr = [];

const fetchQuotes = async (category) => {
  while (true) {
    const res = await fetch(
      "https://api.api-ninjas.com/v1/quotes?category=" + category,
      {
        headers: {
          "X-Api-Key": "uEySak6Nx3Tl3fLXRviBqGYQOLBiLfWOpjPQKG1L",
        },
      }
    );
    const data = await res.json();
    console.log(data[0].quote.length);
    if (data[0].quote.length < 100) {
      quoteArr.push(data[0].quote);
      console.log(quoteArr.toString());
      authorArr.push(data[0].author);
      const quotediv = document.querySelector("#quote");
      quotediv.append(`"${quoteArr}" - ${authorArr}`);
      break;
    }
  }
};

fetchQuotes("happiness");

// Weather API

const sunnyIcon = document.querySelector("#sunny");
const cloudyIcon = document.querySelector("#cloudy");
const rainyIcon = document.querySelector("#rainy");
const tempDiv = document.querySelector("#temp");
const weatherTextDiv = document.querySelector("#weatherText");

function hideWeather() {
  sunnyIcon.style.display = "none";
  cloudyIcon.style.display = "none";
  rainyIcon.style.display = "none";
}

hideWeather();

const weather = async (city) => {
  const res = await fetch(
    "https://api.api-ninjas.com/v1/weather?city=" + city,
    {
      headers: {
        "X-Api-Key": "POyT/fuhiIy3DX7pzLuvMA==x9wUyJmh99gSvdjc",
      },
    }
  );
  const data = await res.json();
  console.log(data);
  // Temperature
  const temp = data.temp;
  tempDiv.append(`${temp}°`);
  // Weather Icon and Text
  const cloud = data.cloud_pct;
  const humid = data.humidity;
  if (cloud > 80 && humid > 90) {
    rainyIcon.style.display = "block";
    weatherTextDiv.append("Rainy");
  } else if (cloud > 90) {
    cloudyIcon.style.display = "block";
    weatherTextDiv.append("Cloudy");
  } else {
    sunnyIcon.style.display = "block";
    weatherTextDiv.append("Sunny");
  }
};

weather("hongkong");

// Herman

let firstPage = document.querySelector("#popup");
let imgBg = document.querySelector(".imageAnimation");
let choice1 = document.querySelector("#choice1");
choice1.addEventListener("click", function () {
  imgBg.src = "./picture/happy.jpeg";
  firstPage.style.display = "none";
});

let choice2 = document.querySelector("#choice2");
choice2.addEventListener("click", function () {
  firstPage.style.display = "none";
  imgBg.src = "./picture/sad.jpeg";
});

let choice3 = document.querySelector("#choice3");
choice3.addEventListener("click", function () {
  firstPage.style.display = "none";
  imgBg.src = "./picture/chill.jpeg";
});

let audioOn = document.querySelector(".swap-on");
let audioOff = document.querySelector(".swap-off");
let audiobtn = document.querySelector(".swap");
const audio = new Audio("./Music/Country.mp3");

audioOn.addEventListener("click", function () {
  if ((audiobtn = "swap-on")) {
    audio.volume = 0.1;
    audio.play();
    console.log(audiobtn);
  }
});

audioOff.addEventListener("click", function () {
  if ((audiobtn = "swap-off")) {
    audio.pause();
    console.log(audiobtn);
  }
});

//backbtn

const backbtn = document.querySelector("#backBtn");
backbtn.addEventListener("click", function () {
  firstPage.style.display = "flex";
});
