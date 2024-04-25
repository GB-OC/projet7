const sharp = require('sharp');
const fs = require('fs').promises; 
const path = require('path');

const ResizeConvertImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const inputPath = req.file.path;
  const outputPath = path.join('images', req.file.filename.replace(/\.(jpg|jpeg|png)$/, '.webp'));

  sharp(inputPath)
    .resize(206, 260) 
    .toFormat('webp')
    .toFile(outputPath)
    .then(() => {
      req.file.filename = path.basename(outputPath);

      sharp.cache(false);

      return fs.unlink(inputPath); 
    })
    .then(() => {
      console.log('Original file deleted:', inputPath);
      next();
    })
    .catch((error) => {
      console.error('Error processing or deleting image:', error);
      next(error);
    });
};

module.exports = ResizeConvertImage;