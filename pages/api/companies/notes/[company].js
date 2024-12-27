import { getCompanyNotes } from '@/services'; // Fetch data from the service layer

export default async function CompanyNotes(req, res) {

    try {
        const { company } = req.query  //const sector = req.query.sector
        const result = await getCompanyNotes(company)
        //console.log(result)
        return res.status(200).send(result);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }


}