import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'

const HistorySection = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const historyData = currentLang.history || {
    title: 'Histoire',
    description: "Découvrez l'histoire de notre alphabet...",
    button: 'En savoir plus',
    imageAlt: "Illustration de l'histoire et de l'alphabet Adlam",
  }

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage
  const imageUrl = '/images/frère.jpeg' // Mettez l'URL complète si l'image est sur Cloud Foundry

  // Détermine l'alignement du texte en fonction de la direction
  const textAlignClass = textDirection === 'rtl' ? 'text-right' : 'text-left'
  const titleText = historyData.title || 'Histoire Akweeyo'

  return (
    <section
      className='bg-white py-16 font-sans'
      style={{ direction: textDirection }}
      lang={currentLangCode}
    >
      <div className='container mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
        
        {/* Colonne de l'image optimisée pour le SEO (Google Images) */}
        <div className='flex justify-center items-center'>
          <img
            src={imageUrl}
            alt={`${titleText} - ${historyData.imageAlt || 'Illustration historique et alphabet adlam'}`}
            title={titleText}
            loading='lazy'
            className='h-96 w-96 rounded-lg object-contain shadow-md'
            onError={(e) => {
              e.target.src = '/placeholder.jpg'
            }}
          />
        </div>

        {/* Colonne de droite : Historique et description */}
        <div className={`flex flex-col items-start ${textAlignClass}`}>
          <h2 className={`text-3xl font-bold text-[#2c3159] mb-4 font-adlam`}>
            {historyData.title}
          </h2>
          
          <p
            className={`text-gray-600 mb-8 leading-relaxed font-adlam ${textAlignClass}`}
          >
            {historyData.description}
          </p>

          <Link
            to='/history-details'
            className='bg-[#2c3159] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#1a1e3a] transition duration-300 font-adlam cursor-pointer'
            style={{ direction: textDirection }}
            aria-label={historyData.button}
          >
            <span>{historyData.button}</span>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default HistorySection