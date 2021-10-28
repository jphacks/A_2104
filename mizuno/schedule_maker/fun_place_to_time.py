import requests
import json
import datetime

def place_to_time(destinations, origins, end, mode):
    url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + origins + "&destinations=" + destinations + "&mode=" + mode + "&arrival_time=" + end +"&language=ja&key=***"
    payload={}
    headers = {}
    raw_response = requests.request("GET", url, headers=headers, data=payload)
    parsed_response = json.loads(raw_response.text)
    times = 0
    for row in parsed_response['rows']:
            for element in row['elements']:
                # Element Level Statusのチェック
                # https://developers.google.com/maps/documentation/distance-matrix/intro#StatusCodes
                if element['status'] == 'OK':
                    times = int(element['duration']['value'])
                else:
                    continue
    if times<10: #距離が近すぎる場合は予定に追加しない
        return None
    dt = datetime.datetime.strptime(end, '%Y-%m-%dT%H:%M:%S+09:00')
    dt2 = dt + datetime.timedelta(seconds=-times)
    start = dt2.strftime('%Y-%m-%dT%H:%M:%S+09:00')
    return start