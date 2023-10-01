'use client'

import { useState, useEffect } from 'react';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const LetterWithCount = ({ letter, count, markColor = true }) => {
  const color = markColor
    ? count > 0 ? 'text-green-900'
      : count === 0 ? 'text-orange-400'
        : 'text-red-700'
    : 'text-blue-800'

  return (
    <span key={letter} className='inline-block px-3 font-mono w-20'>
      <span className='font-bold inline-block pr-3'>
        {letter.toUpperCase()}
      </span>
      <span className={`italic font-bold ${color}`}>
        {count}
      </span>
    </span>
  )
}

export default function Home() {
  const [text, setText] = useState('plak hier de invoertekst');
  const [countedLetters, setCountedLetters] = useState();
  const [newText, setNewText] = useState('type hier de nieuwe tekst');
  const [countedNewLetters, setCountedNewLetters] = useState();


  useEffect
    (
      () => {
        const countLetters = (text) => {
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

        setCountedLetters(countLetters(text));
        setCountedNewLetters(countLetters(newText));


      },
      [text, newText]
    );

  return (
    <div className='p-8 '>

      <h1 className='text-4xl text-blue-800 mb-5'>Letterteller</h1>

      <div className="grid grid-cols-2 gap-4 border">

        <div className='flex flex-col gap-4'>
          <textarea onChange={({ target }) => {
            setText(target.value);
          }}
            className='border border-blue-400 w-96 h-24 p-2'
            value={text}
          />

          <p className='text-sm italic'>
            {text.length} karakters
          </p>

          <div>
            {
              countedLetters && Object.entries(countedLetters).map(([letter, count]) => (
                <LetterWithCount
                  key={letter} letter={letter} count={count}
                  markColor={false}
                />
              ))
            }

          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <textarea onChange={({ target }) => {
            setNewText(target.value);
          }}
            className='border border-blue-400 w-96 h-24 p-2'
            value={newText}
          />

          <p className='text-sm italic'>
            {newText.length} karakters
          </p>

          <div>
            <p>
              Te gebruiken:
            </p>

            {
              countedNewLetters && Object.entries(countedNewLetters).map(([letter, count]) => {
                const leftOverCount = (countedLetters[letter] || 0) - count;
                return (
                  <LetterWithCount key={letter} letter={letter} count={leftOverCount} />
                )
              })
            }

          </div>
        </div>

      </div>

    </div>
  )
}
