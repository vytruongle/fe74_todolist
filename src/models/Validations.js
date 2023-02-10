function Validations() {
  this.checkEmpty = function (value, messId, mess) {
    if (value == "") {
      getEle(messId).style.display = "block";
      getEle(messId).innerHTML = mess;
      return false;
    }
    getEle(messId).style.display = "none";
    getEle(messId).innerHTML = "";
    return true;
  };

  this.checkTaskSimilar = function (value, messId, mess) {
    var taskUncomplete = dsvl.arr;
    var taskComplete = dsvl.arrComplete;
    var valueLowerCase = value.toLowerCase();
    var isCheck = true;

    for (var i = 0; i < taskUncomplete.length; i++) {
      var taskLowerCase = taskUncomplete[i].jobToDo.toLowerCase();
      if (taskLowerCase === valueLowerCase) {
        isCheck &= false;
        getEle(messId).style.display = "block";
        getEle(messId).innerHTML = mess;
        break;
      }
      getEle(messId).style.display = "none";
      getEle(messId).innerHTML = "";
    }
    if (isCheck) {
      for (var i = 0; i < taskComplete.length; i++) {
        var taskLowerCase = taskComplete[i].jobToDo.toLowerCase();
        if (taskLowerCase === valueLowerCase) {
          isCheck &= false;
          getEle(messId).style.display = "block";
          getEle(messId).innerHTML = mess;
          break;
        }
        getEle(messId).style.display = "none";
        getEle(messId).innerHTML = "";
      }
    }

    return isCheck;
  };
}
