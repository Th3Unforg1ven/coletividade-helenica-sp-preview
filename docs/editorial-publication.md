# Publicações culturais

`src/content/editorial-articles.js` reúne 16 artigos novos e importa o guia central existente. Os textos aparecem na busca de Cultura e têm links relacionados e chamadas específicas para cursos ou Agenda.

`npm run build` também gera 17 páginas HTML completas em `dist/cultura/<slug>/index.html`, o índice `dist/publicacoes/index.html` e `dist/sitemap.xml`. Essas páginas funcionam sem JavaScript. Títulos, descrições, canonical, Open Graph e BlogPosting são gerados a partir do mesmo conteúdo usado na aplicação.

## Publicação

- GitHub Pages: manter `BASE_PATH=/coletividade-helenica-sp-preview/` e `VITE_ROUTER_MODE=hash`, como no workflow existente. Os artigos usam caminhos reais; links para o restante da aplicação usam as rotas com hash.
- Outro domínio: definir `SITE_ORIGIN` com a origem definitiva (sem caminho) e ajustar `BASE_PATH`. Não reutilizar canonical do domínio de prévia no domínio oficial.
- Sitemap: enviar a URL do sitemap no Search Console da propriedade publicada. A geração do arquivo não equivale a envio ou indexação.
- Atualizações: corrigir o conteúdo e a data de modificação quando houver revisão substancial. O gerador não inventa autor ou credencial de revisão.

## Verificação

Após compilar: `node --test scripts/test-editorial.mjs src/content/hellenic-calendar.test.js`.
Para testar o build com subdiretório, usar o mesmo `BASE_PATH` também ao executar os testes.

As fontes estão vinculadas em cada artigo. Textos linguísticos introdutórios não afirmam revisão pelos professores; conteúdo religioso não representa aprovação paroquial ou programação de liturgias. Horários, preços e disponibilidade de cursos seguem sujeitos à consulta à CHSP.
