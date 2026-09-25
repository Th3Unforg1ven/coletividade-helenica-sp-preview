// Each editorial article has its own image; avoid category-wide fallbacks.
const photo = (sourceUrl, alt, position = '50% 50%') => ({ sourceUrl, alt, position })
const illustration = (name, alt) => ({ ...photo(`/images/editorial/${name}.webp`, `Ilustração: ${alt}`), illustration: true })

export const editorialMedia = {
  'calendario-grego-ortodoxo-pascoa-feriados': illustration('calendario-ortodoxo', 'ciclo anual representado por folhas de calendário, oliveira e igreja'),
  'feriados-gregos-datas-civicas-religiosas': photo('/images/archive/e3282cda77-grecia.webp', 'Vista da Acrópole e da cidade de Atenas'),
  'pascoa-ortodoxa-2026-2030': photo('/images/archive/36ae85da80-pascoa-1-683x1024.webp', 'Celebração da Semana Santa ortodoxa com epitáfio ornamentado por flores', '50% 40%'),
  'doze-grandes-festas-ortodoxas': illustration('grandes-festas', 'velas acesas em interior de inspiração bizantina'),
  'ano-liturgico-ortodoxo': photo('/images/archive/7958d8e0c7-igreja-de-panaghia-kapnikarea.webp', 'Igreja de Panaghia Kapnikarea, em Atenas'),
  'onde-aprender-grego-moderno-sao-paulo': photo('/images/sala-aulas-sede-original.webp', 'Sala de aulas e biblioteca da sede da Coletividade Helênica'),
  'grego-moderno-para-iniciantes': photo('/images/aulas-grego-turma-recorte-original.webp', 'Participantes de uma aula on-line de grego da Coletividade'),
  'grego-moderno-e-antigo-diferencas': illustration('grego-antigo-moderno-v2', 'pintura de uma conversa em rua grega com uma coluna antiga e portas azuis'),
  'alfabeto-grego-letras-sons': illustration('alfabeto-grego-v2', 'mural com letras alfa, ômega e fi em azul e terracota sobre reboco'),
  'dancas-gregas-sirtaki-kalamatianos': photo('/images/aulas-danca-original.webp', 'Apresentação de danças gregas com trajes tradicionais'),
  'bouzouki-instrumento-musica-grega': illustration('bouzouki', 'bouzouki grego de braço longo apoiado em uma cadeira'),
  'pascoa-grega-tradicoes-ovos-vermelhos': photo('/images/archive/a915c84d24-pascoa-grega-eventos-blog-coletividade-helenica-scaled.webp', 'Cesta com ovos vermelhos na celebração da Páscoa grega'),
  '25-de-marco-independencia-grecia': photo('/images/archive/002e99aaa5-dji-0005.webp', 'Avenida Paulista iluminada com a bandeira grega na comemoração da independência'),
  'dia-do-oxi-28-de-outubro': illustration('dia-do-oxi', 'bandeira grega e coroa de oliveira simbolizam a memória do Dia do Oxi'),
  'imigracao-grega-sao-paulo-chsp': photo('/images/primeira-diretoria-chsp.webp', 'Fotografia histórica da primeira diretoria da Coletividade Helênica'),
  'cultura-grega-em-sao-paulo': photo('/images/evento-comunidade-original.webp', 'Encontro cultural com apresentação de dança na Coletividade Helênica'),
  'expressoes-grego-viagem': photo('/images/archive/c616346ac1-chronis-yan-unsplash-scaled.webp', 'Ruas e praça de Monastiraki com a Acrópole ao fundo, em Atenas', '50% 65%'),
}
