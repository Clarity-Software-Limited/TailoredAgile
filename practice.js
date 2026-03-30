const params = new URLSearchParams(window.location.search);
const selectedId = params.get("id");

const practice = catalogItems.find((item) => item.id === selectedId);

const practiceType = document.getElementById("practiceType");
const practiceTitle = document.getElementById("practiceTitle");
const practiceDescription = document.getElementById("practiceDescription");
const sectionOverview = document.getElementById("sectionOverview");
const sectionGood = document.getElementById("sectionGood");
const sectionBad = document.getElementById("sectionBad");
const sectionUgly = document.getElementById("sectionUgly");

if (!practice) {
  practiceType.textContent = "Not Found";
  practiceTitle.textContent = "Practice summary unavailable";
  practiceDescription.textContent =
    "This page does not map to a known methodology or practice.";
  sectionOverview.textContent =
    "Open this page from the catalog so the selected practice can be loaded.";
  sectionGood.textContent =
    "Once loaded correctly, this section explains strengths and best-fit usage.";
  sectionBad.textContent =
    "This section will call out common misuse patterns and subtle misinterpretations.";
  sectionUgly.textContent =
    "This section will highlight severe failure modes and harmful outcomes.";
} else {
  practiceType.textContent = practice.type;
  practiceTitle.textContent = practice.name;
  practiceDescription.textContent = practice.description;
  sectionOverview.textContent = practice.overview;
  sectionGood.textContent = practice.good;
  sectionBad.textContent = practice.bad;
  sectionUgly.textContent = practice.ugly;
}
