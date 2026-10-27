import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'

const AdlamTableDouzMois = () => {
  const { selectedLanguage, textDirection } = useLanguage()
  const currentLangCode = selectedLanguage === 'adlam' ? 'ff-Adlm' : selectedLanguage

  // Les données du tableau des mois
  const header = '𞤂𞤫𞤦𞥆𞤭 𞤲𞤢𞥄𞤲𞤺𞤢𞤴𞤢𞤲𞤳𞤮𞥅𞤶𞤭 𞤯𞤭𞤲'
  const data = [
    ['𞤅𞤭𞥅𞤤𞤮', '𞤕𞤮𞤤𞤼𞤮', '𞤐𞤦𞤮𞥅𞤴𞤮', '𞤅𞤫𞥅𞤼𞤮', '𞤁𞤵𞥅𞤶𞤮', '𞤑𞤮𞤪𞤧𞤮'],
    ['𞤃𞤮𞤪𞤧𞤮', '𞤔𞤵𞤳𞤮', '𞤅𞤭𞤤𞤼𞤮', '𞤒𞤢𞤪𞤳𞤮', '𞤔𞤮𞤤𞤮', '𞤐𞤦𞤮𞤱𞤼𞤮'],
  ]

  return (
    <div
      className='bg-white py-12 md:py-16 text-gray-800 font-sans'
      style={{ direction: textDirection }}
      lang={currentLangCode}
    >
      <div className='container mx-auto px-4 max-w-5xl'>
        {/* Titre */}
        <h3 className='text-xl md:text-2xl font-extrabold mb-8 font-adlam text-center text-[#2c3159]'>
          {header}
        </h3>

        {/* Tableau */}
        <div className='overflow-x-auto shadow-xl rounded-2xl border-2 border-[#2c3159] bg-white'>
          <table className='min-w-full divide-y divide-[#2c3159]'>
            <tbody className='bg-white divide-y divide-[#2c3159]'>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-blue-50/50' : 'bg-white'}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className='px-4 py-4 md:px-6 md:py-5 whitespace-nowrap text-center text-xl md:text-2xl font-adlam font-semibold text-[#2c3159] border border-[#2c3159]'
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdlamTableDouzMois