// Class Helper Functions
module.exports = {
    getTimestamp: function() {
        // YYYY-MM-DD_HH:MM:SS
        function format(n) {
            return n < 10 ? '0' + n
                          : ''  + n;
        }
        function formatMonth(m) {
            return parseInt(m, 10) + 1;
        }

        var date = new Date();
        var year = date.getFullYear();
        var month = format(formatMonth(date.getMonth()));
        var day = format(date.getDate());
        var hours = format(date.getHours());
        var minutes = format(date.getMinutes());
        var seconds = format(date.getSeconds());
        var time = hours + ':' + minutes + ':' + seconds;

        return year + '-' + month + '-' + day + '_' + time;
    },
    
    getDuration: function() {
        return 'The duration is X';
    },
    
    getDueDate: function() {
        return 'The due date is X';
    }
    
}