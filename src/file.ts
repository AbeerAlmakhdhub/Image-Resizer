import { promises as fs } from 'fs';
import path from 'path';
import imageResizer from './imageResizer'; // Image handling

// query segments
interface ImageParameters {
  imageName?: string;
  height?: string;
  width?: string;
}

export default class file {
  static imagesOriginalPath = path.resolve(__dirname, '../images/original');
  static imagesThumbPath = path.resolve(__dirname, '../images/thumb');

  /**
   * Determine image path.
   * @param {ImageParameters} params Parameters.
   * @param {string} [params.imageName] Image name.
   * @param {string} [params.height]
   * @param {string} [params.width]
   * @return {string|null} Path, if image exists, else it will be null.
   */

  /**
   * Check if an image exists
   * @param {string} [imageName=''] image name
   * @return {boolean} True if image exists, else false.
   */
  static async checkImage(imageName = ''): Promise<boolean> {
    if (!imageName) {
      return false; //does not exist, exit
    }

    return (await file.getExistngImageNames()).includes(imageName);
  }

  /**
   * Chech if certian thumb is alredy generated -- avoid redundancy
   * @param {ImageParameters} params Parameters.
   * @param {string} [params.imageName] imageName.
   * @param {string} [params.width]
   * @param {string} [params.height]
   * @return {boolean} True, if thumb exists with same dimensions, else false.
   */
  static async checkThumb(params: ImageParameters): Promise<boolean> {
    if (!params.imageName || !params.width || !params.height) {
      return false;
    }

    // Set path
    const filePath: string = path.resolve(
      file.imagesThumbPath,
      `${params.imageName}-${params.width}x${params.height}.jpg`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  static async generateThumbPath(): Promise<void> {
    try {
      await fs.open(file.imagesThumbPath);
    } catch {
      fs.mkdir(file.imagesThumbPath);
    }
  }

  /**
   * Create thumb file.
   * @param {ImageParameters} params Parameters.
   * @param {string} [params.imageName] imageName.
   * @param {string} [params.width] Desired width.
   * @param {string} [params.height] Desired height.
   * @return {string|null} Error message or null.
   */
  static async generateThumb(params: ImageParameters): Promise<string | null> {
    if (!params.imageName || !params.width || !params.height) {
      //quick quit
      //if some or all of the query segments are lost
      return null;
    }

    const filePathOriginal: string = path.resolve(
      file.imagesOriginalPath,
      `${params.imageName}.jpg`
    );
    const filePathThumb: string = path.resolve(
      file.imagesThumbPath,
      `${params.imageName}-${params.width}x${params.height}.jpg`
    );
    if (parseInt(params.width) > 0 && parseInt(params.height) > 0) {
      console.log(
        `image ${filePathThumb}'s thumb was created in dimensions of w${params.width}xh${params.height} `
      );
    } else {
      console.log(
        `Attempt to create thumb for image ${filePathThumb} has failed`
      );
    }

    // Resize original image and store as thumb in image/thumb
    return await imageResizer({
      sourceImagePath: filePathOriginal,
      targetImagePath: filePathThumb,
      height: parseInt(params.height),
      width: parseInt(params.width),
    });
  }

  static async getImagePath(params: ImageParameters): Promise<string | null> {
    if (!params.imageName) {
      //image was not found, or do not exist
      return null;
    }
    let imagePathTemp: string;
    if (params.height && params.width) {
      imagePathTemp = path.resolve(
        file.imagesThumbPath,
        `${params.imageName}-${params.width}x${params.height}.jpg`
      );
    } else {
      imagePathTemp = path.resolve(
        file.imagesOriginalPath,
        `${params.imageName}.jpg`
      );
    }
    const imagePath: string = imagePathTemp;
    // if it exsits already with the same parameters, avoid redundancy and use it
    try {
      await fs.access(imagePath);
      return imagePath;
    } catch {
      return null;
    }
  }

  /**
   * Dispaly provided images
   * @return {string[]} list of existing images.
   */
  static async getExistngImageNames(): Promise<string[]> {
    try {
      // get all images in images/original
      return (await fs.readdir(file.imagesOriginalPath)).map(
        (imageName: string): string => imageName.split('.')[0] //string.split([separator][, limit]);
      );
    } catch {
      return []; //No images provided
    }
  }
}
