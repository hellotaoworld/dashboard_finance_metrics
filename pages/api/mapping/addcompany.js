import { insertCompanyMapping } from "@/services";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { data } = req.body;
        console.log(data);
        try {
            const result = await insertCompanyMapping(data);
            res.status(201).json({ message: 'Record added successfully.' });
            console.log(res);

        } catch (error) {
            console.error('Error updating record:', error);
            res.status(500).json({ message: 'Error adding record.', error });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).json({ message: `Method ${req.method} not allowed.` });
    }
}