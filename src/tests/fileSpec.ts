import file from './../file';
import path from 'path';
import { promises as fs } from 'fs';

describe('Test Image Resizer API', function () {
  describe('Valid inputs', function () {
    it('Accses valid image', async (): Promise<void> => {
      const originalImage: string = path.resolve(
        file.imagesOriginalPath,
        'flowersAndCathedral.jpg'
      );
      let errorInPath: null | string = '';

      try {
        await fs.open(originalImage);
        errorInPath = null;
      } catch {
        errorInPath = 'No such image';
      }

      expect(errorInPath).toBeNull();
    });
    it('Resize an image with 500x350', async (): Promise<void> => {
      await file.generateThumb({
        imageName: 'river',
        width: '500',
        height: '350',
      });
      const resizedImagePath: string = path.resolve(
        file.imagesThumbPath,
        `river-500x350.jpg`
      );
      let errorInPath: null | string = '';

      try {
        await fs.open(resizedImagePath);
        errorInPath = null;
      } catch {
        errorInPath = 'No such image';
      }

      expect(errorInPath).toBeNull();
    });
  });
  describe('Invalid inputs', function () {
    it('Invalid width (negative)', async (): Promise<void> => {
      const shouldBeErorr: string | null = await file.generateThumb({
        imageName: 'nonExistingImage',
        width: '300',
        height: '100',
      });
      expect(shouldBeErorr).not.toBeNull(); // will return invalid path
    });
    it('Invalid width (negative)', async (): Promise<void> => {
      const shouldBeErorr: string | null = await file.generateThumb({
        imageName: 'bike',
        width: '-300',
        height: '100',
      });
      expect(shouldBeErorr).not.toBeNull(); // will return invalid path
    });
  });
});
it('Invalid height (zero)', async (): Promise<void> => {
  const shouldBeErorr: string | null = await file.generateThumb({
    imageName: 'lake',
    width: '200',
    height: '0',
  });
  console.log(shouldBeErorr);
  expect(shouldBeErorr).not.toBeNull(); // will return invalid path
});
//clear cache
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    file.imagesThumbPath,
    'river-500x350.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    //Empty
  }
});
