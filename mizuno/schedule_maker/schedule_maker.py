import json
import fun_json_to_list
import fun_add_schedule
import fun_make_schedule
import fun_list_to_json


with open('info.json', encoding='utf-8') as f:
    jsn = json.load(f)

#jsonの内容を日ごとのリストに分別
all_list = fun_json_to_list.json_to_list(jsn)


#1日の最初と最後にダミーの予定を追加
new_all_list = fun_add_schedule.add_schedule(all_list)


#移動の予定を追加
home_address = '宮城県仙台市太白区長町1-1-10' #Noneの場合に設定する自分の家
schedule = fun_make_schedule.make_schedule(new_all_list, home_address)

#scheduleリストをjsonファイルに変換して書き込む

data = fun_list_to_json.list_to_json(schedule)

print(data)