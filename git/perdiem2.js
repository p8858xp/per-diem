//AJAX method with syncron
// Using .ajax to get perdiem rates
// Personal library naming convention
var Paul = {};

//perDiem class
Paul.perDiem = {
    // create a getRate method in this class
    getRate: function (year, month, zipcode) {
        var url = 'https://inventory.data.gov/api/action/datastore_search?resource_id=8ea44bc4-22ba-4386-b84c-1494ab28964b&filters={"FiscalYear":"' + year + '","Zip":"' + zipcode + '"}';
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
        $.ajax({
            dataType: "json",
            url: url,
            async: false,
            success: function (data) {
                meals = data.result.records[0].Meals;
                hotels = data.result.records[0][month];
            }
        });

        return {
            "meals": meals,
            "hotels": hotels
        };
    }
}
