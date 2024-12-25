import { getSectorMarketDetails } from "@/services";


export default async function sectorMarketDetails(req, res) {

    try {
        const { sector } = req.query  //const sector = req.query.sector
        const result = await getSectorMarketDetails(sector)
        return res.status(200).send(result);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }


}