import React, { useRef } from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'

const NumberButton = ({ number, adlam, audioSrc }) => {
  const audioRef = useRef(null)
  const { selectedLanguage, textDirection } = useLanguage()

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0 // Réinitialise l'audio pour permettre un re-clic rapide
      audioRef.current.play().catch((err) => {
        console.error('Erreur lors de la lecture audio :', err)
      })
    }
  }

  return (
    <button
      onClick={playAudio}
      className='flex items-center justify-center p-3 md:p-4 rounded-full border border-[#2c3159] text-[#2c3159] hover:bg-[#2c3159] hover:text-white transition-colors duration-300 shadow-sm cursor-pointer group'
      style={{ direction: textDirection }}
      aria-label={`Écouter le nombre ${number}`}
    >
      <div className='flex items-center gap-3'>
        {selectedLanguage === 'adlam' ? (
          <span className='font-adlam text-lg md:text-2xl'>{adlam}</span>
        ) : (
          <span className='font-bold text-lg md:text-2xl'>{number}</span>
        )}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='22'
          height='22'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='text-[#2c3159] group-hover:text-white transition-colors duration-300 flex-shrink-0'
        >
          <path d='M11 5L6 9H2V15H6L11 19V5Z' />
          <path d='M15.54 8.46a5 5 0 0 1 0 7.07' />
          <path d='M19.07 4.93a10 10 0 0 1 0 14.14' />
        </svg>
      </div>
      <audio ref={audioRef} src={audioSrc} preload='auto' />
    </button>
  )
}

const NumbersSection = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const initiationPage = currentLang.initiationPage || {}
  const content = initiationPage.numbers || {
    title: 'Nombres en Adlam',
    list: [],
  }

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  return (
    <section
      className='py-16 bg-white text-gray-800'
      style={{ direction: textDirection }}
      lang={currentLangCode}
    >
      <div className='container mx-auto px-4 max-w-7xl'>
        <h2 className='text-3xl md:text-4xl font-extrabold mb-8 font-adlam text-center text-[#2c3159]'>
          {content.title}
        </h2>

        {content.list && content.list.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8'>
            {content.list.map((item, index) => (
              <NumberButton
                key={index}
                number={item.number}
                adlam={item.adlam}
                audioSrc={item.audio}
              />
            ))}
          </div>
        ) : (
          <p className='text-center text-gray-500 font-sans'>
            Aucun nombre disponible pour le moment.
          </p>
        )}
      </div>
    </section>
  )
}

export default NumbersSection