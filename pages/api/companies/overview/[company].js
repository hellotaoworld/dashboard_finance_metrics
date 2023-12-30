import { getCompanyOverview } from "@/services";


export default async function companyOverview(req, res) {

    try {
        const { company } = req.query  //const sector = req.query.sector
        const result = await getCompanyOverview(company)
        return res.status(200).send(result);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }


}