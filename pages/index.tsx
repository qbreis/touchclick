import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useState } from 'react';
import Sprites from '../components/Sprites';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [sprites, setSprites] = useState<
    { clientX: string; clientY: string }[]
  >([]);

  const handleClick = (event: any) => {
    console.log(event);
    setSprites([
      ...sprites,
      { clientX: event.clientX, clientY: event.clientY },
    ]);
  };

  return (
    <>
      <Head>
        <title>Z</title>
        <meta name="description" content="zzzs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Sprites sprites={sprites} handleClick={handleClick} />
      </main>
    </>
  )
}
