import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'

const AdlamTexteEtImages = () => {
  const { selectedLanguage, textDirection } = useLanguage()
  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  // URLs des images (idéalement vos liens Cloud Foundry ou le dossier public)
  const image1 = '/images/pic1.jpeg'
  const image2 = '/images/pic2.jpeg'

  return (
    <section
      dir={textDirection}
      className='bg-white text-gray-900 px-6 md:px-32 lg:px-60 py-12 md:py-16 font-sans'
      lang={currentLangCode}
    >
      {/* Titre principal */}
      <h2 className='font-adlam text-2xl md:text-3xl font-extrabold text-center mb-10 text-[#2c3159]'>
        𞤚𞤮𞥅𞤤𞤭 𞤥𞤮𞤲 𞤳𞤢 𞤀𞤳𞤱𞤫𞥅𞤴𞤮.
      </h2>

      {/* Contenu principal */}
      <div className='container mx-auto flex flex-col md:flex-row-reverse items-center md:items-start gap-8 md:gap-12'>

        {/* Bloc images optimisé pour le SEO (Google Images) */}
        <div className='flex flex-col md:flex-row md:w-1/2 gap-4 justify-center w-full'>
          <img
            src={image1}
            alt='𞤅𞤭𞤲𞤣𞤭 1 - Illustration Akweeyo en adlam et pular'
            title='Akweeyo Illustration 1'
            loading='lazy'
            className='w-full md:w-1/2 object-cover rounded-xl shadow-md h-64'
            onError={(e) => {
              e.target.src = '/placeholder.jpg'
            }}
          />
          <img
            src={image2}
            alt='𞤅𞤭𞤲𞤣𞤭 2 - Illustration Akweeyo en adlam et pular'
            title='Akweeyo Illustration 2'
            loading='lazy'
            className='w-full md:w-1/2 object-cover rounded-xl shadow-md h-64'
            onError={(e) => {
              e.target.src = '/placeholder.jpg'
            }}
          />
        </div>

        {/* Bloc texte dynamique et justifié */}
        <div className='md:w-1/2 font-adlam text-lg md:text-xl leading-relaxed space-y-6 text-right'>
          <p className='text-justify'>
            𞤀𞤳𞤱𞤫𞥅𞤴𞤮: 𞤐𞤮 𞤴𞤫𞤱𞤼𞤢 𞤬𞤭𞥅 𞤨𞤫𞤰𞥆𞤭⹁ 𞤊𞤭𞤲𞤢𞥄 𞤼𞤢𞤱𞤢𞥄⹁ 𞤲𞤢𞥄𞤥𞤵 𞤫 𞤷𞤮𞤧𞤢𞥄𞤲𞤫 𞤊𞤵𞤤𞤩𞤫 𞤫
            𞤲𞤮𞤳𞥆𞤵 𞤳𞤢𞤤𞤢 𞤳𞤢 𞤩𞤫 𞤸𞤭𞤳𞥆𞤮𞤪𞤭 𞤫 𞤤𞤢𞥄𞤤𞤢𞤺𞤢𞤤 𞤢𞤣𞤵𞤲𞤢 𞤲𞤺𞤢𞤤. 𞤖𞤭𞤲𞤮 𞤼𞤢𞤱𞤪𞤢𞥄 𞤫 𞤺𞤮𞤤𞥆𞤫
            𞤀𞤳𞤱𞤫𞥅𞤴𞤮 𞤶𞤢𞤲𞥆𞤵𞤺𞤮𞤤 𞤬𞤭𞤲𞤣𞤭𞤲𞤢 𞤲𞤺𞤫𞥅𞤼𞤵𞤶𞤭 𞤇𞤭𞤯𞤩𞤫 𞤊𞤵𞤤𞤩𞤫 𞤫 𞤀𞤬𞤭𞤪𞤭𞤳𞤢𞤲𞥆𞤢𞥄𞤩𞤫.
          </p>

          <p className='text-justify'>
            𞤀𞤳𞤱𞤫𞥅𞤴𞤮: 𞤖𞤮𞤤𞥆𞤭𞤪𞤢𞤴 𞤳𞤢𞤤𞤢 𞤳𞤮 𞤬𞤫𞤰𞥆𞤢𞤼𞤢 𞤫 𞤀𞤣𞤵𞤲𞤢𞥄𞤪𞤵 𞤲𞤣𞤵𞤲⹁ 𞤊𞤵𞤯𞤲𞤢𞥄𞤲𞤺𞤫 𞤫
            𞤖𞤭𞤪𞤲𞤢𞥄𞤲𞤺𞤫⹁ 𞤙𞤢𞥄𞤥𞤲𞤢𞥄𞤲𞤺𞤫 𞤫 𞤐𞤢𞤲𞥆𞤢𞥄𞤲𞤺𞤫.{' '}
          </p>

          <p className='text-justify'>
            𞤀𞤳𞤱𞤫𞥅𞤴𞤮: 𞤐𞤮 𞤀𞤲𞤣𞤭𞤲𞤢 𞤫𞤲 𞤈𞤮𞤱𞤼𞤢𞤼𞤢𞤲𞤭⹁ 𞤈𞤮𞤱𞤼𞤢𞤲𞤭⹁ 𞤈𞤮𞤱𞤢𞤲𞤭⹁ 𞤖𞤭𞤳𞥆𞤢⹁ 𞤃𞤢𞤱𞤪𞤭⹁
            𞤃𞤢𞤱𞤼𞤭𞤪𞤭⹁ 𞤃𞤢𞤱𞤼𞤭𞤼𞤭𞤪𞤭.
          </p>
        </div>

      </div>
    </section>
  )
}

export default AdlamTexteEtImages