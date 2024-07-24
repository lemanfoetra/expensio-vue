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
    const formattedDate = date1.toISOString().split('T')[0];

    // Tentukan tanggal akhir minggu (Minggu)
    const endOfWeek = new Date(current);
    endOfWeek.setDate(current.getDate() + diffToSunday);

    const date2 = new Date(endOfWeek);
    const formattedDateEnd = date2.toISOString().split('T')[0];

    return {
        startOfWeek : formattedDate,
        endOfWeek : formattedDateEnd,
    };
}