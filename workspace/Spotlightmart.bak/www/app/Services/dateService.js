CT6App.factory('dateService', function($q,$window) {
    return {
        getStartWeeks: function () {
            // Get the monday of this week
            var today = new Date();
            var todayWeekday = today.getDay();
            var arrStartWeeks = [];
            var diff = today.getDate() - todayWeekday + (todayWeekday==0?-7:1);
            var startDate = new Date(today.setDate(diff));

            // Put the next 52 monday into the array
            arrStartWeeks.push({id:1, date:startDate.toDateString()});
            
            for (var i=2; i<54; i++) {
                startDate = new Date(startDate.setDate(startDate.getDate() + 7));
                arrStartWeeks.push({id:i, date:startDate.toDateString()});
            }

            console.log("Returning %o", arrStartWeeks);
            return arrStartWeeks;
        }
    }
});
