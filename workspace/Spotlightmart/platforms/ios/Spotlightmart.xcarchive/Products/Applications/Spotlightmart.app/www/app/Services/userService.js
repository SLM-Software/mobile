SpotlightmartApp.factory('UserService', function(Loki) {
    var _db;
    var _user;
    
    return {
        initDB: function() {
            var adapter = new LokiCordovaFSAdapter({"prefix" : "user"});
            _db = new Loki('userDB',
                            {
                                autosave: true,
                                autosaveInterval: 1000, // 1 sec
                                adapter: adapter
                            });
        },
        getUser: function() {
            var option = {};
            
            _db.loadDatabase(option, function() {
                _user = _db.getCollection('user');
                
                if (!_user)
                {
                    _user = _db.addCollection('user');
                }
                
                return _user.data;
            });
        },
        addUser: function(user) {
            _user.insert(user);
        }/*,
        remove: functionAll() {
            if (cache==null)
                return;
            cache.removeAll();
        }*/
    }
});