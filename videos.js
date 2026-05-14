const videoTabsEl = document.getElementById("videoTabs");
const videoGridEl = document.getElementById("videoGrid");
const videoEmptyEl = document.getElementById("videoEmpty");

let activeVideoCategory = videoCategories[0]?.id || "";

function getActiveVideoCategory() {
  return videoCategories.find((category) => category.id === activeVideoCategory);
}

function renderVideoTabs() {
  videoTabsEl.innerHTML = "";

  videoCategories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `video-tab${category.id === activeVideoCategory ? " active" : ""}`;
    button.dataset.videoCategory = category.id;
    button.textContent = category.name;
    button.setAttribute("aria-pressed", String(category.id === activeVideoCategory));
    videoTabsEl.appendChild(button);
  });
}

function renderVideos() {
  const category = getActiveVideoCategory();
  const videos = category?.videos || [];

  videoGridEl.innerHTML = "";
  videoEmptyEl.hidden = videos.length !== 0;

  videos.forEach((video, idx) => {
    const card = document.createElement("article");
    card.className = "video-card";
    card.style.animationDelay = `${idx * 55}ms`;
    card.innerHTML = `
      <div class="video-frame-wrap">
        <iframe
          src="https://www.youtube-nocookie.com/embed/${video.youtubeId}"
          title="${video.title} by ${video.speaker}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div class="video-card-body">
        <span class="item-badge">${category.name}</span>
        <h2>${video.title}</h2>
        <p class="video-meta">${video.speaker} · ${video.source}</p>
        <p>${video.description}</p>
      </div>
    `;
    videoGridEl.appendChild(card);
  });
}

videoTabsEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-video-category]");
  if (!button) return;

  activeVideoCategory = button.dataset.videoCategory;
  renderVideoTabs();
  renderVideos();
});

renderVideoTabs();
renderVideos();
