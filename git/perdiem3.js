// Plain JavaScript method 
// async: false

var Paul = {};

//perDiem class
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
        var meals;
        var hotels;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://inventory.data.gov/api/action/datastore_search?resource_id=8ea44bc4-22ba-4386-b84c-	1494ab28964b&filters={"FiscalYear":"' + year + '","Zip":"' + zipcode + '"}', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = xhr.responseText;
                var perdiemdata = JSON.parse(response);
                meals = perdiemdata.result.records[0].Meals;
                hotels = perdiemdata.result.records[0][month];
            }
        };
        xhr.send();
        return {
            "meals": meals,
            "hotels": hotels
        };
    }
}
//implementation example
var r = Paul.perDiem.getRate(2017, 1, 91206);
console.log(r.meals);
console.log(r.hotels);