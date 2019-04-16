/**
 * Реализовать метод deepMerge для рекурсивного слияния собственных и унаследованных перечислимых
 * строковых свойств исходного объекта в целевой объект.
 * Свойства исходного объекта, которые разрешаются в undefined, пропускаются,
 * если свойство существует в целевом объекте.
 * Свойства Array и plain Object типа рекурсивно объединяются, свойства других типов из исходного объекта
 * переписывают свойства в объекте назначения либо добавляются если их нету в объекте назначения
 *
 * Пример:
 *
 * const destinationObject = {
 *   students: [{ name: 'Unit 1' }, { name: 'Unit 2'}],
 *   label: 'backend',
 *   count: 1
 * };
 *
 * const sourceObject = {
 *  students: [{ surname: 'Forge 1' }, { surname: 'Forge 2'}],
 *  label: 'frontend'
 * };
 *
 * deepMerge(destinationObject, sourceObject);
 * // => {
 * //       students: [{ name: 'Unit 1', surname: 'Forge 1' }, { name: 'Unit 2', surname: 'Forge 2' }],
 * //       label: 'frontend',
 * //       count: 1
 * //    }
 */
export default function deepMerge(destinationObject, sourceObject) {
    
  for (const key in sourceObject) {
console.log(sourceObject[key])
console.log('dest',destinationObject[key])

    if (Array.isArray(destinationObject[key]) && Array.isArray(sourceObject[key]) ) {
      for (const value in sourceObject[key]) {
        if (typeof sourceObject[key]=='object' && typeof destinationObject[key]== 'object') {
          deepMerge(destinationObject[key][value], sourceObject[key][value])
        }
      } 
    }
    else { destinationObject[key]= sourceObject[key] }
  }
  return destinationObject
  }
