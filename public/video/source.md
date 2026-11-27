# Video sources

Originals, encode recipe and posters for the three page videos in this folder.
Rebuild from these paths; the originals are not modified.

## Originals

| Page file | Origin path | Bytes | Duration | Source streams |
|---|---|---|---|---|
| page-v1.mp4 | runs/quota-failover-council/video/nufra-exploration-v1.mp4 | 1,848,384 | 36.000 s | 1080x1350, 30 fps, H.264, no audio |
| page-v2.mp4 | runs/quota-failover-council/video/nufra-exploration-v2.mp4 | 1,589,855 | 39.000 s | 1080x1350, 30 fps, H.264, AAC stereo 48 kHz |
| page-v3.mp4 | runs/quota-failover-council/video/nufra-exploration-v3.mp4 | 8,276,252 | 84.000 s | 1080x1350, 30 fps, H.264, AAC stereo 48 kHz |

Origin paths are relative to the workspace root.

## Encode recipe

Shared video settings:

    -vf "scale=896:1120:flags=lanczos"
    -c:v libx264 -preset slow -crf 26 -profile:v high -level 4.0
    -pix_fmt yuv420p -g 60 -movflags +faststart

Audio:

- page-v1: `-an` (the source has no audio stream)
- page-v2 and page-v3: `-c:a aac -b:a 48k -ac 1 -ar 48000`

Rebuild commands (run from runs/quota-failover-council/video/):

    ffmpeg -y -i nufra-exploration-v1.mp4 -vf "scale=896:1120:flags=lanczos" \
      -c:v libx264 -preset slow -crf 26 -profile:v high -level 4.0 \
      -pix_fmt yuv420p -g 60 -movflags +faststart -an page-v1.mp4

    ffmpeg -y -i nufra-exploration-v2.mp4 -vf "scale=896:1120:flags=lanczos" \
      -c:v libx264 -preset slow -crf 26 -profile:v high -level 4.0 \
      -pix_fmt yuv420p -g 60 -movflags +faststart \
      -c:a aac -b:a 48k -ac 1 -ar 48000 page-v2.mp4

    ffmpeg -y -i nufra-exploration-v3.mp4 -vf "scale=896:1120:flags=lanczos" \
      -c:v libx264 -preset slow -crf 27 -profile:v high -level 4.0 \
      -pix_fmt yuv420p -g 60 -movflags +faststart \
      -c:a aac -b:a 48k -ac 1 -ar 48000 page-v3.mp4

page-v3 uses CRF 27. At CRF 26 the three files totalled 4,204,332 bytes, over the
4,200,000 byte limit, so page-v3 alone was re-encoded one CRF step higher.

## Posters

Same timestamps, same scale, JPEG quality 4:

- poster-v1.jpg — nufra-exploration-v1.mp4 at 4.32 s
- poster-v2.jpg — nufra-exploration-v2.mp4 at 35.9 s
- poster-v3.jpg — nufra-exploration-v3.mp4 at 65.5 s

    ffmpeg -y -ss 65.5 -i nufra-exploration-v3.mp4 -frames:v 1 \
      -vf "scale=896:1120:flags=lanczos" -q:v 4 poster-v3.jpg

## Captions

captions-v3.vtt only. Cue text and times come from the 16-station table in
runs/quota-failover-council/video/build-spec-v3.md. page-v1 has no audio stream
and page-v2 has music and effects only, so neither has a caption track.