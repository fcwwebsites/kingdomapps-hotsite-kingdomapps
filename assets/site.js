/* =====================================================================
   CONFIGURAÇÃO — único ponto para trocar nomes e ligar o versículo.
   ===================================================================== */
var NOME_DOACAO = 'Semear';                         // sistema de doações recorrentes (final; masculino: "o Semear")
var NOME_DEPARTAMENTO = 'Vitrine';                 // departamento de hotsites (aprovado)
var NOME_CONTEUDO_PAGO = 'Selecta';                 // conteúdo liberado só depois do pagamento (masculino: "o Selecta")
var NOME_PRODUTO_HOTSITE = 'Hotsites';              // termo genérico até a escolha do nome do plano
var SHOW_SELECTA_EXEMPLO = true;                    // botão "Ver exemplo" do Selecta (aprovado pelo Feijão; false remove)
var SHOW_VERSICULO = true;                          // Salmos 127:1 (aprovado pelo Feijão; false oculta)
var SHOW_FORM = true;                               // formulário de interesse: só aparece com SHOW_FORM = true E FORM_ENDPOINT preenchido
var FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyXJzGbnC3e3P_kqoQvF0my-eM7bEuCtrySyUmbXLilqjDgSUuds_r6vUkA8ZBm_ehS/exec';                             // URL /exec do Google Apps Script (web app) — vazio = formulário oculto
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
  var NOMES = { doacao: NOME_DOACAO, departamento: NOME_DEPARTAMENTO, hotsite: NOME_PRODUTO_HOTSITE, selecta: NOME_CONTEUDO_PAGO };
  document.querySelectorAll('[data-nome]').forEach(function (el) {
    var v = NOMES[el.getAttribute('data-nome')];
    if (v != null) el.textContent = v;
  });

  // WhatsApp do sistema de doações gerado a partir da variável
  document.querySelectorAll('[data-wa="doacao"]').forEach(function (a) {
    a.href = wa('Olá! Vim pelo site e quero saber mais sobre o ' + NOME_DOACAO + '.');
    a.setAttribute('aria-label', 'Saber mais sobre o ' + NOME_DOACAO + ' pelo WhatsApp (abre em nova aba)');
  });

  // WhatsApp dos Hotsites gerado a partir do nome do departamento
  document.querySelectorAll('[data-wa="hotsite"]').forEach(function (a) {
    a.href = wa('Olá! Vim pelo site e quero saber mais sobre os hotsites da ' + NOME_DEPARTAMENTO + '.');
  });

  // WhatsApp do Selecta gerado a partir da variável
  document.querySelectorAll('[data-wa="selecta"]').forEach(function (a) {
    a.href = wa('Olá! Vim pelo site e quero saber mais sobre o ' + NOME_CONTEUDO_PAGO + '.');
    a.setAttribute('aria-label', 'Saber mais sobre o ' + NOME_CONTEUDO_PAGO + ' pelo WhatsApp (abre em nova aba)');
  });

  // Botão "Ver exemplo" do Selecta (opcional)
  document.querySelectorAll('[data-selecta-exemplo]').forEach(function (a) {
    if (!SHOW_SELECTA_EXEMPLO) { a.remove(); return; }
    a.setAttribute('aria-label', 'Ver um exemplo do ' + NOME_CONTEUDO_PAGO + ' (abre em nova aba)');
  });

  // WhatsApp de contratação do Selecta
  document.querySelectorAll('[data-wa="selecta-contratacao"]').forEach(function (a) {
    a.href = wa('Olá! Vim pelo site e quero mais informações sobre a contratação do ' + NOME_CONTEUDO_PAGO + '.');
    a.setAttribute('aria-label', 'Mais informações sobre a contratação do ' + NOME_CONTEUDO_PAGO + ' pelo WhatsApp (abre em nova aba)');
  });

  // Formulário de interesse (opcional): carrega assets/form.js só quando ligado e com endpoint
  if (SHOW_FORM && FORM_ENDPOINT) {
    window.KA_FORM = { endpoint: FORM_ENDPOINT, servicos: ['RSVP', NOME_DOACAO, NOME_PRODUTO_HOTSITE + ' da ' + NOME_DEPARTAMENTO, NOME_CONTEUDO_PAGO] };
    var fs = document.createElement('script'); fs.src = 'assets/form.js'; fs.defer = true; document.body.appendChild(fs);
  }

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
