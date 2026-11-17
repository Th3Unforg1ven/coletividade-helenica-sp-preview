export const membership = {
  contribution: 'R$ 25',
  form: '/documentos/ficha-de-associacao-chsp.pdf',
  contact: {
    whatsapp:
      'https://wa.me/5511913073510?text=' +
      encodeURIComponent(
        'Olá! Tenho interesse em me associar à Coletividade Helênica de São Paulo. Podem me orientar sobre a ficha e os próximos passos?',
      ),
  },
}

export const membershipQuestions = [
  {
    question: 'Quais são as condições para solicitar a associação?',
    answer:
      'Para solicitar a associação, é preciso pedir a ficha de inscrição de associado, ter mais de 18 anos e escolher o valor da contribuição.',
  },
  {
    question: 'Preciso de indicação de outros associados?',
    answer:
      'Não é necessário ter indicação de outros associados, ser grego ou ter ascendência grega.',
  },
  {
    question: 'Como faço o pagamento da contribuição?',
    answer:
      'A contribuição mensal começa em R$ 25. A ficha também permite escolher uma contribuição maior. A Coletividade orienta sobre a forma de pagamento e os próximos passos da associação.',
  },
]

// Institutions already listed on the previous association and partners page.
export const membershipPartners = [
  {
    name: 'Embaixada da Grécia no Brasil',
    image: '/images/archive/baa19d46b3-embaixada-gr-brasilia-ok-1024x1024.webp',
    href: 'https://www.mfa.gr/missionsabroad/br/brazil.html',
  },
  {
    name: 'Consulado Geral da Grécia em São Paulo',
    image: '/images/archive/0f240a4f9b-consulado-geral-sem-fundo-ok-1024x1024.webp',
    href: 'https://www.mfa.gr/missionsabroad/br/brazil-br/about-us2',
  },
  {
    name: 'Areté',
    image: '/images/archive/dd96e5edf7-arete-ok.webp',
    href: 'http://www.arete.org.br/',
  },
  {
    name: 'Catedral Ortodoxa Grega de São Pedro',
    image: '/images/archive/b185f23d1a-1-1.webp',
    href: 'https://www.facebook.com/arquimedesocg/',
  },
  {
    name: 'Federação das Coletividades Helênicas do Brasil',
    image: '/images/archive/e91a90e75b-fchb-ok-1024x1024.webp',
    href: 'https://www.facebook.com/Federa%C3%A7%C3%A3o-das-Comunidades-Hel%C3%AAnicas-do-Brasil-103447304797822/',
  },
  {
    name: 'Arquidiocese Ortodoxa Grega da América do Sul',
    image: '/images/archive/31901d0076-20201005-230114.webp',
    href: 'https://ecclesia.org.br/arquidiocese/',
  },
]
