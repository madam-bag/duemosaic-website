const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const THUMBNAIL_WIDTH = 800;
const THUMBNAIL_QUALITY = 80;

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG', '.webp', '.WEBP'];

/**
 * Check if file is an image
 */
function isImageFile(filename) {
  const ext = path.extname(filename);
  return IMAGE_EXTENSIONS.includes(ext);
}

/**
 * Generate thumbnail for an image
 */
async function generateThumbnail(imagePath, thumbnailPath) {
  try {
    // Check if thumbnail already exists
    if (fs.existsSync(thumbnailPath)) {
      console.log(`  ✓ Thumbnail already exists: ${path.basename(thumbnailPath)}`);
      return true;
    }

    // Get image metadata
    const metadata = await sharp(imagePath).metadata();
    
    // Skip if image is already small enough
    if (metadata.width && metadata.width <= THUMBNAIL_WIDTH) {
      console.log(`  ⊘ Image already small (${metadata.width}px): ${path.basename(imagePath)}`);
      // Still create a compressed copy
      await sharp(imagePath)
        .jpeg({ quality: THUMBNAIL_QUALITY, mozjpeg: true })
        .toFile(thumbnailPath);
      return true;
    }

    // Generate thumbnail
    await sharp(imagePath)
      .resize(THUMBNAIL_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ 
        quality: THUMBNAIL_QUALITY, 
        mozjpeg: true 
      })
      .toFile(thumbnailPath);

    console.log(`  ✓ Created thumbnail: ${path.basename(thumbnailPath)}`);
    return true;
  } catch (error) {
    console.error(`  ✗ Error creating thumbnail for ${path.basename(imagePath)}:`, error.message);
    return false;
  }
}

/**
 * Process a directory and create thumbnails for all images
 */
async function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const thumbnailsDir = path.join(dirPath, 'thumbnails');
  
  // Create thumbnails directory if it doesn't exist
  if (!fs.existsSync(thumbnailsDir)) {
    fs.mkdirSync(thumbnailsDir, { recursive: true });
    console.log(`Created thumbnails directory: ${path.basename(dirPath)}/thumbnails`);
  }

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  for (const entry of entries) {
    // Skip thumbnails directory and non-image files
    if (entry.isDirectory() || !isImageFile(entry.name)) {
      continue;
    }

    const imagePath = path.join(dirPath, entry.name);
    const thumbnailPath = path.join(thumbnailsDir, entry.name);

    const result = await generateThumbnail(imagePath, thumbnailPath);
    if (result) {
      processed++;
    } else {
      errors++;
    }
  }

  return { processed, skipped, errors };
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️  Starting thumbnail generation...\n');
  console.log(`Images directory: ${IMAGES_DIR}\n`);

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Error: Images directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const projectDirs = fs.readdirSync(IMAGES_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(IMAGES_DIR, entry.name));

  let totalProcessed = 0;
  let totalErrors = 0;

  for (const projectDir of projectDirs) {
    const projectName = path.basename(projectDir);
    console.log(`Processing: ${projectName}`);
    
    const { processed, errors } = await processDirectory(projectDir);
    totalProcessed += processed;
    totalErrors += errors;
    console.log('');
  }

  console.log('✨ Thumbnail generation complete!');
  console.log(`   Processed: ${totalProcessed} images`);
  if (totalErrors > 0) {
    console.log(`   Errors: ${totalErrors} images`);
  }
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

