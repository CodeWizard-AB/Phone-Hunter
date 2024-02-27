"use strict";

// * ELEMENT SELECTIONS -

const cardContainer = document.getElementById("card_container");
const searchBtn = document.getElementById("search_btn");
const searchInput = document.getElementById("search_input");
const showAllBtn = document.getElementById("show_btn");

// * EVENT FUNCTIONS -

const loadPhone = async (search, clicked) => {
	const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
	const response = await fetch(url);
	const json = await response.json();
	const data = json.data;
	const indexLast = clicked ? -1 : 6;
	cardContainer.innerHTML = "";
	showAllBtn.classList.add("hidden");

	data.slice(0, indexLast).forEach((phone) => {
		const cardHtml = `
    <div class="card">
			<figure class="card_image">
      <img
      src=${phone.image}
					alt="Iphone"
					class="rounded-lg"
          />
			</figure>
			<div class="px-7 space-y-2">
				<h2 class="text-2xl font-bold mt-6">${phone.phone_name}</h2>
				<p class="text-lg leading-relaxed">
					There are many variations of passages of available, but the
					majority have suffered.
          </p>
				<p class="text-2xl font-bold">$999</p>
				<button class="card_button">Show Details</button>
			</div>
		</div>
    `;
		cardContainer.insertAdjacentHTML("afterbegin", cardHtml);
		if (data.length >= 5) showAllBtn.classList.remove("hidden");
	});
};

loadPhone();

// * EVENT HANDLERS -

searchBtn.addEventListener("click", (e) => {
	e.preventDefault();
	loadPhone(searchInput.value);
});

showAllBtn.addEventListener("click", (e) => {
	e.preventDefault();
	loadPhone(searchInput.value, true);
});
