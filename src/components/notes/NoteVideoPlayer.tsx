"use client";

import { cn } from "@/lib/cn";
import "@/styles/note-video.css";
import { usePlyr, type APITypes, type PlyrOptions } from "plyr-react";
import "plyr-react/plyr.css";
import { useRef } from "react";

type NoteVideoPlayerProps = {
  src: string;
  poster?: string;
  title?: string;
  caption?: string;
  className?: string;
  figureClassName?: string;
  captionClassName?: string;
};

const plyrOptions: PlyrOptions = {
  ratio: null,
  clickToPlay: true,
  hideControls: true,
  controls: [
    "play-large",
    "play",
    "progress",
    "current-time",
    "mute",
    "volume",
    "fullscreen",
  ],
  i18n: {
    play: "Play",
    pause: "Pause",
    mute: "Mute",
    unmute: "Unmute",
    enterFullscreen: "Enter fullscreen",
    exitFullscreen: "Exit fullscreen",
    currentTime: "Current time",
    duration: "Duration",
  },
};

const NoteVideoPlayer = ({
  src,
  poster,
  title,
  caption,
  className,
  figureClassName,
  captionClassName,
}: NoteVideoPlayerProps) => {
  const ref = useRef<APITypes>(null);
  const plyrRef = usePlyr(ref, { source: null, options: plyrOptions });

  return (
    <figure className={cn("not-prose relative mt-3 mb-6", figureClassName)}>
      <div className="plyr-note mx-auto max-w-[90%] rounded-lg">
        <video
          ref={plyrRef}
          className={cn("plyr-react plyr h-auto w-auto max-w-full", className)}
          src={src}
          poster={poster}
          playsInline
          preload="metadata"
          aria-label={title ?? caption}
        />
      </div>
      {caption && (
        <figcaption
          className={cn("mt-2 mb-6 text-center italic", captionClassName)}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default NoteVideoPlayer;
