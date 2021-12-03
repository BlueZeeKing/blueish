import Head from 'next/head'
import Image from 'next/image'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Blueish</title>
        <meta name="description" content="Blueish.dev home page" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <main className="bg-black h-screen flex flex-col">
        <div className="flex-grow"></div>
        <Main />
        <div className="flex-grow"></div>
      </main>

      <footer>
        <h3 className="text-gray-400 text-center absolute w-screen bottom-0 underline p-6"><a href="github.com/BlueZeeKing24">BlueZeeKing24</a></h3>
      </footer>
    </div>
  )
}

function Main(props) {
  const [reveal, setReveal] = useState(0) // 0 is waiting, 1 is disappear, 2 is new text
  const [person, setPerson] = useState('error')

  useEffect(() => {
    let timeout1 = setTimeout(() => { // 1638745200000 - Date.now()
      if (reveal == 0) {
        setReveal(reveal + 1)
      }
    }, 2000)
    let timeout2 = setTimeout(() => { // 1638745200500 - Date.now()
      if (reveal == 1) {
        setReveal(reveal + 1)
      }
    }, 2500)

    return (() => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
    })
  }, [reveal])

  useEffect(() => {
    fetch(`/api/getPerson?name=${window.localStorage.getItem('name')}`)
      .then(response => response.json())
      .then(data => {
        setPerson(data.person)
      })
  }, [])

  let classes = 'font-bold text-5xl text-gray-300 p-6 transition-all duration-700'

  if (reveal == 1) {
    classes = classes + ' opacity-0'
  } else {
    classes = classes + ' opacity-1'
  }

  let text = 'Awaiting person...'
  if (reveal == 2) {
    text = `Your person is ${person}`
  }

  return (
    <div className="text-center">
      <h1 className={classes}>{text}</h1>
    </div>
  )
}
