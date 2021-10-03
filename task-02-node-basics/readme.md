## **Домашнє завдання:**

Основываясь на простейшем приложении:

```jsx
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

реализовать возможность разного ответа на GET c разными путями (path). Ключевой объект - `req`

- `/hello`
    - Ответ - "Hello, world", status code
- `/hello?name=%SOME_NAME%`
    - Ответ - "Hello, %SOME_NAME%", status code
- `/goodbye`
    - Ответ - "Goodbye", status code
- `/goodbye?name=%SOME_NAME%`
    - Ответ - "Goodbye, %SOME_NAME%", status code
- Other path, other methods
    - Ответ - status code 404

Результат работы - репозиторий на github.

Поради: 
Для парсинга query string советую использовать стандартную библиотеку `url`

⏰ **Deadline:** 
08.10.2021 22:00