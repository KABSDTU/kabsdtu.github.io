---
layout: en
title: Apply as a vector
---

<h1 id="titel">Applications for Summer Vector '24 opens soon!</h1>

<div id="poster-image" style="margin: auto; width: 530px; height: 300px; background-image: url('/static/img/endeligåbent.gif');">
</div>

<p id ="n">The applications for Vector '24 opens soon!.</p>
<p id ="nn">See you!</p>
<br />


If you have questions, check out: <a href="/en/vektor">Vector</a>

<script>

  function showVectorApplication() {
    var div = document.getElementById("n")
    var n = document.getElementById("nn")
    var titel = document.getElementById("titel")
    titel.innerHTML = "The application for Vector'24 is open!"
    n.remove()
    div.innerHTML = '<br / ><a style="text-align: center;"href="https://forms.gle/LtQ5aKVS3YCN8Cbq6"; target="_blank"><button class="applyBtn">Apply now!</button></a><br />'
  }

  var deadline = new Date("February 11, 2024 00:00:01");
  if (deadline > new Date) {
    showVectorApplication()
  }
    
</script>