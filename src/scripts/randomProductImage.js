import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!UNSPLASH_KEY) { process.exit(1) };

const QUERY = 'product';
const COUNT = 50;
const DOWNLOAD_DIR = path.resolve(process.cwd(), 'src', 'app', 'lib', 'db', 'images');

