import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../redux/categorySlice";
import { HiOutlineHome, HiHome } from "react-icons/hi";
import { GoPlay, GoHome, GoDeviceCameraVideo } from "react-icons/go";
import { BiHistory } from "react-icons/bi";
import { RiTimeLine } from "react-icons/ri";
import { FaRegThumbsUp } from "react-icons/fa";

const sidebarItems = [
  {
    name: "Home",
    path: "/",
    icon: <HiOutlineHome className="w-6 h-6" />,
    activeIcon: <HiHome className="w-6 h-6" />,
  },
  {
    name: "Shorts",
    path: "/shorts",
    icon: <GoPlay className="w-6 h-6" />,
    activeIcon: <GoPlay className="w-6 h-6" />,
  },
  {
    name: "Subscriptions",
    path: "/subscriptions",
    icon: <GoHome className="w-6 h-6" />,
    activeIcon: <GoHome className="w-6 h-6" />,
  },
];

const libraryItems = [
  {
    name: "History",
    path: "/history",
    icon: <BiHistory className="w-6 h-6" />,
    activeIcon: <BiHistory className="w-6 h-6" />,
  },
  {
    name: "Your Videos",
    path: "/my-videos",
    icon: <GoDeviceCameraVideo className="w-6 h-6" />,
    activeIcon: <GoDeviceCameraVideo className="w-6 h-6" />,
  },
  {
    name: "Watch Later",
    path: "/watch-later",
    icon: <RiTimeLine className="w-6 h-6" />,
    activeIcon: <RiTimeLine className="w-6 h-6" />,
  },
  {
    name: "Liked Videos",
    path: "/liked-videos",
    icon: <FaRegThumbsUp className="w-6 h-6" />,
    activeIcon: <FaRegThumbsUp className="w-6 h-6" />,
  },
];

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/feed/Home";
    }
    return location.pathname === path;
  };

  const handleNavigation = (path, name) => {
    dispatch(setSelectedCategory(name));
    if (path === "/") {
      navigate("/");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-[64px] bg-black fixed left-0 top-0 bottom-0 z-20 pt-14">
      <div className="flex flex-col">
        {sidebarItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigation(item.path, item.name)}
            className={`w-full h-14 flex flex-col items-center justify-center gap-1 hover:bg-zinc-800 transition-colors ${
              isActive(item.path) ? "bg-zinc-800" : ""
            }`}
          >
            <span className={isActive(item.path) ? "text-white" : "text-zinc-400"}>
              {isActive(item.path) ? item.activeIcon : item.icon}
            </span>
          </button>
        ))}
      </div>

      <div className="border-t border-zinc-800 my-2" />

      <div className="flex flex-col">
        {libraryItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigation(item.path, item.name)}
            className={`w-full h-14 flex flex-col items-center justify-center gap-1 hover:bg-zinc-800 transition-colors ${
              isActive(item.path) ? "bg-zinc-800" : ""
            }`}
          >
            <span className={isActive(item.path) ? "text-white" : "text-zinc-400"}>
              {isActive(item.path) ? item.activeIcon : item.icon}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
