import urllib.request
import urllib.error
import json

try:
    req = urllib.request.Request("https://leetcode.com/api/problems/algorithms/", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    data = json.loads(response.read())
    print("Success! Number of problems:", len(data.get('stat_status_pairs', [])))
    
    # Print the first 5 problem titles
    for pair in data['stat_status_pairs'][:5]:
        print(pair['stat']['question__title'])
except Exception as e:
    print("Error:", e)
