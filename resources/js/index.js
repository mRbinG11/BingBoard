function createAccordionItem(jsonData, id) {
  let carousel = createCarousel(jsonData, id);
  let btnClass = id === 0 ? "accordion-button" : "accordion-button collapsed";
  let accordionItem = document.createElement("div");
  accordionItem.className = "accordion-item";
  accordionItem.innerHTML = `
    <h2 class="accordion-header" id="heading${id}">
        <button class='${btnClass}' type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}">
            ${jsonData.feed.title}
        </button>
    </h2>
    <div id="collapse${id}" class="accordion-collapse collapse show" data-bs-parent="#accordion">
        <div class="accordion-body"></div>
    </div>`;
  let accordionBody = accordionItem.querySelector(".accordion-body");
  accordionBody.appendChild(carousel);
  return accordionItem;
}

function createCarousel(jsonData, id) {
  let items = jsonData.items;
  let carousel = document.createElement("div");
  carousel.id = "carousel" + id;
  carousel.className = "carousel slide";
  let carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";
  items.forEach((item, idx) => {
    let card = createCard(item);
    let divClass = idx === 0 ? "carousel-item active" : "carousel-item";
    let imgSrc = item.enclosure.link;
    let carouselItem = document.createElement("div");
    carouselItem.className = divClass;
    carouselItem.appendChild(card);
    carouselInner.appendChild(carouselItem);
  });
  carousel.appendChild(carouselInner);
  carousel.innerHTML += `
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel${id}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel${id}" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
        <span class="visually-hidden">Next</span>
    </button>
  `;
  return carousel;
}

function createCard(item) {
  let link = item.link;
  let imgSrc = item.enclosure.link;
  let date = new Date(item.pubDate);
  let dateStr = date.toLocaleDateString("en-IN");
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <a href="${link}" class="card-link" target="_blank">
      <img src="${imgSrc}" class="card-img-top">
      <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${item.author} | ${dateStr}</h6>
          <p class="card-text">${item.content}</p>
      </div>
    </a>
    `;
  return card;
}

(() => {
  let XMLtoJSONURL = "https://api.rss2json.com/v1/api.json?rss_url=";
  let accordion = document.getElementById("accordion");

  magazines.forEach(async (magazine, idx) => {
    let response = await fetch(XMLtoJSONURL + magazine);
    let jsonData = await response.json();
    console.log(jsonData);
    let accordionItem = createAccordionItem(jsonData, idx);
    accordion.appendChild(accordionItem);
  });
})();
