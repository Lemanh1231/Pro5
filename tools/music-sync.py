#!/usr/bin/python3
"""Publish local music and atomically refresh the public playlist."""
from pathlib import Path
import hashlib, json, subprocess, os, re

workspace = Path(__file__).resolve().parent.parent
music_source = Path(os.environ.get('MUSIC_SOURCE', str(workspace / 'media/music-source')))
source = music_source / 'songs'
public = Path(os.environ.get('MUSIC_PUBLIC', str(workspace / 'public/data/music')))
public.mkdir(parents=True, exist_ok=True)
tracks = []
for file in sorted(source.iterdir()):
    if not file.is_file() or file.suffix.lower() not in {'.mp3', '.m4a', '.aac', '.ogg', '.opus', '.flac', '.wav'}:
        continue
    key = hashlib.sha256(file.name.encode()).hexdigest()[:16]
    output = public / (key + '.m4a')
    try:
        probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_format', '-of', 'json', str(file)], timeout=30))
        tags = probe.get('format', {}).get('tags', {})
        title = tags.get('title') or file.stem
        artist = tags.get('artist', '')
        cover = '/data/preview.jpg'
        match = re.search(r'Blue Archive OST\s+(\d+)\.\s+(.+?)\s*\[[^\]]+\]$', file.stem)
        if match:
            title, artist = match.group(2), 'Blue Archive OST ' + match.group(1)
        image = music_source / 'images' / (file.stem + '.webp')
        artwork = public / (key + '.webp')
        if image.exists():
            if not artwork.exists() or image.stat().st_mtime > artwork.stat().st_mtime:
                subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-y', '-i', str(image), '-vf', 'scale=160:160:force_original_aspect_ratio=increase,crop=160:160', '-frames:v', '1', str(artwork)], check=True, timeout=30)
            cover = '/data/music/' + artwork.name
        if 'dEfXiVI1Euo' in file.name:
            title, artist, cover = 'Lovely Picnic', 'Blue Archive OST 4', '/data/music/lovely-picnic.webp'
        if 'DzhcJxrS5Z8' in file.name:
            title, artist = 'Connected Sky', 'Blue Archive OST 11'
            image = music_source / 'images' / (file.stem + '.webp')
            artwork = public / (key + '.webp')
            if image.exists():
                if not artwork.exists() or image.stat().st_mtime > artwork.stat().st_mtime:
                    subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-y', '-i', str(image), '-vf', 'scale=160:160:force_original_aspect_ratio=increase,crop=160:160', '-frames:v', '1', str(artwork)], check=True, timeout=30)
                cover = '/data/music/' + artwork.name
        if not output.exists() or file.stat().st_mtime > output.stat().st_mtime:
            temp = public / (key + '.tmp.m4a')
            codec = ['-c:a', 'copy'] if file.suffix.lower() in {'.m4a', '.aac'} else ['-c:a', 'aac', '-b:a', '160k']
            subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-y', '-i', str(file), '-vn', *codec, '-movflags', '+faststart', str(temp)], check=True, timeout=600)
            os.replace(temp, output)
        tracks.append({'src': '/data/music/' + output.name, 'title': title, 'artist': artist, 'cover': cover})
    except (subprocess.SubprocessError, ValueError) as error:
        print(f'Skip {file.name}: {error}', flush=True)
if tracks:
    content = json.dumps(tracks, ensure_ascii=False, indent=2) + '\n'
    target = public / 'playlist.json'
    if not target.exists() or target.read_text() != content:
        temp = public / 'playlist.tmp.json'
        temp.write_text(content)
        os.replace(temp, target)
