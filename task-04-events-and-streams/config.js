const host = "127.0.0.1";
const port = 3000;
const baseUrl = `http://${host}:${port}`;

const fileTypeMap = {
    'video/mp4': 'mp4',
    'video/mov': 'mov',
    'video/avi': 'avi',
}

module.exports = {
    host,
    port,
    baseUrl,
    fileTypeMap,
};
