
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key


export default async function alphavantage(req, res) {

    try {
        //const { company } = req.query  //const sector = req.query.sector
        //const result = await getCompanyDetails(company)
        const { ticker } = req.query
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${process.env.ALPHAVANTAGE_API}`

        const result = await fetch(url);
        const result_json = await result.json();
        return res.status(200).send(result_json);

    } catch (error) {
        //console.log(error);
        return res.status(500).send(error);
    }


}