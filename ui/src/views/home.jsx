import { useGetAllArticles } from "../application/blog";
import BlogCard from "./components/blogCard";

const Home = () => {
  const { data, isLoading, isError } = useGetAllArticles({});

  const blogCards = data?.map((blog) => <BlogCard blog={blog} key={blog._id} />);

  return (
    <div className="flex gap-8 flex-col mt-8 max-w-screen p-6">
      {isLoading && !isError && <h2>Loading...</h2>}
      {isError && <h2>Error Occured</h2>}
      {data?.length > 0 ? blogCards : <h2>No blogs found :(</h2>}
    </div>
  );
};

export default Home;
