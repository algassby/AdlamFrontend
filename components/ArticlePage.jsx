import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../src/providers/LanguageProvider'

import CommentForm from '../components/CommentForm'
import CommentsList from '../components/CommentsList'

const ArticlePage = () => {
  const { id } = useParams()
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const pageLang = translations[selectedLanguage]?.articlePage || {}

  const [article, setArticle] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const t = (key, fallback) => pageLang[key] || fallback

  const getLocale = (lang) => {
    if (lang === 'adlam') return 'ff-Adlm'
    if (lang === 'en') return 'en-US'
    return 'fr-FR'
  }

  useEffect(() => {
    const fetchArticleAndComments = async () => {
      try {
        const articleResponse = await fetch(
          `https://adlambackend-production-551c.up.railway.app/api/articles/${id}`
        )
        if (!articleResponse.ok) {
          throw new Error(
            t('errorNotFound', 'Erreur de réseau ou article non trouvé.')
          )
        }
        const articleData = await articleResponse.json()
        setArticle(articleData)

        const commentsResponse = await fetch(
          `https://adlambackend-production-551c.up.railway.app/api/articles/${id}/comments`
        )
        if (!commentsResponse.ok) {
          console.error('Erreur lors de la récupération des commentaires.')
          setComments([])
        } else {
          const commentsData = await commentsResponse.json()
          setComments(commentsData)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchArticleAndComments()
    }
  }, [id, selectedLanguage])

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment])
  }

  if (loading) {
    return (
      <div className='text-center py-16'>
        {t('loading', "Chargement de l'article...")}
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-center py-16 text-red-500'>
        {t('errorPrefix', 'Erreur')} : {error}
      </div>
    )
  }

  if (!article) {
    return (
      <div className='text-center py-16'>
        {t('notFound', 'Article non trouvé.')}
      </div>
    )
  }

  const getTitle = () => {
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

  const getContent = () => {
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

  // Nettoyage du HTML pour extraire la meta-description (160 caractères max)
  const stripHtml = (html) => {
    if (!html) return ''
    return html.replace(/<[^>]*>?/gm, '').trim()
  }

  const articleTitle = getTitle() || 'Akweeyo'
  const articleContent = getContent() || ''
  const cleanDescription =
    stripHtml(articleContent).slice(0, 160) || 'Article sur Akweeyo'
  const currentLangCode =
    selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage
  const canonicalUrl = `https://akweeyo.com/articles/${id}`
  const imageUrl = article.coverImageUrl || 'https://akweeyo.com/placeholder.jpg'

  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    getLocale(selectedLanguage),
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  return (
    <div className='font-sans pt-16' style={{ direction: textDirection }}>
      {/* --- INJECTION SEO DYNAMIQUE DANS LE <HEAD> --- */}
      <Helmet>
        {/* Langue de la page */}
        <html lang={currentLangCode} />

        {/* Titre et description */}
        <title>{articleTitle} | Akweeyo</title>
        <meta name='description' content={cleanDescription} />

        {/* Méta-étiquettes d'indexation */}
        <link rel='canonical' href={canonicalUrl} />

        {/* Balises hreflang pour le référencement multilingue */}
        <link rel='alternate' hrefLang='ff-Adlm' href={canonicalUrl} />
        <link rel='alternate' hrefLang='fr' href={canonicalUrl} />
        <link rel='alternate' hrefLang='en' href={canonicalUrl} />
        <link rel='alternate' hrefLang='x-default' href={canonicalUrl} />

        {/* Open Graph (WhatsApp, Facebook, LinkedIn, Telegram) */}
        <meta property='og:title' content={articleTitle} />
        <meta property='og:description' content={cleanDescription} />
        <meta property='og:image' content={imageUrl} />
        <meta property='og:url' content={canonicalUrl} />
        <meta property='og:type' content='article' />
        <meta property='og:locale' content={getLocale(selectedLanguage)} />

        {/* Données structurées JSON-LD (Schema.org) pour Google Images & Articles */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: articleTitle,
            description: cleanDescription,
            image: [imageUrl],
            datePublished: article.createdAt,
            dateModified: article.updatedAt || article.createdAt,
            inLanguage: currentLangCode,
            author: {
              '@type': 'Person',
              name: article.author?.name || 'Akweeyo',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Akweeyo',
              logo: {
                '@type': 'ImageObject',
                url: 'https://akweeyo.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl,
            },
          })}
        </script>
      </Helmet>

      {/* Section Hero avec l'image de couverture */}
      <div
        className='relative h-96 w-full bg-cover bg-center'
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white'>
          <h1 className='text-3xl md:text-5xl font-bold mb-4'>{articleTitle}</h1>
          <p className='text-xl md:text-2xl font-semibold'>
            {t('by', 'Par')} {article.author?.name || 'Akweeyo'} {t('on', 'le')}{' '}
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Contenu de l'article */}
      <div className='container mx-auto px-4 py-12 max-w-4xl'>
        <article
          className='article-content'
          style={{ direction: textDirection }}
          dangerouslySetInnerHTML={{ __html: articleContent }}
        />

        {/* --- Section des Commentaires --- */}
        <div
          className='mt-20 pt-8 border-t border-gray-200'
          id='comments-section'
        >
          <h2
            className='text-3xl font-bold mb-8 text-gray-900'
            style={{ direction: textDirection }}
          >
            {t('commentsTitle', '𞤁𞤫𞤱𞤼𞤢𞤲𞤯𞤫')} ({comments.length})
          </h2>
          <CommentForm articleId={id} onCommentAdded={handleCommentAdded} />
          <CommentsList comments={comments} setComments={setComments} />
        </div>
      </div>
    </div>
  )
}

export default ArticlePage