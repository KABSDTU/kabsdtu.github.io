---
layout: default
title: Ansøg som Vektor
---
<h1 id="titel">Ansøgningen til Vektor22 er åbner snart. Se med på første infomøde d. 1 Febuar </h1>

<div id="poster-image" style="height: 450px; background-image: url('/static/img/wewantyousmall.png');">
</div>

<p id ="n">Hold øje med den her side, den opdaterer snart ;)) .</p>
<p id ="nn">Vi ses snart.</p>
<br />


Hvis i har nogle spørgsmål, kig på: <a href="/vektor">Vektor</a>

<script>

  function showVectorApplication() {
    var div = document.getElementById("n")
    var n = document.getElementById("nn")
    var titel = document.getElementById("titel")
    titel.innerHTML = "Ansøgningen til Vektor22 er åben!"
    n.remove()
    div.innerHTML = '<br / ><a style="text-align: center;"href="https://docs.google.com/forms/d/e/1FAIpQLSeEOySk8egoJ2r5IrqN9Y7NoKLKmQW2rukfXwy7t-Q1Sh9Glg/viewform?usp=pp_url&entry.313565989=Begge+dele+kan+g%C3%A5+/+Either+can+do"><button class="applyBtn">Ansøg nu!</button></a><br />'
  }

  var deadline = new Date("Feb 12, 2022 00:30:00");
  if (deadline > new Date) {
    showVectorApplication()
  }
    
</script>