
/* include this in the html file to set the countdown clock

<script src="/static/js/countdown.js"></script> --
    <script>
        // Set the end time for the countdown to 12:00 on the 3rd of February 2025
        var deadline = new Date(Date.UTC(2025, 1, 3, 12, 0, 0)); // Note: Months are zero-based in JavaScript Date
        initializeClock('clockdiv', deadline);
    </script>

 */




// functuion that makes the countdown clock

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  } 

  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
      var t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

var deadline = new Date(Date.UTC(2025, 1, 3, 12, 0, 0)); // Note: Months are zero-based in JavaScript Date

  




/*
  function showVectorApplication(id) {
    var div = document.getElementById(id)
    div.parentElement.innerHTML = '<br / ><a style="text-align: center;"href="https://forms.gle/LpwLmtV32kJUd5sL9"><button class="applyBtn">Ansøg nu!</button></a><br />'
  }

  var deadline = new Date("February 9, 2024 23:59:59");
  if (deadline < new Date) {
    showVectorApplication("clockdiv")
  } else {
    
  }

  initializeClock("clockdiv", deadline);
  document.getElementById("demo").innerHTML = deadline;
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  } 

  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
      var t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

  function showVectorApplication(id) {
    var div = document.getElementById(id)
    div.parentElement.innerHTML = '<br / ><a style="text-align: center;"href="https://forms.gle/LpwLmtV32kJUd5sL9"><button class="applyBtn">Ansøg nu!</button></a><br />'
  }

  var deadline = new Date("February 9, 2024 23:59:59");
  if (deadline < new Date) {
    showVectorApplication("clockdiv")
  } else {
    
  }

  initializeClock("clockdiv", deadline);
  document.getElementById("demo").innerHTML = deadline;

  */