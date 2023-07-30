const QuranJson = async () => {
  const jsonFiles = import.meta.glob("./surah/*.json");
  console.log(jsonFiles);
  const jsonQuran = {};

  for (const filename in jsonFiles) {
    const surahKey = filename.replace(/\.\/surah\/|\.json/g, "");
    const surah = await jsonFiles[filename]();
    jsonQuran[surahKey] = surah.default;
  }

  return jsonQuran;
};

// Ekspor objek jsonData yang berisi semua data JSON
export default QuranJson;
