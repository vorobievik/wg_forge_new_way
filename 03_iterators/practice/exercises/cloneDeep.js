/**
 * Реализовать функцию cloneDeep которая копирует объекты по значению с любой глубиной вложенности
 */
export default function cloneDeep(object) {
let obj = {}
for (const key in object) {
  if (typeof object[key] == 'object' ) {
   obj[key] = cloneDeep(object[key])
  
}
else { obj[key]= object[key]}
}
return obj
}