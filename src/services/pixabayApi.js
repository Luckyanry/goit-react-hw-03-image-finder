import axios from "axios";

export const createGalleryUrl = (query, currentPage = 1, perPage = 12) => {
  return withCredentials(
    `https://pixabay.com/api/?q=${query}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=${perPage}&`
  );
};

export const withCredentials = (url) => {
  return `${url}key=${process.env.REACT_APP_KEY}`;
};

export const request = async (method, url, body = null) => {
  const result = await axios[method](url, body);
  return result.data;
};
