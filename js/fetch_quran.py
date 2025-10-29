import requests
import json

# API endpoint for the entire Quran in Uthmani script
url = "https://api.alquran.cloud/v1/quran/quran-uthmani"

response = requests.get(url)
data = response.json()

quran = []

for surah in data["data"]["surahs"]:
    surah_obj = {
        "name": surah["name"],
        "englishName": surah["englishName"],
        "ayahs": [{"text": ayah["text"]} for ayah in surah["ayahs"]]
    }
    quran.append(surah_obj)

# Save to JSON file
with open("full_quran.json", "w", encoding="utf-8") as f:
    json.dump(quran, f, ensure_ascii=False, indent=2)

print("✅ Quran JSON saved as full_quran.json")
