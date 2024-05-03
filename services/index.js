const mysql = require('mysql2/promise');
//import mysql from 'mysq2/promoise'

//const connection = mysql.createConnection(process.env.DATABASE_URL);


// create the connection, specify bluebird as Promise

//   const connection = await mysql.createConnection(process.env.DATABASE_URL);
const connection = await mysql.createConnection({
    "host":process.env.LOCALDB_HOST,
    "user":process.env.LOCALDB_USERNAME,
    "password": process.env.LOCALDB_PASSWORD,
    "database": process.env.LOCALDB_NAME,
    "port":process.env.LOCALDB_PORT
  });

export const getSectors = async () => {
    const query = 'SELECT distinct industry as company_sector FROM valuation_engine_mapping_company order by industry'
    const result = await connection.execute(query)
    //console.log(result[0])
    return result[0]
}

export const getSectorOverview = async (v_sector) => {

    const query = 'SELECT industry as sector, count(distinct cik) as count_company, min(report_year) as report_year_min, max(report_year) as report_year_max FROM valuation_engine_metrics_ranking where industry =? and report_year>=2012 group by industry;'
    const result = await connection.execute(query, [v_sector])
    //console.log(result[0])
    return result[0]
}

export const getSectorDetails = async (v_sector) => {

    const query = 'SELECT m.metric_name as `metric_name`, \
    m.report_year as `report_year`, \
    (case when f.formula_type="ratio" then avg(greatest(least(m.metric_value,2),-2)) else avg(m.metric_value) end) as `avg`, \
    count(distinct m.company_name) as `company_count`, \
    f.formula_category as formula_category, \
    f.formula_type, \
    f.formula_name \
    from valuation_engine_metrics_ranking m \
    left join valuation_engine_mapping_formula f \
    on m.metric_name = f.formula_shortname \
    where industry =? and m.report_year >=2012 \
    group by f.formula_type,f.formula_category,m.metric_name,f.formula_name, m.report_year'

    const result = await connection.execute(query, [v_sector])
    //console.log(result[0])
    return result[0]
}

export const getCompanyPick = async () => {
    const query = 'SELECT distinct company as company_name, industry as sector, cik, type FROM valuation_engine_mapping_company order by company_name'
    const result = await connection.execute(query)
    //console.log(result[0])
    return result[0]
}



export const getCompanies = async (v_sector) => {

    const query = 'SELECT distinct company as company_name FROM valuation_engine_mapping_company WHERE industry=? order by company'
    const result = await connection.execute(query, [v_sector])
    //console.log(result[0])
    return result[0]
}

export const getMetricList = async (v_sector) => {

    const query = 'SELECT distinct f.formula_shortname, f.formula_name, f.formula_pseudo_code, f.formula_category, f.formula_type FROM web_application.valuation_engine_metrics_ranking r inner join web_application.valuation_engine_mapping_formula f on r.metric_name = f.formula_shortname inner join valuation_engine_mapping_company c on r.company_name = c.company where c.industry =? order by FIELD(f.formula_category,"Key Ratio","Profitability Ratio","Efficiency Ratio","Liquidity Ratio","Solvency Ratio","Miscellaneous Ratio");'

    const result = await connection.execute(query, [v_sector])
    //console.log(result[0])
    return result[0]
}

export const getMetricDetails = async (v_sector) => {

    const query = 'SELECT r.company_name as "company_name",r.report_year as "report_year",r.metric_name,r.metric_value,r.metric_ranking,f.formula_category,f.formula_type,r.industry as company_sector FROM valuation_engine_metrics_ranking r left join valuation_engine_mapping_formula f on r.metric_name = f.formula_shortname where r.industry =? and r.report_year >=2012;'

    const result = await connection.execute(query, [v_sector])
    //console.log(result[0])
    return result[0]
}


export const getCompanyOverview = async (v_company) => {

    const query = 'SELECT r.company_name as "company_name",min(r.report_year) as "report_year_min", max(r.report_year) as "report_year_max", r.industry as company_sector, c.symbol as company_ticker FROM valuation_engine_metrics_ranking r left join valuation_engine_mapping_company c on r.cik=c.cik where r.company_name=? and r.report_year >=2012 GROUP BY r.industry,r.company_name, c.symbol;'
    const result = await connection.execute(query, [v_company])
    //console.log(result[0])
    return result[0]
}

export const getCompanyMetricList = async (v_company) => {

    const query = 'SELECT distinct f.formula_shortname, f.formula_name, f.formula_pseudo_code, f.formula_category, f.formula_type FROM valuation_engine_metrics_ranking r inner join valuation_engine_mapping_formula f on r.metric_name = f.formula_shortname where r.company_name=? and r.report_year>=2012;'

    const result = await connection.execute(query, [v_company])
    //console.log(result[0])
    return result[0]
}

export const getCompanyURL = async (v_company) => {

    const query = 'SELECT u.fy as report_year, u.stmt as statement, u.url as url, c.company as company_name FROM valuation_engine_urls u inner join valuation_engine_mapping_company c on u.cik = c.cik where c.company=? and u.fy>=2012 order by u.fy, u.URL ASC;'

    const result = await connection.execute(query, [v_company])
    //console.log(result[0])
    return result[0]
}

export const getCompanyMetricDetails = async (v_company) => {

    const query = 'SELECT r.company_name as "company_name",r.report_year as "report_year",r.metric_name,r.metric_value,r.metric_ranking,f.formula_category,f.formula_type,r.industry as company_sector \
     FROM valuation_engine_metrics_ranking r left join valuation_engine_mapping_formula f on r.metric_name = f.formula_shortname where r.company_name=? and r.report_year >=2012;'

    const result = await connection.execute(query, [v_company])
    //console.log(result[0])
    return result[0]
}


export const getCompanyRanking = async (v_company) => {

    const query = 'SELECT report_year as "year",  \
    metric_ranking, \
    count(*) as "count", \
    group_concat(concat(f.formula_name," [ ", \
            (case when f.formula_type ="ratio" then concat(metric_value, "%") else metric_value end)," ]")) as "metrics" \
    FROM web_application.valuation_engine_metrics_ranking r \
    LEFT JOIN web_application.valuation_engine_mapping_formula f ON \
    r.metric_name = f.formula_shortname \
    where company_name =? \
    and report_year >= 2012 \
    and (metric_ranking <=3 or \
        metric_ranking >=(SELECT max(metric_ranking)-3 FROM valuation_engine_metrics_ranking sub where sub.report_year=report_year))\
    group by metric_ranking, report_year  \
    order by year ASC, metric_ranking ASC, count DESC, metrics ASC'

    const result = await connection.execute(query, [v_company])
    //console.log(result[0])
    return result[0]
}