import React from 'react'
import { Facebook, Youtube, Instagram } from 'lucide-react'
import { useLanguage } from '../src/providers/LanguageProvider'

const ContactForm = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage]?.contactForm || {
    title: 'Contactez-nous',
    descriptionLine1: 'Une question, une suggestion ?',
    descriptionLine2: 'Envoyez-nous un message.',
    labelName: 'Nom',
    labelTel: 'Téléphone',
    labelEmail: 'Email',
    labelMessage: 'Message',
    buttonSubmit: 'Envoyer',
  }

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  return (
    <section
      className='bg-white py-16 font-sans'
      style={{ direction: textDirection }}
      lang={currentLangCode}
    >
      <div className='container mx-auto px-4 max-w-5xl'>
        <div className='flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden'>

          {/* Section gauche (description et réseaux sociaux) */}
          <div className='flex-1 bg-[#2c3159] text-white p-8 md:p-12 flex flex-col justify-between rounded-l-3xl'>
            <div>
              <h2 className='text-3xl font-bold mb-4 font-adlam'>{currentLang.title}</h2>
              <p className='text-gray-300 font-adlam'>{currentLang.descriptionLine1}</p>
              <br />
              <p className='text-gray-300 font-adlam'>{currentLang.descriptionLine2}</p>
            </div>

            <div className='flex justify-start mt-6 space-x-4'>
              <a
                href='https://www.facebook.com/share/1CRioYs2WX/'
                aria-label='Facebook Akweeyo'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-white transition duration-300'
              >
                <Facebook size={28} />
              </a>
              <a
                href='https://youtube.com/@akweeyo?feature=shared'
                aria-label='Youtube Akweeyo'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-white transition duration-300'
              >
                <Youtube size={28} />
              </a>
              <a
                href='https://www.instagram.com/akweeyo?igsh=MXBoZDZ5cGZ6OW9uZw=='
                aria-label='Instagram Akweeyo'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-white transition duration-300'
              >
                <Instagram size={28} />
              </a>
              <a
                href='https://www.tiktok.com/@akweeyo?_r=1&_t=ZN-911Huh5AiPu'
                aria-label='TikTok Akweeyo'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-white transition duration-300 flex items-center justify-center'
              >
                <i
                  className='fa-brands fa-tiktok'
                  style={{ fontSize: '28px' }}
                ></i>
              </a>
            </div>
          </div>

          {/* Section droite (formulaire Formspree) */}
          <div className='flex-1 p-8 md:p-12 bg-gray-50 rounded-r-3xl'>
            <form
              action='https://formspree.io/f/xgvrkwlv'
              method='POST'
            >
              {/* Champ Nom */}
              <div className='mb-6'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-2'
                  dir={textDirection}
                >
                  {currentLang.labelName}
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition duration-300'
                  dir={textDirection}
                />
              </div>

              {/* Champ Téléphone */}
              <div className='mb-6'>
                <label
                  htmlFor='tel'
                  className='block text-sm font-medium text-gray-700 mb-2'
                  dir={textDirection}
                >
                  {currentLang.labelTel}
                </label>
                <input
                  type='tel'
                  id='tel'
                  name='tel'
                  className='w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition duration-300'
                  dir='ltr'
                />
              </div>

              {/* Champ Email */}
              <div className='mb-6'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-2'
                  dir={textDirection}
                >
                  {currentLang.labelEmail}
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition duration-300'
                  dir='ltr'
                />
              </div>

              {/* Champ Message */}
              <div className='mb-6'>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-2'
                  dir={textDirection}
                >
                  {currentLang.labelMessage}
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows='4'
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition duration-300'
                  dir={textDirection}
                ></textarea>
              </div>

              {/* Bouton d'envoi */}
              <div>
                <button
                  type='submit'
                  className='bg-[#2c3159] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#1a1e3a] transition duration-300 font-adlam cursor-pointer'
                >
                  {currentLang.buttonSubmit}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactForm