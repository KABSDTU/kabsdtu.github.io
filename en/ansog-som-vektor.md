---
layout: en
title: Apply as a vector
---

<h1 id="titel">Applications for Summer Vector '25!</h1>

<div id="poster-image" style="margin: auto; width: 530px; height: 300px; background-image: url('/static/img/endeligåbent.gif');">
</div>

<p>
	<br/>
  	<a style="text-align: center;">
  	<a href="https://forms.gle/RbAEkbadRTaW6dCQA" target="_blank">
	<button class="applyBtn">Apply now! </button></a>


<h2 style="text-align: center;"> If you want to become a vector, click the button above!</h2>


<p style="text-align: center;">If you have questions, check out: <a href="/en/vektor">Vector</a> </p>

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