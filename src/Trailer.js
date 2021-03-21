import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Trailer({ movieId }) {
  const [video, setVideo] = useState({});

  useEffect(() => {
    const fetchVideoUrl =
      "https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US";
    fetch();
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
