function replaceContent(data) {

    imgRegex = /\[img\](.*?)\[\/img\]/g;
    urlRegex = /\[url=(.*?)\]/g;

    var newData = data;

    newData = newData.replace(imgRegex, (match, src) => {

        var url;

        src.replace(/<a href=\"(.*?)\"/g, (match2, src2) => {
            url = src2;
        });

        if (url) {
            url = url.split("%5B/img%5D").join("");
            url = url.split("%5B/url%5D").join("");
        } else {
            url = "";
        }

        return "<img src=\"" + url + "\"</img>";
    });

    newData = newData.replace(urlRegex, (match, src) => {
        return "<a href=\"" + src + "\">";
    });

    newData = newData.replace("[/url]", "</a>");

    return newData;
}


var ImageBBCode = {

    parseBBCodeImages: function(data, callback) {

        if (data && data.postData && data.postData.content) {

            data.postData.content = replaceContent(data.postData.content);
        }


        callback(null, data);
    },

    parseBBCodeImagesInComposerPreview: function(data, callback) {

        if (data) {

            data = replaceContent(data);
        }

        callback(null, data);
    }
};

module.exports = ImageBBCode;
