import React, { useState, useEffect, createContext, useContext } from 'react'

export const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage doit être utilisé au sein d’un LanguageProvider')
  }
  return context
}

const translations = {
  fr: {
    hero: {
      title: 'Denderla Sonre Ublaande',
      description:
        'Découvrez notre association et rejoignez notre noble mission de promouvoir la culture Adlam.',
      button: 'Voir plus',
    },
    header: {
      menu: [
        { name: 'Accueil', href: '/' },
        { name: 'À propos', href: '/a-propos' },
        { name: 'Initiation', href: '/initiation' },
        { name: 'Historique', href: '/history-details' },
        { name: 'Articles', href: '/all-articles' },
      ],
      languageLabel: 'Langue',
      signUp: "S'inscrire",
      signIn: 'Connexion',
      profile: 'Mon profil',
      logouHead: 'Déconnexion',
    },
    offerings: {
      title: 'Ce que nous offrons',
      services: [
        {
          title: 'Initiation à l’écriture',
          description:
            'Des ateliers interactifs pour apprendre à lire et à écrire en Adlam, adaptés à tous les niveaux.',
        },
        {
          title: 'Cours de langue',
          description:
            'Des cours complets pour maîtriser la grammaire, le vocabulaire et la prononciation de la langue Adlam.',
        },
        {
          title: 'Cours de culture',
          description:
            'Une exploration riche de l’histoire, des traditions, de la musique et de l’art de la culture Peul.',
        },
        {
          title: 'Soutien à la recherche',
          description:
            'Mise à disposition de ressources documentaires, archives et accès à des experts pour les chercheurs.',
        },
      ],
    },
    history: {
      title: 'Historique',
      description:
        "Découvrez comment l'alphabet Adlam est né pour préserver et moderniser la langue peule. Créé par deux frères guinéens en 1989, il a permis de transcrire le peul, qui était traditionnellement une langue orale, pour la première fois. Notre association s'engage à faire perdurer cet héritage en enseignant et en promouvant l'usage de cet alphabet unique. Rejoignez-nous pour protéger cette richesse culturelle et linguistique.",
      button: 'Voir plus',
      alphabet: [
        '𞤀', '', '𞤂', '', '𞤆', '', '', '𞤉', '𞤊', '𞤋', '𞤌', '𞤍', '𞤎', '𞤏', '𞤐', '𞤑', '𞤒', '𞤓',
      ],
    },
    historicDetails: {
      backButton: 'Retour',
      title: "L'histoire complète de l'alphabet Adlam",
      intro:
        "L'alphabet Adlam n'est pas seulement un système d'écriture, c'est une révolution pour la langue peule. Son histoire est celle de deux frères visionnaires, de la détermination et de la reconnaissance d'un héritage millénaire.",
      section1: {
        heading: 'Les frères Barry : Une vision pour le futur',
        text: "La création d'Adlam est l'œuvre de deux jeunes frères guinéens, Ibrahima et Abdoulaye Barry, qui, dans les années 1980, ont senti la nécessité de préserver leur langue maternelle, le Fulfulde, de l'oubli. Alors qu'il n'existait aucun système d'écriture universel pour la langue, ils ont entrepris la tâche colossale de concevoir un alphabet complet, de la phonétique à la typographie, pour permettre au peuple peul de lire et d'écrire dans sa propre langue.",
      },
      section2: {
        text: "Après des années de travail acharné, ils ont finalisé leur alphabet. Le nom Adlam est un acronyme de sa phrase d'introduction en Peul : 'Alkulama lesli dimma naajum' (l'alphabet protège le peuple de l'oppression). Cet alphabet a depuis été adopté par la communauté et utilisé pour l'alphabétisation, la littérature, et la communication numérique. Il est aujourd'hui une fierté pour le peuple peul, symbolisant l'autonomie culturelle et la résilience face à la colonisation linguistique.",
      },
    },
    communityDetails: {
      backButton: 'Retour',
      title: 'La communauté peule',
      intro:
        "Le peuple peul, également connu sous le nom de Fulani, est l'un des groupes ethniques les plus vastes et les plus dispersés d'Afrique. Répartis principalement dans la région du Sahel et en Afrique de l'Ouest, ils sont réputés pour leur riche histoire nomade et leur culture distincte, centrée sur l'élevage de bétail. Ils sont connus pour leur résilience, leurs traditions musicales et poétiques, et leur engagement profond envers leurs coutumes et leur langue, le fulfulde.",
      section1: {
        heading: 'Richesse culturelle et traditions',
        text: "La culture peule est une mosaïque de traditions orales, de musique, de poésie et d'artisanat. Les griots peuls, ou 'gawlo', sont les gardiens de l'histoire, transmettant des épopées et des lignées ancestrales de génération en génération.",
      },
      section2: {
        text: "Au-delà de leurs traditions, les Peuls sont des acteurs importants du développement social et économique de la région. Ils contribuent activement à l'économie locale par leurs activités d'élevage et leur participation au commerce.",
      },
    },
    initiation: {
      title: 'Un parcours de découverte',
      description:
        "Plongez dans les fondamentaux de la culture peule et commencez votre voyage d'apprentissage.",
      tiles: [
        { title: 'Discussion culturelle', svg: 'lucide-message-circle' },
        { title: 'Les 7 jours de la semaine', svg: 'lucide-calendar' },
        { title: 'Les 12 mois de année', svg: 'lucide-calendar-check' },
        { title: 'Les chiffres', svg: 'lucide-grid' },
      ],
      button: 'Voir plus',
    },
    initiationPage: {
      heroTitle: 'Initiation à la culture Adlam',
      heroDescription:
        "Un parcours de découverte des fondements de la culture peule et de l'alphabet Adlam.",
      sections: [
        {
          title: 'Discussion culturelle',
          description:
            "Rejoignez nos discussions animées pour plonger au cœur des traditions, de l'histoire et des défis de la communauté peule.",
        },
        {
          title: 'Événements à venir',
          description:
            'Gardez un œil sur notre calendrier pour ne manquer aucun de nos événements, ateliers et conférences.',
        },
        {
          title: 'Activités et ateliers',
          description:
            "Participez à nos ateliers pratiques pour apprendre l'écriture Adlam, la musique traditionnelle et l'artisanat peul.",
        },
        {
          title: 'Ressources numériques',
          description:
            "Accédez à une bibliothèque de ressources en ligne, y compris des livres, des vidéos et des outils d'apprentissage pour la langue Adlam.",
        },
      ],
    },
    contactForm: {
      title: 'Contactez-nous',
      descriptionLine1:
        "Si vous avez des questions, des suggestions ou si vous souhaitez nous signaler un bug, n'hésitez pas à nous contacter.",
      descriptionLine2: 'Vous pouvez également nous joindre via les réseaux sociaux ci-dessous.',
      labelName: 'Nom et Prénom',
      labelTel: 'Téléphone',
      labelEmail: 'Email',
      labelMessage: 'Votre Message',
      buttonSubmit: 'Envoyer',
    },
    about: {
      smallTitle: 'Notre Histoire',
      largeTitle: "Qui Sommes-Nous ? Découvrez l'Association.",
      paragraph1: "L'association a été fondée dans le but de...",
      paragraph2: "Notre mission principale est d'assurer...",
      paragraph3: 'Nous croyons fermement que...',
    },
    community: {
      title: 'La communauté peule',
      description:
        "Le peuple peul, également connu sous le nom de Fulani, est l'un des groupes ethniques les plus vastes et les plus dispersés d'Afrique.",
      button: 'Lire la suite',
    },
    articlesSection: {
      title: 'Nos articles',
      readMoreButton: 'Lire la suite',
      viewAllButton: 'Voir tous les articles',
    },
    allArticlesPage: {
      heroTitle: 'Tous les articles',
      heroSubtitle: "Découvrez l'intégralité de notre collection d'articles.",
      backButton: 'Retour',
    },
    auth: {
      register: {
        signUp: 'Inscription',
        nameLabel: 'Nom complet',
        emailLabel: 'Email',
        passwordLabel: 'Mot de passe',
        confirmPasswordLabel: 'Confirmer le mot de passe',
        signUpButton: "S'inscrire",
        hasAccount: 'Vous avez déjà un compte ?',
        signInHere: 'Connectez-vous ici',
        passwordMismatchError: 'Les mots de passe ne correspondent pas.',
        registrationError: "Erreur lors de l'inscription.",
        loadingButton: 'Inscription en cours...',
      },
      login: {
        signIn: 'Connexion',
        emailLabel: 'Email',
        emailPlaceholder: 'Votre email',
        passwordLabel: 'Mot de passe',
        passwordPlaceholder: 'Votre mot de passe',
        signInButton: 'Se connecter',
        loadingButton: 'Connexion en cours...',
        noAccount: "Vous n'avez pas de compte ?",
        signUpHere: 'Inscrivez-vous ici',
        authError: "Erreur d'authentification.",
      },
    },
    userProfile: {
      unauthorizedMessage: 'Veuillez vous connecter pour voir cette page.',
      dashboardTitle: 'Tableau de bord',
      myInfo: 'Mes informations',
      createArticle: 'Créer un article',
      listArticles: 'Liste des articles',
      allUser: 'Liste des utilisateurs',
      logout: 'Se déconnecter',
      updateProfileTitle: 'Mettre à jour mon profil',
      passwordMismatchError: 'Les mots de passe ne correspondent pas.',
      successMessage: 'Profil mis à jour avec succès.',
      errorMessage: 'Échec de la mise à jour du profil.',
      networkError: 'Une erreur réseau est survenue. Veuillez réessayer.',
      nameLabel: 'Nom et prénom',
      emailLabel: 'Adresse Email',
      changePasswordTitle: 'Changer le mot de passe (optionnel)',
      newPasswordLabel: 'Nouveau mot de passe',
      confirmPasswordLabel: 'Confirmer le nouveau mot de passe',
      updatingButton: 'Mise à jour...',
      updateButton: 'Mettre à jour le profil',
    },
  },
  adlam: {
    hero: {
      title: '𞤚𞤮𞥅𞤤𞤭 𞤥𞤮𞤲 𞤳𞤢 𞤀𞤳𞤱𞤫𞥅𞤴𞤮.',
      description: '𞤀𞤳𞤱𞤫𞥅𞤴𞤮: 𞤐𞤮 𞤴𞤫𞤱𞤼𞤢 𞤬𞤭𞥅 𞤨𞤫𞤰𞥆𞤭⹁ 𞤊𞤭𞤲𞤢𞥄 𞤼𞤢𞤱𞤢𞥄⹁ 𞤲𞤢𞥄𞤥𞤵 𞤫 𞤷𞤮𞤧𞤢𞥄𞤲𞤫 𞤊𞤵𞤤𞤩𞤫.',
      button: '𞤚𞤭𞤲𞤵',
    },
    header: {
      menu: [
        { name: '𞤘𞤢𞤤𞥆𞤫', href: '/' },
        { name: '𞤊𞤭𞥅 𞤸𞤵𞥅𞤱𞤲𞤣𞤫', href: '/a-propos' },
        { name: '𞤊𞤵𞤯𞥆𞤢𞤲𞤣𞤫', href: '/initiation' },
        { name: '𞤆𞤫𞤰𞥆𞤭𞤲𞤳𞤮', href: '/history-details' },
        { name: '𞤑𞤵𞤯𞤮𞤤', href: '/all-articles' },
      ],
      languageLabel: '𞤍𞤫𞤲𞤯𞤫',
      signUp: '𞤏𞤭𞤲𞤣𞤢𞤺𞤮𞤤',
      signIn: '𞤅𞤮𞤯𞤢𞤲𞤣𞤫',
      profile: '𞤅𞤫𞥅𞤺𞤮 𞤢𞤥',
      logouHead: '𞤅𞤮𞤯𞤼𞤢𞤲𞤣𞤫',
    },
    offerings: {
      title: '𞤖𞤭𞤥𞤮 𞤳𞤮 𞤯𞤫𞤥𞤯𞤫 𞤥𞤫𞥅𞤯𞤫𞤪𞤼𞤫𞤲',
      services: [
        { title: '𞤉𞤥𞤢𞥄𞤲𞤢𞥄𞤶𞤫 𞤫 𞤐𞤭𞤯𞤼𞤵𞤲𞤢', description: '𞤃𞤢𞤪𞤢𞤲𞤼𞤢𞥄𞤶𞤫 𞤳𞤮 𞤯𞤭𞤯𞤭...' },
      ],
    },
    history: {
      title: '𞤆𞤫𞤰𞥆𞤮𞤤 𞤧𞤭𞤲𞤷𞤫𞥅𞤣𞤫 𞤀𞤣𞤤𞤢𞤥',
      description: '𞤐𞤣𞤫 𞤩𞤫 𞤴𞤮𞤼𞥆𞤭𞤲𞤮𞥅 𞤣𞤵𞥅𞤩𞤭...',
      button: '𞤚𞤭𞤲𞤵',
      alphabet: ['𞤀', '𞤁', '𞤂', '𞤄', '𞤆', '𞤇', '𞤈', '𞤉', '𞤊', '𞤋', '𞤌', '𞤍', '𞤎', '𞤏', '𞤐', '𞤑', '𞤒', '𞤓'],
    },
    historicDetails: {
      backButton: '𞤑𞤮𞤤𞥆𞤮',
      title: '𞤆𞤫𞤰𞥆𞤮𞤤 𞤧𞤭𞤲𞤷𞤫𞥅𞤣𞤫 𞤀𞤣𞤤𞤢𞤥',
      intro: '𞤐𞤣𞤫 𞤩𞤫 𞤴𞤮𞤼𞥆𞤭𞤲𞤮𞥅...',
      section1: { heading: '𞤙𞤢𞥄𞤤𞤲𞤣𞤫 𞤺𞤮𞥅𞤪𞤫', text: '...' },
      section2: { text: '...' },
    },
    communityDetails: {
      backButton: '𞤑𞤮𞤤𞥆𞤮',
      title: '𞤊𞤓𞤂𞤇𞤉',
      intro: '𞤆𞤓𞤂𞥆𞤌...',
      section1: { heading: '', text: '...' },
      section2: { text: '...' },
    },
    initiation: {
      title: '𞤑𞤮 𞤼𞤮𞥅𞤤𞤭 𞤥𞤮𞤲 𞤳𞤢 𞤀𞤳𞤱𞤫𞥅𞤴𞤮',
      description: '𞤖𞤫𞤱𞤼𞤫𞥅...',
      tiles: [
        { title: '𞤉𞤥𞤢𞥄𞤲𞤢𞥄𞤶𞤫 𞤫 𞤕𞤢𞤪𞤭', svg: 'lucide-message-circle' },
      ],
      button: '𞤚𞤭𞤲𞤵',
    },
    initiationPage: {
      heroTitle: '𞤂𞤭𞤥𞤳𞤵𞤤𞤫',
      heroDescription: '𞤑𞤮 𞤢𞤤𞤳𞤵𞤤𞤫 𞤫 𞤤𞤭𞤥𞤮𞥅𞤪𞤫',
      sections: [],
    },
    contactForm: {
      title: "𞤔𞤮𞤳𞥆𞤮𞤲'𞤣𞤭𞤪𞤫𞥅 𞤫 𞤢𞤥𞤫𞤲",
      descriptionLine1: '...',
      descriptionLine2: '...',
      labelName: '𞤋𞤲𞤣𞤫 𞤫 𞤴𞤫𞤼𞥆𞤮𞥅𞤪𞤫',
      labelTel: '𞤉𞤏',
      labelEmail: '𞤐𞤭𞤤',
      labelMessage: '𞤐𞤓𞤂𞤀𞤂',
      buttonSubmit: '𞤐𞤢𞤩𞤵',
    },
    about: {
      smallTitle: '𞤑𞤫𞤪𞤉𞥅𞤔𞤉',
      largeTitle: '𞤆𞤌𞤚𞥆𞤀𞤂-𞤐𞤓𞤐𞤍𞤀𞤂-𞤏𞤀𞤑𞥆𞤋𞤂𞤀𞥄𞤈𞤉',
      paragraph1: '...',
      paragraph2: '...',
      paragraph3: '...',
    },
    community: {
      title: '𞤊𞤓𞤂𞤇𞤉',
      description: '...',
      button: '𞤚𞤭𞤲𞤵',
    },
    articlesSection: {
      title: '𞤑𞤵𞤯𞤮𞤤',
      readMoreButton: '𞤚𞤭𞤲𞤵',
      viewAllButton: '𞤚𞤭𞤲𞤵',
    },
    allArticlesPage: {
      heroTitle: '𞤑𞤵𞤯𞤭 𞤥𞤢𞤱𞤯𞤭',
      heroSubtitle: '',
      backButton: '𞤑𞤮𞤤𞥆𞤮',
    },
    auth: {
      register: {
        signUp: '𞤏𞤭𞤲𞤣𞤢𞤺𞤮𞤤',
        nameLabel: '𞤋𞤲𞤣𞤫 𞤫 𞤴𞤮𞤼𞥆𞤮𞥅𞤪𞤫',
        emailLabel: '𞤐𞤭𞤤𞤼𞤭𞤧𞤵',
        passwordLabel: '𞤚𞤮𞤲𞤺𞤭𞤪𞤣𞤫',
        confirmPasswordLabel: '𞤔𞤢𞤩𞤵𞤺𞤮𞤤',
        signUpButton: '𞤏𞤭𞤲𞤣𞤢𞤺𞤮𞤤',
        hasAccount: '𞤋𞤯𞤮𞤲 𞤱𞤭𞤲𞤣𞤭𞥅 ؟',
        signInHere: '𞤅𞤮𞤯𞤫𞥅',
        passwordMismatchError: '...',
        registrationError: '...',
        loadingButton: '...',
      },
      login: {
        signIn: '𞤅𞤮𞤯𞤢𞤲𞤣𞤫',
        emailLabel: '𞤐𞤭𞤤𞤼𞤭𞤧𞤵',
        emailPlaceholder: '...',
        passwordLabel: '𞤚𞤮𞤲𞤺𞤭𞤪𞤣𞤫',
        passwordPlaceholder: '...',
        signInButton: '𞤅𞤮𞤯𞤮',
        loadingButton: '',
        noAccount: '𞤀𞤤𞤢𞥄 𞤬𞤭𞤲𞤣𞤫؟',
        signUpHere: '𞤱𞤭𞤲𞤣𞤭𞤼𞤫𞥅 𞤯𞤮𞥅',
        authError: '...',
      },
    },
    userProfile: {
      unauthorizedMessage: '...',
      dashboardTitle: '𞤖𞤢𞥄𞤼𞤭𞤥𞤫𞤪𞤫 𞤧𞤫𞤪𞤢𞥄𞤪𞤫',
      myInfo: '𞤅𞤭𞤬𞤢𞥄𞤶𞤭 𞤢𞤥',
      createArticle: '𞤅𞤭𞤲𞤷𞤵𞤺𞤮𞤤 𞤳𞤵𞤯𞤮𞤤',
      listArticles: '𞤕𞤭𞤪𞤼𞤮𞤤 𞤳𞤵𞤯𞤭',
      allUser: '𞤕𞤭𞤪𞤼𞤮𞤤 𞤸𞤵𞥅𞤼𞤮𞤪𞤢𞤴𞤩𞤫',
      logout: '𞤅𞤮𞤯𞤼𞤢𞤲𞤣𞤫',
      updateProfileTitle: '...',
      passwordMismatchError: '...',
      successMessage: '...',
      errorMessage: '...',
      networkError: '...',
      nameLabel: '...',
      emailLabel: '...',
      changePasswordTitle: '...',
      newPasswordLabel: '...',
      confirmPasswordLabel: '...',
      updatingButton: '...',
      updateButton: '...',
    },
  },
  en: {
    hero: {
      title: 'Denderla Sonre Ublaande',
      description: 'Discover our association and join our noble mission to promote Adlam culture.',
      button: 'Read more',
    },
    header: {
      menu: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/a-propos' },
        { name: 'Initiation', href: '/initiation' },
        { name: 'History', href: '#' },
        { name: 'Articles', href: '/all-articles' },
      ],
      languageLabel: 'Language',
      signUp: 'Sign Up',
      signIn: 'Sign In',
      profile: 'My profile',
      logouHead: 'Logout',
    },
    offerings: {
      title: 'What we offer',
      services: [],
    },
    history: {
      title: 'History',
      description: 'Discover how the Adlam alphabet was born...',
      button: 'Read more',
      alphabet: [],
    },
    historicDetails: {
      backButton: 'Back',
      title: 'The full history of the Adlam alphabet',
      intro: '...',
      section1: { heading: '...', text: '...' },
      section2: { text: '...' },
    },
    communityDetails: {
      backButton: 'Back',
      title: 'The Fulani community',
      intro: '...',
      section1: { heading: '...', text: '...' },
      section2: { text: '...' },
    },
    initiation: {
      title: 'A journey of discovery',
      description: '...',
      tiles: [],
      button: 'Read more',
    },
    initiationPage: {
      heroTitle: 'Initiation to Adlam culture',
      heroDescription: '...',
      sections: [],
    },
    contactForm: {
      title: 'Contact Us',
      descriptionLine1: '...',
      descriptionLine2: '...',
      labelName: 'Full Name',
      labelTel: 'Phone Number',
      labelEmail: 'Email Address',
      labelMessage: 'Your Message',
      buttonSubmit: 'Send Message',
    },
    about: {
      smallTitle: 'Our History',
      largeTitle: 'Who Are We?',
      paragraph1: '...',
      paragraph2: '...',
      paragraph3: '...',
    },
    community: {
      title: 'The Fulani community',
      description: '...',
      button: 'Read more',
    },
    articlesSection: {
      title: 'Our articles',
      readMoreButton: 'Read more',
      viewAllButton: 'View all articles',
    },
    allArticlesPage: {
      heroTitle: 'All articles',
      heroSubtitle: '...',
      backButton: 'Back',
    },
    auth: {
      register: {
        signUp: 'Sign Up',
        nameLabel: 'Full name',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        confirmPasswordLabel: 'Confirm password',
        signUpButton: 'Sign Up',
        hasAccount: 'Do you already have an account ?',
        signInHere: 'Login here',
        passwordMismatchError: '...',
        registrationError: '...',
        loadingButton: '...',
      },
      login: {
        signIn: 'Log in',
        emailLabel: 'Email',
        emailPlaceholder: '...',
        passwordLabel: 'Password',
        passwordPlaceholder: '...',
        signInButton: 'Log in',
        loadingButton: '...',
        noAccount: '',
        signUpHere: 'Sign up here',
        authError: '...',
      },
    },
    userProfile: {
      unauthorizedMessage: 'Please log in to see this page.',
      dashboardTitle: 'Dashboard',
      myInfo: 'My information',
      createArticle: 'Create article',
      listArticles: 'All articles',
      allUser: 'All users',
      logout: 'Log out',
      updateProfileTitle: 'Update my profile',
      passwordMismatchError: '...',
      successMessage: '...',
      errorMessage: '...',
      networkError: '...',
      nameLabel: '...',
      emailLabel: '...',
      changePasswordTitle: '...',
      newPasswordLabel: '...',
      confirmPasswordLabel: '...',
      updatingButton: '...',
      updateButton: '...',
    },
  },
}

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('adlam')
  const [textDirection, setTextDirection] = useState('rtl')

  useEffect(() => {
    if (selectedLanguage === 'adlam') {
      setTextDirection('rtl')
    } else {
      setTextDirection('ltr')
    }
  }, [selectedLanguage])

  const value = {
    selectedLanguage,
    setSelectedLanguage,
    translations,
    textDirection,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}