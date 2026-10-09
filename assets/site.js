/* =====================================================================
   CONFIGURAÇÃO — único ponto para trocar nomes e ligar o versículo.
   ===================================================================== */
var NOME_RECORRENCIA = 'Recorrência';               // nome PROVISÓRIO do produto de doações
var NOME_DEPARTAMENTO = 'Vitrine';                 // departamento de hotsites (aprovado)
var NOME_PRODUTO_HOTSITE = 'Hotsites';              // termo genérico até a escolha do nome do plano
var SHOW_VERSICULO = false;                         // Salmos 127:1 — true para exibir (decisão pendente)
var WA_NUMERO = '5511947904394';
/* ===================================================================== */

(function () {
  // URL-encode estrito (como no copy.md: "!" vira %21)
  function enc(s) {
    return encodeURIComponent(s).replace(/[!'()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }
  function wa(texto) { return 'https://wa.me/' + WA_NUMERO + '?text=' + enc(texto); }

  // Nomes provisórios
  var NOMES = { recorrencia: NOME_RECORRENCIA, departamento: NOME_DEPARTAMENTO, hotsite: NOME_PRODUTO_HOTSITE };
  document.querySelectorAll('[data-nome]').forEach(function (el) {
    var v = NOMES[el.getAttribute('data-nome')];
    if (v != null) el.textContent = v;
  });

  // WhatsApp da Recorrência gerado a partir da variável
  document.querySelectorAll('[data-wa="recorrencia"]').forEach(function (a) {
    a.href = wa('Olá! Vim pelo site e quero saber mais sobre ' + NOME_RECORRENCIA + '.');
    a.setAttribute('aria-label', 'Saber mais sobre a ' + NOME_RECORRENCIA + ' pelo WhatsApp (abre em nova aba)');
  });

  // Versículo opcional
  if (SHOW_VERSICULO) {
    var tpl = document.getElementById('tpl-versiculo'), slot = document.getElementById('slot-versiculo');
    if (tpl && slot) slot.replaceWith(tpl.content.cloneNode(true));
  }

  // Ano do rodapé
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // Menu mobile
  var btn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
  var label = btn && btn.querySelector('.menu-label');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    label.textContent = open ? 'Fechar menu' : 'Menu';
  }
  if (btn && nav) {
    btn.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); btn.focus(); } });
  }

  // Header com sombra ao rolar
  var onScroll = function () { document.body.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();
