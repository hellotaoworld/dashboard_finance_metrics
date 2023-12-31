import { getCompanyDetails } from "@/services";


export default async function companyDetails(req, res) {

    try {
        const { company } = req.query  //const sector = req.query.sector
        const result = await getCompanyDetails(company)
        return res.status(200).send(result);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }


}