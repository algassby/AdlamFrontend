import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../src/providers/LanguageProvider'
import { useAuth } from '../src/providers/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ConnexionPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useAuth()
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const authLoginLang = currentLang.auth?.login || {
    signIn: 'Connexion',
    emailLabel: 'Adresse email',
    emailPlaceholder: 'votre@email.com',
    passwordLabel: 'Mot de passe',
    passwordPlaceholder: '••••••••',
    signInButton: 'Se connecter',
    loadingButton: 'Connexion en cours...',
    noAccount: "Vous n'avez pas de compte ?",
    signUpHere: "S'inscrire",
  }

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage
  const pageTitle = authLoginLang.signIn || 'Connexion'
  const pageDescription = 'Connectez-vous à votre compte Akweeyo pour accéder à vos espaces personnalisés.'
  const canonicalUrl = 'https://akweeyo.com/login'

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) {
      navigate('/')
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
            {authLoginLang.signIn}
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Champ email */}
            <div className='mb-4'>
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

            {/* Champ mot de passe */}
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2 font-adlam'
                htmlFor='password'
              >
                {authLoginLang.passwordLabel}
              </label>
              <input
                className='shadow-sm appearance-none border border-gray-300 rounded-xl w-full py-3 px-4 text-gray-700 mb-2 leading-tight focus:outline-none focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition-all duration-200'
                id='password'
                type='password'
                placeholder={authLoginLang.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir='ltr'
                required
              />

              {/* Lien mot de passe oublié */}
              <div className='flex justify-end'>
                <Link
                  to='/forgot-password'
                  className='text-sm text-[#2c3159] hover:underline font-adlam'
                >
                  𞤴𞤫𞤶𞤼𞤮𞤲𞤺𞤭𞤲𞤣𞤫 𞤲𞤣𞤫𞤲 (Mot de passe oublié)
                </Link>
              </div>
            </div>

            {/* Affichage du message d'erreur */}
            {error && (
              <p className='text-red-500 text-sm text-center mb-4 font-medium bg-red-50 p-3 rounded-xl'>
                {error}
              </p>
            )}

            <div className='flex items-center justify-center'>
              <button
                className='bg-[#2c3159] hover:bg-[#1a1e3a] text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-adlam cursor-pointer shadow-md'
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? authLoginLang.loadingButton : authLoginLang.signInButton}
              </button>
            </div>
          </form>

          {/* Lien vers la page d'inscription */}
          <p className='mt-6 text-center text-gray-600 text-sm font-sans'>
            {authLoginLang.noAccount}{' '}
            <Link
              to='/register'
              className='text-[#2c3159] hover:underline font-bold font-adlam ml-1'
            >
              {authLoginLang.signUpHere}
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default ConnexionPage