var sanitizeHtml = require('sanitize-html');

module.exports = function(str) {
    return sanitizeHtml(str, {
        allowedTags: [],
        allowedAttributes: []
    });
};
