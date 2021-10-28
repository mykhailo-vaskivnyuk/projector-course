const { HttpResponseError } = require('../error');
const fs = require('fs');
const { v4: createUuid } = require('uuid');
const { convertVideo } = require('../../helpers/convert-video');
const { fileTypeMap } = require('../config');

const routeUpload = (req, res) => {
    const { method, headers } = req;

    if (method !== "POST") throw new HttpResponseError(404);

    const { 'content-type': mimeType } = headers;
    const fileType = fileTypeMap[mimeType];
    if (!fileType) throw new HttpResponseError(400, 'WRONG FILE FORMAT');

    const uuid = createUuid();
    const tmpFileName = `public/tmp/${uuid}`;
    const fileName = `public/${uuid}`;
    const deleteTmpFile = (reason) => fs.unlink(tmpFileName, (e) =>
        console.log(e || `${reason}: TMP FILE DELETED`));

    const file = fs.createWriteStream(tmpFileName);
    req.pipe(file);

    req.once('data', () => {
        console.log("UPLOAD START");
    });

    req.on('error', () => {
        console.log("UPLOAD ERROR");
        throw new HttpResponseError(400, "UPLOAD ERROR");
    })

    let uploadingEnd = false;
    req.on('end', () => {
        uploadingEnd = true;
        console.log("UPLOAD END");
        convertVideo(tmpFileName, fileName, fileType, 'avi')
        .then(() => {
            deleteTmpFile("CONVERTION END");
            res.statusCode = 201;
            res.setHeader("Content-Type", "text/plain");
            res.end("FILE UPLOADED");
        })
        .catch(() => {
            deleteTmpFile("CONVERTION ERROR");
            throw new HttpResponseError(400, "CONVERTION ERROR");
        })
    });

    req.on('aborted', () => {
        if (uploadingEnd) return;
        deleteTmpFile("ABORTED");
    });
}

module.exports = { routeUpload };
