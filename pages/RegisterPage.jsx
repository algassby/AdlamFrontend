import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const authRegisterLang = currentLang.auth?.register || {
    signUp: "Inscription",
    nameLabel: "Nom complet",
    emailLabel: "Adresse email",
    passwordLabel: "Mot de passe",
    confirmPasswordLabel: "Confirmer le mot de passe",
    signUpButton: "S'inscrire",
    hasAccount: "Vous avez déjà un compte ?",
    signInHere: "Se connecter",
    passwordMismatchError: "Les mots de passe ne correspondent pas.",
    registrationError: "Erreur lors de l'inscription.",
    loadingButton: "Inscription en cours...",
  }

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage
  const pageTitle = authRegisterLang.signUp || "Inscription"
  const pageDescription = "Créez votre compte sur Akweeyo pour accéder à nos contenus en écriture adlam et pular."
  const canonicalUrl = 'https://akweeyo.com/register'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        text: authRegisterLang.passwordMismatchError,
      })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch(
        'https://adlambackend-production-551c.up.railway.app/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        },
      )

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Inscription réussie !' })
        setIsSuccess(true)
      } else {
        setMessage({
          type: 'error',
          text: data.message || authRegisterLang.registrationError,
        })
      }
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur.' })
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
            {authRegisterLang.signUp}
          </h2>

          <form onSubmit={handleSubmit}>
            {[
              {
                id: 'name',
                type: 'text',
                label: authRegisterLang.nameLabel,
                value: name,
                onChange: setName,
                dir: textDirection,
              },
              {
                id: 'email',
                type: 'email',
                label: authRegisterLang.emailLabel,
                value: email,
                onChange: setEmail,
                dir: 'ltr',
              },
              {
                id: 'password',
                type: 'password',
                label: authRegisterLang.passwordLabel,
                value: password,
                onChange: setPassword,
                dir: 'ltr',
              },
              {
                id: 'confirmPassword',
                type: 'password',
                label: authRegisterLang.confirmPasswordLabel,
                value: confirmPassword,
                onChange: setConfirmPassword,
                dir: 'ltr',
              },
            ].map((field) => (
              <div className='mb-4' key={field.id}>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2 font-adlam'
                  htmlFor={field.id}
                >
                  {field.label}
                </label>
                <input
                  className='shadow-sm appearance-none border border-gray-300 rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition-all duration-200'
                  id={field.id}
                  type={field.type}
                  placeholder={field.label}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  dir={field.dir}
                  required
                />
              </div>
            ))}

            {message && (
              <p
                className={`text-sm text-center mb-4 font-medium p-3 rounded-xl ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {message.text}
              </p>
            )}

            <div className='flex items-center justify-center mt-6'>
              <button
                className='bg-[#2c3159] hover:bg-[#1a1e3a] text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-adlam cursor-pointer shadow-md'
                type='submit'
                disabled={isLoading || isSuccess}
              >
                {isLoading ? authRegisterLang.loadingButton : authRegisterLang.signUpButton}
              </button>
            </div>
          </form>

          <p className='mt-6 text-center text-gray-600 text-sm font-sans'>
            {authRegisterLang.hasAccount}{' '}
            <Link
              to='/login'
              className='text-[#2c3159] hover:underline font-bold font-adlam ml-1'
            >
              {authRegisterLang.signInHere}
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default RegisterPage