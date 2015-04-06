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
    rssList: {array: []},
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
        $("<li><a datatype='" + val1 + "," + val2 + "," + "' onclick='rssFunctions.insertRssToPage(" + val1 + ")'> " + val2 + "</a></li>").appendTo('#sideNav ul');
    },
    insertRssToPage: function (url) {
        $('iframe').remove();
        $("<iframe src='" + url + "'></iframe>").appendTo('#content');
    },

    removeRss: function () {
        $('#deleteList').css({'display':'block'});
        rssFunctions.getRssList();
    },

    getRssList: function () {
        $('#sideNav li a').each(function () {
            rssFunctions.rssList.array += $(this).attr('datatype');
        });
        console.log(rssFunctions.rssList.array);
        miscFunctions.calculateOddEven(rssFunctions.rssList.array,false);
    }
};

var userHandling = {
    returningUser: function () {
        var readerList = cookieHandling.readCookie('readerList');
        miscFunctions.calculateOddEven(readerList,true);

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

var domManipulation = {
    hideMenu: function () {
        $('#sideNav').animate({'left': '-100px'});
        $('#topNav').animate({'top': '-45px'});
        $('#showMenu').css({'display': 'block'});
    },

    showMenu: function () {
        $('#showMenu').css({'display': 'none'});
        $('#sideNav').animate({'left': '0px'});
        $('#topNav').animate({'top': '0px'});
    }
};

var miscFunctions = {
    calculateOddEven: function (array,called) {
        console.log(array,called)
        var odd = "";
        var even = "";
        var arrays = array.split(",");
        for (var i = 0; i < arrays.length; i++) {
            if (i % 2 == 0) {
                odd = arrays[i];
            } else {
                even = arrays[i];
            }

            if (odd.length > 0 && even.length > 0) {
                if(called == true ) {
                    rssFunctions.addRssToList(odd, even);
                } else {
                    console.log("in else")
                    $("<h4>" + odd + " " + even +"</h4>").appendTo('#deleteList');
                }
                odd = "";
                even = "";
            }
        }
    }

};

