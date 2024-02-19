SELECT i.cik, c.company as 'a.company_name', i.mapping, count(distinct i.ddate)  as count
FROM web_application.valuation_engine_inputs i left join web_application.valuation_engine_mapping_company c on i.cik=c.cik 
-- WHERE i.fy =(SELECT max(fy) from web_application.valuation_engine_inputs where cik=i.cik and mapping =i.mapping and left(ddate,4)=left(i.ddate,4))
group by i.cik, c.company,i.mapping
order by i.mapping asc, count asc