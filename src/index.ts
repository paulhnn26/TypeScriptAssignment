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
  fetching,
  searchByDate,
  searchByDateAndName,
  searchByName,
} from "./search";
import { weaklyTableOutput, weeklyOutputFiller } from "./weekplan";



fetching();





weaklyTableOutput();










