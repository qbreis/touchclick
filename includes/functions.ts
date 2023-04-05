import PropTypes from 'prop-types';

/*
Giving an array with n lapses in milliseconds, it returns the corresponding array with n lapses in percentages.
For example:
timeToPercentage([44, 66, 88, 22])
will return:
[20, 30, 40, 10]
@return {Array}
*/

export function timeToPercentage(thisArray: any) {
    const result: any = [];

    thisArray.forEach(function (value: any) {
        result.push(
            (value * 100) /
                thisArray.reduce(function (a: any, b: any) {
                    return a + b;
                }, 0)
        );
    });

    return result;
}

export function comparePercentages(props: any) {
    let sequencesFound = 0;
    props.array1.forEach(function (value: any, index: any) {
        // console.log(value, array2[index]);
        if (value && props.array2[index]) {
            if (
                value > props.array2[index] - 5 &&
                value < props.array2[index] + 5
            ) {
                sequencesFound++;
            }
        }
    });
    // console.log(array1.length+' --- '+sequencesFound);
    return props.array1.length === sequencesFound;
}

comparePercentages.propTypes = {
    array1: PropTypes.array.isRequired,
    array2: PropTypes.array.isRequired
};

export function compareSequences(props: any) {
    let result = '';
    props.sequences.forEach(function (value: any, index: any) {
        if (!result) {
            // for each sequence object
            //console.log(value.sequence.length, props.getTimes.length);
            if (value.sequence.length <= props.getTimes.length) {
                // only if sequence length is less or equal to lapses saved until now
                /*
                console.log(
                    'search sequence into last getTimes (' + index + ')'
                );
                */
                /*
                console.log(
                    value.sequence, // sequence with each vlaue correesponding to lapse in percentage
                    props.getTimes.slice(
                        props.getTimes.length - value.sequence.length
                    ), // last lapses (in milliseconds) saved with same length than sequence
                    timeToPercentage(
                        // will return last lapses saved with same length than sequence IN PERCENTAGE
                        props.getTimes.slice(
                            props.getTimes.length - value.sequence.length
                        ) // last lapses (in milliseconds) saved with same length than sequence
                    )
                );
                */

                if (
                    comparePercentages({
                        array1: timeToPercentage(
                            // will return last lapses saved with same length than sequence IN PERCENTAGE
                            props.getTimes.slice(
                                props.getTimes.length - value.sequence.length
                            ) // last lapses (in milliseconds) saved with same length than sequence
                        ),
                        array2: value.sequence // sequence with each vlaue correesponding to lapse in percentage
                    })
                ) {
                    result = value;
                    //console.log('xxx--- COINCIDENCE ---xxx');
                }/* else {
                    console.log('NOT COINCIDENCE');
                }*/
                //console.log('------------------------------');
            }
        }
    });
    return result;
}

compareSequences.propTypes = {
    sequences: PropTypes.array.isRequired,
    getTimes: PropTypes.array.isRequired
};
