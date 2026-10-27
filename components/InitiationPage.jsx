import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../src/providers/LanguageProvider'
import NumbersSection from '../components/NumbersSection'
import AlphabetSection from '../components/AlphabetSection '
import AdlamTableDouzMois from '../components/AdlamTableDouzMois'
import AdlamTableDouzMois2 from '../components/AdlamTableDouzMois2'
import AdlamSemaine from '../components/AdlamSemaine'

// Composant pour chaque section de discussion culturelle
const CulturalDiscussionSection = ({ content }) => {
  if (!content) return null
  return (
    <section className='py-16 bg-white text-gray-800'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <h2 className='text-3xl md:text-4xl font-extrabold mb-4 font-adlam text-center'>
          {content.title}
        </h2>
        <p className='text-lg text-center leading-relaxed max-w-3xl mx-auto'>
          {content.description}
        </p>
      </div>
    </section>
  )
}

const CalendarSection = ({ content }) => {
  if (!content) return null
  return (
    <section className='py-16 bg-gray-100 text-gray-800'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <h2 className='text-3xl md:text-4xl font-extrabold mb-4 font-adlam text-center'>
          {content.title}
        </h2>
        <p className='text-lg text-center leading-relaxed max-w-3xl mx-auto'>
          {content.description}
        </p>
      </div>
    </section>
  )
}

const InitiationPage = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const pageContent = currentLang.initiationPage || {}

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage
  const pageTitle = pageContent.heroTitle || 'Initiation | Akweeyo'
  const pageDescription = pageContent.heroDescription || "Apprenez l'alphabet, les nombres, les mois et la culture en écriture adlam et pular sur Akweeyo."
  const canonicalUrl = 'https://akweeyo.com/initiation'
  const heroImage = '/votre-image-de-fond.jpg' // Remplacez par l'URL hébergée sur Cloud Foundry si nécessaire

  if (!currentLang.initiationPage) {
    return <div className='text-center py-20 font-sans'>Chargement...</div>
  }

  return (
    <>
      {/* --- INJECTION SEO & MÉTADONNÉES --- */}
      <Helmet>
        <html lang={currentLangCode} />
        <title>{pageTitle} | Akweeyo</title>
        <meta name='description' content={pageDescription} />

        <link rel='canonical' href={canonicalUrl} />

        {/* Open Graph pour les partages réseaux sociaux (WhatsApp, Facebook) */}
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:image' content={heroImage} />
        <meta property='og:url' content={canonicalUrl} />
        <meta property='og:type' content='website' />

        {/* Données structurées Schema.org */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: pageTitle,
            description: pageDescription,
            inLanguage: currentLangCode,
          })}
        </script>
      </Helmet>

      {/* --- CONTENU DE LA PAGE --- */}
      <div
        className='font-sans pt-40'
        style={{ direction: textDirection }}
        lang={currentLangCode}
      >
        {/* Section Héro */}
        <div className='relative h-96 flex items-center justify-center text-center text-white overflow-hidden bg-[#2c3159]'>
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{
              backgroundImage: `url('${heroImage}')`,
              filter: 'brightness(50%)',
              zIndex: 1,
            }}
          ></div>
          <div className='relative z-10 px-4 max-w-4xl mx-auto'>
            <h1 className='text-4xl md:text-6xl font-extrabold font-adlam mb-4'>
              {pageContent.heroTitle}
            </h1>
            <p className='text-xl md:text-2xl mt-4 max-w-2xl mx-auto font-adlam'>
              {pageContent.heroDescription}
            </p>
          </div>
        </div>

        {/* Composants d'apprentissage et tableaux interactifs */}
        <NumbersSection />
        <AlphabetSection />
        <AdlamSemaine />
        <AdlamTableDouzMois />
        <AdlamTableDouzMois2 />

        {/* Sections dynamiques basées sur les données (si activées dans vos traductions) */}
        {pageContent.sections && pageContent.sections[0] && (
          <CulturalDiscussionSection content={pageContent.sections[0]} />
        )}
        {pageContent.sections && pageContent.sections[1] && (
          <CalendarSection content={pageContent.sections[1]} />
        )}
      </div>
    </>
  )
}

export default InitiationPage