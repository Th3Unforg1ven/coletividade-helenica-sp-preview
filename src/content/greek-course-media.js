const folder = '/images/aulas/presencial'
export const classroomPhotos = [
  {
    name: 'turma-em-estudo',
    caption: 'Leitura e anotações durante uma aula presencial de grego.',
    width: 900,
    height: 1600,
  },
  {
    name: 'escrita-no-quadro',
    caption: 'A escrita grega ganha espaço no quadro e na conversa.',
    width: 900,
    height: 1600,
  },
  {
    name: 'biblioteca-em-aula',
    caption: 'Materiais de estudo e a biblioteca acompanham o aprendizado.',
    width: 1200,
    height: 1600,
  },
  {
    name: 'sala-e-cultura',
    caption: 'Mapa, livros e referências da Grécia na sala de aula.',
    width: 1200,
    height: 1600,
  },
].map((photo) => ({
  ...photo,
  src: `${folder}/${photo.name}.jpeg`,
  displaySrc: `${folder}/${photo.name}.webp`,
}))

export const classroomFeature = {
  src: `${folder}/professora-em-aula.jpeg`,
  displaySrc: `${folder}/professora-em-aula.webp`,
  caption: 'Explicação e escrita no quadro durante uma aula de grego na sede da CHSP.',
  width: 900,
  height: 1600,
}
