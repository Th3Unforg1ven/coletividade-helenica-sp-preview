# Journal e handoff do CHSP

## Handoff

Atualizado em 17 de novembro de 2026.

- **Última publicação registrada.** O commit `8639fac` foi publicado em 29 de outubro de 2026. A compilação e os 25 testes passaram. O rodapé, a retirada do cartaz do Clube de Cinema, o foco por teclado e o encaixe dos retratos no celular foram conferidos na versão pública. [Prévia no GitHub Pages](https://th3unforg1ven.github.io/coletividade-helenica-sp-preview/) · [Execução da publicação](https://github.com/Th3Unforg1ven/coletividade-helenica-sp-preview/actions/runs/40964070817)
- **Ambiente local.** O site usa React e Vite. Para retomar, confira `git status` e use `npm run dev -- --host 127.0.0.1 --port 5175`. Os comandos de verificação e a organização do código estão no [guia de desenvolvimento](DEVELOPMENT.md).
- **Publicação.** O destino usado nas últimas entregas foi a prévia do GitHub Pages. O fluxo de publicação usa o `BASE_PATH` do repositório e testa o pacote compilado. Confira quais alterações entram na próxima entrega, porque a pasta de trabalho também contém experimentos e materiais do projeto. [Fluxo do GitHub Actions](.github/workflows/deploy-pages.yml)
- **Validação a retomar.** A revisão em Firefox foi interrompida por uma limitação da ferramenta de controle. A última publicação foi conferida no navegador integrado, com larguras de desktop e celular. Ainda falta registrar uma validação dedicada em Firefox e Safari/iOS.
- **Retorno da Coletividade.** Ajustes aplicados e conferidos na [prévia local](http://127.0.0.1:5175/cursos). Horários, modalidade e inscrições de Grego Koiné aguardam as informações que o usuário vai solicitar. A publicação desse conjunto permanece pendente. [Registro do retorno](#retorno-da-coletividade-sobre-o-site)
- **Imagem de Bouzouki.** A home, o catálogo e a página da atividade usam um close do bouzouki inspirado na composição da capa antiga, com o braço, as cordas e o cavalete alinhados. A página credita a foto de referência e informa que a imagem foi ambientada com IA. [Prévia da página](http://127.0.0.1:5175/cursos/aulas-de-bouzouki)

## Journal

### 17 de novembro de 2026

- Publicação autorizada pelo usuário. Preparei o pacote no checkout de publicação com os ajustes de associação, presidências, Grego Koiné e capa de Bouzouki. Lint, formatação, compilação com o caminho do GitHub Pages e os 26 testes passaram. A publicação e a conferência pública estão em andamento.

- Conferi no código o estado das correções solicitadas pela Coletividade. Associação, FAQ, retirada do estatuto público, nomes e mandatos, inclusão de Grego Koiné e capa de Bouzouki estão aplicados localmente. Aguardamos os horários, a modalidade e as orientações de inscrição de Grego Koiné. O conjunto aguarda publicação. Esta conferência foi feita no código e no journal.

### 13 de novembro de 2026

- Corrigi o alinhamento do braço, das cordas e do cavalete na capa de Bouzouki. O instrumento passou a ser visto quase de frente, no mesmo close contra a parede clara. Conferi a capa na página da atividade na prévia local. A compilação e os 26 testes passaram.

- A pedido do usuário, a capa foi refeita com a composição da imagem antiga. O bouzouki grego aparece em close contra uma parede clara, com luz lateral. A prévia local usa a nova capa na home, no catálogo e na página da atividade. A compilação e os 26 testes passaram. Conferi a capa no navegador e a ampliação na galeria em largura de celular.

- O usuário pediu que a imagem mostrasse somente o bouzouki, com foco no instrumento. A nova imagem usa como referência a foto de Arent editada por Pandouris, ambientada com IA sobre um sofá de linho, em luz natural. Foi aplicada à home, ao mosaico do catálogo e à página da atividade. A compilação e os 26 testes passaram. Conferi a página em desktop, a home em largura de celular, a imagem no catálogo e a ampliação na galeria. A alteração está na prévia local. [Foto de referência e licença CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Bouzouki_tetrachordo.jpg)

### 12 de novembro de 2026

- Criado este documento para manter o histórico e o estado de retomada no mesmo lugar. O [AGENTS.md](AGENTS.md) registra a rotina de manutenção.

#### Retorno da Coletividade sobre o site

O Word devolvido pela CHSP está em Downloads, com o nome `CHSP-checklist-e-registro-livre-de-ajustes - alterado e enviado pela chsp oficial.docx`. As oito linhas do checklist continuam como “Não revisado”. Os pedidos foram escritos na seção de observações. A conferência abaixo foi feita no código local.

- **Grego Koiné.** Incluir o curso no catálogo, com a descrição fornecida sobre o grego bíblico e a literatura grega dos séculos posteriores a Cristo. O catálogo ainda não tem esse curso. O Word não informa modalidade, horários ou inscrições.
- **Bouzouki.** A Coletividade identificou a imagem anterior como um alaúde e enviou uma referência com marca d’água. A substituição usa uma fotografia licenciada de um bouzouki grego. [Origem e licença da foto](https://commons.wikimedia.org/wiki/File:Bouzouki_tetrachordo.jpg)
- **Associe-se.** Trocar “Conselho” por “Coletividade” nas orientações, no passo 2, no quadro azul e na mensagem pronta do WhatsApp. Retirar o trecho do estatuto e as perguntas sobre integrar o Conselho e consultar deveres. Manter as perguntas sobre condições, indicação e pagamento. O texto enviado informa que a pessoa deve solicitar a ficha, ser maior de 18 anos e escolher a contribuição. Indicação, nacionalidade grega e ascendência grega não são exigidas para se associar. A Coletividade orienta sobre o pagamento.
- **Histórico de presidências.** Os registros citados no Word ficam em “Conselheiros e ex-presidentes”. Na Diretoria Executiva, corrigir Thomas Sarantopoulos para Thomas Sarantakos no mandato de 1979–1980 e acrescentar Caterina Teodoro Daris em 2023–2024 e 2025–2026. No Conselho Deliberativo, acrescentar Christos Andreas Kritselis em 2021–2022 e Christos Georgios Papaioannou em 2023–2024 e 2025–2026.

O usuário autorizou a aplicação local dos ajustes. O catálogo recebeu o curso e a página `/cursos/grego-koine`, com descrição e aviso sobre informações em confirmação. A nova foto entrou na home e na página de Bouzouki, com crédito a Arent e Pandouris sob CC BY-SA 3.0. A ficha de associado continua disponível e o PDF do estatuto foi movido para `local-media/documentos/`, fora do pacote público. Os nomes e mandatos foram corrigidos em “Conselheiros e ex-presidentes”.

O build gerou 97 páginas, os 26 testes passaram e as quatro páginas foram conferidas no navegador a 390 px, sem rolagem horizontal. O catálogo abre a página de Koiné e a nova foto também amplia na galeria da home. A prévia local está na porta 5175.

#### Foto de Bouzouki em apresentação

A pedido do usuário, a foto isolada do instrumento foi substituída na home e na página de Bouzouki por um registro de Stylianos Moyssiadis da apresentação de 27 de março de 2021 no salão da Coletividade. A página inclui o crédito e o link para a [publicação do acervo](http://127.0.0.1:5175/cultura/live-banda-kostakis). A compilação e os 26 testes passaram. A foto foi conferida no destaque da home e na página da atividade em desktop e a 390 px, com ampliação na galeria. A troca está local.

Com a opção de buscar uma foto externa, o destaque da home e a página da atividade passaram a usar um retrato feito em Atenas em 2018, com o instrumento em primeiro plano. A foto foi redimensionada para 1440 × 960 e a página credita Rakoon com o local, a fonte e a licença CC0 1.0. O catálogo geral de Cursos e atividades segue com o registro do salão no mosaico. A compilação e os 26 testes passaram. Foram conferidos o destaque da home, o recorte da página em desktop e celular e a ampliação na galeria. A troca está local. [Foto original](https://commons.wikimedia.org/wiki/File:DSC_3510_athens_Bouzouki_player_street_july_2018.jpg)

### 29 de outubro de 2026

- A revisão geral corrigiu links do acervo, retirou uma categoria interna da listagem pública, ajustou retratos e legendas em telas estreitas e passou a entregar a página inicial com conteúdo no HTML. A auditoria cobriu 96 páginas, 9 redirecionamentos e 2.402 links internos. [Relatório da primeira rodada](docs/REVISAO-01.md)
- A revisão de acessibilidade ajustou o atalho para o conteúdo, a leitura das respostas recolhidas do FAQ e o retorno de foco ao fechar fotos. Carrossel e vídeos passaram a pausar enquanto a galeria está aberta, preservando a pausa manual dos vídeos.
- Publicado o commit `8639fac` com essas correções, o rodapé reorganizado e a retirada do cartaz da página do Clube de Cinema. A publicação foi validada com 25 testes e conferência no navegador. [Execução da publicação](https://github.com/Th3Unforg1ven/coletividade-helenica-sp-preview/actions/runs/40964070817)

## Como manter

Leia o handoff ao retomar o projeto. Ao concluir uma alteração, revisão ou publicação relevante, acrescente uma entrada datada no topo do journal e atualize o handoff com o estado mais recente. Se o trabalho ficar pela metade, registre onde parou e qual é a próxima ação.

Cada entrada deve ser curta. Registre o que mudou e por quê, o que foi verificado e o que ficou pendente. Quando houver publicação, anote o commit, o destino e a evidência. Use links para código, relatórios e execuções quando ajudarem a retomar o trabalho. Mantenha credenciais e dados pessoais fora do documento.
