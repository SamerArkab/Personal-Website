var menuToggle = document.getElementById('navbarSupportedContent');
var bsCollapse = new bootstrap.Collapse(menuToggle);

var scrollSpy = new bootstrap.ScrollSpy(document.body, { //call the scrollspy
  target: '#navbarscroll-spy'
});

var mario = document.getElementById('mario'),
  room, overflow;
var flaglight = document.getElementById('flaglight');
var topbtn = document.getElementById('topbutton');
var navspy = document.getElementById('navbarscroll-spy');
var spinframe = document.getElementById('contactinfobox');

var navfirstscroll = true;

window.addEventListener('load', setEdge);
window.addEventListener('resize', setEdge);

function setEdge() {
  room = window.innerHeight;
  //all of the documents scrollY in pixels - visible scrollY (gives the invisible scrollY which is overflow)
  overflow = document.body.scrollHeight - room;
  //--maximum var represents visible scrollY - mario height
  mario.style.setProperty('--maximum', room - mario.height + 'px');
}

topbtn.addEventListener('click', function() {
  document.documentElement.scrollTop = 0;
});

window.addEventListener('scroll', function() {
  var ratio = (window.pageYOffset || window.scrollY) / overflow;
  //--epoch represents the ratio between all of scrollY and overflow
  mario.style.setProperty('--epoch', ratio);

  if (ratio > 0.8)
    spinframe.style.animationName = 'spin';

  if (navfirstscroll) { //click navbar to collapse on first scroll
    bsCollapse.toggle();
    navfirstscroll = false;
  }

  if (document.documentElement.scrollTop > 200) //200 px
    topbtn.style.display = 'block';
  else {
    topbtn.style.display = 'none';
    topbtn.style.zIndex = '100';
  }

  if (document.documentElement.scrollTop == 0) { // top position - expand navbar
    navspy.classList.remove('navbar-expand-xs');
    navspy.classList.add('navbar-expand-sm');
    navspy.style.opacity = "0.9";
  } else { // scrolled - collapse navbar
    navspy.classList.remove('navbar-expand-sm');
    navspy.classList.add('navbar-expand-xs');
    navspy.style.opacity = "0.8";
  }

  /*
  (document.documentElement.scrollHeight - document.documentElement.clientHeight)
  is more compatible with other browsers than scrollMaxY which is compatible only with FF
  */
  if ((document.documentElement.scrollHeight - document.documentElement.scrollTop) == document.documentElement.clientHeight) {
    flaglight.style.visibility = 'visible';
    mario.src = 'images/mariowin.png';
  } else {
    flaglight.style.visibility = "hidden";
    mario.src = 'images/mario.png';
  }
}, {
  passive: true //passive scrolling -> scrolling becomes independent from js
});

var links = document.querySelectorAll('.nav-link'); //return list of said element

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function() { //add event listener to each nav-link element
    bsCollapse.toggle(); //collapse the navbar after click
    for (var j = 0; j < links.length; j++)
      links[j].classList.remove('active'); //remove the active
    this.classList.add('active'); //add active class to the clicked element
  });
}

var questionm = document.getElementById('questionm');

questionm.addEventListener('click', function() {
  var newtemp = document.getElementById('audio').cloneNode(); //over lap when there's a fast clicker
  newtemp.play();
});

questionm.addEventListener('mouseover', function() {
  questionm.src = 'images/questionm-hover.png';
});

questionm.addEventListener('mouseleave', function() {
  questionm.src = 'images/questionm.png';
});
