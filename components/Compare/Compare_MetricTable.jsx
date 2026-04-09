import React from 'react'

const fmt = (v) => {
    if (v == null || v === '') return '—';
    const n = parseFloat(v);
    if (isNaN(n)) return v;
    return n.toLocaleString(undefined, { maximumSignificantDigits: 4 });
};

const deltaClass = (a, b) => {
    if (a == null || b == null) return 'text-default-400';
    const diff = parseFloat(a) - parseFloat(b);
    if (diff > 0) return 'text-success-600 dark:text-success-400';
    if (diff < 0) return 'text-danger-600 dark:text-danger-400';
    return 'text-default-500';
};

const fmtDelta = (a, b) => {
    if (a == null || b == null) return '—';
    const diff = parseFloat(a) - parseFloat(b);
    if (isNaN(diff)) return '—';
    const sign = diff > 0 ? '+' : '';
    return sign + diff.toLocaleString(undefined, { maximumSignificantDigits: 3 });
};

const Compare_MetricTable = ({ metricsA, metricsB, metricList, companyA, companyB, year, quarter, periodLabel }) => {
    const categories = [...new Set(metricList.map(m => m.formula_category))];

    const getVal = (metrics, metricShortname) => {
        const row = metrics.find(m =>
            m.metric_name === metricShortname &&
            String(m.report_year) === String(year) &&
            (!quarter || m.report_quarter === quarter)
        );
        return row ? row.metric_value : null;
    };

    return (
        <div className="overflow-x-auto mx-1">
            {categories.map(category => {
                const categoryMetrics = metricList.filter(m => m.formula_category === category);
                return (
                    <div key={category} className="mb-6">
                        <h3 className="text-sm font-semibold text-default-500 uppercase tracking-wider mb-2 px-2">{category}</h3>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-default-200">
                                    <th className="text-left px-3 py-2 text-default-600 w-1/3">Metric</th>
                                    <th className="text-right px-3 py-2 text-blue-600 dark:text-blue-400 w-1/4">{companyA} ({periodLabel})</th>
                                    <th className="text-right px-3 py-2 text-orange-600 dark:text-orange-400 w-1/4">{companyB} ({periodLabel})</th>
                                    <th className="text-right px-3 py-2 text-default-500 w-1/6">Δ (A−B)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryMetrics.map((m, i) => {
                                    const valA = getVal(metricsA, m.formula_shortname);
                                    const valB = getVal(metricsB, m.formula_shortname);
                                    return (
                                        <tr key={i} className="border-b border-default-100 hover:bg-default-50 dark:hover:bg-default-800/30">
                                            <td className="px-3 py-2 text-default-700">{m.formula_name}</td>
                                            <td className="text-right px-3 py-2 text-blue-700 dark:text-blue-300">{fmt(valA)}</td>
                                            <td className="text-right px-3 py-2 text-orange-700 dark:text-orange-300">{fmt(valB)}</td>
                                            <td className={`text-right px-3 py-2 font-medium ${deltaClass(valA, valB)}`}>{fmtDelta(valA, valB)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
};

export default Compare_MetricTable;
