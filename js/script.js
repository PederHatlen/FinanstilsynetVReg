let formEl = document.getElementById("form");
let queryEl = document.getElementById("query");
let entityOutEl = document.getElementById("entities");

const preferedLang = window.navigator.language;

const endpoint = "https://api.finanstilsynet.no/registry/v1/legal-entities/search?query=";

formEl.addEventListener("submit", async (e)=>{
	e.preventDefault();

	// let results = await fetch("http://192.168.186.200:5000?query="+queryEl.value).then(res =>res.json()).then(render);
	let results = await fetch("./testdata.json").then(res =>res.json()).then(render);
	console.log(results);

	// Kode hvis mellom lag ikke er nødvendig
	// fetch(endpoint + encodeURIComponent(queryEl.value), {mode:"no-cors"})
	// .then(r => {
	// 	return r;
	// }).then(r => {
	// 	return r.json();
	// }).then(r => {
	// 	render(r);
	// });
	// console.log((await ress1));
});
function sanitized(s){
	let e = document.createElement('div');
	e.innerText = s;
	return e.innerHTML;
}

function render(d){
	console.log(d);

	for(let i = 0; i < d["hitsReturned"]; i++){
		const entity = d["legalEntities"][i];
		console.log(entity["addresses"], entity);

		let entityWrapper = document.createElement("div");
		entityWrapper.classList.add("entityWrapper");
		entityWrapper.classList.add(entity["legalEntityType"]);
		entityWrapper.id = entity["legalEntityId"];

		let smallInfo = document.createElement("div");
		smallInfo.classList.add("entityInfo");

		let typeIcon = document.createElement("img");
		typeIcon.classList.add("typeIcon");
		typeIcon.src = `images/${entity["legalEntityType"]}.svg`;

		let entityType = document.createElement("span");
		entityType.classList.add("entityType");
		entityType.innerHTML = sanitized(entity["legalEntityType"]);

		let originCountry = document.createElement("span");
		originCountry.classList.add("originCountry");
		originCountry.innerHTML = sanitized(entity["addresses"][0]["country"]["name"][(preferedLang == "no"? "norwegian":"english")]);

		smallInfo.append(typeIcon);
		smallInfo.append(entityType);
		smallInfo.append(originCountry);

		let entityName = document.createElement("span");
		entityName.classList.add("entityName")
		// entityName.id = "";
		entityName.innerHTML = sanitized(entity["name"]);

		entityWrapper.append(smallInfo);
		entityWrapper.append(entityName);
		entityOutEl.append(entityWrapper);
	}
}