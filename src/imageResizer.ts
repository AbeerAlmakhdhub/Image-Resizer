import sharp from 'sharp';

interface sharpResize {
  sourceImagePath: string;
  targetImagePath: string;
  height: number;
  width: number;
}
/**
 * @param {sharpResizeParams} params Parameters.
 * @param {string} params.sourceImage Source image path.
 * @param {string} params.targetImage Target Image path.
 * @param {number} params.height New height.
 * @param {number} params.width New width.

 * @return {string|null} if there is an error msg, otherwise will be null
 */

const imageResizer = async (params: sharpResize): Promise<string | null> => {
  try {
    await sharp(params.sourceImagePath)
      .resize(params.width, params.height)
      .toFormat('jpeg')
      .toFile(params.targetImagePath);
    return null; // success
  } catch {
    return (
      '<div style=" font-weight:bold;' +
      'background:LavenderBlush;' +
      'color:CornflowerBlue;' +
      'margin: auto; ' +
      'width: 60%;' +
      'border: 5px solid lightpink;' +
      'padding: 10px;">Invalid path</div>'
    );
  }
};

export default imageResizer;
