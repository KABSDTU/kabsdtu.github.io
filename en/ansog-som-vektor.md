---
layout: en
title: Apply as a vector
---

<h1 id="titel">Applications for Summer Vector '22 are closed</h1>
<div id="poster-image" style="height: 450px; background-image: url('/static/img/wewantyousmall.png');">
</div>

<p id ="n">The applications for Summer Vector '22 are closed for now.</p>
<p id ="nn">See you soon.</p>
<br />


If you have questions look around, or check out: <a href="/en/vektor">Vector</a>

<script>

  function showVectorApplication() {
    var div = document.getElementById("n")
    var n = document.getElementById("nn")
    var titel = document.getElementById("titel")
    titel.innerHTML = "KABS22 are taking vector applications now!"
    n.remove()
    div.innerHTML = '<br / ><a style="text-align: center;"href="https://docs.google.com/forms/d/e/1FAIpQLSeEOySk8egoJ2r5IrqN9Y7NoKLKmQW2rukfXwy7t-Q1Sh9Glg/viewform?usp=pp_url&entry.313565989=Begge+dele+kan+g%C3%A5+/+Either+can+do"><button class="applyBtn">Apply now!</button></a><br />'
  }

  var deadline = new Date("Feb 12, 2022 00:30:00");
  if (deadline > new Date) {
    showVectorApplication()
  }
    
</script>