import axios from 'axios'

const getRandomIP = () => {
    return Array.from(Array(4)).map(() => Math.round(Math.random() * 255)).join('.')
}

export const tinypng = async (imageData: Buffer): Promise<Buffer> => {
    const res = await axios("https://tinypng.com/backend/opt/shrink", {
        headers: {
            "accept-language": "en,zh-CN;q=0.9,zh;q=0.8,zh-TW;q=0.7",
            referrer: "https://tinypng.com/",
            'X-Forwarded-For': getRandomIP(),
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
        },
        method: "POST",
        data: imageData,
        validateStatus: (status) => status > 0
    });

    const url = res.data?.output?.url

    if (typeof url !== 'string') {
        const message = res.data?.message || 'Unknown message'
        throw new Error(`Failed to transform image: ${message}`)
    }

    const imageRes = await axios.get(url, {
        responseType: 'arraybuffer'
    })

    if (imageRes.status !== 200) {
        throw new Error('Failed to get transform image')
    }

    return imageRes.data
}

