import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getVideoDetails, getRelatedVideos } from "../redux/videoSlice";
import ReactPlayer from "react-player";
import { FiThumbsUp, FiThumbsDown, FiShare, FiSave } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import timeSince from "../utils/date";
import convertToInternationalCurrencySystem from "../utils/convert";

const Video = ({ video }) => {
  const navigate = useNavigate();
  const snippet = video.snippet;

  return (
    <div className="flex gap-3 cursor-pointer">
      <div className="relative w-40 flex-shrink-0">
        <img
          onClick={() => navigate(`/watch/${video.id.videoId}`)}
          className="w-full aspect-video object-cover rounded-xl hover:opacity-80 transition-opacity"
          src={snippet.thumbnails?.medium?.url}
          alt={snippet.title}
        />
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <h3
          onClick={() => navigate(`/watch/${video.id.videoId}`)}
          className="text-youtube-text text-sm font-medium leading-tight line-clamp-2 hover:text-youtube-text-secondary transition-colors"
        >
          {snippet.title}
        </h3>
        <p className="text-youtube-text-secondary text-xs">
          {snippet.channelTitle}
        </p>
        <p className="text-youtube-text-secondary text-xs">
          {timeSince(new Date(Date.parse(snippet.publishedAt)))}
        </p>
      </div>
    </div>
  );
};

function VideoDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { videoDetails } = useSelector((state) => state.video);
  const { relatedVideos } = useSelector((state) => state.video);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getVideoDetails(`videos?part=snippet,statistics&id=${id}`));
    dispatch(getRelatedVideos(`search?part=snippet&relatedToVideoId=${id}&type=video`));
  }, [id, dispatch]);

  const viewCount = videoDetails?.statistics?.viewCount;
  const likeCount = videoDetails?.statistics?.likeCount;

  return (
    <div className="pt-14 px-4 pb-8">
      <div className="lg:flex lg:gap-x-6 lg:max-w-[1700px]">
        {/* Main video section */}
        <div className="flex-1">
          {/* Player */}
          <div className="aspect-video bg-black rounded-xl overflow-hidden">
            <ReactPlayer
              width="100%"
              height="100%"
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
            />
          </div>

          {/* Video info */}
          <div className="mt-4 flex flex-col gap-3">
            {/* Title */}
            <h1 className="text-youtube-text text-xl lg:text-2xl font-medium leading-tight">
              {videoDetails?.snippet?.title}
            </h1>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Channel info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img
                  onClick={() => navigate(`/channel/${videoDetails?.snippet?.channelId}`)}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={videoDetails?.snippet?.thumbnails?.medium?.url}
                  alt={videoDetails?.snippet?.channelTitle}
                />
                <div className="flex flex-col">
                  <span className="text-youtube-text font-medium text-sm">
                    {videoDetails?.snippet?.channelTitle}
                  </span>
                  <span className="text-youtube-text-secondary text-xs">
                    {viewCount ? convertToInternationalCurrencySystem(viewCount) : "0"} views
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 bg-youtube-card px-4 py-2 rounded-full hover:bg-youtube-hover text-youtube-text text-sm font-medium">
                  <FiThumbsUp className="w-5 h-5" />
                  <span>{likeCount ? convertToInternationalCurrencySystem(likeCount) : "0"}</span>
                </button>
                <button className="flex items-center gap-2 bg-youtube-card px-4 py-2 rounded-full hover:bg-youtube-hover text-youtube-text text-sm font-medium">
                  <FiThumbsDown className="w-5 h-5" />
                </button>
                <button className="flex items-center gap-2 bg-youtube-card px-4 py-2 rounded-full hover:bg-youtube-hover text-youtube-text text-sm font-medium">
                  <FiShare className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center gap-2 bg-youtube-card px-4 py-2 rounded-full hover:bg-youtube-hover text-youtube-text text-sm font-medium">
                  <FiSave className="w-5 h-5" />
                  <span>Save</span>
                </button>
                <button className="p-2 bg-youtube-card rounded-full hover:bg-youtube-hover text-youtube-text">
                  <BsThreeDotsVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Subscribe button - shown separately in YouTube UI */}
            <button className="bg-youtube-red text-white px-6 py-2 rounded-full font-medium text-sm w-fit hover:opacity-90 transition-opacity">
              Subscribe
            </button>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {videoDetails?.snippet?.tags?.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="bg-youtube-card text-youtube-text text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related videos sidebar */}
        <div className="lg:w-[400px] mt-6 lg:mt-0 flex flex-col gap-4">
          <h2 className="text-youtube-text font-medium">Related videos</h2>
          {relatedVideos?.map((video, index) => (
            <Video key={video.id.videoId || index} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoDetails;
