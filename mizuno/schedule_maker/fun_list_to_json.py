import json
import pickle

def list_to_json(schedule):
    with open('data.json', 'wb') as fp:
        pickle.dump(schedule, fp)

    with open('data.json', 'rb') as fp:
        data = pickle.load(fp)

    return data