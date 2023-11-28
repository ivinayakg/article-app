import { useGetSelfArticles } from "../application/blog";
import { getFromStorage } from "../services";
import BlogCard from "./components/blogCard";

const MyBlog = () => {
  const { data, isLoading, isError } = useGetSelfArticles(getFromStorage("token"));

  const blogCards = data?.map((blog) => <BlogCard blog={blog} key={blog._id} />);

  return (
    <div className="flex gap-8 flex-col mt-8">
      {isLoading && !isError && <h2>Loading...</h2>}
      {isError && <h2>Error Occured</h2>}
      {data?.length > 0 ? blogCards : <h2>No blogs found :(</h2>}
    </div>
  );
};

export default MyBlog;
