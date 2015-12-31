#!/usr/bin/env node
var async    = require("async");
var config   = require("../config")();
var spawn    = require("child_process").spawn;
var fs       = require("fs");
var archiver = require("archiver");
var moment   = require("moment");

var log = function(str) {
    console.log((new Date).toString() + ": " + str);
};

var root_path = config.server.root_path;
log("backup starting");
async.waterfall([
        function(callback) {
            log("dump database starting");
        },
        function(callback) {
            log("zip starting");
            var date = moment(new Date()).format("YYYY-MM-DD");
            var dest_filename = "backup_" + date+ ".zip";
            var output = fs.createWriteStream(root_path + "/backup/" + dest_filename);
            var archive = archiver("zip");

            output.on("close", function() {
                log(archive.pointer() + " total bytes");
                log("archiver has been finalized and the output file descriptor has closed.");
                log("zip end");
                //copy
                fs.createReadStream(root_path + "/backup/" + dest_filename)
                    .pipe(fs.createWriteStream(root_path + "/public/download/backup.zip"));
                callback(null);
            });

            archive.on("error", function(err) {
                throw err;
            });

            archive.pipe(output);

            archive
                .directory(root_path + "/backup/database", "./database")
                .directory(root_path + "/public/upload", "./upload")
                .finalize();
        },
    ], function (err, result) {
        if (err) {
            log(err);
            return;
        }
        log("backup end");
});