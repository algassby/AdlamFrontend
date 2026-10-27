import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from 'react'

// --- 1. CONFIGURATION ET CONTEXTES ---

const AuthContext = createContext(null)
const LanguageContext = createContext(null)
const API_BASE_URL = 'https://adlambackend-production-551c.up.railway.app/api'

// Définition des traductions
const translations = {
  fr: {
    dashboard: {
      title: 'Tableau de bord administrateur',
      loading: 'Chargement...',
      error: 'Erreur de chargement des données.',
      articles: 'Articles',
      users: 'Utilisateurs',
      createArticle: 'Créer un article',
      logout: 'Déconnexion',
    },
    articleList: {
      title: '𞤕𞤭𞤪𞤼𞤮 𞤳𞤵𞤯𞤭',
      tableHeaders: ['𞤅𞤫𞤪𞤭𞤲𞤣𞤫', '𞤎𞤢𞤱𞤲𞤵𞤯𞤮', '𞤏𞤫𞤲𞤺𞤫𞥅 𞤳𞤵𞤯𞤮𞤤 𞤲𞤺𞤮𞤤', '𞤚𞤮𞤲𞥋𞤣𞤭𞤪𞤫'],
      loading: 'Chargement des articles...',
      noArticles: 'Aucun article trouvé.',
      editButton: '𞤏𞤀𞤴𞤤𞤵',
      deleteButton: '𞤃𞤮𞤲𞤼𞤵',
      deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cet article ?',
      deleteSuccess: 'Article supprimé avec succès.',
      deleteError: "Erreur lors de la suppression de l'article.",
      updateSuccess: 'Article mis à jour avec succès.',
      page: 'Page',
      searchPlaceholder: '𞤏𞤭𞤯𞤮𞤪𞤣𞤫 (Rechercher...)',
    },
    createArticle: {
      title: 'Créer un nouvel article',
      successMessage: 'Article créé avec succès.',
      errorMessage: "Erreur lors de la création de l'article.",
      networkError: 'Erreur de connexion au serveur.',
      createButton: 'Créer',
    },
    editArticle: {
      title: "Modifier l'article",
      successMessage: 'Article mis à jour avec succès.',
      errorMessage: "Erreur lors de la mise à jour de l'article.",
      updateButton: 'Mettre à jour',
      uploadNewImage: 'Télécharger une nouvelle image',
      uploading: 'Téléchargement en cours...',
      uploadSuccess: 'Image téléchargée avec succès.',
      uploadError: "Erreur lors du téléchargement de l'image.",
      currentImage: 'Image actuelle :',
    },
    userList: {
      title: 'Liste des utilisateurs',
      tableHeaders: ['Nom', 'Email', 'Rôle', 'Actions'],
      loading: 'Chargement des utilisateurs...',
      noUsers: 'Aucun utilisateur trouvé.',
      editButton: 'Modifier',
      deleteButton: 'Supprimer',
      deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      deleteSuccess: 'Utilisateur supprimé avec succès.',
      deleteError: "Erreur lors de la suppression de l'utilisateur.",
    },
    modal: {
      closeButton: 'Fermer',
    },
    titles: {
      adlam: 'Titre (Adlam)',
      french: 'Titre (Français)',
      english: 'Titre (Anglais)',
      content: {
        adlam: 'Contenu (Adlam)',
        french: 'Contenu (Français)',
        english: 'Contenu (Anglais)',
      },
      imageUrl: "URL de l'image de couverture",
    },
  },
}

// Fournisseur du contexte d'authentification
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  )
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch (e) {
      console.error(
        'Erreur lors du parsing des données utilisateur depuis localStorage',
        e
      )
      return null
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }

    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [user, token])

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) {
        const errData = await response.json()
        throw new Error(
          errData.message ||
            'Échec de la connexion. Veuillez vérifier vos informations.'
        )
      }
      const data = await response.json()
      setToken(data.token)
      setUser(data.user)
      setIsAuthenticated(true)
      return true
    } catch (err) {
      setError(err.message)
      setIsAuthenticated(false)
      setUser(null)
      setToken(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const value = {
    isAuthenticated,
    user,
    isLoading,
    error,
    token,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Fournisseur du contexte de langue
const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('adlam')
  const textDirection = selectedLanguage === 'adlam' ? 'rtl' : 'ltr'

  const value = {
    translations,
    selectedLanguage,
    setSelectedLanguage,
    textDirection,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)
const useLanguage = () => useContext(LanguageContext)

// --- 2. MODALS ET COMPOSANTS UTILITAIRES ---

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  const { textDirection } = useLanguage()
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50'>
      <div
        className='relative bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center'
        style={{ direction: textDirection }}
      >
        <p className='text-lg font-semibold mb-4 text-gray-800'>{message}</p>
        <div className='flex justify-center gap-4'>
          <button
            onClick={onCancel}
            className='bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-opacity-80 transition-all duration-300 cursor-pointer'
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className='bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition-all duration-300 cursor-pointer'
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  )
}

const EditArticleModal = ({ article, onClose, onUpdate }) => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const { token } = useAuth()
  const currentLang = translations[selectedLanguage]?.editArticle || {}
  const commonLang = translations[selectedLanguage]?.modal || {}
  const titleLang = translations[selectedLanguage]?.titles || {}

  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    title_adlam: article?.title_adlam || '',
    title_french: article?.title_french || '',
    title_english: article?.title_english || '',
    content_adlam: article?.content_adlam || '',
    content_french: article?.content_french || '',
    content_english: article?.content_english || '',
    coverImageUrl: article?.coverImageUrl || '',
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(selectedFile)
    setPreviewUrl(url)
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [selectedFile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const uploadImage = async () => {
    if (!selectedFile) return null

    setUploadingImage(true)
    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
      if (!response.ok) {
        throw new Error(currentLang.uploadError || "Erreur d'upload")
      }
      const data = await response.json()
      return data.imageUrl
    } catch (error) {
      console.error(error)
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let newImageUrl = form.coverImageUrl

    if (selectedFile) {
      newImageUrl = await uploadImage()
      if (!newImageUrl) {
        onUpdate({ type: 'error', text: currentLang.uploadError || "Erreur d'upload" })
        setLoading(false)
        onClose()
        return
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/articles/${article.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, coverImageUrl: newImageUrl }),
      })

      const data = await response.json()
      if (response.ok) {
        onUpdate({ type: 'success', text: currentLang.successMessage || 'Mis à jour avec succès' })
      } else {
        onUpdate({
          type: 'error',
          text: data.message || currentLang.errorMessage || 'Erreur',
        })
      }
    } catch (error) {
      onUpdate({ type: 'error', text: currentLang.errorMessage || 'Erreur réseau' })
    } finally {
      setLoading(false)
      onClose()
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-10 pb-10 bg-gray-500 bg-opacity-50'>
      <div
        className='relative bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl'
        style={{ direction: textDirection }}
        lang={currentLangCode}
      >
        <h2 className='text-2xl font-bold mb-4 text-[#2c3159] font-adlam'>{currentLang.title || "Modifier l'article"}</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 font-adlam'>
              {titleLang.adlam || 'Titre Adlam'}
            </label>
            <input
              type='text'
              name='title_adlam'
              value={form.title_adlam}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-xl'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              {titleLang.french || 'Titre Français'}
            </label>
            <input
              type='text'
              name='title_french'
              value={form.title_french}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-xl'
              dir='ltr'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              {titleLang.english || 'Titre Anglais'}
            </label>
            <input
              type='text'
              name='title_english'
              value={form.title_english}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-xl'
              dir='ltr'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 font-adlam'>
              {titleLang.content?.adlam || 'Contenu Adlam'}
            </label>
            <textarea
              name='content_adlam'
              value={form.content_adlam}
              onChange={handleChange}
              rows='5'
              className='w-full mt-1 p-2 border rounded-xl font-adlam'
            ></textarea>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              {titleLang.content?.french || 'Contenu Français'}
            </label>
            <textarea
              name='content_french'
              value={form.content_french}
              onChange={handleChange}
              rows='5'
              className='w-full mt-1 p-2 border rounded-xl'
              dir='ltr'
            ></textarea>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              {titleLang.content?.english || 'Contenu Anglais'}
            </label>
            <textarea
              name='content_english'
              value={form.content_english}
              onChange={handleChange}
              rows='5'
              className='w-full mt-1 p-2 border rounded-xl'
              dir='ltr'
            ></textarea>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2 font-adlam'>
              {currentLang.currentImage || 'Image actuelle :'}
            </label>
            {(previewUrl || form.coverImageUrl) && (
              <img
                src={previewUrl || form.coverImageUrl}
                alt='Aperçu couverture'
                className='w-full h-auto rounded-xl shadow-md mb-4 object-cover max-h-48'
              />
            )}
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              className='hidden'
              accept='image/*'
            />
            <button
              type='button'
              onClick={handleButtonClick}
              disabled={uploadingImage}
              className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300 cursor-pointer'
            >
              {uploadingImage
                ? currentLang.uploading || 'Téléchargement...'
                : currentLang.uploadNewImage || 'Télécharger une nouvelle image'}
            </button>
          </div>
          <div className='flex justify-end gap-4 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full cursor-pointer'
            >
              {commonLang.closeButton || 'Fermer'}
            </button>
            <button
              type='submit'
              disabled={loading || uploadingImage}
              className='bg-[#2c3159] text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300 cursor-pointer disabled:opacity-50'
            >
              {loading ? 'Mise à jour...' : currentLang.updateButton || 'Mettre à jour'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// --- 3. COMPOSANT PRINCIPAL (ArticleList) AVEC RECHERCHE ---

const ArticleList = () => {
  const { token } = useAuth()
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage]?.articleList || {}

  const [allArticles, setAllArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage] = useState(15)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [articleToDeleteId, setArticleToDeleteId] = useState(null)
  const [message, setMessage] = useState(null)

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  const fetchArticles = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/articles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des articles.')
      }

      const data = await response.json()
      const formattedArticles = data.map((article) => ({
        ...article,
        displayTitle:
          article[`title_${selectedLanguage}`] ||
          article.title_french ||
          article.title_english,
      }))
      setAllArticles(formattedArticles)
    } catch (err) {
      console.error("Erreur de l'API :", err)
      setError('Erreur de connexion au serveur.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setCurrentPage(1)

    if (searchTerm.trim() === '') {
      setFilteredArticles(allArticles)
      return
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase()
    const filtered = allArticles.filter((article) => {
      const titleAdlam = article.title_adlam?.toLowerCase() || ''
      const titleFrench = article.title_french?.toLowerCase() || ''
      const titleEnglish = article.title_english?.toLowerCase() || ''
      return (
        titleAdlam.includes(lowercasedSearchTerm) ||
        titleFrench.includes(lowercasedSearchTerm) ||
        titleEnglish.includes(lowercasedSearchTerm)
      )
    })
    setFilteredArticles(filtered)
  }, [searchTerm, allArticles])

  useEffect(() => {
    if (token) {
      fetchArticles()
    }
  }, [token, selectedLanguage])

  const handleDelete = (articleId) => {
    setArticleToDeleteId(articleId)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    setIsConfirmModalOpen(false)
    setMessage(null)
    try {
      const response = await fetch(
        `${API_BASE_URL}/articles/${articleToDeleteId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || currentLang.deleteError)
      }

      setAllArticles((prevArticles) =>
        prevArticles.filter((a) => a.id !== articleToDeleteId)
      )
      setMessage({ type: 'success', text: currentLang.deleteSuccess || 'Supprimé avec succès' })
    } catch (err) {
      console.error("Erreur de l'API :", err)
      setMessage({
        type: 'error',
        text: err.message || currentLang.deleteError || 'Erreur lors de la suppression',
      })
    } finally {
      setArticleToDeleteId(null)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleEdit = (article) => {
    setCurrentArticle(article)
    setIsEditModalOpen(true)
  }

  const handleArticleUpdate = (msg) => {
    setMessage(msg)
    setIsEditModalOpen(false)
    fetchArticles()
    setTimeout(() => setMessage(null), 3000)
  }

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const articlesToDisplay = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) return <p className='text-center py-4'>{currentLang.loading || 'Chargement...'}</p>
  if (error) return <p className='text-red-600 text-center py-4'>{error}</p>

  return (
    <div
      className='bg-white p-6 rounded-2xl shadow-lg font-sans'
      style={{ direction: textDirection }}
      lang={currentLangCode}
    >
      <h2 className='text-2xl font-bold text-[#2c3159] mb-6 font-adlam'>
        {currentLang.title || '𞤕𞤭𞤪𞤼𞤮 𞤳𞤵𞤯𞤭'}
      </h2>

      {message && (
        <div
          className={`p-3 mb-4 rounded-xl font-bold ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Barre de recherche */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder={currentLang.searchPlaceholder || 'Rechercher...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full p-3 border border-gray-300 rounded-xl focus:ring-[#2c3159] focus:border-[#2c3159] transition-all duration-300 font-adlam'
          dir={textDirection}
        />
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white rounded-xl shadow-md overflow-hidden'>
          <thead className='bg-gray-200'>
            <tr>
              {currentLang.tableHeaders && currentLang.tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className='py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-adlam'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articlesToDisplay.length > 0 ? (
              articlesToDisplay.map((article) => (
                <tr
                  key={article.id}
                  className='border-b border-gray-200 hover:bg-gray-50'
                >
                  <td className='py-3 px-4 text-sm text-gray-800 font-medium font-adlam'>
                    {article.displayTitle}
                  </td>
                  <td className='py-3 px-4 text-sm text-gray-600'>
                    {article.author?.name || 'Auteur inconnu'}
                  </td>
                  <td className='py-3 px-4 text-sm text-gray-600'>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className='py-3 px-4 text-sm text-gray-800 flex gap-2'>
                    <button
                      onClick={() => handleEdit(article)}
                      className='bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition-colors duration-200 font-adlam cursor-pointer text-xs font-bold'
                    >
                      {currentLang.editButton || 'Modifier'}
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className='bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition-colors duration-200 font-adlam cursor-pointer text-xs font-bold'
                    >
                      {currentLang.deleteButton || 'Supprimer'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan='4'
                  className='py-6 px-4 text-center text-sm text-gray-500 font-adlam'
                >
                  {currentLang.noArticles || 'Aucun article trouvé.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 mt-6'>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`py-2 px-4 rounded-full font-bold cursor-pointer ${
                currentPage === i + 1
                  ? 'bg-[#2c3159] text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {isEditModalOpen && (
        <EditArticleModal
          article={currentArticle}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleArticleUpdate}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmModal
          message={currentLang.deleteConfirm || 'Êtes-vous sûr ?'}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}
    </div>
  )
}

// --- 4. COMPOSANT RACINE (App) ---

const App = () => (
  <LanguageProvider>
    <AuthProvider>
      <div className='p-8 bg-gray-100 min-h-screen font-sans antialiased'>
        <ArticleList />
      </div>
    </AuthProvider>
  </LanguageProvider>
)

export default App