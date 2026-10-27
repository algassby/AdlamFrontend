import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../src/providers/AuthProvider'
import { useLanguage } from '../src/providers/LanguageProvider'
import CreateArticleForm from '../components/CreateArticleForm'
import UserList from '../components/UserList'
import ArticleList from '../components/ArticleList'

const UserProfile = () => {
  const { isAuthenticated, user, logout, token } = useAuth()
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage]?.userProfile || {
    updateProfileTitle: 'Mettre à jour mon profil',
    nameLabel: 'Nom complet',
    emailLabel: 'Adresse email',
    changePasswordTitle: 'Changer le mot de passe',
    newPasswordLabel: 'Nouveau mot de passe',
    confirmPasswordLabel: 'Confirmer le mot de passe',
    updateButton: 'Mettre à jour',
    updatingButton: 'Mise à jour...',
    createArticle: 'Créer un article',
    listArticles: 'Liste des articles',
    usersListTitle: 'Gestion des utilisateurs',
    unauthorizedMessage: 'Accès non autorisé. Veuillez vous connecter.',
    dashboardTitle: 'Tableau de bord',
    myInfo: 'Mes informations',
    allUser: 'Utilisateurs',
    logout: 'Déconnexion',
    passwordMismatchError: 'Les mots de passe ne correspondent pas.',
    successMessage: 'Profil mis à jour avec succès.',
    errorMessage: 'Erreur lors de la mise à jour.',
    networkError: 'Erreur réseau.',
  }

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage
  const pageTitle = currentLang.dashboardTitle || 'Tableau de bord'
  const pageDescription = 'Gérez votre compte, vos articles et les informations de profil sur Akweeyo.'
  const canonicalUrl = 'https://akweeyo.com/profile'

  const [activeSection, setActiveSection] = useState('my-info')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
    }
  }, [user])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setMessage('')
    setMessageType('')

    if (password !== confirmPassword) {
      setMessage(currentLang.passwordMismatchError)
      setMessageType('error')
      return
    }

    setIsUpdating(true)

    const updateData = {
      name,
      email,
      password: password || undefined,
    }

    try {
      const response = await fetch(
        'https://adlambackend-production-551c.up.railway.app/api/users/profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      )

      const result = await response.json()

      if (response.ok) {
        setMessage(result.message || currentLang.successMessage)
        setMessageType('success')
        setPassword('')
        setConfirmPassword('')
      } else {
        setMessage(result.message || currentLang.errorMessage)
        setMessageType('error')
      }
    } catch (error) {
      setMessage(currentLang.networkError)
      setMessageType('error')
      console.error('Update error:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'my-info':
        return (
          <main className='w-full md:w-3/4 bg-white rounded-2xl shadow-lg p-6'>
            <h1 className='text-2xl font-bold text-[#2c3159] mb-6 font-adlam'>
              {currentLang.updateProfileTitle}
            </h1>
            <form onSubmit={handleUpdate} className='space-y-6'>
              {message && (
                <div
                  className={`p-4 rounded-xl font-medium ${
                    messageType === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {message}
                </div>
              )}
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-1 font-adlam'
                >
                  {currentLang.nameLabel}
                </label>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50 transition-all duration-200'
                  dir={textDirection}
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-1 font-adlam'
                >
                  {currentLang.emailLabel}
                </label>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50 transition-all duration-200'
                  dir='ltr'
                />
              </div>
              <div className='pt-4'>
                <h3 className='text-lg font-bold text-[#2c3159] mb-4 font-adlam'>
                  {currentLang.changePasswordTitle}
                </h3>
                <div className='space-y-4'>
                  <div>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium text-gray-700 mb-1 font-adlam'
                    >
                      {currentLang.newPasswordLabel}
                    </label>
                    <input
                      type='password'
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50 transition-all duration-200'
                      dir='ltr'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='confirm-password'
                      className='block text-sm font-medium text-gray-700 mb-1 font-adlam'
                    >
                      {currentLang.confirmPasswordLabel}
                    </label>
                    <input
                      type='password'
                      id='confirm-password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50 transition-all duration-200'
                      dir='ltr'
                    />
                  </div>
                </div>
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='bg-[#2c3159] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 font-adlam cursor-pointer'
                  disabled={isUpdating}
                >
                  {isUpdating
                    ? currentLang.updatingButton
                    : currentLang.updateButton}
                </button>
              </div>
            </form>
          </main>
        )
      case 'create-article':
        return (
          <main className='w-full md:w-3/4 bg-white rounded-2xl shadow-lg p-6'>
            <h1 className='text-2xl font-bold text-[#2c3159] mb-6 font-adlam'>
              {currentLang.createArticle}
            </h1>
            <CreateArticleForm />
          </main>
        )
      case 'articles-list':
        return (
          <main className='w-full md:w-3/4 bg-white rounded-2xl shadow-lg p-6'>
            <h1 className='text-2xl font-bold text-[#2c3159] mb-6 font-adlam'>
              {currentLang.listArticles}
            </h1>
            <ArticleList />
          </main>
        )
      case 'users-list':
        return (
          <main className='w-full md:w-3/4 bg-white rounded-2xl shadow-lg p-6'>
            <h1 className='text-2xl font-bold text-[#2c3159] mb-6 font-adlam'>
              {currentLang.usersListTitle || '𞤕𞤭𞤪𞤼𞤮𞤤 𞤸𞤵𞥅𞤼𞤢𞤪𞤢𞤴𞤩𞤫'}
            </h1>
            <UserList />
          </main>
        )
      default:
        return null
    }
  }

  if (!isAuthenticated) {
    return (
      <div
        className='flex justify-center items-center h-screen text-lg text-gray-700 font-sans'
        style={{ direction: textDirection }}
      >
        {currentLang.unauthorizedMessage}
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

        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:url' content={canonicalUrl} />
        <meta property='og:type' content='website' />
      </Helmet>

      {/* --- CONTENU DE LA PAGE --- */}
      <div
        className='font-sans bg-gray-100 min-h-screen pt-32 pb-16'
        style={{ direction: textDirection }}
        lang={currentLangCode}
      >
        <div className='container mx-auto max-w-7xl px-4 py-8 flex flex-col md:flex-row gap-8'>
          {/* Sidebar */}
          <aside className='w-full md:w-1/4 bg-white rounded-2xl shadow-lg p-6 flex flex-col space-y-4 h-fit border border-gray-100'>
            <h2 className='text-xl font-bold text-[#2c3159] mb-4 font-adlam'>
              {currentLang.dashboardTitle}
            </h2>
            <button
              onClick={() => setActiveSection('my-info')}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer font-adlam ${
                activeSection === 'my-info'
                  ? 'text-white bg-[#2c3159] shadow-md'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <i className='fas fa-user-circle'></i>
              <span>{currentLang.myInfo}</span>
            </button>

            {/* Liens spécifiques aux administrateurs */}
            {user && user.role === 'admin' && (
              <>
                <button
                  onClick={() => setActiveSection('create-article')}
                  className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer font-adlam ${
                    activeSection === 'create-article'
                      ? 'text-white bg-[#2c3159] shadow-md'
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <i className='fas fa-plus-circle'></i>
                  <span>{currentLang.createArticle}</span>
                </button>
                <button
                  onClick={() => setActiveSection('articles-list')}
                  className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer font-adlam ${
                    activeSection === 'articles-list'
                      ? 'text-white bg-[#2c3159] shadow-md'
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <i className='fas fa-file-alt'></i>
                  <span>{currentLang.listArticles}</span>
                </button>
                <button
                  onClick={() => setActiveSection('users-list')}
                  className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer font-adlam ${
                    activeSection === 'users-list'
                      ? 'text-white bg-[#2c3159] shadow-md'
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <i className='fas fa-users'></i>
                  <span>{currentLang.allUser}</span>
                </button>
              </>
            )}

            <button
              onClick={handleLogout}
              className='flex items-center gap-3 py-3 px-4 rounded-xl font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-300 font-adlam cursor-pointer mt-4'
            >
              <i className='fas fa-sign-out-alt'></i>
              <span>{currentLang.logout}</span>
            </button>
          </aside>

          {/* Main Content - Contenu dynamique */}
          {renderContent()}
        </div>
      </div>
    </>
  )
}

export default UserProfile