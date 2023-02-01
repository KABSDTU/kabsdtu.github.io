---
layout: en
title: Apply as a vector
---

<h1 id="titel">Applications for Summer Vector '23 are closed!</h1>

<div id="poster-image" style="margin: auto; width: 530px; height: 800px; background-image: url('/static/img/ansognuSommerEn23.png');">
</div>

<p id ="n">The applications for Vector '23 are closed for now.</p>
<p id ="nn">See you soon.</p>
<br />


If you have questions, check out: <a href="/en/vektor">Vector</a>

<script>

  function showVectorApplication() {
    var div = document.getElementById("n")
    var n = document.getElementById("nn")
    var titel = document.getElementById("titel")
    titel.innerHTML = "The application for Vector'23 is open!"
    n.remove()
    div.innerHTML = '<br / ><a style="text-align: center;"href="https://docs.google.com/forms/d/e/1FAIpQLSf5VIB7O_rrS5Bp4PJAC688lhcRQxS0nXW4Epn3JTb-zFl4Zg/viewform"><button class="applyBtn">Apply now!</button></a><br />'
  }

  var deadline = new Date("February 11, 2023 00:00:01");
  if (deadline > new Date) {
    showVectorApplication()
  }
    
</script>