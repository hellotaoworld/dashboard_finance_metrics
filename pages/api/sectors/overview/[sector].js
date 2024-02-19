import { getSectorOverview } from "@/services";


export default async function sectorOverview(req, res) {

    try {
        const { sector } = req.query  //const sector = req.query.sector
        //console.log(sector);
        const result = await getSectorOverview(sector)
        //console.log(result);
        return res.status(200).send(result);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }


}