import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

import { useState } from 'react';
import Sprites from '../components/Sprites';

const inter = Inter({ subsets: ['latin'] });

import { timeToPercentage, comparePercentages, compareSequences } from '../includes/functions';

import Nav from '../components/Nav';

/*
I want to save in Array getTimes lapses between key presses in milliseconds:

After 6 clicks I will get this, note that first click is not saved, as long as I only get lapses between clicks:

Array(5) [ 511, 529, 1605309, 6638, 977 ]
​
  0: 48  ◄── lapse in milliseconds between 1st and 2nd click
  1: 52  ◄── lapse in milliseconds between 2nd and 3rd click
  2: 60  ◄── lapse in milliseconds between 3rd and 4th click
  3: 240 ◄── lapse in milliseconds between 4th and 5th click
  4: 48  ◄── lapse in milliseconds between 5th and 6th click
​
length: 5

*/

/*

Saved sequences:  [71,29]
                  [14, 14, 58, 14] ─────────────────────┐
                                                        │
       │         │         │               │            │  │
0:  -  │ -       │ -       │ -             │ 48         │  │
       │         │         │               │            ▼  │
1:  -  │ -       │ -       │ 48       ┌12% │ 52       ┌13% │
       │         │         │          │    │          │    │
2:  -  │ -       │ 48      │ 52       ├13% │ 60       ├15% │
       │         │         │          │    │          │    │
3:  -  │ 48 ┌48% │ 52 ┌46% │ 60  ┌20% ├15% │ 240 ┌83% ├60% │
       │    │    │    │    │     │    │    │     │    │    │
4:  48 │ 52 └52% │ 60 └54% │ 240 └80% └60% │ 48  └17% └12% │
       │         │         │               │               │

*/

const sequences = [
    {
        name: 'Enric Gatell',
        sequence: [20, 11, 6, 19, 27, 17] // each value is % // ._..._.__._.
    },
    {
        name: 'Max',
        sequence: [14, 14, 58, 14] // ...__..
    }
];

let getTimes: any = []; // I want to save in Array getTimes lapses between key presses in miliseconds
let lastGetTime = 0; // I will need last time for click event

export default function Home() {

    const [mode, setMode] = useState('watching');


    const [sprites, setSprites] = useState<
        { clientX: string; clientY: string }[]
    >([]);

    const handleClick = (event: any) => {

        console.log('mode', mode);
        
        //console.log(event);
        const getTime = new Date().getTime(); // new getTime value
        if (lastGetTime) {
            getTimes.push(getTime - lastGetTime); // push in the lapse between last getTime and new getTime
        }
        lastGetTime = getTime; // on first click do nothing but save new getTime value
        //console.log('getTimes', getTimes);

        const compareSequencesResult = compareSequences({
            sequences: sequences,
            getTimes: getTimes
        });

        if(compareSequencesResult) console.log('compareSequencesResult', compareSequencesResult);

        setSprites([
            ...sprites,
            { clientX: event.clientX, clientY: event.clientY }
        ]);
    };

    const handleClickOnRecording = (event: any) => {
        event.stopPropagation();
        console.log('recording');
        setMode('recording');
        
    };

    return (
        <>
            <Head>
                <title>Click touch around the screen</title>
                <meta
                    name="description"
                    content="Testing UI transitional effects on touch or click around the screen."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p>mode: {mode}</p>
            <Sprites sprites={sprites} handleClick={handleClick} />
            <Nav onClickRecording={handleClickOnRecording} />
        </>
    );
}
