import React, { useState } from 'react'
import { useLanguage } from '../../src/providers/LanguageProvider'
import { useAuth } from '../../src/providers/AuthProvider'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { translations, selectedLanguage, setSelectedLanguage, textDirection } =
    useLanguage()
  const currentLang = translations[selectedLanguage] || {}
  const headerData = currentLang.header || {
    languageLabel: 'Langue',
    menu: [
      { name: '𞤀𞤳𞤱𞤫𞥅𞤴𞤮', href: '/' },
      { name: '𞤃𞤢𞤱𞤲𞤣', href: '/a-propos' },
    ],
    profile: 'Mon profil',
    logouHead: 'Déconnexion',
    signUp: "S'inscrire",
    signIn: 'Connexion',
  }

  const { isAuthenticated, logout } = useAuth()

  const languages = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'Anglais' },
    { value: 'adlam', label: '𞤆𞤵𞤤𞤢𞤪' },
  ]

  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage
  const isRtl = textDirection === 'rtl'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value)
  }

  const handleLogout = () => {
    logout()
    closeMenu()
  }

  return (
    <>
      <header className='bg-white shadow-sm font-sans fixed top-0 w-full z-50'>
        {/* Barre supérieure (Top bar) */}
        <div className='bg-gray-100 py-2 border-b border-gray-200'>
          <div className='container mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-600'>
            <div className='flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 mb-2 md:mb-0'>
              <span className='flex items-center gap-1.5'>
                <i className='fa-solid fa-phone text-[#2c3159]' aria-hidden='true'></i> +224624661174
              </span>
              <span className='flex items-center gap-1.5 font-adlam'>
                <i className='fa-solid fa-phone text-[#2c3159]' aria-hidden='true'></i> +𞥒𞥒𞥔𞥖𞥒𞥔𞥖𞥖𞥑𞥑𞥗𞥔
              </span>
              <span className='flex items-center gap-1.5 font-adlam'>
                <i className='fa-solid fa-location-dot text-[#2c3159]' aria-hidden='true'></i> 𞤍𞤢𞤤𞤢𞤦𞤢𞥄
              </span>
              <span className='flex items-center gap-1.5'>
                <i className='fa-solid fa-envelope text-[#2c3159]' aria-hidden='true'></i> akweeyo@gmail.com
              </span>
            </div>

            <div className='flex items-center gap-4'>
              <div className='relative flex items-center gap-2'>
                <i className='fa-solid fa-globe text-[#2c3159]' aria-hidden='true'></i>
                <span className='font-medium'>{headerData.languageLabel}</span>
                <select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  className='bg-transparent text-[#2c3159] font-bold border-none outline-none cursor-pointer py-1'
                  aria-label='Sélectionner la langue'
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value} className='text-gray-800'>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Réseaux sociaux */}
              <div className='flex items-center gap-3'>
                <a href='https://www.facebook.com/share/1CRioYs2WX/' aria-label='Facebook' target='_blank' rel='noopener noreferrer' className='hover:scale-110 transition-transform'>
                  <i className='fa-brands fa-facebook text-gray-700 hover:text-blue-600'></i>
                </a>
                <a href='https://youtube.com/@akweeyo?feature=shared' aria-label='Youtube' target='_blank' rel='noopener noreferrer' className='hover:scale-110 transition-transform'>
                  <i className='fa-brands fa-youtube text-gray-700 hover:text-red-500'></i>
                </a>
                <a href='https://www.tiktok.com/@akweeyo?_r=1&_t=ZN-911Huh5AiPu' aria-label='TikTok' target='_blank' rel='noopener noreferrer' className='hover:scale-110 transition-transform'>
                  <i className='fa-brands fa-tiktok text-gray-700 hover:text-black'></i>
                </a>
                <a href='https://www.instagram.com/akweeyo?igsh=MXBoZDZ5cGZ6OW9uZw==' aria-label='Instagram' target='_blank' rel='noopener noreferrer' className='hover:scale-110 transition-transform'>
                  <i className='fa-brands fa-instagram text-gray-700 hover:text-pink-600'></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de navigation principale */}
        <div className='bg-[#2c3159] py-4 relative shadow-md'>
          <div className='container mx-auto max-w-7xl px-4 flex justify-between items-center text-white'>
            {/* Logo et Nom cliquables */}
            <Link to='/' className='flex items-center gap-3 cursor-pointer group'>
              <img
                src='/images/logo.png'
                alt="Logo de l'association Akweeyo"
                className='rounded-full w-12 h-12 object-cover border-2 border-white/20 group-hover:border-white transition-colors'
              />
              <span className='text-xl font-bold font-adlam tracking-wide'>𞤀𞤳𞤱𞤫𞥅𞤴𞤮</span>
            </Link>

            {/* Bouton Hamburger - Visible uniquement sur mobile */}
            <button
              onClick={toggleMenu}
              className='md:hidden text-white text-2xl focus:outline-none cursor-pointer p-1'
              aria-label='Ouvrir le menu de navigation'
            >
              <i className='fa-solid fa-bars'></i>
            </button>

            {/* Menu de navigation - Version desktop */}
            <div className='hidden md:flex flex-row items-center gap-4'>
              <nav
                className='flex flex-row items-center gap-4 text-sm md:text-base font-adlam'
                style={{ direction: textDirection }}
              >
                {headerData.menu.map((item, index) => (
                  <React.Fragment key={index}>
                    <Link
                      to={item.href}
                      className='hover:text-yellow-200 transition-colors py-1'
                    >
                      <span>{item.name}</span>
                    </Link>
                    {index < headerData.menu.length - 1 && (
                      <span className='w-px h-5 bg-white/40'></span>
                    )}
                  </React.Fragment>
                ))}
              </nav>

              {/* Boutons d'authentification */}
              <div className='flex items-center space-x-3 ml-6' style={{ direction: 'ltr' }}>
                {isAuthenticated ? (
                  <>
                    <Link
                      to='/profile'
                      className='bg-[#fff2cd] text-[#2c3159] font-bold py-2 px-5 rounded-full shadow-md hover:bg-yellow-400 transition-all duration-300 font-adlam text-sm'
                    >
                      <span>{headerData.profile}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='bg-transparent border border-white text-white font-bold py-2 px-5 rounded-full hover:bg-white hover:text-[#2c3159] transition-all duration-300 font-adlam text-sm cursor-pointer'
                    >
                      <span>{headerData.logouHead}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to='/register'
                      className='bg-[#fff2cd] text-[#2c3159] font-bold py-2 px-5 rounded-full shadow-md hover:bg-yellow-400 transition-all duration-300 font-adlam text-sm'
                    >
                      <span>{headerData.signUp}</span>
                    </Link>
                    <Link
                      to='/login'
                      className='bg-transparent border border-white text-white font-bold py-2 px-5 rounded-full hover:bg-white hover:text-[#2c3159] transition-all duration-300 font-adlam text-sm'
                    >
                      <span>{headerData.signIn}</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* OVERLAY (Fond noir semi-transparent) */}
        {isMenuOpen && (
          <div
            className='fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-xs transition-opacity'
            onClick={closeMenu}
            aria-hidden='true'
          ></div>
        )}

        {/* Barre latérale du menu mobile (RTL / LTR intelligent) */}
        <div
          className={`fixed top-0 w-72 h-full bg-[#2c3159] text-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden flex flex-col ${
            isRtl ? 'right-0' : 'left-0'
          } ${
            isMenuOpen
              ? 'translate-x-0'
              : isRtl
              ? 'translate-x-full'
              : '-translate-x-full'
          }`}
          style={{ direction: textDirection }}
          lang={currentLangCode}
        >
          <div className='flex justify-between items-center p-5 border-b border-white/10'>
            <span className='font-bold font-adlam text-lg'>𞤀𞤳𞤱𞤫𞥅𞤴𞤮</span>
            <button
              onClick={closeMenu}
              className='text-white text-2xl focus:outline-none cursor-pointer p-1 hover:text-yellow-200 transition-colors'
              aria-label='Fermer le menu'
            >
              <i className='fa-solid fa-xmark'></i>
            </button>
          </div>

          <nav className='flex flex-col p-6 gap-5 overflow-y-auto flex-grow'>
            {headerData.menu.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                onClick={closeMenu}
                className='hover:text-yellow-200 transition-colors w-full text-center py-2.5 text-lg font-adlam border-b border-white/5'
              >
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Boutons d'authentification pour mobile */}
            <div className='flex flex-col gap-4 mt-6 pt-4 border-t border-white/10'>
              {isAuthenticated ? (
                <>
                  <Link
                    to='/profile'
                    onClick={closeMenu}
                    className='bg-[#fff2cd] text-[#2c3159] font-bold py-3 px-4 rounded-full shadow-lg hover:bg-yellow-400 transition duration-300 font-adlam text-center'
                  >
                    <span>{headerData.profile}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='bg-transparent border border-white text-white font-bold py-3 px-4 rounded-full hover:bg-white hover:text-[#2c3159] transition duration-300 font-adlam cursor-pointer text-center'
                  >
                    <span>{headerData.logouHead}</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to='/register'
                    onClick={closeMenu}
                    className='bg-[#fff2cd] text-[#2c3159] font-bold py-3 px-4 rounded-full shadow-lg hover:bg-yellow-400 transition duration-300 font-adlam text-center'
                  >
                    <span>{headerData.signUp}</span>
                  </Link>
                  <Link
                    to='/login'
                    onClick={closeMenu}
                    className='bg-transparent border border-white text-white font-bold py-3 px-4 rounded-full hover:bg-white hover:text-[#2c3159] transition duration-300 font-adlam text-center'
                  >
                    <span>{headerData.signIn}</span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header