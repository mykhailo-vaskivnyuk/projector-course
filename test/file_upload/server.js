let http = require('http');
let path = require('path');
let fs = require('fs');

process.chdir('./test/file_upload');
console.log('DIR:', process.cwd());


let uploads = Object.create(null);

function onUpload(req, res) {

  let fileId = req.headers['x-file-id'];
  let startByte = +req.headers['x-start-byte'];

  if (!fileId) {
    res.writeHead(400, "No file id");
    res.end();
  }
  
  let filePath = path.join(__dirname, fileId);
  console.log('FILE PATH:', filePath);
  
  // инициируем новую загрузку
  if (!uploads[fileId]) uploads[fileId] = {};
  let upload = uploads[fileId];
  
  console.log("bytesReceived:" + upload.bytesReceived + " startByte:" + startByte);

  let fileStream;

  // если стартовый байт 0 или не указан - создаём новый файл, иначе проверяем размер и добавляем данные к уже существующему файлу
  if (!startByte) {
    upload.bytesReceived = 0;
    fileStream = fs.createWriteStream(filePath, {
      flags: 'w'
    });
    console.log("New file created: " + filePath);
  } else {
    // we can check on-disk file size as well to be sure
    if (upload.bytesReceived != startByte) {
      res.writeHead(400, "Wrong start byte");
      res.end(upload.bytesReceived);
      return;
    }
    // добавить к существующему файлу
    fileStream = fs.createWriteStream(filePath, {
      flags: 'a'
    });
    console.log("File reopened: " + filePath);
  }


  req.on('data', function(data) {
    upload.bytesReceived += data.length;
    console.log("bytes received", upload.bytesReceived);
  });

  // сохранить тело запроса в файл
  req.pipe(fileStream);

  // когда обработка запроса завершена и все данные записаны
  fileStream.on('close', function() {
    if (upload.bytesReceived == +req.headers['x-file-size']) {
      console.log("Upload finished");
      delete uploads[fileId];

      // мы можем сделать что-то ещё с загруженным файлом

      res.end("Success " + upload.bytesReceived);
    } else {
      // соединение потеряно, остаются незавершённые загрузки
      console.log("File unfinished, stopped at " + upload.bytesReceived);
      res.end();
    }
  });

  // в случае ошибки ввода/вывода завершаем обработку запроса
  fileStream.on('error', function(err) {
    console.log("fileStream error");
    res.writeHead(500, "File error");
    res.end();
  });

}

function onStatus(req, res) {
  let fileId = req.headers['x-file-id'];
  let upload = uploads[fileId];
  console.log("onStatus fileId:", fileId, " upload:", upload);
  if (!upload) {
    res.end("0")
  } else {
    res.end(String(upload.bytesReceived));
  }
}

function accept(req, res) {
  if (req.url == '/status') {
    console.log("STATUS");
    onStatus(req, res);
  } else if (req.url == '/upload' && req.method == 'POST') {
    console.log("UPLOAD");
    onUpload(req, res);
  } else {
    const fileName = req.url.split('/').pop();
    console.log("STATIC", fileName);
    try {
        const fileContent = fs.readFileSync(fileName, 'utf-8');
        res.end(fileContent);
        return;
    } catch (e) {
        console.log(e.message);
    }
    res.end("NOT FOUND");
    // fileServer.serve(req, res);
  }

}

// -----------------------------------

if (!module.parent) {
  http.createServer(accept).listen(3000, '127.0.0.1');
  console.log('Server listening at port 8080');
} else {
  exports.accept = accept;
}
