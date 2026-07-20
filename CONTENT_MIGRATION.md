# Cobertura da migração de conteúdo

Fonte consultada: `https://www.helenica.com.br/wp-json/wp/v2`

Data da coleta: 20 de julho de 2026

## Totais preservados

| Tipo | Quantidade |
|---|---:|
| Páginas públicas | 27 |
| Publicações | 42 |
| Categorias | 11 |
| Registros acessíveis no arquivo integral | 69 |
| Caracteres de HTML original preservados | 321.224 |

Todo o HTML público de páginas e publicações foi salvo em `src/content/site-content.json`. Os textos são apresentados integralmente nas rotas correspondentes. Links internos do WordPress são convertidos para as novas rotas durante a renderização.

## Páginas de Aulas

| Página anterior | Nova rota |
|---|---|
| Aulas de Grego Moderno | `/aulas/aulas-de-grego-moderno` |
| Aulas de Dança | `/aulas/aulas-de-danca` |
| Aulas de Bouzouki | `/aulas/aulas-de-bouzouki` |
| Oficinas Culturais | `/aulas/oficinas-culturais` |
| Atividades culturais da CHSP | `/cultura/paginas/atividades-culturais-da-chsp` |

## Páginas institucionais

| Página anterior | Nova rota |
|---|---|
| Sobre a CHSP | `/coletividade/sobre-a-chsp` |
| Nossa história | `/coletividade/nossa-historia` |
| Missão, visão, valores | `/coletividade/missao-visao-valores` |
| Conselho deliberativo e diretoria executiva | `/coletividade/conselho-deliberativo-e-diretoria-executiva` |
| Conselheiros | `/coletividade/conselheiros` |
| Lista de Conselheiros | `/coletividade/lista-de-conselheiros` |
| Associados e parceiros | `/participe` |
| Contato | `/contato` |
| Política de privacidade | `/privacidade` |

## Cultura, memória e agenda

As 42 publicações estão disponíveis em `/cultura` e em rotas individuais no formato `/cultura/{slug}`. As categorias com publicações também possuem páginas próprias.

As páginas Acontece Curiosidades, Acontece Destinos, Acontece Gastronomia, Acontece Memórias, Acontece Músicas Gregas e Danças Folclóricas, Acontece Últimos Eventos, Acontece2, Festividades cívicas e religiosas e Atividades culturais estão preservadas em `/cultura/paginas/{slug}`.

A agenda está em `/agenda` e reúne o conteúdo da página anterior com todas as publicações classificadas como Eventos.

## Arquivo integral

A rota `/arquivo` lista individualmente as 27 páginas e as 42 publicações. Páginas técnicas antigas, como Sample Page e temp, não aparecem na navegação principal, mas continuam acessíveis por meio desse arquivo.

## Páginas originalmente vazias

As seguintes páginas retornaram conteúdo vazio pela API pública do WordPress:

1. Agenda de Eventos e Festas
2. Um pouco mais sobre a Grécia
3. Conselho deliberativo e diretoria executiva
4. Missão, visão, valores
5. Nossa história

Essas rotas foram mantidas. Os textos relacionados disponíveis no site anterior também aparecem nas páginas consolidadas Sobre a CHSP, Conselheiros, Cultura e Agenda.
