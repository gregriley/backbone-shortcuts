(function() {
  var Shortcuts;

  Shortcuts = function(options) {
    this.cid = _.uniqueId("backbone.shortcuts");
    this.initialize.apply(this, arguments);
    return this.delegateShortcuts();
  };

  _.extend(Shortcuts.prototype, Backbone.Events, {
    initialize: function() {},
    delegateShortcuts: function() {
      var callback, match, method, scope, shortcut, shortcutKey, _ref, _results;
      if (!this.shortcuts) return;
      _ref = this.shortcuts;
      _results = [];
      for (shortcut in _ref) {
        callback = _ref[shortcut];
        if (!_.isFunction(callback)){
              method = this[callback];
            if (!method) throw new Error("Method " + callback + " does not exist");
        }
        else {
            method = callback;
        }
        match = shortcut.match(/^(\S+)\s*(.*)$/);
        shortcutKey = match[1];
        scope = match[2] === "" ? "all" : match[2];
        method = _.bind(method, this);
        _results.push(key(shortcutKey, scope, method));
      }
      return _results;
    },
    undelegateShortcuts: function() {
        if (!this.shortcuts) return;
        var _ref, shortcut, match, shortcutKey, scope;
        _ref = this.shortcuts;
        for (shortcut in _ref) {
            match = shortcut.match(/^(\S+)\s*(.*)$/);
            shortcutKey = match[1];
            scope = match[2] === "" ? "all" : match[2];
            key.unbind(shortcutKey, scope);
        }
    }
  });

  Backbone.Shortcuts = Shortcuts;

  Backbone.Shortcuts.extend = Backbone.View.extend;

}).call(this);
