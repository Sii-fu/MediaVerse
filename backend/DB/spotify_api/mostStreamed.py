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

def fetch_trending_song_ids(token):
    playlist_id = "5ABHKGoOzxkaa28ttQV9sE"  # from my playlist
    # playlist_id = "37i9dQZEVXbMDoHDwVN2tF"  # from Spotify's playlists
    url = f"https://api.spotify.com/v1/playlists/{playlist_id}"
    response = requests.get(url, headers=get_auth_header(token))
    
    if response.status_code == 200:
        return response.json().get("tracks", {}).get("items", [])[:20]
    else:
        print(f"Error fetching trending songs: {response.status_code} - {response.json().get('error', {}).get('message', '')}")
        return None
    
def main():
    token = get_token()
    if not token:
        print("Failed to get token")
        return

    trending_songs = fetch_trending_song_ids(token)
    if trending_songs is None:
        print("Failed to fetch trending songs")
        return

    songs_data = [
        {
            "id": song["track"]["id"],
            "title": song["track"]["name"],
            "album": song["track"]["album"]["name"],
            "artists": [artist["name"] for artist in song["track"]["artists"]],
            "duration": song["track"]["duration_ms"] / 1000,
            "popularity": song["track"]["popularity"],
            "coverImage": song["track"]["album"]["images"][0]["url"] if song["track"]["album"]["images"] else None
        }
        for song in trending_songs if song.get("track")
    ]

    print(json.dumps(songs_data, indent=4))

if __name__ == "__main__":
    main()
