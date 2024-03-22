import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteArticle, useGetOneArticle } from "../application/blog";
import DOMPurify from "dompurify";
import { getFromStorage } from "../services";
import { toast } from "react-toastify";
import { useEffect } from "react";

const SingleBlog = () => {
  const { _id } = useParams();
  const { mutate: deleteArticleMutate } = useDeleteArticle();
  const { data, isLoading, isError } = useGetOneArticle(_id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!_id) navigate(0);
  }, []);

  if (isLoading && !isError) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error Occured</h2>;
  }

  const user = getFromStorage("user", true);

  const canUpdate = user && user._id === data.userId._id;

  const deleteArticle = async () => {
    if (!user) return;
    try {
      deleteArticleMutate(
        { token: getFromStorage("token"), articleId: data._id },
        {
          onSuccess: () => {
            toast.success("Blog Deleted Successfully");
            setTimeout(() => {
              navigate(0);
            }, 2000);
          },
          onError: (data) => {
            toast.error("Blog Delete Failed");
            setTimeout(() => {
              navigate(0);
            }, 2000);
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <>
      <article className=" px-6 py-24 mx-auto space-y-8 sm:px-16">
        <div className="w-full mx-auto space-y-4">
          <h1 className="text-5xl font-bold leading-none">{data.title}</h1>

          <div className="text-sm dark:text-gray-400">
            <p>
              by{" "}
              <span className="hover:underline dark:text-violet-400">
                {data.userId.username ?? "Anonymous"}
              </span>
            </p>
            on {new Date(data.updatedAt).toDateString()}
          </div>
        </div>
        <div>
          <p
            className="mt-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                data.description.split("&lt;").join("<")
              ),
            }}
          ></p>
        </div>
        {canUpdate && (
          <div className="px-4 py-3 text-right sm:px-6 mt-5">
            <Link
              to={`/create/${data._id}`}
              className="inline-flex mr-2 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </Link>
            <button
              type="button"
              onClick={deleteArticle}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Delete
            </button>
          </div>
        )}
      </article>
    </>
  );
};

export default SingleBlog;
