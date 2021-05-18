console.log('Client side javascript file is loaded!')

// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
// fetch("http://localhost:3000/weather?address=!").then((response)=>{
//     response.json().then((data)=>{
//        if(data.error){
//            console.log("Error ",data.error)
//        }else{
//            console.log(data.location)
//            console.log(data.data)
//        }
//     })
// })

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msgOne=document.querySelector('#msg-1')
const msgTwo=document.querySelector('#msg-2')

msgOne.textContent=''
msgTwo.textContent=''

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    // console.log("testing!")
    console.log(location)
    msgOne.textContent="Loading"
    fetch("/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
       if(data.error){
           console.log("Error ",data.error)
           msgOne.textContent="Error "+data.error
       }else{
           console.log(data.location)
           console.log(data.data)
           msgOne.textContent=data.location
           msgTwo.textContent=data.data
       }
    })
    })
})