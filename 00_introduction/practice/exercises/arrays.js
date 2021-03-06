/*
Given a list of strings, return the count of the number of
strings where the string length is 2 or more and the first
and last chars of the string are the same.

['abc', 'aa', 'bb'] yields 2
*/

export function matchEnds(words) {
  let array = words.filter((word)=>{
    return word.length>=2 && word[0]===word[word.length-1]
  })
 return array.length
  }

/*
Given an array of numbers, return new array where
first element is diffrence between maximum and minimum of passed array
last element is sum of minimum and maximum
and passed array in  center
[1, 2, 3] yields [2, 1, 2, 3, 4]
[5, 2, 14] yields [12, 5, 2, 14, 19]
*/
export function addFirstAndLast(numbers) {
  let array =[];
  let min = numbers[0];
  let max= numbers[0];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i]<min) {
      min =numbers[i]
    }        
  } 
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i]>max) {
      max =numbers[i] 
    }        
  }
 return array = [max-min,...numbers, max+min] 

}

/*
Given a list of strings, return a list with the strings
in sorted order, except group all the strings that begin with 'x' first.
e.g. ['mix', 'xyz', 'apple', 'xanadu', 'aardvark'] yields
['xanadu', 'xyz', 'aardvark', 'apple', 'mix']
Hint: this can be done by making 2 lists and sorting each of them
before combining them.
*/
export function xLetterFirst(words) {
  let arrayContainX= words.filter((word)=> word[0]=='x')
  let arrayWithoutX= words.filter((word)=> word[0]!='x')
  let compareNumeric = (a,b)=>{
   if (a > b) return 1;
   if (a < b) return -1;
  }
  arrayContainX.sort(compareNumeric);
  arrayWithoutX.sort(compareNumeric);
  const array = [...arrayContainX,...arrayWithoutX]
   return array
 
 }

/*
Given a list of non-empty arrays, return a list sorted in increasing
order by the last element in each tuple.
e.g. [[1, 7], [1, 3], [3, 4, 5], [2, 2]] yields
[[2, 2], [1, 3], [3, 4, 5], [1, 7]]
*/
export function  sortByLast(nestedArrays) {

  let compareNumeric= (a,b)=>{
    return a[a.length-1]- b[b.length-1]
  }

  for (let i = 0; i < nestedArrays.length; i++) {
   if (nestedArrays[i].length==0) {
    return alert('обнаружен пустой массив')
   }   
  }
  let array = nestedArrays.sort(compareNumeric)
return array

}
