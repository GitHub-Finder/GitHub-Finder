import e = require("cors");

for(let i = 0; i< todoArr.length; i++){
    console.log(e.targe.value == todoArr[i].name)
    if(e.target.value == todoArr[i].name){
        if(e.target.classList.contains('list-group-item-success')){
            todoArr[i].done = false
        }else{
            todoArr[i].done = true
        }
        
    }
}