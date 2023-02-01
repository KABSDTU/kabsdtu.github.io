---
layout: default
title: Ansøg som Vektor
---
<h1 id="titel">Ansøgningen til Vektor '23 er lukket! </h1>

<div id="poster-image" style="margin: auto; width: 530px; height: 800px; background-image: url('/static/img/ansognuSommerDa23.png');">
</div>

<p id ="n">Ansøgningen er til Vektor '23 er lukket for nu. </p>
<p id ="nn">Vi ses snart.</p>
<br />


Hvis du har nogle spørgsmål, kig her: <a href="/vektor">Vektor</a>

<script>

  function showVectorApplication() {
    var div = document.getElementById("n")
    var n = document.getElementById("nn")
    var titel = document.getElementById("titel")
    titel.innerHTML = "Ansøgningen til Vektor '23 er åben!"
    n.remove()
    div.innerHTML = '<br / ><a style="text-align: center;"href="https://forms.gle/ixkR7jgdV6q87oWk6"><button class="applyBtn">Ansøg nu!</button></a><br />'
  }

  var deadline = new Date("February 11, 2023 00:00:01");
  if (deadline > new Date) {
    showVectorApplication()
  }
    
</script>