const jsonFiles = require.context("./surah/", false, /\.json$/);

const jsonQuran = {};

jsonFiles.keys().forEach((filename) => {
  const surahKey = filename.replace(/\.\/|\.json/g, "");
  const surah = jsonFiles(filename);
  jsonQuran[surahKey] = surah;
});

// Ekspor objek jsonData yang berisi semua data JSON
export default jsonQuran;
