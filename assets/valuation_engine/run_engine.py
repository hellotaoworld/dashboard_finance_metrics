import load_data, calculate_metrics, calculate_ranking

print('****** Valuation Engine, v2 is triggered *****')
print('=== Start Loading Data ===')
load_data.run()
print('=== Data Load Completed ===')
print('=== Start Calculating Metrics ===')
calculate_metrics.run()
print('=== Metrics Calculation Completed ===')
print('=== Start Calculating Ranking ===')
calculate_ranking.run()
print('=== Ranking Calculation Completed ===')
print('****** Load has been completed successfully *****')
