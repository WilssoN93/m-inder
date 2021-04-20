import React, { useEffect, useState } from "react";
import { api_key } from "./requestUris";

function Trailer({ movieId }) {
  const [video, setVideo] = useState({});

  useEffect(() => {
    const fetchVideoUrl = `https://api.themoviedb.org/3/movie/${movieId}}/videos?api_key=${api_key}&language=en-US`;
    fetch(fetchVideoUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setVideo(data);
      });
  }, [movieId]);

  return (
    <div>
      <video width="320" height="240" controls>
        <source src="movie.mp4" type="video/mp4" />
        <source src="movie.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Trailer;
