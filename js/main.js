/**
 * Created by Ago Ahas on 06/04/2015.
 */
$(document).ready(function () {
    if (cookieHandling.readCookie('readerList')) {
        userHandling.returningUser();
    }
});

var rssFunctions = {
    rssProto: {},
    addRss: function () {

        askRss();
        function askRss() {
            var url = rssFunctions.rssProto.URL = prompt("Please insert a RSS feed URL");
            var name = rssFunctions.rssProto.name = prompt("Please give a name for that RSS Feed");

            if (url == "" || name == "") {
                alert("You have either entered an empty value to URL or the Name of RSS Feed");
            } else {
                rssFunctions.addRssToList(url, name);
                cookieHandling.addCookie(url, name);
            }

        }
    },

    addRssToList: function (val1, val2) {
        val1 = '"' + val1 + '"';
        $("<li><a onclick='rssFunctions.insertRssToPage(" + val1 + ")'> " + val2 + "</a></li>").appendTo('#sideNav ul');
    },
    insertRssToPage: function (url) {
        $('iframe').remove();
        $("<iframe src='" + url + "'></iframe>").appendTo('#content');
    },

    removeRss: function () {

    }

};

var userHandling = {
    returningUser: function () {
        var odd = "";
        var even = "";
        var cookieArray = cookieHandling.readCookie('readerList').split(",");
        for (var i = 0; i < cookieArray.length; i++) {
            if (i % 2 == 0) {
                odd = cookieArray[i];
            } else {
                even = cookieArray[i];
            }
            if (odd.length > 0 && even.length > 0) {
                rssFunctions.addRssToList(odd, even);
                odd = "";
                even = "";
            }
        }
    }
};

var cookieHandling = {
    userInfoArray: [],
    addCookie: function (url, name) {
        cookieHandling.userInfoArray.push(url, name);
        function createCookie(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else {
                expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        if (cookieHandling.readCookie('readerList')) {
            var existingList = cookieHandling.readCookie('readerList');
            createCookie("readerList", existingList + "," + cookieHandling.userInfoArray, 9999);
        } else {
            createCookie("readerList", cookieHandling.userInfoArray, 9999);
        }
    },

    readCookie: function (name) {
        var nameEquals = name + "=";
        var split = document.cookie.split(';');
        for (var i = 0; i < split.length; i++) {
            var splitArray = split[i];
            while (splitArray.charAt(0) == ' ') splitArray = splitArray.substring(1, splitArray.length);
            if (splitArray.indexOf(nameEquals) == 0) return splitArray.substring(nameEquals.length, splitArray.length);
        }
        return null;
    }
};