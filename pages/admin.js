import Head from 'next/head'
import Image from 'next/image'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Blueish</title>
        <meta name="description" content="Blueish.dev home page" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <main>
        <Main />
      </main>

      <footer>
        <h3 className="text-gray-400 text-center absolute w-screen bottom-0 underline p-6"><a href="github.com/BlueZeeKing24">BlueZeeKing24</a></h3>
      </footer>
    </div>
  )
}

function Main(props) {
  function clickHandler() {
    console.log('click')
  }

  const [reveal, setReveal] = useState(0) // 0 is waiting, 1 is disappear, 2 is new text
  const [person, setPerson] = useState('Loading')
  const [user, setUser] = useState(null)

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
    const auth = getAuth();

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        setUser(user)

        console.log(user.displayName.split(' ')[0])
        fetch(`/api/getPerson?name=${user.displayName.split(' ')[0]}`)
          .then(response => response.json())
          .then(data => {
            setPerson(data.person)
          })
      }).catch((error) => {
        console.log(error)
      });
  }, [])

  let classes = 'font-bold text-xl md:text-4xl text-gray-300 p-6 transition-all duration-700'

  if (reveal == 1) {
    classes = classes + ' opacity-0'
  } else {
    classes = classes + ' opacity-1'
  }

  let text = 'Awaiting person...'
  if (reveal == 2) {
    text = `Your person is ${person}`
  }

  function handleRandomize() {
    fetch(`/api/secretSanta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify({
          uid: user.uid
        })
      },
    })
      .then((response) => {
        console.log(response.ok)
      })
  }

  function handleStart() {

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

    set(ref(db, 'reveal'), 1);

    setTimeout(() => {
      set(ref(db, 'reveal'), 2);
    }, 1500)
  }

  return (
    <div className="text-center absolute transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] w-[90vw]">
      <h1 className="font-bold text-2xl md:text-5xl text-gray-300 p-6 transition-all duration-700">Admin Page</h1>
      <h1 className={classes}>{text}</h1>
      <button className="m-4 font-bold text-xl md:text-2xl bg-gray-300 bg-opacity-0 focus:bg-opacity-100 text-gray-300 focus:text-black border-gray-500 focus:border-gray-300 hover:border-white border-2 outline-none focus:outline-none p-6 transition-all duration-500 w-60" onClick={handleStart}>Start</button>
      <button className="m-4 font-bold text-xl md:text-2xl bg-gray-300 bg-opacity-0 focus:bg-opacity-100 text-gray-300 focus:text-black border-gray-500 focus:border-gray-300 hover:border-white border-2 outline-none focus:outline-none p-6 transition-all duration-500 w-60" onClick={handleRandomize}>Randomize</button>
    </div>
  )
}
