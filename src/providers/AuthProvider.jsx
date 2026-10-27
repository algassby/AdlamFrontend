import React, { useState, createContext, useContext, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé au sein d’un AuthProvider')
  }
  return context
}

const LOGIN_API_URL =
  'https://adlambackend-production-551c.up.railway.app/api/auth/login'

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [isAuthenticated, setIsAuthenticated] = useState(!!token)

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch (e) {
      console.error('Erreur lors du chargement des données utilisateur', e)
      return null
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Synchronisation avec le localStorage
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
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(
          errData.message ||
            'Échec de la connexion. Veuillez vérifier vos identifiants.',
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

  const updateUser = (updatedUserData) => {
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedUserData }
      localStorage.setItem('user', JSON.stringify(newUser))
      return newUser
    })
  }

  const value = {
    isAuthenticated,
    user,
    isLoading,
    error,
    token,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}