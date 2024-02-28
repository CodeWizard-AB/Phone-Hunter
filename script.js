"use strict";

// * ELEMENT SELECTIONS -

const cardContainer = document.getElementById("card_container");
const searchBtn = document.getElementById("search_btn");
const searchInput = document.getElementById("search_input");
const showAllBtn = document.getElementById("show_btn");
const loadSpinner = document.querySelector(".spinner");
const modal = document.querySelectorAll(".modal_win");
const modalDetail = document.getElementById("modal_window");
const components = document.querySelectorAll(".component");
const modalOverlay = document.getElementById("modal_overlay");

// * EVENT FUNCTIONS -

const loadDefault = () => {
	cardContainer.innerHTML = "";
	showAllBtn.classList.add("hidden");
};

const modalClose = () => {
	modal.forEach((window) => window.classList.add("hidden"));
	components.forEach((component) => component.classList.remove("hidden"));
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
		const phone = json.data;
		modalDetail.innerHTML = "";

		const detailHtml = `
			<figure class="bg-primary grid place-items-center py-6">
				<img
					src="${phone.image}"
					alt="${phone.name}"
				/>
			</figure>
			<div class="flex flex-col gap-2 mt-4">
				<h1 class="text-3xl font-bold">${phone.name}</h1>
				<p class="text-sm">
					It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
				</p>
				<p><strong>Storage :</strong> ${phone.mainFeatures.storage}</p>
				<p><strong>Chipset :</strong> ${phone.mainFeatures.chipSet}</p>
				<p><strong>Memory :</strong> ${phone.mainFeatures.memory}</p>
				<p><strong>Slug :</strong> ${phone.slug}</p>
				<p><strong>Release data :</strong> ${phone.releaseDate}</p>
				<p><strong>Brand :</strong> ${phone.brand}</p>
				<p><strong>GPS :</strong> ${phone.others?.GPS || "No GPS"}</p>
				<button
					class="bg-[#DC3545] btn hover:bg-[#DC3545] text-white px-7 place-self-end closeModal">Close
				</button>
			</div>
			`;
		modalDetail.insertAdjacentHTML("afterbegin", detailHtml);
		modal.forEach((window) => window.classList.remove("hidden"));
		components.forEach((component) => component.classList.add("hidden"));
	}
});

modalDetail.addEventListener("click", (e) => {
	const clicked = e.target;
	if (
		clicked.tagName === "button".toUpperCase() &&
		clicked.classList.contains("closeModal")
	) {
		modalClose();
	}
});

modalOverlay.addEventListener("click", modalClose);
