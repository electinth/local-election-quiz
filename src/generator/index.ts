import { render } from 'mustache';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmdirSync,
  writeFileSync
} from 'fs';

const TEMPLATE_PATH = 'src/generator/share.html';
const PUBLIC_PATH = 'public/';
const IMAGES_PATH = 'og/score/';
const OUTPUT_PATH = 'dist/share/';

const data = {
  url: '',
  title: 'พร้อมแค่ไหน.. กับประชาธิปไตยใกล้มือ?',
  description: 'วัดความรู้ความเข้าใจเกี่ยวกับ เลือกตั้งท้องถิ่น'
};

const template = readFileSync(TEMPLATE_PATH, 'utf8') as string;
const images = readdirSync(PUBLIC_PATH + IMAGES_PATH);

console.log(`Generating share template from ${images.length} images...`);

if (existsSync(OUTPUT_PATH)) {
  rmdirSync(OUTPUT_PATH, { recursive: true });
}

mkdirSync(OUTPUT_PATH);

images.forEach(image => {
  const output = render(template, { ...data, image: IMAGES_PATH + image });
  const outputName = image.split('.')[0] + '.html';

  writeFileSync(OUTPUT_PATH + outputName, output);
});

console.log('Generating completed!');
