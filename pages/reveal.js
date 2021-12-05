import Head from 'next/head'

import React, { useState, useEffect } from 'react';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";

import Footer from '../components/footer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Secret Santa</title>
        <meta name="description" content="Secret Santa main page" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <main>
        <Main />
      </main>

      <Footer />
    </div>
  )
}

function Main(props) {
  const [reveal, setReveal] = useState(0) // 0 is waiting, 1 is disappear, 2 is new text
  const [person, setPerson] = useState('Loading')

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

    return () => listener()
  }, [reveal])

  useEffect(() => {
    fetch(`/api/getPerson?name=${window.localStorage.getItem('name')}`)
      .then(response => response.json())
      .then(data => {
        setPerson(data.person)
      })
  }, [])

  let classes = 'font-bold text-2xl md:text-5xl text-gray-300 p-6 transition-all duration-700'

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
    <div className="text-center absolute transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] w-[90vw]">
      <h1 className={classes}>{text}</h1>
    </div>
  )
}
