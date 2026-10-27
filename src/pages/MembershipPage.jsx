import { ArrowDown, ArrowRight, Download, FileText, MessageCircle, Plus } from 'lucide-react'
import { Breadcrumbs, ContentHero } from '../components/ContentLayout.jsx'
import { membership, membershipPartners, membershipQuestions } from '../content/membership.js'
import { assetUrl } from '../paths.js'
import '../membership.css'

function MembershipContact({ className = 'button', children = 'Quero me associar' }) {
  return (
    <a
      className={className}
      href={membership.contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={18} aria-hidden="true" />
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  )
}

export default function MembershipPage() {
  return (
    <main className="content-page membership-page">
      <Breadcrumbs
        items={[{ label: 'A Coletividade', to: '/coletividade' }, { label: 'Associe-se' }]}
      />
      <ContentHero
        eyebrow="Associe-se"
        title="Faça parte da nossa coletividade."
        seoTitle="Associe-se | Coletividade Helênica de São Paulo"
        introduction="Fortaleça os laços com a cultura grega e contribua para manter vivas a história, as tradições e a convivência da comunidade em São Paulo."
        image="/images/comunidade/dia-imigrante-comunidade.webp"
        imageAlt="Adultos, jovens e crianças reunidos na sede da Coletividade Helênica de São Paulo"
        imagePosition="center 60%"
        motifTheme="coletividade"
      >
        <div className="membership-actions">
          <MembershipContact />
          <a className="text-link" href="#como-se-associar">
            Como funciona <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
      </ContentHero>

      <section className="membership-purpose" aria-labelledby="membership-purpose-title">
        <div>
          <p className="content-kicker">Cultura que continua</p>
          <h2 id="membership-purpose-title">Uma história que também pode ser sua.</h2>
        </div>
        <div>
          <p>
            Associar-se à Coletividade Helênica de São Paulo é fazer parte de uma comunidade que
            valoriza e preserva a cultura, a história, as tradições e os costumes gregos.
          </p>
          <p>
            É uma oportunidade de fortalecer os laços com a herança helênica, participar de
            atividades culturais e sociais, conviver com pessoas que compartilham desse interesse e
            contribuir para manter viva a identidade e o legado da Grécia em São Paulo.
          </p>
        </div>
      </section>

      <section
        className="membership-process"
        id="como-se-associar"
        aria-labelledby="membership-process-title"
      >
        <div className="membership-process__heading">
          <p className="content-kicker">O próximo passo</p>
          <h2 id="membership-process-title">Como se associar</h2>
          <p>Comece pela ficha. O Conselho pode orientar você sobre a solicitação.</p>
          <a className="button" href={assetUrl(membership.form)} download>
            <Download size={18} aria-hidden="true" /> Baixar ficha de associado
          </a>
          <small>PDF · 1 página · para preencher e assinar</small>
        </div>
        <ol className="membership-steps">
          <li>
            <span aria-hidden="true">01</span>
            <div>
              <h3>Preencha a ficha</h3>
              <p>Baixe o documento, preencha seus dados, escolha a contribuição mensal e assine.</p>
            </div>
          </li>
          <li>
            <span aria-hidden="true">02</span>
            <div>
              <h3>Converse com o Conselho</h3>
              <p>Combine a entrega da ficha e esclareça as etapas de admissão à Coletividade.</p>
            </div>
          </li>
          <li>
            <span aria-hidden="true">03</span>
            <div>
              <h3>Receba orientação sobre os próximos passos</h3>
              <p>A equipe orienta sobre a análise da solicitação e a forma de contribuição.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="membership-contribution" aria-labelledby="membership-contribution-title">
        <div>
          <p className="content-kicker">Um compromisso com a comunidade</p>
          <h2 id="membership-contribution-title">
            Sua contribuição ajuda essa história a continuar.
          </h2>
          <p>
            A mensalidade começa em {membership.contribution}. Se desejar contribuir com um valor
            maior, indique sua escolha na ficha de associado.
          </p>
        </div>
        <div className="membership-contribution__amount">
          <span>A partir de</span>
          <p>
            {membership.contribution}
            <small>/mês</small>
          </p>
          <span>Contribuição associativa</span>
        </div>
      </section>

      <section className="membership-documents" aria-labelledby="membership-documents-title">
        <p className="content-kicker">Para consultar com calma</p>
        <h2 id="membership-documents-title">Documentos da associação</h2>
        <div>
          <a href={assetUrl(membership.form)} download>
            <FileText size={26} aria-hidden="true" />
            <span>
              <strong>Ficha de associado</strong>
              <small>PDF · 1 página · baixar para preencher</small>
            </span>
            <Download size={20} aria-hidden="true" />
          </a>
          <a href={assetUrl(membership.statute)} target="_blank" rel="noopener noreferrer">
            <FileText size={26} aria-hidden="true" />
            <span>
              <strong>Estatuto: trecho sobre associados</strong>
              <small>PDF · 8 páginas · abre em outra aba</small>
            </span>
            <ArrowRight size={20} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="membership-faq" aria-labelledby="membership-faq-title">
        <div>
          <p className="content-kicker">Antes de começar</p>
          <h2 id="membership-faq-title">Dúvidas sobre a associação</h2>
        </div>
        <div>
          {membershipQuestions.map(({ question, answer }) => (
            <details key={question}>
              <summary>
                {question}
                <Plus size={19} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="membership-contact" aria-labelledby="membership-contact-title">
        <div>
          <p className="content-kicker">Uma conversa para começar</p>
          <h2 id="membership-contact-title">Vamos fazer parte dessa história?</h2>
          <p>Fale com o {membership.contact.name} sobre sua associação.</p>
        </div>
        <MembershipContact className="button button--white">Falar com o Conselho</MembershipContact>
      </section>

      <section className="membership-partners" aria-labelledby="membership-partners-title">
        <p className="content-kicker">Laços da comunidade</p>
        <h2 id="membership-partners-title">Parceiros da Coletividade</h2>
        <div>
          {membershipPartners.map(({ name, image, href }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer">
              <img src={assetUrl(image)} alt="" loading="lazy" width="96" height="96" />
              <span>
                {name}
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
