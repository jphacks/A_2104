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
        
    def insert_event(self,calendar_id,start,end):
        try:
            credentials = self.get_credentials()
            http = credentials.authorize(httplib2.Http())
            service = discovery.build("calendar", "v3", http=http,cache_discovery=False)
            
            event_body = {
                'summary': '移動',
                'start': {'dateTime': f'{start}', 'timeZone': 'Asia/Tokyo'},
                'end': {'dateTime': f'{end}', 'timeZone': 'Asia/Tokyo'},
                'colorId':'6',
                }
            
            
            res = service.events().insert(calendarId=calendar_id,body=event_body).execute()
            
        except Exception as e:
            raise Exception(f"Error:{e}")
        
        
        return res


def lambda_handler(event, context):
    GoogleCal = GoogleCalendar()
    
    email = event["email"]
    contents = event["body"]
    
    for content in contents:
        start = content["start"]
        end = content["end"]
        
        GoogleCal.insert_event(email,start,end)
    
    
    return {
        'statusCode': 200,
        'body': json.dumps('Success')
    }
