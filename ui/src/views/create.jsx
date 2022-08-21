import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateArticle } from "../application/blog";
import { getFromStorage } from "../services";
import BlogForm from "./components/blogForm";

const Create = () => {
  const { mutate: createBlog } = useCreateArticle();
  const navigate = useNavigate();

  const blogCreation = async (e, data) => {
    e.preventDefault();
    try {
      createBlog(
        { token: getFromStorage("token"), data },
        {
          onSuccess: () => {
            toast.success("Blog Created Successfully");
            setTimeout(() => {
              navigate(0);
            }, 2000);
          },
          onError: (data) => {
            toast.error("Blog Create Failed");
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

  return <BlogForm formSubmitHanlder={blogCreation} update={{}} />;
};

export default Create;
