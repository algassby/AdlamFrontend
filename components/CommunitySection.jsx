import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'

// URL ou chemin de l'image de la communauté (idéalement l'URL publique de votre stockage Cloud Foundry)
const communityImage = '/images/communaute.jpg'

const CommunitySection = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const communityData = currentLang.community || {
    title: 'Communauté',
    description: 'Découvrez notre communauté...',
    button: 'En savoir plus',
  }

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  // Détermine l'alignement du texte en fonction de la direction
  const textAlignment =
    textDirection === 'rtl'
      ? 'text-right md:text-right'
      : 'text-left md:text-left'

  const titleText = communityData.title || 'Communauté Akweeyo'

  return (
    <section
      className='bg-white py-16 font-sans'
      style={{ direction: textDirection }}
      lang={currentLangCode}
    >
      <div className='container mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
        {/* Section de l'image optimisée pour le SEO */}
        <div className='relative p-4 md:p-8 flex justify-center'>
          <div className='absolute top-0 left-0 w-[90%] h-[90%] hidden md:block'></div>
          <img
            src={communityImage}
            alt={`${titleText} - Illustration de la communauté Akweeyo en adlam et pular`}
            title={titleText}
            loading='lazy'
            className='w-full max-w-md h-auto object-cover rounded-lg shadow-lg transform md:translate-x-4 md:-translate-y-4'
            onError={(e) => {
              e.target.src = '/placeholder.jpg'
            }}
          />
        </div>

        {/* Section du texte */}
        <div
          className={`flex flex-col items-center md:items-start text-center md:text-left ${textAlignment}`}
        >
          <h2 className={`text-3xl font-bold text-[#2c3159] mb-4 font-adlam`}>
            {communityData.title}
          </h2>
          <p className={`text-gray-600 mb-8 leading-relaxed font-adlam`}>
            {communityData.description}
          </p>
          <Link to='/community' aria-label={communityData.button}>
            <button className='bg-[#2c3159] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#1a1e3a] transition duration-300 font-adlam cursor-pointer'>
              <span>{communityData.button}</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection