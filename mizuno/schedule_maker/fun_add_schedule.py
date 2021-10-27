import requests
import json
import datetime

#all_listからnew_all_listへ書き換える

#日の最初と最後にダミーの予定を追加する

def add_schedule(all_list):
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
    return new_all_list
