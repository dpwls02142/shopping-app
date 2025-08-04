import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { Readable } from 'stream';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!UNSPLASH_KEY) { console.log(`key 없음`); process.exit(1) };

const QUERY = 'product';
const COUNT = 50;
const DOWNLOAD_DIR = path.resolve(process.cwd(), 'src', 'lib', 'db', 'images');

if (!fs.existsSync(DOWNLOAD_DIR)) { fs.mkdirSync(DOWNLOAD_DIR, { recursive: true }) };

async function trackDownload(photo) {
    if (!photo.links?.download_location) return;
    const url = new URL(photo.links.download_location);
    url.searchParams.set('client_id', UNSPLASH_KEY);
    try {
        const res = await fetch(url.toString(), {
            headers: { 'Accept-Version': 'v1' },
        });
        if (!res.ok) {
            console.warn(`다운로드 트래킹 실패: ${photo.id} - ${res.status}`);
        }
    } catch (e) {
        console.warn(`다운로드 트래킹 에러: ${photo.id} - ${e.message}`);
    }
}

async function downloadImage(photo) {
    const imageUrl = photo.urls?.full || photo.urls?.regular;
    if (!imageUrl) {
        console.warn(`이미지 URL 없음: ${photo.id}`);
        return;
    }

    await trackDownload(photo);

    const res = await fetch(imageUrl);
    if (!res.ok) {
        console.warn(`이미지 다운로드 실패: ${photo.id} - ${res.status}`);
        return;
    }

    const ext = '.jpg';
    const filename = `${photo.id}${ext}`;
    const filepath = path.join(DOWNLOAD_DIR, filename);
    const fileStream = fs.createWriteStream(filepath);

    const nodeReadable = Readable.fromWeb(res.body);

    await new Promise((resolve, reject) => {
        nodeReadable.pipe(fileStream);
        nodeReadable.on('error', reject);
        fileStream.on('finish', resolve);
        fileStream.on('error', reject);
    });


    console.log(`저장됨: ${filename}`);
}

async function main() {
    console.log(`== unsplash에서 이미지 갖고오기 ==`);
    const url = new URL(`https://api.unsplash.com/photos/random`);
    url.searchParams.set('query', QUERY);
    url.searchParams.set('count', `${COUNT}`);

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Client-ID ${UNSPLASH_KEY}`,
            'Accept-Version': 'v1',
        },
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`사진 요청 실패: ${res.status} ${text}`);
    }

    const data = await res.json();
    const photos = Array.isArray(data) ? data : [data];
    for (const photo of photos) {
        await downloadImage(photo);
    }

    console.log(`== 종료 ==`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
