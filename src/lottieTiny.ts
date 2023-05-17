import { PNGQuantOptions, pngquant } from "./pngquant.js"
import { tinypng } from "./tinypng.js"

type TinyOptions = {
    type: 'pngquant',
    options?: PNGQuantOptions
} | {
    type: 'tinypng'
}

type LottieJson = {
    assets: { p: string }[]
}

const tinyAssets = async (json: LottieJson, tiny: TinyOptions) => {
    const assets = json.assets.map(asset => ({
        ...asset
    }))

    for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];
        const { p } = asset
        if (p) {
            const matches = p.match(/^data:[^;]+;base64,/)
            if (matches) {
                const prefix = matches[0]
                const base64str = p.slice(prefix.length);
                const imageData = Buffer.from(base64str, 'base64');

                const newImageData = tiny.type === 'pngquant' ? await pngquant(imageData, tiny.options) : tinypng(imageData)

                const newUrl = `${prefix}${newImageData.toString('base64')}`

                asset.p = newUrl;
            }
        }
    }

    return {
        ...json,
        assets,
    }
}

export const lottieTiny = async (
    json: LottieJson,
    tiny: TinyOptions = {
        type: 'pngquant',
    }): Promise<LottieJson> => {
    if (json.assets) {
        return tinyAssets(json, tiny)
    }

    return json
}