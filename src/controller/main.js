function getEle(id) {
  return document.getElementById(id);
}
var dsvl = new DsViecLam();
var validation = new Validations();

if (dsvl.arr.length > 0) {
  getLocalStorage();
}

if (dsvl.arrComplete.length > 0) {
  getLocalStorageComplete();
}

function layThongTinViecLam() {
  var _jobToDo = getEle("newTask").value;
  var _idJob = Math.random();
  var job = new ViecLam(_jobToDo, _idJob);
  return job;
}

/**
 * Them viec lam
 */

getEle("addItem").addEventListener("click", function () {
  /**
   * check input empty
   */
  var isValid = true;
  var inputValue = getEle("newTask").value;
  isValid =
    validation.checkEmpty(inputValue, "notiInput", "Your input box is empty") &&
    validation.checkTaskSimilar(inputValue, "notiInput", "Task is existed");

  if (!isValid) return null;

  var viecLam = layThongTinViecLam();
  dsvl.themViecLam(viecLam);
  renderJob(dsvl.arr);
  resetViecLam();
  setLocalStorage();
  setLocalStorageComplete();
});

function renderJob(task) {
  var conttentHTML = "";
  
  task.forEach(function (job) {
    conttentHTML += `<li class="d-flex justify-content-between align-items-center">
        <span>${job.jobToDo}</span>
        <div>
            <button class="btn pr-1" style="color: #dc3545" onclick="deleteVL(${job.id})"><i class="fa-solid fa-trash-can"></i></button>
            <button class="btn px-0" style="color: #28a745" onclick="completeVL(${job.id})"><i class="fa-regular fa-circle-check"></i></button>
        </div>
    </li>`;
  });
  
  getEle("todo").innerHTML = conttentHTML;
}

function completeVL(idJob) {
  dsvl.complete(idJob);
  renderComplete(dsvl.arrComplete);
  renderJob(dsvl.arr);
  setLocalStorage();
  setLocalStorageComplete();
}

/**
 * Xoa viec lam chua hoan thanh
 */

function deleteVL(idJob) {
  dsvl.xoaViecLam(idJob, dsvl.arr);
  renderJob(dsvl.arr);
  setLocalStorage();
  setLocalStorageComplete();
}

/**
 * hoan thanh viec lam
 */

function renderComplete(job) {
  var conttentHTML = "";

  job.forEach(function (job, i) {
    conttentHTML += `<li class="d-flex justify-content-between align-items-center">
              <span>${job.jobToDo}</span>
              <div>
                  <button class="btn pr-1" style="color: #dc3545" onclick="deleteCompleteTask(${job.id})"><i class="fa-solid fa-trash-can"></i></button>
                  <button class="btn px-0" style="color: #28a745" onclick="unCompleteVL(${job.id})"><i class="fa-solid fa-circle-check"></i></button>
              </div>
          </li>`;
  });

  getEle("completed").innerHTML = conttentHTML;
}

// undo complte task
function unCompleteVL(idJob) {
  dsvl.unComplete(idJob);
  renderComplete(dsvl.arrComplete);
  renderJob(dsvl.arr);
  setLocalStorage();
  setLocalStorageComplete();
}

/**
 * Xoa viec lam da hoan thanh
 */

function deleteCompleteTask(idJob) {
  dsvl.xoaViecLam(idJob, dsvl.arrComplete);
  renderJob(dsvl.arr);
  renderComplete(dsvl.arrComplete);
  setLocalStorage();
  setLocalStorageComplete();
}

/**
 * reset viec lam
 */

function resetViecLam() {
  getEle("newTask").value = "";
}
/*
 *Luu DS viec lam
 *
 */

function setLocalStorage() {
  //convert JSON to string
  var dataString = JSON.stringify(dsvl.arr);
  localStorage.setItem("DSVL", dataString);
}

function setLocalStorageComplete() {
  var dataStringComplete = JSON.stringify(dsvl.arrComplete);
  localStorage.setItem("DSVL_Complete", dataStringComplete);
}

function getLocalStorage() {
  var dataString = localStorage.getItem("DSVL");
  //   convert string to JSON
  var dataJSON = JSON.parse(dataString);
  if(dataJSON == "null") {
    dsvl.arr = []
  }
  dsvl.arr = dataJSON;
  //   render tbody

  renderJob(dsvl.arr);
}

function getLocalStorageComplete() {
  var dataStringComplete = localStorage.getItem("DSVL_Complete");
  var dataCompleteJSON = JSON.parse(dataStringComplete);
    if(dataCompleteJSON == "null") {
    dsvl.arrComplete = []
  }
  dsvl.arrComplete = dataCompleteJSON;

  renderComplete(dsvl.arrComplete);
}
