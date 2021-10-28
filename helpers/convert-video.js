const FF = require('fluent-ffmpeg');
const fs = require('fs');

const pathToFfmpeg = "D:\\Program Files\\ffmpeg-n4.4.1-win64-gpl-4.4\\bin\\ffmpeg.exe";

FF.setFfmpegPath(pathToFfmpeg);

const convertVideo = async (input, output, from, to) => {
    if (from === to) {
        fs.copyFile(input, output, console.log);
        return;
    }

    const command = new FF(input).inputFormat(from).outputFormat(to).output(output);
    command.on('codecData', console.log);
    command.run();

    return new Promise((resolve, reject) => {
        command.on('error', reject);
        command.on('end', resolve);
    });
}

module.exports = {
    convertVideo,
}
