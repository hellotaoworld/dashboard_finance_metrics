import { getCompanyRealPick } from '@/services'; // Fetch data from the service layer

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const data = await getCompanyRealPick();
            //console.log(data);
            return res.status(200).json(data);

        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}