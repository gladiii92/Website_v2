"""
NobleCutGems Automated Luxury Reel Generator & Visual QA Pipeline
-----------------------------------------------------------------
Transforms raw gemstone videos (pinzette/360/finger) into viral, high-converting
vertical 9:16 reels for Instagram Reels, TikTok, and YouTube Shorts.

Features:
- Giant, high-contrast scroll-stopping hooks (Georgia Bold 56-58px)
- Smooth cinematic alpha fade transitions between text phases (zero hard cuts)
- Background music integration with automatic offset slicing from Sunlight_on_Polished_Stone.mp3 (-25% volume)
- Clean, high-impact consumer benefits (no boring textbook jargon)
- Visual QA System with interactive HTML gallery (video player + 3 inspection frames per stone)
"""

import os
import sys
import json
import argparse
import subprocess
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent
DATA_FILE = ROOT_DIR / "src" / "data" / "gemstones.json"
OUTPUT_DIR = ROOT_DIR / "output_reels"
QA_DIR = OUTPUT_DIR / "qa_frames"
AUDIO_FILE = OUTPUT_DIR / "Sunlight_on_Polished_Stone.mp3"
FONT_SERIF = "font_serif.ttf"
FONT_SANS = "font_sans.ttf"

# High-Converting Hook & Benefit Copy Database
CATEGORY_COPY = {
    "sapphire": {
        "hook_title": "90% OF SAPPHIRES ARE BOILED",
        "hook_sub": "Treated at 1,800°C with chemicals to fake blue...",
        "hook_bottom": "Zero Heat. 100% Rare Earth-Grown Color.",
        "proof_bottom": "Zero Heat. Zero Glass-Filling. Pure Earth Fire."
    },
    "spinel": {
        "hook_title": "MORE RARE THAN DIAMONDS",
        "hook_sub": "The Royal Gem Mistaken for Rubies...",
        "hook_bottom": "100% Natural Earth Fire • Zero Heating",
        "proof_bottom": "Never Heated. Never Treated. 100% Earth-Born."
    },
    "peridot": {
        "hook_title": "FORGED IN EARTH'S MANTLE",
        "hook_sub": "Born in deep volcanic magma 30 miles down...",
        "hook_bottom": "Electric Lime Fire • 100% Natural & Untreated",
        "proof_bottom": "Natural Crystalline Brilliance. Zero Enhancements."
    },
    "garnet": {
        "hook_title": "MORE FIRE THAN A DIAMOND",
        "hook_sub": "Higher rainbow dispersion than fine diamonds...",
        "hook_bottom": "Rare African Fire • Mined Out Historic Deposit",
        "proof_bottom": "Zero Heat. Zero Treatments. Pure Natural Dispersion."
    },
    "ruby": {
        "hook_title": "99% OF RUBIES ARE GLASS-FILLED",
        "hook_sub": "Here is real untreated chromium red fire...",
        "hook_bottom": "Direct from Mine • Zero Lead Glass or Dyes",
        "proof_bottom": "Certified Pure Red Corundum. Ultra-Rare Earth Fire."
    },
    "emerald": {
        "hook_title": "ZERO RESIN • ZERO OILS",
        "hook_sub": "The rarest untreated natural green emerald...",
        "hook_bottom": "Authentic Earth Crystal with Natural Jardin",
        "proof_bottom": "Clean Earth-Grown Crystal. Never Oil Soaked."
    },
    "topaz": {
        "hook_title": "NOT IRRADIATED BLUE TOPAZ",
        "hook_sub": "Historic Katlang Imperial Champagne fire...",
        "hook_bottom": "100% Natural Color • Never Exposed to Radiation",
        "proof_bottom": "Rare Pastel Fire Direct from High Mountain Mines."
    },
    "tourmaline": {
        "hook_title": "NATURE'S ELECTRIC NEON",
        "hook_sub": "Rare pyroelectric crystals that shift in light...",
        "hook_bottom": "Watch the color shift as the stone turns",
        "proof_bottom": "100% Untreated Natural Crystal Fire."
    }
}

DEFAULT_COPY = {
    "hook_title": "UNEARTHED NATURAL GEMSTONE",
    "hook_sub": "Inspected under 10x gemological macro lighting...",
    "hook_bottom": "100% Untreated Earth Fire • Direct from Mine",
    "proof_bottom": "Mine-Direct Sourcing. Zero Enhancements."
}


def load_gemstones():
    if not DATA_FILE.exists():
        print(f"Error: {DATA_FILE} does not exist.")
        sys.exit(1)
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def find_best_raw_video(stone):
    candidates = stone.get("gallery_images", []) + [stone.get("video_url", "")]
    videos = [c for c in candidates if c and c.endswith(".mp4")]
    
    # Priority: pinzette (tweezers macro) -> finger (scale) -> 360
    for v in videos:
        if "pinzette" in v:
            clean_path = v.lstrip("/")
            if (ROOT_DIR / "public" / clean_path.replace("public/", "")).exists():
                return ROOT_DIR / "public" / clean_path.replace("public/", "")
            if (ROOT_DIR / clean_path).exists():
                return ROOT_DIR / clean_path
                
    for v in videos:
        if "finger" in v or "360" in v:
            clean_path = v.lstrip("/")
            if (ROOT_DIR / "public" / clean_path.replace("public/", "")).exists():
                return ROOT_DIR / "public" / clean_path.replace("public/", "")
            if (ROOT_DIR / clean_path).exists():
                return ROOT_DIR / clean_path
                
    return None


def format_origin(origin_code):
    mapping = {
        "ceylon": "Sri Lanka (Ceylon)",
        "sri lanka": "Sri Lanka",
        "tanzania": "Tanzania",
        "pakistan": "Pakistan",
        "madagascar": "Madagascar",
        "mali": "Mali (Africa)",
        "colombia": "Colombia"
    }
    return mapping.get(str(origin_code).lower(), str(origin_code).title())


def format_english_title(stone):
    carat = stone.get("carat_weight", "")
    origin_code = str(stone.get("origin", "")).lower()
    origin_adj = {
        "ceylon": "Ceylon",
        "sri lanka": "Ceylon",
        "tanzania": "Tanzanian",
        "pakistan": "Pakistani",
        "madagascar": "Madagascar",
        "mali": "Mali",
        "colombia": "Colombian"
    }.get(origin_code, origin_code.title())
    
    color_de = stone.get("color", "")
    color_en_map = {
        "Gelb": "Yellow",
        "Blau": "Blue",
        "Rosa": "Pink",
        "Rot": "Red",
        "Grün": "Green",
        "Lila": "Purple",
        "Grau": "Grey",
        "Weiss": "White",
        "Champagner": "Champagne",
        "Teal": "Teal",
        "Vivid Green": "Vivid Green",
        "Vivid Purple": "Vivid Purple",
        "Electric Blue": "Electric Blue",
        "Rotlich Rosa": "Reddish Pink",
        "Lila Grau": "Lilac Grey",
        "Hellrosa": "Light Pink",
        "Gelb Braun": "Golden Brown",
        "Gelbgruen": "Yellow-Green"
    }
    color_en = color_en_map.get(color_de, color_de)
    type_en = stone.get("type", "").capitalize()
    
    if type_en.lower() == "garnet" and "mali" in origin_code:
        return f"{carat}ct Mali Fire Garnet"
    
    if color_en.lower() in type_en.lower():
        return f"{carat}ct {origin_adj} {type_en}"
    
    return f"{carat}ct {origin_adj} {color_en} {type_en}".strip()


def build_stone_copy(stone):
    gem_type = stone.get("type", "").lower()
    copy_template = CATEGORY_COPY.get(gem_type, DEFAULT_COPY)
    
    proof_headline = format_english_title(stone)
    origin_display = format_origin(stone.get("origin", ""))
    cut = stone.get("cut", "Custom").title()
    clarity = stone.get("clarity", "Eye-Clean")
    proof_subheadline = f"{cut} Cut • {clarity} Clarity • {origin_display}"
    
    return {
        "hook_title": copy_template["hook_title"],
        "hook_sub": copy_template["hook_sub"],
        "hook_bottom": copy_template["hook_bottom"],
        "proof_title": proof_headline,
        "proof_sub": proof_subheadline,
        "proof_bottom": copy_template["proof_bottom"],
    }


def render_reel(stone, input_video_path, output_mp4, duration=12):
    copy_data = build_stone_copy(stone)
    
    # Calculate audio offset: different segment for each stone from 63s mp3
    stone_id = stone.get("id", 1)
    audio_offset = (stone_id * 7) % 45

    # Visual Filter with cinematic alpha dissolve transitions (0.4s fade-in & fade-out)
    vf_parts = [
        # 1. Background blurred & darkened
        "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=25:5,eq=brightness=-0.35[bg]",
        
        # 2. Overlay original video centered
        "[bg][0:v]overlay=(W-w)/2:(H-h)/2[base]",
        
        # --- PHASE 1: THE MASSIVE HOOK (0.0s - 4.0s) ---
        # Smooth dissolve in (0-0.4s), dissolve out (3.6-4.0s)
        f"[base]drawtext=fontfile='{FONT_SERIF}':text='{copy_data['hook_title']}':expansion=none:fontcolor=0xFCD34D:fontsize=56:x=(w-text_w)/2:y=170:alpha='if(lt(t,0.4),t/0.4,if(gt(t,3.6),(4.0-t)/0.4,1))':enable='between(t,0,4.0)':shadowcolor=black@0.95:shadowx=3:shadowy=3[t1]",
        f"[t1]drawtext=fontfile='{FONT_SANS}':text='{copy_data['hook_sub']}':expansion=none:fontcolor=white:fontsize=38:x=(w-text_w)/2:y=245:alpha='if(lt(t,0.4),t/0.4,if(gt(t,3.6),(4.0-t)/0.4,1))':enable='between(t,0,4.0)':shadowcolor=black@0.95:shadowx=2:shadowy=2[t2]",
        f"[t2]drawtext=fontfile='{FONT_SANS}':text='{copy_data['hook_bottom']}':expansion=none:fontcolor=0x34D399:fontsize=38:x=(w-text_w)/2:y=1640:alpha='if(lt(t,0.4),t/0.4,if(gt(t,3.6),(4.0-t)/0.4,1))':enable='between(t,0,4.0)':shadowcolor=black@0.95:shadowx=2:shadowy=2[t3]",

        # --- PHASE 2: GEMOLOGICAL PROOF & RARITY (4.0s - 8.5s) ---
        # Smooth dissolve in (4.0-4.4s), dissolve out (8.1-8.5s)
        f"[t3]drawtext=fontfile='{FONT_SERIF}':text='{copy_data['proof_title']}':expansion=none:fontcolor=white:fontsize=54:x=(w-text_w)/2:y=170:alpha='if(lt(t,4.4),(t-4.0)/0.4,if(gt(t,8.1),(8.5-t)/0.4,1))':enable='between(t,4.0,8.5)':shadowcolor=black@0.95:shadowx=3:shadowy=3[t4]",
        f"[t4]drawtext=fontfile='{FONT_SANS}':text='{copy_data['proof_sub']}':expansion=none:fontcolor=0xFCD34D:fontsize=38:x=(w-text_w)/2:y=245:alpha='if(lt(t,4.4),(t-4.0)/0.4,if(gt(t,8.1),(8.5-t)/0.4,1))':enable='between(t,4.0,8.5)':shadowcolor=black@0.95:shadowx=2:shadowy=2[t5]",
        f"[t5]drawtext=fontfile='{FONT_SANS}':text='{copy_data['proof_bottom']}':expansion=none:fontcolor=0x34D399:fontsize=38:x=(w-text_w)/2:y=1640:alpha='if(lt(t,4.4),(t-4.0)/0.4,if(gt(t,8.1),(8.5-t)/0.4,1))':enable='between(t,4.0,8.5)':shadowcolor=black@0.95:shadowx=2:shadowy=2[t6]",

        # --- PHASE 3: DIRECT SOURCING OFFER & CTA (8.5s - 12.0s) ---
        # Smooth dissolve in (8.5-8.9s), dissolve out (11.6-12.0s)
        f"[t6]drawtext=fontfile='{FONT_SERIF}':text='Skip the 5x Jeweler Markup':expansion=none:fontcolor=0xFCD34D:fontsize=54:x=(w-text_w)/2:y=170:alpha='if(lt(t,8.9),(t-8.5)/0.4,if(gt(t,11.6),(12.0-t)/0.4,1))':enable='between(t,8.5,12.0)':shadowcolor=black@0.95:shadowx=3:shadowy=3[t7]",
        f"[t7]drawtext=fontfile='{FONT_SANS}':text='30-Day In-Hand Money-Back Guarantee':expansion=none:fontcolor=0x34D399:fontsize=38:x=(w-text_w)/2:y=245:alpha='if(lt(t,8.9),(t-8.5)/0.4,if(gt(t,11.6),(12.0-t)/0.4,1))':enable='between(t,8.5,12.0)':shadowcolor=black@0.95:shadowx=2:shadowy=2[t8]",
        f"[t8]drawtext=fontfile='{FONT_SERIF}':text='NobleCutGems.com':expansion=none:fontcolor=0xFCD34D:fontsize=50:x=(w-text_w)/2:y=1610:alpha='if(lt(t,8.9),(t-8.5)/0.4,if(gt(t,11.6),(12.0-t)/0.4,1))':enable='between(t,8.5,12.0)':shadowcolor=black@0.95:shadowx=3:shadowy=3[t9]",
        f"[t9]drawtext=fontfile='{FONT_SANS}':text='Tap Link in Bio for 4K Video & Specs':expansion=none:fontcolor=white:fontsize=34:x=(w-text_w)/2:y=1675:alpha='if(lt(t,8.9),(t-8.5)/0.4,if(gt(t,11.6),(12.0-t)/0.4,1))':enable='between(t,8.5,12.0)':shadowcolor=black@0.95:shadowx=2:shadowy=2[vout]"
    ]

    # Audio Filter with slice, fade-in, fade-out, and -25% volume (volume=0.75)
    af_str = f"[1:a]atrim=start={audio_offset}:duration={duration},asetpts=PTS-STARTPTS,afade=t=in:ss=0:d=0.8,afade=t=out:st={duration-0.8}:d=0.8,volume=0.75[aout]"
    
    filter_str = ";".join(vf_parts) + ";" + af_str

    cmd = [
        "ffmpeg", "-y",
        "-stream_loop", "1", "-i", str(input_video_path),
        "-i", str(AUDIO_FILE),
        "-t", str(duration),
        "-filter_complex", filter_str,
        "-map", "[vout]", "-map", "[aout]",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-b:v", "4.5M",
        "-c:a", "aac",
        "-b:a", "192k",
        str(output_mp4)
    ]

    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"FFmpeg render error for {stone.get('slug')}:", res.stderr[-500:])
        return False
    return True


def extract_qa_frames(video_path, slug):
    slug_qa_dir = QA_DIR / slug
    slug_qa_dir.mkdir(parents=True, exist_ok=True)
    
    frames = [
        ("frame_1_hook.jpg", "00:00:02.000", "Phase 1: Massive Hook (2s)"),
        ("frame_2_proof.jpg", "00:00:06.000", "Phase 2: Rarity Specs (6s)"),
        ("frame_3_cta.jpg", "00:00:10.000", "Phase 3: Direct Offer (10s)")
    ]
    
    extracted_paths = []
    for filename, timestamp, label in frames:
        out_path = slug_qa_dir / filename
        cmd = [
            "ffmpeg", "-y",
            "-ss", timestamp,
            "-i", str(video_path),
            "-vframes", "1",
            "-q:v", "2",
            str(out_path)
        ]
        subprocess.run(cmd, capture_output=True)
        if out_path.exists():
            extracted_paths.append((str(out_path), label))
            
    return extracted_paths


def generate_qa_html_gallery(qa_results):
    html_file = OUTPUT_DIR / "qa_gallery.html"
    
    cards_html = []
    for item in qa_results:
        stone = item["stone"]
        frames = item["frames"]
        video_rel = Path(item["video"]).relative_to(OUTPUT_DIR).as_posix()
        
        frames_html = []
        for frame_path, label in frames:
            frame_rel = Path(frame_path).relative_to(OUTPUT_DIR).as_posix()
            frames_html.append(f"""
            <div class="frame-col">
                <span class="badge">{label}</span>
                <img src="{frame_rel}" alt="{label}" loading="lazy" />
            </div>
            """)
            
        cards_html.append(f"""
        <div class="card">
            <div class="card-header">
                <div>
                    <h2>#{stone['id']} {format_english_title(stone)}</h2>
                    <span class="sub">{stone.get('type','').upper()} • {stone.get('cut','').upper()} • €{stone.get('price_eur','')}</span>
                </div>
                <div class="actions">
                    <a href="{video_rel}" download class="btn-dl">⬇ Download Reel (MP4 + Music)</a>
                </div>
            </div>
            <div class="preview-layout">
                <div class="video-preview-box">
                    <span class="badge badge-video">Live Video Player (Mit Musik)</span>
                    <video src="{video_rel}" controls preload="metadata" playsinline></video>
                </div>
                <div class="frames-grid">
                    {''.join(frames_html)}
                </div>
            </div>
        </div>
        """)
        
    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NobleCutGems • Visual QA Reel Inspection Gallery</title>
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body {{
            background: #090c10;
            color: #f0f6fc;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            padding: 30px 20px;
        }}
        .header {{
            text-align: center;
            max-width: 900px;
            margin: 0 auto 40px;
        }}
        .header h1 {{
            font-size: 2.2rem;
            color: #fcd34d;
            margin-bottom: 10px;
            letter-spacing: -0.5px;
        }}
        .header p {{
            color: #8b949e;
            font-size: 1.05rem;
            line-height: 1.5;
        }}
        .container {{
            max-width: 1500px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 40px;
        }}
        .card {{
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }}
        .card-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #21262d;
            padding-bottom: 16px;
            margin-bottom: 20px;
        }}
        .card-header h2 {{
            font-size: 1.4rem;
            color: #ffffff;
        }}
        .card-header .sub {{
            display: inline-block;
            margin-top: 4px;
            color: #34d399;
            font-weight: 600;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
        }}
        .btn-dl {{
            background: #238636;
            color: white;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.9rem;
            transition: background 0.2s;
        }}
        .btn-dl:hover {{
            background: #2ea043;
        }}
        .preview-layout {{
            display: grid;
            grid-template-columns: 280px 1fr;
            gap: 24px;
            align-items: start;
        }}
        @media (max-width: 1024px) {{
            .preview-layout {{
                grid-template-columns: 1fr;
            }}
        }}
        .video-preview-box {{
            background: #0d1117;
            border: 1px solid #21262d;
            border-radius: 8px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }}
        .video-preview-box video {{
            width: 100%;
            max-height: 480px;
            border-radius: 6px;
            background: black;
        }}
        .frames-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 16px;
        }}
        .frame-col {{
            background: #0d1117;
            border: 1px solid #21262d;
            border-radius: 8px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }}
        .badge {{
            background: #30363d;
            color: #fcd34d;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            padding: 4px 10px;
            border-radius: 100px;
            margin-bottom: 12px;
            letter-spacing: 0.5px;
        }}
        .badge-video {{
            background: #1f6feb;
            color: #ffffff;
        }}
        .frame-col img {{
            width: 100%;
            height: auto;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.6);
            border: 1px solid #30363d;
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>NobleCutGems Luxury Reel QA Gallery</h1>
        <p>Human-eye visual inspection protocol: Verify typography, smooth dissolves, ambient music grading, and safe margins before publishing.</p>
    </div>
    <div class="container">
        {''.join(cards_html)}
    </div>
</body>
</html>
"""
    with open(html_file, "w", encoding="utf-8") as f:
        f.write(full_html)
    print(f"\n[Visual QA] Interactive HTML Gallery generated: {html_file}")
    return html_file


def main():
    parser = argparse.ArgumentParser(description="NobleCutGems Luxury Reel Video Engine")
    parser.add_argument("--id", type=int, help="Render specific gemstone by ID (e.g. 1)")
    parser.add_argument("--slug", type=str, help="Render specific gemstone by slug (e.g. blauer-spinell)")
    parser.add_argument("--count", type=int, default=2, help="Number of reels to render when running batch (default: 2)")
    parser.add_argument("--all", action="store_true", help="Render all gemstones in inventory")
    args = parser.parse_args()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    QA_DIR.mkdir(parents=True, exist_ok=True)

    stones = load_gemstones()
    targets = []

    if args.id:
        targets = [s for s in stones if s.get("id") == args.id]
    elif args.slug:
        targets = [s for s in stones if s.get("slug") == args.slug]
    elif args.all:
        targets = stones
    else:
        targets = stones[:args.count]

    print(f"\n=======================================================")
    print(f" NobleCutGems Video Automation & Visual QA Pipeline")
    print(f" Total targets to process: {len(targets)}")
    print(f" Audio Track: {AUDIO_FILE.name} (Volume: 75% | -25%)")
    print(f"=======================================================\n")

    qa_summary = []

    for idx, stone in enumerate(targets, 1):
        slug = stone.get("slug", f"stone_{stone.get('id')}")
        name = stone.get("name", "Gemstone")
        raw_vid = find_best_raw_video(stone)
        
        if not raw_vid or not os.path.exists(raw_vid):
            print(f"[{idx}/{len(targets)}] Skipping #{stone.get('id')} {name} (No raw video found)")
            continue

        out_video = OUTPUT_DIR / f"{slug}_luxury_reel.mp4"
        print(f"[{idx}/{len(targets)}] Rendering #{stone.get('id')} {name} -> {out_video.name}...")
        
        success = render_reel(stone, raw_vid, out_video)
        if success:
            print(f"       Extracted frames for visual QA inspection...")
            frames = extract_qa_frames(out_video, slug)
            qa_summary.append({
                "stone": stone,
                "video": str(out_video),
                "frames": frames
            })

    if qa_summary:
        gallery_path = generate_qa_html_gallery(qa_summary)
        print(f"\n Pipeline Completed Successfully!")
        print(f" Reels Rendered: {len(qa_summary)}")
        print(f" Open QA Gallery: file:///{gallery_path.as_posix()}")


if __name__ == "__main__":
    main()
