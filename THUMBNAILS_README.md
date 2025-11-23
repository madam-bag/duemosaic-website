# Image Thumbnails Setup

This project uses a thumbnail system to improve performance. Smaller, compressed versions of images are used throughout the site, with full-size images only displayed in modals.

## Quick Start

**Automatically generate all thumbnails:**
```bash
npm install
npm run generate-thumbnails
```

This will create thumbnails for all images in the `public/images` folders.

## Thumbnail Structure

Thumbnails should be placed in a `thumbnails` subfolder within each project's image folder.

### Example Structure:
```
public/images/
  └── 1-_ES_House_in_Saint_Nazaire,_France/
      ├── Esma_house_car.JPG          (full-size)
      ├── PLAN.jpg                     (full-size)
      └── thumbnails/
          ├── Esma_house_car.JPG      (thumbnail)
          └── PLAN.jpg                (thumbnail)
```

## How It Works

- **Projects Page**: Uses thumbnails for project cards
- **Homepage Carousel**: Uses thumbnails for carousel slides
- **Project Detail Gallery**: Uses thumbnails for gallery items
- **Image Modal**: Uses full-size images when viewing images

## Automatic Fallback

If a thumbnail doesn't exist, the system will automatically fallback to the full-size image. However, for best performance, you should create thumbnails for all images.

## Creating Thumbnails

### Automatic Generation (Recommended)

The easiest way is to use the included script:

```bash
npm run generate-thumbnails
```

This script will:
- Scan all project folders in `public/images/`
- Create `thumbnails` subfolders automatically
- Generate optimized thumbnails (800px width, 80% quality)
- Skip images that already have thumbnails
- Handle JPG, PNG, and other common formats

### Manual Creation

You can also create thumbnails manually using image editing software or command-line tools. Recommended thumbnail size: **800px width** (maintain aspect ratio) with compression optimized for web.

### Using ImageMagick (command line):
```bash
# Navigate to project folder
cd public/images/1-_ES_House_in_Saint_Nazaire,_France/

# Create thumbnails folder
mkdir thumbnails

# Create thumbnail (800px width, 80% quality)
magick Esma_house_car.JPG -resize 800x -quality 80 thumbnails/Esma_house_car.JPG
```

### Using Python (Pillow):
```python
from PIL import Image
import os

def create_thumbnail(input_path, output_path, size=(800, 800)):
    img = Image.open(input_path)
    img.thumbnail(size, Image.Resampling.LANCZOS)
    img.save(output_path, optimize=True, quality=80)

# Example usage
create_thumbnail(
    'Esma_house_car.JPG',
    'thumbnails/Esma_house_car.JPG'
)
```

## Current Status

The code is set up to use thumbnails, but you need to create the actual thumbnail files. Until thumbnails are created, the system will fallback to full-size images.

