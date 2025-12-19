export function getStartAndEndOfWeek(date) {
  // Buat salinan dari tanggal yang diberikan
  const current = new Date(date);

  // Dapatkan hari dalam minggu (0 = Minggu, 1 = Senin, ..., 6 = Sabtu)
  const dayOfWeek = current.getDay();

  // Tentukan perbedaan dari Senin dan Minggu
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const diffToSunday = 7 - dayOfWeek;

  // Tentukan tanggal awal minggu (Senin)
  const startOfWeek = new Date(current);
  startOfWeek.setDate(current.getDate() + diffToMonday);

  const date1 = new Date(startOfWeek);
  const formattedDate = date1.toISOString().split("T")[0];

  // Tentukan tanggal akhir minggu (Minggu)
  const endOfWeek = new Date(current);
  endOfWeek.setDate(current.getDate() + diffToSunday);

  const date2 = new Date(endOfWeek);
  const formattedDateEnd = date2.toISOString().split("T")[0];

  return {
    startOfWeek: formattedDate,
    endOfWeek: formattedDateEnd,
  };
}

export function getFirstAndLastDayOfMonth() {
  // Tanggal awal bulan ini
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  // Tanggal akhir bulan ini
  const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  return {
    firstDay: formatYYYYMMDD(startOfMonth),
    lastDay: formatYYYYMMDD(endOfMonth),
  };
}

function formatYYYYMMDD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
