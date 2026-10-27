import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'

const HistoryDetailPage = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const historyDetailsData = currentLang.historicDetails || {
    backButton: 'Retour',
    title: 'Histoire',
    intro: "Découvrez l'histoire...",
    section1: { heading: '', text: '' },
    section2: { text: '' },
  }

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage
  const imageUrl = '/images/frère.jpeg' // Remplacez par l'URL complète si l'image est hébergée sur Cloud Foundry
  const pageTitle = historyDetailsData.title || 'Histoire | Akweeyo'
  const pageDescription = historyDetailsData.intro || "Découvrez l'histoire et les articles en écriture adlam et pular sur Akweeyo."
  const canonicalUrl = 'https://akweeyo.com/history'

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
        <meta property='og:type' content='article' />

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
          {/* Back button */}
          <Link
            to='/'
            className='inline-block bg-[#2c3159] text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-[#1a1e3a] transition duration-300 mb-8 font-adlam'
          >
            {historyDetailsData.backButton}
          </Link>

          {/* Main title */}
          <h1
            className={`text-4xl md:text-5xl font-bold text-[#2c3159] mb-8 font-adlam ${
              textDirection === 'rtl' ? 'text-right' : 'text-left'
            }`}
          >
            {historyDetailsData.title}
          </h1>

          {/* Introduction */}
          <p
            className={`text-gray-600 text-lg leading-relaxed mb-8 text-justify font-adlam`}
          >
            {historyDetailsData.intro}
          </p>

          {/* Main section with image and text */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12'>
            <img
              src={imageUrl}
              alt={historyDetailsData.title || 'Illustration historique Akweeyo'}
              title={historyDetailsData.title}
              loading='lazy'
              className='rounded-lg shadow-lg w-full h-auto object-cover'
              onError={(e) => {
                e.target.src = '/placeholder.jpg'
              }}
            />
            <div className={`flex flex-col`}>
              {/* Main section heading */}
              <h2
                className={`text-2xl font-bold text-[#2c3159] mb-4 font-adlam ${
                  textDirection === 'rtl' ? 'text-right' : 'text-left'
                }`}
              >
                {historyDetailsData.section1?.heading}
              </h2>
              {/* Section text */}
              <p className='text-gray-600 leading-relaxed mb-4 text-justify font-adlam'>
                {historyDetailsData.section1?.text}
              </p>
            </div>
          </div>

          {/* Other paragraphs or sections */}
          <div className={`space-y-6 text-justify font-adlam`}>
            <p className='text-gray-600 leading-relaxed'>
              {historyDetailsData.section2?.text}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryDetailPage