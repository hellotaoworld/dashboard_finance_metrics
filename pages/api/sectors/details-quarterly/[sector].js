import { getSectorDetailsQuarterly } from "@/services";

export default async function handler(req, res) {
    try {
        const { sector } = req.query;
        const result = await getSectorDetailsQuarterly(sector);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
