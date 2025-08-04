import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!UNSPLASH_KEY) { process.exit(1) };