/**
 * Задача 1: написать функцию smoosh, которая принимает массив, "выравнивает" вложенные массивы
 * в одноуровневый массив и возвращает новый плоский массив.
 * Например:
 * smoosh([1, 2, [3, 4], 5])
 * > [1, 2, 3, 4, 5]
 * Входной массив может содержать массивы любого уровня вложенности.
 * Например: [[1, 2], [3, [4, [5]]]]
 *
 * Задача 2: написать функцию squeeze (по аналогии со smoosh) таким образом,
 * чтобы она модифицировала исходный массив, а не возвращала новый.
 *
 * Задача 3*: для функций smoosh и squeeze добавить валидацию входного параметра.
 * В случае, если на вход передан не массив функция должна выбросить исключение
 * с сообщением 'argument should be an array'.
 */

function smoosh(arr) {
  if (Array.isArray(arr)) {
    let array = [...arr];
    let arr2 = [];
    while (array.length) {
      let elem = array.pop();
      if (Array.isArray(elem)) {
        array.push(...elem);
      } else {
        arr2.push(elem);
      }
    }
    return arr2.reverse();
  } else {
    throw new Error('argument should be an array');
  }
}

function squeeze(array) {
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        array.push(...array[i]);
      }
    }
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        array.splice(i, 1);
      }
    }
  } else {
    throw new Error('argument should be an array');
  }
  array.sort();
  return array;
}

export { smoosh, squeeze };
