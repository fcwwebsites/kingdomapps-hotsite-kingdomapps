# Kingdom Apps — hotsite institucional

Site público em https://kingdomapps.net/ (domínio próprio via `CNAME`). `/v1/` redireciona para a raiz.

- Site estático (HTML/CSS/JS), identidade "Realeza Digital" (SVGs em `assets/brand/`), fontes Manrope 800 e Inter (OFL) hospedadas em `assets/fonts/`.

## Pontos de troca (um só lugar: `assets/site.js`, topo do arquivo)
- `NOME_DOACAO` — nome do sistema de doações, "Semear" (o link de WhatsApp é gerado a partir dele)
- `NOME_DEPARTAMENTO` — nome do departamento de hotsites ("Vitrine")
- `NOME_PRODUTO_HOTSITE` — termo genérico "Hotsites"
- `NOME_CONTEUDO_PAGO` — nome do serviço de conteúdo pago, "Selecta" (link de WhatsApp gerado a partir dele)
- `SHOW_SELECTA_EXEMPLO` — `false` remove o botão "Ver exemplo" do Selecta
- `SHOW_VERSICULO` — exibe a seção Salmos 127:1 (ligado)
- `SHOW_FORM` / `FORM_ENDPOINT` — formulário de interesse (desligado até existir o endpoint do Apps Script)

Pages: branch `main`, pasta `/`. Prévia local: `python3 -m http.server 8765`.
