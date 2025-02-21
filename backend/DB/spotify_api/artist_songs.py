from dotenv import load_dotenv
import os
import base64
import requests
import json
import sys

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

def fetch_artist_songs(token, artist_id):
    url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks"
    headers = get_auth_header(token)
    params = {"market": "US"}
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json().get("tracks", [])
    return []

def fetch_artist_data(token, artist_id):
    url = f"https://api.spotify.com/v1/artists/{artist_id}"
    headers = get_auth_header(token)
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()

    return {}

def fetch_artist_albums(token, artist_id):
    url = f"https://api.spotify.com/v1/artists/{artist_id}/albums"
    headers = get_auth_header(token)
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json().get("items", [])
    return []


def main(artist_id):
    token = get_token()
    if not token:
        print("Failed to get token")
        return
    
    artist_data = fetch_artist_data(token, artist_id)

    refined_data = {
        "name": artist_data["name"],
        "followers": artist_data["followers"]["total"],
        "popularity": artist_data["popularity"],
        "genres": artist_data["genres"],
        "image": artist_data["images"][0]["url"] if artist_data.get("images") else None,
        "songs": [
            {
                "id": song["id"],
                "title": song["name"],
                "album": song["album"]["name"],
                "duration": song["duration_ms"] / 1000,
                "cover_image": song["album"]["images"][0]["url"] if song["album"]["images"] else None
            }
            for song in fetch_artist_songs(token, artist_id)
        ],
        "albums": [
            {
                "id": album["id"],
                "name": album["name"],
                "release_date": album["release_date"],
                "cover_image": album["images"][0]["url"] if album.get("images") else None
            }
            for album in fetch_artist_albums(token, artist_id)
        ]
        
    }

    print(json.dumps(refined_data)) 

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Music ID is required"}))
        sys.exit(1)
    artist_id = sys.argv[1]
    main(artist_id)

