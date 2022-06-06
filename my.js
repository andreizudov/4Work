
const reader = require( 'xlsx' )
const xl = require('excel4node')

const file = reader.readFile( './1.xlsx' )

let d=file.Sheets.Лист1
let quantityProperty=[]
for(key in d){
   
     quantityProperty.push(key)
}


let zakupPast = []
let realizaciaPast =[]
let zakupCurrent = []
let realizaciaCurrent = [] 


// итого сумма реализации прошлой недели
let sumRealizaciaPast = 0
for(let i=10;i<=quantityProperty.length;i=i+7){
    var x =quantityProperty[i]
    realizaciaPast.push(file.Sheets.Лист1[x].v)
    sumRealizaciaPast = sumRealizaciaPast + file.Sheets.Лист1[x].v
}

// итого сумма закупа прошлой недели
let sumZakupPast = 0
for(let i=9;i<=quantityProperty.length-2;i=i+7){
    var x =quantityProperty[i]
    zakupPast.push(file.Sheets.Лист1[x].v)
    sumZakupPast = sumZakupPast + file.Sheets.Лист1[x].v
    
}

// итого сумма реализации текущей недели
let sumRealizaciaCurrent = 0
for(let i=13;i<=quantityProperty.length;i=i+7){
    var x =quantityProperty[i]
    realizaciaCurrent.push(file.Sheets.Лист1[x].v)
    sumRealizaciaCurrent = sumRealizaciaCurrent + file.Sheets.Лист1[x].v
}

// итого сумма закупа текущей недели
let sumZakupCurrent = 0
for(let i=12;i<=quantityProperty.length;i=i+7){
    var x =quantityProperty[i]
    zakupCurrent.push(file.Sheets.Лист1[x].v)
    sumZakupCurrent = sumZakupCurrent + file.Sheets.Лист1[x].v
}

let obshayaMargaPast = (1-sumZakupPast/sumRealizaciaPast)*100
let obshayaMargaCurrent= (1-sumZakupCurrent/sumRealizaciaCurrent)*100
let deltaMarga = 0

// Абсолютное изменение прибыли 
let absolutDeltaPribil = (sumRealizaciaCurrent*obshayaMargaCurrent - sumRealizaciaPast*obshayaMargaPast).toFixed(0)

let allGoods = []

// создаю объект со всеми данными
for(let i=8; i<=quantityProperty.length-2;i=i+7)
{
    var x= quantityProperty[i]
    allGoods.push(
        {
        name:file.Sheets.Лист1[x].v, 
        weekPast:{закуп:0, реализация:0, маржа: 0, доля:0},
        weekCurrent:{закуп:0, реализация:0,маржа: 0, доля:0},
        vliainieDeltaMarga:0,
        vliainieDeltaTO:0,
        vlianieObshee:0
    })
  
    
}

for (let i=0;i<=allGoods.length-1;i++)
{
    //закуп
    allGoods[i].weekPast.закуп = zakupPast[i]
    allGoods[i].weekCurrent.закуп = zakupCurrent[i]

    //реализация
    allGoods[i].weekPast.реализация= realizaciaPast[i]
    allGoods[i].weekCurrent.реализация= realizaciaCurrent[i]

    //расчет маржи
    allGoods[i].weekPast.маржа = Number(((1-zakupPast[i]/realizaciaPast[i])*100).toFixed(3))
    allGoods[i].weekCurrent.маржа = Number(((1-zakupCurrent[i]/realizaciaCurrent[i])*100).toFixed(3))

    //расчет доли
    allGoods[i].weekPast.доля = Number((realizaciaPast[i]/sumRealizaciaPast*100).toFixed(3))
    allGoods[i].weekCurrent.доля = Number((realizaciaCurrent[i]/sumRealizaciaCurrent*100).toFixed(3))

    //влияние изменения маржи на общий процент маржи 
    allGoods[i].vliainieDeltaMarga = Number((allGoods[i].weekPast.доля*(allGoods[i].weekCurrent.маржа - allGoods[i].weekPast.маржа)/100).toFixed(3))
    allGoods[i].vliainieDeltaTO = Number(((allGoods[i].weekCurrent.доля-allGoods[i].weekPast.доля)*(allGoods[i].weekCurrent.маржа-obshayaMargaCurrent)/100).toFixed(3))
    allGoods[i].vlianieObshee = Number(allGoods[i].vliainieDeltaTO+allGoods[i].vliainieDeltaMarga)

    // общее изменение маржи от недели к недели
    deltaMarga =deltaMarga+ allGoods[i].vliainieDeltaMarga + allGoods[i].vliainieDeltaTO

    
}

function recursia(){
   for (let y=0; y<=allGoods.length-1;y++){
       for( let i =0; i<=y;i++)
       {
        if(allGoods[y].vlianieObshee>allGoods[i].vlianieObshee){
           
            var x = allGoods[y]
            allGoods[y] = allGoods[i]
            allGoods[i] = x
       }
       }
      
   }
}

recursia()




// вывод по марже
console.log(obshayaMargaCurrent)
let vivodPoMarge = "Изменение маржи за прошедшую неделю на" + " " + deltaMarga.toFixed(2)+ "%" + " "+ "в абсолютном вырежении"+ " "+ (sumRealizaciaCurrent*obshayaMargaCurrent/100 - sumRealizaciaPast*obshayaMargaPast/100).toFixed(0) + "Руб"
console.log(vivodPoMarge)

// условие если полоджительное изменение маржи то первые три позиции , если отрицательные то первые три отрицательные 
if(deltaMarga>0)
{
    
    console.log("Наибольшее положительное влияние на  маржу оказали:") 
    for (let i=0; i<=2; i++)
    {
        console.log(" "+ (i+1) +" "+ allGoods[i].name + ":"+ (allGoods[i].vlianieObshee).toFixed(2) )  
      
    }
}
else {
    console.log("Наибольшее отрицательное влияние на  маржу оказали:") 
    for (let i=0; i<=2; i++)
    {
     console.log(" "+ (i+1) +" "+ allGoods[allGoods.length-1-i].name + ":"+(allGoods[allGoods.length-1-i].vlianieObshee).toFixed(2))
      
    }
}


// Вывод по ТО

let vivodPoTO = "Изменение ТО на" + " "+ (((sumRealizaciaCurrent/sumRealizaciaPast*100)-100).toFixed(2))+ "%" + " " + "в абсолюте : " + " " + (sumRealizaciaCurrent-sumRealizaciaPast).toFixed(2) + "руб"
console.log (vivodPoTO)




