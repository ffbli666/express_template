var cron    = require('cron').CronJob;
var exec    = require('child_process').exec

module.exports = function(job_list) {
    return new CronJob(job_list);
};

var CronJob = function (job_list) {
    var jobs = [];
    var add = function(newjob) {

        var job = new cron({
            cronTime: newjob.cronTime,
            onTick: function() {
                child = exec(newjob.exec);
            },
            start: false,
            timeZone: config.server.timezone
        });
        jobs.push(job);
        return job;
    };

    var start = function() {
        jobs.forEach(function(job, index, array) {
            job.start();
        });
    };

    //init
    if( Object.prototype.toString.call( job_list ) === '[object Array]' ) {
        job_list.forEach(function(job, index, array) {
            add(job);
        });
    }
    return {
        add: add,
        start: start
    };
};