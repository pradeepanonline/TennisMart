const axios = require('axios');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://images.pexels.com/photos/159358/tennis-ball-sport-game-159358.jpeg?auto=compress&w=800',
    filename: 'balls1.jpg',
    description: 'Tennis balls on court'
  },
  {
    url: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&w=800',
    filename: 'shoes1.jpg',
    description: 'Tennis shoes'
  },
  {
    url: 'https://images.pexels.com/photos/159358/tennis-ball-sport-game-159358.jpeg?auto=compress&w=800',
    filename: 'racket1.jpg',
    description: 'Tennis racket'
  },
  {
    url: 'https://images.pexels.com/photos/159358/tennis-ball-sport-game-159358.jpeg?auto=compress&w=800',
    filename: 'accessory1.jpg',
    description: 'Tennis accessories'
  }
];

async function downloadImage(url, filename) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(path.join(__dirname, 'public', 'images', filename));
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error.message);
  }
}

async function downloadAllImages() {
  // Create images directory if it doesn't exist
  const imagesDir = path.join(__dirname, 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  console.log('Downloading images...');
  for (const image of images) {
    console.log(`Downloading ${image.filename}...`);
    await downloadImage(image.url, image.filename);
  }
  console.log('All images downloaded successfully!');
}

downloadAllImages().catch(console.error); 