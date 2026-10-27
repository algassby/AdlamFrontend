import React from 'react'
import { MessageCircle, Trash } from 'lucide-react'
import { useAuth } from '../src/providers/AuthProvider'
import { useLanguage } from '../src/providers/LanguageProvider'

// Fonction utilitaire pour obtenir la locale Adlam / multilingue
const getLocale = (lang) => {
  if (lang === 'adlam') return 'ff-Adlm'
  if (lang === 'en') return 'en-US'
  return 'fr-FR'
}

// =========================================================================
// Composant pour afficher un seul commentaire (avec suppression Admin)
// =========================================================================
const CommentItem = ({
  comment,
  textDirection,
  t,
  selectedLanguage,
  onCommentDeleted,
}) => {
  const { user, token } = useAuth()
  const isAdmin = user && user.role === 'admin'
  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  // Formatage dynamique de la date selon la langue choisie
  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    getLocale(selectedLanguage),
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  )

  const handleDelete = async () => {
    if (
      !window.confirm(
        t(
          'confirmDelete',
          'Êtes-vous sûr de vouloir supprimer ce commentaire ?'
        )
      )
    ) {
      return
    }

    try {
      const response = await fetch(
        `https://adlambackend-production-551c.up.railway.app/api/comments/${comment.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        onCommentDeleted(comment.id)
      } else {
        const data = await response.json()
        alert(
          t('deleteError', 'Erreur lors de la suppression :') +
            ' ' +
            (data.error || data.message || response.statusText)
        )
      }
    } catch (error) {
      console.error('Erreur de connexion DELETE :', error)
      alert(
        t(
          'deleteConnectionError',
          'Erreur de connexion au serveur lors de la suppression.'
        )
      )
    }
  }

  const authorName = comment.author?.name || 'Anonyme'
  const authorInitial = authorName.charAt(0).toUpperCase()

  return (
    <div
      className='flex items-start gap-4 p-4 border-b border-gray-100 last:border-b-0'
      style={{ direction: textDirection }}
      lang={currentLangCode}
    >
      {/* Icône / Avatar de l'utilisateur */}
      <div className='flex-shrink-0 w-10 h-10 bg-[#2c3159] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm'>
        {authorInitial}
      </div>

      {/* Contenu du commentaire */}
      <div className='flex-1 min-w-0'>
        <div className='flex justify-between items-center gap-2 mb-1'>
          <p className='text-sm font-semibold text-gray-900 truncate'>
            {authorName}
          </p>
          <div className='flex items-center gap-2'>
            <p className='text-xs text-gray-500 flex-shrink-0'>
              {formattedDate}
            </p>
            {/* Bouton de suppression réservé aux administrateurs */}
            {isAdmin && (
              <button
                onClick={handleDelete}
                className='text-red-500 hover:text-red-700 transition duration-150 p-1 rounded-full hover:bg-red-50'
                title={t('deleteButtonTitle', 'Supprimer ce commentaire')}
                aria-label={t('deleteButtonTitle', 'Supprimer ce commentaire')}
              >
                <Trash size={14} />
              </button>
            )}
          </div>
        </div>
        <p className='text-gray-700 text-sm leading-relaxed whitespace-pre-wrap'>
          {comment.content}
        </p>
      </div>
    </div>
  )
}

// =========================================================================
// Composant principal pour la liste des commentaires
// =========================================================================
const CommentsList = ({ comments, setComments }) => {
  const { textDirection, translations, selectedLanguage } = useLanguage()
  const commentsLang = translations[selectedLanguage]?.commentsList || {}
  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  const t = (key, fallback) => commentsLang[key] || fallback

  const handleCommentDeleted = (deletedCommentId) => {
    if (setComments) {
      setComments((prevComments) =>
        prevComments.filter((c) => c.id !== deletedCommentId)
      )
    }
  }

  if (!comments || comments.length === 0) {
    return (
      <div
        className='p-6 bg-white rounded-lg shadow-sm border border-gray-100 text-center text-gray-500 mt-6'
        style={{ direction: textDirection }}
        lang={currentLangCode}
      >
        <MessageCircle className='mx-auto mb-3 text-gray-400' size={32} />
        <p className='text-base font-medium'>
          {t('none', 'Soyez le premier à commenter cet article !')}
        </p>
      </div>
    )
  }

  return (
    <div
      className='bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100 mt-6'
      style={{ direction: textDirection }}
      lang={currentLangCode}
    >
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          textDirection={textDirection}
          t={t}
          selectedLanguage={selectedLanguage}
          onCommentDeleted={handleCommentDeleted}
        />
      ))}
    </div>
  )
}

export default CommentsList