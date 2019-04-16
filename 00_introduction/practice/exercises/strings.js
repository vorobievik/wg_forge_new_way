/*
write a function's body that concat all passed strings to one and returns it
*/
export function concat(...strings) {
  let string = [...strings]
let sumString = string.reduce((sum,current)=>{
  return sum + current
},'')
return sumString
}

/*
write a function's body that returns string
that contains element of initial strings with odd indexes

Example:
'abcd' -> 'ac'
'' -> ''
'test' -> 'ts'
*/
export  function oddElements(string) {
  let str= ''
  for (let i = 0; i < string.length; i=i+2) {
  
     str += string[i]
   }
   return str

}

/*
write a function's body that returns words count in passed string

Example:
'abcd' -> 1
'' -> 0
'foo bar' -> 2

Note: String has .split(separator) method where seprator is another string
*/
export function wordsCount(string) {

  let strArray = string.split(' ');
  for (let i = 0; i < strArray.length; i++) {
    if (strArray[i].length==0) {
      strArray.splice(strArray.indexOf(strArray[i]),1)
    }
    
  }
  return strArray.length
}
