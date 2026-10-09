# Kingdom Apps — prévia do hotsite institucional

Proposta interna, ainda não aprovada. A página raiz é um gate protegido por código de acesso; depois do desbloqueio mostra a prévia do hotsite (`/v1/`).

- Gate: https://fcwwebsites.github.io/kingdomapps-hotsite-kingdomapps/
- Site estático (HTML/CSS/JS), identidade "Realeza Digital" (SVGs em `assets/brand/`), fontes Manrope 800 e Inter (OFL) hospedadas em `assets/fonts/`.

## Pontos de troca (um só lugar: `assets/site.js`, topo do arquivo)
- `NOME_DOACAO` — nome do sistema de doações, "Semear" (o link de WhatsApp é gerado a partir dele)
- `NOME_DEPARTAMENTO` — nome do departamento de hotsites ("Vitrine")
- `NOME_PRODUTO_HOTSITE` — termo genérico "Hotsites"
- `NOME_CONTEUDO_PAGO` — nome do serviço de conteúdo pago, "Selecta" (link de WhatsApp gerado a partir dele)
- `SHOW_SELECTA_EXEMPLO` — `false` remove o botão "Ver exemplo" do Selecta
- `SHOW_VERSICULO` — `true` exibe a seção Salmos 127:1 (padrão `false`)

Pages: branch `main`, pasta `/`. Prévia local: `python3 -m http.server 8765`.
