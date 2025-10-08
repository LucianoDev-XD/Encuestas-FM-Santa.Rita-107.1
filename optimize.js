import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDirs = [
  { dir: "./src/assets/images", maxWidth: 1200, quality: 75 }, // portadas
  { dir: "./src/assets/logos", maxWidth: 400, quality: 85 },   // logos
];

const outputDir = "./src/assets_optimized";
fs.mkdirSync(outputDir, { recursive: true });

for (const { dir, maxWidth, quality } of inputDirs) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (/\.(jpe?g|png)$/i.test(file)) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(
        outputDir,
        file.replace(/\.(jpe?g|png)$/i, ".webp")
      );

      try {
        await sharp(inputPath)
          .resize({ width: maxWidth })
          .webp({ quality })
          .toFile(outputPath);
        console.log(`✅ Optimizado: ${file} → ${outputPath}`);
      } catch (err) {
        console.error(`❌ Error con ${file}:`, err);
      }
    }
  }
}

