import Head from 'next/head'

import Footer from '../components/footer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>blueish.dev</title>
        <meta name="description" content="Secret Santa main page" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <main className="bg-black h-screen flex flex-col">
        <div className="flex-grow"></div>
        <h1 className="text-gray-200 text-center font-extrabold text-5xl">blueish.dev is currently a WIP</h1>
        <div className="flex-grow"></div>
      </main>

      <Footer />
    </div>
  )
}

