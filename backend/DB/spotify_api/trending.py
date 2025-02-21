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
    playlist_id = "7FcG7jsKqC264Hkki4IyW1"  # from my playlist
    # playlist_id = "37i9dQZEVXbMDoHDwVN2tF"  # from Spotify's playlists
    url = f"https://api.spotify.com/v1/playlists/{playlist_id}"
    response = requests.get(url, headers=get_auth_header(token))
    
    if response.status_code == 200:
        return response.json().get("tracks", {}).get("items", [])
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
            "duration": song["track"]["duration_ms"] / 1000,
            "popularity": song["track"]["popularity"],
            "cover_image": song["track"]["album"]["images"][0]["url"] if song["track"]["album"]["images"] else None
        }
        for song in trending_songs if song.get("track")
    ]

    print(json.dumps(songs_data, indent=4))

if __name__ == "__main__":
    main()



# def fetch_top_10_artist_ids(token):
#     url = "https://api.spotify.com/v1/search"
#     headers = get_auth_header(token)
#     params = {"q": "a", "type": "artist", "limit": 50}
#     response = requests.get(url, headers=headers, params=params)
#     if response.status_code == 200:
#         items = response.json().get("artists", {}).get("items", [])
#         sorted_artists = sorted(items, key=lambda artist: artist.get("popularity", 0), reverse=True)
#         return [artist.get("id") for artist in sorted_artists[:10]]
#     return []

# def all_details_of_song(token, song_id):
#     url = f"https://api.spotify.com/v1/tracks/{song_id}"
#     headers = get_auth_header(token)
#     response = requests.get(url, headers=headers)
#     if response.status_code == 200:
#         return response.json()
#     return {}

# def top_songs_from_artist(token, artist_id):
#     url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks"
#     headers = get_auth_header(token)
#     params = {"market": "US"}
#     response = requests.get(url, headers=headers, params=params)
#     if response.status_code == 200:
#         items = response.json().get("tracks", [])
#         return items[:3]
#     return []

# def fetch_top_5_songs_for_artists(token, artist_ids):
#     top_songs = {}
#     for artist_id in artist_ids:
#         url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks"
#         headers = get_auth_header(token)
#         params = {"market": "US"}
#         response = requests.get(url, headers=headers, params=params)
#         if response.status_code == 200:
#             tracks = response.json().get("tracks", [])
#             top_songs[artist_id] = [track["name"] for track in tracks[:5]]
#     return top_songs

