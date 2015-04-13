/**
 * Created by Ago Ahas on 06/04/2015.
 */
$(document).ready(function() {
    if (cookieHandling.readCookie('readerList')) {
        userHandling.returningUser();
    }
});

var rssFunctions = {
    rssProto: {},
    rssList: {array: []},
    addRss: function() {

        askRss();
        function askRss() {
            var url = rssFunctions.rssProto.URL = prompt("Please insert a RSS feed URL");
            var name = rssFunctions.rssProto.name = prompt("Please give a name for that RSS Feed");

            if (url == "" || name == "" || url == null || name == null) {
                alert("You have either entered an empty value to URL or the Name of RSS Feed");
            } else {
                rssFunctions.addRssToList(url, name);
                cookieHandling.addToArray(url, name);
            }
        }
    },

    addRssToList: function(val1, val2) {
        val1 = '"' + val1 + '"';
        $("<li><a datatype='" + val1 + "," + val2 + "," + "' onclick='rssFunctions.insertRssToPage(" + val1 + ")'> " + val2 + "</a></li>").appendTo('#sideNav ul');
    },
    insertRssToPage: function(url) {
        $('iframe').remove();
        $("<iframe src='" + url + "'></iframe>").appendTo('#content');
    },
    showRemoveRssArea: function() {
        if ($('#deleteListContainer').is(":visible")) {
            $('#deleteListContainer').hide();
            $('#deleteList').find('ul').empty();
        } else {
            $('#deleteListContainer').show();
            rssFunctions.getRssList();
            miscFunctions.calculateOddEven(rssFunctions.rssList.array, false);
        }
    },
    //shows that it is not used, but added as an onclick with jQuery.
    removeRssPage: function(element) {
        $('#sideNav').find('li a').each(function() {
            if ($(this).attr('datatype') == $(element).attr('datatype')) {
                $(element).parent().remove();
                $(this).parent().remove();
            }
        });
    },
    getRssList: function() {
        rssFunctions.rssList.array = [];
        $('#sideNav').find('li a').each(function() {
            rssFunctions.rssList.array += $(this).attr('datatype');
        });
        return rssFunctions.rssList.array;
    },
    saveDeletedList: function() {
        rssFunctions.getRssList();
        cookieHandling.userInfoArray = rssFunctions.rssList.array;
        cookieHandling.addCookie(false);
    },
    saveAddedList: function() {
        cookieHandling.addCookie(true);
    }
};

var userHandling = {
    returningUser: function() {
        var readerList = cookieHandling.readCookie('readerList');
        miscFunctions.calculateOddEven(readerList, true);

    }
};

var cookieHandling = {
    userInfoArray: [],
    addToArray: function(url, name) {
        cookieHandling.userInfoArray.push(url, name);
        console.log(cookieHandling.userInfoArray);
    },
    addCookie: function(param) {

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

        if (param == true) {
            if (cookieHandling.readCookie('readerList')) {
                var existingList = cookieHandling.readCookie('readerList');
                if (existingList != cookieHandling.userInfoArray.toString()) {
                    createCookie("readerList", existingList + "," + cookieHandling.userInfoArray, 9999);
                }
            } else {
                createCookie("readerList", cookieHandling.userInfoArray, 9999);
            }
        } else {
            createCookie("readerList", cookieHandling.userInfoArray, 9999);
        }
    },

    readCookie: function(name) {
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
    hideMenu: function() {
        $('#sideNav').animate({'left': '-100px'});
        $('#topNav').animate({'top': '-45px'});
        $('#showMenu').css({'display': 'block'});
    },

    showMenu: function() {
        $('#showMenu').css({'display': 'none'});
        $('#sideNav').animate({'left': '0px'});
        $('#topNav').animate({'top': '0px'});
    }
};

var miscFunctions = {
    calculateOddEven: function(array, called) {
        var url = "";
        var name = "";
        var arrays = array.split(",");
        for (var i = 0; i < arrays.length; i++) {
            if (i % 2 == 0) {
                url = arrays[i];
            } else {
                name = arrays[i];
            }
            if (url.length > 0 && name.length > 0) {
                if (called == true) {
                    rssFunctions.addRssToList(url, name);
                } else {
                    $("<li style='text-align: left' class='itemForDeletion'><h4 >Name: " + name + " " + "URL: " + url + "</h4><a datatype='" + url + "," + "" + name + "," + "' onclick='rssFunctions.removeRssPage($(this))' style='color:red;text-decoration: underline'>Remove</a></li>").appendTo('#deleteList ul');
                }
                url = "";
                name = "";
            }
        }
    }

};

