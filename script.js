document.addEventListener('DOMContentLoaded', function () {

  /* ── News toggle ── */
  var toggle = document.getElementById('news-toggle');
  var extra  = document.getElementById('news-extra');
  if (toggle && extra) {
    toggle.addEventListener('click', function () {
      if (extra.hasAttribute('hidden')) {
        extra.removeAttribute('hidden');
        toggle.textContent = 'Show less';
      } else {
        extra.setAttribute('hidden', '');
        toggle.textContent = 'Show more';
      }
    });
  }

  /* ── Scroll fade-in ── */
  var sections = document.querySelectorAll('section');
  sections.forEach(function (s) { s.classList.add('fade-section'); });

  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });

  sections.forEach(function (s) { fadeObserver.observe(s); });

  /* ── Custom cursor (desktop / hover-capable only) ── */
  var supportsHover = window.matchMedia('(hover: hover)').matches;
  if (!supportsHover) return;

  var dot  = document.createElement('div');
  var ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  var visible = false;

  /* Dot snaps instantly; ring lags */
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
    if (!visible) {
      visible = true;
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', function () {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
    visible = false;
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.11;
    ringY += (mouseY - ringY) * 0.11;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  /* Ring expands over interactive elements */
  var interactives = document.querySelectorAll('a, button, .interest-tags span');
  interactives.forEach(function (el) {
    el.addEventListener('mouseenter', function () { ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', function () { ring.classList.remove('hovered'); });
  });

  /* Click ripple */
  document.addEventListener('mousedown', function (e) {
    var ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top  = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(function () { ripple.remove(); }, 600);
  });

});
