const noteSmall = document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive ");
const noteMedium=document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive")
const noteLarge=document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive")


function regrouper(){ //clusters style
  
    if(noteSmall.length>0){  
        
        style(noteSmall)
        
    }
    if(noteMedium.length>0){
        
        style(noteMedium)
        
    }
    if(noteLarge.length>0){
        
        style(noteLarge) 
       
    }
}

function style(note){   //Add style to clusters 
    for(var i=0;i<note.length;i++){  //Iterate the chart to style the elements
            var Div=note[i]
            var number=note[i].children[0].children[0]
            var numberDiv=note[i].children[0]
            
            number.style.fontSize="17px"
            number.style.color = 'white' 
            number.style.zIndex="9999"  

            numberDiv.style.display="flex"
            numberDiv.style.justifyContent="center"
        
       

            Div.style.display="flex"
            Div.style.justifyContent="center"
            Div.style.alignItems="center"
            Div.style.backgroundColor="black"
            Div.style.borderWidth="1px"
            Div.style.borderStyle="solid"
            Div.style.borderColor="white"
            Div.style.borderRadius="50px"
            Div.style.zIndex="9999"
            if(number.innerText.length>=5){
                Div.style.padding="12px"
            }

            else if(number.innerText.length>=4){
                Div.style.padding="10px"
            }

            else if(number.innerText.length>=3){
                Div.style.padding="8px"
            }
            else if(number.innerText.length>=2){
                Div.style.padding="6px"
            }
            else{
                Div.style.padding="4px"
            }
            
        
        
        
    }

}  


function popUp(list,i){  //Create popups
    //informations of the accident
    var idAccident=popUpData(list[i].fields.num_acc)
    var day=popUpData(list[i].fields.jour)
    var month=popUpData(list[i].fields.mois)
    var year=popUpData(list[i].fields.an)
    var time=popUpData(list[i].fields.hrmn)
    var adress=popUpData(list[i].fields.adr)
    var atm=popUpData(list[i].fields.atm)
    var lum=popUpData(list[i].fields.lum)
    var grav=popUpData(list[i].fields.grav)
    



    //popups style
    var colorText="#1b6698"
    var fontSize="15px"
    var fontSizeTitle="17px"
    var fontWeigth="700"
    
    var pop=L.popup({content:"<h1 style='font-size:"+fontSizeTitle+";'>"+"numero d'accident: "+idAccident+"</h1>"//accident number
    +"<p style='font-size:"+fontSize +";color:"+colorText+"'>"+"<span style='font-size:"+fontSize +";font-weight:"+fontWeigth+";'>"+day+"/"+month+"/"+year+", " //date
    +time+"</span>"+"</p>"
    +"<ul style='display:flex;flex-direction:column; padding:0;align-items:start;'>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"Adresse: "+"<span style='font-size:"+fontSize+";font-weight:"+fontWeigth+";'>"+adress+"</span>"+"</li>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"Condition atmosphÃ©rique: "+"<span style='font-size:+"+fontSize+";font-weight:"+fontWeigth+";'>"+atm+"</span>"+"</li>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"Lumiere: "+"<span style='font-size:"+fontSize+";font-weight:"+fontWeigth+";'>"+lum+"</span>"+"</li>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"GravitÃ©: "+"<span style='font-size:"+fontSize+";font-weight:"+fontWeigth+";'>"+displaydata(grav)+"</span> </li>"
    +"</ul>"
    }) 

    return pop
}

function popUpData(data){   //if the data is not available in the API
    var message="Indisponible"
    if(data=="undefined"){
        return message
    }
    else{
        return data
    }
}

function displaydata(data){
    var arr = data.split(','); // split the string by comma delimiter
        var n=arr.length
        
        if(n>3){
            var result=""
            var count=0
            while(count<n){
                var fourth = arr.slice(count,count+3);
                count=count+3

                
                fourth.forEach(element => {
                    if(element !=""){
                        result+=element+","
                    }
                });
                result=result+" "
            }
            data=result
        }

        return data
    

    
}

setInterval(regrouper, 500)  //we call the function regrouper() every 300ms.
var listAccidentFiltre=[]   //definir une liste d'accident par filtre

var listAccidentDate=[]
var listAccidentIntervallDate=[]

var listAccidentLum=[]
var listAccidentRegions=[]
var listAccidentDepartement=[]
var listAccidentVille=[]

var listAccidentAtm=[]
var listAccidentAge=[]
var listAccidentGravite=[]

var init=false
var deb
var fin
var selectedFiltre



var filtre=false //pour indiquer a la fonction createPin d'utiliser listAccidentFiltre

async function getDataFiltre(){

    init=true

    deb = Date.now()

    
    loadCarte()  //ajouter une animation de chargement 
    loadFiltre()

    await new Promise(r => setTimeout(r, 100)); //sleep(2) pour executer loadCarte() et loadFiltre() //a refaire 
    filtre=true   
    if(selectedLum){  //filtre lunmiere
        selectedFiltre="Lum"
        listAccidentLum=[]

        if(selectedLum=="jour"){
            for(var i=0;i<listAccident.length;i++){
                if(listAccident[i].fields.lum=="Plein jour" || listAccident[i].fields.lum=="CrÃ©puscule ou aube"){
                    listAccidentLum.push(listAccident[i])
                }
              
            }
        }
        else{
                for(var i=0;i<listAccident.length;i++){
                    if(listAccident[i].fields.lum=="Nuit avec Ã©clairage public allumÃ©" || listAccident[i].fields.lum=="Nuit sans Ã©clairage public" || listAccident[i].fields.lum=="Nuit avec Ã©clairage public non allumÃ©"){
                        listAccidentLum.push(listAccident[i])
                    }
                }
        } 
        
          
    }
    
    if(selectedRegion && selectedRegion!="toutes les regions"){ //filtre region
        listAccidentRegions=[]
        selectedFiltre="Region"

        for(var i=0;i<listAccident.length;i++){
            if(listAccident[i].fields.reg_name==selectedRegion){
                listAccidentRegions.push(listAccident[i])
            }
        }
       
    }

    if(selectedDepartement && selectedDepartement!="tous les departements"){ //filtre departement
        listAccidentDepartement=[];

        selectedFiltre="Departement"

        for(var i=0;i<listAccident.length;i++){
            if(selectedDepartement==listAccident[i].fields.dep_name){
                listAccidentDepartement.push(listAccident[i]);   
            }
        }
    }

    

    if(selectedVille && selectedVille!="toutes les villes"){ //filtre ville
        listAccidentVille=[];
        

        selectedFiltre="Ville"
        
        for(var i=0;i<listAccident.length;i++){
            
            if(selectedVille == listAccident[i].fields.nom_com){
                listAccidentVille.push(listAccident[i]);   
            }
        }
    } 

    if(selectedDate){  //filtre date specifique
        listAccidentDate=[];

        selectedFiltre="Date"
        

        for(var i=0;i<listAccident.length;i++){
            try{
                if((listAccident[i].fields.datetime).substring(0,10)==selectedDate){
                    listAccidentDate.push(listAccident[i]);
                }
            }
            catch{
                console.log("no date")
            }
        }
    }
    //Intervalle de dates
    if(selectedDateStart && selectedDateEnd){
        listAccidentIntervallDate=[];
        

        selectedFiltre="intervalle de date"
        var date_debut=new Date(selectedDateStart).getTime();
        var date_fin=new Date(selectedDateEnd).getTime();
        console.log(date_debut);
        console.log(date_fin);
        
        for(var i=0;i<listAccident.length;i++){
            try{
            
                var date_accident=new Date((listAccident[i].fields.datetime).substring(0,10)).getTime();
                //console.log(date_accident);
            
                if((date_debut<=date_accident)&&(date_fin>=date_accident)){
                    
                    listAccidentIntervallDate.push(listAccident[i]);
                }
            }
            catch{
                console.log("no date")
            }
            
        }
        
    }
    fin = Date.now();

    console.log(`Execution time using :${selectedFiltre} ${fin - deb} ms`)    



    selectDataFiltre()  //intersection des listes

    removePin()
    createPin()
   
}
async  function filterList() {   //selectedValueAtm contient les valeurs selectionnÃ©es dans le filtre atm
    loadCarte()  //ajouter une animation de chargement 
    loadFiltre()

    init=true
    await new Promise(r => setTimeout(r, 100)); //sleep(2) pour executer loadCarte() et loadFiltre() //a refaire
        filtre=true;

        deb=Date.now()
/*----------GRAVITE----------*/
        if(selectedValuesGravite){   
            listAccidentGravite=[]  
            
            selectedFiltre="gravite"

             for (let i = 0; i < selectedValuesGravite.length; i++) {
                 var gravIncluded = selectedValuesGravite[i];
               
                 //On boucle sur la liste des accidents
                 for (let j = 0; j < listAccident.length; j++) {
                    
                    //Pour chaque accident, on extrait la liste des gravitÃƒÂ©s & on indique que le sÃƒÂ©parateur est une virgule
                    let gravi = listAccident[j].fields.grav;
					let gravArray =[];
                     
                     //si il y a une personne 
                    try{                      
						gravArray = gravi.split(",");
					}
					catch{
						console.log("only 1 person harmed")
						gravArray.push(gravi)
					}
                     
                     //console.log(gravi);
                    
                     //On tourne sur cette liste et on vÃƒÂ©rifie si elle contient une des gravitÃƒÂ©s selectionnÃƒÂ©es par l'utilisateur
                     for (let y = 0; y < gravArray.length; y++) {
                         let gravite_ind = gravArray[y];
                         let isIncluded = false;
                         
                        

                         if (gravIncluded =="Indemne" && gravite_ind == "Indemne") {
                             isIncluded = true;
                         } else if (gravIncluded == "BlessÃ©" && gravite_ind == "BlessÃ©") {
                             isIncluded = true;
                         } else if (gravIncluded == "TuÃ©" && gravite_ind == "TuÃ©") {
                             isIncluded = true;
                         }
                         if (isIncluded) {
                             listAccidentGravite.push(listAccident[j]);
                             break //quitter la boucle une fois que l'accident est ajouter dans la liste 
                         }
                     }
                 }
             }
             
         }   
    
    
        if(selectedValuesAtm){  //filtre meteo

        listAccidentAtm=[];

        selectedFiltre="atm"

        for (var i=0; i<selectedValuesAtm.length; i++){
            if(selectedValuesAtm[i]=="normale"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="normale" || listAccident[j].fields.atm=="Normale"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValuesAtm[i]=="pluie_legere"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Pluie l\u00e9g\u00e8re"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValuesAtm[i]=="pluie_forte"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Pluie forte"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValuesAtm[i]=="temps_couverts"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Temps couvert"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValuesAtm[i]=="temps_eblouissant"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Temps \u00e9blouissant"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValuesAtm[i]=="neige_grÃªle"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Neige - gr\u00eale"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            }
            if(selectedValuesAtm[i]=="brouillard_fumÃ©e"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Brouillard - fum\u00e9e"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
                
            } 
            if(selectedValuesAtm[i]=="vent_fort_tempÃªtes"){
                for(var j=0;j<listAccident.length;j++){
                    if(listAccident[j].fields.atm=="Vent fort - temp\u00eate"){
                        listAccidentAtm.push(listAccident[j]);
                    }
                    
                } 
            } 
        }
    }

    if(selectedValuesAge){ //filtre age
        listAccidentAge=[]

        selectedFiltre="age"

        for (let i = 0; i < selectedValuesAge.length; i++) {
            var ageRange = selectedValuesAge[i];

            for (let j = 0; j < listAccident.length; j++) {
                let deathYear = listAccident[j].fields.an;
                let years = listAccident[j].fields.an_nais;
                var yearArray=[]
                try{                              //si il y a une personne 
                    yearArray = years.split(",");
                }
                catch{
                    console.log("only 1 person")
                    yearArray.push(years)
                }
        
                for (let y = 0; y < yearArray.length; y++) {
                    let age = deathYear - yearArray[y];
                    let isInRange = false;

                    if (ageRange == "0-18" && age <= 18) {
                        isInRange = true;
                    } else if (ageRange == "18-30" && age >= 18 && age <= 30) {
                        isInRange = true;
                    } else if (ageRange == "30-50" && age >= 30 && age <= 50) {
                        isInRange = true;
                    } else if (ageRange == "50-65" && age >= 50 && age <= 65) {
                        isInRange = true;
                    } else if (ageRange == "65_et_plus" && age >= 65) {
                        isInRange = true;
                    }

                    if (isInRange) {
                        listAccidentAge.push(listAccident[j]);
                        break;
                    }
                }
            }
        }
    }
    fin=Date.now()

    console.log(`execution time filtre ${selectedFiltre} ${fin-deb} ms`)
    
    selectDataFiltre()
    removePin()
    createPin()
}  




function selectDataFiltre(){

    start=Date.now()

    if(!selectedLum){
        listAccidentFiltre= listAccident
    }
    else{

        listAccidentFiltre = listAccidentLum.filter((x) =>    
        listAccident.includes(x))
    }
    

    if(selectedRegion && selectedRegion!="toutes les regions"){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentRegions.includes(x))
    }
    
    if (selectedValuesAtm && selectedValuesAtm.length>0) {  
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentAtm.includes(x))
    }


    if(selectedDepartement && selectedDepartement!="tous les departements"){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentDepartement.includes(x))
    }

    if(selectedVille && selectedVille!="toutes les villes"){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentVille.includes(x))
    }



    if(selectedDate){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentDate.includes(x))
    }

    if(selectedDateStart && selectedDateEnd){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentIntervallDate.includes(x))
    }

    if(selectedValuesAge && selectedValuesAge.length>0){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentAge.includes(x))
    }


	if(selectedValuesGravite && selectedValuesGravite.length>0){
        listAccidentFiltre= listAccidentFiltre.filter((x) =>listAccidentGravite.includes(x))
	}

    end =Date.now()

    console.log(`intersection time : ${ end -start} ms `)

    console.log(listAccidentFiltre)
      
}


async function initFiltre(){  //Ã©viter de cliquer plusieurs fois sur remettre Ã  0 de suite
    if(init){
        selectedVille=selectedDepartement=selectedDate=selectedLum=selectedRegion=selectedValuesAtm=selectedValuesAge=selectedValuesGravite=selectedDateEnd=selectedDateStart= null //remettre a 0 les filtres 
        loadCarte()  //ajouter une animation de chargement 
        loadFiltre()

        
      
        filtre=false
        
        init=false
    
        removePin()     //supprimer les marqueurs de la carte
        createPin()
        nomDepartements()   //reset dep | ville
        nomVilles()
        setViewUser(locationBase,zoom)
    }
    

}

function resetVille(){    //Reset the filter "ville"

    var textChoix=document.querySelector("#ville-choice")
    var villeText=document.querySelector(".ville-text")

    textChoix.innerHTML=""                 
    villeText.style.position="relative"
}

function resetDepartement(){    //Reset the filter "departement"

    var textChoix=document.querySelector("#departement-choice")
    var departementText=document.querySelector(".departement-text")

    textChoix.innerHTML=""                 
    departementText.style.position="relative"
}

function resetRegion(){
    var textChoix=document.querySelector("#region-choice")
    var regionText=document.querySelector(".region-text")

    textChoix.innerHTML=""                 
    regionText.style.position="relative"
}

function addEventVille(){  //Checklist for the filter "ville"

    var textChoix=document.querySelector("#ville-choice")
    var villeText=document.querySelector(".ville-text")
    var items = document.querySelectorAll(".ville-container .item")
    var resetBtn = document.querySelector('input[type="reset"]');
    var listItem=document.querySelector(".ville-container .select-btn")

    listItem.addEventListener("click",()=>{
        closeListsOpened(listItem)
    })

    items.forEach(item => {
    item.addEventListener("click", () => {

        selectedVille=item.innerText     //Retrieve the value
        item.classList.toggle("checked");
        closeList()

        if(selectedVille=="toutes les villes"){  // Don't display the value of "ville" if the user choose "toutes les villes"
            resetVille()
        }

        else{
            textChoix.innerHTML=selectedVille
            villeText.style.position="absolute"

            villeText.style.top="0"
        }

        getDataFiltre() 
        });

        item.addEventListener("mouseover", () => {

            item.style.backgroundColor="#b4dbd6"
        });

        item.addEventListener("mouseleave", () => {

            item.style.backgroundColor="#f5f5f5"
        });

        resetBtn.addEventListener("click", () => {   //reset filter "ville"
            
            if(init){
                villeSelect.children[1].innerHTML="";
                villeText.style.position="relative"
                textChoix.innerHTML=""
            }
            
        });
    }); 
}

function addEventDepartement(){  //Checklist for the filter "departement"

    var textChoix=document.querySelector("#departement-choice")
    var departementText=document.querySelector(".departement-text")
    var items = document.querySelectorAll(".departement-container .item")
    var resetBtn = document.querySelector('input[type="reset"]');
    var listItem=document.querySelector(".departement-container .select-btn")

    listItem.addEventListener("click",()=>{
        closeListsOpened(listItem)
    })

    items.forEach(item => {
    item.addEventListener("click", () => {

        selectedDepartement=item.innerText     //retrieve the value
        item.classList.toggle("checked");

        closeList()

        textChoix.innerHTML=selectedDepartement
        departementText.style.position="absolute"
        departementText.style.top="0"

        getDepartement()
        });

        item.addEventListener("mouseover", () => {

            item.style.backgroundColor="#b4dbd6"
        });

        item.addEventListener("mouseleave", () => {

            item.style.backgroundColor="#f5f5f5"
        });

        resetBtn.addEventListener("click", () => {   //reset filter "ville"
            
            if(init){
                departementSelect.children[1].innerHTML="";
                departementText.style.position="relative"
                textChoix.innerHTML=""
            }
            
        });
    }); 


}

function addEventRegion(){

    var textChoix=document.querySelector("#region-choice")
    var regionText=document.querySelector(".region-text")
    var items = document.querySelectorAll(".region-container .item")
    var resetBtn = document.querySelector('input[type="reset"]');
    var listItem=document.querySelector(".region-container .select-btn")

    listItem.addEventListener("click",()=>{
        closeListsOpened(listItem)
    })

    items.forEach(item => {
    item.addEventListener("click", () => {

        selectedRegion=item.innerText     //Retrieve the value
        item.classList.toggle("checked");

        closeList()

        textChoix.innerHTML=selectedRegion
        regionText.style.position="absolute"
        regionText.style.top="0"

        getRegion()

        });
        item.addEventListener("mouseover", () => {

            item.style.backgroundColor="#b4dbd6"
        });

        item.addEventListener("mouseleave", () => {
            
            item.style.backgroundColor="#f5f5f5"
        });

        resetBtn.addEventListener("click", () => {   //reset filter ville

            regionSelect=null
            regionText.style.position="relative"
            textChoix.innerHTML=""
        });
    }); 


}



function createList(valueList){  //create checklist options

    var list=document.createElement("li")
    var span2=document.createElement("span")

    list.className="item"
    list.value=valueList
    span2.className="item-text"
    span2.innerText=valueList
    list.append(span2)

    return list

}

var listAccident=[]

async function getAccident(){
    var res=await fetch('../new.txt')
    var data=await res.text()

    const lines=data.split("\n")
    for(let i=0;i<lines.length;i++){
        
        listAccident.push(createObjectAccident(lines[i]))
    }
}   

function createObjectAccident(lineAccient){
    const listAttribute=lineAccient.split("*")
    const objectAccident={fields:
        {num_acc:listAttribute[0],
        dep_name:listAttribute[1],
        reg_name:listAttribute[2],
        nom_com:listAttribute[3],
        jour:listAttribute[4],
        mois:listAttribute[5],
        an:listAttribute[6],
        hrmn:listAttribute[7],
        adr:listAttribute[8],
        atm:listAttribute[9],
        lum:listAttribute[10],
        grav:listAttribute[11],
        an_nais:listAttribute[12],
        datetime:listAttribute[13],
        coordonnees:[listAttribute[14],listAttribute[15]],
        }
    }
    
    return objectAccident
}

//Define filters as globals variables to have a complete access from every file

var date=document.getElementById("date")

var dateStart=document.getElementById("date-debut")
var dateEnd=document.getElementById("date-fin")
var regionSelect = document.getElementById("region")
var departementSelect = document.getElementById("departement")
var villeSelect = document.getElementById("ville")
var jourSelect=document.getElementById("jour")
var nuitSelect=document.getElementById("nuit")

function displayDate(inputChoice){
    var dateSpecifiqueContainer=document.getElementById("date-specifique-container")
    var dateIntervalContainer=document.getElementById("date-interval-container")
    var textDate=document.querySelector('.date-specifique-container p')
    var textIntervalDate=document.querySelector('.intervalle-date-container p')
    var textDateValue=document.querySelector("#date-specifique-container span")
    var textDateIntervalValue=document.querySelectorAll("#date-interval-container span")
    

    if(!inputChoice.checked){  //hide date
        dateSpecifiqueContainer.style.display="none"
        textDate.style.color="#333"
        
        date.value = null; 
        textDateValue.innerText="Date"
        textDateValue.style.color="#333"
       
        if(selectedDate){
            selectedDate=null
            getDataFiltre()
        }
        
    }

    else{     //display date
        var inputDateInterval=document.getElementById("interval-date")

        dateSpecifiqueContainer.style.display="flex"
        dateIntervalContainer.style.display="none"
        textDate.style.color='#000'
        textIntervalDate.style.color="#333"
    
        

        if(inputDateInterval.checked){ //hide "intervalle de date"
            inputDateInterval.checked=false
            textDate.style.color='#333'
            textDateIntervalValue[0].innerText="Debut"
            textDateIntervalValue[1].innerText="Fin"
            textDateIntervalValue[0].style.color=textDateIntervalValue[1].style.color="#333"
            dateStart.value=dateEnd.value=null
            selectedDateEnd=selectedDateStart=null

            if(selectedDate){
                getDataFiltre()
            }    
        }
        
    }
}

function displayDateInterval(inputChoice){
    var dateSpecifiqueContainer=document.getElementById("date-specifique-container")
    var dateIntervalContainer=document.getElementById("date-interval-container")
    var textIntervalDate=document.querySelector('.intervalle-date-container p')
    var textDate=document.querySelector('.date-specifique-container p')
    var textDateIntervalValue=document.querySelectorAll("#date-interval-container span")
    var textDateValue=document.querySelector("#date-specifique-container span")
    

    if(!inputChoice.checked){    //hide "intervalle de date"
        dateIntervalContainer.style.display="none"
        textIntervalDate.style.color="#333"
        
        textDateIntervalValue[0]=textDateIntervalValue[1]=""
        textDateIntervalValue[0].innerText="debut"
        textDateIntervalValue[1].innerText="Fin"
        textDateIntervalValue[0].style.color=textDateIntervalValue[1].style.color="#333"
        dateStart.value=dateEnd.value=null // reset  input date

        

   
        if(selectedDateStart && selectedDateEnd){
            selectedDateStart=selectedDataEnd =null
            getDataFiltre()
        }
        

    }
    else{ // display date

        var inputDateSpecifique=document.getElementById("specifique-date")

        dateIntervalContainer.style.display="flex"
        dateSpecifiqueContainer.style.display="none"
        textIntervalDate.style.color="#000"
        textDate.style.color="#333"

        if(inputDateSpecifique.checked){   //  cacher date
            inputDateSpecifique.checked=false
            textDateValue.innerText="Date"
            textDateValue.style.color="#333"
            date.value=null
            selectedDate=null
            if(selectedDateEnd && selectedDateStart){
                getDataFiltre()
            }    
            
        }
        
    }
}

function dateLimit(){  //define a date limit 

    date.setAttribute("min","2012-01-01") 
    date.setAttribute("max","2020-01-01")
    dateStart.setAttribute("min","2012-01-01") 
    dateStart.setAttribute("max","2020-01-01")
    dateEnd.setAttribute("min","2012-01-01") 
    dateEnd.setAttribute("max","2020-01-01")
}

function nomRegions() {
    //API URL to retrieve the regions names
    var apiUrl1 = "https://geo.api.gouv.fr/regions?&fields=nom,code,codesPostaux,departement,region&format=json";

    fetch(apiUrl1)
      .then(response => response.json()) //Convert retrieved datas into JSON objects
      .then(data => {

        var region = data; //contain retrieved datas

        region.sort((a, b) => a.nom.localeCompare(b.nom)); // sort by alphabetical order
        regionSelect.children[1].innerHTML="";
        regionSelect.children[1].append(createList("toutes les regions"))
        region.forEach(region => {

            if (region.nom !== "Mayotte" && region.nom !== "Guadeloupe" && region.nom !== "Martinique" && region.nom !== "Guyane" && region.nom!== "La RÃ©union"){
                var option = createList(region.nom)

                regionSelect.children[1].append(option);
            }
        });
        addEventRegion()
      })
      .catch(console.log("erreur de fetch")) //Manage errors

      console.log("yes")
}

function nomDepartements(){
    

    //API URL to retrieve departments names
    var apiUrl2 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=dep_name";
        fetch(apiUrl2)
          .then(response => response.json()) //Convert retrieved datas into JSON objects
          .then(data => {

            var departement = data.facet_groups[0].facets; 
            departement.sort((a, b) => a.name.localeCompare(b.name));

            departementSelect.children[1].innerHTML="";
            departementSelect.children[1].append(createList("tous les departements"))
            departement.forEach(departement => {
                if (departement.name !== "Mayotte" && departement.name !== "Guadeloupe" && departement.name !== "Martinique" && departement.name !== "Guyane" && departement.name !== "La RÃ©union"){ //Enlever les departements d'outre mer

                    var option = createList(departement.name)

                    departementSelect.children[1].append(option);
                }
            });
            addEventDepartement()
          })
          .catch(console.log("erreur de fetch")) //Manage errors
}

function nomVilles(){
    
    //API URL to retrieve cities names
	var apiUrl3 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com";

	fetch(apiUrl3)
		.then(response => response.json()) //Convert retrieved datas into JSON objects
		.then(data => {
			var ville = data.facet_groups[0].facets; 
			ville.sort((a, b) => a.name.localeCompare(b.name)); //sorted by alphabetical order

            villeSelect.children[1].innerHTML=""
            villeSelect.children[1].append(createList("toutes les villes"))
			ville.forEach(ville => {
				var option = createList(ville.name)

				villeSelect.children[1].append(option);
			})
            addEventVille()
	    })
        .catch(console.log("erreur de fetch")) //Manage errors

        
}


//reset "date/intervalle date"

function resetDate(){
    var resetBtn = document.querySelector('input[type="reset"]');
    resetBtn.addEventListener("click",()=>{
        var dateSpecifiqueContainer=document.getElementById("date-specifique-container")
        var dateIntervalContainer=document.getElementById("date-interval-container")

        dateSpecifiqueContainer.style.display="none"
        dateIntervalContainer.style.display="none"
    })
}

//define filter values as global values so we can access them from all files

//define one value per filter to contain all selected values
var selectedDate
var selectedDateStart  
var selectedDateEnd
var selectedRegion
var selectedDepartement
var selectedVille
var selectedValuesAtm=[]
var selectedValuesAge=[]
var selectedValuesGravite=[]
var selectedLum

var textLum=document.querySelectorAll('.lum-container p')

var listClass=[".ville-container",".weather-container",".age-container",".gravite-container",".departement-container",".region-container"]

function getIntervalleDateStart(){

    closeList()
    var textDate=document.querySelectorAll('#date-interval-container span')
    textDate[0].style.color="gray"
    selectedDateStart=dateStart.value
    textDate[0].innerText=selectedDateStart

    setDateLimit()
}

function getIntervalleDateEnd(){

    closeList()
    var textDate=document.querySelectorAll('#date-interval-container span')
    textDate[1].style.color="gray"
    selectedDateEnd=dateEnd.value
    textDate[1].innerText=selectedDateEnd

    setDateLimit()
}

//filter values if we have start and end dates
function getIntervalleDate(){

    selectedDate=null

    if(selectedDateEnd && selectedDateStart){
        getDataFiltre()
    }
}



//get date if it's unique and not an interval
function getDate(){  //recuperer la date 
    closeList()
    selectedDateEnd=selectedDateStart=null //nullify the date interval
    var textDate=document.querySelector('#date-specifique-container span')
    textDate.style.color="gray"
    
    selectedDate=date.value
    textDate.innerText=selectedDate

    getDataFiltre()
}

function setDateLimit(){  //selectedDateStart <= selectedDateEnd
    dateEnd.setAttribute("min",selectedDateStart)
    dateStart.setAttribute("max",selectedDateEnd)

}

//Selected region
function getRegion() { 

    resetVille()

    resetDepartement()

    selectedDepartement=selectedVille=null //nullify departements and cities if we select a new region
    
        if(selectedRegion=="toutes les regions"){
            
            nomDepartements()

            nomVilles()

            resetRegion()
        }
        else{
            // API's URL for departements of the selected region

            if(selectedRegion!="Corse"){
                var apiUrl = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=dep_name&refine.reg_name=" + selectedRegion; // permet encoder un nouvel URL avec la region selectionnÃ©
            

            
                fetch(apiUrl)
                    .then(response => response.json()) // turn selected data into json object
                    .then(data => {
                        var departement = data.facet_groups[0].facets; //variable departement carrying the data we just got

                        departement.sort((a, b) => a.name.localeCompare(b.name)); // alphabetical sort
                        //updating the departement list
                        var departementSelect = document.getElementById("departement"); //Variable with id = departement

                        departementSelect.children[1].innerHTML=""; //Deleting previous options
                        departementSelect.children[1].append(createList("tous les departements"))
                        departement.forEach(departement => {
                        var option = createList(departement.name)

                        departementSelect.children[1].append(option); 
                        });
                        addEventDepartement()  //adding events to departements
                    })
                // API's URL for cities of the selected region
                
                var apiUrl1 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com&refine.reg_name=" +selectedRegion; // permet encoder un nouvel URL avec la region selectionnÃ©
                
                fetch(apiUrl1)
                .then(response => response.json()) // turn selected data into json object
                .then(data => {
                    var ville = data.facet_groups[0].facets; //variable villes carrying the data we just got

                    ville.sort((a, b) => a.name.localeCompare(b.name)); // alphabetical sort
                    // Updating list of cities
                    villeSelect.children[1].innerHTML=""; // Deleting previous options
                    villeSelect.children[1].append(createList("toutes les villes"))
                    ville.forEach(ville => {
                        var option = createList(ville.name)

                        villeSelect.children[1].append(option); //adding cities from departement in the "city" filter
                    });

                    addEventVille()  //adding various events to cities
                })
            
               
            }
            else{
                departementSelect.children[1].innerHTML=""; //Deleting previous options
                villeSelect.children[1].innerHTML=""
                resetVille()
                resetDepartement()
                
            }
            getDataFiltre()  //filter
        }

        
            
    }


function getDepartement(){

    resetVille()

    selectedVille=null //nullify city if another departement is selected

    if(selectedDepartement=="tous les departements"){  //if all departements are selected then we show all cities from selected region
        getRegion()
    }

    else{
        //API's URL for cities of the selected departement
        var apiUrl2 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com&refine.dep_name=" +selectedDepartement; // permet encoder un nouvel URL avec la region selectionnÃ©
        //Getting API's departement for selected region
        fetch(apiUrl2)
        .then(response => response.json())
        .then(data => {
            var ville = data.facet_groups[0].facets;

            ville.sort((a, b) => a.name.localeCompare(b.name)); //alphabetical sort
            //updating the cities list
            var villeSelect = document.getElementById("ville"); //Variable with id = ville

            villeSelect.children[1].innerHTML=""; //deleting previous options
            villeSelect.children[1].append(createList("toutes les villes"))
            ville.forEach(ville => {
                var option = createList(ville.name)

                villeSelect.children[1].append(option); //adding cities from the departement
            });
            addEventVille()
        })
        getDataFiltre()
    }
}

function getJour(inputJour){  //get value of filter "jour"

    if(!inputJour.checked){
        selectedLum=null
        textLum[0].style.color="#333"
    }

    else{
        console.log(textLum)
        textLum[0].style.color="#000"
        textLum[1].style.color="#333"
        selectedLum=jourSelect.value
        var inputNuit=document.getElementById("nuit")  //nullify the "nuit" button
        if(inputNuit.checked){
            inputNuit.checked = false;
        }
    }
    getDataFiltre()
}

function getNuit(inputNuit){ //get "nuit" filter value

    if(!inputNuit.checked){
        selectedLum=null
        textLum[1].style.color="#333"
    }

    else{
        textLum[1].style.color="#000"
        textLum[0].style.color="#333"
        selectedLum=nuitSelect.value
        var inputJour=document.getElementById("jour") //nullify "jour" button
        if(inputJour.checked){
            inputJour.checked = false;
        }
    }
    getDataFiltre()
}

function getAtm(){  //get values from meteo filter

    var textChoix=document.querySelector("#weather-choice")
    var weatherText=document.querySelector(".weather-text")
    var items = document.querySelectorAll(".weather-container .item")
    var listItem=document.querySelector(".weather-container .select-btn")

    listItem.addEventListener("click",()=>{
        closeListsOpened(listItem)
    })

    items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        closeList()

        const selectedItems = document.querySelectorAll("#weather .checked"); // get all class "checked" elements

        selectedValuesAtm = Array.from(selectedItems).map(item => item.getAttribute("value")); //Get values of the attribute "value" from selected elements

        textChoix.innerHTML=""
        for(var i=0;i<selectedValuesAtm.length;i++){
            if(i>=2){                                                      
                textChoix.innerHTML+=" ..."
                break;
            }
            textChoix.innerHTML+=selectedValuesAtm[i]+" "
        }

        if(selectedValuesAtm.length>0){
            weatherText.style.position="absolute"
            weatherText.style.top="0"
        }

        else{
            weatherText.style.position="relative"
        }
        filterList();    
        });

        resetBtn.addEventListener("click", () => {
            item.classList.remove('checked');
            textChoix.innerHTML=""
            weatherText.style.position="relative"
        });
    }); 
}

function getAge(){

    var textChoix=document.querySelector("#age-choice")
    var ageText=document.querySelector(".age-text")
    var items = document.querySelectorAll(".age-container .item")
    var listItem=document.querySelector(".age-container .select-btn")

    listItem.addEventListener("click",()=>{
        closeListsOpened(listItem)
    })

    items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        closeList()

        const selectedItems = document.querySelectorAll(".age-container .checked"); //get all class "checked" elements

        selectedValuesAge = Array.from(selectedItems).map(item => item.getAttribute("value")); //Get values of the attribute "value" from selected elements

        filterList(); 

        textChoix.innerHTML=""
        for(var i=0;i<selectedValuesAge.length;i++){
            if(i>=2){                                                      
                textChoix.innerHTML+=" ..."
                break;
            }

            textChoix.innerHTML+=selectedValuesAge[i]+" "
        }

        if(selectedValuesAge.length>0){
            ageText.style.position="absolute"
            ageText.style.top="0"
        }

        else{
            ageText.style.position="relative"
        }
    });

        resetBtn.addEventListener("click", () => {
            item.classList.remove('checked');
            textChoix.innerHTML=""
            ageText.style.position="relative"
        });

    }); 
}

function getGravite(){

    var textChoix=document.querySelector("#gravite-choice")
    var graviteText=document.querySelector(".gravite-text")
    var items = document.querySelectorAll(".gravite-container .item")
    var listItem=document.querySelector(".gravite-container .select-btn")
    

    listItem.addEventListener("click",()=>{
            closeListsOpened(listItem)
    })

    items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        closeList()

        const selectedItems = document.querySelectorAll(".gravite-container .checked"); //get all class "checked" elements

        selectedValuesGravite = Array.from(selectedItems).map(item => item.getAttribute("value")); //Get values of the attribute "value" from selected elements

        filterList(); 

        textChoix.innerHTML=""
        for(var i=0;i<selectedValuesGravite.length;i++){
            if(i>=2){                                                      
                textChoix.innerHTML+=" ..."
                break;
            }
            textChoix.innerHTML+=selectedValuesGravite[i]+" "
        }

        if(selectedValuesGravite.length>0){
            graviteText.style.position="absolute"
            graviteText.style.top="0"
        }

        else{
            graviteText.style.position="relative"
        }
    });

        resetBtn.addEventListener("click", () => {
            item.classList.remove('checked');
            textChoix.innerHTML=""
            graviteText.style.position="relative"
        });
    }); 
}

function openFiltreList(){   //Open filter lists

    for(var i=0;i<listClass.length;i++){

        const selectBtn = document.querySelectorAll(listClass[i]+" .select-btn")

        items = document.querySelectorAll(listClass[i]+" .item"),

        resetBtn = document.querySelector('input[type="reset"]');

        selectBtn.forEach(selectBtn => {
            selectBtn.addEventListener("click", () => {
                selectBtn.classList.toggle("open");
            }); 
        });
    }
}

function closeList(){   //Close list once city, departement & region is chosen

    const selectBtns = document.querySelectorAll(".select-btn")
    

    selectBtns.forEach(selectBtn => {selectBtn.classList.value="select-btn"} )
}

function closeListsOpened(list){
    const selectBtns = document.querySelectorAll(".select-btn")
    
    selectBtns.forEach(selectBtn => {
        if(selectBtn !=list){
            selectBtn.classList.value="select-btn"
            }
        } )
    
}

var carte=document.getElementById("map")
var spinner=document.getElementById("spinner-carte")


//start loading animation
async function loadCarte(){
    spinner.style.display="block"
    carte.style.opacity="0.3"
    await new Promise(r => setTimeout(r, 400));   
}

//stop the loading animation
function workCarte(){
    carte.style.opacity="1"
    spinner.style.display="none"
}

//Block filters during the load of accidents

//Retrieve elements "date" and "luminositÃ©"
var switchTab=document.querySelectorAll("#switch-container")

//Retrieve all others filters
var selectBtn=document.querySelectorAll(".select-btn")

//When an filter is selected, filters become unavailables
function loadFiltre(){
        switchTab.forEach(element=>{
        element.style.pointerEvents="none",
        element.style.cursor="not-allowed",
        
        element.style.opacity="0.5"})

        selectBtn.forEach(element=>{
            element.style.pointerEvents="none",
        element.style.cursor="not-allowed",
        
        element.style.opacity="0.5"
        }) 
}


//When markers are loaded, the user can use filters again
 function workFiltre(){
    switchTab.forEach(element=>{
        element.style.pointerEvents="auto",
        element.style.cursor="pointer",
        
        element.style.opacity="1"})

        selectBtn.forEach(element=>{
        element.style.pointerEvents="auto",
        element.style.cursor="pointer",
        
        element.style.opacity="1"
        })
    
 }

 var zoom=10


var carIcon = new L.Icon({ //Modify the marker
    iconUrl: '../images/marker.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var southWest = L.latLng(35.712, -15.227)
var northEast = L.latLng(60.774, 15.125)
var bounds = L.latLngBounds(southWest, northEast);
var map
var locationBase=[48.862725, 2.287592]

function initMap(){  //Initialization of the map
    map=L.map("map",{
        fullscreenControl: true,
        maxBounds: bounds,   
        fullscreenControlOptions: {
        position: 'topright'},
        wheelDebounceTime:0,
        wheelPxPerZoomLevel:50,
        minZoom:5,
    }).setView(locationBase,8);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    
    

    
    L.control.scale({   //Map dimensions
        metric:true,
        imperial:true,
        maxwidth:100,
        position:"bottomleft"
    }).addTo(map)

    map.on('zoom', ()=> {
        zoom=map.getZoom()
    })
}

var markerCluster=new L.markerClusterGroup( { animate: true,animateAddingMarkers: true})


function removePin(){  //Delete all markers
        markerCluster.clearLayers() 

}

 
//Function to create a marker and the content of his popup.

async function createPin(){

    await loadCarte()  //loadCarte is an sync function because we display 50000 markers each 100ms
    loadFiltre()

    
    if(!filtre){ //display all pins if we don't filter
        var list=listAccident
        if(list.length<=0){
            await getAccident()
        }
        
    }
    else{   
        var list=listAccidentFiltre
    }


    


    const record=50000
    const waitingTime=2000
    let a
    let b
    let marker
    let pop

        markerCluster=new L.markerClusterGroup( { animate: true,animateAddingMarkers: true}) 
    
    
    

    
    let markers=[]
    for (let i = 0; i < list.length; i++) {
          
        try {
            a = list[i].fields.coordonnees[0];
            b = list[i].fields.coordonnees[1];
            marker = L.marker([a, b], { icon: carIcon });
            pop = popUp(list, i);
            marker.bindPopup(pop);
            markers.push(marker)
            
            if(i%record==0 && i>0){  //add only 100000 markers at once 
                
                markerCluster.addLayers(markers);
                markers=[]
                await loadCarte()
                
                map.addLayer(markerCluster);
                
            }
            
            
            else if(i==(list.length -2) && (i%record!=0)){ //add the rest of the markers

                markerCluster.addLayers(markers);
                
                map.addLayer(markerCluster);
                await loadCarte()
                

                
            }
            

        } 
        catch (error) {
            console.log("Couldn't find coordinates");
        }
    }

    workCarte()
    workFiltre()

    try{

        if(selectedRegion || selectedDepartement || selectedVille){ //center the map to a specific location if a region | dep | ville is selected

            setViewUser(list[0].fields.coordonnees)
        }
    }
    catch{
        console.log("couldn't find coordinates")
    }

}

function setViewUser(listCoordonnees){   //center the map to a specific location
    map.setView(listCoordonnees,zoom, {  //make the animation smooth 
        "animate": true,
        "pan": {
          "duration": 1
        }})
}



nomRegions()
nomDepartements()
nomVilles()
openFiltreList()
dateLimit()
getAtm()
getAge()
getGravite()
initMap()
createPin()
resetDate()





