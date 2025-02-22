import sys
from dotenv import load_dotenv
import os
import base64
import requests
import json

load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

def get_token():
    auth_str = f"{client_id}:{client_secret}"
    auth_bytes = auth_str.encode("utf-8")
    auth_b64 = str(base64.b64encode(auth_bytes), "utf-8")
    url = "https://accounts.spotify.com/api/token"
    headers = {"Authorization": "Basic " + auth_b64,"Content-Type": "application/x-www-form-urlencoded"}
    data = {"grant_type": "client_credentials"}
    result = requests.post(url, headers=headers, data=data)
    json_result = json.loads(result.text)
    return json_result["access_token"]

def get_auth_header(token):
    return {"Authorization": f"Bearer {token}"}

def fetch_search_results(token, query):
    url = "https://api.spotify.com/v1/search"
    headers = get_auth_header(token)
    params = {"q": query, "type": "track", "limit": 10}
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json()
    return {}

def main(query):
    token = get_token()
    if not token:
        print("Failed to get token")
        return

    search_results = fetch_search_results(token, query)
    if not search_results:
        print("Failed to fetch search results")
        return

    refined_results = {
        "tracks": [
            {
                "id": track["id"],
                "title": track["name"],
                "album": track["album"]["name"],
                "artists": [artist["name"] for artist in track["artists"]],
                "duration": int(track["duration_ms"] / 1000),  # Convert to seconds and truncate fractional part
                "popularity": track["popularity"],
                "coverImage": track["album"]["images"][0]["url"] if track["album"]["images"] else None
            }
            for track in search_results.get("tracks", {}).get("items", [])
        ]
    }
    print(json.dumps(refined_results, indent=4))

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Music ID is required"}))
        sys.exit(1)
    key = sys.argv[1]
    main(key)