// Digital clock
function clock(){
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let period = "AM";
    if (hrs == 0) {
      hrs = 12;
    } else if (hrs > 12) {
      hrs = hrs - 12;
      period = "PM";
    }
    let time = `${hrs} : ${mins} : ${secs} ${period}`;
    let clockTime = document.querySelector(".time");

    clockTime.innerText = time;
    setInterval(clock , 1000);

}
clock();

//Analog clock
setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {
  
  const currentDate = new Date()
  const secondsRatio = currentDate.getSeconds() / 60
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
  setRotation(secondHand, secondsRatio)
  setRotation(minuteHand, minutesRatio)
  setRotation(hourHand, hoursRatio)
 
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock();

// Analog and digital buttons
const toggleAnalog = document.querySelector(".toggleAnalog");
const toggleDigital = document.querySelector(".toggleDigital");
const digClock = document.querySelector("#clock");
const anagClock = document.querySelector(".analog");

digClock.style.display = "none";

toggleAnalog.addEventListener("click" , function(){
  digClock.style.display = "none";
  anagClock.style.display = "inline";
})

toggleDigital.addEventListener("click" , function(){
  digClock.style.display = "inline";
  anagClock.style.display = "none";

})

const tick = new Audio();
tick.src = "clock.mp3"
 
function tickPlay(){
    tick.play();
}

setInterval(tickPlay , 1000);

