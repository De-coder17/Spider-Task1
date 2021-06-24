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

