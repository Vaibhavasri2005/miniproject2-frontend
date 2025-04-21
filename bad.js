const searchBtn = document.getElementById("search-btn");
const moodInput = document.getElementById("mood-input");
const resultsDiv = document.getElementById("results");

searchBtn.addEventListener("click", async () => {
  const mood = moodInput.value.trim().toLowerCase();
  if (!mood) return alert("Please enter a mood.");

  const randomPage = Math.floor(Math.random() * 10) + 1; // Pick page 1–10

  resultsDiv.innerHTML = "Loading...";
  try {
    const response = await fetch(`http://localhost:8008/search?q=${mood}&page=${randomPage}`);
    const data = await response.json();

    resultsDiv.innerHTML = "";

    for (const [industry, movies] of Object.entries(data)) {
      const section = document.createElement("div");
      section.classList.add("industry-section");

      const title = document.createElement("h2");
      title.innerText = industry;
      title.className = "industry-title";
      section.appendChild(title);

      const movieContainer = document.createElement("div");
      movieContainer.classList.add("movie-container");

      movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        const img = document.createElement("img");
        img.src = movie.poster_path
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          : 'https://via.placeholder.com/200x300?text=No+Image';
        img.alt = movie.title;

        const name = document.createElement("p");
        name.innerText = movie.title;

        card.appendChild(img);
        card.appendChild(name);
        movieContainer.appendChild(card);
      });

      section.appendChild(movieContainer);
      resultsDiv.appendChild(section);
    }
  } catch (error) {
    resultsDiv.innerHTML = "Something went wrong.";
    console.error(error);
  }
});
