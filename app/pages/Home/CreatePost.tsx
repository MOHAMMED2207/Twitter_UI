import { FnCreatePost } from "../../Hook/Posts/CreatePost/FnCreatePost";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { BiVideo } from "react-icons/bi";
import Picker from "emoji-picker-react";

const CreatePost = () => {
  const [text, setText] = useState<string>("");
  const [img, setImg] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);
  const ImgRef = useRef<any>(null);
  const VideoRef = useRef<any>(null);
  const [isPosting, setIsPosting] = useState<boolean>(false); // Track posting state
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { createPost, isPending, isError, error, authUser } = FnCreatePost({
    setText,
    setImg,
    setVideo,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsPosting(true); // Set posting state to true
    createPost({ text, img, video }); // Wait for post creation
    setIsPosting(false); // Set posting state to false after completion
  };

  const handleMediaChange = (e: any, setMedia: Function) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMedia(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggle = img || text || video ? false : true;

  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-700">
      <Link href={`/pages/Profile/${authUser?.username}`}>
        <div className="avatar">
          <div className="relative w-14 h-14 rounded-full overflow-hidden">
            <Image
              fill
              alt="Profile Image"
              src={authUser?.ProfileImg || "/avatars/avatar-placeholder.png"}
              className="h-80 object-cover rounded-full border border-gray-700"
            />
          </div>
        </div>
      </Link>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <textarea
          className="h-17 text-black rounded-lg w-full p-3 text-lg resize-none border-none focus:outline-none border-gray-800"
          placeholder="What is happening ?!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {img && (
          <div className="relative w-full h-60 mx-auto">
            <IoCloseSharp
              className="absolute z-10 top-0 right-0 text-white bg-gray-800 rounded-full p-1 w-7 h-7 cursor-pointer"
              onClick={() => {
                setImg(null);
                ImgRef.current.value = null;
              }}
            />
            <Image
              src={img}
              fill
              alt="img create post"
              className="mx-auto object-contain rounded"
            />
          </div>
        )}
        {video && (
          <div className="relative w-full h-60 mx-auto">
            <IoCloseSharp
              className="absolute z-10 top-0 right-0 text-white bg-gray-800 rounded-full p-1 w-7 h-7 cursor-pointer"
              onClick={() => {
                setVideo(null);
                VideoRef.current.value = null;
              }}
            />
            <video
              controls
              className="mx-auto object-contain rounded w-full h-full"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        )}

        <div className="flex justify-between border-t py-2 border-t-gray-700">
          <div className="flex gap-1 items-center">
            <CiImageOn
              className="fill-primary w-6 h-6 cursor-pointer"
              onClick={() => {
                setVideo(null);
                setShowEmojiPicker(false);
                ImgRef.current.click();
              }}
            />
            <BsEmojiSmileFill
              className="fill-primary w-5 h-5 cursor-pointer"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            <BiVideo
              className="fill-primary w-6 h-6 cursor-pointer"
              onClick={() => {
                setImg(null);
                setShowEmojiPicker(false);
                VideoRef.current.click();
              }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={ImgRef}
            onChange={(e) => handleMediaChange(e, setImg)}
          />
          <input
            type="file"
            accept="video/*"
            hidden
            ref={VideoRef}
            onChange={(e) => handleMediaChange(e, setVideo)}
          />
          <button
            type="submit"
            disabled={toggle || isPending || isPosting}
            className="ISdisabled btn bg-blue-600 hover:bg-blue-800 hover:transition-all btn-primary rounded-full btn-sm text-white px-4 py-1"
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
        {showEmojiPicker && (
          <div className="emoji-picker">
            <Picker 
            // onEmojiClick={(e) => setText(text + e.emoji)} 
            />
          </div>
        )}

        {isError && <div className="text-red-500">{error?.message}</div>}
      </form>
    </div>
  );
};

export default CreatePost;
