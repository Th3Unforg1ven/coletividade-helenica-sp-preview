# Desenvolvimento

## Código do site

- `src/pages/`: páginas carregadas por seção. Cursos e Contato não importam o acervo.
- `src/components/`: elementos compartilhados de apresentação.
- `src/content/site-data.js`: índices do acervo importado e dos artigos editoriais.
- `src/legacy-content.js`: adaptação do HTML preservado do WordPress.
- `src/content/courses.js` e `home-activities.js`: conteúdo dos cursos e destaques da home.
- `src/content/dance-groups.js`: informações e histórias dos grupos, sem depender de títulos HTML.
- `src/content/teachers.js` e `site-config.js`: professores e canais institucionais.

## Verificação

```sh
npm ci
npm run lint
npm run format:check
npm test
npm run build
```

`npm run format` aplica a formatação. Os JSONs do acervo e dos mapas de mídia são
gerados e não entram nessa formatação. As rotas históricas continuam mapeadas em
`src/content/navigation.js`.

## Mídia

Os players usam `*-loop-hq.mp4` e `*-poster-hq.jpg` em `public/videos/`. Os sete
vídeos originais anteriormente copiados para essa pasta foram preservados em
`local-media/originals/`, com a estrutura de subpastas original. Essa pasta fica
fora do Git e do pacote publicado; faça uma cópia dela ao transferir o projeto.

`scripts/compose-classroom-photos.mjs` gera os SVGs das turmas a partir das fotos
do acervo. Ele não altera mais os componentes ou os mapas de mídia.

Antes de iniciar o servidor ou compilar, `generate-responsive-manifest.mjs`
atualiza a lista das versões menores de imagens que realmente existem. O
componente de imagens usa essa lista e mantém a imagem original quando não há
uma versão menor disponível.

## Experimentos e arquivos de trabalho

As seis propostas de mosaico estão em `experiments/mosaic/`. Durante o
desenvolvimento, continuam acessíveis em `/propostas-mosaico.html`. Essa página
não é uma entrada do build de produção.

`tmp/` contém referências de revisão e outros arquivos locais gerados. Os
documentos comerciais e apresentações existentes na raiz são independentes do
site e não devem entrar em um commit de código por meio de `git add .`.

A publicação é uma etapa separada e usa a configuração de destino em
`BASE_PATH`, `VITE_ROUTER_MODE` e `SITE_ORIGIN`.
