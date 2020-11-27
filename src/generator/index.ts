import { render } from 'mustache';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmdirSync,
  writeFileSync
} from 'fs';
import { config } from 'dotenv';

config();

const TEMPLATE_PATH = 'src/generator/share.html';
const PUBLIC_PATH = 'public/';
const IMAGES_PATH = 'og/score/';
const OUTPUT_PATH = 'dist/share/';

const data = {
  title: 'พร้อมแค่ไหน.. กับประชาธิปไตยใกล้มือ?',
  description: 'วัดความรู้ความเข้าใจเกี่ยวกับ เลือกตั้งท้องถิ่น',
  baseUrl: process.env.VUE_APP_HOST_DOMAIN,
  googleAnalyticsId: process.env.VUE_APP_GOOGLE_ANALYTICS_ID
};

const template = readFileSync(TEMPLATE_PATH, 'utf8') as string;
const images = readdirSync(PUBLIC_PATH + IMAGES_PATH);

console.log(`Generating share template from ${images.length} images...`);

if (existsSync(OUTPUT_PATH)) {
  rmdirSync(OUTPUT_PATH, { recursive: true });
}

mkdirSync(OUTPUT_PATH);

images.forEach(image => {
  const outputFile = `${image.split('.')[0]}.html`;
  const output = render(template, {
    ...data,
    url: `${process.env.VUE_APP_HOST_DOMAIN}share/${outputFile}`,
    image: process.env.VUE_APP_HOST_DOMAIN + IMAGES_PATH + image
  });

  writeFileSync(OUTPUT_PATH + outputFile, output);
});

console.log('Generating completed!');
