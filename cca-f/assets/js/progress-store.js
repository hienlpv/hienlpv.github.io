// Tiny localStorage wrapper used to remember study progress between visits.
// Every call is wrapped in try/catch: storage can be blocked (private mode, disabled cookies)
// and the site must keep working without it.
(function(){
  var PREFIX = 'cca-f-';

  window.ccafStore = {
    get: function(key){
      try{
        var raw = localStorage.getItem(PREFIX + key);
        return raw ? JSON.parse(raw) : null;
      }catch(e){ return null; }
    },
    set: function(key, value){
      try{ localStorage.setItem(PREFIX + key, JSON.stringify(value)); }catch(e){}
    },
    remove: function(key){
      try{ localStorage.removeItem(PREFIX + key); }catch(e){}
    }
  };
})();
