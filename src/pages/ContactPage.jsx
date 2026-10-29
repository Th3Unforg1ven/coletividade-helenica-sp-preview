import { EncontroIcon } from '../components/ChspIcons.jsx'
import { siteContact } from '../content/site-config.js'
import { useState } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import FacebookIcon from '../FacebookIcon.jsx'
import InstagramIcon from '../InstagramIcon.jsx'
import { Breadcrumbs, ContentHero } from '../components/ContentLayout.jsx'

export default function ContactPage() {
  const [copyStatus, setCopyStatus] = useState('')
  const [showAddress, setShowAddress] = useState(false)
  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(siteContact.fullAddress)
      setCopyStatus('Endereço copiado.')
      setShowAddress(false)
    } catch {
      setShowAddress(true)
      setCopyStatus('Selecione o endereço abaixo para copiar.')
    }
  }
  return (
    <main className="content-page">
      <Breadcrumbs items={[{ label: 'Contato' }]} />
      <ContentHero
        eyebrow="Contato"
        title="Converse com a Coletividade"
        introduction="Informações sobre aulas, inscrições, associação, eventos e atividades culturais."
        image="/images/sala-aulas-sede-original.webp"
        imageAlt="Sala da sede da Coletividade Helênica de São Paulo"
      >
        <div className="contact-quick-actions">
          <a className="button" href={siteContact.whatsapp}>
            <EncontroIcon size={20} />
            Conversar pelo WhatsApp
          </a>
          <div>
            <span>Ou ligue para a equipe</span>
            <a href={siteContact.phoneHref}>{siteContact.phone}</a>
            <a href={siteContact.mobileHref}>{siteContact.mobile}</a>
          </div>
        </div>
      </ContentHero>
      <section className="contact-panel">
        <div className="contact-panel__intro">
          <p className="content-kicker">Contato direto</p>
          <h2>Como podemos ajudar?</h2>
          <p>
            Escolha o canal mais conveniente para falar com a equipe da Coletividade Helênica de São
            Paulo.
          </p>
        </div>
        <div className="contact-methods">
          <div>
            <Phone />
            <span>
              <small>Telefones</small>
              <a href={siteContact.phoneHref}>{siteContact.phone}</a>
              <a href={siteContact.mobileHref}>{siteContact.mobile}</a>
            </span>
          </div>
          <a href={siteContact.emailHref}>
            <Mail />
            <span>
              <small>E-mail</small>
              <strong>coletividade@helenica.com.br</strong>
            </span>
          </a>
          <a href={siteContact.instagram} target="_blank" rel="noreferrer">
            <InstagramIcon />
            <span>
              <small>Instagram oficial</small>
              <strong>@coletividadehelenica.sp</strong>
            </span>
          </a>
          <a href={siteContact.facebook} target="_blank" rel="noreferrer">
            <FacebookIcon />
            <span>
              <small>Facebook oficial</small>
              <strong>Coletividade Helênica de São Paulo</strong>
            </span>
          </a>
          <div>
            <MapPin />
            <span>
              <small>Endereço</small>
              <strong>{siteContact.address}</strong>
              <em>Brás, São Paulo, SP</em>
              <span className="address-actions">
                <a href={siteContact.directions} target="_blank" rel="noopener noreferrer">
                  Abrir rota
                </a>
                <button type="button" onClick={copyAddress}>
                  Copiar endereço
                </button>
              </span>
              <span role="status" aria-live="polite">
                {copyStatus}
              </span>
              {showAddress && (
                <input
                  aria-label="Endereço completo para copiar"
                  readOnly
                  value={siteContact.fullAddress}
                  onFocus={(event) => event.target.select()}
                />
              )}
            </span>
          </div>
        </div>
        <aside className="contact-return">
          <EncontroIcon />
          <p className="content-kicker">Prefere conversar pelo WhatsApp?</p>
          <h2>Fale com nossa equipe.</h2>
          <p>Envie uma mensagem e conte brevemente como podemos ajudar.</p>
          <a
            className="button button--white"
            href={siteContact.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            Conversar pelo WhatsApp
          </a>
        </aside>
      </section>
      <div className="contact-map">
        <iframe
          title="Mapa da sede da Coletividade Helênica de São Paulo"
          data-consent-src="https://maps.google.com/maps?q=Rua%20Bresser%2C%20793&amp;t=m&amp;z=17&amp;output=embed&amp;iwloc=near"
          loading="lazy"
        />
      </div>
    </main>
  )
}
