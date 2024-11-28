import { supabase } from "../../lib/supabaseClient"; // Pastikan path ini sesuai struktur proyek Anda

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { kode, supplier, jumlah, tanggal, pukul, kualitas, status } = req.body;

      // Validasi data yang diterima
      if (!kode || !supplier || !jumlah || !tanggal || !pukul || !status) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Tambahkan data ke tabel Supabase
      const { data, error } = await supabase
        .from("data_entries") // Nama tabel di Supabase
        .insert([{ kode, supplier, jumlah, tanggal, pukul, kualitas, status }]);

      if (error) {
        throw error;
      }

      // Kirim respons sukses
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error inserting data:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    // Jika metode HTTP selain POST
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
