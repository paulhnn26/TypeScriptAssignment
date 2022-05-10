import {
  isConstructorDeclaration,
  isConstructSignatureDeclaration,
  isEmptyBindingElement,
  isEmptyStatement,
  textSpanContainsPosition,
} from "../node_modules/typescript/lib/typescript";
import {
  btn,
  searchInput,
  unl,
  options,
  Datum,
  options2,
  options3,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  dataNotFound,
  fridayOutput,
  thursdayOutput,
} from "./dom-utils";
import { lectureentry } from "./interfaces";
import {
  deleteOutput,
  displayOutput,
  searchByDate,
  searchByDateAndName,
  searchByName,
} from "./search";
import { weaklyTableOutput, weeklyOutputFiller } from "./weekplan";

function fetching() {
  fetch("https://api.stuv.app/rapla/lectures/MOS-WON21?archived=true")
    .then((res) => res.json())
    .then((data: lectureentry[]) => {
      btn.addEventListener("click", searchLogic);
      function searchLogic() {
        deleteOutput();
        if (Datum.value === "" && searchInput.value === "") {
          alert("Bitte tätigen sie eine eingabe");
        } else if (Datum.value === "") {
          searchByName(data);
        } else if (searchInput.value === "") {
          searchByDate(data);
        } else if (Datum.value != "" && searchInput.value != "") {
          searchByDateAndName(data);
        }
      }

      return data;
    });
}

fetching();





weaklyTableOutput();










