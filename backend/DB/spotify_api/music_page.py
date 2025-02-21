from dotenv import load_dotenv
import os
import base64
import requests
import json
import sys
import time

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
    
    for _ in range(3):  # Retry up to 3 times
        try:
            result = requests.post(url, headers=headers, data=data)
            result.raise_for_status()
            json_result = result.json()
            return json_result["access_token"]
        except requests.exceptions.RequestException as e:
            print(f"Error fetching token: {e}")
            time.sleep(1)  # Wait for 1 second before retrying
    
    return None

def get_auth_header(token):
    return {"Authorization": f"Bearer {token}"}

def fetch_song_details(token, song_id):
    url = f"https://api.spotify.com/v1/tracks/{song_id}"
    headers = get_auth_header(token)
    
    for _ in range(3):  # Retry up to 3 times
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching song details: {e}")
            time.sleep(1)  # Wait for 1 second before retrying
    
    return {}

def fetch_top_song_from_artist(token, artist_id):
    url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks"
    headers = get_auth_header(token)
    params = {"market": "US"}
    
    for _ in range(3):  # Retry up to 3 times
        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            return response.json().get("tracks", [])
        except requests.exceptions.RequestException as e:
            print(f"Error fetching top songs from artist: {e}")
    
    return []

def main(music_id):
    token = get_token()
    if not token:
        print(json.dumps({"error": "Failed to get token"}))
        return
    
    songs_data = fetch_song_details(token, music_id)
    if not songs_data:
        print(json.dumps({"error": "Failed to fetch song details"}))
        return    
    refined_data = {
        "title": songs_data.get("name"),
        "artist": songs_data["artists"][0]["name"] if songs_data.get("artists") else None,
        "album": songs_data["album"]["name"] if songs_data.get("album") else None,
        "release_date": songs_data["album"]["release_date"] if songs_data.get("album") else None,
        "duration": songs_data.get("duration_ms", 0) / 1000,
        "popularity": songs_data.get("popularity"),
        "cover_image": songs_data["album"]["images"][0]["url"]
            if songs_data.get("album") and songs_data["album"].get("images") else None,
        "spotify_url": songs_data["external_urls"]["spotify"] if songs_data.get("external_urls") else None,
        "songs_from_same_artist": [
            {
                "id": song["id"],
                "title": song["name"],
                "album": song["album"]["name"],
                "duration": song["duration_ms"] / 1000,
                "cover_image": song["album"]["images"][0]["url"]
                    if song["album"].get("images") else None
            }
            for song in fetch_top_song_from_artist(token, songs_data["artists"][0]["id"])
        ]
    }

    print(json.dumps(refined_data, indent=4)) 

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Music ID is required"}))
        sys.exit(1)
    music_id = sys.argv[1]
    main(music_id)