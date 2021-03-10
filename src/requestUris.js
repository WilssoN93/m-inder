export const api_key = "223d5ca40180e4c973ec44869cd20b4f";
export const image_base_url = "https://image.tmdb.org/t/p/original/";

export const uris = {
  fetchTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=sv-SE&page=`,
  fetchPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=sv-SE&page=`,
  fetchUpAndComing: `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=sv-SE&page=`,
  fetchLatest: `https://api.themoviedb.org/3/movie/latest?api_key=${api_key}`,
  fetchWithId: `https://api.themoviedb.org/3/movie/`,
};
