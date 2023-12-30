
-- Key Metrics, for selected industry --
SELECT
c.company_sector,
m.`a.report_year`,
count(distinct c.company_name) as count_company,
avg(GREATEST(LEAST(m.revenue_growth_rate,2),-2)) AS avg_revenue_grwoth,
avg(GREATEST(LEAST(m.return_on_invested_capital_rate,2),-2)) as avg_return_on_invested_capital_rate,
avg(GREATEST(LEAST(m.eps_growth_rate,2),-2)) as avg_eps_growth_rate,
avg(GREATEST(LEAST(m.adj_equity_growth_rate,2),-2)) as avg_adj_equity_growth_rate
FROM 
valuation_engine_metrics m
INNER JOIN valuation_engine_mapping_company c
on m.`a.company_name` = c.company_name
WHERE
c.company_sector like 'semi%'
AND
m.`a.report_period`='FY'
GROUP BY c.company_sector, m.`a.report_year`
;

-- sector overview --
SELECT 
c.company_sector as sector, 
min(m.`a.report_year`) as report_year_min, 
max(m.`a.report_year`) as report_year_max, 
count(distinct c.company_name) as count_company 
FROM valuation_engine_metrics m 
INNER JOIN valuation_engine_mapping_company c 
on m.`a.company_name` = c.company_name 
WHERE c.company_sector ="Semiconductor" AND 
m.`a.report_period` ="FY" 
GROUP BY c.company_sector; 


-- List of companies for selected metrics --


