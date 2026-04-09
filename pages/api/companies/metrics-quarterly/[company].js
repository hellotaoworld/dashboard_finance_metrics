import { getCompanyMetricDetailsQuarterly } from "@/services";

export default async function handler(req, res) {
    try {
        const { company } = req.query;
        const result = await getCompanyMetricDetailsQuarterly(company);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
