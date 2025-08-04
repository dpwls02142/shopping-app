import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!UNSPLASH_KEY) { process.exit(1) };

const QUERY = 'product';
const COUNT = 50;
const DOWNLOAD_DIR = path.resolve(process.cwd(), 'src', 'app', 'lib', 'db', 'images');

if (!fs.existsSync(DOWNLOAD_DIR)) { fs.mkdirSync(DOWNLOAD_DIR, { recursive: true }) };

async function trackDownload(photo) {
    if (!photo.links?.download_location) return;
    const url = new URL(photo.links.download_location);
    url.searchParams.set('client_id', ACCESS_KEY);
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
