const Datum = document.querySelector('#myInput') as HTMLInputElement ;
const ausgabe = document.querySelector('#Ausgabe') as HTMLLIElement;
const searchInput = document.querySelector('#searchInput') as HTMLInputElement ;

const element = document.createElement('p')
const unl = document.querySelector("#parent") as HTMLUListElement;
const btn = document.querySelector('#button') as HTMLButtonElement;
const frontend : string = "Frontend";
btn.addEventListener("click", DateSearch);
btn.addEventListener("click", DataArray);

let Daten : any[]=  [] ;
let i;

fetch("https://api.vorlesungsplan.lars-rickert.de/lectures/MOS-WON21")
    .then(res=>res.json())
    .then(data=>{
        
        Daten = data;
        console.log(Daten[0].name)
        // for ( let i = 1; i< Daten.length; i++ ){
        //   console.log("test")
            
        //   if (Daten[i].name === "Frontend-Entwicklung (Modul T2)"){
        //       const test = unl.appendChild(document.createElement('li'))
        //       test.textContent = Daten[i].name + Daten[i].start;
        //       console.log(data[i].name)
  
        //   }}
        
        
       
        

            // element.appendChild(ausgabe)
            // document.body.appendChild(element)
        }
    );

   
    
    function DataArray (){
      for ( let i = 1; i< Daten.length; i++ ){
        console.log(searchInput.value)
        if (Daten[i].name.includes(searchInput.value)) {
          console.log("juhu")
            const test = unl.appendChild(document.createElement('li'))
            test.textContent = Daten[i].name + Daten[i].start;

        }else{
          console.log("nein")
        }
    }
  }
    function DateSearch(){
      for ( let i = 1; i< Daten.length; i++ ){
        console.log("test")
            
        if (Daten[i].start.includes(Datum.value)){
          console.log("juhu")
            const test = unl.appendChild(document.createElement('li'))
            test.textContent = Daten[i].name + Daten[i].start;
            

        }
    }
    };

    