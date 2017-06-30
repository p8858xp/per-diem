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

    $.ajax({
        dataType: "json",
        url: url,
        async: false,
        success: function (data) {
            var meals = data.result.records[0].Meals;
            var hotels = data.result.records[0][month];

            return {
                "meals": meals,
                "hotels": hotels
            };
        }
    });
    return {
        "meals": '',
        "hotels": ''
    };
}
