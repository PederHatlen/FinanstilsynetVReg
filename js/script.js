let formEl = document.getElementById("form");
let searchFieldEl = document.getElementById("query");

formEl.addEventListener("submit", async (e)=>{
	e.preventDefault();
	let results = await fetch("https://api.finanstilsynet.no/registry/v1/legal-entities/search?query="+searchFieldEl.value, {mode:"cors",}).then((r)=>{return r.json()});
	console.log(results);
});

function render(r){
	console.log(r);
}