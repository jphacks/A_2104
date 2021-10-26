import requests
import json
import datetime

with open('info.json', encoding='utf-8') as f:
    jsn = json.load(f)

all_list = [] #「日ごとのリスト」をまとめたリスト
day_list = [] #日ごとのリスト
day = -1 #日のカウンタ, 日ごとに分けるために使う

for row in jsn:
    summary = row.get('summary') #存在しなければNONE
    start = row['start']['dateTime']
    end = row['end']['dateTime']
    location = row.get('location') #存在しなければNONE
    mydict = {'sum':summary, 'start':start, 'end':end, 'location':location}
    day_list.append(mydict)

print(day_list)