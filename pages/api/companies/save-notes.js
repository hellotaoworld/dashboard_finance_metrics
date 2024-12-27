import { updateCompanyNotes } from "@/services";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { type, company, cik, sic, notes } = req.body;
        if (!cik) {
            return res.status(400).json({ message: 'ID is required.' });
        }
        try {
            const result = await updateCompanyNotes({ type, company, cik, sic, notes });
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'No record found with the provided ID.' });
            }
            res.status(200).json({ message: 'Record updated successfully.' });
        } catch (error) {
            console.error('Error updating record:', error);
            res.status(500).json({ message: 'Error updating record.', error });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).json({ message: `Method ${req.method} not allowed.` });
    }
}