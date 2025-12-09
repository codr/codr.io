# Building a Simple Plant Grow Cam from Spare Streaming Gear

Like a lot of engineers, I’ve accumulated a small graveyard of old hardware: streaming gear, Raspberry Pi boards, and cables I can’t bring myself to throw away. I recently decided to put some of it to use and built a DIY plant grow cam. It’s not fancy, but it’s effective.

The tech stack? Bash scripts, `cron` jobs, `fswebcam`, and a `curl` call to control the light. It’s the kind of project that scratches that software-engineer-hacker itch: Linux CLI fundamentals, small automations, and a little physical hardware.

This is how I hacked it together, aimed at other software engineers who might want to do something similar (or just appreciate the elegance of duct-taped solutions that actually work).

## Hardware Setup

Here's what I had lying around:

- Raspberry Pi 4 running Raspberry Pi OS (Debian-based)
- [Logitech StreamCam][streamcam] (USB webcam)
- [Elgato Key Light Air][key-light] (with API for remote on/off)
- [Elgato Wave Mic Arm][mic-arm] to position the camera
- Plant (a small flowering one, the star of the show)

[streamcam]: https://www.logitech.com/en-us/shop/p/streamcam
[key-light]: https://www.elgato.com/us/en/p/key-light-air
[mic-arm]: https://www.elgato.com/us/en/p/wave-mic-arm-lp

The Pi connects via USB to the StreamCam, and the Key Light provides consistent, controlled lighting to make sure each photo looks about the same. I couldn’t get manual focus working via `fswebcam` or `v4l2-ctl`, but the autofocus suffices for now.

- Software & Tools

All of this runs on Linux, with just a few CLI tools:

- `fswebcam` for image capture
- `curl` to control the Key Light via HTTP API
- `cron` to schedule captures
- `rsync` to sync photos to my MacBook
- `ffmpeg` to create a timelapse video and cropping a video of the flower

## The Capture Script

At the heart of it is a simple bash script like this:

```bash
#!/bin/bash

# Turn on key light

curl -X PUT -d '{"on":true}' http://keylight.local:9123/elgato/lights

# Wait for the light to warm up

sleep 2

# Capture the image

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
fswebcam -r 1920x1080 --jpeg 95 /home/codr/grow-cam/$TIMESTAMP.jpg

# Turn off key light

curl -X PUT -d '{"on":false}' http://keylight.local:9123/elgato/lights
```

## Scheduling with Cron

I have this running every 20 minutes via cron. Here’s the crontab entry:

```cron
_/20 _ \* \* \* /home/codr/grow-cam/capture.sh >> /home/codr/grow-cam/log.txt 2>&1
```

This captures the output in a simple log file for troubleshooting.

## Syncing Files

To pull the images onto my MacBook, I use a quick rsync command:

```bash
rsync -avh -e ssh codr@leafy.local:"growcam/image_*" ~/Desktop/growcam/
```

This keeps my local copy in sync for video creation.

## Making the Timelapse

Once I’ve collected a few days of images, I generate a video using ffmpeg:

```bash
EXCLUDE_IMAGES=(
  "image_20250712_015020.jpg"
  "image_20250712_075115.jpg"
  "image_20250712_095157.jpg"
  "image_20250712_102001.jpg"
  "image_20250712_104001.jpg"
  "image_20250712_110001.jpg"
  "image_20250712_112001.jpg"
  "image_20250712_113255.jpg"
  "image_20250712_113552.jpg"
  "image_20250712_113604.jpg"
  "image_20250712_114001.jpg"
  "image_20250712_120001.jpg"
  "image_20250712_122001.jpg"
  "image_20250712_124001.jpg"
  "image_20250712_130001.jpg"
  "image_20250712_132001.jpg"
  "image_20250712_134001.jpg"
  "image_20250712_140001.jpg"
  "image_20250712_142001.jpg"
  "image_20250712_144001.jpg"
  "image_20250712_204001.jpg"
  "image_20250712_210001.jpg"
  "image_20250712_212001.jpg"
  "image_20250712_214001.jpg"
  "image_20250712_220001.jpg"
  "image_20250712_222001.jpg"
  "image_20250712_224001.jpg"
  "image_20250712_230001.jpg"
  "image_20250712_232001.jpg"
  "image_20250712_234001.jpg"
  "image_20250713_000002.jpg"
  "image_20250713_002001.jpg"
  "image_20250713_004001.jpg"
  "image_20250713_010001.jpg"
  "image_20250713_012001.jpg"
  "image_20250713_014001.jpg"
  "image_20250713_020001.jpg"
  "image_20250713_022001.jpg"
  "image_20250713_024001.jpg"
  "image_20250713_030001.jpg"
  "image_20250713_032001.jpg"
  "image_20250713_034001.jpg"
  "image_20250713_040001.jpg"
  "image_20250713_042001.jpg"
  "image_20250713_044001.jpg"
  "image_20250713_050001.jpg"
  "image_20250713_052001.jpg"
  "image_20250713_054001.jpg"
  "image_20250713_060001.jpg"
  "image_20250714_014008.jpg"
  "image_20250714_040008.jpg"
  "image_20250716_222008.jpg"
)

ALL_IMAGES=(~/Desktop/growcam/image_*)

# Create filtered array by removing excluded images
FILTERED_IMAGES=()
for image in "${ALL_IMAGES[@]}"; do
    # Extract just the filename from the full path
    filename=$(basename "$image")

    # Check if this filename is in the exclude list
    exclude_this=false
    for exclude in "${EXCLUDE_IMAGES[@]}"; do
        if [[ "$filename" == "$exclude" ]]; then
            exclude_this=true
            break
        fi
    done

    # If not excluded, add to filtered array
    if [[ "$exclude_this" == false ]]; then
        FILTERED_IMAGES+=("$image")
    fi
done

# Create temporary directory with symlinks
TEMP_DIR=$(mktemp -d)
counter=0
for image in "${FILTERED_IMAGES[@]}"; do
    printf -v padded_counter "%08d" $counter
    ln -s "$image" "$TEMP_DIR/image_${padded_counter}.jpg"
    ((counter++))
done

# Create video from images
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
FFMPEG_PARAMS=(
  -framerate 30
  -i "$TEMP_DIR/image_%08d.jpg"
  -c:v libx264
  -crf 20
  -pix_fmt yuv420p
  ~/Desktop/growcam/videos/output_${TIMESTAMP}.mp4
)
ffmpeg "${FFMPEG_PARAMS[@]}"


#  Flowering Butter Wart
ffmpeg -i ~/Desktop/growcam/videos/output_${TIMESTAMP}.mp4 \
  -vf "crop=170:280:365:220" \
  ~/Desktop/growcam/videos/output_${TIMESTAMP}_flowering_butter_wart.mp4

#  Kenny's Veggies
ffmpeg -i ~/Desktop/growcam/videos/output_${TIMESTAMP}.mp4 \
  -vf "crop=326:180:447:140" \
  ~/Desktop/growcam/videos/output_${TIMESTAMP}_veggies.mp4

# Clean up
rm -rf "$TEMP_DIR"
```

To crop it down to just the flower area:

```bash
ffmpeg -i grow.mp4 -filter:v "crop=500:500:600:200" grow-cropped.mp4
```

## Lessons Learned

- `fswebcam` is simple but can’t control focus on the Logitech StreamCam.
- The Key Light API is dead simple to control via curl.
- Cron and logs are your friend.
- For this kind of low-stakes project, bash is good enough.

## Future Ideas

- Automate the `rsync` pull.
- Set up a tiny static site to view the progress remotely.
- Add an AI layer to detect changes, growth, or potential health issues.
- Solar power the Pi for outdoor experiments.

## Closing

These sorts of side projects remind me why I love software engineering: simple tools, a bit of hardware, and some CLI magic can make something surprisingly satisfying.

If you’re working on something similar, or want to trade plant cam war stories, you can find me online at codr.io.
