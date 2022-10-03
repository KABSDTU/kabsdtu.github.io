---
layout: default
title: Ansøg som Vektor
---
<h1 id="titel">Ansøgningen til Vektor '22 er lukket for nu. </h1>

<div id="poster-image" style="height: 450px; background-image: url('/static/img/wewantyousmall.png');">
</div>

<p id ="n">Ansøgningen er til Vektor '22 er lukket for nu. </p>
<p id ="nn">Vi ses snart.</p>
<br />


Hvis i har nogle spørgsmål, kig på: <a href="/vektor">Vektor</a>

<script>

  function showVectorApplication() {
    var div = document.getElementById("n")
    var n = document.getElementById("nn")
    var titel = document.getElementById("titel")
    titel.innerHTML = "Ansøgningen til vinter Vektor '22 er åben!"
    n.remove()
    div.innerHTML = '<br / ><a style="text-align: center;"href="https://forms.gle/ixkR7jgdV6q87oWk6"><button class="applyBtn">Ansøg nu!</button></a><br />'
  }

  var deadline = new Date("October 15, 2022 23:59:59");
  if (deadline > new Date) {
    showVectorApplication()
  }
    
</script>