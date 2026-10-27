import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '../src/providers/LanguageProvider'
import axios from 'axios'

const ResetPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { selectedLanguage, textDirection } = useLanguage()
  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  const pageTitle = 'Réinitialisation du mot de passe'
  const pageDescription = 'Définissez un nouveau mot de passe sécurisé pour votre compte Akweeyo.'
  const canonicalUrl = 'https://akweeyo.com/reset-password'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.')
      setIsSuccess(false)
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      await axios.post(
        `https://adlambackend-production-551c.up.railway.app/api/auth/reset-password/${token}`,
        {
          password: password,
        },
      )

      setMessage('Mot de passe réinitialisé avec succès ! Redirection...')
      setIsSuccess(true)
      setTimeout(() => navigate('/login'), 3000)
    } catch (error) {
      setMessage('Le lien est invalide ou a expiré.')
      setIsSuccess(false)
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
        className='flex flex-col items-center justify-center p-8 bg-gray-50 min-h-screen pt-44 md:pt-36 font-sans'
        style={{ direction: textDirection }}
        lang={currentLangCode}
      >
        <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100'>
          <h2 className='text-2xl md:text-3xl font-bold text-center mb-6 text-[#2c3159] font-adlam'>
            𞤐𞤭𞤼𞤼𞤭𞤲𞤼𞤭𞤲'𞤣𞤫 𞤼𞤮𞤲𞤺𞤭𞤪𞤣𞤫 (Réinitialiser)
          </h2>

          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-4'
          >
            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2 font-adlam' htmlFor='password'>
                Nouveau mot de passe
              </label>
              <input
                className='shadow-sm appearance-none border border-gray-300 rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition-all duration-200'
                id='password'
                type='password'
                placeholder='Nouveau mot de passe'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir='ltr'
                required
              />
            </div>

            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2 font-adlam' htmlFor='confirmPassword'>
                Confirmer le mot de passe
              </label>
              <input
                className='shadow-sm appearance-none border border-gray-300 rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition-all duration-200'
                id='confirmPassword'
                type='password'
                placeholder='Confirmer le mot de passe'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                dir='ltr'
                required
              />
            </div>

            <button
              type='submit'
              disabled={isLoading || isSuccess}
              className='bg-[#2c3159] hover:bg-[#1a1e3a] text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-adlam cursor-pointer shadow-md mt-4'
            >
              {isLoading ? 'Mise à jour en cours...' : 'Mettre à jour'}
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-center text-sm font-medium p-3 rounded-xl ${
                isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default ResetPassword