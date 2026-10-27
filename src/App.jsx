import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider } from './providers/LanguageProvider'
import { AuthProvider } from './providers/AuthProvider'
import Header from '../components/Header/Header'
import HeroSection from '../components/HeroSection/HeroSection'
import HistorySection from '../components/HistorySection'
import Footer from '../components/Footer'
import InitiationSection from '../components/InitiationSection'
import CommunitySection from '../components/CommunitySection'
import ArticlesSection from '../components/ArticlesSection'
import ContactForm from '../components/ContactForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import ConnexionPage from '../pages/ConnexionPage'
import ResetPassword from '../pages/ResetPassword'
import ForgotPassword from '../pages/ForgotPassword'
import UserProfile from '../pages/UserProfile'
import ArticlePage from '../components/ArticlePage'
import AllArticlesPage from '../components/AllArticlesPage'
import HistoryDetailPage from '../components/HistoryDetailPage'
import CommunityDetailPage from '../components/CommunityDetailPage'
import InitiationPage from '../components/InitiationPage'
import AboutPage from '../components/AboutPage'
import AdlamTexteEtImages from '../components/AdlamTexteEtImages'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <Header />
            <main>
              <Routes>
                {/* Route pour la page d'accueil avec tous les composants */}
                <Route
                  path='/'
                  element={
                    <>
                      <HeroSection />
                      <HistorySection />
                      <InitiationSection />
                      <CommunitySection />
                      <AdlamTexteEtImages />
                      <ArticlesSection />
                      <ContactForm />
                    </>
                  }
                />
                {/* Routes d'authentification et profil */}
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<ConnexionPage />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password/:token' element={<ResetPassword />} />
                <Route path='/profile' element={<UserProfile />} />

                {/* Routes des articles */}
                <Route path='/articles/:id' element={<ArticlePage />} />
                <Route path='/all-articles' element={<AllArticlesPage />} />

                {/* Routes dynamiques et informatives */}
                <Route path='/history-details' element={<HistoryDetailPage />} />
                <Route path='/community' element={<CommunityDetailPage />} />
                <Route path='/initiation' element={<InitiationPage />} />
                <Route path='/a-propos' element={<AboutPage />} />
              </Routes>
            </main>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App