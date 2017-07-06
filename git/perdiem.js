//Promised Pattern method
var Paul = {};

Paul.perDiem = {
    getRate: function (year, month, zipcode) {
        var monthObj = {
            '1': 'Jan',
            '2': 'Feb',
            '3': 'Mar',
            '4': 'Apr',
            '5': 'May',
            '6': 'Jun',
            '7': 'Jul',
            '8': 'Aug',
            '9': 'Sep',
            '10': 'Oct',
            '11': 'Nov',
            '12': 'Dec'
        };
        month = monthObj[month];
        var deferred = new $.Deferred();
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'https://inventory.data.gov/api/action/datastore_search?resource_id=8ea44bc4-22ba-4386-b84c-1494ab28964b&filters=			         {"FiscalYear":"' + year + '","Zip":"' + zipcode + '"}', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var data = JSON.parse(xhr.responseText);
                    var meals = data.result.records[0].Meals;
                    hotels = data.result.records[0][month];
                    deferred.resolve({
                        'meals': meals,
                        'hotels': hotels
                    });
                } else {
                    deferred.reject("status=" + status);
                }
            };
        }
        xhr.send();
        return deferred.promise();
    }
};
Paul.perDiem.getRate(2017, 1, 91206).then(function (data) {
    console.log(data.meals);
    console.log(data.hotels);
}, function (error) {
    console.log(error);
});



// different method using Promise
/*
var Paul = {};

Paul.perDiem = {
    getRate: function (year, month, zipcode) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", 'https://inventory.data.gov/api/action/datastore_search?resource_id=8ea44bc4-22ba-4386-b84c-1494ab28964b&filters=			         {"FiscalYear":"' + year + '","Zip":"' + zipcode + '"}', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } else {
                        reject(xhr.statusText);
                    }
                }
            };
            xhr.send();
        });
    }
}

var promise = Paul.perDiem.getRate(2017, 1, 91206);
promise.then(function (perdiem) {
    console.log(perdiem.result.records[0].Meals);
    console.log(perdiem.result.records[0].Jan);
}).catch(function (error) {
    console.log(error);
});
*/
