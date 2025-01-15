import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchById } from "../redux/searchSlice";
import timeSince from "../utils/date";
import { useNavigate } from "react-router-dom";

function SearchFeed() {
  const { id } = useParams();
  const { searchResults } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(searchById(`search?part=snippet&q=${id}`));
  }, [id, dispatch]);

  return (
    <div className="pt-14 px-4 pb-8 flex flex-col gap-6">
      {searchResults?.map((video, index) => (
        <div
          key={video.id.videoId || index}
          className="flex flex-col sm:flex-row gap-4 cursor-pointer"
        >
          {/* Thumbnail */}
          <div className="w-full sm:w-80 flex-shrink-0">
            <img
              onClick={() => navigate(`/watch/${video.id.videoId}`)}
              className="w-full aspect-video object-cover rounded-xl hover:opacity-80 transition-opacity"
              src={video.snippet?.thumbnails?.medium?.url}
              alt={video.snippet?.title}
            />
          </div>

          {/* Video info */}
          <div className="flex flex-col gap-2 min-w-0">
            <h3
              onClick={() => navigate(`/watch/${video.id.videoId}`)}
              className="text-youtube-text text-base lg:text-lg font-medium leading-tight line-clamp-2 hover:text-youtube-text-secondary transition-colors"
            >
              {video.snippet?.title}
            </h3>
            <p className="text-youtube-text-secondary text-xs">
              {timeSince(new Date(Date.parse(video.snippet?.publishedAt)))}
            </p>
            <p
              onClick={() => navigate(`/channel/${video.snippet?.channelId}`)}
              className="text-youtube-text-secondary text-sm hover:text-youtube-text transition-colors"
            >
              {video.snippet?.channelTitle}
            </p>
            <p className="text-youtube-text-secondary text-xs line-clamp-2">
              {video.snippet?.description?.slice(0, 100)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchFeed;
