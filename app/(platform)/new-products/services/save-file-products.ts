import { createWriteStream } from 'fs';
import { Writable } from 'stream';

export default async function saveFileProducts(file: File) {
  const timeStemp = new Date().toISOString();
  const path = `/home/nevola/personal/mevo/live-code-next/csv-lists/products-lists-${timeStemp}.csv`;
  const writeStream = createWriteStream(path);

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const writableStream = new Writable({
      write(chunk, encoding, callback) {
        writeStream.write(chunk, encoding, callback);
      }
    });

    writableStream.write(buffer);
    writableStream.end();
    writeStream.on('finish', () => {
      console.log('File saved successfully');
    });

  } catch (error) {
    console.error('Error on save file', error);
  }
};
