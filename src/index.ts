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
  thursdayOutput,
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

      for (const iterator of data) {
        const dateCourse = new Date(iterator.startTime);
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
            iterator,
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
            iterator,
            currentDate,
            currentCourse
          );
        }
       else if (dateFormatToday.getDay() === 1 || 2 || 3 || 4 || 5) {
        


       
          weeklyOutputFiller(
            data,
            dateFormatToday,
            curentCourseStart,
            iterator,
            currentDate,
            currentCourse
          );
        
      }
      }
    
  
      

      // for (let i = 0; i < data.length; i++) {
      //   const dateCourse = new Date(Daten[i].startTime);
      //   let currentCourse = dateCourse.toLocaleDateString("de-DE", options2);
      //   const curentCourseStart = dateCourse.toLocaleDateString(
      //     "de-DE",
      //     options3
      //   );
        
      //     if (dateFormatToday.getDay() === 6) {
            
      //       dateReform(dateToday, dateFormatToday, currentDate, 2, "");
      //       currentDate= dateReform(dateToday, dateFormatToday, currentDate, 2, "")
      //       console.log(currentDate)
           
      //       weeklyOutputFiller(
      //         data,
      //         dateFormatToday,
      //         curentCourseStart,
      //         i,
      //         currentDate,
      //         currentCourse
      //       );
      //     } else if (dateFormatToday.getDay() === 0) {
      //       dateReform(dateToday, dateFormatToday, currentDate, 1 , "");
      //       currentDate= dateReform(dateToday, dateFormatToday, currentDate, 2, "")
      //       weeklyOutputFiller(
      //         data,
      //         dateFormatToday,
      //         curentCourseStart,
      //         i,
      //         currentDate,
      //         currentCourse
      //       );
      //     }
      //    else if (dateFormatToday.getDay() === 1 || 2 || 3 || 4 || 5) {
          


         
      //       weeklyOutputFiller(
      //         data,
      //         dateFormatToday,
      //         curentCourseStart,
      //         i,
      //         currentDate,
      //         currentCourse
      //       );
          
      //   }
      // }
    });
}
    

weaklyTableOutput();

function weeklyOutputFiller(
  data: any,
  dateFormatToday: Date,
  curentCourseStart: string,
  iterator : any,
  currentDate: string,
  currentCourse: string
) {
  if (currentDate === currentCourse) {
    console.log(currentDate)
    switch (dateFormatToday.getDay()) {
      case 1:
        monday.innerHTML = `${new Date(iterator.startTime).toLocaleDateString(
          "de-DE",
          options3
        )} ${iterator.name}`;

        tuesday.textContent = dayTextContent(1, data, iterator);
        wednesday.textContent = dayTextContent(2, data, iterator);
        thursday.textContent = dayTextContent(3, data, iterator);
        friday.textContent = dayTextContent(4, data, iterator);
        
        break;
      case 2:
        tuesday.innerHTML = `${new Date(iterator.startTime).toLocaleDateString(
          "de-DE",
          options3
        )} ${iterator.name}`;
        monday.textContent = dayTextContent(-1, data, iterator);
        wednesday.textContent = dayTextContent(1, data, iterator);
        let thursdayChildOutput = thursdayOutput.appendChild(document.createElement("li")) 
        thursdayChildOutput.textContent = dayTextContent(2, data, iterator);
        console.log(dayTextContent(2, data, iterator))
        // thursday.textContent = dayTextContent(2, data, iterator);
        let fridayChildOutput = fridayOutput.appendChild(document.createElement("li")) 
        fridayChildOutput.textContent=  dayTextContent(3, data, iterator);
        break;

      case 3:
        wednesday.textContent = `${new Date(
          iterator.startTime
        ).toLocaleDateString("de-DE", options3)} ${iterator.name}`;
        monday.textContent = dayTextContent(-2, data, iterator);
        tuesday.textContent = dayTextContent(-1, data, iterator);
        thursday.textContent = dayTextContent(1, data, iterator);
        friday.textContent = dayTextContent(2, data, iterator);
        break;

      case 4:
        thursday.textContent = dayTextContent(0, data, iterator);
        monday.textContent = dayTextContent(-3, data, iterator);
        tuesday.textContent = dayTextContent(-2, data, iterator);
        wednesday.textContent = dayTextContent(-1, data, iterator);
        friday.textContent = dayTextContent(1, data, iterator);
        break;
      case 5:
         fridayChildOutput = fridayOutput.appendChild(document.createElement("li"))
        fridayChildOutput.textContent = dayTextContent(0, data, iterator);
        // friday.textContent = dayTextContent(0, data, i);
        monday.textContent = dayTextContent(-4, data, iterator);
        tuesday.textContent = dayTextContent(-3, data, iterator);
        wednesday.textContent = dayTextContent(-2, data, iterator);
        thursday.textContent = dayTextContent(-1, data, iterator);
        break;
    }
  }
}
function dayTextContent(daynumber: number, data: any, iterator: any) {
  

  const DateCourseToday = new Date(iterator.startTime) 
  DateCourseToday.setDate(DateCourseToday.getDate() + daynumber)
  const DateWeekdaysReformed = DateCourseToday.toLocaleDateString("de-DE", options2);
  for (const otherDays of data) {  
    const testTage =  new Date(otherDays.startTime).toLocaleDateString("de-DE", options2) 
    
    if( testTage.includes(DateWeekdaysReformed) ){
      
      return  `${new Date(otherDays.startTime).toLocaleDateString(
        "de-DE",
        options3
      )} Uhr: ${otherDays.name} `;
      
    }
    
  }return ""


  
  
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

    
