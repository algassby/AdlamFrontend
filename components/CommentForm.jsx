import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../src/providers/AuthProvider'
import { useLanguage } from '../src/providers/LanguageProvider'

const CommentForm = ({ articleId, onCommentAdded }) => {
  const { isAuthenticated, token } = useAuth()
  const { textDirection, translations, selectedLanguage } = useLanguage()
  const currentLang = translations[selectedLanguage]?.commentForm || {
    errorEmpty: 'Le commentaire ne peut pas être vide.',
    errorAuthMissing: 'Vous devez être connecté.',
    errorApi: "Erreur lors de l'envoi du commentaire.",
    errorConnection: 'Erreur de connexion au serveur.',
    loginRequiredTitle: 'Connexion requise',
    loginRequiredMessage: 'Veuillez vous',
    loginLinkText: 'connecter',
    loginRequiredMessageEnd: 'pour laisser un commentaire.',
    label: 'Laisser un commentaire',
    placeholder: 'Écrivez votre commentaire ici...',
    success: 'Commentaire ajouté avec succès !',
    buttonLoading: 'Envoi en cours...',
    buttonSubmit: 'Publier le commentaire',
  }

  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const currentLangCode =
    selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    if (!content.trim()) {
      setError(currentLang.errorEmpty)
      setLoading(false)
      return
    }

    if (!token) {
      setError(currentLang.errorAuthMissing)
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        `https://adlambackend-production-551c.up.railway.app/api/articles/${articleId}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || currentLang.errorApi)
      }

      setSuccess(true)
      setContent('')
      if (onCommentAdded) {
        onCommentAdded(data.comment)
      }
    } catch (err) {
      console.error('Erreur API:', err)
      setError(err.message || currentLang.errorConnection)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div
        className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 rounded-r-lg'
        role='alert'
        style={{ direction: textDirection }}
        lang={currentLangCode}
      >
        <p className='font-bold mb-1'>{currentLang.loginRequiredTitle}</p>
        <p>
          {currentLang.loginRequiredMessage}{' '}
          <Link to='/login' className='font-semibold underline hover:text-yellow-900'>
            {currentLang.loginLinkText}
          </Link>{' '}
          {currentLang.loginRequiredMessageEnd}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mb-12 p-6 bg-gray-50 rounded-lg shadow-inner'
      style={{ direction: textDirection }}
      lang={currentLangCode}
    >
      <div className='mb-4'>
        <label
          htmlFor='comment-content'
          className='block text-lg font-medium text-gray-700 mb-2'
          style={{ textAlign: textDirection === 'rtl' ? 'right' : 'left' }}
        >
          {currentLang.label}
        </label>
        <textarea
          id='comment-content'
          rows='4'
          className='w-full p-3 border border-gray-300 rounded-md focus:ring-[#2c3159] focus:border-[#2c3159] transition'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={currentLang.placeholder}
          disabled={loading}
          dir={textDirection}
          style={{ textAlign: textDirection === 'rtl' ? 'right' : 'left' }}
        />
      </div>

      {error && (
        <p
          className='text-red-500 mb-4 font-medium'
          style={{ textAlign: textDirection === 'rtl' ? 'right' : 'left' }}
        >
          Erreur : {error}
        </p>
      )}

      {success && (
        <p
          className='text-green-600 mb-4 font-medium'
          style={{ textAlign: textDirection === 'rtl' ? 'right' : 'left' }}
        >
          {currentLang.success}
        </p>
      )}

      <button
        type='submit'
        className='bg-[#2c3159] text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-[#1a1e3a] transition duration-300 disabled:opacity-50'
        disabled={loading}
      >
        {loading ? currentLang.buttonLoading : currentLang.buttonSubmit}
      </button>
    </form>
  )
}

export default CommentForm