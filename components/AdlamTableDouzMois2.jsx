import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'

const AdlamTableDouzMois = () => {
  const { selectedLanguage, textDirection } = useLanguage()
  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  // Les données du tableau des douze mois en adlam
  const header = '𞤂𞤫𞤦𞥆𞤭 𞤤𞤫𞥅𞤤𞤫𞤴𞤢𞤲𞤳𞤮𞥅𞤶𞤭 𞤯𞤭𞤲'
  const data = [
    [
      '𞤔𞤮𞤥𞤦𞤫𞤲𞤼𞤫',
      '𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤨𞤢𞤪𞤢𞤲',
      '𞤆𞤢𞤪𞤢𞤲',
      '𞤃𞤭𞤲-𞤨𞤢𞤪𞤢𞤲',
      '𞤄𞤢𞤨𞥆𞤢𞤪𞤢𞤲',
      '𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤪𞤢𞥄𞤶𞤭𞤦𞤭',
    ],
    [
      '𞤈𞤢𞥄𞤶𞤭𞤦𞤭',
      '𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤧𞤵𞥅𞤥𞤢𞤴𞤫𞥅',
      '𞤅𞤵𞥅𞤥𞤢𞤴𞤫𞥅',
      '𞤔𞤵𞥅𞤤𞤣𞤢𞥄𞤲𞤣𞤵',
      '𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵 𞤣𞤮𞤲𞤳𞤭𞤲',
      '𞤁𞤮𞤲𞤳𞤭𞤲',
    ],
  ]

  return (
    <div
      className='bg-white py-12 md:py-16 text-gray-800 font-sans'
      style={{ direction: textDirection }}
      lang={currentLangCode}
    >
      <div className='container mx-auto px-4 max-w-6xl'>
        {/* Titre */}
        <h3 className='text-xl md:text-2xl font-extrabold mb-8 font-adlam text-center text-[#2c3159]'>
          {header}
        </h3>

        {/* Tableau principal */}
        <div className='overflow-x-auto shadow-xl rounded-2xl border-2 border-[#2c3159] p-6 bg-white'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {data.map((col, colIndex) => (
              <div
                key={colIndex}
                className='flex flex-col space-y-3 bg-blue-50/50 p-4 rounded-xl border border-[#2c3159]/30'
              >
                {col.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className='px-4 py-3 text-center text-xl md:text-2xl font-adlam font-semibold text-[#2c3159] border border-[#2c3159]/20 rounded-lg bg-white shadow-sm hover:bg-blue-50 transition-colors duration-200'
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdlamTableDouzMois