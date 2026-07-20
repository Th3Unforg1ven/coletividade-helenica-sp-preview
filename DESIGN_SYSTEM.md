# Design System: Coletividade Helênica de São Paulo

## Conceito

**A Grécia vive onde nós estamos.** A identidade combina rigor editorial, luminosidade mediterrânea e calor comunitário. Referências históricas aparecem por meio de proporção, ritmo, geometria, materiais e linguagem, sem funcionar como ornamento temático.

O nome **Coletividade Helênica de São Paulo** é tratado como o principal ativo verbal da marca e ocupa o primeiro plano do hero. A ponte entre Atenas e São Paulo aparece na mistura entre arquitetura mediterrânea, luz brasileira, memória de imigração e vida comunitária contemporânea.

## Princípios

1. **Herança viva:** comunicar presente e continuidade, não nostalgia congelada.
2. **Branco como luz:** o branco é espaço, respiro e matéria; o azul organiza e dá identidade.
3. **Cultura com humanidade:** pessoas, encontros e transformação vêm antes do folclore.
4. **Grécia por sugestão:** arquitetura, palavras gregas e ritmo geométrico usados com contenção.
5. **Clareza institucional:** todas as páginas devem responder o que é, para quem é e qual o próximo passo.

## Cores

| Token | Valor | Uso |
|---|---:|---|
| `blue-900` | `#09265F` | títulos, fundos institucionais |
| `blue-800` | `#123C8C` | cor principal, botões e links |
| `blue-600` | `#2864C7` | destaques e estados ativos |
| `blue-100` | `#DBE8FA` | fundos e detalhes sutis |
| `ivory` | `#F7F5EF` | fundo predominante |
| `sand` | `#E7DFD2` | divisores e referência material |
| `ink` | `#101B31` | texto principal |
| `muted` | `#5C6472` | texto secundário |

## Tipografia

- **GFS Didot:** títulos, frases de impacto e palavras gregas. Conecta o editorial contemporâneo às formas clássicas.
- **DM Sans:** navegação, corpo, botões e dados. Oferece legibilidade e neutralidade.
- Escala fluida de títulos com `clamp()` e entrelinha compacta; texto corrido entre 16 e 18px e entrelinha mínima de 1.6.

## Componentes

- Header translúcido/leve com nome institucional e CTA persistente.
- Hero arquitetônico dividido em planta modular, colunata gráfica e galeria viva.
- Galeria com transição entre arquitetura, aprendizado da língua e pintura contemporânea.
- Identificação textual discreta para cada seção, sem numeração.
- Estrutura baseada em espaço, tipografia, imagens e proporções amplas.
- Abas de experiências com uma proposta transformacional por atividade.
- Agenda em linhas, pensada para integração futura com CMS.
- Acordeão de perguntas frequentes.
- CTA comunitário final e rodapé institucional.

## Voz e conteúdo

- Acolhedora, segura e culta; nunca burocrática.
- Explicar o benefício humano antes da grade ou logística.
- Trocar “oferecemos aulas” por resultados concretos: conversar, pertencer, tocar, dançar, viajar, compreender.
- Usar o grego como camada de significado, sempre acompanhado de contexto em português.

## Acessibilidade

- Contraste AA nas combinações principais.
- Alvos interativos com pelo menos 44px quando isolados.
- Navegação sem dependência de hover.
- Textos alternativos em imagens relevantes.
- Respeito à preferência de redução de movimento.

## Movimento

- Transição de imagens por dissolução lenta e aproximação óptica sutil, em ciclos de 4,6 segundos.
- Controles manuais permanecem disponíveis junto à galeria.
- Trocas entre atividades recebem apenas uma entrada curta; o movimento não pode competir com a leitura.
- Com `prefers-reduced-motion`, animações e transições são desativadas.
