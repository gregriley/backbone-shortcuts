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
        match = shortcut.match(/^(.*?)\s*(<.*>)?$/);
        shortcutKey = match[1];
        scope = typeof match[2] === 'undefined' ? "all" : match[2].replace('>', '').replace('<', '');

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
            match = shortcut.match(/^(.*?)\s*(<.*>)?$/);
            shortcutKey = match[1];
            scope = typeof match[2] === 'undefined' ? "all" : match[2];

            shortcutKey = shortcutKey.replace(/\s/g,'');
            var keys = shortcutKey.split(',');
            for (i = 0; i < keys.length; i++) {
                key.unbind(keys[i], scope);
            }
        }
    }
  });

  Backbone.Shortcuts = Shortcuts;

  Backbone.Shortcuts.extend = Backbone.View.extend;

}).call(this);
