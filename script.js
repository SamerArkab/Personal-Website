var menuToggle = document.getElementById('navbarSupportedContent');
var bsCollapse = new bootstrap.Collapse(menuToggle);

var scrollSpy = new bootstrap.ScrollSpy(document.body, { //call the scrollspy
  target: '#navbarscroll-spy'
});
var navspy = document.getElementById('navbarscroll-spy');

var mario = document.getElementById('mario');
var spinmush = document.getElementById('mushroomball');
var room, overflow;
var flaglight = document.getElementById('flaglight');
var topbtn = document.getElementById('topbutton');
var spinframe = document.getElementById('contactinfobox');

var navfirstscroll = true;
var qMclick = false;

window.addEventListener('load', setEdge);
window.addEventListener('resize', setEdge);

function setEdge() {
  room = window.innerHeight;
  //all of the documents scrollY in pixels - visible scrollY (gives the invisible scrollY which is overflow)
  overflow = document.body.scrollHeight - room;
  //--maximum var represents visible scrollY - mario height
  mario.style.setProperty('--maximum', room - mario.height + 'px');
}

window.addEventListener('load', (event) => {
  navfirstscroll = true;
  qMclick = false;

  ratio = (window.pageYOffset || window.scrollY) / overflow;
  if (ratio > 0.1)
    topbtn.style.display = 'block';
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

  if (ratio > 0.1)
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
  if (ratio >= 0.985) {
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

topbtn.addEventListener('click', function() {
  document.documentElement.scrollTop = 0;
});

var goingUp = true;
var questionm = document.getElementById('questionm');
var rotdegree = 10;
var horpos = 66; //between 64% and 74%
var horleft = true; //start by moving to the left side
var vertpos = 35.5;
spinmush.style.setProperty('--vert_pos', vertpos);
questionm.addEventListener('click', function() {
  /* CLICK EVENT */
  qMclick = true;
  //spinmush.style.animationPlayState = 'paused';
  spinmush.style.animationName = null;

  var soundClickQM = document.getElementById('audio').cloneNode(); //over lap when there's a fast clicker
  soundClickQM.volume = 0.1;
  soundClickQM.play();

  rotdegree += 30;
  rotdegree = rotdegree % 360;
  spinmush.style.transform = 'rotate(' + rotdegree + 'deg)';

  if (horleft) {
    horpos -= 2;
    spinmush.style.left = horpos + '%';
    if (horpos <= 64)
      horleft = false;
  } else {
    horpos += 2;
    spinmush.style.left = horpos + '%';
    if (horpos >= 74)
      horleft = true;
  }

  if (vertpos <= 10)
    vertpos = 10;
  else {
    //vertpos = window.getComputedStyle(spinmush).getPropertyValue('--vert_pos');
    vertpos -= 3;
  }
  spinmush.style.setProperty('--vert_pos', vertpos);
  spinmush.style.top = vertpos + '%';
});

questionm.addEventListener('mouseover', function() {
  questionm.src = 'images/questionm-hover.png';
});

questionm.addEventListener('mouseleave', function() {
  questionm.src = 'images/questionm.png';
  if (qMclick) {
    spinmush.style.animationName = 'fall_effect';
    qMclick = false;
  }
});

topbtn.addEventListener('mouseover', function() {
  topbtn.src = 'images/topbtnhover.png';
});

topbtn.addEventListener('mouseleave', function() {
  topbtn.src = 'images/topbtn.png';
});
