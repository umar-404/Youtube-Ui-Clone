import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { getChannelVideos, getChannelDetails } from "../redux/channelSlice";
import convertToInternationalCurrencySystem from "../utils/convert";
import timeSince from "../utils/date";

function ChannelDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { channelDetails } = useSelector((state) => state.channel);
  const { channelVideos } = useSelector((state) => state.channel);

  useEffect(() => {
    dispatch(getChannelVideos(`search?channelId=${id}&part=snippet&order=date`));
    dispatch(getChannelDetails(`channels?part=snippet&id=${id}`));
  }, [id, dispatch]);

  const bannerUrl = channelDetails?.brandingSettings?.image?.bannerExternalUrl;
  const avatarUrl = channelDetails?.snippet?.thumbnails?.medium?.url;
  const subscriberCount = channelDetails?.statistics?.subscriberCount;

  return (
    <div className="pt-14">
      {/* Banner image */}
      <div
        className="w-full h-24 sm:h-36 lg:h-48 bg-youtube-card"
        style={bannerUrl ? { backgroundImage: `url(${bannerUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
      />

      {/* Channel info */}
      <div className="px-4 py-4 flex gap-4 items-center">
        <img
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full"
          src={avatarUrl || "https://via.placeholder.com/80"}
          alt={channelDetails?.snippet?.title}
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-youtube-text text-lg sm:text-xl font-medium">
            {channelDetails?.snippet?.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-youtube-text-secondary text-sm">
              {channelDetails?.snippet?.customUrl}
            </span>
            <span className="text-youtube-text-secondary text-sm">
              {subscriberCount ? convertToInternationalCurrencySystem(subscriberCount) : "0"} subscribers
            </span>
          </div>
        </div>
        <button className="ml-auto bg-youtube-text text-youtube-bg px-4 py-2 rounded-full text-sm font-medium">
          Subscribe
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-youtube-border px-4">
        <div className="flex gap-6">
          <button className="pb-3 text-youtube-text text-sm font-medium border-b-2 border-youtube-text">
            Videos
          </button>
          <button className="pb-3 text-youtube-text-secondary text-sm font-medium hover:text-youtube-text transition-colors">
            About
          </button>
        </div>
      </div>

      {/* Videos grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
          {channelVideos?.map((video, index) => (
            <VideoCard
              key={video.id.videoId || index}
              videoId={video.id.videoId}
              thumbnail={video.snippet?.thumbnails?.medium?.url}
              title={video.snippet.title}
              channel={video.snippet.channelTitle}
              channelId={video.snippet.channelId}
              channelAvatar={avatarUrl}
              views="1M views"
              postedAt={timeSince(new Date(Date.parse(video.snippet.publishedAt)))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChannelDetails;
