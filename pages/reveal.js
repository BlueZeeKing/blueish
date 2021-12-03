import Head from 'next/head'
import Image from 'next/image'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";

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
    const firebaseConfig = {
      apiKey: "AIzaSyCOk687TqUsS4aUBG8trlyRXbtz72o-6Dk",
      authDomain: "secret-santa-8382a.firebaseapp.com",
      databaseURL: "https://secret-santa-8382a-default-rtdb.firebaseio.com",
      projectId: "secret-santa-8382a",
      storageBucket: "secret-santa-8382a.appspot.com",
      messagingSenderId: "821632536011",
      appId: "1:821632536011:web:d62b7793c888ad0e34ba4e"
    };

    const app = initializeApp(firebaseConfig);

    // Get a reference to the database service
    const db = getDatabase(app);

    const dataRef = ref(db, 'reveal');

    let listener = onValue(dataRef, (snapshot) => {
      console.log(snapshot.val())
      setReveal(snapshot.val())
    });
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
