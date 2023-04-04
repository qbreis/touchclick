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

export function comparePercentages(array1: any, array2: any) {
    let sequencesFound = 0;
    array1.forEach(function (value: any, index: any) {
      // console.log(value, array2[index]);
      if (value && array2[index]) {
        if (value > array2[index] - 5 && value < array2[index] + 5)
          sequencesFound++;
      }
    });
    // console.log(array1.length+' --- '+sequencesFound);
    return array1.length === sequencesFound;
  }