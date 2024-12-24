const mysql = require('mysql2/promise');

let isLocalAvailableCache = null;

export const checkDatabaseConnection = async () => {
    if (isLocalAvailableCache !== null) {
        return isLocalAvailableCache;
    }
    try {
        const connection = await mysql.createConnection({
            host: process.env.LOCALDB_HOST,
            user: process.env.LOCALDB_USERNAME,
            password: process.env.LOCALDB_PASSWORD,
            database: process.env.LOCALDB_NAME,
            port: process.env.LOCALDB_PORT,
        });
        await connection.query('SELECT 1');
        await connection.end();
        isLocalAvailableCache = 'connected';
        return 'connected';
    } catch (error) {
        isLocalAvailableCache = 'disconnected';
        return 'disconnected';
    }
};

const createConnection = async () => {
    const isLocalAvailable = await checkDatabaseConnection();
    return await mysql.createConnection({
        host: isLocalAvailableCache == "connected" ? process.env.LOCALDB_HOST : process.env.DB_HOST,
        user: isLocalAvailableCache == "connected" ? process.env.LOCALDB_USERNAME : process.env.DB_USERNAME,
        password: isLocalAvailableCache == "connected" ? process.env.LOCALDB_PASSWORD : process.env.DB_PASSWORD,
        database: isLocalAvailableCache == "connected" ? process.env.LOCALDB_NAME : process.env.DB_NAME,
        port: isLocalAvailableCache == "connected" ? process.env.LOCALDB_PORT : process.env.DB_PORT,
    });
};


export const getSectors = async () => {
    let connection;
    try {
        const query = "SELECT distinct industry as company_sector, sic FROM valuation_engine_mapping_company where sic is not null order by industry"
        connection = await createConnection();
        const result = await connection.execute(query)
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }

}

export const getSectorOverview = async (v_sector) => {
    let connection;
    try {
        const query = "SELECT industry as sector, count(distinct cik) as count_company, min(report_year) as report_year_min, max(report_year) as report_year_max FROM valuation_engine_metrics_ranking where industry =? and report_year>=2012 group by industry;"
        connection = await createConnection();
        const result = await connection.execute(query, [v_sector])
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }


}

export const getSectorDetails = async (v_sector) => {
    let connection;
    try {
        const query = "SELECT m.metric_name as `metric_name`, \
        m.report_year as `report_year`, \
        (case when f.formula_type='ratio' then avg(greatest(least(m.metric_value,2),-2)) else avg(m.metric_value) end) as `avg`, \
        count(distinct m.company_name) as `company_count`, \
        f.formula_category as formula_category, \
        f.formula_type, \
        f.formula_name \
        from valuation_engine_metrics_ranking m \
        left join valuation_engine_mapping_formula f \
        on m.metric_name = f.formula_shortname \
        where industry =? and m.report_year >=2012 and f.formula_category <>'Custom Ratio' \
        group by f.formula_type,f.formula_category,m.metric_name,f.formula_name, m.report_year"
        connection = await createConnection();
        const result = await connection.execute(query, [v_sector])
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }

}

export const getCompanyPick = async () => {
    let connection;
    try {
        const query = "SELECT distinct company as company_name, industry as sector, cik, sic, type, fye, qtr, exchange, symbol, type_fav FROM valuation_engine_mapping_company order by company_name"
        connection = await createConnection();
        const result = await connection.execute(query)
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }
}

export const getCompanyRealPick = async () => {
    let connection;
    try {
        const query = "SELECT group_concat(cik) as cik, group_concat(company) as company_name FROM valuation_engine_mapping_company where type ='pick'"
        connection = await createConnection();
        const result = await connection.execute(query)
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }
}

export const getCompanyFav = async () => {
    let connection;
    try {
        const query = "SELECT group_concat(cik) as cik, group_concat(company) as company_name FROM valuation_engine_mapping_company where type_fav =1"
        connection = await createConnection();
        const result = await connection.execute(query)
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }
}



export const getCompanies = async (v_sector) => {
    let connection;
    try {
        const query = "SELECT distinct company as company_name FROM valuation_engine_mapping_company WHERE industry=? order by company"
        connection = await createConnection();
        const result = await connection.execute(query, [v_sector])
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }
}

export const getMetricList = async (v_sector) => {
    let connection;
    try {
        const query = "SELECT distinct f.formula_shortname, f.formula_name, f.formula_pseudo_code, f.formula_category, f.formula_type FROM web_application.valuation_engine_metrics_ranking r inner join web_application.valuation_engine_mapping_formula f on r.metric_name = f.formula_shortname inner join valuation_engine_mapping_company c on r.company_name = c.company where c.industry =? and f.formula_category <>'Custom Ratio' order by FIELD(f.formula_category,'Key Ratio','Profitability Ratio','Efficiency Ratio','Liquidity Ratio','Solvency Ratio','Miscellaneous Ratio');"
        connection = await createConnection();
        const result = await connection.execute(query, [v_sector])
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }
}

export const getMetricDetails = async (v_sector) => {
    let connection;
    try {
        const query = "SELECT r.company_name as company_name,r.report_year as report_year,r.metric_name,r.metric_value,r.metric_ranking,f.formula_category,f.formula_type,r.industry as company_sector FROM valuation_engine_metrics_ranking r left join valuation_engine_mapping_formula f on r.metric_name = f.formula_shortname where r.industry =? and r.report_year >=2012 and f.formula_category <>'Custom Ratio';"
        connection = await createConnection();
        const result = await connection.execute(query, [v_sector])
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }
}


export const getCompanyOverview = async (v_company) => {
    let connection;
    try {
        const query = "SELECT \
        r.company_name as 'company_name',\
        min(r.report_year) as 'report_year_min',\
         max(r.report_year) as 'report_year_max', \
         group_concat(distinct r.industry) as company_sector,\
         group_concat(distinct c.symbol) as company_ticker,\
         group_concat(distinct c.fye) as fye, \
         group_concat(distinct c.cik) as cik, \
         group_concat(distinct c.exchange)  as exchange\
         FROM valuation_engine_metrics_ranking r left join valuation_engine_mapping_company c on r.cik=c.cik where \
         r.company_name =? and r.report_year >=2012 \
         GROUP BY r.industry,r.company_name, c.symbol;"
        connection = await createConnection();
        const result = await connection.execute(query, [v_company])
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }
}


export const getCompanyMetricList = async (v_company) => {
    let connection;
    try {
        const query = "SELECT distinct f.formula_shortname, f.formula_name, f.formula_pseudo_code, f.formula_category, f.formula_type FROM valuation_engine_metrics_ranking r inner join valuation_engine_mapping_formula f on r.metric_name = f.formula_shortname where r.company_name=? and r.report_year>=2012 and f.formula_category <>'Custom Ratio';"
        connection = await createConnection();
        const result = await connection.execute(query, [v_company])
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }

}

export const getCompanyURL = async (v_company) => {
    let connection;
    try {
        const query = "SELECT u.fy as report_year, u.stmt as statement, u.url as url, c.company as company_name FROM valuation_engine_urls u inner join valuation_engine_mapping_company c on u.cik = c.cik where c.company=? and u.fy>=2012 order by u.fy, u.URL ASC;"
        connection = await createConnection();
        const result = await connection.execute(query, [v_company])
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }
}

export const getCompanyMetricDetails = async (v_company) => {
    let connection;
    try {
        const query = "SELECT r.company_name as 'company_name',r.report_year as 'report_year',r.metric_name,r.metric_value,r.metric_ranking,f.formula_category,f.formula_type,r.industry as company_sector \
     FROM valuation_engine_metrics_ranking r left join valuation_engine_mapping_formula f on r.metric_name = f.formula_shortname where r.company_name=? and r.report_year >=2012 and f.formula_category <>'Custom Ratio';"
        connection = await createConnection();
        const result = await connection.execute(query, [v_company])
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }
}


export const getCompanyRanking = async (v_company) => {
    let connection;
    try {
        const query = "SELECT report_year as 'year',  \
    metric_ranking, \
    count(*) as 'count', \
    group_concat(concat(f.formula_name,' [ ', \
            (case when f.formula_type ='ratio' then concat(metric_value, '% ') else metric_value end),' ]')) as 'metrics' \
    FROM web_application.valuation_engine_metrics_ranking r \
    LEFT JOIN web_application.valuation_engine_mapping_formula f ON \
    r.metric_name = f.formula_shortname \
    where r.company_name =? \
    and report_year >= 2012 \
    and f.formula_category <>'Custom Ratio' \
    and (metric_ranking <=3 or \
        metric_ranking >=(SELECT max(metric_ranking)-3 FROM valuation_engine_metrics_ranking sub where sub.report_year=report_year))\
    group by metric_ranking, report_year  \
    order by year ASC, metric_ranking ASC, count DESC, metrics ASC"
        connection = await createConnection();
        const result = await connection.execute(query, [v_company])
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }
}


export const updateCompanyMapping = async (v_company, cik) => {
    let connection;
    try {
        const query = "UPDATE valuation_engine_mapping_company SET company = ?,\
                    sic = ?,\
                    industry = ?,\
                    type = ?,\
                    exchange = ?,\
                    symbol = ?, \
                    type_fav = ? \
                WHERE cik = ?;"
        const params = [
            v_company.company_name,
            v_company.sic,
            v_company.sector,
            v_company.type,
            v_company.exchange,
            v_company.symbol,
            v_company.type_fav,
            cik
        ]
        connection = await createConnection();
        const result = await connection.execute(query, params)
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }


}

export const insertCompanyMapping = async (v_company) => {
    let connection;
    try {
        const query = "INSERT INTO valuation_engine_mapping_company \
                    (cik, company, sic, industry, type, exchange, symbol, type_fav) \
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?)"
        const params = [
            v_company.cik,
            v_company.company_name,
            v_company.sic,
            v_company.sector,
            v_company.type,
            v_company.exchange,
            v_company.symbol,
            v_company.type_fav,
        ]
        connection = await createConnection();
        const result = await connection.execute(query, params)
        console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }


}

export const deleteCompanyMapping = async (cik) => {
    let connection;
    try {
        const query = "DELETE FROM valuation_engine_mapping_company \
                WHERE cik = ?;"
        const params = [
            cik
        ]
        connection = await createConnection();
        const result = await connection.execute(query, params)
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }


}

export const getCompanyMarketDetails = async (v_company) => {
    let connection;
    try {
        const query = "WITH industry_avg as (\
        SELECT\
        sic,\
        min(metric_value) as min, \
        max(metric_value) as max, \
        round(avg(metric_value),2) as avg from web_application.valuation_engine_metrics_ranking \
        where metric_name = 'pe_ratio'\
        group by sic)\
        SELECT r.company_name as company_name,\
        r.metric_name,\
        r.metric_value,\
        r.metric_ranking,\
        r.industry,\
        industry_avg.avg as industry_avg, \
        industry_avg.min as industry_min, \
        industry_avg.max as industry_max \
        FROM web_application.valuation_engine_metrics_ranking r  \
        left join industry_avg on \
        r.sic = industry_avg.sic\
        where r.company_name=? and r.metric_name ='pe_ratio'"
        connection = await createConnection();
        const result = await connection.execute(query, [v_company])
        //console.log(result[0])
        return result[0]
    } catch (error) {
        console.error("Error in:", error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Ensure connection is closed
    }
}