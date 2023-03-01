import { useState, useEffect } from "react";

/**
 * 1. Fix the code inside the fetchImages function so the API request works
 * 2. Fix the <img> element to display all the images on the page
 * 3. Edit the HTML/CSS so the images are shown in a gallery
 * 4. Fill in the code for the next and previous page buttons so pagination works
 * 5. Hide the previous page button if we're on the first page
 * 6. Add a search input so that you are able to search whatever images you want instead of just puppies
 *
 * The documentation for the Giphy API can be found here:
 * https://developers.giphy.com/docs/api#quick-start-guide
 */

export default function PuppyGalleryPage() {
  const [Pics, setPics] = useState([]);
  const [translatePics, setTranslatePics] = useState([]);
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState("");
  const PUPPIES_PER_PAGE = 5;
  const apiKey = "xGLpkeb4MG23OUcSiH3DYptDMRBU6c3s";

  async function fetchImages() {
    const queryParams = new URLSearchParams({
      api_key: apiKey,
      q: query,
      limit: PUPPIES_PER_PAGE,
      offset: offset
    });

    // Docs here https://developers.giphy.com/docs/api/endpoint#search
    const Response = await fetch(
      `//api.giphy.com/v1/gifs/search?${queryParams.toString()}`
    ).then((res) => res.json());

    setPics(Response.data);
    console.log(Response.data);
    console.log(Response);
  }

  useEffect(() => {
    fetchImages();
  }, [offset]);

  const clickNextPage = () => {
    setOffset(offset + PUPPIES_PER_PAGE);
  };

  const clickPreviousPage = () => {
    setOffset(offset - PUPPIES_PER_PAGE);
  };

  const handleOnClick = () => {
    console.log(query);
    fetchImages();
  };

  console.log(query);

  return (
    <div className="App">
      <h1>Gallery of Images</h1>
      <input
        type="text"
        placeholder="Search ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleOnClick}>Search</button>
      <div className="image-container">
        {Pics?.map((giph) => (
          <div key={giph.id}>
            <img alt={giph.title} src={giph.images.preview_gif.url} />
          </div>
        ))}
      </div>

      <div>
        {offset === 0 ? null : (
          <button onClick={clickPreviousPage}>Previous Page</button>
        )}
        <button onClick={clickNextPage}>Next Page</button>
      </div>
    </div>
  );
}
