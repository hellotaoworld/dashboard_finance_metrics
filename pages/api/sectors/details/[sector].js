import { getSectorDetails } from "@/services";


export default async function sectorDetails(req, res) {

    try {
        const { sector } = req.query  //const sector = req.query.sector
        const result = await getSectorDetails(sector)
        return res.status(200).send(result);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }


}