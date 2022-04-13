import {
  isEmptyBindingElement,
  isEmptyStatement,
  textSpanContainsPosition,
} from "../node_modules/typescript/lib/typescript";

const Datum = document.querySelector("#myInput") as HTMLInputElement;
const ausgabe = document.querySelector("#Ausgabe") as HTMLLIElement;
const searchInput = document.querySelector("#searchInput") as HTMLInputElement;

const unl = document.querySelector("#parent") as HTMLUListElement;
const btn = document.querySelector("#button") as HTMLButtonElement;

btn.addEventListener("click", searchLogic);

// btn.addEventListener("click", DataArray);

let Daten: any[] = [];
let i;

fetch("https://api.vorlesungsplan.lars-rickert.de/lectures/MOS-WON21")
  .then((res) => res.json())
  .then((data) => {
    Daten = data;
  });

function DataArray() {
  for (let i = 1; i < Daten.length; i++) {
    if (Daten[i].name.includes(searchInput.value)) {      
      const test = unl.appendChild(document.createElement("li"));
      test.textContent = Daten[i].name + " Startzeit: " + Daten[i].start;
      test.classList.add("outputList")
    } 
  }
}
function DateSearch() {
  for (let i = 1; i < Daten.length; i++) {
    if (Daten[i].start.includes(Datum.value)) {
      const test = unl.appendChild(document.createElement("li"));
      test.textContent = Daten[i].name + " Startzeit: " + Daten[i].start;
      test.classList.add("outputList")
      // test.remove();
    }
  }
}

function searchLogic() {
  deleteOutput();
  if (Datum.value === "" && searchInput.value === "") {
    console.log("keine eingabe");
    alert("Bitte tätigen sie eine eingabe");
  } else if (Datum.value === "") {
    DataArray();
  } else if (searchInput.value === "") {
    DateSearch();
  }
}


function deleteOutput(){
  document.querySelectorAll(".outputList").forEach(e => e.remove())
}
