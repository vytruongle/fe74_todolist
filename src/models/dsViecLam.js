function DsViecLam() {
  this.arr = [];

  this.arrComplete = [];
  //them vieclam
  this.themViecLam = function (job) {
    this.arr.push(job);
  };

  //lay index cua jobs
  this.layIdJob = function (idJob, array) {
    /**
     * quet mang lay ra index cua phan tu
     */
    var index = -1;
    array.forEach(function (job, i) {
      if (idJob === job.id) {
        index = i;
      }
    });
    return index;
  };

  //xoa viec lam
  this.xoaViecLam = function (idJob) {
    const index = this.layIdJob(idJob, this.arr);
    this.arr.splice(index, 1);
  };

  //complete task
  this.complete = function (idJob) {
    const index = this.layIdJob(idJob, this.arr);
    this.arrComplete.push(this.arr[index]);
    this.arr.splice(index, 1);
  };

  this.unComplete = function (idJob) {
    const index = this.layIdJob(idJob, this.arrComplete);
    this.arr.push(this.arrComplete[index]);
    this.arrComplete.splice(index, 1);
  };
}
