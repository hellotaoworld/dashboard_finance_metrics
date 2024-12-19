import { deleteCompanyMapping } from "@/services";

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'ID and data are required.' });
        }

        try {

            const result = await deleteCompanyMapping(id);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'No record found with the provided ID.' });
            }

            res.status(200).json({ message: 'Record deleted successfully.' });
        } catch (error) {
            console.error('Error deleting record:', error);
            res.status(500).json({ message: 'Error deleting record.', error });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).json({ message: `Method ${req.method} not allowed.` });
    }
}