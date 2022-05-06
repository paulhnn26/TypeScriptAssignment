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
import { lectureentry } from "./interfaces";
import {
  displayOutput,
  searchByDate,
  searchByDateAndName,
  searchByName,
} from "./search";



function fetching() {
  fetch("https://api.stuv.app/rapla/lectures/MOS-WON21?archived=true")
    .then((res) => res.json())
    .then((data :lectureentry[]) => {
      

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
    .then((data:lectureentry[]) => {
     
      let dateToday = Date.now();
      let dateReformed;

      let dateFormatToday = new Date(dateToday);
      let currentDate = dateFormatToday.toLocaleDateString("de-DE", options2);

      for (const lessons of data) {
        
        const dateCourse = new Date(lessons.startTime);
        let currentCourse = dateCourse.toLocaleDateString("de-DE", options2);
        const curentCourseStart = dateCourse.toLocaleDateString(
          "de-DE",
          options3
        );
        if (dateFormatToday.getDay() === 6) {
          dateReform(dateToday, dateFormatToday, currentDate, 2, "");
          currentDate = dateReform(
            dateToday,
            dateFormatToday,
            currentDate,
            2,
            ""
          );
          console.log(currentDate);

          weeklyOutputFiller(
            data,
            dateFormatToday,
            curentCourseStart,
            lessons,
            currentDate,
            currentCourse
          );
        } else if (dateFormatToday.getDay() === 0) {
          dateReform(dateToday, dateFormatToday, currentDate, 1, "");
          currentDate = dateReform(
            dateToday,
            dateFormatToday,
            currentDate,
            2,
            ""
          );
          weeklyOutputFiller(
            data,
            dateFormatToday,
            curentCourseStart,
            lessons,
            currentDate,
            currentCourse
          );
        } else if (dateFormatToday.getDay() === 1 || 2 || 3 || 4 || 5) {
          weeklyOutputFiller(
            data,
            dateFormatToday,
            curentCourseStart,
            lessons,
            currentDate,
            currentCourse
          );
        }
      }
    });
}

weaklyTableOutput();

function weeklyOutputFiller(
  data:lectureentry[],
  dateFormatToday: Date,
  curentCourseStart: string,
  lesson:  any,
  currentDate: string,
  currentCourse: string
) {
  if (currentDate === currentCourse) {
    console.log(currentDate);
    switch (dateFormatToday.getDay()) {
      case 1:
        monday.innerHTML = `${new Date(lesson.startTime).toLocaleDateString(
          "de-DE",
          options3
        )} ${lesson.name}`;

        tuesday.textContent = dayTextContent(1, data, lesson);
        wednesday.textContent = dayTextContent(2, data, lesson);
        thursday.textContent = dayTextContent(3, data, lesson);
        friday.textContent = dayTextContent(4, data, lesson);

        break;
      case 2:
        tuesday.innerHTML = `${new Date(lesson.startTime).toLocaleDateString(
          "de-DE",
          options3
        )} ${lesson.name}`;
        monday.textContent = dayTextContent(-1, data, lesson);
        wednesday.textContent = dayTextContent(1, data, lesson);
        let thursdayChildOutput = thursdayOutput.appendChild(
          document.createElement("li")
        );
        thursdayChildOutput.textContent = dayTextContent(2, data, lesson);
        
        
        let fridayChildOutput = fridayOutput.appendChild(
          document.createElement("li")
        );
        fridayChildOutput.textContent = dayTextContent(3, data, lesson);
        break;

      case 3:
        wednesday.textContent = `${new Date(
          lesson.startTime
        ).toLocaleDateString("de-DE", options3)} ${lesson.name}`;
        console.log(dayTextContent(0, data, lesson))
        monday.textContent = dayTextContent(-2, data, lesson);
        tuesday.textContent = dayTextContent(-1, data, lesson);
        thursday.textContent = dayTextContent(1, data, lesson);
        friday.textContent = dayTextContent(2, data, lesson);
        break;

      case 4:
        thursday.textContent = dayTextContent(0, data, lesson);
        monday.textContent = dayTextContent(-3, data, lesson);
        tuesday.textContent = dayTextContent(-2, data, lesson);
        wednesday.textContent = dayTextContent(-1, data, lesson);
        friday.textContent = dayTextContent(1, data, lesson);
        break;
      case 5:
        fridayChildOutput = fridayOutput.appendChild(
          document.createElement("li")
        );
        fridayChildOutput.textContent = dayTextContent(0, data, lesson);
        // friday.textContent = dayTextContent(0, data, i);
        monday.textContent = dayTextContent(-4, data, lesson);
        tuesday.textContent = dayTextContent(-3, data, lesson);
        wednesday.textContent = dayTextContent(-2, data, lesson);
        thursday.textContent = dayTextContent(-1, data, lesson);
        break;
    }
  }
}
function dayTextContent(daynumber: number, data :lectureentry[], iterator : any) {
  const DateCourseToday = new Date(iterator.startTime);
  DateCourseToday.setDate(DateCourseToday.getDate() + daynumber);
  const DateWeekdaysReformed = DateCourseToday.toLocaleDateString(
    "de-DE",
    options2
  );
  for (const otherDays of data) {
    const testTage = new Date(otherDays.startTime).toLocaleDateString(
      "de-DE",
      options2
    );

    if (testTage.includes(DateWeekdaysReformed)) {
      return `${new Date(otherDays.startTime).toLocaleDateString(
        "de-DE",
        options3
      )} Uhr: ${otherDays.name} `;
    }
  }
  return "";
}

function dateReform(
  dateToday: number,
  dateFormatToday: Date,
  currentDate: string,
  weekendBuffer: number,
  dateReformed: string
) {
  dateToday = dateFormatToday.setDate(
    dateFormatToday.getDate() + weekendBuffer
  );
  dateFormatToday = new Date(dateToday);
  currentDate = dateFormatToday.toLocaleDateString("de-DE", options2);

  return currentDate;
}
