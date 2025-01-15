const QuranJson = async ({ limit = 10, offset = 0 } = {}) => {
  const jsonFiles = import.meta.glob("./surah/*.json");
  const fileKeys = Object.keys(jsonFiles).sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)\.json$/)[1], 10);
    const numB = parseInt(b.match(/(\d+)\.json$/)[1], 10);
    return numA - numB;
  });

  // Hitung indeks awal dan akhir untuk pagination

  // Ambil file sesuai dengan batasan dan pagination
  const limitedKeys = fileKeys.slice(offset, offset + limit);
  const jsonQuran = {};

  for (const filename of limitedKeys) {
    const surahKey = filename.replace(/\.\/surah\/|\.json/g, "");
    const surah = await jsonFiles[filename]();
    jsonQuran[surahKey] = surah.default;
  }

  return {
    data: jsonQuran,
    total: fileKeys.length,
    limit,
    totalPages: Math.ceil(fileKeys.length / limit),
  };
};

// Ekspor objek jsonData yang berisi semua data JSON
export default QuranJson;
