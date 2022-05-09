# API som ligger som et lag mellom Nettsiden min og finanstilsynet (Ungå CORS problemer)
# Hoster siden med flask, og skaffer dataen med requests.
# Sender ved en Allow Cors Origin header for att browser ikke skal klage på cros-site scripting :)
# (Hele siden kan unngås ved at siden kjører på riktig domene)

import requests
import flask
app = flask.Flask(__name__)

@app.route('/')
def hello_world():
    return requests.get("https://api.finanstilsynet.no/registry/v1/legal-entities/search?query="+flask.request.args.get("query")).text

@app.after_request
def headerthings(response):
	response.headers.add('Access-Control-Allow-Origin', "http://192.168.186.200")
	return response

if __name__ == '__main__':
    app.run(host="192.168.186.200")