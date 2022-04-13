import {
  
  isEmptyBindingElement,
  isEmptyStatement,
  textSpanContainsPosition,
} from "../node_modules/typescript/lib/typescript";
// import dateFormat, {masks} from "dateformat";
// dateFormat

const Datum = document.querySelector("#myInput") as HTMLInputElement;
const ausgabe = document.querySelector("#Ausgabe") as HTMLLIElement;
const searchInput = document.querySelector("#searchInput") as HTMLInputElement;
const tableRow = document.querySelector(".tableRow") as HTMLTableRowElement;
const monday =  document.querySelector("#Monday") as HTMLTableCellElement;
const tuesday =  document.querySelector("#Tuesday") as HTMLTableCellElement;
const wednesday = document.querySelector("#Wednesday") as HTMLTableCellElement;
const thursday =  document.querySelector("#Thursday") as HTMLTableCellElement;
const friday =  document.querySelector("#Friday") as HTMLTableCellElement;

const unl = document.querySelector("#parent") as HTMLUListElement;
const btn = document.querySelector("#button") as HTMLButtonElement;
const options :object = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric' };
const options2 : object = {};
const options3 : object = {   hour: 'numeric', minute: 'numeric'};
btn.addEventListener("click", searchLogic);



let Daten: any[] = [];


fetch("https://api.stuv.app/rapla/lectures/MOS-WON21?archived=true")
  .then((res) => res.json())
  .then((data) => {
    Daten = data;
    console.log(Daten[0].name)
  });

function DataArray() {
  console.log("test")
  for (let i = 0; i < Daten.length; i++) {
    if (Daten[i].name.includes(searchInput.value)) {     
      const startTime = new Date(Daten[i].startTime) 
      const listOutput = unl.appendChild(document.createElement("li"));
      listOutput.textContent = Daten[i].name + " Startzeit: " + startTime.toLocaleDateString('de-DE', options);
      
      listOutput.classList.add("outputList")
    } 
  }
}
function DateSearch() {
  for (let i = 1; i < Daten.length; i++) {
    if (Daten[i].startTime.includes(Datum.value)) {
     
      const startTime = new Date(Daten[i].startTime)
      console.log(typeof startTime)
      
      const listOutput = unl.appendChild(document.createElement("li"));
      listOutput.textContent = Daten[i].name + " Startzeit: " + startTime.toLocaleDateString('de-DE', options);
      listOutput.classList.add("outputList")
      
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

function weaklyTableOutput(){
  fetch("https://api.stuv.app/rapla/lectures/MOS-WON21?archived=true")
  .then((res) => res.json())
  .then((data) => {
    Daten = data;
    const dateToday = Date.now();
    const dateFormatToday = new Date(dateToday)
    const currentDate = dateFormatToday.toLocaleDateString('de-DE', options2);
    

    
    console.log(dateFormatToday)
  for(let i = 0; i < data.length; i++){
    const dateCourse = new Date(Daten[i].startTime)
    const timeToday = dateCourse.toLocaleDateString('de-DE', options3)
    
    let currentCourse = dateCourse.toLocaleDateString('de-DE', options2)
    const curentCourseStart =  dateCourse.toLocaleDateString('de-DE', options3)
    
    if(currentDate === currentCourse){
      // const tableOutput = tableRow.appendChild(document.createElement("td"));
      // tableOutput.textContent = currentDate + data[i].name;
      dateFormatToday.getDay();
      switch (dateFormatToday.getDay()) {
        case 1: 
        monday.textContent = curentCourseStart + data[i].name
        tuesday.textContent = data[i +1].name;
        wednesday.textContent = data[i +2].name;
        thursday.textContent = data[i +3].name;
        friday.textContent = data[i +4].name;
        break;
        case 2:
        tuesday.textContent = curentCourseStart + data[i].name
        monday.textContent = data[i -1].name;
        wednesday.textContent = data[i +1].name;
        thursday.textContent = data[i +2].name;
        friday.textContent = data[i +3].name;
        break;
        
        case 3: 
        wednesday.textContent = curentCourseStart + "\n" + data[i].name
        const d = i;
        monday.textContent = data[d -2].name;
        tuesday.textContent = data[d -1].name;
        thursday.textContent = data[d +1].name;
        friday.textContent = data[d +2].name;
        break;

        case 4:
        thursday.textContent = curentCourseStart + data[i].name
        monday.textContent = data[i -3].name;
        tuesday.textContent = data[i -2].name;
        wednesday.textContent = data[i -1].name;
        friday.textContent = data[i +1].name;
        break;
        case 5:
        friday.textContent = curentCourseStart + data[i].name
        monday.textContent = data[i -4].name;
        tuesday.textContent = data[i -3].name;
        wednesday.textContent = data[i -2].name;
        thursday.textContent = data[i -1].name;
        break;

          

      }


    }
    
  };
  });
  
};
weaklyTableOutput();