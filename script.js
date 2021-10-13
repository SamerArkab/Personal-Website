var mario = document.getElementById('mario');
var flaglight = document.getElementById('flaglight');
var links = document.querySelectorAll('.nav-link');

var menuToggle = document.getElementById('navbarSupportedContent')
var bsCollapse = new bootstrap.Collapse(menuToggle)

var scrollSpy = new bootstrap.ScrollSpy(document.body, { //call the scrollspy
  target: '#navbarscroll-spy'
})

window.addEventListener('scroll', function() {
  var value = window.scrollY; //number of pixels that the document is currently scrolled vertically
  mario.style.top = value * 0.1323 + 'vh'; //height of viewport

  if (window.scrollY == 0) { // top position - expand navbar
    document.getElementById('navbarscroll-spy').classList.remove('navbar-expand-xs');
    document.getElementById('navbarscroll-spy').classList.add('navbar-expand-sm');
    document.getElementById('navbarscroll-spy').style.opacity = "0.9";
  } else { // scrolled - collapse navbar
    document.getElementById('navbarscroll-spy').classList.remove('navbar-expand-sm');
    document.getElementById('navbarscroll-spy').classList.add('navbar-expand-xs');
    document.getElementById('navbarscroll-spy').style.opacity = "0.7";
  }

  if (window.scrollMaxY == value) {
    flaglight.style.visibility = "visible";
    document.getElementById("mario").src = "mariowin.png";
  } else {
    flaglight.style.visibility = "hidden";
    document.getElementById("mario").src = "mario.png";
  }
})

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function() { //add event listener to each nav-link element
    bsCollapse.toggle(); //collapse the navbar after click
    for (var j = 0; j < links.length; j++)
      links[j].classList.remove('active'); //remove the active
    this.classList.add('active'); //add active class to the clicked element
  });
}
