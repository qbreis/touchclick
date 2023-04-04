import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useState } from 'react';
import Sprites from '../components/Sprites';

const inter = Inter({ subsets: ['latin'] });

import { timeToPercentage, comparePercentages } from '../includes/functions'


/*
I want to save in Array getTimes lapses between key presses in milliseconds:

After 6 clicks I will get this, note that first click is not saved, as long as I only get lapses between clicks:

Array(5) [ 511, 529, 1605309, 6638, 977 ]
​
  0: 511        ◄── lapse in milliseconds between 1st and 2nd click
  1: 529        ◄── lapse in milliseconds between 2nd and 3rd click
  2: 1605309    ◄── lapse in milliseconds between 3rd and 4th click
  3: 6638       ◄── lapse in milliseconds between 4th and 5th click
  4: 977        ◄── lapse in milliseconds between 5th and 6th click
​
length: 5

*/

/*

  0: -    -              -

  1: -    -              -

  2: -    -             48  .
                            |
  3: -    48 ─┬► 48%    52 ─┬► 46%
              │             │
  4: 48   52 ─┴► 52%    60 ─┴► 54%


*/

/*

  │  0  │  1  │  2  │  3  │  4  │  5  │
  ├─────┼─────┼─────┼─────┼─────┼─────┤
  │     │     │     │     │     │ 48  │   lapse in milliseconds between 1st and 2nd click
  ├─────┼─────┼─────┼─────┼─────┼─────┤
  │     │     │     │     │ 48  │ 52  │   lapse in milliseconds between 2nd and 3rd click
  │     │     │     │     │ ├─────┤
                            ▼     ▼ 
                           48%   52%

  │     │     │     │     │  48%│  52%│
  ├─────┼─────┼─────┼─────┼─────┼─────┤

*/

const sequences = [
  {
    name: 'Enric Gatell',
    sequence: [20, 11, 6, 19, 27, 17], // each value is % // ._..._.__._.
  },
  {
    name: 'Max',
    sequence: [14, 14, 58, 14], // ...__..
  },
];

let getTimes: any = []; // I want to save in Array getTimes lapses between key presses in miliseconds
let lastGetTime = 0; // I will need last time for click event

export default function Home() {
  const [sprites, setSprites] = useState<
    { clientX: string; clientY: string }[]
  >([]);

  const handleClick = (event: any) => {
    //console.log(event);
    const getTime = new Date().getTime(); // new getTime value
    if (lastGetTime) {
      getTimes.push(getTime - lastGetTime); // push in the lapse between last getTime and new getTime
    }
    lastGetTime = getTime; // on first click do nothing but save new getTime value
    console.log('getTimes', getTimes);

    sequences.forEach(function (value, index) { // for each sequence object
      console.log(value.sequence.length, getTimes.length);
      if(value.sequence.length <= getTimes.length){ // only if sequence length is less or equal to lapses saved until now
        console.log('search sequence into last getTimes ('+index+')');
        console.log(
          value.sequence, // sequence with each vlaue correesponding to lapse in percentage
          getTimes.slice(getTimes.length - value.sequence.length), // last lapses (in milliseconds) saved with same length than sequence
          timeToPercentage( // will return last lapses saved with same length than sequence IN PERCENTAGE
            getTimes.slice(getTimes.length - value.sequence.length) // last lapses (in milliseconds) saved with same length than sequence
          )
          
        );

        if(
            comparePercentages(
              timeToPercentage( // will return last lapses saved with same length than sequence IN PERCENTAGE
              getTimes.slice(getTimes.length - value.sequence.length) // last lapses (in milliseconds) saved with same length than sequence
            ),
            value.sequence // sequence with each vlaue correesponding to lapse in percentage
          )
        )console.log('xxx--- COINCIDENCE ---xxx');else console.log('NOT COINCIDENCE');
        console.log('------------------------------');
      }
    });


    setSprites([
      ...sprites,
      { clientX: event.clientX, clientY: event.clientY },
    ]);
  };

  return (
    <>
      <Head>
        <title>Click touch around the screen</title>
        <meta name="description" content="Testing UI transitional effects on touch or click around the screen." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Sprites sprites={sprites} handleClick={handleClick} />
      </main>
    </>
  )
}
