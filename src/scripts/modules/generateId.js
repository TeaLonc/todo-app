const newId = function generateToDoId(taskArray) {
    const idArray = taskArray.map(todoObject => todoObject.id);
    let newId;
    if(idArray.lenght===0){
        newId=1;
    }else{
        newId=Math.max(...idArray)+1;
    }
    return newId;
}

export {newId};