export const Datum = document.querySelector("#myInput") as HTMLInputElement;
export const ausgabe = document.querySelector("#Ausgabe") as HTMLLIElement;
export const searchInput = document.querySelector("#searchInput") as HTMLInputElement;
export const tableRow = document.querySelector(".tableRow") as HTMLTableRowElement;
export const monday =  document.querySelector("#Monday") as HTMLTableCellElement;
export const tuesday =  document.querySelector("#Tuesday") as HTMLTableCellElement;
export const wednesday = document.querySelector("#Wednesday") as HTMLTableCellElement;
export const thursday =  document.querySelector("#Thursday") as HTMLTableCellElement;
export const friday =  document.querySelector("#Friday") as HTMLTableCellElement;

export const unl = document.querySelector("#parent") as HTMLUListElement;
export const btn = document.querySelector("#button") as HTMLButtonElement;
export const options :object = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric' };
export const options2 : object = {};
export const options3 : object = {   hour: 'numeric', minute: 'numeric'};
export let dataNotFound : boolean = true;
export let i = 0;