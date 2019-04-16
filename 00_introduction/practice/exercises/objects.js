/*
collect array's element to object with first letters as keys
and sorted words array as a value

Example:
['test', 'foo', 'bar', 'farm', 'trust', 'ham', 'harm'] -> {
  't': ['test', 'trust'],
  'f': ['farm', 'foo'],
  'b': ['bar'],
  'h': ['ham', 'harm'],
}
*/
export function collectByFirstLetter(...words) {
      let arr = [...words]
      let obj = {}
  let array = arr.map(w=> w[0])
  let array2=  array.filter((a,index)=>array.indexOf(a)===index)
  array2.forEach((element)=>{
      obj[element]=arr.filter(word=> word[0]==element).sort()
  })
  console.log(obj)
  return obj
  }
  


  
 

/*
Write a function which receives object and list of keys
and returns object with only keys passed in arguments.
unknown keys are ignored

Example:
({name: 'John', age: 42}, 'name') yields {name: 'John'}
*/
export  function only(obj, ...keys) {
  let arr = [...keys]
let result={}

arr.forEach((element)=>{

  for (const key in obj) {
      if (key ==element) {
         result[key]=obj[key]
      }
  }

})

return result
}

/*
Function counts words in given text.
returns an object with word as key and it's frequence as value

Note: It should ignore punctuation marks and uppercase symbols

Example:
'Awesome! Does it work? It should works' yields
{
  awesome: 1,
  test: 1,
  it: 2,
  should: 1,
  works: 1,
}
'' yields {}
*/
export function wordsCount(text) {
   let obj = {};
   let array
   if (text) {
     array = text.split(' ');
     for (let i = 0; i < array.length; i++) {
   
      let num = array[i].toLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, '')
      obj[num]= obj[num] ? obj[num] + 1 :1
         }
          return obj 
   }
   else return obj
   

  
      
   }

/*
Write a function's body which create an object for user representation
It should contains method for password validation:
password is weak if it contains only lowercase letters or only uppercase

Example:
const user = createUser('root', 'topsecret')
user.login === 'root' // true
user.password === 'topsecret' // true
user.isWeakPassword() === true
user.password = 'topSecreT'
user.isWeakPassword() === false
*/

export function createUser(login, password) {
  let obj = { 
  login: login,
  password:password,
  isWeakPassword: ()=>{
   

     if (obj.password===obj.password.toLowerCase()) {
         return true
     }
     else return false
  }
  };

  return obj
}
