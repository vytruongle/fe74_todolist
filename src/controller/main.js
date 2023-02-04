function getEle(id) {
  return document.getElementById(id);
}
var dsvl = new DsViecLam();
getLocalStorage();

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
  var viecLam = layThongTinViecLam();
  dsvl.themViecLam(viecLam);
  renderJob(dsvl.arr);
  resetViecLam();
  setLocalStorage();
});

function renderJob(job) {
  var conttentHTML = "";
  job.forEach(function (job, i) {
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

/**
 * Xoa viec lam
 */

function deleteVL(idJob) {
  dsvl.xoaViecLam(idJob);
  renderJob(dsvl.arr);
  setLocalStorage();
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
                  <button class="btn pr-1" style="color: #dc3545" onclick="deleteVL(${job.id})"><i class="fa-solid fa-trash-can"></i></button>
                  <button class="btn px-0" style="color: #28a745" onclick="unCompleteVL(${job.id})"><i class="fa-solid fa-circle-check"></i></button>
              </div>
          </li>`;
  });

  getEle("completed").innerHTML = conttentHTML;
}

function completeVL(idJob) {
  dsvl.complete(idJob);
  renderComplete(dsvl.arrComplete);
  renderJob(dsvl.arr);
  setLocalStorage();
}

function unCompleteVL(idJob) {
  dsvl.unComplete(idJob);
  renderComplete(dsvl.arrComplete);
  renderJob(dsvl.arr);
  setLocalStorage();
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
  var dataStringComplete = JSON.stringify(dsvl.arrComplete);
  localStorage.setItem("DSVL_Complete", dataStringComplete);
}

function getLocalStorage() {
  var dataString = localStorage.getItem("DSVL");
  //   convert string to JSON
  var dataJSON = JSON.parse(dataString);
  dsvl.arr = dataJSON;
  //   render tbody
  renderJob(dsvl.arr);
  var dataStringComplete = localStorage.getItem("DSVL_Complete");
  var dataCompleteJSON = JSON.parse(dataStringComplete);
  dsvl.arrComplete = dataCompleteJSON;
  renderComplete(dsvl.arrComplete);
}
