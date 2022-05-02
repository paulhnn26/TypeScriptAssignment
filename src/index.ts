import {
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
} from "./dom-utils";
import { displayOutput, searchByDate, searchByDateAndName, searchByName } from "./search";




let Daten: any[] = [];




  function fetching(){
    fetch("https://api.stuv.app/rapla/lectures/MOS-WON21?archived=true")
  .then((res) => res.json())
  .then((data) => {
    
    Daten = data
  
   
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





function deleteOutput() {
  document.querySelectorAll(".outputList").forEach((e) => e.remove());
}

function weaklyTableOutput() {
  
  fetch("https://api.stuv.app/rapla/lectures/MOS-WON21?archived=true")
    .then((res) => res.json())
    .then((data) => {
      Daten = data;
      let dateToday = Date.now();
      let dateReformed ;
     
      let dateFormatToday = new Date(dateToday);
      
      
      let currentDate = dateFormatToday.toLocaleDateString("de-DE", options2);
      

      for (let i = 0; i < data.length; i++) {
        const dateCourse = new Date(Daten[i].startTime);
        let currentCourse = dateCourse.toLocaleDateString("de-DE", options2);
        const curentCourseStart = dateCourse.toLocaleDateString(
          "de-DE",
          options3
        );
        
          if (dateFormatToday.getDay() === 6) {
            
            dateReform(dateToday, dateFormatToday, currentDate, 2, "");
            currentDate= dateReform(dateToday, dateFormatToday, currentDate, 2, "")
            console.log(currentDate)
           
            weeklyOutputFiller(
              data,
              dateFormatToday,
              curentCourseStart,
              i,
              currentDate,
              currentCourse
            );
          } else if (dateFormatToday.getDay() === 0) {
            dateReform(dateToday, dateFormatToday, currentDate, 1 , "");
            currentDate= dateReform(dateToday, dateFormatToday, currentDate, 2, "")
            weeklyOutputFiller(
              data,
              dateFormatToday,
              curentCourseStart,
              i,
              currentDate,
              currentCourse
            );
          }
         else if (dateFormatToday.getDay() === 1 || 2 || 3 || 4 || 5) {
          


         
            weeklyOutputFiller(
              data,
              dateFormatToday,
              curentCourseStart,
              i,
              currentDate,
              currentCourse
            );
          
        }
      }
    });
}

weaklyTableOutput();

function weeklyOutputFiller(
  data: any,
  dateFormatToday: Date,
  curentCourseStart: string,
  i: number,
  currentDate: string,
  currentCourse: string
) {
  if (currentDate === currentCourse) {
    console.log(currentDate)
    switch (dateFormatToday.getDay()) {
      case 1:
        monday.innerHTML = `${new Date(Daten[i].startTime).toLocaleDateString(
          "de-DE",
          options3
        )} ${data[i].name}`;

        tuesday.textContent = dayTextContent(1, data, i);
        wednesday.textContent = dayTextContent(2, data, i);
        thursday.textContent = dayTextContent(3, data, i);
        friday.textContent = dayTextContent(4, data, i);
        
        break;
      case 2:
        tuesday.textContent = `${new Date(
          Daten[i].startTime
        ).toLocaleDateString("de-DE", options3)} ${data[i].name}`;
        monday.textContent = dayTextContent(-1, data, i);
        wednesday.textContent = dayTextContent(1, data, i);
        thursday.textContent = dayTextContent(2, data, i);
        friday.textContent = dayTextContent(3, data, i);
        break;

      case 3:
        wednesday.textContent = `${new Date(
          Daten[i].startTime
        ).toLocaleDateString("de-DE", options3)} ${data[i].name}`;
        monday.textContent = dayTextContent(-2, data, i);
        tuesday.textContent = dayTextContent(-1, data, i);
        thursday.textContent = dayTextContent(1, data, i);
        friday.textContent = dayTextContent(2, data, i);
        break;

      case 4:
        thursday.textContent = dayTextContent(0, data, i);
        monday.textContent = dayTextContent(-3, data, i);
        tuesday.textContent = dayTextContent(-2, data, i);
        wednesday.textContent = dayTextContent(-1, data, i);
        friday.textContent = dayTextContent(1, data, i);
        break;
      case 5:
        const fridayChildOutput = fridayOutput.appendChild(document.createElement("li"))
        fridayChildOutput.textContent = dayTextContent(0, data, i);
        // friday.textContent = dayTextContent(0, data, i);
        monday.textContent = dayTextContent(-4, data, i);
        tuesday.textContent = dayTextContent(-3, data, i);
        wednesday.textContent = dayTextContent(-2, data, i);
        thursday.textContent = dayTextContent(-1, data, i);
        break;
    }
  }
}
function dayTextContent(daynumber: number, data: any, i: number) {
  return `${new Date(Daten[i + daynumber].startTime).toLocaleDateString(
    "de-DE",
    options3
  )} Uhr: ${data[i + daynumber].name} `;
}

function dateReform(
  dateToday: number,
  dateFormatToday: Date,
  currentDate: string,
  weekendBuffer: number,
  dateReformed : string
) {
  dateToday = dateFormatToday.setDate(
    dateFormatToday.getDate() + weekendBuffer
  );
  dateFormatToday = new Date(dateToday);
  currentDate = dateFormatToday.toLocaleDateString("de-DE", options2);
  
  return  currentDate;
  
}


