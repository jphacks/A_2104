import os
import json
import datetime

import httplib2
from oauth2client.service_account import ServiceAccountCredentials

from apiclient import discovery

import traceback


class GoogleCalendar(object):
    def __init__(self):
        self.service_account_id = os.environ["GOOGLE_SERVICE_ACCOUNT_ID"]

    def get_credentials(self):
        scopes = "https://www.googleapis.com/auth/calendar"

        credentials = ServiceAccountCredentials.from_json_keyfile_name(
            "google_key.json", scopes=scopes
        )

        return credentials

    def get_schedule(self, calendar_id, time_min, time_max):
        try:
            credentials = self.get_credentials()
            http = credentials.authorize(httplib2.Http())
            service = discovery.build("calendar", "v3", http=http,cache_discovery=False)

            events = (
                service.events()
                .list(
                    calendarId=calendar_id,
                    timeMin=time_min,
                    timeMax=time_max,
                    singleEvents=True,
                )
                .execute()
            )

            items = events["items"]

            return items

        except Exception as e:
            raise Exception(f"Error:{e}")

def reset_time(dt)->str:
    return dt.strftime("%Y-%m-%dT00:00:00+09:00")

def calc_dur(days):
    start = datetime.datetime.now()
    end = start + datetime.timedelta(days = days)
    
    return reset_time(start),reset_time(end)

def cal_parser(cals):
    ret = []
    
    for i in range(len(cals)):
        in_dict = {}
        
        in_dict["title"]=cals[i]["summary"]
        in_dict["location"]=cals[i].get("location")
        
        if in_dict["location"] is not None:
            in_dict["backgroundColor"] = "#0099FF"
        else:
            in_dict["backgroundColor"] = "#66CCCC"
        
        in_dict["start"]=cals[i]["start"]["dateTime"]
        in_dict["end"]=cals[i]["end"]["dateTime"]
        
        if in_dict["title"] == "移動":
            in_dict["backgroundColor"] = "red"
        
        ret.append(in_dict)
    
    return ret

def cal_validate(cals):
    to_pop = []
    cals_ = cals.copy()
    for i in range(len(cals)):
        location = cals[i]["location"]
        if (location == None) or (location == "自宅") or (location == "オンライン"):
            to_pop.append(i)
    
    for i in sorted(to_pop, reverse=True):
        cals_.pop(i)
    
    return cals_

def lambda_handler(event, context):
    
    email = event["email"]
    days = int(event["days"])
    
    time_start,time_end = calc_dur(days)
    
    print(time_start,time_end)
    
    
    cal = GoogleCalendar()
    
    #cals : list [dict]. Length is a number of event within the duaration
    
    cals = (
        cal.get_schedule(
            email,
            time_start,
            time_end,
        )
    )
    
    parsed_cals = cal_parser(cals) #delete unnecessary infomation
    validated_cals = cal_validate(parsed_cals) #cal info to calc transportations
    
    res = [parsed_cals,validated_cals]
    

    return {"statusCode": 200, "body": json.dumps(res)}