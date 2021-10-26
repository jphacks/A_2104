最終更新(10/26 16:50)

# schedule_maker
* googleカレンダーの元々の予定(json)を受け取り、移動などが追加された新しい予定が追加された予定(json)を返す
* json_to_list, add_schedule, make_schedule(place_to_time), list_to_json からなる
* (未実装)初期設定時に得られる基本情報も受け取る?(home_addressなど)

## json_to_list
* 受け取ったjsonから必要な情報を抜き取り、リストにまとめる
* 各予定は辞書(sum, start, end, location) になっている(追加の余地あり)
* 例) {'sum': 'お寝んねする', 'start': '2021-10-27T21:00:00+09:00', 'end': '2021-10-27T22:00:00+09:00', 'location': None}
* location = None の場合は自分の家の住所として処理
* リストは日付(予定のstartの日)によって分別してる。日をまたぐ予定は考慮してない
* 日付しか見ていないため、10/1 と 11/1は区別しない実装(1か月以上離れた予定はまとめてやらない前提)

## place_to_time
* 2地点の場所と移動手段を受け取り、所要時間を返す
* Distance Matrix API を使用して計算
* make_scheduleに使われている
* bicycling と transit はバグる(未解決)ので、原則 walking か driving のみ

## add_schedule
* 日ごとのリストの最初と最後に「〇〇日最初」「〇〇日最後」というダミーの予定を追加する
* それぞれ位置は自分の住所(home_address)とする
* (未実装)お風呂や睡眠を考慮して追加する機能

## make_schedule
* 日ごとのリスト(最初と最後も追加されたやつ)に、「移動」の予定を追加し、1つのリスト(schedule)にまとめる
* 連続する二つの予定の場所を見て予定を作る。予定の長さは計算、終了時間は次の予定の開始時間と同じ
* 移動時間が極端に短い場合(2つの予定が同じ場所など)のときは予定に追加しない
* (未実装)driving と walking の設定

## list_to_json
* scheduleの中身をすべてjsonファイルに書き込む
* 形式は(sum, start, end, location)，変える可能性あり
* (未実装)1日の最初と最後のダミーは書き込まないように