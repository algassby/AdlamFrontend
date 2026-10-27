import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'

const Footer = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const menuItems = currentLang.header?.menu || []

  const firstMenuColumn = menuItems.slice(0, 3)
  const secondMenuColumn = menuItems.slice(3, 6)

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  // Détermine l'alignement du texte en fonction de la direction pour les écrans plus grands
  const textAlignClass =
    textDirection === 'rtl' ? 'md:text-right' : 'md:text-left'

  const descriptionText = currentLang.history?.description
    ? currentLang.history.description.substring(0, 150) + '...'
    : 'Akweeyo - Plateforme de publication en écriture adlam et pular.'

  return (
    <footer
      className='bg-[#2c3159] text-white py-12 font-sans'
      style={{ direction: textDirection }}
      lang={currentLangCode}
    >
      {/* Container avec une largeur maximale de 1200px et centré */}
      <div className='container mx-auto px-4 max-w-[1200px]'>
        <div className='flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8'>

          {/* Colonne 1: Logo et description */}
          <div className='flex flex-col items-center md:items-start text-center md:w-1/3'>
            <img
              src='/images/logo.png'
              alt='Logo Akweeyo - Denderla Sonre Ublaande'
              title='Akweeyo Logo'
              loading='lazy'
              className='w-24 h-24 mb-4 rounded-full border-2 border-white object-cover shadow-md'
            />
            <p className='text-sm text-gray-300 leading-relaxed font-adlam'>
              {descriptionText}
            </p>
          </div>

          {/* Colonne 2: Premier menu */}
          <div
            className={`flex flex-col items-center md:items-start text-center md:w-1/3`}
          >
            <h4
              className={`text-xl font-bold mb-4 text-center ${textAlignClass} font-adlam`}
            >
              𞤃𞤮𞤬𞤼𞤭
            </h4>
            <ul
              className={`space-y-2 text-center ${textAlignClass}`}
            >
              {firstMenuColumn.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className='text-gray-300 hover:text-white transition duration-300 font-adlam'
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3: Deuxième menu */}
          <div
            className={`flex flex-col items-center md:items-start text-center md:w-1/3`}
          >
            <h4
              className={`text-xl font-bold mb-4 text-center ${textAlignClass} font-adlam`}
            >
              𞤃𞤮𞤬𞤼𞤭
            </h4>
            <ul
              className={`space-y-2 text-center ${textAlignClass}`}
            >
              {secondMenuColumn.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className='text-gray-300 hover:text-white transition duration-300 font-adlam'
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ligne de séparation et texte en bas */}
        <div className='mt-8 pt-8 border-t border-gray-600 text-center'>
          <p className='text-sm text-gray-400'>
            made by <span className='font-semibold text-gray-300'>2scodes-sarl</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer