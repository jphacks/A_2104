import fun_place_to_time

def make_schedule(new_all_list, home_address):
    schedule = []
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
            start = fun_place_to_time.place_to_time(destinations, origins, end, mode)
            if start == None: #距離が近すぎる場合
                continue
            location = None
            mydict = {'sum':summary, 'start':start, 'end':end, 'location':location}
            schedule.append(mydict)
    return schedule
