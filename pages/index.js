import Head from 'next/head'
import Image from 'next/image'

import React, { useState } from 'react';
import { useRouter } from 'next/router'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Blueish</title>
        <meta name="description" content="Blueish.dev home page" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <main>
        <Input />
      </main>

      <footer>
        <h3 className="text-gray-400 text-center absolute w-screen bottom-0 underline p-6"><a href="github.com/BlueZeeKing24">BlueZeeKing24</a></h3>
      </footer>
    </div>
  )
}

function Input(props) {
  const [value, changeValue] = useState('')
  const router = useRouter()

  //router.prefetch('/reveal')

  function changeHandler(e) {
    changeValue(e.target.value)
  }

  function clickHandler() {
    console.log('click')

    window.localStorage.setItem('name', value)
    router.push('/reveal')
  }

  return (
    <div className="text-center absolute transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%]">
      <h1 className="font-bold text-2xl md:text-5xl text-gray-300 p-6">Enter your first name: </h1>
      <input type="text" value={value} onChange={changeHandler} className="max-w-[95vw] p-4 font-bold text-3xl md:text-5xl bg-black bg-opacity-0 text-gray-300 border-gray-500 focus:border-gray-300 border-2 outline-none focus:outline-none p-6 motion-safe:hover:p-8 transition-all duration-500"></input>
      <br />
      <button className="m-4 font-bold text-2xl md:text-5xl bg-gray-300 bg-opacity-0 focus:bg-opacity-100 text-gray-300 focus:text-black border-gray-500 focus:border-gray-300 border-2 outline-none focus:outline-none p-6 motion-safe:hover:p-8 motion-reduce:hover:border-white transition-all duration-500" onClick={clickHandler}>Continue</button>
    </div>
  )
}
