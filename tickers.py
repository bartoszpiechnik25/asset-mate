import json

with open("/home/barti/asset-mate/yhallsym.json") as file:
    d = json.load(file)

with open("res.json") as file:
    json.dump(d, file, indent=4)
