import {
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
} from "./dom-utils";
// import dateFormat, {masks} from "dateformat";
// dateFormat

btn.addEventListener("click", searchLogic);

// function timeGerman(date : Date){
//   date.toLocaleDateString("de-DE", options3)
// }
let Daten: any[] = [];

fetch("https://api.stuv.app/rapla/lectures/MOS-WON21?archived=true")
  .then((res) => res.json())
  .then((data) => {
    Daten = data;
  });

function DataArray() {
  console.log("test")
  for (let i = 0; i < Daten.length; i++) {
    if (Daten[i].name.includes(searchInput.value)) {
      const startTime = new Date(Daten[i].startTime);
      const listOutput = unl.appendChild(document.createElement("li"));
       listOutput.innerHTML = 
        `<p> <strong> ${startTime.toLocaleDateString("de-DE", options)} Uhr: </strong> <br> ${Daten[i].name} </p>`
      //  ` ${startTime.toLocaleDateString("de-DE", options)} Uhr:
      //  ${Daten[i].name}`
        

      listOutput.classList.add("outputList");
    }
  }
}
function DateSearch() {
  for (let i = 1; i < Daten.length; i++) {
    if (Daten[i].startTime.includes(Datum.value)) {
      const startTime = new Date(Daten[i].startTime);
      const outputElement=  document.querySelector(".output") as HTMLUListElement ;
      outputElement.style.display = "flex";

      const listOutput = unl.appendChild(document.createElement("li"));
      listOutput.innerHTML =
      `<p> <strong> ${startTime.toLocaleDateString("de-DE", options)} Uhr: </strong> <br> ${Daten[i].name} </p>`
        startTime.toLocaleDateString("de-DE", options);
      listOutput.classList.add("outputList");
    }
  }
}

function DateAndDataSearch(){
  let dataNotFound : boolean = true;
  for (let i = 1; i < Daten.length; i++) {
    
    if (Daten[i].startTime.includes(Datum.value) && Daten[i].name.includes(searchInput.value)) {
      console.log(Daten[i].startTime)
      const startTime = new Date(Daten[i].startTime);
      const outputElement=  document.querySelector(".output") as HTMLUListElement ;
      outputElement.style.display = "flex";

      const listOutput = unl.appendChild(document.createElement("li"));
      listOutput.innerHTML =
      `<p> <strong> ${startTime.toLocaleDateString("de-DE", options)} Uhr: </strong> <br> ${Daten[i].name} </p>`
        startTime.toLocaleDateString("de-DE", options);
      listOutput.classList.add("outputList");
      dataNotFound = false;

    }
    
}
if(dataNotFound === true){
  alert("Bitte ändern sie ihre Eingabe")
}
 }

function searchLogic() {
  deleteOutput();
  if (Datum.value === "" && searchInput.value === "") {
    
    alert("Bitte tätigen sie eine eingabe");
  } else if (Datum.value === "") {
    DataArray();
  } else if (searchInput.value === "") {
    DateSearch();
  }
  else if(Datum.value != "" && searchInput.value != ""){
    DateAndDataSearch();
  }
  
  
}

function deleteOutput() {
  document.querySelectorAll(".outputList").forEach((e) => e.remove());
}

function weaklyTableOutput() {
  fetch("https://api.stuv.app/rapla/lectures/MOS-WON21?archived=true")
    .then((res) => res.json())
    .then((data) => {
      Daten = data;
      const dateToday = Date.now();
      const dateFormatToday = new Date(dateToday);
      const currentDate = dateFormatToday.toLocaleDateString("de-DE", options2);
      
      for (let i = 0; i < data.length; i++) {
        const dateCourse = new Date(Daten[i].startTime);
        const timeToday = dateCourse.toLocaleDateString("de-DE", options3);
        
        let currentCourse = dateCourse.toLocaleDateString("de-DE", options2);
        const curentCourseStart = dateCourse.toLocaleDateString(
          "de-DE",
          options3
        );
        // if(){
        //   switch( dateFormatToday.getDay()){
        //     case 6:
        //       console.log("test")
        //   }

        // }

          if (currentDate === currentCourse) {
           dateFormatToday.getDay();
         
          switch (dateFormatToday.getDay()) {
            case 1:
              monday.innerHTML = `${curentCourseStart} ${data[i].name}`;
              console.log(curentCourseStart + data[i].name)
              tuesday.textContent = `${new Date(Daten[i+1].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i +1].name } `;
              wednesday.textContent = `${new Date(Daten[i+2].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i +2].name } `;
              thursday.textContent = `${new Date(Daten[i+3].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i +3].name } `;
              friday.textContent = `${new Date(Daten[i+4].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i +4].name } `;
              break;
            case 2:
              tuesday.textContent = `${curentCourseStart}              
              ${data[i].name} `  ;
              monday.textContent =  `${new Date(Daten[i-1].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i - 1].name } `;
              wednesday.textContent = `${new Date(Daten[i+1].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i + 1].name } `;
              thursday.textContent = `${new Date(Daten[i+2].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i + 2].name } `;
              friday.textContent = `${new Date(Daten[i+3].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i + 3].name } `;
              break;

            case 3:
              wednesday.textContent = curentCourseStart + "\n" + data[i].name;
              monday.textContent = `${new Date(Daten[i-2].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i - 2].name } `;
              tuesday.textContent = `${new Date(Daten[i-1].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i - 1].name } `;
              thursday.textContent = `${new Date(Daten[i+1].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i + 1].name } `;
              friday.textContent = `${new Date(Daten[i+2].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i + 2].name } `;
              break;

            case 4:
              thursday.textContent = curentCourseStart + data[i].name;
              monday.innerHTML =  `<p>${new Date(Daten[i-3].startTime).toLocaleDateString("de-DE", options3)} Uhr: <br>
                                    ${data[i - 3].name } </p> `;
              tuesday.textContent = `${new Date(Daten[i-2].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i - 2].name } `;
              wednesday.textContent = `${new Date(Daten[i-1].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i - 1].name } `;
              friday.textContent = `${new Date(Daten[i+1].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i + 1].name } `;
              break;
            case 5:
              friday.textContent = curentCourseStart + data[i].name;
              monday.textContent = `${new Date(Daten[i-4].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i - 4].name } `;
              tuesday.textContent = `${new Date(Daten[i-3].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i - 3].name } `;
              wednesday.textContent = `${new Date(Daten[i-2].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i - 2].name } `;
              thursday.textContent = `${new Date(Daten[i-1].startTime).toLocaleDateString("de-DE", options3)} Uhr: ${data[i - 1].name } `;
              break;
            // case 6:
            //   monday.innerHTML =  `<p>${new Date(Daten[i+2].startTime).toLocaleDateString("de-DE", options3)} Uhr: <br>
            //                         ${data[i +2].name } </p> `;
            //   break;
            // case 7:
            //   monday.innerHTML =  `<p>${new Date(Daten[i+1].startTime).toLocaleDateString("de-DE", options3)} Uhr: <br>
            //   ${data[i +1].name } </p> `;  
                              
          }
        
         } 
         
      }
    });
}

weaklyTableOutput();

