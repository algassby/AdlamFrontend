import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'

const AdlamEnumeration = () => {
  const { selectedLanguage, textDirection } = useLanguage()
  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  const header = '𞤋𞤐𞤁𞤉 𞤙𞤀𞤂𞤍𞤋 𞤍𞤋𞤐 𞤑𞤀 𞤆𞤓𞤂𞤀𞤈'
  const items = [
    '𞤈𞤫𞤬𞤦𞤭𞤪𞥆',
    '𞤖𞤮𞤪𞤦𞤭𞤪𞥆',
    '𞤃𞤢𞤱𞤲𞤣',
    '𞤐𞤢𞥄𞤧𞤢𞥄𞤲𞤣',
    '𞤐𞤶𞤫𞤧𞤤𞤢𞥄𞤪',
    '𞤃𞤢𞤱𞤦𞤢𞥄𞤪',
    '𞤀𞥄𞤩𞤵𞤲𞥋𞤣',
  ]

  return (
    <div
      className='bg-white py-12 md:py-16 text-center font-sans'
      style={{ direction: textDirection }}
      lang={currentLangCode}
    >
      <div className='container mx-auto px-4 max-w-6xl'>
        {/* Titre */}
        <h2 className='font-adlam text-2xl md:text-3xl font-extrabold text-[#2c3159] mb-10'>
          {header}
        </h2>

        {/* Énumération en grille ou flexwrap élégante */}
        <div className='flex flex-wrap justify-center items-center gap-4 md:gap-6'>
          {items.map((item, index) => (
            <div
              key={index}
              className='font-adlam text-lg md:text-2xl font-bold text-[#2c3159] bg-blue-50/60 border border-[#2c3159]/30 rounded-xl px-6 py-4 shadow-sm hover:bg-blue-50 transition-colors duration-200 min-w-[120px]'
            >
              <span>{item}𞤫</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdlamEnumeration