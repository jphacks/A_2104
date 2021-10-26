import requests
import json

with open('info.json', encoding='utf-8') as f:
    jsn = json.load(f)

print(jsn["destinations"])
print(jsn["origins"])
print(jsn["arrival_time"])
print(jsn["mode"])

destinations = jsn["destinations"]
origins = jsn["origins"]
arrival_time = jsn["arrival_time"]
mode = jsn["mode"]

url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + origins + "&destinations=" + destinations + "&mode=" + mode + "&arrival_time=" + arrival_time +"&language=ja&key=***"

payload={}
headers = {}

raw_response = requests.request("GET", url, headers=headers, data=payload)
parsed_response = json.loads(raw_response.text)

print(parsed_response)

for row in parsed_response['rows']:
        for element in row['elements']:
            # Element Level Statusのチェック
            # https://developers.google.com/maps/documentation/distance-matrix/intro#StatusCodes
            if element['status'] == 'OK':
                print (element['duration']['text'])
            else:
                print ("ERROR!")