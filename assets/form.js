/* Formulário de interesse — carregado por site.js só se SHOW_FORM = true e FORM_ENDPOINT preenchido.
   Envia via fetch (mode: no-cors, application/x-www-form-urlencoded) para o web app do Google Apps Script. */
(function () {
  var C = window.KA_FORM; var slot = document.getElementById('slot-form');
  if (!C || !C.endpoint || !slot) return;

  var css = document.createElement('style');
  css.textContent = [
    '.ka-form{margin-top:2.2rem;padding:1.6rem;border:1px solid rgba(201,195,219,.22);border-radius:20px;background:rgba(43,30,92,.35)}',
    '.ka-form h3{color:#fff;font-size:1.3rem;margin-bottom:.3rem}.ka-form .lead{color:#DDD8EC;font-size:.95rem;margin-bottom:1.2rem}',
    '.ka-grid{display:grid;gap:1rem}@media(min-width:640px){.ka-grid{grid-template-columns:1fr 1fr}.ka-full{grid-column:1/-1}}',
    '.ka-field label{display:block;font-weight:600;font-size:.9rem;color:#F5F3FA;margin-bottom:.35rem}',
    '.ka-field input,.ka-field select,.ka-field textarea{width:100%;font:inherit;font-size:1rem;color:#16122B;background:#F5F3FA;border:2px solid transparent;border-radius:12px;padding:.75rem .9rem}',
    '.ka-field textarea{min-height:110px;resize:vertical}.ka-field input:focus,.ka-field select:focus,.ka-field textarea:focus{outline:none;border-color:#E8B04B}',
    '.ka-field [aria-invalid=true]{border-color:#FF9F6E}.ka-err{color:#FFC2A3;font-size:.85rem;min-height:1.1em;margin-top:.3rem}',
    '.ka-hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;overflow:hidden}',
    '.ka-privacy{color:#C9C3DB;font-size:.82rem;margin:1rem 0}.ka-status{margin-top:1rem;padding:.9rem 1rem;border-radius:12px;font-weight:600}',
    '.ka-status.ok{background:#E7F8EE;color:#0B5A2A}.ka-status.err{background:#FFE7D9;color:#6A2A00}.ka-status a{color:inherit}'
  ].join('');
  document.head.appendChild(css);

  function opt(v){return '<option value="'+v.replace(/"/g,'&quot;')+'">'+v+'</option>';}
  slot.innerHTML =
    '<form class="ka-form" id="ka-form" novalidate aria-labelledby="ka-form-t">' +
    '<h3 id="ka-form-t">Prefere deixar seus dados?</h3><p class="lead">Preencha e a gente chama você pelo WhatsApp.</p>' +
    '<div class="ka-grid">' +
    f('nome','Nome','<input id="ka-nome" name="nome" autocomplete="name" required maxlength="120">') +
    f('organizacao','Organização','<input id="ka-organizacao" name="organizacao" autocomplete="organization" required maxlength="160">') +
    f('tipo','Tipo','<select id="ka-tipo" name="tipo" required><option value="">Selecione</option>'+opt('Igreja')+opt('Ministério')+opt('Empresa')+'</select>') +
    f('pais','País','<input id="ka-pais" name="pais" autocomplete="country-name" required maxlength="80">') +
    f('whatsapp','WhatsApp (com DDI e DDD)','<input id="ka-whatsapp" name="whatsapp" type="tel" inputmode="tel" autocomplete="tel" required placeholder="+55 11 91234-5678" maxlength="25">') +
    f('servico','Serviço de interesse','<select id="ka-servico" name="servico" required><option value="">Selecione</option>'+C.servicos.map(opt).join('')+'</select>') +
    f('mensagem','Mensagem','<textarea id="ka-mensagem" name="mensagem" maxlength="2000" required></textarea>','ka-full') +
    '</div>' +
    '<div class="ka-hp" aria-hidden="true"><label for="ka-website">Não preencha este campo</label><input id="ka-website" name="website" tabindex="-1" autocomplete="off"></div>' +
    '<p class="ka-privacy">Seus dados são usados só para entrarmos em contato sobre este pedido e não são compartilhados com ninguém. Para pedir a remoção, é só mandar uma mensagem pelo WhatsApp.</p>' +
    '<button class="btn btn-gold" type="submit">Enviar</button>' +
    '<div class="ka-status" id="ka-status" role="status" aria-live="polite" hidden></div>' +
    '</form>';

  function f(n,l,ctl,cls){return '<div class="ka-field '+(cls||'')+'"><label for="ka-'+n+'">'+l+'</label>'+ctl+'<p class="ka-err" id="ka-'+n+'-err"></p></div>';}

  var form = document.getElementById('ka-form'), st = document.getElementById('ka-status'), btn = form.querySelector('button[type=submit]');
  var MSG = { nome:'Informe seu nome.', organizacao:'Informe a organização.', tipo:'Escolha o tipo.', pais:'Informe o país.', whatsapp:'Informe um WhatsApp válido, com DDI e DDD.', servico:'Escolha um serviço.', mensagem:'Escreva uma mensagem.' };

  function check(el) {
    var v = (el.value || '').trim(), ok = v.length > 0;
    if (ok && el.name === 'whatsapp') ok = v.replace(/\D/g, '').length >= 10 && v.replace(/\D/g, '').length <= 15;
    if (ok && el.name === 'nome') ok = v.length >= 2;
    el.setAttribute('aria-invalid', ok ? 'false' : 'true');
    var e = document.getElementById(el.id + '-err'); if (e) e.textContent = ok ? '' : MSG[el.name];
    if (e) el.setAttribute('aria-describedby', e.id);
    return ok;
  }
  form.querySelectorAll('.ka-field input,.ka-field select,.ka-field textarea').forEach(function (el) {
    el.addEventListener('blur', function () { check(el); });
  });
  function show(kind, html) { st.hidden = false; st.className = 'ka-status ' + kind; st.innerHTML = html; }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var fields = form.querySelectorAll('.ka-field input,.ka-field select,.ka-field textarea'), first = null, all = true;
    fields.forEach(function (el) { if (!check(el)) { all = false; if (!first) first = el; } });
    if (!all) { first.focus(); show('err', 'Confira os campos destacados.'); return; }
    if (form.website.value) { show('ok', 'Recebemos! Vamos chamar você no WhatsApp.'); form.reset(); return; } // honeypot: finge sucesso
    var data = new URLSearchParams();
    fields.forEach(function (el) { data.append(el.name, el.value.trim()); });
    data.append('website', ''); data.append('origem', location.href.split('?')[0]);
    btn.disabled = true; btn.textContent = 'Enviando…';
    fetch(C.endpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, body: data.toString() })
      .then(function () { form.reset(); show('ok', 'Recebemos! Vamos chamar você no WhatsApp.'); })
      .catch(function () { show('err', 'Não foi possível enviar agora. Tente de novo ou <a href="https://wa.me/5511947904394" target="_blank" rel="noopener">fale com a gente pelo WhatsApp</a>.'); })
      .then(function () { btn.disabled = false; btn.textContent = 'Enviar'; });
  });
})();
