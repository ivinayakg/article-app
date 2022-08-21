import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetOneArticle, useUpdateArticle } from "../application/blog";
import { getFromStorage } from "../services";
import BlogForm from "./components/blogForm";

const Update = () => {
  const { mutate: updateBlog } = useUpdateArticle();

  const navigate = useNavigate();
  const { _id } = useParams();
  const { data, isLoading, isError } = useGetOneArticle(_id);

  const blogUpdate = async (e, data) => {
    e.preventDefault();
    data = { ...data, articleId: data._id };
    try {
      updateBlog(
        { token: getFromStorage("token"), data },
        {
          onSuccess: () => {
            toast.success("Blog Updated Successfully");
            setTimeout(() => {
              navigate(0);
            }, 2000);
          },
          onError: (data) => {
            toast.error("Blog Update Failed");
            setTimeout(() => {
              // navigate(0);
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
    <BlogForm formSubmitHanlder={blogUpdate} update={data && _id ? data : {}} />
  );
};

export default Update;
