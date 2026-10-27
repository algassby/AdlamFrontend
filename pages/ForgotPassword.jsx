import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const authLoginLang = currentLang.auth?.login || {
    emailLabel: 'Adresse email',
    emailPlaceholder: 'votre@email.com',
  }

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage
  const pageTitle = 'Mot de passe oublié'
  const pageDescription = 'Réinitialisez votre mot de passe pour accéder à votre compte Akweeyo.'
  const canonicalUrl = 'https://akweeyo.com/forgot-password'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      await axios.post(
        `https://adlambackend-production-551c.up.railway.app/api/auth/forgot-password`,
        { email },
      )
      setMessage(
        'Un lien de réinitialisation a été envoyé à votre adresse e-mail.',
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* --- INJECTION SEO & MÉTADONNÉES --- */}
      <Helmet>
        <html lang={currentLangCode} />
        <title>{pageTitle} | Akweeyo</title>
        <meta name='description' content={pageDescription} />
        <link rel='canonical' href={canonicalUrl} />

        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:url' content={canonicalUrl} />
        <meta property='og:type' content='website' />
      </Helmet>

      {/* --- CONTENU DE LA PAGE --- */}
      <div
        className='flex flex-col items-center justify-center p-8 bg-gray-50 min-h-screen pt-40 md:pt-32 font-sans'
        style={{ direction: textDirection }}
        lang={currentLangCode}
      >
        <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100'>
          <h2 className='text-3xl font-bold text-center mb-6 text-[#2c3159] font-adlam'>
            𞤸𞤫𞤩𞤼𞤵𞤺𞤮𞤤 𞤼𞤮𞤲𞤺𞤭𞤪𞤣𞤫 𞤲𞤣𞤫𞤲
          </h2>

          {message ? (
            <div className='text-center'>
              <p className='text-green-600 mb-6 font-medium bg-green-50 p-4 rounded-xl'>{message}</p>
              <Link
                to='/login'
                className='text-[#2c3159] hover:underline font-bold font-adlam'
              >
                𞤒𞤭𞤤𞤼𞤢𞤺𞤮𞤤 𞤳𞤢 𞤯𞤫𞤪𞤮𞤤 𞤧𞤮𞤯𞤢𞤲𞤣𞤫 (Retour à la connexion)
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className='text-gray-600 mb-6 text-center font-adlam text-sm leading-relaxed'>
                𞤏𞤢𞤯𞤫𞥅 𞤲𞤭𞤤𞤼𞤭𞥅𞤧𞤵 𞤥𞤮𞥅𞤯𞤮𞤲 𞤲𞤺𞤵𞤲 𞤬𞤭𞥅 𞤸𞤫𞤲𞤣𞤢𞤺𞤮𞤤 𞤶𞤮𞤤𞤳𞤵 𞤸𞤫𞥅𞤯𞤭𞤲𞤼𞤭𞤲𞤢𞤲𞤣𞤫
              </p>

              <div className='mb-6'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2 font-adlam'
                  htmlFor='email'
                >
                  {authLoginLang.emailLabel}
                </label>
                <input
                  className='shadow-sm appearance-none border border-gray-300 rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition-all duration-200'
                  id='email'
                  type='email'
                  placeholder={authLoginLang.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  dir='ltr'
                  required
                />
              </div>

              {error && (
                <p className='text-red-500 text-sm text-center mb-4 font-medium bg-red-50 p-3 rounded-xl'>{error}</p>
              )}

              <div className='flex items-center justify-center'>
                <button
                  className='bg-[#2c3159] hover:bg-[#1a1e3a] text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-adlam cursor-pointer shadow-md'
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
                </button>
              </div>

              <div className='mt-6 text-center'>
                <Link
                  to='/login'
                  className='text-sm text-[#2c3159] hover:underline font-adlam font-semibold'
                >
                  𞤒𞤭𞤤𞤼𞤢𞤺𞤮𞤤 𞤳𞤢 𞤯𞤫𞤪𞤮𞤤 𞤧𞤮𞤯𞤢𞤲𞤣𞤫
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default ForgotPassword