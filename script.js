"use strict";

const loadPhone = async () => {
	const url = "https://openapi.programming-hero.com/api/phones?search=iphone";
	const response = await fetch(url);
	const json = await response.json();
	const data = json.data;
	const cardContainer = document.getElementById("card_container");

	data.forEach((phone) => {
		const cardHtml = `
    <div
					class="card"
				>
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
						<button
							class="card_button"
						>
							Show Details
						</button>
					</div>
				</div>
    `;
		cardContainer.insertAdjacentHTML("afterbegin", cardHtml);
	});
};

loadPhone();
