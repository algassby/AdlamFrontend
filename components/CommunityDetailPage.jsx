import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'

const CommunityDetailPage = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const communityDetailsData = currentLang.communityDetails || {
    backButton: 'Retour',
    title: 'Communauté Akweeyo',
    intro: 'Découvrez la communauté...',
    section1: { heading: '', text: '' },
    section2: { text: '' },
  }

  const textAlignClass = textDirection === 'rtl' ? 'text-right' : 'text-left'
  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  // URL de l'image de la communauté (hébergée sur Cloud Foundry)
  const imageUrl = '/images/communaute.jpg' // Remplacez par l'URL complète si elle est sur Cloud Foundry (ex: https://votre-app.cfapps.io/images/communaute.jpg)
  const pageTitle = communityDetailsData.title || 'Communauté | Akweeyo'
  const pageDescription = communityDetailsData.intro || 'Découvrez la communauté et les actualités en écriture adlam et pular sur Akweeyo.'
  const canonicalUrl = 'https://akweeyo.com/community'

  return (
    <>
      {/* --- INJECTION SEO & MÉTADONNÉES POUR LES ROBOTS --- */}
      <Helmet>
        <html lang={currentLangCode} />
        <title>{pageTitle} | Akweeyo</title>
        <meta name='description' content={pageDescription} />

        <link rel='canonical' href={canonicalUrl} />

        {/* Open Graph pour le partage sur les réseaux sociaux (WhatsApp, Facebook, Telegram) */}
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:image' content={imageUrl} />
        <meta property='og:url' content={canonicalUrl} />
        <meta property='og:type' content='website' />

        {/* Données structurées pour Google Images et le référencement sémantique */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            'contentUrl': imageUrl,
            'name': pageTitle,
            'caption': pageDescription,
            'inLanguage': currentLangCode,
          })}
        </script>
      </Helmet>

      {/* --- CONTENU DE LA PAGE --- */}
      <div
        className='bg-white pt-40 pb-16 font-sans md:pt-16'
        style={{ direction: textDirection }}
        lang={currentLangCode}
      >
        <div className='container mx-auto max-w-4xl px-4'>
          {/* Bouton de retour */}
          <Link
            to='/'
            className='inline-block bg-[#2c3159] text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-[#1a1e3a] transition duration-300 mb-8'
          >
            {communityDetailsData.backButton}
          </Link>

          {/* Titre principal */}
          <h1
            className={`text-4xl md:text-5xl font-bold text-[#2c3159] mb-8 font-adlam ${textAlignClass}`}
          >
            {communityDetailsData.title}
          </h1>

          {/* Introduction avec texte justifié */}
          <p
            className={`text-gray-600 text-lg leading-relaxed mb-8 text-justify`}
          >
            {communityDetailsData.intro}
          </p>

          {/* Section principale avec image et texte justifié */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12'>
            <img
              src={imageUrl}
              alt={communityDetailsData.title || 'Illustration communauté Akweeyo'}
              title={communityDetailsData.title}
              loading='lazy'
              className='rounded-lg shadow-lg w-full h-auto object-cover'
            />
            <div className={`flex flex-col`}>
              <h2
                className={`text-2xl font-bold text-[#2c3159] mb-4 font-adlam ${textAlignClass}`}
              >
                {communityDetailsData.section1?.heading}
              </h2>
              <p className='text-gray-600 leading-relaxed mb-4 text-justify'>
                {communityDetailsData.section1?.text}
              </p>
            </div>
          </div>

          {/* Autres paragraphes ou sections avec texte justifié */}
          <div className={`space-y-6 text-justify`}>
            <p className='text-gray-600 leading-relaxed'>
              {communityDetailsData.section2?.text}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

Description: export default CommunityDetailPage