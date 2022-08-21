import { useMutation, useQuery } from "react-query";
import { axios, createTokenHeader } from "../services";

const getAllArticles = async (query) => {
  const res = await axios.get(
    `/article/?limit=${query?.limit}&before=${query.before}`
  );
  return res.data.data;
};

const getArticleById = async (id) => {
  const res = await axios.get(`/article/${id}`);
  return res.data.data;
};
const createArticle = (token, data) =>
  axios.post("/article", data, createTokenHeader(token));
const deleteArticle = (token, articleId) =>
  axios.delete(`/article/${articleId}`, createTokenHeader(token));
const updateArticle = (token, data) =>
  axios.put("/article", data, createTokenHeader(token));

export const useGetAllArticles = (query) =>
  useQuery("get-all-articles", () => getAllArticles(query));
export const useGetOneArticle = (articleId) =>
  useQuery(`get-article-${articleId}`, () => getArticleById(articleId));
export const useCreateArticle = () =>
  useMutation(({ token, data }) => createArticle(token, data));
export const useDeleteArticle = () =>
  useMutation(({ token, articleId }) => deleteArticle(token, articleId));
export const useUpdateArticle = () =>
  useMutation(({ token, data }) => updateArticle(token, data));
