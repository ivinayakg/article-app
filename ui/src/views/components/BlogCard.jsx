import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const BlogCard = ({ blog }) => {
  let blogDes = blog.description.split("&lt;").join("<");
  return (
    <div
      key={blog._id}
      className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm bg-[rgb(233 229 222 / 49%)] "
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
              {blog.userId.username?.length ? blog.userId.username : "Leroy Jenkins"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
