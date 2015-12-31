module.exports = function(app) {
    return {
        server: {
            environment: 'staging', // staging or production
            //environment: 'production',
            port: 8888,
            post_json_limit: '1mb',
            root_path: '/home/vagrant/share/safefood', //set the project root path
            timezone: 'Asia/Taipei'
        },
        database: [{
            driver   : 'mysql',
            host     : '127.0.0.1',
            user     : 'root',
            port     : '3306',
            password : 'mypassword',
            database : 'mydatabase',
            connectionLimit : 10,
        }],
        cronjob: [
                    {
                        // Seconds: 0-59
                        // Minutes: 0-59
                        // Hours: 0-23
                        // Day of Month: 1-31
                        // Months: 0-11
                        // Day of Week: 0-6

                        // Asterisk. E.g. *
                        // Ranges. E.g. 1-3,5
                        // Steps. E.g. */2
                        cronTime: '0 0 1 * * *',
                        exec: '/home/vagrant/share/safefood/bin/backup.js >> /home/vagrant/share/safefood/log/cronjob.log'
                    }
                ],
    };
};