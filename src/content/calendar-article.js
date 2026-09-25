import { PASCHA, YEARS, dateAtUTC } from './hellenic-calendar.js'

export const calendarArticle = {
  id: 'editorial-calendario-grego',
  slug: 'calendario-grego-ortodoxo-pascoa-feriados',
  title: 'Calendário grego e ortodoxo: Páscoa, festas e feriados até 2030',
  excerpt: 'Consulte as datas da Páscoa grega de 2026 a 2030 e conheça as grandes festas ortodoxas e os feriados que marcam o calendário helênico.',
  date: '2026-09-24T12:00:00-03:00',
  categories: [21],
  editorial: true,
  featuredMedia: { sourceUrl: '/images/exposicao-cultural-original.webp' },
  content: `
    <p>O calendário grego reúne datas cívicas e celebrações religiosas. Para acompanhar esse ritmo, vale distinguir as festas de data fixa daquelas que mudam conforme a Páscoa. Este guia apresenta as principais referências para consultar a Agenda da Coletividade Helênica de São Paulo.</p>
    <h2>Quando é a Páscoa grega?</h2>
    <p>A Páscoa ortodoxa, também chamada de <em>Pascha</em>, celebra a Ressurreição de Cristo. Veja as datas de 2026 a 2030:</p>
    <table><caption>Datas da Páscoa ortodoxa grega</caption><thead><tr><th scope="col">Ano</th><th scope="col">Domingo de Páscoa</th></tr></thead><tbody>${YEARS.map(year => `<tr><th scope="row">${year}</th><td>${new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(dateAtUTC(PASCHA[year]))}</td></tr>`).join('')}</tbody></table>
    <h2>A Páscoa ortodoxa cai sempre no mesmo dia da ocidental?</h2>
    <p>Não. Os calendários pascais podem coincidir ou indicar domingos diferentes. Em 2028, ambos indicam 16 de abril; em 2027, a Páscoa ortodoxa será em 2 de maio. Por isso, ao planejar uma visita ou encontro, consulte a data ortodoxa do ano desejado.</p>
    <h2>Da Quaresma a Pentecostes</h2>
    <p>A Segunda-feira Limpa marca o início da Grande Quaresma. O Domingo de Ramos antecede a Páscoa em uma semana. Depois vêm a Semana Santa e a celebração pascal. Ascensão e Pentecostes também acompanham esse ciclo, mudando de data a cada ano. A <a href="/cultura/pascoa-ortodoxa-2026-2030">tabela das festas móveis de 2026 a 2030</a> permite conferir essas datas juntas.</p>
    <h2>Quais são as doze grandes festas ortodoxas?</h2>
    <p>Nove têm data fixa no calendário aqui adotado:</p>
    <ul>
      <li>6 de janeiro — Teofania (Epifania).</li>
      <li>2 de fevereiro — Apresentação de Cristo no Templo.</li>
      <li>25 de março — Anunciação à Mãe de Deus.</li>
      <li>6 de agosto — Transfiguração de Cristo.</li>
      <li>15 de agosto — Dormição da Mãe de Deus.</li>
      <li>8 de setembro — Natividade da Mãe de Deus.</li>
      <li>14 de setembro — Exaltação da Santa Cruz.</li>
      <li>21 de novembro — Entrada da Mãe de Deus no Templo.</li>
      <li>25 de dezembro — Natal de Cristo.</li>
    </ul>
    <p>As três festas móveis são Domingo de Ramos, Ascensão e Pentecostes. A Páscoa tem destaque próprio neste guia. Consulte a <a href="/cultura/doze-grandes-festas-ortodoxas">explicação das doze grandes festas</a> para aprofundar a leitura.</p>
    <h2>Feriados e datas cívicas da Grécia</h2>
    <p>Ano-Novo, em 1º de janeiro; Independência da Grécia, em 25 de março; Dia do Trabalho, em 1º de maio; e Dia do Oxi, em 28 de outubro, são referências cívicas. Em 25 de março, a Independência compartilha a data com a Anunciação.</p>
    <p>Conheça os <a href="/cultura/feriados-gregos-datas-civicas-religiosas">feriados gregos e suas diferenças</a>. Expedientes e eventuais transferências de feriados devem ser confirmados nos anúncios oficiais do ano correspondente.</p>
    <h2>Como acompanhar as datas em São Paulo</h2>
    <p>Na Agenda, escolha o ano e o mês ou abra a lista anual. O quadro da Páscoa acompanha o ano selecionado, e o botão Hoje retorna ao dia atual.</p>
    <p>Uma data religiosa ou um feriado grego não confirma uma festa, liturgia ou alteração de expediente da CHSP. A programação local deve ser consultada com a comunidade.</p>
    <h2>Qual calendário este guia utiliza?</h2>
    <p>As festas fixas seguem o calendário grego de novo estilo; as datas móveis seguem o ciclo pascal ortodoxo. Outras tradições podem observar festas fixas em dias diferentes. O recorte inclui as principais celebrações, sem abranger todos os santos diários ou feriados regionais.</p>
  `,
}
