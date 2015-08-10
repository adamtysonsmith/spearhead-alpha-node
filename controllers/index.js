var indexController = {
    index: function(req, res) {
        res.render('index', { pathname: req.path });
    },
    app: function(req, res) {
        res.render('app', { pathname: req.path });
    }
}

module.exports = indexController;