import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'

const AllArticlesPage = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const articlesPageLang = currentLang.allArticlesPage || {
    heroTitle: 'Tous les articles',
    heroSubtitle: 'Explorez nos publications en adlam et pular.',
    searchPlaceholder: '𞤏𞤭𞤯𞤮𞤪𞤣𞤫 (Rechercher...)',
  }
  const articlesData = currentLang.articlesSection || {
    readMoreButton: 'Lire la suite',
  }

  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 10
  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  // URL canonique et métadonnées SEO
  const pageTitle = articlesPageLang.heroTitle || 'Articles | Akweeyo'
  const pageDescription = articlesPageLang.heroSubtitle || 'Découvrez tous nos articles et actualités en écriture adlam et pular.'
  const canonicalUrl = 'https://akweeyo.com/articles'

  const getArticleTitle = (article) => {
    switch (selectedLanguage) {
      case 'adlam':
        return article.title_adlam
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
        return article.content_adlam
      case 'fr':
        return article.content_french
      case 'en':
        return article.content_english
      default:
        return article.content_french
    }
  }

  const stripHtml = (html) => {
    if (!html) return ''
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  const getCleanExcerpt = (article) => {
    const fullText = getArticleContent(article)
    const plainText = stripHtml(fullText)
    return plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText
  }

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
        setArticles(sortedArticles)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  useEffect(() => {
    setCurrentPage(1)

    if (searchTerm.trim() === '') {
      setFilteredArticles(articles)
      return
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase()

    const filtered = articles.filter((article) => {
      const titleAdlam = article.title_adlam?.toLowerCase() || ''
      const titleFrench = article.title_french?.toLowerCase() || ''
      const titleEnglish = article.title_english?.toLowerCase() || ''
      const authorName = article.author?.name?.toLowerCase() || ''
      return (
        titleAdlam.includes(lowercasedSearchTerm) ||
        titleFrench.includes(lowercasedSearchTerm) ||
        titleEnglish.includes(lowercasedSearchTerm) ||
        authorName.includes(lowercasedSearchTerm)
      )
    })
    setFilteredArticles(filtered)
  }, [searchTerm, articles])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  if (loading) {
    return (
      <div className='text-center py-20 text-lg font-sans' style={{ direction: textDirection }}>
        Chargement des articles...
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-center py-20 text-red-500 font-sans' style={{ direction: textDirection }}>
        Erreur : {error}
      </div>
    )
  }

  return (
    <>
      {/* --- INJECTION SEO & MÉTADONNÉES --- */}
      <Helmet>
        <html lang={currentLangCode} />
        <title>{pageTitle} | Akweeyo</title>
        <meta name='description' content={pageDescription} />

        <link rel='canonical' href={canonicalUrl} />

        {/* Open Graph pour les partages réseaux sociaux */}
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:url' content={canonicalUrl} />
        <meta property='og:type' content='website' />

        {/* Données structurées Schema.org */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: pageTitle,
            description: pageDescription,
            inLanguage: currentLangCode,
          })}
        </script>
      </Helmet>

      {/* --- CONTENU DE LA PAGE --- */}
      <div
        className='font-sans min-h-screen bg-gray-100'
        style={{ direction: textDirection }}
        lang={currentLangCode}
      >
        {/* === HERO SECTION === */}
        <section className='bg-[#2c3159] text-white py-20 px-4 text-center pt-48 md:pt-36 shadow-md'>
          <div className='container mx-auto max-w-7xl'>
            <h1 className='text-5xl md:text-6xl font-extrabold mb-4 leading-tight font-adlam'>
              {articlesPageLang.heroTitle}
            </h1>
            <p className='text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto font-adlam'>
              {articlesPageLang.heroSubtitle}
            </p>
          </div>
        </section>

        {/* === LISTE DES ARTICLES AVEC BARRE DE RECHERCHE === */}
        <section className='py-16'>
          <div className='container mx-auto px-4 max-w-7xl'>
            {/* Barre de recherche */}
            <div className='mb-10 max-w-2xl mx-auto'>
              <input
                type='text'
                placeholder={articlesPageLang.searchPlaceholder || '𞤏𞤭𞤯𞤮𞤪𞤣𞤫'}
                value={searchTerm}
                onChange={handleSearchChange}
                className='w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition duration-200 bg-white font-adlam'
                dir={textDirection}
              />
            </div>

            {filteredArticles.length === 0 && searchTerm !== '' ? (
              <p className='text-gray-600 text-center text-lg font-adlam py-10'>
                Aucun résultat trouvé pour "{searchTerm}".
              </p>
            ) : filteredArticles.length === 0 && searchTerm === '' ? (
              <p className='text-gray-600 text-center text-lg font-adlam py-10'>
                Aucun article trouvé.
              </p>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {currentArticles.map((article) => (
                  <div
                    key={article.id}
                    className='bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300 flex flex-col justify-between border border-gray-100'
                  >
                    {/* Image de couverture */}
                    <img
                      src={article.coverImageUrl || '/placeholder.jpg'}
                      alt={getArticleTitle(article) || `Image de l'article ${article.id}`}
                      title={getArticleTitle(article)}
                      loading='lazy'
                      className='w-full h-48 object-cover'
                      onError={(e) => {
                        e.target.src = '/placeholder.jpg'
                      }}
                    />

                    {/* Contenu */}
                    <div className='p-6 flex flex-col flex-grow text-center'>
                      <h3 className='text-xl font-bold text-[#2c3159] mb-3 line-clamp-2 font-adlam'>
                        {getArticleTitle(article)}
                      </h3>
                      <p
                        className='text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed font-adlam flex-grow'
                        style={{ direction: textDirection }}
                      >
                        {getCleanExcerpt(article)}
                      </p>
                      <Link
                        to={`/articles/${article.id}`}
                        className='inline-block bg-[#2c3159] text-white font-bold py-2.5 px-6 rounded-full shadow-md hover:bg-[#1a1e3a] transition duration-300 font-adlam cursor-pointer text-sm'
                        aria-label={`${articlesData.readMoreButton} : ${getArticleTitle(article)}`}
                      >
                        <span>{articlesData.readMoreButton}</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* === PAGINATION === */}
        {filteredArticles.length > articlesPerPage && (
          <div className='container mx-auto px-4 pb-16 max-w-7xl'>
            <div className='flex justify-center items-center space-x-2 flex-wrap gap-2'>
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className='bg-white text-[#2c3159] font-bold py-2 px-5 rounded-full shadow-sm hover:bg-gray-50 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-adlam cursor-pointer border border-gray-200'
              >
                𞤒𞤭𞤤𞤼𞤮 (Précédent)
              </button>

              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`px-4 py-2 rounded-full font-semibold transition cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#2c3159] text-white shadow-md'
                        : 'bg-white text-[#2c3159] hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className='bg-white text-[#2c3159] font-bold py-2 px-5 rounded-full shadow-sm hover:bg-gray-50 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-adlam cursor-pointer border border-gray-200'
              >
                𞤔𞤮𞤳𞥆𞤫𞥅 (Suivant)
              </button>
            </div>

            <p className='text-center mt-4 text-sm text-gray-500 font-adlam'>
              Page {currentPage} sur {totalPages}
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default AllArticlesPage