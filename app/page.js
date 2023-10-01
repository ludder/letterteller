'use client'

import { useState, useEffect } from 'react';

export default function Home() {
  const [text, setText] = useState('plak hier de invoertekst');
  const [countedLetters, setCountedLetters] = useState();

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  useEffect
    (
      () => {
        const countLetters = () => {
          const letters = alphabet.split('').reduce((acc, letter) => {
            acc[letter] = 0;
            return acc;
          }
            , {});

          for (const char of text) {
            if (alphabet.includes(char.toLowerCase())) {
              letters[char.toLowerCase()]++;
            }
          }

          return letters;
        }

        setCountedLetters(countLetters());
      },
      [text]
    );

  return (
    <div className='p-8'>

    <div className="grid grid-cols-2 gap-4 border">

      <h1 className='text-4xl text-blue-800 mb-5'>Letterteller</h1>
      
      <main className='flex flex-col gap-4'>
        <textarea onChange={({ target }) => {
          setText(target.value);
        }}
          className='border border-blue-400 w-96 h-24 p-2'
          value={text}
        />

        <p className='text-sm italic'>
          {text.length} karakters
        </p>

        {/* <button type="button" onClick={countLetters} className='border w-48 p-4'>Tel de letters</button> */}

        <div>
          {
            countedLetters && Object.entries(countedLetters).map(([letter, count]) => (
              <span key={letter} className='text-sm inline-block px-2 font-mono'>
                <span className='font-bold inline-block pr-1'>
                  {letter.toUpperCase()}
                </span>
                <span className='italic'>
                  {count}
                </span>
              </span>
            ))
          }

        </div>
      </main>

    </div>
    
    </div>
  )
}
