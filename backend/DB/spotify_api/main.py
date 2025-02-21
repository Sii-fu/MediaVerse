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
    headers = {
        "Authorization": "Basic " + auth_b64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}
    
    result = requests.post(url, headers=headers, data=data)
    json_result = json.loads(result.text)
    return json_result["access_token"]

def get_auth_header(token):
    return {"Authorization": f"Bearer {token}"}

def fetch_trending_song_ids(token):
    playlist_id = "37i9dQZEVXbMDoHDwVN2tF"  # Top 50 Global playlist ID
    url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    headers = get_auth_header(token)
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        items = response.json().get("items", [])
        return [item["track"]["id"] for item in items[:10]]
    return []

def fetch_top_10_artist_ids(token):
    url = "https://api.spotify.com/v1/search"
    headers = get_auth_header(token)
    params = {"q": "a", "type": "artist", "limit": 50}
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        items = response.json().get("artists", {}).get("items", [])
        sorted_artists = sorted(items, key=lambda artist: artist.get("popularity", 0), reverse=True)
        return [artist.get("id") for artist in sorted_artists[:10]]
    return []

def all_details_of_song(token, song_id):
    url = f"https://api.spotify.com/v1/tracks/{song_id}"
    headers = get_auth_header(token)
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    return {}

def top_songs_from_artist(token, artist_id):
    url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks"
    headers = get_auth_header(token)
    params = {"market": "US"}
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        items = response.json().get("tracks", [])
        return items[:3]
    return []

def fetch_top_5_songs_for_artists(token, artist_ids):
    top_songs = {}
    for artist_id in artist_ids:
        url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks"
        headers = get_auth_header(token)
        params = {"market": "US"}
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            tracks = response.json().get("tracks", [])
            top_songs[artist_id] = [track["name"] for track in tracks[:5]]
    return top_songs

def main():
    token = get_token()
    trending_song_ids = fetch_trending_song_ids(token)
    top_10_artist_ids = fetch_top_10_artist_ids(token)
    top_songs_from_artist_songs = [top_songs_from_artist(token, artist_id) for artist_id in top_10_artist_ids]
    trending_songs = [all_details_of_song(token, song_id) for song_id in trending_song_ids]
    
    data = {
        "trending_songs": trending_songs,
        "top_songs_from_artist": top_songs_from_artist_songs
    }
    
    print(json.dumps(data))

if __name__ == "__main__":
    main()