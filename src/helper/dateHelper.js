export const TanggalIndo = (date) => {
  let tahun = date.getFullYear();
  let bulan = date.getMonth();
  let tanggal = date.getDate();
  let hari = date.getDay();

  switch (hari) {
    case 0:
      hari = "Minggu";
      break;

    case 1:
      hari = "Senin";
      break;
    case 2:
      hari = "Selasa";
      break;
    case 3:
      hari = "Rabu";
      break;
    case 4:
      hari = "Kamis";
      break;
    case 5:
      hari = "Jum'at";
      break;
    case 6:
      hari = "Sabtu";
      break;
    default:
      break;
  }

  switch (bulan) {
    case 0:
      bulan = "Januari";
      break;
    case 1:
      bulan = "Februari";
      break;
    case 2:
      bulan = "Maret";
      break;
    case 3:
      bulan = "April";
      break;
    case 4:
      bulan = "Mei";
      break;
    case 5:
      bulan = "Juni";
      break;
    case 6:
      bulan = "Juli";
      break;
    case 7:
      bulan = "Agustus";
      break;
    case 8:
      bulan = "September";
      break;
    case 9:
      bulan = "Oktober";
      break;
    case 10:
      bulan = "November";
      break;
    case 11:
      bulan = "Desember";
      break;
    default:
      break;
  }
  let tampilTanggal = hari + ", " + tanggal + " " + bulan + " " + tahun;
  return tampilTanggal;
};
export const jamUTC = (jam, add = 0) => {
  const currentDateTime = new Date();
  currentDateTime.setDate(currentDateTime.getDate() + add); // Mendapatkan tanggal dan waktu saat ini
  const year = currentDateTime.getFullYear(); // Mendapatkan tahun saat ini
  const month = String(currentDateTime.getMonth() + 1).padStart(2, "0"); // Mendapatkan bulan saat ini (ditambah 1 karena indeks bulan dimulai dari 0)
  const day = String(currentDateTime.getDate()).padStart(2, "0"); // Mendapatkan hari saat ini
  const time = jam; // Jam yang ingin Anda ubah formatnya

  const formattedDateTime = `${year}-${month}-${day}T${time}:00`; // Menggabungkan tahun, bulan, hari, dan waktu menjadi format ISO 8601

  return formattedDateTime;
};
