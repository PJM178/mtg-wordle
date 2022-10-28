const cardRouter = require('express').Router()
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// download files using axios
// tutorial from: https://www.kindacode.com/article/using-axios-to-download-images-and-videos-in-node-js/
const downloadFile = async (fileUrl, downloadFolder, imageName) => {
  // Get the file name
  const fileName = path.basename(fileUrl, '?1665979200');

  // The path of the downloaded file on our machine
  const localFilePath = path.resolve(__dirname, downloadFolder, `${imageName}.svg`);
  // console.log(localFilePath)
  try {
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
    });

    const w = response.data.pipe(fs.createWriteStream(localFilePath));
    w.on('finish', () => {
      console.log('Successfully downloaded file!');
    });
  } catch (err) { 
    throw new Error(err);
  }
}; 

const testi = {
  jormanNokka: 'lintu'
}

cardRouter.post('/', async (request, response) => {
  const body = request.body
  body.forEach((set, index) => {
    setTimeout(() => {
      downloadFile(set.icon_svg_uri, '../set_images', set.id)
    }, index * 500)
  })
  console.log(body[1].icon_svg_uri)
  downloadFile(body[1].icon_svg_uri, '../set_images')
  response.json(testi)
})

module.exports = cardRouter