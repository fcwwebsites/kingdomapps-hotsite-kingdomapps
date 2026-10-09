(function () {
  var PIN = '2315';
  var KEY = 'kingdomapps_institucional_gate';

  var lockEl = document.getElementById('lock');
  var galleryEl = document.getElementById('gallery');
  var keypad = document.getElementById('keypad');
  var display = document.getElementById('pin-display');
  var dots = display.querySelectorAll('span');
  var err = document.getElementById('pin-err');
  var cardsRoot = document.getElementById('cards');
  var logoutBtn = document.getElementById('logout');
  var typed = '';

  // Caminho e nome da versão existem SÓ neste script, não no DOM bloqueado
  var VERSIONS = [
    {
      path: 'v1/',
      title: 'Kingdom Apps — hotsite institucional',
      blurb: 'One-page Realeza Digital: hero índigo com o símbolo vazado, quem somos, 3 serviços (RSVP · Semear · Hotsites), para quem, como funciona, FAQ e CTA final. WhatsApp como contato principal e Direct como secundário.'
    }
  ];

  function unlocked() { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function setUnlocked(on) { try { on ? sessionStorage.setItem(KEY, '1') : sessionStorage.removeItem(KEY); } catch (e) {} }

  function paint() {
    for (var i = 0; i < dots.length; i++) dots[i].classList.toggle('on', i < typed.length);
    display.setAttribute('aria-label', 'Dígitos digitados: ' + typed.length + ' de 4');
  }

  function renderCards() {
    cardsRoot.innerHTML = '';
    VERSIONS.forEach(function (v) {
      var card = document.createElement('article');
      card.className = 'card';
      var preview = document.createElement('div');
      preview.className = 'card-preview';
      var iframe = document.createElement('iframe');
      iframe.src = v.path; iframe.title = 'Prévia ' + v.title; iframe.loading = 'lazy';
      iframe.setAttribute('tabindex', '-1'); iframe.setAttribute('aria-hidden', 'true');
      preview.appendChild(iframe);
      var body = document.createElement('div');
      body.className = 'card-body';
      body.innerHTML = '<h2></h2><p></p>';
      body.querySelector('h2').textContent = v.title;
      body.querySelector('p').textContent = v.blurb;
      var open = document.createElement('a');
      open.href = v.path; open.textContent = 'Abrir o hotsite';
      body.appendChild(open);
      card.appendChild(preview); card.appendChild(body);
      cardsRoot.appendChild(card);
    });
  }

  function showGallery() { lockEl.classList.add('hidden'); galleryEl.classList.remove('hidden'); renderCards(); }
  function showLock() {
    galleryEl.classList.add('hidden'); lockEl.classList.remove('hidden');
    cardsRoot.innerHTML = ''; typed = ''; paint(); err.textContent = '';
  }

  function submit() {
    if (typed === PIN) { setUnlocked(true); err.textContent = ''; showGallery(); return; }
    err.textContent = typed.length < 4 ? 'Digite os 4 dígitos.' : 'Código incorreto. Tente de novo.';
    display.classList.remove('shake'); void display.offsetWidth; display.classList.add('shake');
    typed = ''; paint();
  }

  function press(k) {
    if (k === 'del') { typed = typed.slice(0, -1); err.textContent = ''; paint(); return; }
    if (k === 'ok') { submit(); return; }
    if (/^\d$/.test(k) && typed.length < 4) {
      typed += k; err.textContent = ''; paint();
      if (typed.length === 4) setTimeout(submit, 120);
    }
  }

  keypad.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-k]');
    if (b) press(b.getAttribute('data-k'));
  });
  document.addEventListener('keydown', function (e) {
    if (lockEl.classList.contains('hidden')) return;
    if (/^\d$/.test(e.key)) { press(e.key); e.preventDefault(); }
    else if (e.key === 'Backspace') { press('del'); e.preventDefault(); }
    else if (e.key === 'Enter' && !(e.target.closest && e.target.closest('button'))) { press('ok'); e.preventDefault(); }
  });
  logoutBtn.addEventListener('click', function () { setUnlocked(false); showLock(); });

  if (unlocked()) showGallery(); else showLock();
})();
