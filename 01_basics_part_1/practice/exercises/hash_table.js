/* eslint-disable filenames/match-regex */
/**
 * Необходимо реализовать хеш-таблицу, в которой в значения можно записывать данные любого типа.
 * Ключом должна быть строка.
 */
function isStringFunction(value) {
  const type = typeof value
  if (type != 'string') {
    return false

  }
  return true
}

export default class HashTable {
  /**
   * в качестве "памяти" используем массив
   */
  constructor() {
    this.memory = [];
  }

  /**
   * Хеширующая функция.
   * Принимает ключ (тип строка) и возвращает уникальный адрес.
   * hashKey('abc') =>  17263
   * hashKey('xyz') => 283902
   */

  hashKey(key) {
  
      return key.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  }
  /**
   * Метод для получения данных из хеш-таблицы по ключу.
   */
  get(key) {
    return this.memory[this.hashKey(key)]
  }
  /**
   * Добавляем значение в таблицу с заданным ключом.
   */
  set(key, value) {
if ((isStringFunction(key))) {
  return this.memory[this.hashKey(key)] = value

  }
  return alert(`${key} 'is not a string'`)
}
  /**
   * Функция удаления из хеш-таблицы.
   * Принимает ключ.
   */

  remove(key) {
    return delete this.memory[this.hashKey(key)]
  }
}