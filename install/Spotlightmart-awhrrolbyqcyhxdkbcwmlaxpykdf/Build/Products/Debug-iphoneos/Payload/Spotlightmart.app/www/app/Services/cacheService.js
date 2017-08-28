SpotlightmartApp.factory('CacheService', function($cacheFactory) {
    var cache=null;
    return {
        get: function(key) {
            if (cache==null)
                cache=$cacheFactory('sessionData');
            console.log("Cache returning : %o", cache.get(key));
            return cache.get(key);
        },
        put: function(key, value) {
            console.log("Saving "+key+" value "+value);
            if (cache==null)
                cache=$cacheFactory('sessionData');
            cache.put(key, value);
            console.log("Cache saved : %o", cache.get(key));
        },
        remove: function(key) {
            if (cache==null)
                return;
            cache.remove(key);    
        }/*,
        remove: functionAll() {
            if (cache==null)
                return;
            cache.removeAll();
        }*/
    }
});