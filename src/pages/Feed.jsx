import { useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { getCategoryVideos } from "../redux/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import timeSince from "../utils/date";

function Feed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { categoryVideos } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(
      getCategoryVideos(`search?part=snippet&q=${id ? id : "Coding development"}`)
    );
    document.title = `${id ? id + " - YouTube" : "YouTube"}`;
  }, [id, dispatch]);

  return (
    <div className="pt-14 px-4 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {categoryVideos?.map((video, index) => {
          const snippet = video.snippet;
          return (
            <VideoCard
              key={video.id.videoId || index}
              videoId={snippet.channelId ? snippet.channelId : video.id.videoId}
              thumbnail={snippet.thumbnails?.medium?.url}
              title={snippet.title}
              channel={snippet.channelTitle}
              channelId={snippet.channelId}
              channelAvatar={snippet.thumbnails?.medium?.url}
              views="1.5M views"
              postedAt={timeSince(new Date(Date.parse(snippet.publishedAt)))}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Feed;
