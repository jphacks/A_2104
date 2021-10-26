import requests

url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=40.6655101%2C-73.89188969999998&destinations=40.659569%2C-73.933783&key=***"

payload={}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)