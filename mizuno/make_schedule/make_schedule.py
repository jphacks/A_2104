import requests
import json
import datetime

#all_listからnew_all_listへ書き換える

with open('info.json', encoding='utf-8') as f:
    jsn = json.load(f)

all_list = [] #「日ごとのリスト」をまとめたリスト
day_list = [] #日ごとの予定(sum, start, end, locationの辞書)リスト
day_cnt = -1 #日のカウンタ, 日ごとに分けるために使う

for row in jsn:
    summary = row.get('summary') #存在しなければNONE
    start = row['start']['dateTime']
    end = row['end']['dateTime']
    location = row.get('location') #存在しなければNONE
    mydict = {'sum':summary, 'start':start, 'end':end, 'location':location}
    dt = datetime.datetime.strptime(start, '%Y-%m-%dT%H:%M:%S+09:00')
    if dt.day!=day_cnt: #前の予定と日付が異なればリストを切り替える
        if day_cnt>0:
            all_list.append(day_list)
            day_list = []
        day_cnt = dt.day
    day_list.append(mydict)

all_list.append(day_list) #最後の日のリストを追加

#ここまでjson_to_list

#all_listからnew_all_listへ

new_all_list = []
new_day_list = []

for day_list in all_list:
    new_day_list = []
    dt = datetime.datetime.strptime(day_list[0]['start'], '%Y-%m-%dT%H:%M:%S+09:00')
    day = dt.day
    summary = str(day) + '日開始'
    start = dt.strftime('%Y-%m-%dT%H:%M:%S+09:00')
    end = dt.strftime('%Y-%m-%dT%H:%M:%S+09:00')
    location = None
    st_dict = {'sum':summary, 'start':start, 'end':end, 'location':location}
    new_day_list.append(st_dict)

    for dic in day_list:
        new_day_list.append(dic)

    n = len(day_list)
    dt = datetime.datetime.strptime(day_list[n-1]['end'], '%Y-%m-%dT%H:%M:%S+09:00')
    day = dt.day
    summary = str(day) + '日終了'
    start = dt.strftime('%Y-%m-%dT%H:%M:%S+09:00')
    end = dt.strftime('%Y-%m-%dT%H:%M:%S+09:00')
    location = None
    end_dict = {'sum':summary, 'start':start, 'end':end, 'location':location}
    new_day_list.append(end_dict)

    new_all_list.append(new_day_list)


#ここまでadd_schedule

#new_all_listに予定を追加したscheduleリストを作成する

schedule = []
home_address = '宮城県仙台市太白区長町1-1-10' #Noneの場合は自分の家

for day_list in new_all_list:
    for i, dic in enumerate(day_list):
        schedule.append(dic)
        if i == len(day_list)-1: continue
        summary = '移動'
        destinations = day_list[i+1]['location']
        origins = day_list[i]['location']
        #位置情報が無い場合は代わりに自分の住所を入力
        if destinations == None: destinations = home_address
        if origins == None: origins = home_address
        end = day_list[i+1]['start']
        mode = 'driving'
        #以下place_to_time
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
        if times<10: continue #距離が近すぎる場合は予定に追加しない
        dt = datetime.datetime.strptime(end, '%Y-%m-%dT%H:%M:%S+09:00')
        dt2 = dt + datetime.timedelta(seconds=-times)
        #ここまでplace_to_time
        start = dt2.strftime('%Y-%m-%dT%H:%M:%S+09:00')
        mydict = {'sum':summary, 'start':start, 'end':end, 'location':location}
        schedule.append(mydict)

print(schedule)
