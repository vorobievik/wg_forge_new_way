/**
 * Задание: написать функцию sleep, которая приостанавливает работу потока на
 * время переданное в аргументе. Время задаётся в секундах с точностью до 1 сек.
 * Если передан не валидный аргумент функция должна сразу завершить своё
 * выполнение и вернуть undefined.
 */

export default function sleep(s) {
  if (typeof s != 'number' || s < 0 || s == null || Number.isInteger(s) != true) {
    return undefined;
  }

  const now = Date.now();
  const timeWithDelay = now + s * 1000;

  while ( now< timeWithDelay) {
    let timeEnd = Date.now();
    if (timeEnd === timeWithDelay) {
      return;
    }
    
  }
}
