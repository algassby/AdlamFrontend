import React from 'react'
import { useLanguage } from '../../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const heroData = currentLang.hero || {
    title: '𞤀𞤳𞤱𞤫𞥅𞤴𞤮 - 𞤐𞤮 𞤴𞤫𞤱𞤼𞤢 𞤬𞤭𞥅 𞤨𞤫𞤰𞥆𞤭',
    description: 'Explorez la culture, les traditions et les publications en écriture adlam et pular.',
    button: '𞤐𞤢𞤼𞥆𞤵 (En savoir plus)',
  }

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage
  const heroBackgroundImage = '/images/HeroImage.jpeg'

  return (
    <div
      className='mt-40 md:mt-24 font-sans relative 
               min-h-[70vh] sm:min-h-[80vh] 
               md:h-[80vh] lg:h-[65vh] 
               bg-cover bg-center flex items-center justify-center text-center 
               p-10 md:p-16 shadow-inner'
      style={{ backgroundImage: `url('${heroBackgroundImage}')` }}
      dir={textDirection}
      lang={currentLangCode}
    >
      {/* Surcouche avec le dégradé aux couleurs de la marque */}
      <div className='absolute inset-0 bg-gradient-to-t from-[#2c3159] to-transparent opacity-85'></div>

      {/* Conteneur pour centrer le contenu du Hero */}
      <div className='relative z-10 text-white container mx-auto max-w-7xl px-4 flex flex-col items-center'>
        <div className='max-w-3xl mb-8'>
          <h1
            className='text-3xl sm:text-4xl md:text-5xl font-bold font-adlam mb-4 leading-tight'
          >
            {heroData.title}
          </h1>
          <p
            className='text-base sm:text-lg md:text-xl font-adlam mb-6 opacity-95 leading-relaxed'
          >
            {heroData.description}
          </p>
        </div>
        <Link
          to='/a-propos'
          className='flex items-center justify-center gap-3 bg-[#fff2cd] text-[#2c3159] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300 font-adlam cursor-pointer hover:scale-105'
          aria-label={heroData.button}
        >
          <span>{heroData.button}</span>
          <i className='fa-solid fa-arrow-right' aria-hidden='true'></i>
        </Link>
      </div>
    </div>
  )
}

export default HeroSection