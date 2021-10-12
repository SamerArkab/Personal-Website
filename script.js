var mario = document.getElementById('mario');
var flaglight = document.getElementById('flaglight');

window.addEventListener('scroll', function() {
  var value = window.scrollY; //number of pixels that the document is currently scrolled vertically
  mario.style.top = value * 0.1323 + 'vh'; //height of viewport

  if (window.scrollMaxY == value) {
    flaglight.style.visibility = "visible";
    document.getElementById("mario").src = "mariowin.png";
  } else {
    flaglight.style.visibility = "hidden";
    document.getElementById("mario").src = "mario.png";
  }
})

var links = document.querySelectorAll('.nav-link');
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function() { //add event listener to each nav-link element
    for (var j = 0; j < links.length; j++)
      links[j].classList.remove('active'); //remove the active
    this.classList.add('active'); //add active class to the clicked element
  });
}

var navLinks = document.querySelectorAll('.nav-item')
var menuToggle = document.getElementById('navbarSupportedContent')
var bsCollapse = new bootstrap.Collapse(menuToggle)
navLinks.forEach((l) => {
  l.addEventListener('click', () => {
    bsCollapse.toggle() //"click" on navbar collapse button after nav-item click
  })
})

/*
window.addEventListener('scroll', (e) => {
    if(window.scrollY == 0) { // top position
      // open the navbar
    } else {
      menuToggle.collapse = 'hide'; // collapse it
    }
});
*/
