## **Домашнє завдання:**

Даны следующие куски кода:

```jsx
console.log('A');
while(true) {}
process.nextTick(() => console.log('B'));
setTimeout(() => console.log('C'));
```
```
A
```
**рядок коду ```while(true)``` блокує виконання ```event loop```.
```call stack``` не звільняється і наступні задачі не виконуються,
тому наступні рядки коду ніколи не виконаються.**
 

```jsx
fs.readFile('test.txt', () => {
  setTimeout(() => console.log('A'), 0);
  setImmediate(() => console.log('B'));
});
```
```
B
A
```
**```callback fs.readFile``` виконується на фазі ```poll```,
після якої виконується фаза ```check```.
А ```setImmediate's callback``` виконується саме на цій фазі.**


```jsx
setTimeout(() => {
  console.log('A');
  Promise.resolve()
	  .then(() => console.log('B'))
	  .then(() => console.log('C'));
}, 0)

setTimeout(() => {
  console.log('D')
}, 0);
```
```
A
B
C
D
```
**```setTimeout's callback``` - ```makrotask```.
Після завершення виконання ```makrotask``` виконується вся ```mikrotask queue```.
```mikrotask``` додана на цій фазі виконується також на цій фазі,
оскільки попадає в цю ж ```mikrotask queue```.**


```jsx
setTimeout(() => console.log('A'), 0);
process.nextTick(() => console.log('B'));
console.log('C');
```
```
C
B
A
```
**Спочатку виконується синхронний код (```makrotask```).
Після завершення виконання кожної ```makrotask``` і звільнення ```call stack```
виконуються всі задачі з ```mikrotask queue```, в яку попадають ```nextTick's callbacks```.**


Результат домашней работы - вывод консоли (постарайтесь не запускать код, а написать вывод самостоятельно) и объяснение в свободном формате почему вывод именно такой (применяя информацию из лекции)

⏰ **Deadline:**
22.10.2021 22:00