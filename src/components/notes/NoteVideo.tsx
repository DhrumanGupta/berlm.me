import dynamic from "next/dynamic";
import { getNoteMediaUrl } from "@/lib/note-media";

const NoteVideoPlayer = dynamic(
  () => import("@/components/notes/NoteVideoPlayer"),
  { ssr: false }
);

type NoteVideoProps = {
  slug: string;
  src: string;
  poster?: string;
  title?: string;
  caption?: string;
  className?: string;
  figureClassName?: string;
  captionClassName?: string;
};

const NoteVideo = ({
  slug,
  src,
  poster,
  title,
  caption,
  className,
  figureClassName,
  captionClassName,
}: NoteVideoProps) => {
  const videoSrc = getNoteMediaUrl(slug, src);

  if (!videoSrc) return null;

  const posterSrc = poster ? getNoteMediaUrl(slug, poster) : undefined;

  return (
    <NoteVideoPlayer
      src={videoSrc}
      poster={posterSrc}
      title={title}
      caption={caption}
      className={className}
      figureClassName={figureClassName}
      captionClassName={captionClassName}
    />
  );
};

export default NoteVideo;
