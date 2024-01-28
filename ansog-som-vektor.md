---
layout: default
title: Ansøg som Vektor
---
<h1 id="titel">Ansøgningen til Vektor '23 er lukket! </h1>

<div id="poster-image" style="margin: auto; width: 530px; height: 300px; background-image: url('/static/img/endeligåbent.gif');">
</div>

<p id ="n">Ansøgningen er til Vektor '24 åbner den 29. Januar!! </p>
<p id ="nn">Vi ses snart.</p>
<br />


Hvis du har nogle spørgsmål, kig her: <a href="/vektor">Vektor</a>

<script>

  function showVectorApplication() {
    var div = document.getElementById("n")
    var n = document.getElementById("nn")
    var titel = document.getElementById("titel")
    titel.innerHTML = "Ansøgningen til Vektor '24 er åben!"
    n.remove()
    div.innerHTML = '<br / ><a style="text-align: center;"href="https://forms.gle/LtButuFWY1TNc82RA"; target="_blank"><button class="applyBtn">Ansøg nu!</button></a><br />' 
    
  }

  var deadline = new Date("February 11, 2024 00:00:01");
  if (deadline > new Date) {
    showVectorApplication()
  }
    
</script>


<!--   Add this efter n.remove() in script once the link to applications open
div.innerHTML = '<br / ><a style="text-align: center;"href="https://docs.google.com/forms/d/e/1FAIpQLSd_wGM2P4LsQfe_a1YR8TYIhOQ1Ens3eHC6JateUD_RJiPzqA/viewform?usp=sf_link"><button class="applyBtn">Ansøg nu!</button></a><br />' 
-->