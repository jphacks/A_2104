import os
import json
import urllib
import requests

import datetime


def get_time(origins,destinations,mode):
    qs = {"origins":origins,"destinations":destinations,"mode":mode,"key":os.environ["API_KEY"]}
    d_qs = urllib.parse.urlencode(qs)
    url = os.environ["API_ENDPOINT"] + d_qs

    payload={}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)
    res = json.loads(response.text)
    return res['rows'][0]['elements'][0]['duration']['value']


def calc_transportation(body):
    """
    移動の予定のみreturn.
    """
    margin = 5*60 #margin before next event start
    ret = []
    for i in range(len(body)):

        
        indict = {}
        if i==0:
            dur = get_time(os.environ["HOME"],body[i]["location"],body[i]["mode"])
        else:
            dur = get_time(body[i-1]["location"],body[i]["location"],body[i]["mode"])  
            
        t_delta = datetime.timedelta(seconds=(dur+margin))
        t_delta_margin = datetime.timedelta(seconds=margin)
        
        dt = datetime.datetime.fromisoformat(body[i]["start"])
        
        indict["title"] = "移動"
        indict["start"] = (dt - t_delta).isoformat()
        indict["end"] = (dt - t_delta_margin).isoformat()
        indict["backgroundColor"] = "#FFCC99"
        
        ret.append(indict)
    
    return ret



def lambda_handler(event, context):
    events = event["body"]
    transport_events = calc_transportation(events)
    
    combined_events = events + transport_events
    
    res = [combined_events,transport_events]
    
    return {
        'statusCode': 200,
        'body': json.dumps(res)
    }
