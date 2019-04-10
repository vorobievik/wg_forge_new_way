/**
 * Задание: написать построитель SQL-запросов.
 * Данный модуль должен экспортировать функцию `query`, вызов которой должен возвращать новый экземпляр объекта query.
 * Например:
 * const q1 = query();
 * const q2 = query();
 * console.log(Object.is(q1, q2)) // false
 *
 * В качестве аргументов query может передаваться имя таблицы.
 * Тогда при дальнейшем составлении запроса вызовы метода from(tableName) игнорируются.
 *
 * У возвращаемого объекта должны быть следующие методы:
 *
 * select(arg1, arg2 ... argN) - может принимать список полей для выборки.
 * Аргументы должны иметь тип String. Если ни одного аргумента не передано должны быть получены все поля таблицы
 * Например:
 * q.select().from('users')
 * > SELECT * FROM users
 * q.select('id', 'name').from('users')
 * > SELECT id, name FROM users
 *
 * from(tableName: String) - указывает из какой таблицы получать данные.
 *
 * where(fieldName: String) - служит для задания условия фильтрации.
 * При множественном вызове метода where в одном запросе условия должны объединяться через логическое "И".
 * Метод where должен возвращать объект имеющий следующие методы:
 * orWhere(fieldName: String) - делает то же самое что where, но объединяет через "ИЛИ".
 * Метод where должен возвращать объект имеющий следующие методы:
 *
 * equals(value: any) - условие равенства
 * Например: SELECT * FROM student WHERE age = 42;
 *
 * in(values: array) - позволяет определить, совпадает ли значение объекта со значением в списке
 * Например: SELECT * FROM offices WHERE city IN ('Minsk', 'Nicosia', 'Seattle');
 *
 * gt(value: any) - условие больше '>'
 * gte(value: any) - условие больше или равно '>='
 * lt(value: any) -  условие меньше '<'
 * lte(value: any) -  условие меньше или равно '<='
 * between(from: any, to: any) -  условие нахождения значения поля в заданном диапазоне:
 * SELECT * FROM products WHERE price BETWEEN 4.95 AND 9.95;
 *
 * isNull() - условие отсутствия значения у поля
 *
 * not() - служит для задания противоположного.
 * После вызова not можно вызывать только те же методы, которые использует where для сравнения.
 *
 * q.select().from('users').where('name').not().equals('Vasya')
 *
 * Вызов not не может быть вызван более одного раза подряд:
 * q.select().from('users').where('name').not().not().equals('Vasya')
 *
 * Внимание: методы сравнения не могут быть вызваны до вызова метода where()!
 *
 * Получения строчного представления сконструированного SQL-запроса должно происходить при
 * вызове метода toString() у объекта query.
 * В конце строки SQL-запроса должен быть символ ';'
 *
 * Дополнительные задания:
 *
 * 1. Добавить в сигнатуру функии query второй опциональный аргумент options типа Object.
 * Если в options есть поле escapeNames со значением true, названия полей и таблиц должны быть обёрнуты в двойные кавычки:
 *
 * const q = query({escapeNames: true});
 * q.select('name').from('people').toString()
 * > SELECT "name" FROM "people";

 * const q = query('books', {escapeNames: true});
 * q.select('title').toString()
 * > SELECT "title" FROM "books";
 *
 * 2. Добавить возможность передавать в условия методов сравнения в качестве значения экземпляр запроса query.
 *
 * const q1 = query('users');
 * const admins = q1.select('id').where('role').equals('admin');
 * const q2 = query('posts');
 * const posts = q2.select().where('author_id').in(admins);
 * posts.toString();
 * > SELECT * FROM posts WHERE author_id IN (SELECT id FROM users WHERE role = 'admin');
 *
 * 3. Реализовать функциональность создания INSERT и DELETE запросов. Написать для них тесты.
 */

export default function query(tableName) {
  let result = '';
  let name = tableName;
  let array = null

  const select = function (...arg) {
    array = arg.concat()
    if (name) {
      if (arg.length == 0) {
        result = `SELECT * FROM ${name}`
      } else {
        result = `SELECT ${arg} FROM ${name}`
      }

    } else {
      return this
    }
    return this
  }

  const from = function (nameTable) {
    if (name == undefined) {
      if (result.includes('FROM')) {
        return this
      }
      else { if (array.length == 0) {
        result = `SELECT * FROM ${nameTable}`
      } else {
        result = `SELECT ${array} FROM ${nameTable}`
      }
      return this}
     
    } else {
      return this
    }

  }

  const where = function (fieldName) {
    if (result.includes('WHERE')) {
      result = `${result} AND ${fieldName} `;
    }
 else{result = `${result} WHERE ${fieldName} `};
    const equals = function (value) {
      if (typeof value == 'string') {
        result = result+ '= \'' + value + '\''; 
          if (result.includes('NOT')) {
           result = result.replace("NOT",'')
              let a = result.indexOf('WHERE')
              let b = result.indexOf(fieldName)
              result = `${result.slice(0,(a-1)+fieldName.length)}NOT ${result.slice(b)}` 
              if (result.includes(`= \'${value}`)) {
                let index = result.indexOf(`= \'${value}`);
                result = result.slice(0,index-1) + result.slice(index)
              }
          }
      }
      else if (result.includes('NOT')) {
        result = result+ `= ${value}` ; 
        result = result.replace(" NOT",'')
           let a = result.indexOf('WHERE')
           let b = result.indexOf(fieldName)
           result = result.replace(b,'')
           result = `${result.slice(0,(a+5))} NOT ${result.slice(b )}` 
       }
       else{ result = result+ `= ${value}`}
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
      
    }
    const iN = function (array) {
      for (let i = 0; i < array.length; i++) {
        if (typeof array[i]== 'string') {
          array[i]=  '\'' + array[i] + '\''
        }
        
      }
      let str = array.join(', ');
      result = `${result}IN (${str})`
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
    }
    const gt = function (value) {
      result += `>  ${value}`
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
    }
    const gte = function (value) {
      if (typeof value == 'string') {
        result = result+ '= \'' + value + '\''; 
      result += `>=  ${value}`
    }
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
    }
    const lt = function (value) {
      result += ` <  ${value}`
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
    }
    const lte = function (value) {
      result += `<= ${value}`
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
    }
    const between = function (from, to) {
      result += `BETWEEN ${from} AND ${to}`
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
    }
    const isNull = function () {

      result += `NULL`
      if (result.includes('NOT')) {
        result = result.replace("NOT",'')
           let a = result.indexOf('WHERE')
      
           result = `${result.slice(0,(a+5))} ${fieldName} IS NOT NULL` 
       }
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
    }
    const not = function () {
      let text = `NOT `
      
      if (result.slice(-text.length)==text) {
       throw new Error("not() can't be called multiple times in a row") 
      }
       else{
        
        
        result += text }
      
       return {
        equals,
        in: iN,
        between,
        gt,
        gte,
        lt,
        lte,
        isNull,
        not
      }
    }
  
    
    return {
      equals,
      in: iN,
      between,
      gt,
      gte,
      lt,
      lte,
      isNull,
      not
    }
  }
  const orWhere = function (fieldName) {
    if (result.includes('WHERE')) {
      result = `${result} OR ${fieldName} `;
    }
 else{result = `${result} WHERE ${fieldName} `};
    const equals = function (value) {
      if (typeof value == 'string') {
        result = result+ '= \'' + value + '\''; 
          if (result.includes('NOT')) {
           result = result.replace("NOT",'')
              let a = result.indexOf('WHERE')
              let b = result.indexOf('webname')
              result = `${result.slice(0,a+5)} NOT ${result.slice(b )}` 
          }
      }
      else{ result = result + `= ${value}`}
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
      
    }
    const iN = function (array) {
      let str = array.join(', ');
      result = `${result} IN (${str})`
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
    }
    const gt = function (value) {
      if (typeof value == 'string') {
        result = result+ '> \'' + value + '\''; }
        else{ result = result+ '> ' + value }
   
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
    }
    const gte = function (value) {
      if (typeof value == 'string') {
        result = result+ '>= \'' + value + '\''; }
      
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
    }
    const lt = function (value) {
      if (typeof value == 'string') {
        result = result+ '< \'' + value + '\''; }
     
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
    }
    const lte = function (value) {
      if (typeof value == 'string') {
        result = result+ '<= \'' + value + '\''; }
     
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
    }
    const between = function (from, to) {
      result += `BETWEEN ${from} OR ${to}`
      return {
        select,
        from,
        where,
        toString,
        orWhere,
      }
    }
    const isNull = function () {
      result += `  NULL`
      return {
        select,
        from,
        where,
        toString, 
         orWhere,
      }
    }
    const not = function () {
      let text = `NOT`
      
      if (result.slice(-text.length)==text) {
       throw new Error("not() can't be called multiple times in a row") 
      }
       else{ result += text }
      
       return {
        equals,
        in: iN,
        between,
        gt,
        gte,
        lt,
        lte,
        isNull,
        not
      }
    }
  
    
    return {
      equals,
      in: iN,
      between,
      gt,
      gte,
      lt,
      lte,
      isNull,
      not
    }
  }
  const toString = function () {
    return result + ';'
  }
  return {
    select,
    from,
    where,
    toString,
    orWhere
  }
}
