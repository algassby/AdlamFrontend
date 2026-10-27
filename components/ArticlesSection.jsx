import React, { useState, useEffect } from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'

const ArticlesSection = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const articlesData = currentLang.articlesSection || {
    title: 'Articles',
    readMoreButton: 'Lire la suite',
    viewAllButton: 'Voir tous les articles',
  }

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          'https://adlambackend-production-551c.up.railway.app/api/articles'
        )
        if (!response.ok) {
          throw new Error('Erreur de réseau ou de serveur.')
        }
        const data = await response.json()

        const sortedArticles = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        const latestArticles = sortedArticles.slice(0, 3)
        setArticles(latestArticles)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [selectedLanguage])

  const getArticleTitle = (article) => {
    switch (selectedLanguage) {
      case 'adlam':
        return article.title_adlam || article.title_french
      case 'fr':
        return article.title_french
      case 'en':
        return article.title_english
      default:
        return article.title_french
    }
  }

  const getArticleContent = (article) => {
    switch (selectedLanguage) {
      case 'adlam':
        return article.content_adlam || article.content_french
      case 'fr':
        return article.content_french
      case 'en':
        return article.content_english
      default:
        return article.content_french
    }
  }

  // === FONCTION SÉCURISÉE : EXTRAIRE TEXTE SANS HTML (Évite XSS) ===
  const stripHtml = (html) => {
    if (!html) return ''
    return html.replace(/<[^>]*>?/gm, '').trim()
  }

  // === EXTRAIT PROPRE (100 caractères) ===
  const getCleanExcerpt = (article) => {
    const fullText = getArticleContent(article)
    const plainText = stripHtml(fullText)
    return plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText
  }

  const currentLangCode =
    selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  if (loading) {
    return <div className='text-center py-16'>Chargement des articles...</div>
  }

  if (error) {
    return (
      <div className='text-center py-16 text-red-500'>Erreur : {error}</div>
    )
  }

  if (articles.length === 0) {
    return (
      <section className='bg-gray-100 py-16 font-sans'>
        <div className='container mx-auto px-4 max-w-7xl text-center'>
          <h2 className='text-4xl font-bold text-[#2c3159] mb-12'>
            {articlesData.title}
          </h2>
          <p className='text-gray-600'>Aucun article trouvé.</p>
        </div>
      </section>
    )
  }

  return (
    <section className='bg-gray-100 py-16 font-sans'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Titre de la section avec la langue adaptée */}
        <h2
          className='text-4xl font-bold text-center text-[#2c3159] mb-12'
          style={{ direction: textDirection }}
          lang={currentLangCode}
        >
          {articlesData.title}
        </h2>

        {/* Grille des articles */}
        <div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          style={{ direction: textDirection }}
        >
          {articles.map((article) => {
            const title = getArticleTitle(article)
            // Combine le titre adlam et français dans l'attribut alt pour maximiser le référencement de l'image
            const altText = `${article.title_adlam || ''} - ${article.title_french || ''}`.trim()

            return (
              <article
                key={article.id}
                className='bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col justify-between'
                lang={currentLangCode}
              >
                <div>
                  <img
                    src={article.coverImageUrl}
                    alt={altText || `Illustration article ${article.id}`}
                    title={title}
                    loading='lazy'
                    className='w-full h-48 object-cover'
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg'
                    }}
                  />
                  <div className='p-6 text-center'>
                    <h3 className='text-xl font-bold text-[#2c3159] mb-2 line-clamp-2'>
                      {title}
                    </h3>
                    <p
                      className='text-gray-600 mb-4 line-clamp-3 text-sm'
                      style={{ direction: textDirection }}
                    >
                      {getCleanExcerpt(article)}
                    </p>
                  </div>
                </div>

                <div className='p-6 pt-0 text-center'>
                  <Link
                    to={`/articles/${article.id}`}
                    className='bg-[#2c3159] text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-[#1a1e3a] transition duration-300 inline-block'
                  >
                    {articlesData.readMoreButton}
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {/* Bouton "Voir tous les articles" */}
        <div className='text-center mt-12'>
          <Link
            to='/all-articles'
            className='inline-block bg-[#2c3159] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#1a1e3a] transition duration-300'
          >
            {articlesData.viewAllButton}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ArticlesSection