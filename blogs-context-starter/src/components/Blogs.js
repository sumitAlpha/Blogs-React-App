import { useContext } from "react";
import { Appcontext } from "../context/Appcontext";
import BlogDetails from "./BlogDetails";

export default function Blogs() {
  //consuming context
  const { posts, loading } = useContext(Appcontext);

  return (
    <div className="flex flex-col gap-y-10 my-4">
      {loading ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <p className="text-center font-bold text-3xl">Loading</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <p className="text-center font-bold text-3xl">No Blogs Found !</p>
        </div>
      ) : (
        posts.map((post) => (

         <BlogDetails key={post.id} post={post}/>
        ))
      )}
    </div>
  );
}
