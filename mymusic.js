let ALL_MUSIC = [];
let SELECTED_RESOURCE_LINKS = {};
let VIDEOS_LINK = [];

const handleCheckbox = async (event) => {
  if (event.target.checked) {
    SELECTED_RESOURCE_LINKS[event.target.value] = true;
  } else {
    delete SELECTED_RESOURCE_LINKS[event.target.value];
  }
  VIDEOS_LINK = [];
  const links = Object.keys(SELECTED_RESOURCE_LINKS);

  for (let link of links) {
    const response = await fetch(link);
    const res = await response.json();
    const data = res.videos;

    VIDEOS_LINK.push(...data);
  }

  vedios_list(VIDEOS_LINK);
};

const artist_card = (data) => {
  return `
  <input type="checkbox"  name="author-check" id=${data?.id} value=${data?.resource_url} onclick="handleCheckbox(event)">
  <label class="truncate" style="padding-left: 10px;" for=${data?.id}>${data?.title}</label>
  `;
};

const player_card = (data) => {
  return `
  <div>
  <iframe width="550" height="345" frameBorder="0"  
  src="${data}">
  </iframe>
  </div>
  `;
};

const vedios_cart = (data) => {
  console.log(data);
  const time = new Date(data?.duration * 1000).toISOString().slice(14, 19);
  let thamnel =
    data?.uri.replace(
      "https://www.youtube.com/watch?v=",
      "https://img.youtube.com/vi/"
    ) + "/default.jpg";
  return `

  <div class="button">
      <button type="button" class="thumnail-button" onclick=handleVedio("${data?.uri}")>
          <img src="${thamnel}" class="img" type="video/mp4">
          <span class='thumnail-time'> ${time}</span>
      </button>
  </div>
  <div>
      <p>${data?.title}</p>
      
</div>`;
};

const handleVedio = (data) => {
  data = data.replace("watch?v=", "embed/");
  const div = document.getElementById("player");
  div.innerHTML = "";
  const el = document.createElement("div");
  el.classList.add("playlist-cart");
  el.innerHTML = player_card(data);
  div.appendChild(el);
};

const artist_list = (data) => {
  const div = document.getElementById("artist");
  div.innerHTML = "";
  data.forEach((element) => {
    const el = document.createElement("div");
    el.classList.add("artist-name");
    el.innerHTML = artist_card(element);
    div.appendChild(el);
  });
};

const vedios_list = (data) => {
  const div = document.getElementById("playlist");
  div.innerHTML = "";
  data.forEach((element) => {
    const el = document.createElement("div");
    el.classList.add("playlist-cart");
    el.innerHTML = vedios_cart(element);
    div.appendChild(el);
  });
};

const render_play_list = () => {
  fetch("https://api.discogs.com/artists/1/releases")
    .then((response) => response.json())
    .then((res) => {
      ALL_MUSIC = res.releases;
      console.log(ALL_MUSIC);
      artist_list(ALL_MUSIC);
    });
};

render_play_list();
