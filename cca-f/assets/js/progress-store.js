// Tiny localStorage wrapper used to remember study progress between visits.
// Every call is wrapped in try/catch: storage can be blocked (private mode, disabled cookies)
// and the site must keep working without it.
(function(){
  var PREFIX = 'cca-f-';

  // The sections that make up "progress" (what export/import moves between browsers).
  var PROGRESS_KEYS = ['checklist', 'quiz-1', 'quiz-interactive', 'practice-exam'];

  window.ccafStore = {
    exportAll: function(){
      var data = {};
      PROGRESS_KEYS.forEach(function(key){
        var value = window.ccafStore.get(key);
        if(value !== null) data[key] = value;
      });
      return { app: 'cca-f', version: 1, exportedAt: new Date().toISOString(), data: data };
    },
    // Replaces the sections present in an exported file; returns how many were imported,
    // or -1 when the payload is not a cca-f export. The pages validate each section again on load.
    importAll: function(payload){
      if(!payload || payload.app !== 'cca-f' || !payload.data || typeof payload.data !== 'object') return -1;
      var count = 0;
      PROGRESS_KEYS.forEach(function(key){
        var value = payload.data[key];
        var valid = key === 'checklist'
          ? Array.isArray(value)
          : !!value && typeof value === 'object' && !Array.isArray(value);
        if(valid){ window.ccafStore.set(key, value); count++; }
      });
      return count;
    },
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
