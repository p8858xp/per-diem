/*

rate(2017, 1, 91206).then(function (data) {
    console.log(data);
    console.log(data.meals);
    console.log(data.hotels);

}, function (error) {
});

*/
var Paul = {};

Paul.perDiem = function rate(year, month, zipcode) {
    var url = 'https://inventory.data.gov/api/action/datastore_search?resource_id=8ea44bc4-22ba-4386-b84c-1494ab28964b&filters={"FiscalYear":"' + year + '","Zip":"' + zipcode + '"}';

    var monthObj = {
        1: 'Jan',
        2: 'Feb',
    };
    
    month = monthObj[month];

    var deferred = new $.Deferred();

    $.getJSON(url, function (data) {
        var meals = data.result.records[0].Meals;
        var hotels = data.result.records[0][month];

        //switch (month) {
        //    case 1:
        //        hotels = data.result.records[0].Jan;
        //        break;
        //    case 2:
        //        hotels = data.result.records[0].Feb;
        //        break;
        //    case 3:
        //        hotels = data.result.records[0].Mar;
        //        break;
        //    case 4:
        //        hotels = data.result.records[0].Apr;
        //        break;
        //    case 5:
        //        hotels = data.result.records[0].May;
        //        break;
        //    case 6:
        //        hotels = data.result.records[0].Jun;
        //        break;
        //    case 7:
        //        hotels = data.result.records[0].Jul;
        //        break;
        //    case 8:
        //        hotels = data.result.records[0].Aug;
        //        break;
        //    case 9:
        //        hotels = data.result.records[0].Sep;
        //        break;
        //    case 10:
        //        hotels = data.result.records[0].Oct;
        //        break;
        //    case 11:
        //        hotels = data.result.records[0].Nov;
        //        break;
        //    case 12:
        //        hotels = data.result.records[0].Dec;
        //}

        deferred.resolve({
            "meals": meals,
            "hotels": hotels
        });
    });

    return deferred.promise();
}
