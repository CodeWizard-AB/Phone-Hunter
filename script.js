"use strict";

// * ELEMENT SELECTIONS -

const cardContainer = document.getElementById("card_container");
const searchBtn = document.getElementById("search_btn");
const searchInput = document.getElementById("search_input");
const showAllBtn = document.getElementById("show_btn");
const loadSpinner = document.querySelector(".spinner");

// * EVENT FUNCTIONS -

const loadDefault = () => {
	cardContainer.innerHTML = "";
	showAllBtn.classList.add("hidden");
};

const loadPhone = async (search, clicked) => {
	const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
	const response = await fetch(url);
	const json = await response.json();
	const data = json.data;
	const indexLast = clicked && data.length >= 6 ? -1 : 6;
	loadDefault();

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
				<button class="card_button" id='${phone.slug}'>Show Details</button>
			</div>
		</div>
    `;
		cardContainer.insertAdjacentHTML("afterbegin", cardHtml);
		if (data.length > 6) showAllBtn.classList.remove("hidden");
		if (clicked) showAllBtn.classList.add("hidden");
	});
};

// * EVENT HANDLERS -

searchBtn.addEventListener("click", (e) => {
	e.preventDefault();
	loadDefault();
	loadSpinner.classList.remove("hidden");
	setTimeout(() => {
		loadSpinner.classList.add("hidden");
		loadPhone(searchInput.value);
	}, 2000);
});

showAllBtn.addEventListener("click", (e) => {
	e.preventDefault();
	loadPhone(searchInput.value, true);
});

cardContainer.addEventListener("click", async (e) => {
	const clicked = e.target;
	if (clicked.tagName === "button".toUpperCase()) {
		const phoneId = clicked.getAttribute("id");
		const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
		const response = await fetch(url);
		const json = await response.json();
		const data = json.data;
		console.log(data);
	}
});
