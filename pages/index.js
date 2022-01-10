import Head from 'next/head'
import Image from 'next/image'

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
        <h1 className="text-gray-200 text-center font-extrabold text-5xl">blueish.dev is currently a WIP</h1>
        <div className="flex-grow"></div>
      </main>

      <footer>
        <h3 className="text-gray-400 text-center absolute w-screen bottom-0 underline p-6"><a href="github.com/BlueZeeKing24">BlueZeeKing24</a></h3>
      </footer>
    </div>
  )
}