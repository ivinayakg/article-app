import { Link } from "react-router-dom";
import { useGetAllArticles } from "../application/blog";
import DOMPurify from "dompurify";

const MyBlog = () => {
  const { data, isLoading, isError } = useGetAllArticles({});

  if (isLoading && !isError) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error Occured</h2>;
  }

  return (
    <div className="flex gap-8 flex-col mt-8">
      {data?.length &&
        data.map((blog) => {
          let blogDes = blog.description.split("&lt;").join("<");
          return (
            <div
              key={blog._id}
              className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm bg-gray-200 "
            >
              <div className="mt-3">
                <Link
                  rel="noopener noreferrer"
                  to={`/blog/${blog._id}`}
                  className="text-2xl font-bold hover:underline"
                >
                  {blog.title ?? ""}
                </Link>
                <p
                  className="mt-2"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blogDes),
                  }}
                ></p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <Link
                  rel="noopener noreferrer"
                  to={`/blog/${blog._id}`}
                  className="hover:underline text-indigo-700"
                >
                  Read more
                </Link>
                <div>
                  <p>
                    <span className=" text-indigo-700">
                      {blog.userId.name.length
                        ? blog.userId.name
                        : "Leroy Jenkins"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MyBlog;
