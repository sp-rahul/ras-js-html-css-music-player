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

const artist_list = (data) => {
  const templateHtml = document.getElementById("artists").innerHTML;
  let listHtml = "";
  data.forEach((element) => {
    listHtml += templateHtml.replaceAll(
      /{\w+}/g,
      (val) => element[val.substring(1, val.length - 1)]
    );
    // .replace(/\{id\}/g, element?.id)
    // .replace(/\{title\}/g, element?.title)
    // .replace(/\{resource_url\}/g, element?.resource_url);
  });
  document.getElementById("artist").innerHTML = listHtml;
};

const handleVedio = (data) => {
  data = data.replace("watch?v=", "embed/");
  const templateHtml = document.getElementById("players").innerHTML;
  let listHtml = "";

  listHtml += templateHtml.replace(/\{data\}/g, data);
  document.getElementById("player").innerHTML = listHtml;
};

const vedios_list = (data) => {
  // html templete

  const div = document.getElementById("playlist"); // html div, where to dom manipulation
  div.innerHTML = "";
  let html = "";

  data.forEach((element) => {
    console.log("checking", element);
    const time = new Date(element?.duration * 1000).toISOString().slice(14, 19);
    console.log(time);

    let thamnel =
      element?.uri.replace(
        "https://www.youtube.com/watch?v=",
        "https://img.youtube.com/vi/"
      ) + "/default.jpg";
    
    let listHtml = templateHtmlChange({
      thamnel,
      time,
      uri:  element?.uri,
      title: element?.title,
  });
    console.log("list html",listHtml)

    html += listHtml;
  });
  div.innerHTML = html;
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

const templateHtmlChange = (data) => {
  console.log("from function",data);
  const templateHtml = document.getElementById("playlists").innerHTML;

  

  let temp = templateHtml.replaceAll(
    /{\w+}/g,
    (val) => data[val.substring(1, val.length - 1)]
  );
  console.log("temp man ipulate data", temp)
  return temp
};
