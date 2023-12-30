const mysql = require('mysql2/promise');
//import mysql from 'mysq2/promoise'

//const connection = mysql.createConnection(process.env.DATABASE_URL);


// create the connection, specify bluebird as Promise
const connection = await mysql.createConnection(process.env.DATABASE_URL);

export const getSectors = async () => {

    const query = 'SELECT distinct company_sector FROM valuation_engine_mapping_company'
    const result = await connection.execute(query)
    //console.log(result[0])
    return result[0]
}

export const getSectorOverview = async (v_sector) => {

    const query = 'SELECT c.company_sector as sector, min(m.`a.report_year`) as report_year_min, max(m.`a.report_year`) as report_year_max, count(distinct c.company_name) as count_company FROM valuation_engine_metrics m INNER JOIN valuation_engine_mapping_company c on m.`a.company_name` = c.company_name WHERE c.company_sector =? AND m.`a.report_period` ="FY" GROUP BY c.company_sector; '
    const result = await connection.execute(query, [v_sector])
    //console.log(result[0])
    return result[0]
}

export const getSectorDetails = async (v_sector) => {

    const query = 'SELECT c.company_sector as sector, m.`a.report_year` as report_year,count(distinct c.company_name) as count_company, avg(GREATEST(LEAST(m.revenue_growth_rate, 2), -2)) AS avg_revenue_grwoth, avg(GREATEST(LEAST(m.return_on_invested_capital_rate, 2), -2)) as avg_return_on_invested_capital_rate, avg(GREATEST(LEAST(m.eps_growth_rate, 2), -2)) as avg_eps_growth_rate, avg(GREATEST(LEAST(m.adj_equity_growth_rate, 2), -2)) as avg_adj_equity_growth_rate FROM valuation_engine_metrics m INNER JOIN valuation_engine_mapping_company c on m.`a.company_name` = c.company_name WHERE c.company_sector =? AND m.`a.report_period` ="FY" GROUP BY c.company_sector, m.`a.report_year`; '

    const result = await connection.execute(query, [v_sector])
    //console.log(result[0])
    return result[0]
}

export const getCompanies = async (v_sector) => {

    const query = 'SELECT distinct company_name FROM valuation_engine_mapping_company WHERE company_sector=?'
    const result = await connection.execute(query, [v_sector])
    //console.log(result[0])
    return result[0]
}



export const getMetricDetails = async (v_sector, v_metric) => {

    const query = 'SELECT r.`a.company_name` as "company_name",r.`a.report_year` as "report_year",r.metric_value,r.metric_ranking,f.formula_category,c.company_sector FROM valuation_engine_metrics_ranking r left join valuation_engine_mapping_formula f on r.metric_name = f.formula_shortnameleft join valuation_engine_mapping_company con r.`a.company_name` = c.company_name where c.company_sector=? and r.metric_name=?;'

    const result = await connection.execute(query, [v_sector, v_metric])
    //console.log(result[0])
    return result[0]
}

export const getCompanyDetails = async (v_company) => {

    const query = 'SELECT r.`a.company_name` as "company_name",r.`a.report_year` as "report_year",r.metric_value,r.metric_ranking,f.formula_category,c.company_sector FROM valuation_engine_metrics_ranking r left join valuation_engine_mapping_formula f on r.metric_name = f.formula_shortnameleft join valuation_engine_mapping_company con r.`a.company_name` = c.company_name where c.company_name=?;'

    const result = await connection.execute(query, [v_company])
    //console.log(result[0])
    return result[0]
}

export const getCompanyOverview = async (v_company) => {

    const query = 'SELECT r.`a.company_name` as "company_name",min(r.`a.report_year`) as "report_year_min", max(r.`a.report_year`) as "report_year_max", c.company_sector FROM valuation_engine_metrics_ranking r left join valuation_engine_mapping_company c on r.`a.company_name`=c.company_name where r.`a.company_name`=? GROUP BY c.company_sector,r.`a.company_name`;'
    const result = await connection.execute(query, [v_company])
    //console.log(result[0])
    return result[0]
}