var mario = document.getElementById('mario');
var flaglight = document.getElementById('flaglight');

window.addEventListener('scroll', function() {
  var value = window.scrollY; //number of pixels that the document is currently scrolled vertically
  mario.style.top = value * 0.1535 + 'vh'; //height of viewport

  if (window.scrollMaxY == value)
    flaglight.style.visibility = "visible";
  else flaglight.style.visibility = "hidden";
})
