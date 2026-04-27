#!/bin/bash
# Download videos
yt-dlp -f 'bestvideo[height<=720]+bestaudio/best[height<=720]' "https://youtu.be/WsILHnwc4As" -o "video1_raw.mp4"
yt-dlp -f 'bestvideo[height<=720]+bestaudio/best[height<=720]' "https://youtu.be/qZjrlj7bk28" -o "video2_raw.mp4"

# Compress videos
ffmpeg -y -i video1_raw.mp4 -vcodec libx264 -crf 28 -preset fast -acodec aac -b:a 128k public/videos/m1_lecon1.mp4
ffmpeg -y -i video2_raw.mp4 -vcodec libx264 -crf 28 -preset fast -acodec aac -b:a 128k public/videos/m1_lecon2.mp4

# Clean up raw files
rm video1_raw.mp4 video2_raw.mp4
