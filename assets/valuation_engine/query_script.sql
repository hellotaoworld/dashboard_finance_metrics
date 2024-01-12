-- getSectors
SELECT distinct company_sector FROM valuation_engine_mapping_company;

-- getSectorOverview
SELECT c.company_sector as sector, 
min(m.`a.report_year`) as report_year_min,
 max(m.`a.report_year`) as report_year_max,
 count(distinct c.company_name) as count_company
 FROM valuation_engine_metrics m 
 INNER JOIN valuation_engine_mapping_company c 
 on m.`a.company_name` = c.company_name 
 WHERE c.company_sector like 'semi%' 
 AND m.`a.report_period` ="FY" 
 and m.`a.report_year`>= 2012 
 GROUP BY c.company_sector; 
 
 -- getSectorDetails
 SELECT m.metric_name as `metric_name`, 
    m.`a.report_year` as `report_year`,
    avg(greatest(least(m.metric_value,2),-2)) as `avg`, 
    count(distinct m.`a.company_name`) as `company_count`, 
    f.formula_category as formula_category, 
    f.formula_type, 
    f.formula_name 
    from valuation_engine_metrics_ranking m 
    left join valuation_engine_mapping_company c 
    on m.`a.company_name` = c.company_name
    left join valuation_engine_mapping_formula f 
    on m.metric_name = f.formula_shortname 
    where company_sector like 'semi%' and m.`a.report_year` >=2012
    group by f.formula_type,f.formula_category,m.metric_name,f.formula_name, m.`a.report_year`;