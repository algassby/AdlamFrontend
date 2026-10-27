import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../src/providers/LanguageProvider'

const AboutPage = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const aboutData = currentLang.about || {
    smallTitle: '𞤊𞤭𞥅 𞤢𞤥𞤭𞤲 / À propos',
    largeTitle: '𞤆𞤮𞤼𞥆𞤢𞤤 - 𞤐𞤵𞤲𞤯𞤢𞤽 - 𞤏𞤢𞤳𞥆𞤭𞤸𞤢𞥄𞤩𞤫𞤪𞤫',
    paragraph1: "Découvrez notre mission...",
    paragraph2: '',
    paragraph3: '',
  }

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage
  const logoUrl = '/images/logo.png'
  const pageTitle = `${aboutData.smallTitle || 'À propos'} | Akweeyo`
  const pageDescription = aboutData.paragraph1
    ? aboutData.paragraph1.slice(0, 160)
    : 'À propos de notre association, notre vision et nos objectifs pour la promotion de la culture et écriture adlam/pular.'
  const canonicalUrl = 'https://akweeyo.com/about'

  // Séparation du titre tricolore
  const largeTitleParts = (aboutData.largeTitle || '').split('-')
  const colors = ['text-green-600', 'text-orange-500', 'text-[#2c3159]']

  // Découpage du paragraphe 1 par la ponctuation forte
  const paragraph1Lines = (aboutData.paragraph1 || '')
    .split(/([\.!\?])/)
    .filter((segment) => segment.trim() !== '')

  return (
    <>
      {/* --- INJECTION SEO & MÉTADONNÉES --- */}
      <Helmet>
        <html lang={currentLangCode} />
        <title>{pageTitle}</title>
        <meta name='description' content={pageDescription} />

        <link rel='canonical' href={canonicalUrl} />

        {/* Open Graph */}
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:image' content={logoUrl} />
        <meta property='og:url' content={canonicalUrl} />
        <meta property='og:type' content='website' />

        {/* Schema.org JSON-LD */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: pageTitle,
            description: pageDescription,
            inLanguage: currentLangCode,
          })}
        </script>
      </Helmet>

      {/* --- CONTENU DE LA PAGE --- */}
      <div 
        className='mt-40 py-12 px-4 sm:px-6 lg:px-8 bg-white min-h-screen font-sans'
        style={{ direction: textDirection }}
        lang={currentLangCode}
      >
        <div className='max-w-4xl mx-auto'>
          {/* Logo de l'association */}
          <div className='flex justify-center mb-10'>
            <img
              src={logoUrl}
              alt={currentLang.contact_image_alt || 'Logo de l’Association Akweeyo'}
              title='Logo Akweeyo'
              loading='lazy'
              className='h-32 w-auto object-contain'
              onError={(e) => {
                e.target.src = '/placeholder.jpg'
              }}
            />
          </div>

          {/* Petit Titre */}
          <p
            className='text-center text-sm uppercase tracking-widest text-[#2c3159] font-bold mb-2 font-adlam'
          >
            {aboutData.smallTitle}
          </p>

          {/* Grand Titre avec Couleurs Multiples */}
          <h1
            className='text-center text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 font-adlam'
          >
            {largeTitleParts.length >= 3 ? (
              largeTitleParts.map((part, index) => (
                <React.Fragment key={index}>
                  <span className={colors[index] || 'text-[#2c3159]'}>{part.trim()}</span>
                  {index < largeTitleParts.length - 1 && <span className='text-gray-400 mx-1'>-</span>}
                </React.Fragment>
              ))
            ) : (
              <span className='text-[#2c3159]'>
                {aboutData.largeTitle}
              </span>
            )}
          </h1>

          {/* Paragraphes de Contenu */}
          <div className='text-gray-700 text-lg leading-relaxed space-y-6 font-adlam text-justify'>
            <p>
              {paragraph1Lines.map((segment, index) => {
                const isPunctuation =
                  segment === '.' || segment === '!' || segment === '?'

                return (
                  <React.Fragment key={index}>
                    {segment}
                    {isPunctuation && <br />}
                    {!isPunctuation && index < paragraph1Lines.length - 1 && ' '}
                  </React.Fragment>
                )
              })}
            </p>
            {aboutData.paragraph2 && <p>{aboutData.paragraph2}</p>}
            {aboutData.paragraph3 && <p>{aboutData.paragraph3}</p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage