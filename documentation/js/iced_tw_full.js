// Generated by IcedCoffeeScript 1.2.0e
var f_list, food, msg, parallelSearch, rankPopularity, search, tweets, w_list, weather, __iced_deferrals,
  _this = this;

__iced_k = function() {};

search = function(keyword, cb) {
  var host, json, url, __iced_deferrals,
    _this = this;
  host = "http://search.twitter.com/";
  url = "" + host + "/search.json?q=" + keyword + "&callback=?";
  (function(__iced_k) {
    __iced_deferrals = new iced.Deferrals(__iced_k);
    $.getJSON(url, __iced_deferrals.defer({
      assign_fn: (function() {
        return function() {
          return json = arguments[0];
        };
      })()
    }));
    __iced_deferrals._fulfill();
  })(function() {
    return cb(json.results);
  });
};

parallelSearch = function(keywords, cb) {
  var i, k, out, __iced_deferrals,
    _this = this;
  out = [];
  (function(__iced_k) {
    var _i, _len;
    __iced_deferrals = new iced.Deferrals(__iced_k);
    for (i = _i = 0, _len = keywords.length; _i < _len; i = ++_i) {
      k = keywords[i];
      search(k, __iced_deferrals.defer({
        assign_fn: (function(__slot_1, __slot_2) {
          return function() {
            return __slot_1[__slot_2] = arguments[0];
          };
        })(out, i)
      }));
    }
    __iced_deferrals._fulfill();
  })(function() {
    return cb(out);
  });
};

rankPopularity = function(keywords, cb) {
  var i, last, r, results, times, tuple, __iced_deferrals,
    _this = this;
  (function(__iced_k) {
    __iced_deferrals = new iced.Deferrals(__iced_k);
    parallelSearch(keywords, __iced_deferrals.defer({
      assign_fn: (function() {
        return function() {
          return results = arguments[0];
        };
      })()
    }));
    __iced_deferrals._fulfill();
  })(function() {
    times = (function() {
      var _i, _len, _results;
      _results = [];
      for (i = _i = 0, _len = results.length; _i < _len; i = ++_i) {
        r = results[i];
        last = r[r.length - 1];
        _results.push([(new Date(last.created_at)).getTime(), i]);
      }
      return _results;
    })();
    times = times.sort(function(a, b) {
      return b[0] - a[0];
    });
    return cb((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = times.length; _i < _len; _i++) {
        tuple = times[_i];
        _results.push(keywords[tuple[1]]);
      }
      return _results;
    })());
  });
};

w_list = ["sun", "rain", "snow", "sleet"];

f_list = ["tacos", "burritos", "pizza", "shrooms"];

(function(__iced_k) {
  __iced_deferrals = new iced.Deferrals(__iced_k);
  rankPopularity(w_list, __iced_deferrals.defer({
    assign_fn: (function() {
      return function() {
        return weather = arguments[0];
      };
    })()
  }));
  rankPopularity(f_list, __iced_deferrals.defer({
    assign_fn: (function() {
      return function() {
        return food = arguments[0];
      };
    })()
  }));
  __iced_deferrals._fulfill();
})(function() {
  (function(__iced_k) {
    if (weather.length && food.length) {
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k);
        search("" + weather[0] + "+" + food[0], __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return tweets = arguments[0];
            };
          })()
        }));
        __iced_deferrals._fulfill();
      })(function() {
        var _ref;
        return __iced_k(msg = (_ref = tweets[0]) != null ? _ref.text : void 0);
      });
    } else {
      return __iced_k();
    }
  })(function() {
    return alert(typeof msg !== "undefined" && msg !== null ? msg : "<nothing found>");
  });
});