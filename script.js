var mario = document.getElementById('mario');

window.addEventListener('scroll', function() {
  var value = window.scrollY;
  mario.style.top = value * 1.2355 + 'px';
})
