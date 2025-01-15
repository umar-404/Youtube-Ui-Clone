import { useNavigate } from "react-router-dom";

function VideoCard({
  videoId,
  thumbnail,
  title,
  channel,
  channelId,
  channelAvatar,
  views,
  postedAt,
  duration,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 cursor-pointer">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-youtube-card rounded-xl overflow-hidden">
        <img
          onClick={() => navigate(`/watch/${videoId}`)}
          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          src={thumbnail}
          alt={title}
        />
        {duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {duration}
          </span>
        )}
      </div>

      {/* Video info */}
      <div className="flex gap-3">
        {/* Channel avatar */}
        <div className="flex-shrink-0">
          <img
            onClick={() => navigate(`/channel/${channelId}`)}
            className="w-9 h-9 rounded-full object-cover cursor-pointer hover:opacity-80"
            src={channelAvatar || "https://via.placeholder.com/36"}
            alt={channel}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1 min-w-0">
          <h3
            onClick={() => navigate(`/watch/${videoId}`)}
            className="text-youtube-text text-sm font-medium leading-tight line-clamp-2 hover:text-youtube-text-secondary transition-colors"
          >
            {title}
          </h3>
          <p
            onClick={() => navigate(`/channel/${channelId}`)}
            className="text-youtube-text-secondary text-xs hover:text-youtube-text transition-colors"
          >
            {channel}
          </p>
          <p className="text-youtube-text-secondary text-xs">
            {views} · {postedAt}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
