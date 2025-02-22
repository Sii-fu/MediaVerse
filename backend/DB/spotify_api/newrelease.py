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

def fetch_new_release_song_ids(token):
    url = f"https://api.spotify.com/v1/browse/new-releases"
    headers = get_auth_header(token)
    params = {"limit": 50}
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        return response.json().get("albums", {}).get("items", [])[:10]
    else:
        print(f"Error fetching new release songs: {response.status_code} - {response.json().get('error', {}).get('message', '')}")
        return None

def main():
    token = get_token()
    if not token:
        print(json.dumps({"error": "Failed to get token"}))
        return
    tracks = fetch_new_release_song_ids(token)
    if tracks is None:
        print(json.dumps({"error": "Failed to fetch new release songs"}))
        return
    
    albums_data = [
        {
            "id": album["id"],
            "title": album["name"],
            "artists": [artist["name"] for artist in album["artists"]],
            "release_date": album["release_date"],
            "image": album["images"][0]["url"] if album["images"] else None
        }
        for album in tracks
    ]
    print(json.dumps(albums_data, indent=4))

if __name__ == "__main__":
    main()