import imagemin from 'imagemin';

import imageminPngquant, { Options } from 'imagemin-pngquant';

export type PNGQuantOptions = Options

export const pngquant = (imageData: Buffer, options: PNGQuantOptions = {}): Promise<Buffer> => imagemin.buffer(imageData, {
    plugins: [
        (imageminPngquant as unknown as Function)(options),
    ],
});