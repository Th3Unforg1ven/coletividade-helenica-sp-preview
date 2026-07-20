# Como publicar o site

O site precisa ser hospedado para receber um endereço público. O pacote pronto para publicação fica na pasta `dist` depois da compilação.

## Opção mais simples: Netlify Drop

1. Acesse https://app.netlify.com/drop
2. Entre ou crie uma conta gratuita.
3. Arraste a pasta `dist` inteira para a área indicada.
4. Aguarde a publicação.
5. Copie o endereço terminado em `netlify.app` e compartilhe com qualquer pessoa.

O arquivo `_redirects` incluído no pacote garante que páginas como `/aulas`, `/contato` e `/coletividade/nossa-historia` abram corretamente.

## Para atualizar o site depois

1. Faça as alterações no projeto.
2. Execute `npm.cmd run build` nesta pasta.
3. Arraste novamente a pasta `dist` para a área de publicação do projeto no Netlify.

## Hospedagem própria

Também é possível enviar todo o conteúdo da pasta `dist` para a pasta pública de qualquer hospedagem web. O servidor deve redirecionar endereços que não correspondam a arquivos reais para `index.html`.
