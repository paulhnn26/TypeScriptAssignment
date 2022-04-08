const Datum = document.querySelector('#myInput') as HTMLInputElement;
const ausgabe = document.querySelector('#Ausgabe') as HTMLLIElement;
const element = document.createElement('p')
const unl = document.querySelector("#parent") as HTMLUListElement;
let i;

fetch("https://api.vorlesungsplan.lars-rickert.de/lectures/MOS-WON21")
    .then(res=>res.json())
    .then(data=>{
        console.log(data[0].name)
        
        
        for ( let i = 1; i< data.length; i++ ){
            
            // const test = unl.appendChild(document.createElement('li'))
            // test.textContent = data[i].name + data[i].start;
            if (data[i].name === "Frontend-Entwicklung (Modul T2)"){
                const test = unl.appendChild(document.createElement('li'))
                test.textContent = data[i].name + data[i].start;

            }

            // element.appendChild(ausgabe)
            // document.body.appendChild(element)
        }
    })