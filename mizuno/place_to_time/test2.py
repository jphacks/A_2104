import requests
import json

destinations ="宮城県仙台市青葉区片平２丁目１−１"
origins ="宮城県仙台市青葉区中央１丁目１０−１０"
arrival_time =""
mode =""

url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+ origins +"&destinations="+ destinations +"&language=ja&key=***"

payload={}
headers = {}

raw_response = requests.request("GET", url, headers=headers, data=payload)
parsed_response = json.loads(raw_response.text)

for row in parsed_response['rows']:
        for element in row['elements']:
            # Element Level Statusのチェック
            # https://developers.google.com/maps/documentation/distance-matrix/intro#StatusCodes
            if element['status'] == 'OK':
                print (element['duration']['text'])