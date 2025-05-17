const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imageDirectory = path.join(process.cwd(), 'public', 'images');
const optimizedDirectory = path.join(imageDirectory, 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDirectory)) {
  fs.mkdirSync(optimizedDirectory, { recursive: true });
}

// Get all images in the images directory
const processImage = async (filePath) => {
  const fileName = path.basename(filePath);
  const outputPath = path.join(optimizedDirectory, fileName);
  const extension = path.extname(filePath).toLowerCase();

  // Skip already optimized images
  if (filePath.includes('optimized')) {
    return;
  }

  try {
    console.log(`Optimizing: ${fileName}`);
    
    if (extension === '.png') {
      await sharp(filePath)
        .png({ quality: 80, compressionLevel: 9 })
        .resize({ width: 1200, withoutEnlargement: true })
        .toFile(outputPath);
    } else if (extension === '.jpg' || extension === '.jpeg') {
      await sharp(filePath)
        .jpeg({ quality: 80 })
        .resize({ width: 1200, withoutEnlargement: true })
        .toFile(outputPath);
    } else if (extension === '.webp') {
      await sharp(filePath)
        .webp({ quality: 80 })
        .resize({ width: 1200, withoutEnlargement: true })
        .toFile(outputPath);
    }
    
    // Get file sizes
    const originalSize = fs.statSync(filePath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savingsPercent = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    console.log(`✅ Optimized ${fileName}: ${(originalSize / 1024).toFixed(2)} KB → ${(optimizedSize / 1024).toFixed(2)} KB (${savingsPercent}% savings)`);
  } catch (error) {
    console.error(`❌ Error optimizing ${fileName}:`, error);
  }
};

const processDirectory = async (directory) => {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    
    // If it's a directory, process it recursively (but skip 'optimized' directory)
    if (fs.statSync(filePath).isDirectory() && !filePath.includes('optimized')) {
      await processDirectory(filePath);
    } else if (fs.statSync(filePath).isFile()) {
      // Check if it's an image
      const extension = path.extname(filePath).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(extension)) {
        await processImage(filePath);
      }
    }
  }
};

// Start processing
(async () => {
  console.log('🔍 Starting image optimization...');
  await processDirectory(imageDirectory);
  console.log('✨ Image optimization complete! Optimized images are in public/images/optimized');
})(); 