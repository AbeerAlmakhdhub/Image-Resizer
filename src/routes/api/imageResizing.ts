import express from 'express';
import file from './../../file';

const images: express.Router = express.Router();

//Request query parameters
interface ImageParameters {
  imageName?: string;
  width?: string;
  height?: string;
}

/**
 * @param {ImageParameters} // image name, height and width if provided
 * @return {string|null}
 */
const isImageAccessable = async (
  query: ImageParameters
): Promise<string | null> => {
  // Check if requested image exists
  if (!(await file.checkImage(query.imageName))) {
    const imageNames: string = (await file.getExistngImageNames()).join(', ');
    return (
      '<div style=" font-weight:bold;' +
      'background:LavenderBlush;' +
      'color:CornflowerBlue;' +
      'margin: auto; ' +
      'width: 60%;' +
      'border: 5px solid lightpink;' +
      'padding: 10px;">' +
      `Please pass a valid image name in the 'imageName' query segment. <br> Available image names are: ${imageNames}.</div>`
    );
  }

  if (!query.width && !query.height) {
    return null; // No dimensions
  }

  // Check if height value is  valid
  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    //invalid height
    return (
      '<div style=" font-weight:bold;' +
      'background:LavenderBlush;' +
      'color:CornflowerBlue;' +
      'margin: auto; ' +
      'width: 60%;' +
      'border: 5px solid lightpink;' +
      'padding: 10px;">' +
      "Please provide a positive numerical value for the 'height' query segment.</div>"
    );
  }

  // Check if width value is  valid
  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    //invalid width
    return (
      '<div style=" font-weight:bold;' +
      'background:LavenderBlush;' +
      'color:CornflowerBlue;' +
      'margin: auto; ' +
      'width: 60%;' +
      'border: 5px solid lightpink;' +
      'padding: 10px;">' +
      "Please provide a positive numerical value for the 'width' query segment.</div>"
    );
  }

  return null;
};

images.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const imageAccessability: string | null = await isImageAccessable(
      request.query
    );
    if (imageAccessability) {
      response.send(imageAccessability);
      return;
    }

    let msg: string | null = '';

    // Create thumb if it does not exists already
    if (!(await file.checkThumb(request.query))) {
      msg = await file.generateThumb(request.query);
    }

    if (msg) {
      // if its not null
      response.send(msg);
      return;
    }

    const path: string | null = await file.getImagePath(request.query);
    if (path) {
      console.log('Image: "' + path + '" was accessed and displayed');
      response.sendFile(path);
    } else {
      response.send(
        '<div style=" font-weight:bold;' +
          'background:LavenderBlush;' +
          'color:CornflowerBlue;' +
          'margin: auto; ' +
          'width: 60%;' +
          'border: 5px solid lightpink;' +
          'padding: 10px;">Invalid path</div>'
      );
    }
  }
);

export default images;
