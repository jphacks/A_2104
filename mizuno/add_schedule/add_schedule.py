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

print(new_all_list)
