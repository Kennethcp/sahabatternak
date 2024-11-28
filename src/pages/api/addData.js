import { supabase } from "../../lib/supabaseClient";
import { parse, format } from 'date-fns';

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { kode, supplier, jumlah, tanggal, pukul, kualitas, status } = req.body;

      if (!kode || !supplier || !jumlah || !tanggal || !pukul || !status) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const parsedDate = parse(tanggal, 'dd-MM-yyyy', new Date());
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');

      const { data, error } = await supabase
        .from("data_entries")
        .insert([{ kode, supplier, jumlah, tanggal: formattedDate, pukul, kualitas, status }]);

      if (error) {
        console.error("Error inserting data:", error.message);
        return res.status(500).json({ error: error.message });
      }

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error inserting data:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
