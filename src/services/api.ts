import axios from "axios";

const booksApi = axios.create({
  baseURL: "https://api.nytimes.com/svc/books/v3/lists",
  params: { "api-key": "3iwEJtnzlh4ZqSAvLGKGXdlWBi2wia4B" },
  timeout: 5000,
  timeoutErrorMessage: "O servidor demorou para responder, tente mais tarde.",
});

const articleApi = axios.create({
  baseURL: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  params: { "api-key": "3iwEJtnzlh4ZqSAvLGKGXdlWBi2wia4B" },
  timeout: 5000,
  timeoutErrorMessage: "O servidor demorou para responder, tente mais tarde.",
});

export { articleApi, booksApi };
