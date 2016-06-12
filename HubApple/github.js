function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0,
        n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n
    }
    return Array.from(e)
}
function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0,
        n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n
    }
    return Array.from(e)
}
function _classCallCheck(e, t) {
    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0,
        n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n
    }
    return Array.from(e)
}
top !== window && (alert("For security reasons, framing is not allowed."), top.location.replace(document.location)),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSuccess", ".js-ajax-pagination",
    function(t, n, i, r) {
        this.replaceWith.apply(this, e.parseHTML(r))
    })
} (),
function() {
    var e, t, n, i, r = require("github/jquery")["default"];
    t = require("github/inspect")["default"],
    n = require("github/failbot").reportError,
    e = function(e) {
        return Error.call(this),
        Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack,
        this.name = "DataRemoteError",
        this.message = e
    },
    e.prototype = new Error,
    e.prototype.constructor = e,
    i = function() {
        return r("#ajax-error-message").show(function() {
            return r(this).addClass("visible")
        })
    },
    r(document).on("ajaxError", "[data-remote]",
    function(r, s, o, a) {
        var u, c, l, d, h, f;
        if (this === r.target && "abort" !== a && "canceled" !== a) {
            if (c = "." + this.className.split(" ").sort().join("."), u = new e(a + " (" + s.status + ") from " + c), n(u, {
                dataRemote: {
                    target: t(this),
                    method: null != (l = this.getAttribute("method")) ? l: "GET",
                    url: null != (d = null != (h = this.href) ? h: this.action) ? d: window.location.href,
                    dataType: null != (f = this.getAttribute("data-type")) ? f: "intelligent guess"
                }
            }), /<html/.test(s.responseText)) throw i(),
            r.stopImmediatePropagation(),
            u;
            return setTimeout(function() {
                if (!r.isDefaultPrevented()) throw i(),
                u
            },
            0)
        }
    }),
    r(document).on("ajaxSend", "[data-remote]",
    function() {
        return r("#ajax-error-message").hide().removeClass("visible")
    }),
    r(document).on("click", ".js-ajax-error-dismiss",
    function() {
        return r("#ajax-error-message").hide().removeClass("visible"),
        !1
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSend", "[data-remote]",
    function(t) {
        return this !== t.target || t.isDefaultPrevented() ? void 0 : e(this).addClass("loading")
    }),
    e(document).on("ajaxComplete", "[data-remote]",
    function(t) {
        return this === t.target ? e(this).removeClass("loading") : void 0
    })
}.call(this),
function() {
    var e, t, n, i = {}.hasOwnProperty,
    r = [].slice;
    n = function(e) {
        return console && console.warn ? console.warn(e) : void 0
    },
    e = {
        host: "collector.githubapp.com",
        type: "page_view",
        dimensions: {},
        measures: {},
        context: {},
        actor: {},
        image: new Image,
        performance: {},
        expectedPerformanceTimingKeys: ["connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart"],
        recordPageView: function() {
            return this.applyMetaTags(),
            null == this.app ? !1 : null == this.host ? (n("Host not set, you are doing something wrong"), !1) : (this.image.src = this._src(), this._clearPerformance(), !0)
        },
        setHost: function(e) {
            return this.host = e
        },
        setApp: function(e) {
            return this.app = e
        },
        setDimensions: function(e) {
            return this.dimensions = e
        },
        addDimensions: function(e) {
            var t, n, r;
            null == this.dimensions && (this.dimensions = {}),
            n = [];
            for (t in e) i.call(e, t) && (r = e[t], n.push(this.dimensions[t] = r));
            return n
        },
        setMeasures: function(e) {
            return this.measures = e
        },
        addMeasures: function(e) {
            var t, n, r;
            null == this.measures && (this.measures = {}),
            n = [];
            for (t in e) i.call(e, t) && (r = e[t], n.push(this.measures[t] = r));
            return n
        },
        setContext: function(e) {
            return this.context = e
        },
        addContext: function(e) {
            var t, n, r;
            null == this.context && (this.context = {}),
            n = [];
            for (t in e) i.call(e, t) && (r = e[t], n.push(this.context[t] = r));
            return n
        },
        setActor: function(e) {
            return this.actor = e
        },
        push: function(e) {
            return this.applyCall(e)
        },
        enablePerformance: function() {
            return this.performance = this._performanceTiming()
        },
        _recordSrc: function(e, t, n, i) {
            return "//" + this.host + "/" + this.app + "/" + e + "?" + this._queryString(t, n, i)
        },
        _src: function() {
            return "//" + this.host + "/" + this.app + "/" + this.type + "?" + this._queryString()
        },
        _queryString: function(e, t, n) {
            var i, r, s;
            return r = function() {
                var e, t;
                e = this._params(),
                t = [];
                for (i in e) s = e[i],
                t.push("dimensions[" + i + "]=" + s);
                return t
            }.call(this),
            r.push(this._encodeObject("dimensions", this._merge(this.dimensions, e))),
            r.push(this._encodeObject("measures", this._merge(this.measures, t))),
            null != this.performance && r.push(this._encodeObject("measures", {
                performance_timing: this.performance
            })),
            r.push(this._encodeObject("context", this._merge(this.context, n))),
            r.push(this._actor()),
            r.push(this._encodeObject("dimensions", {
                cid: this._clientId()
            })),
            r.join("&")
        },
        _clearPerformance: function() {
            return this.performance = null
        },
        _performanceTiming: function() {
            var e, t, n, i, r, s, o, a, u, c, l, d, h;
            if (null == (null != (o = window.performance) && null != (a = o.timing) ? a.navigationStart: void 0)) return null;
            for (l = {},
            u = this.expectedPerformanceTimingKeys, t = 0, i = u.length; i > t; t++) n = u[t],
            l[n] = null != (c = window.performance.timing[n]) ? c: 0;
            h = 1,
            s = [],
            e = l.navigationStart;
            for (n in l) d = l[n],
            r = 0 === d ? null: d - e,
            s.push(r);
            return h + "-" + s.join("-")
        },
        _params: function() {
            return {
                page: this._encode(this._page()),
                title: this._encode(this._title()),
                referrer: this._encode(this._referrer()),
                user_agent: this._encode(this._agent()),
                screen_resolution: this._encode(this._screenResolution()),
                pixel_ratio: this._encode(this._pixelRatio()),
                browser_resolution: this._encode(this._browserResolution()),
                tz_seconds: this._encode(this._tzSeconds()),
                timestamp: (new Date).getTime()
            }
        },
        _page: function() {
            try {
                return document.location.href
            } catch(e) {}
        },
        _title: function() {
            try {
                return document.title
            } catch(e) {}
        },
        _referrer: function() {
            var e;
            e = "";
            try {
                e = window.top.document.referrer
            } catch(t) {
                if (window.parent) try {
                    e = window.parent.document.referrer
                } catch(t) {}
            }
            return "" === e && (e = document.referrer),
            e
        },
        _agent: function() {
            try {
                return navigator.userAgent
            } catch(e) {}
        },
        _screenResolution: function() {
            try {
                return screen.width + "x" + screen.height
            } catch(e) {
                return "unknown"
            }
        },
        _pixelRatio: function() {
            return window.devicePixelRatio
        },
        _browserResolution: function() {
            var e, t, n, i;
            try {
                return i = 0,
                e = 0,
                "number" == typeof window.innerWidth ? (i = window.innerWidth, e = window.innerHeight) : null != (null != (t = document.documentElement) ? t.clientWidth: void 0) ? (i = document.documentElement.clientWidth, e = document.documentElement.clientHeight) : null != (null != (n = document.body) ? n.clientWidth: void 0) && (i = document.body.clientWidth, e = document.body.clientHeight),
                i + "x" + e
            } catch(r) {
                return "unknown"
            }
        },
        _tzSeconds: function() {
            try {
                return - 60 * (new Date).getTimezoneOffset()
            } catch(e) {
                return ""
            }
        },
        _merge: function() {
            var e, t, n, i, s, o, a;
            for (o = 1 <= arguments.length ? r.call(arguments, 0) : [], i = {},
            e = 0, n = o.length; n > e; e++) {
                s = o[e];
                for (t in s) a = s[t],
                i[t] = a
            }
            return i
        },
        _encodeObject: function(e, t) {
            var n, i, r, s, o;
            if (s = [], null != Array.isArray && Array.isArray(t) || "[object Array]" === Object.prototype.toString.call(t)) for (i = 0, r = t.length; r > i; i++) n = t[i],
            s.push(this._encodeObject(e + "[]", n));
            else if (t === Object(t)) for (o in t) s.push(this._encodeObject(e + "[" + o + "]", t[o]));
            else s.push(e + "=" + this._encode(t));
            return s.join("&")
        },
        _actor: function() {
            var e, t, n, i, r, s, o, a;
            t = [],
            o = this.actor;
            for (r in o) if (a = o[r], e = "dimensions[actor_" + r + "]", a.join) for (i = 0, s = a.length; s > i; i++) n = a[i],
            t.push(e + "[]=" + this._encode(n));
            else t.push(e + "=" + this._encode(a));
            return t.join("&")
        },
        _getCookie: function(e) {
            var t, n, i, r, s, o, a, u;
            for (o = [], s = document.cookie.split(";"), n = 0, r = s.length; r > n; n++) t = s[n],
            a = t.trim().split("="),
            a.length < 2 || (i = a[0], u = a[1], i === e && o.push({
                key: i,
                value: u
            }));
            return o
        },
        _clientId: function() {
            var e;
            return e = this._getClientId(),
            "" === e && (e = this._setClientId()),
            e
        },
        _getClientId: function() {
            var e, t, n, i, r, s, o, a, u;
            for (i = this._getCookie("_octo"), t = [], s = 0, o = i.length; o > s; s++) n = i[s],
            a = n.value.split("."),
            r = a.shift(),
            "GH1" === r && a.length > 1 && (u = a.shift().split("-"), 1 === u.length && (u[1] = "1"), u[0] *= 1, u[1] *= 1, e = a.join("."), t.push([u, e]));
            return e = "",
            t.length > 0 && (e = t.sort().reverse()[0][1]),
            e
        },
        _setClientId: function() {
            var e, t, n, i, r;
            return r = (new Date).getTime(),
            e = Math.round(Math.random() * (Math.pow(2, 31) - 1)) + "." + Math.round(r / 1e3),
            t = "GH1.1." + e,
            i = new Date(r + 63072e6).toGMTString(),
            n = "." + document.domain.split(".").reverse().slice(0, 2).reverse().join("."),
            document.cookie = "_octo=" + t + "; expires=" + i + "; path=/; domain=" + n,
            e
        },
        _encode: function(e) {
            return null != e ? window.encodeURIComponent(e) : ""
        },
        applyQueuedCalls: function(e) {
            var t, n, i, r;
            for (r = [], n = 0, i = e.length; i > n; n++) t = e[n],
            r.push(this.applyCall(t));
            return r
        },
        applyCall: function(e) {
            var t, i;
            return i = e[0],
            t = e.slice(1),
            this[i] ? this[i].apply(this, t) : n(i + " is not a valid method")
        },
        applyMetaTags: function() {
            var e;
            return e = this.loadMetaTags(),
            e.host && this.setHost(e.host),
            e.app && this.setApp(e.app),
            this._objectIsEmpty(e.actor) || this.setActor(e.actor),
            this.addDimensions(e.dimensions),
            this.addMeasures(e.measures),
            this.addContext(e.context)
        },
        loadMetaTags: function() {
            var e, t, n, i, r;
            for (r = {
                dimensions: {},
                measures: {},
                context: {},
                actor: {}
            },
            i = document.getElementsByTagName("meta"), e = 0, t = i.length; t > e; e++) if (n = i[e], n.name && n.content) {
                var s = n.name.match(this.octolyticsMetaTagName);
                if (s) switch (s[1]) {
                case "host":
                    r.host = n.content;
                    break;
                case "app-id":
                    r.app = n.content;
                    break;
                case "app":
                    r.app = n.content;
                    break;
                case "dimension":
                    this._addField(r.dimensions, s[2], n);
                    break;
                case "measure":
                    this._addField(r.measures, s[2], n);
                    break;
                case "context":
                    this._addField(r.context, s[2], n);
                    break;
                case "actor":
                    this._addField(r.actor, s[2], n)
                }
            }
            return r
        },
        _addField: function(e, t, n) {
            return n.attributes["data-array"] ? (null == e[t] && (e[t] = []), e[t].push(n.content)) : e[t] = n.content
        },
        _objectIsEmpty: function(e) {
            var t;
            for (t in e) if (i.call(e, t)) return ! 1;
            return ! 0
        },
        octolyticsMetaTagName: /^octolytics-(host|app-id|app|dimension|measure|context|actor)-?(.*)/
    },
    window._octo ? window._octo.slice && (t = window._octo.slice(0), window._octo = e, window._octo.applyQueuedCalls(t)) : window._octo = e
}.call(this),
function() {
    var e = require("github/document-ready"),
    t = e.ready;
    t.then(function() {
        _octo.push(["enablePerformance"]),
        _octo.push(["recordPageView"])
    }),
    document.addEventListener("pjax:complete",
    function() {
        _octo.push(["recordPageView"])
    })
} (),
function() {
    var e, t, n, i, r, s, o, a, u, c = require("github/jquery")["default"],
    l = require("github/visible")["default"];
    e = require("github/sliding-promise-queue")["default"],
    r = require("delegated-events").fire,
    i = require("github/fetch").fetchText,
    a = new WeakMap,
    o = new WeakMap,
    s = function(t, n) {
        var r, s;
        return (r = a.get(t)) || (r = new e, a.set(t, r)),
        n.value.trim() ? (n.authenticity_token = null != (s = t.form.elements.authenticity_token) ? s.value: void 0, r.push(i(t.getAttribute("data-autocheck-url"), {
            method: "post",
            body: c.param(n),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }))) : Promise.reject(new Error("empty"))
    },
    n = function(e) {
        return u(e),
        e.classList.add("errored"),
        c(e).find("p.note").hide()
    },
    u = function(e) {
        return e.classList.remove("errored"),
        e.classList.remove("warn"),
        c(e).find("p.note").show(),
        c(e).find("dd.error").remove(),
        c(e).find("dd.warning").remove()
    },
    t = function(e) {
        var t, i, a, d, h, f, m;
        return t = c(e),
        a = {
            value: e.value
        },
        r(e, "autocheck:send", a),
        d = c.param(a).split("&").sort().join("&"),
        d !== o.get(e) ? (o.set(e, d), t.closest("dl.form-group").removeClass("errored successed"), e.classList.remove("is-autocheck-successful", "is-autocheck-errored"), m = function(n) {
            return e.classList.toggle("is-autocheck-loading", n),
            t.closest("dl.form-group").toggleClass("is-loading", n)
        },
        i = function() {
            return m(!1),
            r(e, "autocheck:complete")
        },
        h = function(t) {
            var n;
            return e.classList.add("is-autocheck-successful"),
            n = e.closest("dl.form-group"),
            u(n),
            n.classList.add("successed"),
            r(e, "autocheck:success", t),
            i()
        },
        f = function(t) {
            var s, o, a;
            return s = e.closest("dl.form-group"),
            "empty" === t.message ? u(s) : l(e) && (e.classList.add("is-autocheck-errored"), o = (null != (a = t.response) ? a.text() : void 0) || Promise.resolve("Something went wrong"), o.then(function(i) {
                var o, a;
                return /<html/.test(i) && (i = "Something went wrong."),
                n(s),
                o = document.createElement("dd"),
                o.classList.add("error"),
                (null != (a = t.response) ? a.headers.get("Content-Type").match("text/html") : void 0) ? o.innerHTML = i: o.textContent = i,
                s.append(o),
                r(e, "autocheck:error")
            })),
            i()
        },
        m(!0), s(e, a).then(h, f)) : void 0
    },
    c(document).on("change", "input[data-autocheck-url]",
    function() {
        t(this)
    }),
    c(document).onFocusedInput("input[data-autocheck-url]",
    function(e) {
        return this.getAttribute("data-throttle-wait") || this.setAttribute("data-throttle-wait", 300),
        c(this).on("throttled:input." + e,
        function() {
            t(this)
        }),
        !1
    })
}.call(this),
function() {
    var e, t, n, i, r = require("github/jquery")["default"],
    s = require("github/visible")["default"],
    o = require("github/observe"),
    a = o.observe,
    u = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    };
    t = require("github/sliding-promise-queue")["default"],
    i = require("github/fetch").fetchText,
    e = function() {
        function e() {
            this.onNavigationOpen = u(this.onNavigationOpen, this),
            this.onNavigationKeyDown = u(this.onNavigationKeyDown, this),
            this.onInputChange = u(this.onInputChange, this),
            this.onResultsMouseDown = u(this.onResultsMouseDown, this),
            this.onInputBlur = u(this.onInputBlur, this),
            this.onInputFocus = u(this.onInputFocus, this),
            this.focusedInput = this.focusedResults = null,
            this.mouseDown = !1,
            this.fetchQueue = new t
        }
        return e.prototype.bindEvents = function(e, t) {
            return r(e).on("blur", this.onInputBlur),
            r(e).on("throttled:input", this.onInputChange),
            r(t).on("mousedown", this.onResultsMouseDown),
            r(t).on("navigation:open", "[data-autocomplete-value]", this.onNavigationOpen),
            r(t).on("navigation:keydown", "[data-autocomplete-value]", this.onNavigationKeyDown)
        },
        e.prototype.unbindEvents = function(e, t) {
            return r(e).off("blur", this.onInputBlur),
            r(e).off("throttled:input", this.onInputChange),
            r(t).off("mousedown", this.onResultsMouseDown),
            r(t).off("navigation:open", "[data-autocomplete-value]", this.onNavigationOpen),
            r(t).off("navigation:keydown", "[data-autocomplete-value]", this.onNavigationKeyDown)
        },
        e.prototype.onInputFocus = function(e) {
            var t, n;
            t = r(e).closest(".js-autocomplete-container"),
            n = t.find(".js-autocomplete")[0],
            this.focusedInput = e,
            this.focusedResults = n,
            this.bindEvents(e, n),
            r(e).attr("autocomplete", "off"),
            r(e).trigger("autocomplete:focus"),
            this.fetchResults(e.value)
        },
        e.prototype.onInputBlur = function() {
            var e, t;
            e = this.focusedInput,
            t = this.focusedResults,
            this.mouseDown || (this.hideResults(), this.inputValue = null, this.focusedInput = this.focusedResults = null, this.unbindEvents(e, t), r(e).trigger("autocomplete:blur"))
        },
        e.prototype.onResultsMouseDown = function() {
            var e;
            this.mouseDown = !0,
            e = function(t) {
                return function() {
                    return t.mouseDown = !1,
                    r(document).off("mouseup", e)
                }
            } (this),
            r(document).on("mouseup", e)
        },
        e.prototype.onInputChange = function(e) {
            var t;
            t = e.currentTarget,
            this.inputValue !== t.value && (r(t).removeData("autocompleted"), r(t).trigger("autocomplete:autocompleted:changed")),
            this.fetchResults(t.value)
        },
        e.prototype.fetchResults = function(e) {
            var t, n, s, o = this.focusedResults.getAttribute("data-search-url");
            return o ? (t = r(this.focusedInput).closest(".js-autocomplete-container"), s = e.trim() ? (o += ~o.indexOf("?") ? "&": "?", o += "q=" + encodeURIComponent(e), t.addClass("is-sending"), i(o)) : r(this.focusedResults).find("[data-autocomplete-value]").length > 0 ? this.showResults() : Promise.resolve(""), n = function() {
                return t.removeClass("is-sending")
            },
            this.fetchQueue.push(s).then(function(t) {
                return function(n) {
                    return r(t.focusedResults).find(".js-autocomplete-results").html(n),
                    t.onResultsChange(e)
                }
            } (this)).then(n, n)) : void 0
        },
        e.prototype.onResultsChange = function(e) {
            var t;
            t = r(this.focusedResults).find("[data-autocomplete-value]"),
            0 === t.length ? this.hideResults() : this.inputValue !== e && (this.inputValue = e, this.showResults(), r(this.focusedInput).is("[data-autocomplete-autofocus]") && r(this.focusedResults).find(".js-navigation-container").navigation("focus"))
        },
        e.prototype.onNavigationKeyDown = function(e) {
            switch (e.hotkey) {
            case "tab":
                return this.onNavigationOpen(e),
                !1;
            case "esc":
                return this.hideResults(),
                !1
            }
        },
        e.prototype.onNavigationOpen = function(e) {
            var t, n;
            t = e.currentTarget,
            t.classList.contains("disabled") || (n = r(t).attr("data-autocomplete-value"), this.inputValue = n, r(this.focusedInput).val(n), r(this.focusedInput).data("autocompleted", n), r(this.focusedInput).trigger("autocomplete:autocompleted:changed", [n]), r(this.focusedInput).trigger("autocomplete:result", [n]), r(t).removeClass("active"), this.focusedInput === document.activeElement ? this.hideResults() : this.onInputBlur())
        },
        e.prototype.showResults = function(e, t) {
            var n, i, o, a;
            return null == e && (e = this.focusedInput),
            null == t && (t = this.focusedResults),
            s(t) ? void 0 : (i = r(e).offset(), o = i.top, n = o + r(e).innerHeight(), a = r(e).innerWidth(), r(t).css({
                display: "block",
                position: "absolute",
                width: a + 2
            }), r(t).offset({
                top: n + 5
            }), r(e).addClass("js-navigation-enable"), r(t).find(".js-navigation-container").navigation("push"), r(t).show())
        },
        e.prototype.hideResults = function(e, t) {
            return null == e && (e = this.focusedInput),
            null == t && (t = this.focusedResults),
            t && s(t) ? (r(e).removeClass("js-navigation-enable"), r(t).find(".js-navigation-container").navigation("pop"), r(t).hide()) : void 0
        },
        e
    } (),
    n = new e,
    r(document.activeElement).is(".js-autocomplete-field") && n.onInputFocus(document.activeElement),
    a(".js-autocomplete-field",
    function() {
        r(this).on("focus",
        function() {
            return n.onInputFocus(this)
        })
    })
}.call(this),
function() {
    var e, t, n, i, r = require("github/jquery")["default"];
    n = require("github/fetch").fetchText,
    i = require("github/history").replaceState,
    e = require("github/sliding-promise-queue")["default"],
    t = new e,
    r(document).onFocusedInput(".js-autosearch-field",
    function(e) {
        r(this).on("throttled:input." + e,
        function() {
            var e, s, o, a;
            return s = this.form,
            s.classList.add("is-sending"),
            e = function() {
                return s.classList.remove("is-sending")
            },
            o = r(s).serialize(),
            a = (s.action + "&" + o).replace(/[?&]/, "?"),
            t.push(n(a)).then(function(e) {
                var t;
                return t = document.getElementById(s.getAttribute("data-results-container")),
                t.innerHTML = e,
                i(null, "", "?" + o)
            }).then(e, e)
        })
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("change", "form[data-autosubmit]",
    function() {
        return e(this).submit()
    })
}.call(this),
function() {
    var e, t, n, i, r = require("github/jquery")["default"],
    s = require("github/visible")["default"],
    o = require("github/observe"),
    a = o.observe;
    e = require("github/pjax"),
    t = require("github/history").replaceState,
    i = null,
    n = function() {
        var n, s, o, a, u, c, l;
        return i && i.abort(),
        c = r(this).attr("data-item-name") || "items",
        l = parseInt(r(this).attr("data-item-minimum")) || 0,
        a = parseInt(r(this).attr("data-item-count")) || 0,
        u = Math.max(l, parseInt(this.value) || 0),
        n = u > 300,
        r(".js-purchase-button").prop("disabled", 0 === u || n),
        r(".js-downgrade-button").prop("disabled", u === a),
        s = {},
        s[c] = u,
        i = r.ajax({
            url: r(this).attr("data-url"),
            data: s
        }),
        o = function(i) {
            var s, o, a;
            r(".js-contact-us").toggleClass("hidden", !n),
            r(".js-payment-summary").toggleClass("hidden", n),
            r(".js-billing-section").toggleClass("has-removed-contents", i.free),
            r(".js-upgrade-info").toggleClass("hidden", 0 >= u),
            r(".js-downgrade-info").toggleClass("hidden", u >= 0),
            r(".js-extra-seats-line-item").toggleClass("hidden", i.no_additional_seats),
            s = i.selectors;
            for (o in s) a = s[o],
            r(o).text(a);
            return t(e.getState(), null, i.url)
        },
        i.then(o)
    },
    a(".js-addon-purchase-field",
    function() {
        r(this).on("throttled:input", n),
        s(this) && n.call(r(".js-addon-purchase-field")[0])
    }),
    a(".js-addon-downgrade-field",
    function() {
        r(this).on("change", n),
        s(this) && n.call(r(".js-addon-downgrade-field")[0])
    })
}.call(this),
function() {
    var e, t = require("github/jquery")["default"],
    n = require("github/observe"),
    i = n.observe,
    r = [].indexOf ||
    function(e) {
        for (var t = 0,
        n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
        return - 1
    };
    i(".js-card-select-number-field", {
        add: function() {
            t(this).payment("formatCardNumber")
        }
    }),
    i(".js-card-cvv", {
        add: function() {
            t(this).payment("formatCardCVC")
        }
    }),
    i(".js-card-select-number-field",
    function() {
        var e, n, i;
        n = t(this).closest("form"),
        e = n.find(".js-card"),
        i = n.find(".js-card-select-type-field"),
        t(this).on("input",
        function() {
            var n, r, s, o, a;
            if (a = t(this).val(), o = t.payment.cardType(a)) for (r = 0, s = e.length; s > r; r++) n = e[r],
            t(n).toggleClass("enabled", t(n).attr("data-name") === o),
            t(n).toggleClass("disabled", t(n).attr("data-name") !== o);
            else e.removeClass("enabled disabled");
            i.val(o)
        })
    }),
    t(document).on("blur", ".js-card-select-number-field",
    function() {
        t(this).val(t.payment.formatCardNumber(t(this).val()))
    }),
    t(document).on("click", ".js-card",
    function() {
        var e, n;
        e = t(this).closest("form"),
        n = e.find(".js-card-select-number-field"),
        n.focus()
    }),
    t(document).on("click", ".js-enter-new-card",
    function(e) {
        var n, i;
        n = t(this).closest(".js-setup-creditcard"),
        i = n.find(".js-card-select-number-field"),
        n.removeClass("has-credit-card"),
        i.attr("required", "required"),
        i.attr("data-encrypted-name", "billing[credit_card][number]"),
        e.preventDefault()
    }),
    t(document).on("click", ".js-cancel-enter-new-card",
    function(e) {
        var n, i;
        n = t(this).closest(".js-setup-creditcard"),
        i = n.find(".js-card-select-number-field"),
        n.addClass("has-credit-card"),
        i.removeAttr("required"),
        i.removeAttr("data-encrypted-name"),
        e.preventDefault()
    }),
    e = function(e) {
        var n, i, s, o, a, u;
        i = e.find("option:selected").text(),
        o = {
            Austria: "ATU000000000",
            Belgium: "BE0000000000",
            Bulgaria: "BG000000000...",
            Croatia: "",
            Cyprus: "CY000000000X",
            "Czech Republic": "CZ00000000...",
            Denmark: "DK00 00 00 00",
            Estonia: "EE000000000",
            Finland: "FI00000000",
            France: "FRXX 000000000",
            Germany: "DE000000000",
            Greece: "EL000000000",
            Hungary: "HU00000000",
            Iceland: "",
            Ireland: "IE...",
            Italy: "IT00000000000",
            Latvia: "LV00000000000",
            Lithuania: "LT000000000...",
            Luxembourg: "LU00000000",
            Malta: "MT00000000",
            Netherlands: "NL000000000B00",
            Norway: "",
            Poland: "PL0000000000",
            Portugal: "PT000000000",
            Romania: "RO...",
            Slovakia: "SK0000000000",
            Slovenia: "",
            Spain: "ES...",
            Sweden: "SE000000000000",
            Switzerland: "",
            "United Kingdom": "GB..."
        },
        s = ["Angola", "Antigua and Barbuda", "Aruba", "Bahamas", "Belize", "Benin", "Botswana", "Cameroon", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Cook Islands", "C\xf4te d'Ivoire", "Djibouti", "Dominica", "Fiji", "French Southern Lands", "Ghana", "Guyana", "Hong Kong", "Ireland", "Kiribati", "Korea, North", "Malawi", "Maritania", "Mauritius", "Montserrat", "Nauru", "Niue", "Qatar", "Saint Kitts and Nevis", "Saint Lucia", "Sao Tome and Principe", "Seychelles", "Sierra Leone", "Sint Maarten (Dutch part)", "Solomon Islands", "Somalia", "Suriname", "Syria", "Togo", "Tokelau", "Tonga", "United Arab Emirates", "Vanuatu", "Yemen", "Zimbabwe"],
        a = o[i],
        t(".js-setup-creditcard").toggleClass("is-vat-country", null != a),
        u = null != a ? "(" + a + ")": "",
        n = e.parents(".js-setup-creditcard").find(".js-vat-help-text"),
        n.html(u),
        "United States of America" !== i ? (t(".js-setup-creditcard").addClass("is-international"), t(".js-select-state").removeAttr("required").val("")) : (t(".js-setup-creditcard").removeClass("is-international"), t(".js-select-state").attr("required", "required")),
        r.call(s, i) >= 0 ? (t(".js-setup-creditcard").addClass("no-postcodes"), t(".js-postal-code-field").removeAttr("required").val("")) : (t(".js-setup-creditcard").removeClass("no-postcodes"), t(".js-postal-code-field").attr("required", "required"))
    },
    t(document).on("change", ".js-select-country",
    function() {
        e(t(this))
    }),
    i(".js-select-country",
    function() {
        e(t(this))
    })
} (),
function() {
    var e = require("github/jquery")["default"],
    t = require("github/observe"),
    n = t.observe;
    e(document).on("change", ".js-payment-methods .js-payment-method",
    function() {
        var t, n;
        t = e(this).closest(".js-payment-methods"),
        n = e(this).attr("data-selected-tab"),
        t.find(".js-selected-payment-method").removeClass("active"),
        t.find("." + n).addClass("active")
    }),
    n(".js-selected-payment-method:not(.active)", {
        add: function() {
            e(this).addClass("has-removed-contents")
        },
        remove: function() {
            e(this).removeClass("has-removed-contents")
        }
    }),
    n(".js-billing-payment-methods",
    function() {
        e(this).removeClass("disabled")
    }),
    e(document).on("click", ".js-toggle-change-payment-method",
    function() {
        var e;
        e = this.closest(".js-change-payment-method-container"),
        e.querySelector(".js-change-payment-method").classList.toggle("has-removed-contents"),
        e.querySelector(".js-current-payment-method").classList.toggle("hidden")
    })
} (),
define("github/dismiss-notice", ["jquery"],
function(e) {
    function t(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var n = t(e);
    n["default"](document).on("ajaxSuccess", ".js-dismiss-notice",
    function() {
        this.closest(".js-dismissible-notice").classList.add("hidden")
    })
}),
define("github/sticky-scroll-into-view", ["exports", "./fragment-target"],
function(e, t) {
    function n(e) {
        if (Array.isArray(e)) {
            for (var t = 0,
            n = Array(e.length); t < e.length; t++) n[t] = e[t];
            return n
        }
        return Array.from(e)
    }
    function i(e) {
        var t = e.ownerDocument;
        e.scrollIntoView(),
        t.defaultView.scrollBy(0, -s(t))
    }
    function r(e) {
        var n = t.findFragmentTarget(e);
        n && i(n)
    }
    function s(e) {
        var t = e.querySelectorAll(".js-sticky-offset-scroll");
        return Math.max.apply(Math, n(Array.from(t).map(function(e) {
            var t = e.getBoundingClientRect(),
            n = t.top,
            i = t.height;
            return 0 === n ? i: 0
        })))
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.scrollToFragmentTarget = r,
    e.computeFixedYOffset = s
}),
define("github/fixed-offset-fragment-navigation-observer", ["./sticky-scroll-into-view", "./hash-change"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i() {
        e.computeFixedYOffset(document) && e.scrollToFragmentTarget(document)
    }
    var r = n(t);
    r["default"](i)
}),
define("github/gfm", ["delegated-events"],
function(e) {
    e.on("click", ".email-hidden-toggle",
    function(e) {
        var t = this.nextElementSibling;
        t.style.display = "",
        t.classList.toggle("expanded"),
        e.preventDefault()
    })
}),
define("github/git-clone-help", ["delegated-events"],
function(e) {
    e.on("click", ".js-git-clone-help-container .js-git-clone-help-switcher",
    function() {
        var e = this.closest(".js-git-clone-help-container"),
        t = this.getAttribute("data-url");
        e.querySelector(".js-git-clone-help-field").value = t,
        this.matches(".js-git-protocol-clone-url") && Array.from(e.querySelectorAll(".js-git-clone-help-text")).forEach(function(e) {
            e.textContent = t
        });
        var n = e.querySelector(".js-clone-url-button.selected");
        n && n.classList.remove("selected"),
        this.closest(".js-clone-url-button").classList.add("selected")
    })
}),
define("github/google-analytics-overrides", ["exports", "./google-analytics"],
function(e, t) {
    function n(e) {
        var t = document.querySelectorAll(e);
        return t.length > 0 ? t[t.length - 1] : void 0
    }
    function i() {
        var e = n("meta[name=analytics-location]");
        return e ? e.content: window.location.pathname
    }
    function r() {
        var e = window.location.search,
        t = n("meta[name=analytics-location-params]");
        return t && (e += (e ? "&": "?") + t.content),
        Array.from(document.querySelectorAll("meta[name=analytics-param-rename]")).forEach(function(t) {
            var n = t.content.split(":", 2);
            e = e.replace(new RegExp("(^|[?&])" + n[0] + "($|=)", "g"), "$1" + n[1] + "$2")
        }),
        e
    }
    function s() {
        return i() + r()
    }
    function o() {
        var e = document.title,
        t = n("meta[name=analytics-location]");
        return t && (e = e.replace(/([\w-]+\/)+[\w\.-]+/g, "private/private")),
        e
    }
    function a() {
        var e = window.location.protocol + "//" + window.location.host + s();
        t.setGlobalLocation(e),
        t.setGlobalTitle(o()),
        Array.from(document.querySelectorAll("meta.js-ga-set")).forEach(function(e) {
            t.setDimension(e.name, e.content)
        })
    }
    function u() {
        Array.from(document.querySelectorAll("meta[name=analytics-virtual-pageview]")).forEach(function(e) {
            t.trackPageview(e.content, {
                title: ""
            })
        }),
        t.trackPageview()
    }
    function c(e) {
        var t = e.trim().split(/\s*,\s*/);
        return {
            category: t[0],
            action: t[1],
            label: t[2],
            value: t[3]
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.updateGlobalFields = a,
    e.trackPageviews = u,
    e.extractEventParams = c
}),
define("github/google-analytics-tracking", ["./google-analytics-overrides", "./google-analytics", "./observe", "./document-ready"],
function(e, t, n, i) {
    var r = document.querySelector("meta[name=google-analytics]");
    r && (t.setGlobalAccount(r.content, "github.com"), e.updateGlobalFields()),
    i.ready.then(function() {
        return e.trackPageviews()
    }),
    document.addEventListener("pjax:complete",
    function() {
        setTimeout(function() {
            e.updateGlobalFields(),
            e.trackPageviews()
        },
        20)
    },
    !1),
    n.observe("[data-ga-load]",
    function() {
        var n = e.extractEventParams(this.getAttribute("data-ga-load"));
        n.interactive = !1,
        t.trackEvent(n)
    }),
    n.observe("meta[name=analytics-event]",
    function() {
        var n = e.extractEventParams(this.content);
        n.interactive = !1,
        t.trackEvent(n)
    }),
    window.addEventListener("click",
    function(n) {
        var i = void 0;
        if (n.target.closest && (i = n.target.closest("[data-ga-click]"))) {
            var r = e.extractEventParams(i.getAttribute("data-ga-click"));
            t.trackEvent(r)
        }
    },
    !0)
}),
define("github/homepage/play-video", ["delegated-events"],
function(e) {
    function t(e, t) {
        void 0 === t && (t = 0);
        var n = e.getBoundingClientRect(),
        i = n.top - t,
        r = n.bottom - window.innerHeight + t;
        0 > i ? window.scrollBy(0, i) : r > 0 && window.scrollBy(0, r)
    }
    e.on("click", ".js-video-play, .js-video-close, .is-expanded",
    function(e) {
        e.preventDefault();
        var n = this,
        i = n.classList.contains("js-video-play"),
        r = n.closest(".js-video-container"),
        s = r.querySelector(".js-video-iframe"),
        o = document.querySelector(".js-video-bg");
        i ? s.src = s.getAttribute("data-src") : s.removeAttribute("src"),
        r.classList.toggle("is-expanded", i),
        o.classList.toggle("is-expanded", i),
        t(s, 20)
    })
}),
define("github/link-prefetch-viewed", ["./observe"],
function(e) {
    e.observe("link[rel=prefetch-viewed]", {
        init: function() {
            fetch(location.href, {
                method: "HEAD",
                credentials: "same-origin",
                headers: {
                    Purpose: "prefetch-viewed"
                }
            })
        }
    })
}),
define.amd = "sortablejs",
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(e) : "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = e() : "undefined" != typeof Package ? Sortable = e() : window.Sortable = e()
} (function() {
    "use strict";
    function e(e, t) {
        if (!e || !e.nodeType || 1 !== e.nodeType) throw "Sortable: `el` must be HTMLElement, and not " + {}.toString.call(e);
        this.el = e,
        this.options = t = v({},
        t),
        e[I] = this;
        var n = {
            group: Math.random(),
            sort: !0,
            disabled: !1,
            store: null,
            handle: null,
            scroll: !0,
            scrollSensitivity: 30,
            scrollSpeed: 10,
            draggable: /[uo]l/i.test(e.nodeName) ? "li": ">*",
            ghostClass: "sortable-ghost",
            chosenClass: "sortable-chosen",
            ignore: "a, img",
            filter: null,
            animation: 0,
            setData: function(e, t) {
                e.setData("Text", t.textContent)
            },
            dropBubble: !1,
            dragoverBubble: !1,
            dataIdAttr: "data-id",
            delay: 0,
            forceFallback: !1,
            fallbackClass: "sortable-fallback",
            fallbackOnBody: !1
        };
        for (var i in n) ! (i in t) && (t[i] = n[i]);
        V(t);
        for (var s in this)"_" === s.charAt(0) && (this[s] = this[s].bind(this));
        this.nativeDraggable = t.forceFallback ? !1 : F,
        r(e, "mousedown", this._onTapStart),
        r(e, "touchstart", this._onTapStart),
        this.nativeDraggable && (r(e, "dragover", this), r(e, "dragenter", this)),
        W.push(this._onDragOver),
        t.store && this.sort(t.store.get(this))
    }
    function t(e) {
        w && w.state !== e && (a(w, "display", e ? "none": ""), !e && w.state && x.insertBefore(w, b), w.state = e)
    }
    function n(e, t, n) {
        if (e) {
            n = n || R,
            t = t.split(".");
            var i = t.shift().toUpperCase(),
            r = new RegExp("\\s(" + t.join("|") + ")(?=\\s)", "g");
            do
            if (">*" === i && e.parentNode === n || ("" === i || e.nodeName.toUpperCase() == i) && (!t.length || ((" " + e.className + " ").match(r) || []).length == t.length)) return e;
            while (e !== n && (e = e.parentNode))
        }
        return null
    }
    function i(e) {
        e.dataTransfer && (e.dataTransfer.dropEffect = "move"),
        e.preventDefault()
    }
    function r(e, t, n) {
        e.addEventListener(t, n, !1)
    }
    function s(e, t, n) {
        e.removeEventListener(t, n, !1)
    }
    function o(e, t, n) {
        if (e) if (e.classList) e.classList[n ? "add": "remove"](t);
        else {
            var i = (" " + e.className + " ").replace(H, " ").replace(" " + t + " ", " ");
            e.className = (i + (n ? " " + t: "")).replace(H, " ")
        }
    }
    function a(e, t, n) {
        var i = e && e.style;
        if (i) {
            if (void 0 === n) return R.defaultView && R.defaultView.getComputedStyle ? n = R.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle),
            void 0 === t ? n: n[t];
            t in i || (t = "-webkit-" + t),
            i[t] = n + ("string" == typeof n ? "": "px")
        }
    }
    function u(e, t, n) {
        if (e) {
            var i = e.getElementsByTagName(t),
            r = 0,
            s = i.length;
            if (n) for (; s > r; r++) n(i[r], r);
            return i
        }
        return []
    }
    function c(e, t, n, i, r, s, o) {
        var a = R.createEvent("Event"),
        u = (e || t[I]).options,
        c = "on" + n.charAt(0).toUpperCase() + n.substr(1);
        a.initEvent(n, !0, !0),
        a.to = t,
        a.from = r || t,
        a.item = i || t,
        a.clone = w,
        a.oldIndex = s,
        a.newIndex = o,
        t.dispatchEvent(a),
        u[c] && u[c].call(e, a)
    }
    function l(e, t, n, i, r, s) {
        var o, a, u = e[I],
        c = u.options.onMove;
        return o = R.createEvent("Event"),
        o.initEvent("move", !0, !0),
        o.to = t,
        o.from = e,
        o.dragged = n,
        o.draggedRect = i,
        o.related = r || t,
        o.relatedRect = s || t.getBoundingClientRect(),
        e.dispatchEvent(o),
        c && (a = c.call(u, o)),
        a
    }
    function d(e) {
        e.draggable = !1
    }
    function h() {
        $ = !1
    }
    function f(e, t) {
        var n = e.lastElementChild,
        i = n.getBoundingClientRect();
        return (t.clientY - (i.top + i.height) > 5 || t.clientX - (i.right + i.width) > 5) && n
    }
    function m(e) {
        for (var t = e.tagName + e.className + e.src + e.href + e.textContent,
        n = t.length,
        i = 0; n--;) i += t.charCodeAt(n);
        return i.toString(36)
    }
    function p(e) {
        var t = 0;
        if (!e || !e.parentNode) return - 1;
        for (; e && (e = e.previousElementSibling);)"TEMPLATE" !== e.nodeName.toUpperCase() && t++;
        return t
    }
    function g(e, t) {
        var n, i;
        return function() {
            void 0 === n && (n = arguments, i = this, setTimeout(function() {
                1 === n.length ? e.call(i, n[0]) : e.apply(i, n),
                n = void 0
            },
            t))
        }
    }
    function v(e, t) {
        if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }
    var b, y, j, w, x, q, k, S, L, C, A, E, T, _, D, M, P, N = {},
    H = /\s+/g,
    I = "Sortable" + (new Date).getTime(),
    O = window,
    R = O.document,
    z = O.parseInt,
    F = !!("draggable" in R.createElement("div")),
    B = function(e) {
        return e = R.createElement("x"),
        e.style.cssText = "pointer-events:auto",
        "auto" === e.style.pointerEvents
    } (),
    $ = !1,
    U = Math.abs,
    W = ([].slice, []),
    Y = g(function(e, t, n) {
        if (n && t.scroll) {
            var i, r, s, o, a = t.scrollSensitivity,
            u = t.scrollSpeed,
            c = e.clientX,
            l = e.clientY,
            d = window.innerWidth,
            h = window.innerHeight;
            if (S !== n && (k = t.scroll, S = n, k === !0)) {
                k = n;
                do
                if (k.offsetWidth < k.scrollWidth || k.offsetHeight < k.scrollHeight) break;
                while (k = k.parentNode)
            }
            k && (i = k, r = k.getBoundingClientRect(), s = (U(r.right - c) <= a) - (U(r.left - c) <= a), o = (U(r.bottom - l) <= a) - (U(r.top - l) <= a)),
            s || o || (s = (a >= d - c) - (a >= c), o = (a >= h - l) - (a >= l), (s || o) && (i = O)),
            (N.vx !== s || N.vy !== o || N.el !== i) && (N.el = i, N.vx = s, N.vy = o, clearInterval(N.pid), i && (N.pid = setInterval(function() {
                i === O ? O.scrollTo(O.pageXOffset + s * u, O.pageYOffset + o * u) : (o && (i.scrollTop += o * u), s && (i.scrollLeft += s * u))
            },
            24)))
        }
    },
    30),
    V = function(e) {
        var t = e.group;
        t && "object" == typeof t || (t = e.group = {
            name: t
        }),
        ["pull", "put"].forEach(function(e) {
            e in t || (t[e] = !0)
        }),
        e.groups = " " + t.name + (t.put.join ? " " + t.put.join(" ") : "") + " "
    };
    return e.prototype = {
        constructor: e,
        _onTapStart: function(e) {
            var t = this,
            i = this.el,
            r = this.options,
            s = e.type,
            o = e.touches && e.touches[0],
            a = (o || e).target,
            u = a,
            l = r.filter;
            if (! ("mousedown" === s && 0 !== e.button || r.disabled) && (a = n(a, r.draggable, i))) {
                if (E = p(a), "function" == typeof l) {
                    if (l.call(this, e, a, this)) return c(t, u, "filter", a, i, E),
                    void e.preventDefault()
                } else if (l && (l = l.split(",").some(function(e) {
                    return e = n(u, e.trim(), i),
                    e ? (c(t, e, "filter", a, i, E), !0) : void 0
                }))) return void e.preventDefault(); (!r.handle || n(u, r.handle, i)) && this._prepareDragStart(e, o, a)
            }
        },
        _prepareDragStart: function(e, t, n) {
            var i, s = this,
            a = s.el,
            c = s.options,
            l = a.ownerDocument;
            n && !b && n.parentNode === a && (D = e, x = a, b = n, y = b.parentNode, q = b.nextSibling, _ = c.group, i = function() {
                s._disableDelayedDrag(),
                b.draggable = !0,
                o(b, s.options.chosenClass, !0),
                s._triggerDragStart(t)
            },
            c.ignore.split(",").forEach(function(e) {
                u(b, e.trim(), d)
            }), r(l, "mouseup", s._onDrop), r(l, "touchend", s._onDrop), r(l, "touchcancel", s._onDrop), c.delay ? (r(l, "mouseup", s._disableDelayedDrag), r(l, "touchend", s._disableDelayedDrag), r(l, "touchcancel", s._disableDelayedDrag), r(l, "mousemove", s._disableDelayedDrag), r(l, "touchmove", s._disableDelayedDrag), s._dragStartTimer = setTimeout(i, c.delay)) : i())
        },
        _disableDelayedDrag: function() {
            var e = this.el.ownerDocument;
            clearTimeout(this._dragStartTimer),
            s(e, "mouseup", this._disableDelayedDrag),
            s(e, "touchend", this._disableDelayedDrag),
            s(e, "touchcancel", this._disableDelayedDrag),
            s(e, "mousemove", this._disableDelayedDrag),
            s(e, "touchmove", this._disableDelayedDrag)
        },
        _triggerDragStart: function(e) {
            e ? (D = {
                target: b,
                clientX: e.clientX,
                clientY: e.clientY
            },
            this._onDragStart(D, "touch")) : this.nativeDraggable ? (r(b, "dragend", this), r(x, "dragstart", this._onDragStart)) : this._onDragStart(D, !0);
            try {
                R.selection ? R.selection.empty() : window.getSelection().removeAllRanges()
            } catch(t) {}
        },
        _dragStarted: function() {
            x && b && (o(b, this.options.ghostClass, !0), e.active = this, c(this, x, "start", b, x, E))
        },
        _emulateDragOver: function() {
            if (M) {
                if (this._lastX === M.clientX && this._lastY === M.clientY) return;
                this._lastX = M.clientX,
                this._lastY = M.clientY,
                B || a(j, "display", "none");
                var e = R.elementFromPoint(M.clientX, M.clientY),
                t = e,
                n = " " + this.options.group.name,
                i = W.length;
                if (t) do {
                    if (t[I] && t[I].options.groups.indexOf(n) > -1) {
                        for (; i--;) W[i]({
                            clientX: M.clientX,
                            clientY: M.clientY,
                            target: e,
                            rootEl: t
                        });
                        break
                    }
                    e = t
                } while ( t = t . parentNode );
                B || a(j, "display", "")
            }
        },
        _onTouchMove: function(t) {
            if (D) {
                e.active || this._dragStarted(),
                this._appendGhost();
                var n = t.touches ? t.touches[0] : t,
                i = n.clientX - D.clientX,
                r = n.clientY - D.clientY,
                s = t.touches ? "translate3d(" + i + "px," + r + "px,0)": "translate(" + i + "px," + r + "px)";
                P = !0,
                M = n,
                a(j, "webkitTransform", s),
                a(j, "mozTransform", s),
                a(j, "msTransform", s),
                a(j, "transform", s),
                t.preventDefault()
            }
        },
        _appendGhost: function() {
            if (!j) {
                var e, t = b.getBoundingClientRect(),
                n = a(b),
                i = this.options;
                j = b.cloneNode(!0),
                o(j, i.ghostClass, !1),
                o(j, i.fallbackClass, !0),
                a(j, "top", t.top - z(n.marginTop, 10)),
                a(j, "left", t.left - z(n.marginLeft, 10)),
                a(j, "width", t.width),
                a(j, "height", t.height),
                a(j, "opacity", "0.8"),
                a(j, "position", "fixed"),
                a(j, "zIndex", "100000"),
                a(j, "pointerEvents", "none"),
                i.fallbackOnBody && R.body.appendChild(j) || x.appendChild(j),
                e = j.getBoundingClientRect(),
                a(j, "width", 2 * t.width - e.width),
                a(j, "height", 2 * t.height - e.height)
            }
        },
        _onDragStart: function(e, t) {
            var n = e.dataTransfer,
            i = this.options;
            this._offUpEvents(),
            "clone" == _.pull && (w = b.cloneNode(!0), a(w, "display", "none"), x.insertBefore(w, b)),
            t ? ("touch" === t ? (r(R, "touchmove", this._onTouchMove), r(R, "touchend", this._onDrop), r(R, "touchcancel", this._onDrop)) : (r(R, "mousemove", this._onTouchMove), r(R, "mouseup", this._onDrop)), this._loopId = setInterval(this._emulateDragOver, 50)) : (n && (n.effectAllowed = "move", i.setData && i.setData.call(this, n, b)), r(R, "drop", this), setTimeout(this._dragStarted, 0))
        },
        _onDragOver: function(e) {
            var i, r, s, o = this.el,
            u = this.options,
            c = u.group,
            d = c.put,
            m = _ === c,
            p = u.sort;
            if (void 0 !== e.preventDefault && (e.preventDefault(), !u.dragoverBubble && e.stopPropagation()), P = !0, _ && !u.disabled && (m ? p || (s = !x.contains(b)) : _.pull && d && (_.name === c.name || d.indexOf && ~d.indexOf(_.name))) && (void 0 === e.rootEl || e.rootEl === this.el)) {
                if (Y(e, u, this.el), $) return;
                if (i = n(e.target, u.draggable, o), r = b.getBoundingClientRect(), s) return t(!0),
                void(w || q ? x.insertBefore(b, w || q) : p || x.appendChild(b));
                if (0 === o.children.length || o.children[0] === j || o === e.target && (i = f(o, e))) {
                    if (i) {
                        if (i.animated) return;
                        v = i.getBoundingClientRect()
                    }
                    t(m),
                    l(x, o, b, r, i, v) !== !1 && (b.contains(o) || (o.appendChild(b), y = o), this._animate(r, b), i && this._animate(v, i))
                } else if (i && !i.animated && i !== b && void 0 !== i.parentNode[I]) {
                    L !== i && (L = i, C = a(i), A = a(i.parentNode));
                    var g, v = i.getBoundingClientRect(),
                    k = v.right - v.left,
                    S = v.bottom - v.top,
                    E = /left|right|inline/.test(C.cssFloat + C.display) || "flex" == A.display && 0 === A["flex-direction"].indexOf("row"),
                    T = i.offsetWidth > b.offsetWidth,
                    D = i.offsetHeight > b.offsetHeight,
                    M = (E ? (e.clientX - v.left) / k: (e.clientY - v.top) / S) > .5,
                    N = i.nextElementSibling,
                    H = l(x, o, b, r, i, v);
                    if (H !== !1) {
                        if ($ = !0, setTimeout(h, 30), t(m), 1 === H || -1 === H) g = 1 === H;
                        else if (E) {
                            var O = b.offsetTop,
                            R = i.offsetTop;
                            g = O === R ? i.previousElementSibling === b && !T || M && T: R > O
                        } else g = N !== b && !D || M && D;
                        b.contains(o) || (g && !N ? o.appendChild(b) : i.parentNode.insertBefore(b, g ? N: i)),
                        y = b.parentNode,
                        this._animate(r, b),
                        this._animate(v, i)
                    }
                }
            }
        },
        _animate: function(e, t) {
            var n = this.options.animation;
            if (n) {
                var i = t.getBoundingClientRect();
                a(t, "transition", "none"),
                a(t, "transform", "translate3d(" + (e.left - i.left) + "px," + (e.top - i.top) + "px,0)"),
                t.offsetWidth,
                a(t, "transition", "all " + n + "ms"),
                a(t, "transform", "translate3d(0,0,0)"),
                clearTimeout(t.animated),
                t.animated = setTimeout(function() {
                    a(t, "transition", ""),
                    a(t, "transform", ""),
                    t.animated = !1
                },
                n)
            }
        },
        _offUpEvents: function() {
            var e = this.el.ownerDocument;
            s(R, "touchmove", this._onTouchMove),
            s(e, "mouseup", this._onDrop),
            s(e, "touchend", this._onDrop),
            s(e, "touchcancel", this._onDrop)
        },
        _onDrop: function(t) {
            var n = this.el,
            i = this.options;
            clearInterval(this._loopId),
            clearInterval(N.pid),
            clearTimeout(this._dragStartTimer),
            s(R, "mousemove", this._onTouchMove),
            this.nativeDraggable && (s(R, "drop", this), s(n, "dragstart", this._onDragStart)),
            this._offUpEvents(),
            t && (P && (t.preventDefault(), !i.dropBubble && t.stopPropagation()), j && j.parentNode.removeChild(j), b && (this.nativeDraggable && s(b, "dragend", this), d(b), o(b, this.options.ghostClass, !1), o(b, this.options.chosenClass, !1), x !== y ? (T = p(b), T >= 0 && (c(null, y, "sort", b, x, E, T), c(this, x, "sort", b, x, E, T), c(null, y, "add", b, x, E, T), c(this, x, "remove", b, x, E, T))) : (w && w.parentNode.removeChild(w), b.nextSibling !== q && (T = p(b), T >= 0 && (c(this, x, "update", b, x, E, T), c(this, x, "sort", b, x, E, T)))), e.active && ((null === T || -1 === T) && (T = E), c(this, x, "end", b, x, E, T), this.save())), x = b = y = j = q = w = k = S = D = M = P = T = L = C = _ = e.active = null)
        },
        handleEvent: function(e) {
            var t = e.type;
            "dragover" === t || "dragenter" === t ? b && (this._onDragOver(e), i(e)) : ("drop" === t || "dragend" === t) && this._onDrop(e)
        },
        toArray: function() {
            for (var e, t = [], i = this.el.children, r = 0, s = i.length, o = this.options; s > r; r++) e = i[r],
            n(e, o.draggable, this.el) && t.push(e.getAttribute(o.dataIdAttr) || m(e));
            return t
        },
        sort: function(e) {
            var t = {},
            i = this.el;
            this.toArray().forEach(function(e, r) {
                var s = i.children[r];
                n(s, this.options.draggable, i) && (t[e] = s)
            },
            this),
            e.forEach(function(e) {
                t[e] && (i.removeChild(t[e]), i.appendChild(t[e]))
            })
        },
        save: function() {
            var e = this.options.store;
            e && e.set(this)
        },
        closest: function(e, t) {
            return n(e, t || this.options.draggable, this.el)
        },
        option: function(e, t) {
            var n = this.options;
            return void 0 === t ? n[e] : (n[e] = t, void("group" === e && V(n)))
        },
        destroy: function() {
            var e = this.el;
            e[I] = null,
            s(e, "mousedown", this._onTapStart),
            s(e, "touchstart", this._onTapStart),
            this.nativeDraggable && (s(e, "dragover", this), s(e, "dragenter", this)),
            Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),
            function(e) {
                e.removeAttribute("draggable")
            }),
            W.splice(W.indexOf(this._onDragOver), 1),
            this._onDrop(),
            this.el = e = null
        }
    },
    e.utils = {
        on: r,
        off: s,
        css: a,
        find: u,
        is: function(e, t) {
            return !! n(e, t, e)
        },
        extend: v,
        throttle: g,
        closest: n,
        toggleClass: o,
        index: p
    },
    e.create = function(t, n) {
        return new e(t, n)
    },
    e.version = "1.4.2",
    e
}),
delete define.amd,
define("github/milestone-dragging", ["jquery", "sortablejs", "./observe"],
function(e, t, n) {
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var r = i(e),
    s = i(t);
    r["default"](document).on("ajaxSuccess", ".js-milestone-sort-form",
    function(e, t, n, i) {
        "outdated" === i ? this.querySelector(".js-milestone-changed").classList.remove("hidden") : this.querySelector(".js-timestamp").value = i
    }),
    n.observe(".js-draggable-issues-container",
    function() {
        function e(e) {
            return n.querySelectorAll(".js-draggable-issue")[e]
        }
        function t(t) {
            var i = t.newIndex,
            s = t.item,
            o = s.getAttribute("data-id"),
            a = e(i - 1),
            u = a && a.getAttribute("data-id"),
            c = n.closest(".js-milestone-sort-form");
            c.querySelector(".js-item-id").value = o,
            c.querySelector(".js-prev-id").value = u || "",
            r["default"](c).submit()
        }
        var n = this;
        s["default"].create(this, {
            item: ".js-draggable-issue",
            handle: ".js-drag-handle",
            onUpdate: t
        })
    })
}),
define("github/mobile-preference", ["delegated-events"],
function(e) {
    e.on("submit", ".js-mobile-preference-form",
    function() {
        var e = this.querySelector(".js-mobile-preference-anchor-field");
        e.value = window.location.hash.substr(1)
    })
}),
define("github/capture-keypresses", ["exports"],
function(e) {
    function t(e) {
        var t = e.createElement("textarea");
        return t.style.position = "fixed",
        t.style.top = 0,
        t.style.left = 0,
        t.style.opacity = 0,
        e.body.appendChild(t),
        t.focus(),
        function() {
            return t.blur(),
            t.remove(),
            t.value
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = t
}),
define("github/pjax/capture-keypresses", ["delegated-events", "../capture-keypresses"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var i = n(t),
    r = null;
    e.on("pjax:click", ".js-pjax-capture-input",
    function() {
        r = i["default"](document)
    }),
    e.on("pjax:end", "#js-repo-pjax-container",
    function() {
        if (r) {
            var t = r(),
            n = document.querySelector(".js-pjax-restore-captured-input");
            n && t && (n.value = t, e.fire(n, "change")),
            r = null
        }
    })
}),
define("github/pjax/history-navigate", ["../history", "delegated-events"],
function(e, t) {
    t.on("pjax:click", ".js-pjax-history-navigate",
    function(t) {
        this.href === e.getBackURL() ? (history.back(), t.detail.relatedEvent.preventDefault(), t.preventDefault()) : this.href === e.getForwardURL() && (history.forward(), t.detail.relatedEvent.preventDefault(), t.preventDefault())
    })
}),
define("github/pjax/link-prefetch", ["../pjax", "../observe", "./prefetch"],
function(e, t, n) {
    t.observe("link[rel=pjax-prefetch]", {
        init: function(t) {
            var i = e.fetch(t, {
                headers: {
                    Purpose: "prefetch"
                }
            });
            n.setPrefetchResponse(t, i)
        }
    })
}),
define("github/select-menu/ajax", ["../jquery"],
function(e) {
    function t(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var n = t(e);
    n["default"](document).on("ajaxSuccess", ".js-select-menu:not([data-multiple])",
    function() {
        n["default"](this).menu("deactivate")
    }),
    n["default"](document).on("ajaxSend", ".js-select-menu:not([data-multiple])",
    function() {
        n["default"](this).addClass("is-loading")
    }),
    n["default"](document).on("ajaxComplete", ".js-select-menu",
    function() {
        n["default"](this).removeClass("is-loading")
    }),
    n["default"](document).on("ajaxError", ".js-select-menu",
    function() {
        n["default"](this).addClass("has-error")
    }),
    n["default"](document).on("menu:deactivate", ".js-select-menu",
    function() {
        n["default"](this).removeClass("is-loading has-error")
    })
}),
define("github/select-menu/base", ["../jquery", "delegated-events"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var i = n(e);
    i["default"](document).on("navigation:open", ".js-select-menu:not([data-multiple]) .js-navigation-item",
    function() {
        var e = i["default"](this),
        n = this.closest(".js-select-menu");
        i["default"](n).find(".js-navigation-item.selected").removeClass("selected"),
        e.addClass("selected"),
        e.removeClass("indeterminate"),
        e.find("input[type=radio], input[type=checkbox]").prop("checked", !0).change(),
        t.fire(this, "selectmenu:selected"),
        i["default"](n).hasClass("is-loading") || i["default"](n).menu("deactivate")
    }),
    i["default"](document).on("navigation:open", ".js-select-menu[data-multiple] .js-navigation-item",
    function() {
        var e = i["default"](this),
        n = e.hasClass("selected");
        e.toggleClass("selected", !n),
        e.removeClass("indeterminate"),
        e.find("input[type=radio], input[type=checkbox]").prop("checked", !n).change(),
        t.fire(this, "selectmenu:selected")
    })
}),
define("github/select-menu/button", ["../jquery"],
function(e) {
    function t(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var n = t(e);
    n["default"](document).on("selectmenu:selected", ".js-select-menu .js-navigation-item",
    function() {
        var e = this.closest(".js-select-menu"),
        t = n["default"](this).find(".js-select-button-text");
        t[0] && n["default"](e).find(".js-select-button").html(t.html());
        var i = n["default"](this).find(".js-select-menu-item-gravatar");
        t[0] && n["default"](e).find(".js-select-button-gravatar").html(i.html())
    })
}),
define("github/select-menu/css", ["../jquery", "../visible"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var i = n(e),
    r = n(t);
    i["default"](document).on("selectmenu:change", ".js-select-menu .select-menu-list",
    function(e) {
        var t = i["default"](this).find(".js-navigation-item");
        if (t.removeClass("last-visible"), i["default"](Array.from(t).filter(r["default"])).last().addClass("last-visible"), !this.hasAttribute("data-filterable-for")) {
            var n = i["default"](e.target).hasClass("filterable-empty");
            i["default"](this).toggleClass("filterable-empty", n)
        }
    })
}),
define("github/select-menu/filterable", ["../jquery"],
function(e) {
    function t(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var n = t(e);
    n["default"](document).on("menu:activated selectmenu:load", ".js-select-menu",
    function() {
        var e = this.querySelector(".js-filterable-field");
        e && e.focus()
    }),
    n["default"](document).on("menu:deactivate", ".js-select-menu",
    function() {
        var e = this.querySelector(".js-filterable-field");
        if (e && (e.value = "", n["default"](e).trigger("filterable:change")), Array.from(this.querySelectorAll(".js-navigation-item.selected")).forEach(function(e) {
            var t = e.querySelector("input[type=radio], input[type=checkbox]");
            t && e.classList.toggle("selected", t.checked)
        }), this.contains(document.activeElement)) try {
            document.activeElement.blur()
        } catch(t) {}
    })
}),
define("github/select-menu/navigation", ["../jquery"],
function(e) {
    function t(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var n = t(e);
    n["default"](document).on("menu:activate", ".js-select-menu",
    function() {
        n["default"](this).find(":focus").blur(),
        n["default"](this).find(".js-menu-target").addClass("selected"),
        n["default"](this).find(".js-navigation-container").navigation("push")
    }),
    n["default"](document).on("menu:deactivate", ".js-select-menu",
    function() {
        n["default"](this).find(".js-menu-target").removeClass("selected"),
        n["default"](this).find(".js-navigation-container").navigation("pop")
    }),
    n["default"](document).on("filterable:change selectmenu:tabchange", ".js-select-menu .select-menu-list",
    function() {
        n["default"](this).navigation("refocus")
    })
}),
define("github/select-menu/new", ["../jquery", "delegated-events"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        for (var n = e.querySelectorAll(".js-select-button-text, .js-select-menu-filter-text"), i = 0, r = n.length; r > i; i++) {
            var s = n[i],
            o = s.textContent.toLowerCase().trim();
            if (o === t.toLowerCase()) return ! 0
        }
        return ! 1
    }
    var r = n(e);
    r["default"](document).on("filterable:change", ".js-select-menu .select-menu-list",
    function(e) {
        var n = this.querySelector(".js-new-item-form");
        if (n) {
            var s = e.relatedTarget.value;
            if ("" === s || i(this, s)) r["default"](this).removeClass("is-showing-new-item-form");
            else {
                r["default"](this).addClass("is-showing-new-item-form");
                var o = n.querySelector(".js-new-item-name");
                "innerText" in o ? o.innerText = s: o.textContent = s;
                var a = n.querySelector(".js-new-item-value");
                a && (a.value = s)
            }
        }
        t.fire(e.target, "selectmenu:change")
    })
}),
define("github/select-menu/tabs", ["../jquery", "delegated-events", "../observe"],
function(e, t, n) {
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function r(e, n) {
        var i = e.getAttribute("data-tab-filter"),
        r = e.closest(".js-select-menu"),
        s = r.querySelectorAll(".js-select-menu-tab-bucket");
        Array.from(s).forEach(function(e) {
            e.getAttribute("data-tab-filter") === i && (e.classList.toggle("selected", n), n && t.fire(e, "selectmenu:tabchange"))
        })
    }
    var s = i(e);
    s["default"](document).on("menu:activate selectmenu:load", ".js-select-menu",
    function() {
        var e = s["default"](this).find(".js-select-menu-tab");
        return e.attr("aria-selected", "false").removeClass("selected"),
        e.first().attr("aria-selected", "true").addClass("selected")
    }),
    s["default"](document).on("click", ".js-select-menu .js-select-menu-tab",
    function() {
        var e = this.closest(".js-select-menu"),
        t = e.querySelector(".js-select-menu-tab.selected");
        t && (t.classList.remove("selected"), t.setAttribute("aria-selected", !1)),
        this.classList.add("selected"),
        this.setAttribute("aria-selected", !0);
        var n = e.querySelector(".js-filterable-field");
        if (n) {
            var i = this.getAttribute("data-filter-placeholder");
            i && n.setAttribute("placeholder", i),
            n.focus()
        }
        return ! 1
    }),
    n.observe(".js-select-menu .js-select-menu-tab.selected", {
        add: function() {
            r(this, !0)
        },
        remove: function() {
            r(this, !1)
        }
    })
}),
define("github/select-menu", ["./select-menu/ajax", "./select-menu/base", "./select-menu/button", "./select-menu/css", "./select-menu/filterable", "./select-menu/loading", "./select-menu/navigation", "./select-menu/new", "./select-menu/tabs"],
function() {}),
define("github/sticky", ["./observe"],
function(e) {
    function t() {
        f.length ? n() : i()
    }
    function n() {
        h || (window.addEventListener("resize", r, {
            passive: !0
        }), document.addEventListener("scroll", r, {
            passive: !0
        }), h = !0)
    }
    function i() {
        window.removeEventListener("resize", r, {
            passive: !0
        }),
        document.removeEventListener("scroll", r, {
            passive: !0
        }),
        h = !1
    }
    function r() {
        f.forEach(function(e) {
            if (e.element.offsetHeight > 0) {
                var t = e.element,
                n = e.placeholder,
                i = e.top,
                r = t.getBoundingClientRect();
                if (n) {
                    var s = n.getBoundingClientRect();
                    t.classList.contains("is-stuck") ? s.top > parseInt(i) ? a(e) : u(e) : r.top <= parseInt(i) && o(e)
                } else r.top <= parseInt(i) ? o(e) : a(e)
            }
        })
    }
    function s(e) {
        var t = window.getComputedStyle(e),
        n = t.position;
        return /sticky/.test(n)
    }
    function o(e) {
        var t = e.element,
        n = e.placeholder,
        i = e.top;
        if (n) {
            var r = t.getBoundingClientRect();
            t.style.top = i,
            t.style.left = r.left + "px",
            t.style.width = r.width + "px",
            t.style.marginTop = 0,
            t.style.position = "fixed",
            n.style.display = "block"
        }
        t.classList.add("is-stuck")
    }
    function a(e) {
        var t = e.element,
        n = e.placeholder;
        n && (t.style.position = "static", t.style.marginTop = n.style.marginTop, n.style.display = "none"),
        t.classList.remove("is-stuck")
    }
    function u(e) {
        var t = e.element,
        n = e.placeholder,
        i = e.offsetParent,
        r = e.top;
        if (n) {
            var s = t.getBoundingClientRect(),
            o = n.getBoundingClientRect();
            if (t.style.left = o.left + "px", t.style.width = o.width + "px", i) {
                var a = i.getBoundingClientRect();
                a.bottom < s.height + parseInt(r) && (t.style.top = a.bottom - s.height + "px")
            }
        }
    }
    function c(e) {
        if (s(e)) return null;
        var t = e.previousElementSibling;
        if (t && t.classList.contains("is-placeholder")) return t;
        var n = document.createElement("div");
        return n.style.visibility = "hidden",
        n.style.display = "none",
        n.style.height = window.getComputedStyle(e).height,
        n.className = e.className,
        n.classList.remove("js-sticky"),
        n.classList.add("is-placeholder"),
        e.parentNode.insertBefore(n, e)
    }
    function l(e) {
        var t = c(e),
        n = window.getComputedStyle(e).position;
        e.style.position = "static";
        var i = e.offsetParent;
        e.style.position = "fixed";
        var r = window.getComputedStyle(e).top,
        s = {
            element: e,
            placeholder: t,
            offsetParent: i,
            top: "auto" == r ? 0 : r
        };
        e.style.position = n,
        f.push(s)
    }
    function d(e) {
        var t = f.map(function(e) {
            return e.element
        }).indexOf(e);
        f.splice(t, 1)
    }
    var h = !1,
    f = [];
    e.observe(".js-sticky", {
        add: function() {
            l(this),
            r(),
            t()
        },
        remove: function() {
            d(this),
            t()
        }
    })
}),
define("github/sudo-required", ["./jquery", "./observe", "./sudo"],
function(e, t, n) {
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function r(e) {
        a || (e.preventDefault(), e.stopImmediatePropagation(), o["default"]().then(function() {
            a = !0,
            s["default"](e.target)[e.type](),
            a = !1
        }))
    }
    var s = i(e),
    o = i(n),
    a = !1;
    t.observe("a.js-sudo-required", {
        add: function() {
            s["default"](this).on("click", r)
        },
        remove: function() {
            s["default"](this).off("click", r)
        }
    }),
    t.observe("form.js-sudo-required", {
        add: function() {
            s["default"](this).on("submit", r)
        },
        remove: function() {
            s["default"](this).off("submit", r)
        }
    })
}),
define("github/toggler", ["./jquery", "delegated-events"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var i = n(e);
    t.on("click", ".js-toggler-container .js-toggler-target",
    function(e) {
        if (1 === e.which) {
            var t = this.closest(".js-toggler-container");
            t.classList.toggle("on")
        }
    }),
    i["default"](document).on("ajaxSend", ".js-toggler-container",
    function() {
        this.classList.remove("success", "error"),
        this.classList.add("loading")
    }),
    i["default"](document).on("ajaxComplete", ".js-toggler-container",
    function() {
        this.classList.remove("loading")
    }),
    i["default"](document).on("ajaxSuccess", ".js-toggler-container",
    function() {
        this.classList.add("success")
    }),
    i["default"](document).on("ajaxError", ".js-toggler-container",
    function() {
        this.classList.add("error")
    })
}),
define.amd = "jstimezonedetect",
function(e) {
    var t = function() {
        "use strict";
        var e = "s",
        n = {
            DAY: 864e5,
            HOUR: 36e5,
            MINUTE: 6e4,
            SECOND: 1e3,
            BASELINE_YEAR: 2014,
            MAX_SCORE: 864e6,
            AMBIGUITIES: {
                "America/Denver": ["America/Mazatlan"],
                "Europe/London": ["Africa/Casablanca"],
                "America/Chicago": ["America/Mexico_City"],
                "America/Asuncion": ["America/Campo_Grande", "America/Santiago"],
                "America/Montevideo": ["America/Sao_Paulo", "America/Santiago"],
                "Asia/Beirut": ["Asia/Amman", "Asia/Jerusalem", "Europe/Helsinki", "Asia/Damascus", "Africa/Cairo", "Asia/Gaza", "Europe/Minsk"],
                "Pacific/Auckland": ["Pacific/Fiji"],
                "America/Los_Angeles": ["America/Santa_Isabel"],
                "America/New_York": ["America/Havana"],
                "America/Halifax": ["America/Goose_Bay"],
                "America/Godthab": ["America/Miquelon"],
                "Asia/Dubai": ["Asia/Yerevan"],
                "Asia/Jakarta": ["Asia/Krasnoyarsk"],
                "Asia/Shanghai": ["Asia/Irkutsk", "Australia/Perth"],
                "Australia/Sydney": ["Australia/Lord_Howe"],
                "Asia/Tokyo": ["Asia/Yakutsk"],
                "Asia/Dhaka": ["Asia/Omsk"],
                "Asia/Baku": ["Asia/Yerevan"],
                "Australia/Brisbane": ["Asia/Vladivostok"],
                "Pacific/Noumea": ["Asia/Vladivostok"],
                "Pacific/Majuro": ["Asia/Kamchatka", "Pacific/Fiji"],
                "Pacific/Tongatapu": ["Pacific/Apia"],
                "Asia/Baghdad": ["Europe/Minsk", "Europe/Moscow"],
                "Asia/Karachi": ["Asia/Yekaterinburg"],
                "Africa/Johannesburg": ["Asia/Gaza", "Africa/Cairo"]
            }
        },
        i = function(e) {
            var t = -e.getTimezoneOffset();
            return null !== t ? t: 0
        },
        r = function() {
            var t = i(new Date(n.BASELINE_YEAR, 0, 2)),
            r = i(new Date(n.BASELINE_YEAR, 5, 2)),
            s = t - r;
            return 0 > s ? t + ",1": s > 0 ? r + ",1," + e: t + ",0"
        },
        s = function() {
            var e, t;
            if ("undefined" != typeof Intl && "undefined" != typeof Intl.DateTimeFormat && (e = Intl.DateTimeFormat(), "undefined" != typeof e && "undefined" != typeof e.resolvedOptions)) return t = e.resolvedOptions().timeZone,
            t && (t.indexOf("/") > -1 || "UTC" === t) ? t: void 0
        },
        o = function(e) {
            for (var t = new Date(e, 0, 1, 0, 0, 1, 0).getTime(), n = new Date(e, 12, 31, 23, 59, 59).getTime(), i = t, r = new Date(i).getTimezoneOffset(), s = null, o = null; n - 864e5 > i;) {
                var u = new Date(i),
                c = u.getTimezoneOffset();
                c !== r && (r > c && (s = u), c > r && (o = u), r = c),
                i += 864e5
            }
            return s && o ? {
                s: a(s).getTime(),
                e: a(o).getTime()
            }: !1
        },
        a = function h(e, t, i) {
            "undefined" == typeof t && (t = n.DAY, i = n.HOUR);
            for (var r = new Date(e.getTime() - t).getTime(), s = e.getTime() + t, o = new Date(r).getTimezoneOffset(), a = r, u = null; s - i > a;) {
                var c = new Date(a),
                l = c.getTimezoneOffset();
                if (l !== o) {
                    u = c;
                    break
                }
                a += i
            }
            return t === n.DAY ? h(u, n.HOUR, n.MINUTE) : t === n.HOUR ? h(u, n.MINUTE, n.SECOND) : u
        },
        u = function(e, t, n, i) {
            if ("N/A" !== n) return n;
            if ("Asia/Beirut" === t) {
                if ("Africa/Cairo" === i.name && 13983768e5 === e[6].s && 14116788e5 === e[6].e) return 0;
                if ("Asia/Jerusalem" === i.name && 13959648e5 === e[6].s && 14118588e5 === e[6].e) return 0
            } else if ("America/Santiago" === t) {
                if ("America/Asuncion" === i.name && 14124816e5 === e[6].s && 1397358e6 === e[6].e) return 0;
                if ("America/Campo_Grande" === i.name && 14136912e5 === e[6].s && 13925196e5 === e[6].e) return 0
            } else if ("America/Montevideo" === t) {
                if ("America/Sao_Paulo" === i.name && 14136876e5 === e[6].s && 1392516e6 === e[6].e) return 0
            } else if ("Pacific/Auckland" === t && "Pacific/Fiji" === i.name && 14142456e5 === e[6].s && 13961016e5 === e[6].e) return 0;
            return n
        },
        c = function(e, i) {
            for (var r = function(t) {
                for (var r = 0,
                s = 0; s < e.length; s++) if (t.rules[s] && e[s]) {
                    if (! (e[s].s >= t.rules[s].s && e[s].e <= t.rules[s].e)) {
                        r = "N/A";
                        break
                    }
                    if (r = 0, r += Math.abs(e[s].s - t.rules[s].s), r += Math.abs(t.rules[s].e - e[s].e), r > n.MAX_SCORE) {
                        r = "N/A";
                        break
                    }
                }
                return r = u(e, i, r, t)
            },
            s = {},
            o = t.olson.dst_rules.zones, a = o.length, c = n.AMBIGUITIES[i], l = 0; a > l; l++) {
                var d = o[l],
                h = r(o[l]);
                "N/A" !== h && (s[d.name] = h)
            }
            for (var f in s) if (s.hasOwnProperty(f)) for (var m = 0; m < c.length; m++) if (c[m] === f) return f;
            return i
        },
        l = function(e) {
            var n = function() {
                for (var e = [], n = 0; n < t.olson.dst_rules.years.length; n++) {
                    var i = o(t.olson.dst_rules.years[n]);
                    e.push(i)
                }
                return e
            },
            i = function(e) {
                for (var t = 0; t < e.length; t++) if (e[t] !== !1) return ! 0;
                return ! 1
            },
            r = n(),
            s = i(r);
            return s ? c(r, e) : e
        },
        d = function() {
            var e = s();
            return e || (e = t.olson.timezones[r()], "undefined" != typeof n.AMBIGUITIES[e] && (e = l(e))),
            {
                name: function() {
                    return e
                }
            }
        };
        return {
            determine: d
        }
    } ();
    t.olson = t.olson || {},
    t.olson.timezones = {
        "-720,0": "Etc/GMT+12",
        "-660,0": "Pacific/Pago_Pago",
        "-660,1,s": "Pacific/Apia",
        "-600,1": "America/Adak",
        "-600,0": "Pacific/Honolulu",
        "-570,0": "Pacific/Marquesas",
        "-540,0": "Pacific/Gambier",
        "-540,1": "America/Anchorage",
        "-480,1": "America/Los_Angeles",
        "-480,0": "Pacific/Pitcairn",
        "-420,0": "America/Phoenix",
        "-420,1": "America/Denver",
        "-360,0": "America/Guatemala",
        "-360,1": "America/Chicago",
        "-360,1,s": "Pacific/Easter",
        "-300,0": "America/Bogota",
        "-300,1": "America/New_York",
        "-270,0": "America/Caracas",
        "-240,1": "America/Halifax",
        "-240,0": "America/Santo_Domingo",
        "-240,1,s": "America/Asuncion",
        "-210,1": "America/St_Johns",
        "-180,1": "America/Godthab",
        "-180,0": "America/Argentina/Buenos_Aires",
        "-180,1,s": "America/Montevideo",
        "-120,0": "America/Noronha",
        "-120,1": "America/Noronha",
        "-60,1": "Atlantic/Azores",
        "-60,0": "Atlantic/Cape_Verde",
        "0,0": "UTC",
        "0,1": "Europe/London",
        "60,1": "Europe/Berlin",
        "60,0": "Africa/Lagos",
        "60,1,s": "Africa/Windhoek",
        "120,1": "Asia/Beirut",
        "120,0": "Africa/Johannesburg",
        "180,0": "Asia/Baghdad",
        "180,1": "Europe/Moscow",
        "210,1": "Asia/Tehran",
        "240,0": "Asia/Dubai",
        "240,1": "Asia/Baku",
        "270,0": "Asia/Kabul",
        "300,1": "Asia/Yekaterinburg",
        "300,0": "Asia/Karachi",
        "330,0": "Asia/Kolkata",
        "345,0": "Asia/Kathmandu",
        "360,0": "Asia/Dhaka",
        "360,1": "Asia/Omsk",
        "390,0": "Asia/Rangoon",
        "420,1": "Asia/Krasnoyarsk",
        "420,0": "Asia/Jakarta",
        "480,0": "Asia/Shanghai",
        "480,1": "Asia/Irkutsk",
        "525,0": "Australia/Eucla",
        "525,1,s": "Australia/Eucla",
        "540,1": "Asia/Yakutsk",
        "540,0": "Asia/Tokyo",
        "570,0": "Australia/Darwin",
        "570,1,s": "Australia/Adelaide",
        "600,0": "Australia/Brisbane",
        "600,1": "Asia/Vladivostok",
        "600,1,s": "Australia/Sydney",
        "630,1,s": "Australia/Lord_Howe",
        "660,1": "Asia/Kamchatka",
        "660,0": "Pacific/Noumea",
        "690,0": "Pacific/Norfolk",
        "720,1,s": "Pacific/Auckland",
        "720,0": "Pacific/Majuro",
        "765,1,s": "Pacific/Chatham",
        "780,0": "Pacific/Tongatapu",
        "780,1,s": "Pacific/Apia",
        "840,0": "Pacific/Kiritimati"
    },
    t.olson.dst_rules = {
        years: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        zones: [{
            name: "Africa/Cairo",
            rules: [{
                e: 12199572e5,
                s: 12090744e5
            },
            {
                e: 1250802e6,
                s: 1240524e6
            },
            {
                e: 12858804e5,
                s: 12840696e5
            },
            !1, !1, !1, {
                e: 14116788e5,
                s: 1406844e6
            }]
        },
        {
            name: "Africa/Casablanca",
            rules: [{
                e: 12202236e5,
                s: 12122784e5
            },
            {
                e: 12508092e5,
                s: 12438144e5
            },
            {
                e: 1281222e6,
                s: 12727584e5
            },
            {
                e: 13120668e5,
                s: 13017888e5
            },
            {
                e: 13489704e5,
                s: 1345428e6
            },
            {
                e: 13828392e5,
                s: 13761e8
            },
            {
                e: 14142888e5,
                s: 14069448e5
            }]
        },
        {
            name: "America/Asuncion",
            rules: [{
                e: 12050316e5,
                s: 12243888e5
            },
            {
                e: 12364812e5,
                s: 12558384e5
            },
            {
                e: 12709548e5,
                s: 12860784e5
            },
            {
                e: 13024044e5,
                s: 1317528e6
            },
            {
                e: 1333854e6,
                s: 13495824e5
            },
            {
                e: 1364094e6,
                s: 1381032e6
            },
            {
                e: 13955436e5,
                s: 14124816e5
            }]
        },
        {
            name: "America/Campo_Grande",
            rules: [{
                e: 12032172e5,
                s: 12243888e5
            },
            {
                e: 12346668e5,
                s: 12558384e5
            },
            {
                e: 12667212e5,
                s: 1287288e6
            },
            {
                e: 12981708e5,
                s: 13187376e5
            },
            {
                e: 13302252e5,
                s: 1350792e6
            },
            {
                e: 136107e7,
                s: 13822416e5
            },
            {
                e: 13925196e5,
                s: 14136912e5
            }]
        },
        {
            name: "America/Goose_Bay",
            rules: [{
                e: 122559486e4,
                s: 120503526e4
            },
            {
                e: 125704446e4,
                s: 123648486e4
            },
            {
                e: 128909886e4,
                s: 126853926e4
            },
            {
                e: 13205556e5,
                s: 129998886e4
            },
            {
                e: 13520052e5,
                s: 13314456e5
            },
            {
                e: 13834548e5,
                s: 13628952e5
            },
            {
                e: 14149044e5,
                s: 13943448e5
            }]
        },
        {
            name: "America/Havana",
            rules: [{
                e: 12249972e5,
                s: 12056436e5
            },
            {
                e: 12564468e5,
                s: 12364884e5
            },
            {
                e: 12885012e5,
                s: 12685428e5
            },
            {
                e: 13211604e5,
                s: 13005972e5
            },
            {
                e: 13520052e5,
                s: 13332564e5
            },
            {
                e: 13834548e5,
                s: 13628916e5
            },
            {
                e: 14149044e5,
                s: 13943412e5
            }]
        },
        {
            name: "America/Mazatlan",
            rules: [{
                e: 1225008e6,
                s: 12074724e5
            },
            {
                e: 12564576e5,
                s: 1238922e6
            },
            {
                e: 1288512e6,
                s: 12703716e5
            },
            {
                e: 13199616e5,
                s: 13018212e5
            },
            {
                e: 13514112e5,
                s: 13332708e5
            },
            {
                e: 13828608e5,
                s: 13653252e5
            },
            {
                e: 14143104e5,
                s: 13967748e5
            }]
        },
        {
            name: "America/Mexico_City",
            rules: [{
                e: 12250044e5,
                s: 12074688e5
            },
            {
                e: 1256454e6,
                s: 12389184e5
            },
            {
                e: 12885084e5,
                s: 1270368e6
            },
            {
                e: 1319958e6,
                s: 13018176e5
            },
            {
                e: 13514076e5,
                s: 13332672e5
            },
            {
                e: 13828572e5,
                s: 13653216e5
            },
            {
                e: 14143068e5,
                s: 13967712e5
            }]
        },
        {
            name: "America/Miquelon",
            rules: [{
                e: 12255984e5,
                s: 12050388e5
            },
            {
                e: 1257048e6,
                s: 12364884e5
            },
            {
                e: 12891024e5,
                s: 12685428e5
            },
            {
                e: 1320552e6,
                s: 12999924e5
            },
            {
                e: 13520016e5,
                s: 1331442e6
            },
            {
                e: 13834512e5,
                s: 13628916e5
            },
            {
                e: 14149008e5,
                s: 13943412e5
            }]
        },
        {
            name: "America/Santa_Isabel",
            rules: [{
                e: 12250116e5,
                s: 1207476e6
            },
            {
                e: 12564612e5,
                s: 12389256e5
            },
            {
                e: 12885156e5,
                s: 12703752e5
            },
            {
                e: 13199652e5,
                s: 13018248e5
            },
            {
                e: 13514148e5,
                s: 13332744e5
            },
            {
                e: 13828644e5,
                s: 13653288e5
            },
            {
                e: 1414314e6,
                s: 13967784e5
            }]
        },
        {
            name: "America/Santiago",
            rules: [{
                e: 1206846e6,
                s: 1223784e6
            },
            {
                e: 1237086e6,
                s: 12552336e5
            },
            {
                e: 127035e7,
                s: 12866832e5
            },
            {
                e: 13048236e5,
                s: 13138992e5
            },
            {
                e: 13356684e5,
                s: 13465584e5
            },
            {
                e: 1367118e6,
                s: 13786128e5
            },
            {
                e: 13985676e5,
                s: 14100624e5
            }]
        },
        {
            name: "America/Sao_Paulo",
            rules: [{
                e: 12032136e5,
                s: 12243852e5
            },
            {
                e: 12346632e5,
                s: 12558348e5
            },
            {
                e: 12667176e5,
                s: 12872844e5
            },
            {
                e: 12981672e5,
                s: 1318734e6
            },
            {
                e: 13302216e5,
                s: 13507884e5
            },
            {
                e: 13610664e5,
                s: 1382238e6
            },
            {
                e: 1392516e6,
                s: 14136876e5
            }]
        },
        {
            name: "Asia/Amman",
            rules: [{
                e: 1225404e6,
                s: 12066552e5
            },
            {
                e: 12568536e5,
                s: 12381048e5
            },
            {
                e: 12883032e5,
                s: 12695544e5
            },
            {
                e: 13197528e5,
                s: 13016088e5
            },
            !1, !1, {
                e: 14147064e5,
                s: 13959576e5
            }]
        },
        {
            name: "Asia/Damascus",
            rules: [{
                e: 12254868e5,
                s: 120726e7
            },
            {
                e: 125685e7,
                s: 12381048e5
            },
            {
                e: 12882996e5,
                s: 12701592e5
            },
            {
                e: 13197492e5,
                s: 13016088e5
            },
            {
                e: 13511988e5,
                s: 13330584e5
            },
            {
                e: 13826484e5,
                s: 1364508e6
            },
            {
                e: 14147028e5,
                s: 13959576e5
            }]
        },
        {
            name: "Asia/Dubai",
            rules: [!1, !1, !1, !1, !1, !1, !1]
        },
        {
            name: "Asia/Gaza",
            rules: [{
                e: 12199572e5,
                s: 12066552e5
            },
            {
                e: 12520152e5,
                s: 12381048e5
            },
            {
                e: 1281474e6,
                s: 126964086e4
            },
            {
                e: 1312146e6,
                s: 130160886e4
            },
            {
                e: 13481784e5,
                s: 13330584e5
            },
            {
                e: 13802292e5,
                s: 1364508e6
            },
            {
                e: 1414098e6,
                s: 13959576e5
            }]
        },
        {
            name: "Asia/Irkutsk",
            rules: [{
                e: 12249576e5,
                s: 12068136e5
            },
            {
                e: 12564072e5,
                s: 12382632e5
            },
            {
                e: 12884616e5,
                s: 12697128e5
            },
            !1, !1, !1, !1]
        },
        {
            name: "Asia/Jerusalem",
            rules: [{
                e: 12231612e5,
                s: 12066624e5
            },
            {
                e: 1254006e6,
                s: 1238112e6
            },
            {
                e: 1284246e6,
                s: 12695616e5
            },
            {
                e: 131751e7,
                s: 1301616e6
            },
            {
                e: 13483548e5,
                s: 13330656e5
            },
            {
                e: 13828284e5,
                s: 13645152e5
            },
            {
                e: 1414278e6,
                s: 13959648e5
            }]
        },
        {
            name: "Asia/Kamchatka",
            rules: [{
                e: 12249432e5,
                s: 12067992e5
            },
            {
                e: 12563928e5,
                s: 12382488e5
            },
            {
                e: 12884508e5,
                s: 12696984e5
            },
            !1, !1, !1, !1]
        },
        {
            name: "Asia/Krasnoyarsk",
            rules: [{
                e: 12249612e5,
                s: 12068172e5
            },
            {
                e: 12564108e5,
                s: 12382668e5
            },
            {
                e: 12884652e5,
                s: 12697164e5
            },
            !1, !1, !1, !1]
        },
        {
            name: "Asia/Omsk",
            rules: [{
                e: 12249648e5,
                s: 12068208e5
            },
            {
                e: 12564144e5,
                s: 12382704e5
            },
            {
                e: 12884688e5,
                s: 126972e7
            },
            !1, !1, !1, !1]
        },
        {
            name: "Asia/Vladivostok",
            rules: [{
                e: 12249504e5,
                s: 12068064e5
            },
            {
                e: 12564e8,
                s: 1238256e6
            },
            {
                e: 12884544e5,
                s: 12697056e5
            },
            !1, !1, !1, !1]
        },
        {
            name: "Asia/Yakutsk",
            rules: [{
                e: 1224954e6,
                s: 120681e7
            },
            {
                e: 12564036e5,
                s: 12382596e5
            },
            {
                e: 1288458e6,
                s: 12697092e5
            },
            !1, !1, !1, !1]
        },
        {
            name: "Asia/Yekaterinburg",
            rules: [{
                e: 12249684e5,
                s: 12068244e5
            },
            {
                e: 1256418e6,
                s: 1238274e6
            },
            {
                e: 12884724e5,
                s: 12697236e5
            },
            !1, !1, !1, !1]
        },
        {
            name: "Asia/Yerevan",
            rules: [{
                e: 1224972e6,
                s: 1206828e6
            },
            {
                e: 12564216e5,
                s: 12382776e5
            },
            {
                e: 1288476e6,
                s: 12697272e5
            },
            {
                e: 13199256e5,
                s: 13011768e5
            },
            !1, !1, !1]
        },
        {
            name: "Australia/Lord_Howe",
            rules: [{
                e: 12074076e5,
                s: 12231342e5
            },
            {
                e: 12388572e5,
                s: 12545838e5
            },
            {
                e: 12703068e5,
                s: 12860334e5
            },
            {
                e: 13017564e5,
                s: 1317483e6
            },
            {
                e: 1333206e6,
                s: 13495374e5
            },
            {
                e: 13652604e5,
                s: 1380987e6
            },
            {
                e: 139671e7,
                s: 14124366e5
            }]
        },
        {
            name: "Australia/Perth",
            rules: [{
                e: 12068136e5,
                s: 12249576e5
            },
            !1, !1, !1, !1, !1, !1]
        },
        {
            name: "Europe/Helsinki",
            rules: [{
                e: 12249828e5,
                s: 12068388e5
            },
            {
                e: 12564324e5,
                s: 12382884e5
            },
            {
                e: 12884868e5,
                s: 1269738e6
            },
            {
                e: 13199364e5,
                s: 13011876e5
            },
            {
                e: 1351386e6,
                s: 13326372e5
            },
            {
                e: 13828356e5,
                s: 13646916e5
            },
            {
                e: 14142852e5,
                s: 13961412e5
            }]
        },
        {
            name: "Europe/Minsk",
            rules: [{
                e: 12249792e5,
                s: 12068352e5
            },
            {
                e: 12564288e5,
                s: 12382848e5
            },
            {
                e: 12884832e5,
                s: 12697344e5
            },
            !1, !1, !1, !1]
        },
        {
            name: "Europe/Moscow",
            rules: [{
                e: 12249756e5,
                s: 12068316e5
            },
            {
                e: 12564252e5,
                s: 12382812e5
            },
            {
                e: 12884796e5,
                s: 12697308e5
            },
            !1, !1, !1, !1]
        },
        {
            name: "Pacific/Apia",
            rules: [!1, !1, !1, {
                e: 13017528e5,
                s: 13168728e5
            },
            {
                e: 13332024e5,
                s: 13489272e5
            },
            {
                e: 13652568e5,
                s: 13803768e5
            },
            {
                e: 13967064e5,
                s: 14118264e5
            }]
        },
        {
            name: "Pacific/Fiji",
            rules: [!1, !1, {
                e: 12696984e5,
                s: 12878424e5
            },
            {
                e: 13271544e5,
                s: 1319292e6
            },
            {
                e: 1358604e6,
                s: 13507416e5
            },
            {
                e: 139005e7,
                s: 1382796e6
            },
            {
                e: 14215032e5,
                s: 14148504e5
            }]
        },
        {
            name: "Europe/London",
            rules: [{
                e: 12249828e5,
                s: 12068388e5
            },
            {
                e: 12564324e5,
                s: 12382884e5
            },
            {
                e: 12884868e5,
                s: 1269738e6
            },
            {
                e: 13199364e5,
                s: 13011876e5
            },
            {
                e: 1351386e6,
                s: 13326372e5
            },
            {
                e: 13828356e5,
                s: 13646916e5
            },
            {
                e: 14142852e5,
                s: 13961412e5
            }]
        }]
    },
    "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = t: "undefined" != typeof define && null !== define && null != define.amd ? define([],
    function() {
        return t
    }) : "undefined" == typeof e ? window.jstz = t: e.jstz = t
} (),
delete define.amd,
define("github/tz-cookie", ["jstimezonedetect", "./timezone"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var i = n(e),
    r = n(t),
    s = r["default"]() || i["default"].determine().name(),
    o = "https:" === location.protocol ? "secure": "";
    document.cookie = "tz=" + encodeURIComponent(s) + "; path=/; " + o
}),
define("github/u2f", ["exports"],
function(e) {
    function t() {
        for (var e = arguments.length,
        t = Array(e), n = 0; e > n; n++) t[n] = arguments[n];
        return new Promise(function(e, n) {
            var i; (i = window.u2f).sign.apply(i, t.concat([function(t) {
                if (null != t.errorCode && 0 !== t.errorCode) {
                    var i = new Error("Signing request failed");
                    i.code = t.errorCode,
                    n(i)
                } else e(t)
            }]))
        })
    }
    function n() {
        for (var e = arguments.length,
        t = Array(e), n = 0; e > n; n++) t[n] = arguments[n];
        return new Promise(function(e, n) {
            var i; (i = window.u2f).register.apply(i, t.concat([function(t) {
                if (null != t.errorCode && 0 !== t.errorCode) {
                    var i = new Error("Device registration failed");
                    i.code = t.errorCode,
                    n(i)
                } else e(t)
            }]))
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.u2fSign = t,
    e.u2fRegister = n
}),
define("github/u2f-auth-form", ["exports", "./u2f"],
function(e, t) {
    function n() {
        Array.from(document.querySelectorAll(".js-u2f-error")).forEach(function(e) {
            return e.classList.add("hidden")
        }),
        document.querySelector(".js-u2f-login-waiting").classList.remove("hidden");
        var e = document.querySelector(".js-u2f-auth-form"),
        n = e.querySelector(".js-u2f-auth-response"),
        i = e.getAttribute("data-app-id"),
        r = e.getAttribute("data-challenge"),
        s = JSON.parse(e.getAttribute("data-sign-requests"));
        t.u2fSign(i, r, s).then(function(t) {
            n.value = JSON.stringify(t),
            e.submit()
        })["catch"](function(e) {
            var t = ".js-u2f-auth-error";
            switch (e.code) {
            case 4:
                t = ".js-u2f-auth-not-registered-error";
                break;
            case 5:
                t = ".js-u2f-auth-timeout"
            }
            document.querySelector(t).classList.remove("hidden"),
            document.querySelector(".js-u2f-login-waiting").classList.add("hidden")
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.waitForDevice = n
}),
define("github/u2f-login", ["./feature-detection", "./observe", "delegated-events", "./u2f-auth-form"],
function(e, t, n, i) {
    function r(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var s = r(e);
    n.on("click", ".js-u2f-auth-retry",
    function() {
        i.waitForDevice()
    }),
    t.observe(".js-u2f-auth-form-body",
    function() {
        this.classList.toggle("unavailable", !s["default"].u2f),
        s["default"].u2f && i.waitForDevice()
    })
}),
define("github/u2f-settings", ["./jquery", "./feature-detection", "./fetch", "./observe", "delegated-events", "./u2f"],
function(e, t, n, i, r, s) {
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function a(e, t, n) {
        return null == n ? JSON.parse(e.getAttribute(t)) : void e.setAttribute(t, JSON.stringify(n))
    }
    function u(e) {
        var t = document.querySelector(".js-add-u2f-registration-form");
        return a(t, "data-sign-requests", e)
    }
    function c(e) {
        var t = document.querySelector(".js-add-u2f-registration-form");
        return a(t, "data-register-requests", e)
    }
    function l(e) {
        e.register_requests && c(e.register_requests),
        e.sign_requests && u(e.sign_requests)
    }
    function d(e) {
        var t = document.createElement("div");
        t.innerHTML = e;
        var n = t.firstChild;
        document.querySelector(".js-u2f-registrations").appendChild(n)
    }
    function h(e, t) {
        var n = document.querySelector(".js-new-u2f-registration");
        n.classList.add("is-showing-error"),
        n.classList.remove("is-sending"),
        Array.from(n.querySelectorAll(".js-u2f-error")).forEach(function(e) {
            return e.classList.add("hidden")
        });
        var i = n.querySelector(e);
        null != t && (i.textContent = t),
        i.classList.remove("hidden")
    }
    function f() {
        var e = document.querySelector(".js-new-u2f-registration");
        e.classList.remove("is-sending", "is-active"),
        document.querySelector(".js-u2f-registration-nickname-field").value = ""
    }
    function m(e) {
        var t = document.querySelector(".js-add-u2f-registration-form");
        t.elements.response.value = JSON.stringify(e),
        n.fetchJSON(t.action, {
            method: t.method,
            body: new FormData(t)
        }).then(function(e) {
            l(e),
            f(),
            d(e.registration)
        })["catch"](function(e) {
            e.response ? e.response.json().then(function(e) {
                l(e),
                h(".js-u2f-server-error", e.error)
            }) : h(".js-u2f-network-error")
        })
    }
    function p() {
        var e = document.querySelector(".js-new-u2f-registration");
        e.classList.add("is-sending"),
        e.classList.remove("is-showing-error");
        var t = document.querySelector(".js-add-u2f-registration-form"),
        n = t.getAttribute("data-app-id");
        s.u2fRegister(n, c(), u()).then(m)["catch"](function(e) {
            var t = ".js-u2f-other-error";
            switch (e.code) {
            case 4:
                t = ".js-u2f-registered-error";
                break;
            case 5:
                t = ".js-u2f-timeout-error"
            }
            h(t)
        })
    }
    var g = o(e),
    v = o(t);
    g["default"](document).on("ajaxSend", ".js-u2f-registration-delete",
    function() {
        this.closest(".js-u2f-registration").classList.add("is-sending")
    }),
    g["default"](document).on("ajaxSuccess", ".js-u2f-registration-delete",
    function(e, t) {
        l(t.responseJSON),
        this.closest(".js-u2f-registration").remove()
    }),
    r.on("click", ".js-add-u2f-registration-link",
    function() {
        var e = document.querySelector(".js-new-u2f-registration");
        e.classList.add("is-active"),
        e.classList.remove("is-showing-error");
        var t = document.querySelector(".js-u2f-registration-nickname-field");
        t.focus()
    }),
    r.on("click", ".js-u2f-register-retry",
    function() {
        p()
    }),
    r.on("submit", ".js-add-u2f-registration-form",
    function(e) {
        e.preventDefault(),
        p()
    }),
    i.observe(".js-u2f-box",
    function() {
        this.classList.toggle("available", v["default"].u2f)
    })
}),
define("github/has-interactions", ["exports"],
function(e) {
    function t(e) {
        return n(e) || r(e) || s(e) || o(e)
    }
    function n(e) {
        for (var t = e.querySelectorAll("input, textarea"), n = 0, i = t.length; i > n; n++) {
            var r = t[n];
            if (r.value !== r.defaultValue) return ! 0
        }
        return ! 1
    }
    function i(e) {
        if (1 !== e.nodeType) return ! 1;
        var t = e.nodeName.toLowerCase(),
        n = (e.getAttribute("type") || "").toLowerCase(),
        i = "input" === t && "submit" !== n && "reset" !== n;
        return "select" === t || "textarea" === t || i
    }
    function r(e) {
        var t = e.ownerDocument.activeElement;
        return i(t) && e === t || e.contains(t)
    }
    function s(e) {
        return e.matches(":active")
    }
    function o(e) {
        return e.closest(".is-dirty") || e.querySelector(".is-dirty") ? !0 : !1
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.hasInteractions = t,
    e.hasDirtyFields = n,
    e.hasFocus = r,
    e.hasMousedown = s,
    e.markedAsDirty = o
}),
define("github/not-scrolling", ["exports", "./normalized-event-timestamp", "./debounce", "./setimmediate"],
function(e, t, n, i) {
    function r(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function s(e) {
        return new Promise(function(n) {
            if (e === window && t.timeSinceTimestamp(u) > 500) return void a["default"](n);
            var i = o["default"](function() {
                e.removeEventListener("scroll", i, {
                    capture: !0,
                    passive: !0
                }),
                n()
            },
            500);
            e.addEventListener("scroll", i, {
                capture: !0,
                passive: !0
            }),
            i()
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = s;
    var o = r(n),
    a = r(i),
    u = 0;
    window.addEventListener("scroll",
    function(e) {
        u = t.normalizedTimestamp(e.timeStamp)
    },
    {
        capture: !0,
        passive: !0
    })
}),
define("github/preserve-position", ["exports", "jquery", "./not-scrolling"],
function(e, t, n) {
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function r(e) {
        return l["default"](window).then(function() {
            return o(s(), e)
        })
    }
    function s() {
        if (document.activeElement !== document.body) return document.activeElement;
        var e = document.querySelectorAll(":hover"),
        t = e.length;
        return t ? e[t - 1] : void 0
    }
    function o(e, t) {
        if (!e) return t();
        var n = a(e),
        i = t.call(e),
        r = u(n);
        if (r) {
            e = r.element;
            var s = r.top,
            o = r.left,
            l = e.getBoundingClientRect(),
            d = l.top,
            h = l.left;
            return c["default"](e).cumulativeScrollBy(h - o, d - s),
            i
        }
    }
    function a(e) {
        for (var t = []; e;) {
            var n = e.getBoundingClientRect(),
            i = n.top,
            r = n.left;
            t.push({
                element: e,
                top: i,
                left: r
            }),
            e = e.parentElement
        }
        return t
    }
    function u(e) {
        for (var t = 0,
        n = e.length; n > t; t++) {
            var i = e[t];
            if (c["default"].contains(document, i.element)) return i
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.preserveInteractivePosition = r,
    e.preservingScrollPosition = o;
    var c = i(t),
    l = i(n)
}),
define("github/xhr", ["exports"],
function(e) {
    function t(e) {
        return new Promise(function(t, n) {
            e.onload = function() {
                200 === e.status ? t(e.responseText) : n(new Error("XMLHttpRequest " + e.statusText))
            },
            e.onerror = n,
            e.send()
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.send = t
}),
define("github/updatable-content", ["exports", "./jquery", "./has-interactions", "./preserve-position", "./xhr"],
function(e, t, n, i, r) {
    function s(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e) {
        var t, i;
        return regeneratorRuntime.async(function(s) {
            for (;;) switch (s.prev = s.next) {
            case 0:
                if (!l.get(e)) {
                    s.next = 2;
                    break
                }
                return s.abrupt("return");
            case 2:
                return t = new XMLHttpRequest,
                t.open("GET", e.getAttribute("data-url")),
                t.setRequestHeader("Accept", "text/html"),
                t.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                l.set(e, t),
                s.prev = 7,
                s.next = 10,
                regeneratorRuntime.awrap(r.send(t));
            case 10:
                if (i = s.sent, !n.hasInteractions(e)) {
                    s.next = 13;
                    break
                }
                throw new Error("element had interactions");
            case 13:
                return s.abrupt("return", u(e, i));
            case 16:
                s.prev = 16,
                s.t0 = s["catch"](7),
                "XMLHttpRequest abort" !== s.t0.message && console.warn("Failed to update content", e, s.t0);
            case 19:
                return s.prev = 19,
                l["delete"](e),
                s.finish(19);
            case 22:
            case "end":
                return s.stop()
            }
        },
        null, this, [[7, 16, 19, 22]])
    }
    function a(e, t) {
        var n;
        return regeneratorRuntime.async(function(i) {
            for (;;) switch (i.prev = i.next) {
            case 0:
                return n = l.get(e),
                n && n.abort(),
                i.abrupt("return", u(e, t));
            case 3:
            case "end":
                return i.stop()
            }
        },
        null, this)
    }
    function u(e, t) {
        return i.preserveInteractivePosition(function() {
            var n = c["default"](c["default"].parseHTML(t.trim()));
            return c["default"](e).replaceWith(n),
            n
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.updateContent = o,
    e.replaceContent = a;
    var c = s(t),
    l = new WeakMap
}),
define("github/updatable-content-observer", ["./jquery", "./updatable-content"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var i = n(e);
    i["default"](document).on("socket:message", ".js-updatable-content",
    function(e) {
        this === e.target && t.updateContent(this)
    })
}),
define("github/upload/avatar", ["jquery", "../fetch", "delegated-events"],
function(e, t, n) {
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var r = i(e);
    n.on("upload:setup", ".js-upload-avatar-image",
    function(e) {
        var t = e.detail.policyRequest,
        n = this.getAttribute("data-alambic-organization"),
        i = this.getAttribute("data-alambic-owner-type"),
        r = this.getAttribute("data-alambic-owner-id");
        n && t.body.append("organization_id", n),
        i && t.body.append("owner_type", i),
        r && t.body.append("owner_id", r)
    }),
    n.on("upload:complete", ".js-upload-avatar-image",
    function(e) {
        var n = e.detail.result,
        i = "/settings/avatars/" + n.id;
        r["default"].facebox(function() {
            t.fetchText(i).then(r["default"].facebox)
        })
    })
}),
define("github/text", ["exports"],
function(e) {
    function t(e, t, n) {
        var i = e.value.substring(0, e.selectionEnd),
        r = e.value.substring(e.selectionEnd);
        i = i.replace(t, n),
        r = r.replace(t, n),
        e.value = i + r,
        e.selectionStart = i.length,
        e.selectionEnd = i.length
    }
    function n(e, t) {
        var n = e.selectionEnd,
        i = e.value.substring(0, n),
        r = e.value.substring(n),
        s = "" === e.value || i.match(/\n$/) ? "": "\n";
        e.value = i + s + t + r,
        e.selectionStart = n + t.length,
        e.selectionEnd = n + t.length
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.replaceText = t,
    e.insertText = n
}),
define("github/png-scanner", ["exports"],
function(e) {
    function t(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        return function(t, n, i) {
            return n && e(t.prototype, n),
            i && e(t, i),
            t
        }
    } (),
    i = 2303741511,
    r = 4,
    s = function() {
        function e(n) {
            t(this, e),
            this.dataview = new DataView(n),
            this.pos = 0
        }
        return n(e, null, [{
            key: "fromFile",
            value: function(t) {
                return new Promise(function(n, i) {
                    var r = new FileReader;
                    r.onload = function() {
                        n(new e(r.result))
                    },
                    r.onerror = function() {
                        i(r.error)
                    },
                    r.readAsArrayBuffer(t)
                })
            }
        }]),
        n(e, [{
            key: "advance",
            value: function(e) {
                return this.pos += e
            }
        },
        {
            key: "readInt",
            value: function(e) {
                var t = this.dataview["getUint" + 8 * e](this.pos);
                return this.advance(e),
                t
            }
        },
        {
            key: "readChar",
            value: function() {
                return this.readInt(1)
            }
        },
        {
            key: "readShort",
            value: function() {
                return this.readInt(2)
            }
        },
        {
            key: "readLong",
            value: function() {
                return this.readInt(4)
            }
        },
        {
            key: "readString",
            value: function(e) {
                for (var t = [], n = 0; e > n; n++) t.push(String.fromCharCode(this.readChar()));
                return t.join("")
            }
        },
        {
            key: "scan",
            value: function(e) {
                if (this.readLong() !== i) throw new Error("invalid PNG");
                for (this.advance(4);;) {
                    var t = this.readLong(),
                    n = this.readString(4),
                    s = this.pos + t + r;
                    if (e.call(this, n, t) === !1 || "IEND" === n) break;
                    this.pos = s
                }
            }
        }]),
        e
    } ();
    e["default"] = s
}),
define("github/image-dimensions", ["exports", "./png-scanner"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e) {
        if ("image/png" !== e.type) return Promise.resolve({});
        var t = e.slice(0, 10240, e.type);
        return r["default"].fromFile(t).then(function(e) {
            var t = {};
            return e.scan(function(e) {
                switch (e) {
                case "IHDR":
                    return t.width = this.readLong(),
                    void(t.height = this.readLong());
                case "pHYs":
                    var n = this.readLong(),
                    i = this.readLong(),
                    r = this.readChar(),
                    o = void 0;
                    return 1 === r && (o = s),
                    o && (t.ppi = Math.round((n + i) / 2 * o)),
                    !1;
                case "IDAT":
                    return ! 1
                }
            }),
            t
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = i;
    var r = n(t),
    s = .0254
}),
define("github/upload/markdown", ["delegated-events", "../text", "../image-dimensions", "../setimmediate"],
function(e, t, n, i) {
    function r(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function s(e) {
        return e.toLowerCase().replace(/[^a-z0-9\-_]+/gi, ".").replace(/\.{2,}/g, ".").replace(/^\.|\.$/gi, "")
    }
    function o(e) {
        var t = u(e) ? "!": "";
        return t + "[Uploading " + e.name + "\u2026]()"
    }
    function a(e) {
        return s(e).replace(/\.[^.]+$/, "").replace(/\./g, " ")
    }
    function u(e) {
        return ["image/gif", "image/png", "image/jpg", "image/jpeg"].indexOf(e.type) > -1
    }
    function c(e) {
        var t = e.split(".").pop().toLowerCase();
        return ["gif", "png", "jpg", "jpeg"].indexOf(t) > -1
    }
    var l = r(n),
    d = r(i),
    h = 144;
    e.on("upload:setup", ".js-upload-markdown-image",
    function(n) {
        var i = this.querySelector(".js-comment-field");
        t.insertText(i, o(n.detail.file) + "\n"),
        e.fire(this, "validation:change")
    }),
    e.on("upload:complete", ".js-upload-markdown-image",
    function(n) {
        function i(n) {
            var i = "[" + r.file.name + "](" + r.policy.asset.href + ")";
            if (u(r.file)) {
                var o = a(r.policy.asset.name),
                l = r.policy.asset.href;
                if (n && n.ppi === h) {
                    var d = Math.round(n.width / 2);
                    i = '<img width="' + d + '" alt="' + o + '" src="' + l + '">'
                } else i = "![" + o + "](" + l + ")"
            }
            t.replaceText(c, f, i),
            e.fire(s, "validation:field:change")
        }
        var r = n.detail,
        s = this,
        c = s.querySelector(".js-comment-field"),
        f = o(r.file);
        l["default"](r.file).then(i,
        function(e) {
            i(),
            d["default"](function() {
                throw e
            })
        })
    }),
    e.on("upload:error", ".js-upload-markdown-image",
    function(n) {
        var i = this.querySelector(".js-comment-field"),
        r = o(n.detail.file);
        t.replaceText(i, r, ""),
        e.fire(this, "validation:field:change")
    }),
    e.on("upload:invalid", ".js-upload-markdown-image",
    function(n) {
        var i = this.querySelector(".js-comment-field"),
        r = o(n.detail.file);
        t.replaceText(i, r, ""),
        e.fire(this, "validation:field:change")
    }),
    e.on("upload:drop:links", ".js-upload-markdown-image",
    function(e) {
        var n = this.querySelector(".js-comment-field");
        e.detail.links.forEach(function(e) {
            var i = c(e) ? "\n![](" + e + ")\n": e;
            t.insertText(n, i)
        })
    }),
    e.on("upload:drop:text", ".js-upload-markdown-image",
    function(e) {
        var n = this.querySelector(".js-comment-field");
        t.insertText(n, e.detail.text)
    })
}),
define("github/upload/release-file", ["delegated-events", "../setimmediate"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e) {
        return e.closest("form").querySelector("#release_id").value
    }
    var r = n(t);
    e.on("click", ".js-release-remove-file",
    function() {
        var e = this.closest(".js-release-file");
        e.classList.add("delete"),
        e.querySelector("input.destroy").value = "true"
    }),
    e.on("click", ".js-release-undo-remove-file",
    function() {
        var e = this.closest(".js-release-file");
        e.classList.remove("delete"),
        e.querySelector("input.destroy").value = ""
    });
    var s = [];
    e.on("release:saved", ".js-release-form",
    function() {
        r["default"](function() {
            s.forEach(function(e) {
                return e()
            }),
            s.length = 0
        });
        var e = 0;
        Array.from(this.querySelectorAll(".js-releases-field .js-release-file")).forEach(function(t) {
            t.classList.contains("delete") ? t.remove() : t.classList.contains("js-template") || e++
        });
        var t = this.querySelector(".js-releases-field");
        t.classList.toggle("not-populated", !e),
        t.classList.toggle("is-populated", e)
    }),
    e.on("upload:setup", ".js-upload-release-file",
    function(e) {
        function t() {
            r.body.append("release_id", i(a));
            var e = document.querySelectorAll(".js-releases-field .js-release-file.delete .id");
            if (e.length) {
                var t = Array.from(e).map(function(e) {
                    return e.value
                });
                r.body.append("deletion_candidates", t.join(","))
            }
        }
        var n = e.detail,
        r = n.policyRequest,
        o = n.preprocess,
        a = this;
        i(a) ? t() : (o.push(new Promise(function(e) {
            return s.push(e)
        }).then(t)), 1 === s.length && document.querySelector(".js-save-draft").click())
    }),
    e.on("upload:start", ".js-upload-release-file",
    function(e) {
        var t = e.detail.policy;
        this.querySelector(".js-upload-meter").classList.remove("hidden");
        var n = t.asset.replaced_asset;
        n && Array.from(document.querySelectorAll(".js-releases-field .js-release-file .id")).forEach(function(e) {
            Number(e.value) === n && e.closest(".js-release-file").remove()
        })
    }),
    e.on("upload:complete", ".js-upload-release-file",
    function(e) {
        var t = e.detail,
        n = t.policy,
        i = document.querySelector(".js-releases-field"),
        r = i.querySelector(".js-template").cloneNode(!0);
        r.classList.remove("template", "js-template"),
        r.querySelector("input.id").value = n.asset.id || t.result.id;
        var s = n.asset.name || n.asset.href.split("/").pop();
        Array.from(r.querySelectorAll(".filename")).forEach(function(e) {
            "INPUT" === e.tagName ? e.value = s: e.textContent = s
        });
        var o = n.asset.size ? "(" + (n.asset.size / 1048576).toFixed(2) + " MB)": "";
        r.querySelector(".filesize").textContent = o,
        i.appendChild(r),
        i.classList.remove("not-populated"),
        i.classList.add("is-populated"),
        this.querySelector(".js-upload-meter").classList.add("hidden")
    }),
    e.on("upload:progress", ".js-upload-release-file",
    function(e) {
        var t = this.querySelector(".js-upload-meter");
        t.style.width = e.detail.percent + "%"
    })
}),
define("github/once", ["exports"],
function(e) {
    function t(e, t, n) {
        function i() {
            e.removeEventListener(t, i),
            n.apply(this, arguments)
        }
        e.addEventListener(t, i)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = t
}),
define("github/upload/upload-manifest-file", ["../fetch", "jquery", "../observe", "delegated-events", "../once", "../pjax"],
function(e, t, n, i, r, s) {
    function o(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function a(e, t) {
        var n = e.closest(".js-upload-manifest-file-container"),
        i = n.querySelector(".js-upload-progress");
        i.classList.add("active"),
        e.classList.add("is-progress-bar");
        var r = i.querySelector(".js-upload-meter-text");
        r.querySelector(".js-upload-meter-range-start").textContent = t.batch.uploaded + 1,
        r.querySelector(".js-upload-meter-range-end").textContent = t.batch.size
    }
    function u(e) {
        e.classList.remove("is-progress-bar");
        var t = e.closest(".js-upload-manifest-file-container"),
        n = t.querySelector(".js-upload-progress");
        n.classList.remove("active");
        var i = t.querySelector(".js-upload-meter-text");
        i.querySelector(".js-upload-meter-filename").textContent = ""
    }
    function c(e) {
        return e._path ? e._path + "/" + e.name: e.name
    }
    function l() {
        u(this)
    }
    var d = o(t),
    h = o(r),
    f = o(s),
    m = [],
    p = new WeakMap;
    i.on("upload:drop:setup", ".js-upload-manifest-file",
    function(e) {
        var t = e.detail.files,
        n = parseInt(this.getAttribute("data-directory-upload-max-files"), 10);
        t.length > n && (e.preventDefault(), this.classList.add("is-too-many"))
    }),
    i.on("upload:drop:setup", ".js-upload-manifest-tree-view",
    function(e) {
        e.preventDefault();
        var t = e.detail.upload,
        n = document.querySelector("#js-repo-pjax-container");
        h["default"](n, "pjax:success",
        function() {
            t(this.querySelector(".js-uploadable-container"))
        });
        var i = this.getAttribute("data-drop-url");
        f["default"]({
            url: i,
            container: "#js-repo-pjax-container"
        })
    }),
    i.on("upload:setup", ".js-upload-manifest-file",
    function(t) {
        function n() {
            r.body.append("upload_manifest_id", p.get(o))
        }
        var i = t.detail,
        r = i.policyRequest,
        s = i.preprocess;
        a(this, t.detail);
        var o = this;
        if (p.get(o) ? n() : s.push(new Promise(function(e) {
            return m.push(e)
        }).then(n)), !(m.length > 1 || p.get(o))) {
            var u = this.closest(".js-upload-manifest-file-container").querySelector(".js-upload-manifest-form");
            e.fetchJSON(u.action, {
                method: u.method,
                body: new FormData(u)
            }).then(function(e) {
                var t = document.querySelector(".js-manifest-commit-form");
                t.elements.manifest_id.value = e.upload_manifest.id,
                p.set(o, e.upload_manifest.id),
                m.forEach(function(e) {
                    return e()
                }),
                m.length = 0
            })
        }
    }),
    i.on("upload:start", ".js-upload-manifest-file",
    function(e) {
        var t = e.detail,
        n = this.closest(".js-upload-manifest-file-container"),
        i = n.querySelector(".js-upload-progress"),
        r = i.querySelector(".js-upload-meter-text");
        r.querySelector(".js-upload-meter-range-start").textContent = t.batch.uploaded + 1,
        r.querySelector(".js-upload-meter-filename").textContent = c(t.file)
    }),
    i.on("upload:complete", ".js-upload-manifest-file",
    function(e) {
        var t = e.detail,
        n = document.querySelector(".js-manifest-commit-file-template"),
        i = n.rows[0].cloneNode(!0);
        i.querySelector(".name").textContent = c(t.file);
        var r = t.policy.asset.id || t.result.id;
        i.querySelector(".js-remove-manifest-file-form").elements.file_id.value = r;
        var s = document.querySelector(".js-manifest-file-list");
        s.classList.remove("hidden"),
        this.classList.add("is-file-list");
        var o = document.querySelector(".js-upload-progress");
        o.classList.add("is-file-list");
        var a = s.querySelector(".js-manifest-file-list-root");
        a.appendChild(i),
        t.batch.isFinished() && u(this)
    }),
    i.on("upload:progress", ".js-upload-manifest-file",
    function(e) {
        var t = e.detail,
        n = this.closest(".js-upload-manifest-file-container"),
        i = n.querySelector(".js-upload-meter");
        i.style.width = t.batch.percent() + "%"
    }),
    i.on("upload:error", ".js-upload-manifest-file", l),
    i.on("upload:invalid", ".js-upload-manifest-file", l),
    d["default"](document).on("ajaxSuccess", ".js-remove-manifest-file-form",
    function() {
        var e = this.closest(".js-manifest-file-list-root");
        if (this.closest(".js-manifest-file-entry").remove(), !e.hasChildNodes()) {
            var t = e.closest(".js-manifest-file-list");
            t.classList.add("hidden");
            var n = document.querySelector(".js-upload-manifest-file");
            n.classList.remove("is-file-list");
            var i = document.querySelector(".js-upload-progress");
            i.classList.remove("is-file-list")
        }
    }),
    n.observe(".js-manifest-ready-check",
    function() {
        var t = this.getAttribute("data-redirect-url");
        e.fetchPoll(this.getAttribute("data-poll-url")).then(function() {
            window.location = t
        })["catch"](function() {
            document.querySelector(".js-manifest-ready-check").classList.add("hidden"),
            document.querySelector(".js-manifest-ready-check-failed").classList.remove("hidden")
        })
    })
}),
define("github/uploads", ["./fetch", "delegated-events", "./observe", "./upload/avatar", "./upload/markdown", "./upload/release-file", "./upload/upload-manifest-file"],
function(e, t, n) {
    function i(e) {
        return e.closest("form").elements.authenticity_token.value
    }
    function r(e, t) {
        var n; (n = e.classList).remove.apply(n, O),
        e.classList.add(t)
    }
    function s(n, i) {
        n.files.forEach(function(s) {
            var c = o(s, i),
            l = [];
            t.fire(i, "upload:setup", {
                batch: n,
                file: s,
                policyRequest: c,
                preprocess: l
            }) && Promise.all(l).then(function() {
                return e.fetchJSON(c.url, c)
            }).then(function(e) {
                var t = u(n, s, e, i);
                R.upload(s, t)
            })["catch"](function(e) {
                if (t.fire(i, "upload:invalid", {
                    batch: n,
                    file: s,
                    error: e
                }), e.response) e.response.text().then(function(t) {
                    var n = e.response.status,
                    o = a({
                        status: n,
                        body: t
                    },
                    s);
                    r(i, o)
                });
                else {
                    var o = a({
                        status: 0
                    });
                    r(i, o)
                }
            })
        })
    }
    function o(e, t) {
        var n = t.getAttribute("data-upload-policy-url"),
        r = t.getAttribute("data-upload-repository-id"),
        s = new FormData;
        return s.append("name", e.name),
        s.append("size", e.size),
        s.append("content_type", e.type),
        s.append("authenticity_token", i(t)),
        r && s.append("repository_id", r),
        e._path && s.append("directory", e._path),
        {
            url: n,
            method: "post",
            body: s,
            headers: {}
        }
    }
    function a(e, t) {
        if (400 === e.status) return "is-bad-file";
        if (422 !== e.status) return "is-failed";
        var n = JSON.parse(e.body);
        if (!n || !n.errors) return "is-failed";
        for (var i = 0,
        r = n.errors.length; r > i; i++) {
            var s = n.errors[i];
            switch (s.field) {
            case "size":
                var o = t ? t.size: null;
                return null != o && 0 === parseInt(o) ? "is-empty": "is-too-big";
            case "file_count":
                return "is-too-many";
            case "width":
            case "height":
                return "is-bad-dimensions";
            case "name":
                return "already_exists" === s.code ? "is-duplicate-filename": "is-bad-file";
            case "content_type":
                return "is-bad-file";
            case "uploader_id":
                return "is-bad-permissions";
            case "repository_id":
                return "is-repository-required"
            }
        }
        return "is-failed"
    }
    function u(n, s, o, u) {
        return {
            to: o.upload_url,
            form: o.form,
            header: o.header,
            sameOrigin: o.same_origin,
            csrf: i(u),
            start: function() {
                r(u, "is-uploading"),
                t.fire(u, "upload:start", {
                    batch: n,
                    file: s,
                    policy: o
                })
            },
            progress: function(e) {
                n.progress(s, e),
                t.fire(u, "upload:progress", {
                    batch: n,
                    file: s,
                    percent: e
                })
            },
            complete: function(a) {
                if (n.completed(s), a && a.href && (o.asset || (o.asset = {}), o.asset.href = a.href), o.asset_upload_url && o.asset_upload_url.length > 0) {
                    var c = new FormData;
                    c.append("authenticity_token", i(u)),
                    e.fetchJSON(o.asset_upload_url, {
                        method: "put",
                        body: c
                    })
                }
                t.fire(u, "upload:complete", {
                    batch: n,
                    file: s,
                    policy: o,
                    result: a
                }),
                r(u, "is-default")
            },
            error: function(e) {
                t.fire(u, "upload:error", {
                    batch: n,
                    file: s,
                    policy: o
                });
                var i = a(e);
                r(u, i)
            }
        }
    }
    function c(e) {
        return Array.from(e.types).indexOf("Files") >= 0
    }
    function l(e) {
        return Array.from(e.types).indexOf("text/uri-list") >= 0
    }
    function d(e) {
        return Array.from(e.types).indexOf("text/plain") >= 0
    }
    function h(e) {
        var t = [];
        return e.forEach(function(e) {
            Array.isArray(e) ? t = t.concat(h(e)) : t.push(e)
        }),
        t
    }
    function f(e) {
        return e.name.startsWith(".")
    }
    function m(e) {
        return Array.from(e).filter(function(e) {
            return ! f(e)
        })
    }
    function p(e, t) {
        return t.getFilesAndDirectories ? t.getFilesAndDirectories().then(function(e) {
            var n = m(e).map(function(e) {
                return p(t.path, e)
            });
            return Promise.all(n)
        }) : (t._path = e, t)
    }
    function g(e) {
        return p("", e).then(h)
    }
    function v(e) {
        return new Promise(function(t, n) {
            e.file(t, n)
        })
    }
    function b(e) {
        return new Promise(function(t, n) {
            e.createReader().readEntries(t, n)
        })
    }
    function y(e, t) {
        return t.isDirectory ? b(t).then(function(e) {
            var n = m(e).map(function(e) {
                return y(t.fullPath, e)
            });
            return Promise.all(n)
        }) : v(t).then(function(t) {
            return t._path = e,
            t
        })
    }
    function j(e) {
        return e.items && Array.from(e.items).some(function(e) {
            return e.webkitGetAsEntry && e.webkitGetAsEntry().isDirectory
        })
    }
    function w(e) {
        var t = Array.from(e.items).map(function(e) {
            return e.webkitGetAsEntry()
        }),
        n = m(t).map(function(e) {
            return y("", e)
        });
        return Promise.all(n).then(h)
    }
    function x(e, t) {
        var n = new z(e);
        s(n, t)
    }
    function q(e) {
        return c(e) ? "copy": l(e) ? "link": d(e) ? "copy": "none"
    }
    function k(e) {
        switch (e) {
        case "image/gif":
            return "image.gif";
        case "image/png":
            return "image.png";
        case "image/jpeg":
            return "image.jpg"
        }
    }
    function S(e) {
        e.preventDefault()
    }
    function L(e) {
        e.preventDefault()
    }
    function C(e) {
        var t = this;
        if (!$) {
            clearTimeout(F),
            F = setTimeout(function() {
                return t.classList.remove("dragover")
            },
            200);
            var n = q(e.dataTransfer);
            e.dataTransfer.dropEffect = n,
            this.classList.add("dragover"),
            e.stopPropagation(),
            e.preventDefault()
        }
    }
    function A(e) {
        e.dataTransfer.dropEffect = "none",
        this.classList.remove("dragover"),
        e.stopPropagation(),
        e.preventDefault()
    }
    function E(e) {
        e.target.classList && e.target.classList.contains("js-document-dropzone") && this.classList.remove("dragover")
    }
    function T(e) {
        var n = this;
        this.classList.remove("dragover"),
        document.body.classList.remove("dragover");
        var i = e.dataTransfer;
        if (c(i)) !
        function() {
            var e = null;
            e = n.hasAttribute("data-directory-upload") && i.getFilesAndDirectories ? g(i) : n.hasAttribute("data-directory-upload") && j(i) ? w(i) : Promise.resolve(m(i.files));
            var s = n;
            e.then(function(e) {
                if (!e.length) return void r(s, "is-hidden-file");
                var n = x.bind(null, e),
                i = !t.fire(s, "upload:drop:setup", {
                    upload: n,
                    files: e
                });
                i || x(e, s)
            })
        } ();
        else if (l(i)) {
            var s = (i.getData("text/uri-list") || "").split("\r\n");
            s.length && t.fire(this, "upload:drop:links", {
                links: s
            })
        } else d(i) && t.fire(this, "upload:drop:text", {
            text: i.getData("text/plain")
        });
        e.stopPropagation(),
        e.preventDefault()
    }
    function _(e) {
        if (e.clipboardData && e.clipboardData.items) {
            var t = Array.from(e.clipboardData.items).map(function(e) {
                return [e, k(e.type)]
            }).filter(function(e) {
                return e[1]
            }).shift();
            if (t) {
                var n = H(t, 2),
                i = n[0],
                r = n[1],
                s = i.getAsFile();
                s.name = r,
                x([s], this),
                e.preventDefault()
            }
        }
    }
    function D(e) {
        e.target.classList.contains("js-manual-file-chooser") && (x(e.target.files, this), e.target.value = "")
    }
    function M() {
        var e = this.querySelector(".js-uploadable-container");
        r(e, "is-default")
    }
    function P() {
        $ = !0
    }
    function N() {
        $ = !1
    }
    var H = function() {
        function e(e, t) {
            var n = [],
            i = !0,
            r = !1,
            s = void 0;
            try {
                for (var o, a = e[Symbol.iterator](); ! (i = (o = a.next()).done) && (n.push(o.value), !t || n.length !== t); i = !0);
            } catch(u) {
                r = !0,
                s = u
            } finally {
                try { ! i && a["return"] && a["return"]()
                } finally {
                    if (r) throw s
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    } (),
    I = function() {
        function e() {
            this.uploads = [],
            this.busy = !1
        }
        return e.prototype.upload = function(e, t) {
            function n() {}
            this.uploads.push({
                file: e,
                to: t.to,
                sameOrigin: t.sameOrigin,
                csrf: t.csrf,
                form: t.form || {},
                header: t.header || {},
                start: t.start || n,
                progress: t.progress || n,
                complete: t.complete || n,
                error: t.error || n
            }),
            this.process()
        },
        e.prototype.process = function() {
            var e = this;
            if (!this.busy && 0 !== this.uploads.length) {
                var t = this.uploads.shift();
                this.busy = !0;
                var n = new XMLHttpRequest;
                n.open("POST", t.to, !0);
                for (var i in t.header) n.setRequestHeader(i, t.header[i]);
                n.onloadstart = function() {
                    t.start()
                },
                n.onload = function() {
                    204 === n.status ? t.complete({}) : 201 === n.status ? t.complete(JSON.parse(n.responseText)) : t.error({
                        status: n.status,
                        body: n.responseText
                    }),
                    e.busy = !1,
                    e.process()
                },
                n.onerror = function() {
                    t.error({
                        status: 0,
                        body: ""
                    })
                },
                n.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var n = Math.round(e.loaded / e.total * 100);
                        t.progress(n)
                    }
                };
                var r = new FormData;
                t.sameOrigin && r.append("authenticity_token", t.csrf);
                for (var s in t.form) r.append(s, t.form[s]);
                r.append("file", t.file),
                n.send(r)
            }
        },
        e
    } (),
    O = ["is-default", "is-uploading", "is-bad-file", "is-duplicate-filename", "is-too-big", "is-too-many", "is-hidden-file", "is-failed", "is-bad-dimensions", "is-empty", "is-bad-permissions", "is-repository-required"],
    R = new I,
    z = function() {
        function e(e) {
            this.files = Array.from(e),
            this.percentages = this.files.map(function() {
                return 0;
            }),
            this.size = this.files.length,
            this.total = this.files.reduce(function(e, t) {
                return e + t.size
            },
            0),
            this.uploaded = 0
        }
        return e.prototype.percent = function() {
            var e = this,
            t = this.files.map(function(t, n) {
                return t.size * e.percentages[n] / 100
            }).reduce(function(e, t) {
                return e + t
            });
            return Math.round(t / this.total * 100)
        },
        e.prototype.progress = function(e, t) {
            var n = this.files.indexOf(e);
            return this.percentages[n] = t
        },
        e.prototype.completed = function() {
            return this.uploaded += 1
        },
        e.prototype.isFinished = function() {
            return this.uploaded === this.files.length
        },
        e
    } (),
    F = null,
    B = 0,
    $ = !1;
    n.observe(".js-document-dropzone", {
        add: function() {
            document.body.addEventListener("dragstart", P),
            document.body.addEventListener("dragend", N),
            document.body.addEventListener("dragenter", C),
            document.body.addEventListener("dragover", C),
            document.body.addEventListener("dragleave", E),
            this.addEventListener("drop", T)
        },
        remove: function() {
            document.body.removeEventListener("dragstart", P),
            document.body.removeEventListener("dragend", N),
            document.body.removeEventListener("dragenter", C),
            document.body.removeEventListener("dragover", C),
            document.body.removeEventListener("dragleave", E),
            this.removeEventListener("drop", T)
        }
    }),
    n.observe(".js-uploadable-container", {
        add: function() {
            0 === B++&&(document.addEventListener("drop", S), document.addEventListener("dragover", L)),
            this.addEventListener("dragenter", C),
            this.addEventListener("dragover", C),
            this.addEventListener("dragleave", A),
            this.addEventListener("drop", T),
            this.addEventListener("paste", _),
            this.addEventListener("change", D),
            this.closest("form").addEventListener("reset", M)
        },
        remove: function() {
            0 === --B && (document.removeEventListener("drop", S), document.removeEventListener("dragover", L)),
            this.removeEventListener("dragenter", C),
            this.removeEventListener("dragover", C),
            this.removeEventListener("dragleave", A),
            this.removeEventListener("drop", T),
            this.removeEventListener("paste", _),
            this.removeEventListener("change", D),
            this.closest("form").removeEventListener("reset", M)
        }
    })
}),
define("github-bootstrap", ["./github/dismiss-notice", "./github/feature-detection", "./github/fixed-offset-fragment-navigation-observer", "./github/gfm", "./github/git-clone-help", "./github/google-analytics-tracking", "./github/hash-change", "./github/homepage/play-video", "./github/jquery-event-error-context", "./github/link-prefetch-viewed", "./github/milestone-dragging", "./github/mobile-preference", "./github/pjax", "./github/pjax/capture-keypresses", "./github/pjax/history-navigate", "./github/pjax/link-prefetch", "./github/select-menu", "./github/sticky", "./github/sudo-required", "./github/toggler", "./github/tz-cookie", "./github/u2f-login", "./github/u2f-settings", "./github/updatable-content-observer", "./github/uploads"],
function() {}),
require("github-bootstrap"),
define("github/stats", ["exports", "./proxy-site-detection", "./document-ready"],
function(e, t, n) {
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function r() {
        var e = void 0;
        null == a && (a = null != (e = document.querySelector("meta[name=browser-stats-url]")) ? e.getAttribute("content") : void 0),
        a && (s["default"](document) || (u = null, window.fetch(a, {
            method: "post",
            body: JSON.stringify(c),
            headers: {
                "Content-Type": "application/json"
            }
        }), c = []))
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = function(e) {
        c.push(e),
        n.loaded.then(function() {
            null != u ? u: u = setTimeout(r, o)
        })
    };
    var s = i(t),
    o = 500,
    a = null,
    u = null,
    c = []
}),
function() {
    var e = require("github/stats")["default"],
    t = require("github/feature-detection")["default"];
    e({
        browserfeatures: {
            classlist_multi_arg: t.classListMultiArg,
            classlist: t.classList,
            closest: t.closest,
            custom_elements: t.registerElement,
            custom_event: t.CustomEvent,
            emoji: t.emoji,
            emoji_unicode_6: t.emojiUnicodeVersion >= 6,
            emoji_unicode_7: t.emojiUnicodeVersion >= 7,
            emoji_unicode_8: t.emojiUnicodeVersion >= 8,
            emoji_unicode_9: t.emojiUnicodeVersion >= 9,
            fetch: t.fetch,
            matches: t.matches,
            performance_getentries: t.performanceGetEntries,
            performance_mark: t.performanceMark,
            performance_now: t.performanceNow,
            promise: t.Promise,
            send_beacon: t.sendBeacon,
            string_ends_with: t.stringEndsWith,
            string_starts_with: t.stringStartsWith,
            timezone: t.timezone,
            url: t.URL,
            url_search_params: t.URLSearchParams,
            weakmap: t.WeakMap
        }
    })
} (),
function() {
    function e() {
        var e, n, r, s, o, a; (r = function() {
            try {
                return localStorage.getItem("bundle-urls")
            } catch(e) {}
        } ()) && (s = function() {
            try {
                return JSON.parse(r)
            } catch(e) {}
        } ()),
        null == s && (s = {}),
        a = t();
        try {
            localStorage.setItem("bundle-urls", JSON.stringify(a))
        } catch(u) {}
        return n = function() {
            var t;
            t = [];
            for (e in a) o = a[e],
            s[e] !== o && t.push(e);
            return t
        } (),
        n.length ? i({
            downloadedbundles: n
        }) : void 0
    }
    function t() {
        var e, t, i, r, s, o, a, u, c, l, d;
        for (d = {},
        u = n("script"), t = 0, r = u.length; r > t; t++) l = u[t],
        a = l.src.match(/\/([\w-]+)-[0-9a-f]{64}\.js$/),
        null != a && (e = a[1], d[e + ".js"] = l.src);
        for (c = n("link[rel=stylesheet]"), i = 0, s = c.length; s > i; i++) o = c[i],
        a = o.href.match(/\/([\w-]+)-[0-9a-f]{64}\.css$/),
        null != a && (e = a[1], d[e + ".css"] = o.href);
        return d
    }
    var n = require("github/jquery")["default"],
    i = require("github/stats")["default"];
    n(window).on("load", e)
} (),
function() {
    function e(e) {
        e.preventDefault(),
        e.stopPropagation()
    }
    var t = require("github/observe"),
    n = t.observe;
    n("a.btn.disabled", {
        add: function(t) {
            t.addEventListener("click", e)
        },
        remove: function(t) {
            t.removeEventListener("click", e)
        }
    })
} (),
function() {
    var e, t, n, i = require("github/jquery")["default"];
    e = function(e) {
        return i(e).closest(".js-check-all-container")[0] || document.body
    },
    t = function(e, t, n, r) {
        null == r && (r = !1),
        t.indeterminate = r,
        t.checked !== n && (t.checked = n, i(t).fire("change", {
            relatedTarget: e,
            async: !0
        }))
    },
    i(document).on("change", "input.js-check-all",
    function(n) {
        var r, s, o, a, u;
        if (!i(n.relatedTarget).is("input.js-check-all-item")) {
            for (r = i(e(this)), s = r.find("input.js-check-all-item"), o = 0, u = s.length; u > o; o++) a = s[o],
            t(this, a, this.checked);
            s.removeClass("is-last-changed")
        }
    }),
    n = null,
    i(document).on("mousedown", "input.js-check-all-item",
    function(e) {
        n = e.shiftKey
    }),
    i(document).on("change", "input.js-check-all-item",
    function(r) {
        var s, o, a, u, c, l, d, h, f, m, p, g, v, b, y, j;
        if (!i(r.relatedTarget).is("input.js-check-all, input.js-check-all-item")) {
            if (s = i(e(this)), a = s.find("input.js-check-all")[0], o = s.find("input.js-check-all-item"), n && (p = o.filter(".is-last-changed")[0])) for (u = o.toArray(), v = [u.indexOf(p), u.indexOf(this)].sort(), y = v[0], d = v[1], b = u.slice(y, +d + 1 || 9e9), h = 0, g = b.length; g > h; h++) m = b[h],
            t(this, m, this.checked);
            n = null,
            o.removeClass("is-last-changed"),
            i(this).addClass("is-last-changed"),
            j = o.length,
            l = function() {
                var e, t, n;
                for (n = [], e = 0, t = o.length; t > e; e++) m = o[e],
                m.checked && n.push(m);
                return n
            } ().length,
            c = l === j,
            f = j > l && l > 0,
            t(this, a, c, f)
        }
    }),
    i(document).on("change", "input.js-check-all-item",
    function() {
        var t, n, r;
        t = i(e(this)),
        n = t.find(".js-check-all-count"),
        n.length && (r = t.find("input.js-check-all-item:checked").length, n.text(r))
    })
}.call(this),
function() {
    function e(e) {
        var t = document.createElement("pre");
        return t.style.width = "1px",
        t.style.height = "1px",
        t.style.position = "fixed",
        t.style.top = "5px",
        t.textContent = e,
        t
    }
    function t(e) {
        var t = getSelection();
        t.removeAllRanges();
        var n = document.createRange();
        n.selectNodeContents(e),
        t.addRange(n),
        document.execCommand("copy"),
        t.removeAllRanges()
    }
    function n(n) {
        var i = e(n);
        document.body.appendChild(i),
        t(i),
        document.body.removeChild(i)
    }
    function i(e) {
        e.select(),
        document.execCommand("copy"),
        getSelection().removeAllRanges()
    }
    function r(e) {
        return "INPUT" === e.nodeName || "TEXTAREA" === e.nodeName
    }
    var s = require("github/jquery")["default"],
    o = require("github/observe"),
    a = o.observe,
    u = require("github/once")["default"],
    c = require("github/failbot"),
    l = c.reportError,
    d = require("github/inspect")["default"],
    h = require("zeroclipboard");
    if (s(document).on("click", ".is-copy-enabled .js-zeroclipboard",
    function() {
        var e = this.getAttribute("data-clipboard-text");
        if (e) n(e);
        else {
            var s = this.closest(".js-zeroclipboard-container"),
            o = s.querySelector(".js-zeroclipboard-target");
            r(o) ? "hidden" === o.type ? n(o.value) : i(o) : t(o)
        }
        var a = this.getAttribute("data-copied-hint"),
        c = this.getAttribute("aria-label");
        a && a !== c && (this.setAttribute("aria-label", a), u(this, "mouseleave",
        function() {
            null != c ? this.setAttribute("aria-label", c) : this.removeAttribute("aria-label")
        })),
        this.blur()
    }), !document.documentElement.classList.contains("is-copy-enabled")) {
        var f, m, p = null != (f = s("link[rel=assets]").prop("href")) ? f: "/";
        h.config({
            swfPath: p + "static/flash/ZeroClipboard.v" + h.version + ".swf",
            trustedOrigins: [location.hostname],
            flashLoadTimeout: 1e4,
            cacheBust: null != (m = /MSIE/.test(navigator.userAgent) || /Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/.test(navigator.userAgent)) ? m: {
                "true": !1
            }
        }),
        s(document).on("click", "#global-zeroclipboard-html-bridge",
        function(e) {
            e.stopImmediatePropagation()
        }),
        a("button.js-zeroclipboard",
        function(e) {
            var t, n, i;
            i = new h(e),
            i.on("copy",
            function(e) {
                var t, n, i, o, a;
                return t = e.target,
                null == t.getAttribute("data-clipboard-text") ? (o = s(t).closest(".js-zeroclipboard-container").find(".js-zeroclipboard-target")[0], o ? (a = r(o) ? o.value: o.textContent, n = e.clipboardData, n.setData("text/plain", a.trim())) : (i = new Error("source of clipboard text not found"), l(i, {
                    eventType: "copy",
                    eventTarget: d(t)
                }))) : void 0
            }),
            i.on("aftercopy",
            function() {
                var t;
                return t = s(this).attr("data-copied-hint"),
                s("#global-zeroclipboard-html-bridge").attr("aria-label", t || "Copied!"),
                e.blur()
            }),
            i.on("error",
            function() {
                return s("#global-zeroclipboard-html-bridge, .js-zeroclipboard").remove(),
                s(".js-zeroclipboard-container").addClass("has-zeroclipboard-disabled")
            }),
            n = function() {
                var e;
                return this.classList.remove("tooltipped", "tooltipped-s"),
                e = s(this).attr("aria-label"),
                s("#global-zeroclipboard-html-bridge").addClass("tooltipped tooltipped-s").attr("aria-label", e || "Copy to clipboard.")
            },
            t = function() {
                return s("#global-zeroclipboard-html-bridge").removeClass("tooltipped tooltipped-s")
            },
            s(e).hover(n, t)
        })
    }
} (),
function() {
    var e, t = require("github/jquery")["default"],
    n = require("github/updatable-content"),
    i = n.replaceContent;
    e = require("github/setimmediate")["default"],
    t(document).on("ajaxBeforeSend", ".js-new-comment-form",
    function(n) {
        return this === n.target && t(this).data("remote-xhr") ? (e(function() {
            throw new Error("canceled comment form submission")
        }), !1) : void 0
    }),
    t(document).on("ajaxSend", ".js-new-comment-form",
    function(e) {
        return this === e.target ? t(this).find(".js-comment-form-error").hide() : void 0
    }),
    t(document).on("ajaxSuccess", ".js-new-comment-form",
    function(e, n, r, s) {
        var o, a;
        if (this === e.target) {
            this.reset(),
            t(this).find(".js-resettable-field").each(function() {
                this.value = this.getAttribute("data-reset-value")
            }),
            t(this).find(".js-comment-field").trigger("validation:field:change"),
            t(this).find(".js-write-tab").click(),
            o = s.updateContent;
            for (a in o) {
                var u = o[a],
                c = document.querySelector(a);
                c ? i(c, u) : console.warn("couldn't find " + a + " for immediate update")
            }
        }
    }),
    t(document).on("ajaxError", ".js-new-comment-form",
    function(e, n) {
        var i, r;
        if (this === e.target) return r = "Sorry! We couldn't save your comment",
        422 === n.status && (i = JSON.parse(n.responseText), i.errors && (r += " \u2014 your comment ", r += " " + i.errors.join(", "))),
        r += ". ",
        r += "Please try again.",
        t(this).find(".js-comment-form-error").show().text(r),
        !1
    })
}.call(this),
function() {
    var e = require("github/observe"),
    t = e.observe;
    t(".js-comment-and-button",
    function() {
        function e() {
            var e = this.value.trim();
            e !== r && (r = e, t.textContent = e ? t.getAttribute("data-comment-text") : i)
        }
        var t = this,
        n = t.form.querySelector(".js-comment-field"),
        i = t.textContent,
        r = !1;
        return {
            add: function() {
                n.addEventListener("input", e),
                n.addEventListener("change", e)
            },
            remove: function() {
                n.removeEventListener("input", e),
                n.removeEventListener("change", e)
            }
        }
    })
} (),
function() {
    var e, t = require("github/jquery")["default"];
    e = require("github/has-interactions").hasDirtyFields,
    t(document).on("click", ".js-comment-edit-button",
    function() {
        var e;
        e = t(this).closest(".js-comment"),
        e.addClass("is-comment-editing"),
        e.find(".js-write-tab").click(),
        e.find(".js-comment-field").focus().trigger("change")
    }),
    t(document).on("click", ".js-comment-cancel-button",
    function() {
        var n, i, r, s, o;
        if (n = t(this).closest("form"), e(n[0]) && !confirm(t(this).attr("data-confirm-text"))) return ! 1;
        for (o = n.find("input, textarea"), r = 0, s = o.length; s > r; r++) i = o[r],
        i.value = i.defaultValue;
        return t(this).closest(".js-comment").removeClass("is-comment-editing"),
        !1
    }),
    t(document).on("ajaxSend", ".js-comment-delete, .js-comment-update, .js-issue-update",
    function(e, n) {
        var i;
        if (e.target === e.currentTarget) {
            i = t(this).closest(".js-comment"),
            i.addClass("is-comment-loading"),
            i.find(".btn-sm").addClass("disabled");
            var r = i.attr("data-body-version");
            return r ? n.setRequestHeader("X-Body-Version", r) : void 0
        }
    }),
    t(document).on("ajaxError", ".js-comment-update",
    function(e, n, i, r) {
        var s, o, a, u;
        if (e.target === e.currentTarget && (console.error("ajaxError for js-comment-update", r), 422 === n.status)) try {
            if (a = JSON.parse(n.responseText), s = t(this).closest(".js-comment"), a.stale) return n.stale = !0,
            s.addClass("is-comment-stale"),
            s.find(".btn-sm").addClass("disabled"),
            e.preventDefault();
            if (a.errors) return u = "There was an error posting your comment: " + a.errors.join(", "),
            s.find(".js-comment-update-error").text(u).show(),
            e.preventDefault()
        } catch(c) {
            return o = c,
            console.error("Error trying to handle ajaxError for js-comment-update: " + o)
        }
    }),
    t(document).on("ajaxComplete", ".js-comment-delete, .js-comment-update",
    function(e, n) {
        var i;
        if (e.target === e.currentTarget) return i = t(this).closest(".js-comment"),
        i.removeClass("is-comment-loading"),
        i.find(".btn-sm").removeClass("disabled"),
        n.stale ? i.find(".form-actions button[type=submit].btn-sm").addClass("disabled") : void 0
    }),
    t(document).on("ajaxSuccess", ".js-comment-delete",
    function() {
        var e, n;
        return e = t(this).closest(".js-comment"),
        n = t(this).closest(".js-comment-container"),
        1 !== n.find(".js-comment").length && (n = e),
        n.fadeOut(function() {
            return e.remove()
        })
    }),
    t(document).on("ajaxSuccess", ".js-comment-update",
    function(e, n, i, r) {
        var s, o, a, u, c, l;
        if (e.target === e.currentTarget) {
            for (s = t(this).closest(".js-comment"), o = t(this).closest(".js-comment-container"), o.length || (o = s), s.find(".js-comment-body").html(r.body), s.find(".js-comment-update-error").hide(), s.attr("data-body-version", r.newBodyVersion), l = s.find("input, textarea"), u = 0, c = l.length; c > u; u++) a = l[u],
            a.defaultValue = a.value;
            return s.removeClass("is-comment-editing")
        }
    }),
    t(document).on("ajaxSuccess", ".js-issue-update",
    function(e, t, n, i) {
        var r, s, o, a, u, c, l, d;
        for (o = this, r = o.closest(".js-details-container"), r.classList.remove("open"), null != i.issue_title && (r.querySelector(".js-issue-title").textContent = i.issue_title, u = r.closest(".js-issues-results"), l = u.querySelector(".js-merge-pull-request textarea"), l && l.value === l.defaultValue && (l.value = l.defaultValue = i.issue_title)), document.title = i.page_title, d = o.elements, a = 0, c = d.length; c > a; a++) s = d[a],
        s.defaultValue = s.value
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("focusin", ".js-write-bucket",
    function() {
        return e(this).addClass("focused")
    }),
    e(document).on("focusout", ".js-write-bucket",
    function() {
        return e(this).removeClass("focused")
    })
}.call(this),
function() {
    var e, t, n, i, r, s, o, a, u, c, l, d, h, f, m, p, g, v, b, y, j = require("github/jquery")["default"];
    h = require("github/observe").observe,
    i = require("delegated-events"),
    o = require("github/hotkey")["default"],
    u = function(e) {
        return e.trim().split("\n").length > 1
    },
    p = function(e, t) {
        return Array(t + 1).join(e)
    },
    y = function(e, t) {
        for (; e[t] && null != e[t - 1] && !e[t - 1].match(/\s/);) t--;
        return t
    },
    b = function(e, t) {
        for (; e[t] && !e[t].match(/\s/);) t++;
        return t
    },
    n = null,
    a = function(e, t) {
        var r, s, o, a, u, c;
        if (c = t.text, u = t.selectionStart, a = t.selectionEnd, o = e.selectionStart, null === n || n) {
            e.contenteditable = !0;
            try {
                n = document.execCommand("insertText", !1, c)
            } catch(l) {
                n = !1
            }
            e.contenteditable = !1
        }
        if (!n) {
            s = e.value.slice(0, e.selectionStart),
            r = e.value.slice(e.selectionEnd);
            try {
                document.execCommand("ms-beginUndoUnit")
            } catch(d) {}
            e.value = s + c + r;
            try {
                document.execCommand("ms-endUndoUnit")
            } catch(d) {}
            i.fire(e, "input")
        }
        return null != u && null != a ? e.setSelectionRange(u, a) : e.setSelectionRange(o, e.selectionEnd)
    },
    g = function(e, n) {
        var i, r;
        return r = e.value.slice(e.selectionStart, e.selectionEnd),
        i = n.orderedList ? m(e) : n.multiline && u(r) ? l(e, n) : t(e, n),
        a(e, i)
    },
    r = function(e, t, n) {
        var i, r, s, o;
        return e.selectionStart === e.selectionEnd ? (e.selectionStart = y(e.value, e.selectionStart), e.selectionEnd = b(e.value, e.selectionEnd)) : (o = e.selectionStart - t.length, s = e.selectionEnd + n.length, i = e.value.slice(o, e.selectionStart) === t, r = e.value.slice(e.selectionEnd, s) === n, i && r && (e.selectionStart = o, e.selectionEnd = s)),
        e.value.slice(e.selectionStart, e.selectionEnd)
    },
    d = function(e) {
        var t, n, i, r, s, o, a, u;
        return n = e.value.slice(0, e.selectionStart),
        t = e.value.slice(e.selectionEnd),
        r = null != (a = n.match(/\n*$/)) ? a[0].length: void 0,
        i = null != (u = t.match(/^\n*/)) ? u[0].length: void 0,
        n.match(/\S/) && 2 > r && (s = p("\n", 2 - r)),
        t.match(/\S/) && 2 > i && (o = p("\n", 2 - i)),
        null == s && (s = ""),
        null == o && (o = ""),
        {
            newlinesToAppend: s,
            newlinesToPrepend: o
        }
    },
    t = function(e, t) {
        var n, i, s, o, a, c, l, h, f, m, p, g, v, b, y, j, w, x, q, k, S, L;
        if (m = t.prefix, k = t.suffix, i = t.blockPrefix, s = t.blockSuffix, b = t.replaceNext, p = t.prefixSpace, j = t.scanFor, L = t.surroundWithNewlines, h = e.selectionStart, l = e.selectionEnd, w = e.value.slice(e.selectionStart, e.selectionEnd), g = u(w) && i.length > 0 ? i + "\n": m, S = u(w) && s.length > 0 ? "\n" + s: k, p && (n = e.value[e.selectionStart - 1], 0 === e.selectionStart || null == n || n.match(/\s/) || (g = " " + g)), w = r(e, g, S), q = e.selectionStart, x = e.selectionEnd, o = b.length > 0 && S.indexOf(b) > -1 && w.length > 0, L && (v = d(e), a = v.newlinesToAppend, c = v.newlinesToPrepend, g = a + m, S += c), w.startsWith(g) && w.endsWith(S)) return y = w.slice(g.length, w.length - S.length),
        h === l ? (f = h - g.length, f = Math.max(f, q), f = Math.min(f, q + y.length), q = x = f) : (q = q, x = q + y.length),
        {
            text: y,
            selectionStart: q,
            selectionEnd: x
        };
        if (o) return j.length > 0 && w.match(j) ? (S = S.replace(b, w), y = g + S, q = x = q + g.length, {
            text: y,
            selectionStart: q,
            selectionEnd: x
        }) : (y = g + w + S, q = q + g.length + w.length + S.indexOf(b), x = q + b.length, {
            text: y,
            selectionStart: q,
            selectionEnd: x
        });
        if (y = g + w + S, q = h + g.length, x = l + g.length, t.trimFirst) {
            var C = w.match(/^\s*|\s*$/g),
            A = C[0] || "",
            E = C[1] || "";
            y = A + g + w.trim() + S + E,
            q += A.length,
            x -= E.length
        }
        return {
            text: y,
            selectionStart: q,
            selectionEnd: x
        }
    },
    l = function(e, t) {
        var n, i, r, s, o, a, u, c, l, h, f, m, p;
        return o = t.prefix,
        l = t.suffix,
        h = t.surroundWithNewlines,
        f = e.value.slice(e.selectionStart, e.selectionEnd),
        c = e.selectionStart,
        u = e.selectionEnd,
        i = f.split("\n"),
        m = function() {
            var e, t, r;
            for (r = [], e = 0, t = i.length; t > e; e++) n = i[e],
            r.push(n.startsWith(o) && n.endsWith(l));
            return r
        } (),
        p = m.every(function(e) {
            return e
        }),
        p ? (f = function() {
            var e, t, r;
            for (r = [], e = 0, t = i.length; t > e; e++) n = i[e],
            r.push(n.slice(o.length, n.length - l.length));
            return r
        } ().join("\n"), u = c + f.length) : (f = function() {
            var e, t, r;
            for (r = [], e = 0, t = i.length; t > e; e++) n = i[e],
            r.push(o + n + l);
            return r
        } ().join("\n"), h && (a = d(e), r = a.newlinesToAppend, s = a.newlinesToPrepend, c += r.length, u = c + f.length, f = r + f + s)),
        {
            text: f,
            selectionStart: c,
            selectionEnd: u
        }
    },
    m = function(e) {
        var t, n, i, r, s, o, a, u, c, l, h;
        return o = /^\d+\.\s+/,
        l = e.value.slice(e.selectionStart, e.selectionEnd),
        i = l.split("\n"),
        h = i.every(function(e) {
            return o.test(e)
        }),
        h ? (i = function() {
            var e, t, r;
            for (r = [], e = 0, t = i.length; t > e; e++) n = i[e],
            r.push(n.replace(o, ""));
            return r
        } (), l = i.join("\n")) : (i = function() {
            var e, r, s;
            for (s = [], t = e = 0, r = i.length; r > e; t = ++e) n = i[t],
            s.push(t + 1 + ". " + n);
            return s
        } (), l = i.join("\n"), a = d(e), r = a.newlinesToAppend, s = a.newlinesToPrepend, c = e.selectionStart + r.length, u = c + l.length, l = r + l + s),
        {
            text: l,
            selectionStart: c,
            selectionEnd: u
        }
    },
    i.on("click", ".js-toolbar-item",
    function() {
        return j(this).menu("deactivate"),
        e(this)
    }),
    e = function(e) {
        var t, n, i;
        return t = e.closest(".js-previewable-comment-form"),
        i = t.querySelector(".js-improved-comment-field"),
        n = {
            prefix: e.getAttribute("data-prefix") || "",
            suffix: e.getAttribute("data-suffix") || "",
            blockPrefix: e.getAttribute("data-block-prefix") || "",
            blockSuffix: e.getAttribute("data-block-suffix") || "",
            multiline: e.hasAttribute("data-multiline"),
            replaceNext: e.getAttribute("data-replace-next") || "",
            prefixSpace: e.hasAttribute("data-prefix-space"),
            scanFor: e.getAttribute("data-scan-for") || "",
            surroundWithNewlines: e.hasAttribute("data-surround-with-newlines"),
            orderedList: e.hasAttribute("data-ordered-list"),
            trimFirst: e.hasAttribute("data-trim-first")
        },
        i.focus(),
        g(i, n)
    },
    c = navigator.userAgent.match(/Macintosh/) ? "meta": "ctrl",
    v = new WeakMap,
    s = function(e) {
        var t, n, i, r, s, o = v.get(e);
        if (o) return o;
        for (o = {},
        r = e.querySelectorAll(".js-toolbar-item[data-toolbar-hotkey]"), t = 0, i = r.length; i > t; t++) s = r[t],
        n = s.getAttribute("data-toolbar-hotkey"),
        o[c + "+" + n] = s;
        return v.set(e, o),
        o
    },
    f = function() {
        var t, n;
        if (!v.get(this)) return v.set(this, !0),
        n = this.closest(".js-previewable-comment-form").querySelector(".js-toolbar"),
        t = s(n),
        this.addEventListener("keydown",
        function(n) {
            var i = t[o(n)];
            i && (e(i), n.preventDefault())
        })
    },
    h(".js-improved-comment-field",
    function() {
        this.addEventListener("focus", f)
    })
}.call(this),
function() {
    var e, t, n, i, r, s, o, a, u, c, l, d = require("github/jquery")["default"],
    h = require("github/observe"),
    f = h.observe,
    m = require("github/normalized-event-timestamp"),
    p = m.normalizedTimestamp,
    g = m.timeSinceTimestamp;
    r = require("github/fetch").fetchText,
    c = require("github/stats")["default"],
    e = require("github/sliding-promise-queue")["default"],
    l = function(e) {
        var t;
        return null != (t = e.closest("form").elements.authenticity_token) ? t.value: void 0
    },
    t = function(e) {
        var t, n, i, r, s, o;
        return t = e.closest(".js-previewable-comment-form"),
        i = e.classList.contains("js-preview-tab"),
        i && (s = t.querySelector(".js-write-bucket"), r = t.querySelector(".js-preview-body"), r.style.minHeight = d(s).height() + "px"),
        t.classList.toggle("preview-selected", i),
        t.classList.toggle("write-selected", !i),
        n = t.querySelector(".tabnav-tab.selected"),
        n.setAttribute("aria-selected", !1),
        n.classList.remove("selected"),
        e.classList.add("selected"),
        e.setAttribute("aria-selected", !0),
        o = t.querySelector(".js-write-tab"),
        i ? o.setAttribute("data-hotkey", "ctrl+P,meta+P") : o.removeAttribute("data-hotkey"),
        Promise.resolve(t)
    },
    d(document).on("click", ".js-write-tab",
    function() {
        var e;
        return t(this).then(function(e) {
            return e.querySelector(".js-comment-field").focus()
        }),
        e = this.closest(".js-previewable-comment-form").querySelector(".js-toolbar"),
        null != e && e.classList.remove("hidden"),
        !1
    }),
    d(document).on("click", ".js-preview-tab",
    function(e) {
        var n, i = p(e.timeStamp);
        return t(this).then(function(e) {
            u(e, i)
        }),
        n = this.closest(".js-previewable-comment-form").querySelector(".js-toolbar"),
        null != n && n.classList.add("hidden"),
        !1
    }),
    d(document).on("preview:render", ".js-previewable-comment-form",
    function(e) {
        var n, i = e.originalEvent.detail.requestedAt || p(e.timeStamp);
        return n = this.querySelector(".js-preview-tab"),
        t(n).then(function(e) {
            u(e, i)
        })
    }),
    a = new e,
    o = new WeakMap,
    s = !1,
    n = function(e, t) {
        var n, r, u, c;
        if (c = {
            url: e.getAttribute("data-preview-url"),
            data: {
                text: t,
                authenticity_token: l(e)
            },
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        },
        n = !e.dispatchEvent(new CustomEvent("preview:setup", {
            bubbles: !0,
            cancelable: !0,
            detail: c
        }))) return Promise.reject(new Error("preview canceled"));
        t = JSON.stringify(c);
        var d = o.get(e);
        return d && (r = d[0], u = d[1]),
        r !== t && (s = !1, u = a.push(i(c)), u.then(function() {
            return s = !0
        }), o.set(e, [t, u])),
        u
    },
    i = function(e) {
        return r(e.url, {
            method: "post",
            body: d.param(e.data),
            headers: e.headers
        })
    },
    u = function(e, t) {
        var i, r;
        return r = e.querySelector(".js-comment-field"),
        i = e.querySelector(".comment-body"),
        n(e, r.value).then(function(e) {
            var n;
            return i.innerHTML = e || "<p>Nothing to preview</p>",
            n = g(t),
            c({
                preview_delay: {
                    ms: n,
                    version: 2
                }
            })
        }),
        s ? void 0 : i.innerHTML = "<p>Loading preview&hellip;</p>"
    },
    f(".js-preview-tab",
    function() {
        var e, t;
        t = this.closest(".js-previewable-comment-form"),
        e = t.querySelector(".js-comment-field"),
        d(this).on("mouseenter",
        function() {
            return n(t, e.value)
        })
    }),
    d(document).onFocusedKeydown(".js-comment-field",
    function() {
        var e;
        return e = this.closest(".js-previewable-comment-form"),
        function(t) {
            return "ctrl+P" !== t.hotkey && "meta+P" !== t.hotkey || !e.classList.contains("write-selected") ? void 0 : (this.blur(), e.dispatchEvent(new CustomEvent("preview:render", {
                bubbles: !0,
                cancelable: !1,
                detail: {
                    requestedAt: p(t.timeStamp)
                }
            })), t.stopImmediatePropagation(), !1)
        }
    })
}.call(this),
function() {
    var e = require("github/stats")["default"],
    t = require("github/hash-change")["default"];
    t(function(t) {
        var n = window.location.hash.slice(1);
        return n && /\/(issues|pulls?)\/\d+/.test(t.newURL) ? e({
            conversation_anchor: {
                anchor: n,
                matches_element: t.target !== window
            }
        }) : void 0
    })
}.call(this),
function() {
    var e, t = require("github/jquery")["default"],
    n = require("github/observe"),
    i = n.observe,
    r = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    };
    e = function() {
        function e(e) {
            this.clearCropFormValues = r(this.clearCropFormValues, this),
            this.setCropFormValues = r(this.setCropFormValues, this),
            this.setCurrentSelection = r(this.setCurrentSelection, this),
            this.setTrueSize = r(this.setTrueSize, this);
            var n, i, s;
            this.$container = t(e),
            this.spinner = this.$container.find(".profile-picture-spinner"),
            this.img = this.$container.find(".js-croppable-avatar"),
            this.croppedX = this.$container.find(".js-crop-cropped-x"),
            this.croppedY = this.$container.find(".js-crop-cropped-y"),
            this.croppedW = this.$container.find(".js-crop-cropped-width"),
            this.croppedH = this.$container.find(".js-crop-cropped-height"),
            n = this.img.parent("div").width(),
            s = {
                aspectRatio: 1,
                onSelect: this.setCropFormValues,
                onRelease: this.clearCropFormValues,
                bgColor: "",
                maxSize: [3e3, 3e3],
                boxWidth: n,
                boxHeight: n
            },
            this.setTrueSize(s),
            this.setCurrentSelection(s),
            i = this,
            this.img.Jcrop(s,
            function() {
                return i.spinner.addClass("hidden"),
                i.jcrop = this
            })
        }
        return e.prototype.setTrueSize = function(e) {
            var t, n;
            return n = parseInt(this.img.attr("data-true-width")),
            t = parseInt(this.img.attr("data-true-height")),
            0 !== n && 0 !== t ? e.trueSize = [n, t] : void 0
        },
        e.prototype.setCurrentSelection = function(e) {
            var t, n, i, r;
            return n = parseInt(this.croppedW.val()),
            t = parseInt(this.croppedH.val()),
            0 !== n && 0 !== t ? (i = parseInt(this.croppedX.val()), r = parseInt(this.croppedY.val()), e.setSelect = [i, r, i + n, r + t]) : void 0
        },
        e.prototype.setCropFormValues = function(e) {
            return this.croppedX.val(e.x),
            this.croppedY.val(e.y),
            this.croppedW.val(e.w),
            this.croppedH.val(e.h)
        },
        e.prototype.clearCropFormValues = function() {
            return this.croppedX.val("0"),
            this.croppedY.val("0"),
            this.croppedW.val("0"),
            this.croppedH.val("0")
        },
        e
    } (),
    i(".js-croppable-container", {
        add: function(t) {
            return new e(t)
        }
    }),
    document.addEventListener("facebox:afterClose",
    function() {
        t(".js-avatar-field").val("")
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"],
    t = require("github/hash-change")["default"],
    n = require("github/perform-transition")["default"];
    e(document).on("click", ".js-details-container .js-details-target",
    function(t) {
        var i, r;
        r = e(this),
        i = r.closest(".js-details-container"),
        r.fire("details:toggle", {
            relatedTarget: t.target
        },
        function() {
            n(i[0],
            function() {
                i.toggleClass("open"),
                i.fire("details:toggled", {
                    relatedTarget: t.target,
                    async: !0
                })
            }),
            t.preventDefault()
        })
    }),
    e(document).on("details:toggled",
    function(t) {
        var n = t.target,
        i = t.relatedTarget,
        r = e(n).find("input[autofocus], textarea[autofocus]").last()[0];
        r && document.activeElement !== r && r.focus(),
        i.classList.contains("tooltipped") && (i.classList.remove("tooltipped"), e(i).one("mouseleave",
        function() {
            return i.classList.add("tooltipped")
        })),
        "function" == typeof i.blur && i.blur()
    }),
    e(document).on("details:toggled",
    function(e) {
        var t = e.relatedTarget.closest(".js-edit-repository-meta");
        t && t.reset()
    }),
    t(function(t) {
        return e(t.target).parents(".js-details-container").addClass("open")
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("menu:activate", ".js-select-menu",
    function() {
        e(this).addClass("is-dirty")
    }),
    e(document).on("menu:deactivate", ".js-select-menu",
    function() {
        e(this).removeClass("is-dirty")
    })
} (),
function() {
    function e(e) {
        return "INPUT" === e.nodeName ? e.value || "Submit": e.innerHTML || ""
    }
    function t(e, t) {
        "INPUT" === e.nodeName ? e.value = t: e.innerHTML = t
    }
    var n = require("github/jquery")["default"],
    i = new WeakMap,
    r = ["input[type=submit][data-disable-with]", "button[data-disable-with]"].join(", ");
    n(document).on("submit:prepare", "form",
    function() {
        Array.from(this.querySelectorAll(r)).forEach(function(n) {
            i.set(n, e(n));
            var r = n.getAttribute("data-disable-with");
            r && t(n, r),
            n.disabled = !0
        })
    }),
    n(document).on("ajaxComplete", "form",
    function(e) {
        this === e.target && Array.from(this.querySelectorAll(r)).forEach(function(e) {
            var n = i.get(e);
            null != n && (t(e, n), e.disabled = !1, i["delete"](e))
        })
    })
} (),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("click", "[data-facebox]",
    function() {
        e.facebox({
            div: this.getAttribute("data-facebox")
        },
        this.getAttribute("data-facebox-class"))
    })
} (),
function() {
    function e(e) {
        var i, r, s, o, a, u; ("tab" === (a = e.hotkey) || "shift+tab" === a) && (e.preventDefault(), r = t("#facebox"), i = t(Array.from(r.find("input, button, .btn, textarea")).filter(n)).filter(function() {
            return ! this.disabled
        }), o = "shift+tab" === e.hotkey ? -1 : 1, s = i.index(i.filter(":focus")), u = s + o, u === i.length || -1 === s && "tab" === e.hotkey ? i.first().focus() : -1 === s ? i.last().focus() : i.get(u).focus())
    }
    var t = require("github/jquery")["default"],
    n = require("github/visible")["default"],
    i = require("github/observe"),
    r = i.observe;
    document.addEventListener("facebox:reveal",
    function() {
        var n, i;
        n = t("#facebox"),
        i = n.find("input[autofocus], textarea[autofocus]").last()[0],
        i && document.activeElement !== i && i.focus(),
        t(document).on("keydown", e)
    }),
    document.addEventListener("facebox:afterClose",
    function() {
        t(document).off("keydown", e),
        t("#facebox :focus").blur()
    }),
    r("a[rel*=facebox]",
    function() {
        t(this).facebox()
    })
}.call(this),
function() {
    function e(e, n) {
        var i = e.hasAttribute("data-filterable-highlight"),
        r = e.getAttribute("data-filterable-limit"),
        s = 0;
        switch (e.getAttribute("data-filterable-type")) {
        case "fuzzy":
            s = t(e).fuzzyFilterSortList(n, {
                mark: i,
                limit: r
            });
            break;
        case "substring":
            s = t(e).substringFilterList(n, {
                mark: i,
                limit: r
            });
            break;
        default:
            s = t(e).prefixFilterList(n, {
                mark: i,
                limit: r
            })
        }
        e.classList.toggle("filterable-active", n.length > 0),
        e.classList.toggle("filterable-empty", 0 === s)
    }
    var t = require("github/jquery")["default"],
    n = require("github/observe"),
    i = n.observe;
    i(".js-filterable-field",
    function() {
        var e = this.value;
        return {
            add: function() {
                t(this).on("throttled:input.filterable",
                function() {
                    e !== this.value && (e = this.value, t(this).fire("filterable:change", {
                        async: !0
                    }))
                }),
                t(this).on("focus.filterable",
                function() {
                    t(this).fire("filterable:change", {
                        async: !0
                    })
                })
            },
            remove: function() {
                t(this).off("filterable")
            }
        }
    }),
    t(document).on("filterable:change", ".js-filterable-field",
    function() {
        var n = this,
        i = this.value.trim().toLowerCase(),
        r = document.querySelectorAll("[data-filterable-for=" + this.id + "]");
        Array.from(r).forEach(function(r) {
            e(r, i),
            t(r).fire("filterable:change", {
                relatedTarget: n
            })
        })
    })
} (),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("click", ".js-flash-close",
    function() {
        var t = e(this).closest(".flash-messages");
        e(this).closest(".flash").fadeOut(300,
        function() {
            e(this).remove(),
            0 === t.find(".flash").length && t.remove()
        })
    })
} (),
function() {
    var e = require("github/jquery")["default"],
    t = new WeakMap;
    e(document).on("focusin.delay",
    function(n) {
        var i;
        i = n.target,
        t.get(i) || e(i).fire("focusin:delay",
        function() {
            t.set(i, !0),
            e(i).trigger("focusin:delayed")
        })
    }),
    e(document).on("focusout.delay",
    function(n) {
        return setTimeout(function() {
            var i;
            i = n.target,
            i !== document.activeElement && e(i).fire("focusout:delay",
            function() {
                t["delete"](n.target),
                e(i).trigger("focusout:delayed")
            })
        },
        200)
    })
} (),
define("github/local-storage", ["exports"],
function(e) {
    function t(e) {
        try {
            return localStorage.getItem(e)
        } catch(t) {
            return null
        }
    }
    function n(e, t) {
        try {
            localStorage.setItem(e, t)
        } catch(n) {}
    }
    function i(e) {
        try {
            localStorage.removeItem(e)
        } catch(t) {}
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getItem = t,
    e.setItem = n,
    e.removeItem = i
}),
function() {
    var e = require("github/local-storage"),
    t = e.getItem,
    n = e.removeItem,
    i = require("github/observe"),
    r = i.observe;
    r(".js-force-push-default-branch-notice",
    function() {
        var e = "true" === t("hide-force-push-default-branch-notice");
        this.classList.toggle("hidden", e),
        e && (this.submit(), n("hide-force-push-default-branch-notice"))
    })
} (),
function() {
    function e(e) {
        var t = document.createElement("img");
        return t.className = "emoji",
        t.alt = t.title = ":" + e.getAttribute("alias") + ":",
        t.height = 20,
        t.width = 20,
        t
    }
    var t = require("github/feature-detection")["default"];
    if (!t.emoji) {
        var n = Object.create(HTMLElement.prototype);
        n.createdCallback = function() {
            this.textContent = "",
            this.image = e(this),
            this.appendChild(this.image)
        },
        n.attachedCallback = function() {
            this.image.src = this.getAttribute("fallback-src")
        },
        window.GEmojiElement = document.registerElement("g-emoji", {
            prototype: n
        })
    }
} (),
function() {
    function e() {
        var e = this,
        i = t(this);
        if (h === i && clearTimeout(d), i) n(i);
        else {
            var r = this.getAttribute("data-hovercard-url");
            l(r).then(function(t) {
                e.closest("a").insertAdjacentHTML("afterend", t)
            })
        }
    }
    function t(e) {
        return e.closest("a").parentNode.querySelector(".hovercard")
    }
    function n(e) {
        h = e,
        e.classList.remove("hidden"),
        e.classList.add("anim-fade-in", "fast")
    }
    function i(e) {
        h = null,
        e.classList.add("hidden")
    }
    function r() {
        var e = this;
        d = setTimeout(function() {
            var n = t(e);
            i(n)
        },
        300)
    }
    function s() {
        clearTimeout(d)
    }
    function o() {
        var e = this;
        d = setTimeout(function() {
            i(e)
        },
        100)
    }
    var a = require("github/observe"),
    u = a.observe,
    c = require("github/fetch"),
    l = c.fetchText,
    d = void 0,
    h = void 0;
    u(".js-hovercardable",
    function() {
        this.addEventListener("mouseenter", e),
        this.addEventListener("mouseleave", r)
    }),
    u(".js-hovercard",
    function() {
        this.addEventListener("mouseenter", s),
        this.addEventListener("mouseleave", o)
    })
} (),
function() {
    function e() {
        var e, n, r, s, o, a, u, c, l;
        if (l = this.getAttribute("data-url")) {
            for (c = i(l), a = this.getAttribute("data-id"), r = document.querySelectorAll(".js-issue-link[data-id='" + a + "']"), o = 0, u = r.length; u > o; o++) n = r[o],
            n.removeAttribute("data-url");
            return e = function(e) {
                return t(r, e.title)
            },
            s = function(e) {
                return function(n) {
                    var i, s, o;
                    return o = (null != (s = n.response) ? s.status: void 0) || 500,
                    i = function() {
                        switch (o) {
                        case 404:
                            return this.getAttribute("data-permission-text");
                        default:
                            return this.getAttribute("data-error-text")
                        }
                    }.call(e),
                    t(r, i)
                }
            } (this),
            c.then(e, s)
        }
    }
    function t(e, t) {
        var n, i, r, s;
        for (s = [], i = 0, r = e.length; r > i; i++) n = e[i],
        s.push(n.setAttribute("title", t));
        return s
    }
    var n = require("github/fetch"),
    i = n.fetchJSON,
    r = require("github/observe"),
    s = r.observe;
    s(".js-issue-link",
    function() {
        this.addEventListener("mouseenter", e)
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"],
    t = require("github/updatable-content"),
    n = t.replaceContent;
    e(document).on("ajaxSuccess", ".js-immediate-updates",
    function(e, t, i, r) {
        var s, o, a;
        if (this === e.target) {
            o = r.updateContent;
            for (a in o) {
                s = o[a];
                var u = document.querySelector(a);
                u && n(u, s)
            }
        }
    })
} (),
function() {
    function e(e, t) {
        e.closest("label").classList.toggle("selected", t)
    }
    var t = require("github/observe"),
    n = t.observe;
    n(".labeled-button:checked", {
        add: function() {
            e(this, !0)
        },
        remove: function() {
            e(this, !1)
        }
    })
} (),
function() {
    var e, t = require("github/jquery")["default"];
    e = "is-last-changed",
    t(document).on("change", "form.js-form-last-changed",
    function(t) {
        var n, i;
        n = t.target,
        null != (i = this.querySelector("." + e)) && i.classList.remove(e),
        n.classList.add(e)
    })
}.call(this),
function() {
    function e(e) {
        "enter" === e.hotkey && (t(this).click(), e.preventDefault())
    }
    var t = require("github/jquery")["default"];
    t(document).on("focus", "div.btn-sm, span.btn-sm",
    function() {
        t(this).on("keydown", e)
    }),
    t(document).on("blur", "div.btn-sm, span.btn-sm",
    function() {
        t(this).off("keydown", e)
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSuccess", ".js-notice-dismiss",
    function() {
        e(this).closest(".js-notice").fadeOut()
    })
} (),
function() {
    var e = require("delegated-events"),
    t = e.on;
    t("click", ".js-permalink-shortcut",
    function(e) {
        window.location = this.href + window.location.hash,
        e.preventDefault()
    })
} (),
function() {
    function e() {
        var e = document.getElementById("js-pjax-loader-bar");
        e && (t(), e.classList.add("is-loading"), o = setTimeout(i, 0))
    }
    function t() {
        var e = document.getElementById("js-pjax-loader-bar");
        if (e) {
            var t = e.querySelector(".progress");
            t && t.remove();
            var n = document.createElement("div");
            n.classList.add("progress"),
            s = 0,
            n.style.width = 0,
            e.appendChild(n)
        }
    }
    function n(e) {
        s = e;
        var t = document.getElementById("js-pjax-loader-bar");
        t && (t.querySelector(".progress").style.width = s + "%")
    }
    function i() {
        0 == s && (s = 12),
        n(Math.min(s + 3, 95)),
        o = setTimeout(i, 500)
    }
    function r() {
        clearTimeout(o),
        n(100);
        var e = document.getElementById("js-pjax-loader-bar");
        e && e.classList.remove("is-loading")
    }
    var s = 0,
    o = null;
    document.addEventListener("pjax:start", e),
    document.addEventListener("pjax:end", r),
    document.addEventListener("pjax:timeout",
    function(e) {
        e.preventDefault()
    })
} (),
function() {
    document.addEventListener("pjax:click",
    function(e) {
        return window.onbeforeunload ? e.preventDefault() : void 0
    })
}.call(this),
function() {
    var e, t;
    e = require("delegated-events"),
    t = function() {
        var e, t;
        return t = function() {
            var t, n, i;
            for (i = [], t = 0, n = arguments.length; n > t; t++) e = arguments[t],
            i.push(e.split("/", 3).join("/"));
            return i
        }.apply(this, arguments),
        t[0] === t[1]
    },
    e.on("pjax:click", "#js-repo-pjax-container a[href]",
    function(e) {
        return t(this.pathname, location.pathname) ? void 0 : e.preventDefault()
    }),
    e.on("pjax:click", ".js-comment-body",
    function(e) {
        return "files" === e.target.pathname.split("/")[3] ? e.preventDefault() : void 0
    })
}.call(this),
function() {
    var e, t = require("github/jquery")["default"];
    e = {},
    t(function() {
        return e[document.location.pathname] = t("head [data-pjax-transient]")
    }),
    document.addEventListener("pjax:beforeReplace",
    function(n) {
        var i, r, s, o, a;
        for (i = n.detail.contents, s = o = 0, a = i.length; a > o; s = ++o) r = i[s],
        r && ("pjax-head" === r.id ? (e[document.location.pathname] = t(r).children(), i[s] = null) : "js-flash-container" === r.id && (t("#js-flash-container").replaceWith(r), i[s] = null))
    }),
    document.addEventListener("pjax:end",
    function() {
        var n, i, r;
        return n = e[document.location.pathname],
        n ? (t("head [data-pjax-transient]").remove(), r = t(n).not("title, script, link[rel='stylesheet']"), i = t(n).filter("link[rel='stylesheet']"), t(document.head).append(r.attr("data-pjax-transient", !0)), t(document.head).append(i)) : void 0
    })
}.call(this),
function() {
    var e, t, n, i = require("github/jquery")["default"];
    t = require("github/pjax"),
    n = function(e) {
        return null != e.getAttribute("data-pjax-preserve-scroll") ? !1 : 0
    },
    e = function(e) {
        var t, n;
        t = i(e),
        n = t.add(t.parents("[data-pjax]")).map(function() {
            var e;
            return e = this.getAttribute("data-pjax"),
            null != e && "true" !== e ? e: void 0
        });
        var r = n[0];
        return r ? document.querySelector(r) : i(e).closest("[data-pjax-container]")[0]
    },
    i(document).on("click", "[data-pjax] a, a[data-pjax]",
    function(i) {
        var r = this;
        if (null == r.getAttribute("data-skip-pjax") && null == r.getAttribute("data-remote")) {
            var s = e(r);
            return s ? t.click(i, {
                container: s,
                scrollTo: n(r)
            }) : void 0
        }
    }),
    i(document).on("submit", "form[data-pjax]",
    function(i) {
        var r = this,
        s = e(r);
        return s ? t.submit(i, {
            container: s,
            scrollTo: n(r)
        }) : void 0
    })
}.call(this),
function() {
    function e(e) {
        e.detail && e.detail.url && (window.performance.mark(a), s = e.detail.url)
    }
    function t() {
        r(function() {
            if (window.performance.getEntriesByName(a).length) {
                window.performance.mark(u),
                window.performance.measure(o, a, u);
                var e = window.performance.getEntriesByName(o),
                t = e.pop(),
                r = t ? t.duration: null;
                r && (i({
                    pjax: {
                        url: s,
                        ms: Math.round(r)
                    }
                }), n())
            }
        })
    }
    function n() {
        window.performance.clearMarks(a),
        window.performance.clearMarks(u),
        window.performance.clearMeasures(o)
    }
    var i = require("github/stats")["default"],
    r = require("github/setimmediate")["default"],
    s = null,
    o = "last_pjax_request",
    a = "pjax_start",
    u = "pjax_end";
    document.addEventListener("pjax:start", e),
    document.addEventListener("pjax:end", t)
} (),
function() {
    var e = require("github/document-ready"),
    t = e.ready;
    t.then(function() {
        document.body.classList.contains("js-print-popup") && (window.print(), setTimeout(window.close, 1e3))
    })
} (),
function() {
    var e = require("github/jquery")["default"],
    t = require("github/failbot"),
    n = t.errorContext;
    e(function() {
        var t, i;
        return document.documentElement.classList.contains("is-employee") ? (t = function() {
            return "qi:" + document.location
        },
        i = [], e(document).on("submit", ".js-quick-issue-form",
        function() {
            var n;
            e(".facebox-content > *").hide(),
            e(".facebox-content .js-quick-issue-thanks").show(),
            n = t();
            try {
                localStorage.removeItem(n)
            } catch(i) {}
            return ! 0
        }), e(document).onFocusedInput(".js-quick-issue-body",
        function() {
            return function() {
                var n, i;
                n = t(),
                i = e(this).val();
                try {
                    return localStorage.setItem(n, i)
                } catch(r) {}
            }
        }), document.addEventListener("facebox:reveal",
        function() {
            var n, i, r;
            return e(".facebox-content .quick-issue-link").remove(),
            r = e(".facebox-content .js-quick-issue-body"),
            r.length ? (i = t(), n = function() {
                try {
                    return localStorage.getItem(i)
                } catch(e) {}
            } (), n && r.val(n), r.focus()) : void 0
        }), e(window).on("error",
        function(t) {
            return i.push(n(t.originalEvent.error)),
            e(".js-captured-errors").val(JSON.stringify(i))
        }), e(document).on("ajaxSuccess", ".js-quick-issue-form",
        function(t, n) {
            return e(".js-quick-issue-thanks").append(n.responseText)
        })) : void 0
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).onFocusedKeydown(".js-quick-submit",
    function() {
        return function(t) {
            var n, i;
            return "ctrl+enter" === t.hotkey || "meta+enter" === t.hotkey ? (i = e(this).closest("form"), n = i.find("input[type=submit], button[type=submit]").first(), n.prop("disabled") || i.submit(), !1) : void 0
        }
    })
} (),
function() {
    var e, t, n, i = require("github/jquery")["default"],
    r = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    };
    t = require("github/sliding-promise-queue")["default"],
    n = require("github/fetch").fetchText,
    e = function() {
        function e(e) {
            this.resultsChanged = r(this.resultsChanged, this),
            this.fetchResults = r(this.fetchResults, this),
            this.onFieldInput = r(this.onFieldInput, this),
            this.onNavigationKeyDown = r(this.onNavigationKeyDown, this),
            this.teardown = r(this.teardown, this),
            this.$field = i(e),
            this.$form = i(e.form),
            this.fetchQueue = new t,
            this.$field.on("input.results", this.onFieldInput),
            this.$field.on("focusout:delayed.results", this.teardown),
            this.$form.on("submit.results", this.teardown),
            this.$results = i(".js-quicksearch-results"),
            this.$results.navigation("push"),
            this.$results.on("navigation:keydown.results", this.onNavigationKeyDown)
        }
        return e.prototype.teardown = function() {
            return this.$field.off(".results"),
            this.$form.off(".results"),
            this.$results.off(".results"),
            this.$results.removeClass("active"),
            this.$results.navigation("pop")
        },
        e.prototype.onNavigationKeyDown = function(e) {
            return "esc" === e.hotkey ? this.$results.removeClass("active").navigation("clear") : "enter" !== e.hotkey || e.target.classList.contains("js-navigation-item") ? void 0 : (this.$form.submit(), !1)
        },
        e.prototype.onFieldInput = function() {
            return this.fetchResults(this.$field.val())
        },
        e.prototype.fetchResults = function(e) {
            var t, i, r = this.$results.attr("data-quicksearch-url");
            return r ? (i = e.trim() ? (r += ~r.indexOf("?") ? "&": "?", r += this.$form.serialize(), this.$form.addClass("is-sending"), n(r)) : Promise.resolve(""), t = function(e) {
                return function() {
                    return e.$form.removeClass("is-sending")
                }
            } (this), this.fetchQueue.push(i).then(function(e) {
                return function(t) {
                    return e.$results.html(t),
                    e.resultsChanged()
                }
            } (this)).then(t, t)) : void 0
        },
        e.prototype.resultsChanged = function() {
            var e;
            return e = "" !== this.$field.val(),
            this.$results.toggleClass("active", e)
        },
        e
    } (),
    i(document).on("focusin:delayed", ".js-quicksearch-field",
    function() {
        new e(this)
    })
}.call(this),
define("github/markdown-parsing", ["exports"],
function(e) {
    function t() {
        var e = arguments[0],
        t = 2 <= arguments.length ? [].slice.call(arguments, 1) : [];
        return t.some(function(t) {
            return e.classList.contains(t)
        })
    }
    function n(e) {
        for (var t = e.parentNode.children,
        n = 0; n < t.length; ++n) if (t[n] === e) return n
    }
    function i(e) {
        return "IMG" === e.nodeName || null != e.firstChild
    }
    function r(e) {
        return "INPUT" === e.nodeName && "checkbox" === e.type
    }
    function s(e) {
        var t = e.childNodes[0],
        n = e.childNodes[1];
        return t && e.childNodes.length < 3 ? !("OL" !== t.nodeName && "UL" !== t.nodeName || n && (n.nodeType !== Node.TEXT_NODE || n.textContent.trim())) : void 0
    }
    function o(e, t) {
        var n = void 0,
        s = document.createNodeIterator(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: function(e) {
                return e.nodeName in c && (i(e) || r(e)) ? NodeFilter.FILTER_ACCEPT: void 0
            }
        }),
        o = [];
        for (n = s.nextNode(); n;) o.push(n),
        n = s.nextNode();
        o.reverse().forEach(function(e) {
            return t(e, c[e.nodeName](e))
        })
    }
    function a(e) {
        var t = e.getRangeAt(0).cloneContents();
        u = 0;
        var i = e.anchorNode.parentNode.closest("li");
        if (i && ("OL" === i.parentNode.nodeName && (u = n(i)), !t.querySelector("li"))) {
            var r = document.createElement("li"),
            s = document.createElement(i.parentNode.nodeName);
            r.append(t),
            s.append(r),
            t = document.createDocumentFragment(),
            t.appendChild(s)
        }
        return o(t,
        function(e, t) {
            return e.replaceWith(t)
        }),
        t
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = o,
    e.selectionToMarkdown = a;
    var u = 0,
    c = {
        INPUT: function(e) {
            return e.checked ? "[x] ": "[ ] "
        },
        CODE: function(e) {
            var t = e.textContent;
            return "PRE" === e.parentNode.nodeName ? e.textContent = t.replace(/^/gm, "    ") : t.indexOf("`") >= 0 ? "`` " + t + " ``": "`" + t + "`"
        },
        PRE: function(e) {
            var t = e.parentNode;
            return "DIV" === t.nodeName && t.classList.contains("highlight") && (e.textContent = e.textContent.replace(/^/gm, "    "), e.append("\n\n")),
            e
        },
        STRONG: function(e) {
            return "**" + e.textContent + "**"
        },
        EM: function(e) {
            return "_" + e.textContent + "_"
        },
        BLOCKQUOTE: function(e) {
            var t = e.textContent.trim().replace(/^/gm, "> "),
            n = document.createElement("pre");
            return n.textContent = t + "\n\n",
            n
        },
        A: function(e) {
            var n = e.textContent;
            return t(e, "issue-link", "user-mention", "team-mention") ? n: /^https?:/.test(n) && n === e.getAttribute("href") ? n: "[" + n + "](" + e.getAttribute("href") + ")"
        },
        IMG: function(e) {
            var n = e.getAttribute("alt");
            return t(e, "emoji") ? n: "![" + n + "](" + e.getAttribute("src") + ")"
        },
        LI: function(e) {
            var t = e.parentNode;
            if (!s(e)) switch (t.nodeName) {
            case "UL":
                e.prepend("* ");
                break;
            case "OL":
                if (u > 0 && !t.previousSibling) {
                    var i = n(e) + u + 1;
                    e.prepend(i + "\\. ")
                } else e.prepend(n(e) + 1 + ". ")
            }
            return e
        },
        OL: function(e) {
            var t = document.createElement("li");
            return t.append(document.createElement("br")),
            e.append(t),
            e
        },
        H1: function(e) {
            var t = parseInt(e.nodeName.slice(1));
            return e.prepend(Array(t + 1).join("#") + " "),
            e
        }
    };
    c.UL = c.OL;
    for (var l = 2; 6 >= l; ++l) c["H" + l] = c.H1
}),
function() {
    function e(e, t) {
        var n = document.createElement("div"),
        i = void 0;
        n.appendChild(t),
        n.style.cssText = "position:absolute;left:-9999px;",
        document.body.appendChild(n);
        try {
            var r = document.createRange();
            r.selectNodeContents(n),
            e.removeAllRanges(),
            e.addRange(r),
            i = e.toString(),
            e.removeAllRanges()
        } finally {
            document.body.removeChild(n)
        }
        return i
    }
    var t = require("delegated-events"),
    n = t.on,
    i = require("github/markdown-parsing"),
    r = i.selectionToMarkdown,
    s = require("github/setimmediate")["default"];
    n("quote:selection", ".js-quote-markdown",
    function(t) {
        var n = t.detail.selection;
        try {
            var i = e(n, r(n));
            return t.detail.selectionText = i.replace(/^\n+/, "").replace(/\s+$/, "")
        } catch(o) {
            s(function() {
                throw o
            })
        }
    })
} (),
function() {
    function e(e) {
        var i = e.toString().trim();
        if (i) {
            var r = e.focusNode;
            r.nodeType != Node.ELEMENT_NODE && (r = r.parentNode);
            var o = r.closest(".js-quote-selection-container");
            if (o) {
                var a = {
                    selection: e,
                    selectionText: i
                };
                if (!s(o, "quote:selection", a)) return ! 0;
                i = a.selectionText;
                var u = Array.from(o.querySelectorAll(".js-quote-selection-target")).filter(n)[0];
                if (u) {
                    var c = "> " + i.replace(/\n/g, "\n> ") + "\n\n",
                    l = u.value;
                    return l && (c = l + "\n\n" + c),
                    u.value = c,
                    t(u).trigger("change").scrollTo({
                        duration: 300
                    },
                    function() {
                        u.focus(),
                        u.selectionStart = u.value.length,
                        u.scrollTop = u.scrollHeight
                    }),
                    !0
                }
            }
        }
    }
    var t = require("github/jquery")["default"],
    n = require("github/visible")["default"],
    i = require("github/hotkey")["default"],
    r = require("delegated-events"),
    s = r.fire;
    t(document).on("keydown",
    function(t) {
        "r" != i(t) || t.isDefaultPrevented() || t.isFormInteraction() || !e(window.getSelection()) || t.preventDefault()
    })
} (),
function() {
    function e() {
        var e = this.getAttribute("data-reaction-label");
        this.closest(".js-add-reaction-popover").querySelector(".js-reaction-description").textContent = e
    }
    function t() {
        this.closest(".js-add-reaction-popover").querySelector(".js-reaction-description").textContent = "Pick your reaction"
    }
    var n = require("github/jquery")["default"];
    n(document).on("ajaxSuccess", ".js-pick-reaction",
    function(e, t, i, r) {
        n(this.closest(".js-menu-container")).menu("deactivate");
        var s = this.closest(".js-comment");
        if (s) {
            var o, a, u = n.parseHTML(r.reactions_container.trim()),
            c = n.parseHTML(r.comment_header_reaction_button.trim()); (o = s.querySelector(".js-reactions-container")).replaceWith.apply(o, _toConsumableArray(u)),
            (a = s.querySelector(".js-comment-header-reaction-button")).replaceWith.apply(a, _toConsumableArray(c))
        }
    }),
    n(document).on("menu:activated", ".js-reaction-popover-container",
    function() {
        n(this).on("mouseenter", ".js-reaction-option-item", e),
        n(this).on("mouseleave", ".js-reaction-option-item", t)
    }),
    n(document).on("menu:deactivated", ".js-reaction-popover-container",
    function() {
        n(this).off("mouseenter", ".js-reaction-option-item", e),
        n(this).off("mouseleave", ".js-reaction-option-item", t)
    })
} (),
function() {
    var e = require("github/observe"),
    t = e.observe;
    t(".has-removed-contents",
    function() {
        var e = void 0;
        return {
            add: function(t) {
                e = Array.from(t.childNodes),
                e.forEach(function(e) {
                    return t.removeChild(e)
                })
            },
            remove: function(t) {
                e.forEach(function(e) {
                    return t.appendChild(e)
                })
            }
        }
    })
} (),
function() {
    var e, t, n = require("github/jquery")["default"];
    e = require("github/fetch").fetchText,
    n(document).on("focusin", ".js-repo-filter .js-filterable-field",
    function() {
        var e = this.closest(".js-repo-filter").querySelector(".js-more-repos-link");
        e && t(e)
    }),
    n(document).on("click", ".js-repo-filter .js-repo-filter-tab",
    function(e) {
        var i, r, s, o, a;
        i = this.closest(".js-repo-filter");
        var u = i.querySelector(".js-more-repos-link");
        for (u && t(u), a = i.querySelectorAll(".js-repo-filter-tab"), s = 0, o = a.length; o > s; s++) r = a[s],
        r.classList.toggle("filter-selected", r === this);
        n(i.querySelector(".js-filterable-field")).fire("filterable:change"),
        e.preventDefault()
    }),
    n(document).on("filterable:change", ".js-repo-filter .js-repo-list",
    function() {
        var e, t;
        e = this.closest(".js-repo-filter");
        var i = null != (t = e.querySelector(".js-repo-filter-tab.filter-selected")) ? t.getAttribute("data-filter") : void 0;
        i && n(this).children().not(i).hide()
    }),
    t = function(t) {
        var i, r;
        if (!t.classList.contains("is-loading")) return t.classList.add("is-loading"),
        r = function(e) {
            var i;
            return i = t.closest(".js-repo-filter"),
            i.querySelector(".js-repo-list").innerHTML = e,
            n(i.querySelector(".js-filterable-field")).fire("filterable:change"),
            t.remove()
        },
        i = function() {
            return t.classList.remove("is-loading")
        },
        e(t.href).then(r).then(i, i)
    },
    n(document).on("click", ".js-more-repos-link",
    function(e) {
        e.preventDefault(),
        t(this)
    })
}.call(this),
function() {
    var e, t, n, i, r, s = require("github/jquery")["default"];
    i = require("github/setimmediate")["default"],
    e = function(e) {
        null == e && (e = window.location);
        var t = document.querySelector("meta[name=session-resume-id]");
        return t ? t.content: e.pathname
    },
    r = null,
    s(window).on("submit:prepare",
    function(e) {
        r = e.target,
        i(function() {
            return e.isDefaultPrevented() ? r = null: void 0
        })
    }),
    t = function(e) {
        var t, n, i, o;
        if (i = "session-resume:" + e, o = function(e) {
            return e.id && e.value !== e.defaultValue && e.form !== r
        },
        n = function() {
            var e, n, i, r;
            for (i = s(".js-session-resumable"), r = [], e = 0, n = i.length; n > e; e++) t = i[e],
            o(t) && r.push([t.id, t.value]);
            return r
        } (), n.length) try {
            sessionStorage.setItem(i, JSON.stringify(n))
        } catch(a) {}
    },
    n = function(e) {
        var t, n, r, o, a, u, c;
        r = "session-resume:" + e;
        var l = function() {
            try {
                return sessionStorage.getItem(r)
            } catch(e) {}
        } ();
        if (l) {
            try {
                sessionStorage.removeItem(r)
            } catch(d) {}
            for (t = [], a = JSON.parse(l), n = 0, o = a.length; o > n; n++) u = a[n],
            e = u[0],
            c = u[1],
            s(document).fire("session:resume", {
                targetId: e,
                targetValue: c
            },
            function() {
                var n;
                n = document.getElementById(e),
                n && n.value === n.defaultValue && (n.value = c, t.push(n))
            });
            i(function() {
                return s(t).trigger("change")
            })
        }
    },
    s(window).on("pageshow pjax:end",
    function() {
        n(e())
    }),
    s(window).on("pagehide",
    function() {
        t(e())
    }),
    window.addEventListener("pjax:beforeReplace",
    function(n) {
        var r, s, o, a = null != (o = n.detail.previousState) ? o.url: void 0;
        a ? (s = e(new URL(a)), t(s)) : (r = new Error("pjax:beforeReplace event.detail.previousState.url is undefined"), i(function() {
            throw r
        }))
    })
}.call(this),
function() {
    var e, t, n, i = require("github/jquery")["default"];
    e = require("github/debounce")["default"],
    t = function() {
        var t, n, r;
        t = null,
        r = e(function() {
            return t = null
        },
        200),
        n = {
            x: 0,
            y: 0
        },
        i(this).on("mousemove.userResize",
        function(e) {
            var s; (n.x !== e.clientX || n.y !== e.clientY) && (s = this.style.height, t && t !== s && i(this).trigger("user:resize"), t = s, r()),
            n = {
                x: e.clientX,
                y: e.clientY
            }
        })
    },
    n = function() {
        i(this).off("mousemove.userResize")
    },
    i.event.special["user:resize"] = {
        setup: t,
        teardown: n
    }
}.call(this),
function() {
    var e, t, n, i, r = require("github/jquery")["default"],
    s = require("github/visible")["default"],
    o = require("github/dimensions"),
    a = o.overflowOffset,
    u = require("github/observe"),
    c = u.observe;
    n = function(e) {
        return r(e).on("user:resize.trackUserResize",
        function() {
            return r(e).addClass("is-user-resized"),
            r(e).css({
                "max-height": ""
            })
        })
    },
    i = function(e) {
        return r(e).off("user:resize.trackUserResize")
    },
    r(document).on("reset", "form",
    function() {
        var e;
        e = r(this).find("textarea.js-size-to-fit"),
        e.removeClass("is-user-resized"),
        e.css({
            height: "",
            "max-height": ""
        })
    }),
    c("textarea.js-size-to-fit", {
        add: n,
        remove: i
    }),
    e = function(e) {
        var t, n, i;
        t = r(e),
        n = null,
        i = function() {
            var i, o, u, c;
            e.value !== n && s(e) && (c = a(t[0]), c.top < 0 || c.bottom < 0 || (u = t.outerHeight() + c.bottom, e.style.maxHeight = u - 100 + "px", i = e.parentNode, o = i.style.height, i.style.height = r(i).css("height"), e.style.height = "auto", t.innerHeight(e.scrollHeight), i.style.height = o, n = e.value))
        },
        t.on("change.sizeToFit",
        function() {
            return i()
        }),
        t.on("input.sizeToFit",
        function() {
            return i()
        }),
        e.value && i()
    },
    t = function(e) {
        r(e).off(".sizeToFit")
    },
    c("textarea.js-size-to-fit:not(.is-user-resized)", {
        add: e,
        remove: t
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSuccess", ".js-social-container",
    function(t, n, i, r) {
        return e(this).find(".js-social-count").text(r.count)
    })
}.call(this),
define.amd = "reconnectingwebsocket",
function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "undefined" != typeof module && module.exports ? module.exports = t() : e.ReconnectingWebSocket = t()
} (this,
function() {
    function e(t, n, i) {
        function r(e, t) {
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(e, !1, !1, t),
            n
        }
        var s = {
            debug: !1,
            automaticOpen: !0,
            reconnectInterval: 1e3,
            maxReconnectInterval: 3e4,
            reconnectDecay: 1.5,
            timeoutInterval: 2e3,
            maxReconnectAttempts: null
        };
        i || (i = {});
        for (var o in s)"undefined" != typeof i[o] ? this[o] = i[o] : this[o] = s[o];
        this.url = t,
        this.reconnectAttempts = 0,
        this.readyState = WebSocket.CONNECTING,
        this.protocol = null;
        var a, u = this,
        c = !1,
        l = !1,
        d = document.createElement("div");
        d.addEventListener("open",
        function(e) {
            u.onopen(e)
        }),
        d.addEventListener("close",
        function(e) {
            u.onclose(e)
        }),
        d.addEventListener("connecting",
        function(e) {
            u.onconnecting(e)
        }),
        d.addEventListener("message",
        function(e) {
            u.onmessage(e)
        }),
        d.addEventListener("error",
        function(e) {
            u.onerror(e)
        }),
        this.addEventListener = d.addEventListener.bind(d),
        this.removeEventListener = d.removeEventListener.bind(d),
        this.dispatchEvent = d.dispatchEvent.bind(d),
        this.open = function(t) {
            if (a = new WebSocket(u.url, n || []), t) {
                if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts) return
            } else d.dispatchEvent(r("connecting")),
            this.reconnectAttempts = 0; (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "attempt-connect", u.url);
            var i = a,
            s = setTimeout(function() { (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "connection-timeout", u.url),
                l = !0,
                i.close(),
                l = !1
            },
            u.timeoutInterval);
            a.onopen = function(n) {
                clearTimeout(s),
                (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "onopen", u.url),
                u.protocol = a.protocol,
                u.readyState = WebSocket.OPEN,
                u.reconnectAttempts = 0;
                var i = r("open");
                i.isReconnect = t,
                t = !1,
                d.dispatchEvent(i)
            },
            a.onclose = function(n) {
                if (clearTimeout(s), a = null, c) u.readyState = WebSocket.CLOSED,
                d.dispatchEvent(r("close"));
                else {
                    u.readyState = WebSocket.CONNECTING;
                    var i = r("connecting");
                    i.code = n.code,
                    i.reason = n.reason,
                    i.wasClean = n.wasClean,
                    d.dispatchEvent(i),
                    t || l || ((u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "onclose", u.url), d.dispatchEvent(r("close")));
                    var s = u.reconnectInterval * Math.pow(u.reconnectDecay, u.reconnectAttempts);
                    setTimeout(function() {
                        u.reconnectAttempts++,
                        u.open(!0)
                    },
                    s > u.maxReconnectInterval ? u.maxReconnectInterval: s)
                }
            },
            a.onmessage = function(t) { (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "onmessage", u.url, t.data);
                var n = r("message");
                n.data = t.data,
                d.dispatchEvent(n)
            },
            a.onerror = function(t) { (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "onerror", u.url, t),
                d.dispatchEvent(r("error"))
            }
        },
        1 == this.automaticOpen && this.open(!1),
        this.send = function(t) {
            if (a) return (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "send", u.url, t),
            a.send(t);
            throw "INVALID_STATE_ERR : Pausing to reconnect websocket"
        },
        this.close = function(e, t) {
            "undefined" == typeof e && (e = 1e3),
            c = !0,
            a && a.close(e, t)
        },
        this.refresh = function() {
            a && a.close()
        }
    }
    if ("WebSocket" in window) return e.prototype.onopen = function(e) {},
    e.prototype.onclose = function(e) {},
    e.prototype.onconnecting = function(e) {},
    e.prototype.onmessage = function(e) {},
    e.prototype.onerror = function(e) {},
    e.debugAll = !1,
    e.CONNECTING = WebSocket.CONNECTING,
    e.OPEN = WebSocket.OPEN,
    e.CLOSING = WebSocket.CLOSING,
    e.CLOSED = WebSocket.CLOSED,
    e
}),
delete define.amd,
function() {
    var e, t, n, i, r, s, o, a, u = require("github/jquery")["default"],
    c = require("github/observe"),
    l = c.observe;
    "undefined" != typeof WebSocket && null !== WebSocket && (e = require("reconnectingwebsocket"), o = {},
    n = {},
    t = null, r = function() {
        var t, i;
        if (t = document.head.querySelector("link[rel=web-socket]")) return i = new e(t.href),
        i.reconnectInterval = 2e3 * Math.random() + 1e3,
        i.reconnectDecay = 2,
        i.maxReconnectAttempts = 5,
        i.addEventListener("open",
        function() {
            try {
                for (var e in o) i.send("subscribe:" + e)
            } catch(t) {
                i.refresh()
            }
        }),
        i.addEventListener("message",
        function(e) {
            var t, i, r;
            r = JSON.parse(e.data),
            i = r[0],
            t = r[1],
            i && t && u(n[i]).trigger("socket:message", [t, i])
        }),
        i
    },
    i = function(e) {
        var t, n;
        return null != (t = null != (n = e.getAttribute("data-channel")) ? n.split(/\s+/) : void 0) ? t: []
    },
    s = function(e) {
        var s, a, u, c, l;
        if (null != t ? t: t = r()) for (l = t, c = i(e), s = 0, a = c.length; a > s; s++) u = c[s],
        l.readyState !== WebSocket.OPEN || o[u] || l.send("subscribe:" + u),
        o[u] = !0,
        null == n[u] && (n[u] = []),
        n[u].push(e)
    },
    a = function(e) {
        var t, r, s, o;
        for (o = i(e), t = 0, r = o.length; r > t; t++) s = o[t],
        n[s] = u(n[s]).not(e).slice(0)
    },
    l(".js-socket-channel[data-channel]", {
        add: s,
        remove: a
    }))
}.call(this),
function() {
    var e, t, n, i = require("delegated-events"),
    r = i.on;
    if (n = null != (t = document.querySelector("meta[name=user-login]")) ? t.content: void 0, null != n) {
        e = String( !! n.length);
        try {
            localStorage.setItem("logged-in", e)
        } catch(s) {
            return
        }
        window.addEventListener("storage",
        function(t) {
            var n;
            t.storageArea === localStorage && "logged-in" === t.key && t.newValue !== e && (e = t.newValue, n = document.querySelector(".js-stale-session-flash"), n.classList.toggle("is-signed-in", "true" === e), n.classList.toggle("is-signed-out", "false" === e), n.classList.remove("hidden"), window.addEventListener("popstate",
            function(e) {
                null != e.state.container && location.reload()
            }), r("submit", "form",
            function(e) {
                e.preventDefault()
            }))
        })
    }
} (),
define("github/text-field-mirror", ["exports"],
function(e) {
    function t(e, t) {
        var s = e.nodeName.toLowerCase();
        if ("textarea" !== s && "input" !== s) throw new Error("expected textField to a textarea or input");
        var o = r.get(e);
        if (o && o.parentElement === e.parentElement) o.innerHTML = "";
        else {
            o = document.createElement("div"),
            r.set(e, o);
            var a = window.getComputedStyle(e),
            u = n.slice(0);
            "textarea" === s ? u.push("white-space:pre-wrap;") : u.push("white-space:nowrap;");
            for (var c = 0,
            l = i.length; l > c; c++) {
                var d = i[c];
                u.push(d + ":" + a.getPropertyValue(d) + ";")
            }
            o.style.cssText = u.join(" ")
        }
        var h = void 0;
        t !== !1 && (h = document.createElement("span"), h.style.cssText = "position: absolute;", h.className = "text-field-mirror-marker", h.innerHTML = "&nbsp;");
        var f = void 0,
        m = void 0;
        if ("number" == typeof t) {
            var p = e.value.substring(0, t);
            p && (m = document.createTextNode(p)),
            p = e.value.substring(t),
            p && (f = document.createTextNode(p))
        } else {
            var g = e.value;
            g && (m = document.createTextNode(g))
        }
        return m && o.appendChild(m),
        h && o.appendChild(h),
        f && o.appendChild(f),
        o.parentElement || e.parentElement.insertBefore(o, e),
        o.scrollTop = e.scrollTop,
        o.scrollLeft = e.scrollLeft,
        o
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = t;
    var n = ["position:absolute;", "overflow:auto;", "word-wrap:break-word;", "top:0px;", "left:-9999px;"],
    i = ["box-sizing", "font-family", "font-size", "font-style", "font-variant", "font-weight", "height", "letter-spacing", "line-height", "max-height", "min-height", "padding-bottom", "padding-left", "padding-right", "padding-top", "border-bottom", "border-left", "border-right", "border-top", "text-decoration", "text-indent", "text-transform", "width", "word-spacing"],
    r = new WeakMap
}),
define("github/text-field-selection-position", ["exports", "./jquery", "./text-field-mirror"],
function(e, t, n) {
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function r(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? e.selectionEnd: arguments[1],
        n = o["default"](e, t),
        i = s["default"](n).find(".text-field-mirror-marker").position();
        return i.top += parseInt(s["default"](n).css("border-top-width"), 10),
        i.left += parseInt(s["default"](n).css("border-left-width"), 10),
        setTimeout(function() {
            s["default"](n).remove()
        },
        5e3),
        i
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = r;
    var s = i(t),
    o = i(n)
}),
define("github/suggester", ["exports", "./jquery", "./fetch", "./hotkey", "./text-field-selection-position"],
function(e, t, n, i, r) {
    function s(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = s(t),
    u = s(i),
    c = s(r),
    l = function() {
        function e(e, t) {
            var n = [],
            i = !0,
            r = !1,
            s = void 0;
            try {
                for (var o, a = e[Symbol.iterator](); ! (i = (o = a.next()).done) && (n.push(o.value), !t || n.length !== t); i = !0);
            } catch(u) {
                r = !0,
                s = u
            } finally {
                try { ! i && a["return"] && a["return"]()
                } finally {
                    if (r) throw s
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    } (),
    d = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        return function(t, n, i) {
            return n && e(t.prototype, n),
            i && e(t, i),
            t
        }
    } (),
    h = {},
    f = function() {
        function e(t) {
            o(this, e),
            this.setup = this.setup.bind(this),
            this.teardown = this.teardown.bind(this),
            this.textarea = t.input,
            this.types = t.types,
            this.suggester = t.suggester,
            this.repositionManually = t.repositionManually,
            this.teardownManually = t.teardownManually,
            this.onActivate = t.onActivate,
            this.suggestions = t.suggestions || document.createElement("div"),
            this.disable = t.disable
        }
        return d(e, [{
            key: "setup",
            value: function() {
                a["default"](this.textarea.form).on("reset.suggester", this.deactivate.bind(this)),
                a["default"](this.textarea).on("paste.suggester", this.onPaste.bind(this)),
                a["default"](this.textarea).on("input.suggester", this.onInput.bind(this)),
                a["default"](this.suggester).on("navigation:keydown.suggester", "[data-value]", this.onNavigationKeyDown.bind(this)),
                a["default"](this.suggester).on("navigation:open.suggester", "[data-value]", this.onNavigationOpen.bind(this)),
                this.teardownManually || a["default"](this.textarea).on("focusout:delayed.suggester", this.teardown),
                this.loadSuggestions()
            }
        },
        {
            key: "teardown",
            value: function() {
                this.deactivate(),
                a["default"](this.textarea).off(".suggester"),
                a["default"](this.textarea.form).off(".suggester"),
                a["default"](this.suggester).off(".suggester"),
                this.onSuggestionsLoaded = function() {
                    return null
                }
            }
        },
        {
            key: "onPaste",
            value: function() {
                this.deactivate(),
                this.justPasted = !0
            }
        },
        {
            key: "onInput",
            value: function() {
                return this.justPasted ? void(this.justPasted = !1) : this.checkQuery() ? !1 : void 0
            }
        },
        {
            key: "onNavigationKeyDown",
            value: function(e) {
                switch (u["default"](e.originalEvent)) {
                case "tab":
                    return this.onNavigationOpen(e),
                    !1;
                case "esc":
                    return this.deactivate(),
                    e.stopImmediatePropagation(),
                    !1
                }
            }
        },
        {
            key: "onNavigationOpen",
            value: function(e) {
                var t = void 0;
                t = this.currentSearch.type.getValue ? this.currentSearch.type.getValue(e.target) : e.target.getAttribute("data-value");
                var n = this.textarea.value.substring(0, this.currentSearch.endIndex),
                i = this.textarea.value.substring(this.currentSearch.endIndex);
                this.currentSearch.type.onSelection ? this.currentSearch.type.onSelection(t) : (n = n.replace(this.currentSearch.type.match, this.currentSearch.type.replace.replace("$value", t)), this.textarea.value = n + i),
                this.deactivate(),
                this.textarea.focus(),
                this.textarea.selectionStart = n.length,
                this.textarea.selectionEnd = n.length
            }
        },
        {
            key: "checkQuery",
            value: function() {
                var e = this,
                t = this.searchQuery();
                if (t) {
                    if (this.currentSearch && this.currentSearch === t.query) return;
                    return this.currentSearch = t,
                    this.search(t.type, t.query).then(function(n) {
                        return n ? e.activate(t.startIndex) : e.deactivate()
                    }),
                    this.currentSearch.query
                }
                return this.currentSearch = null,
                void this.deactivate()
            }
        },
        {
            key: "activate",
            value: function(e) {
                this.onActivate && this.onActivate(this.suggester),
                this.repositionManually || a["default"](this.suggester).css(c["default"](this.textarea, e + 1)),
                this.suggester.classList.contains("active") || (this.suggester.classList.add("active"), this.textarea.classList.add("js-navigation-enable"), a["default"](this.suggester).navigation("push"), a["default"](this.suggester).navigation("focus"))
            }
        },
        {
            key: "deactivate",
            value: function() {
                this.suggester.classList.contains("active") && (this.suggester.classList.remove("active"), a["default"](this.suggester).find(".suggestions").hide(), this.textarea.classList.remove("js-navigation-enable"), a["default"](this.suggester).navigation("pop"))
            }
        },
        {
            key: "search",
            value: function(e, t) {
                var n = this;
                return e.search(this.suggestions, t).then(function(e) {
                    var t = l(e, 2),
                    i = t[0],
                    r = t[1];
                    if (r > 0) {
                        var s = i[0].cloneNode(!0);
                        return n.suggester.innerHTML = "",
                        n.suggester.appendChild(s),
                        a["default"](s).show(),
                        a["default"](n.suggester).navigation("focus"),
                        !0
                    }
                    return ! 1
                })
            }
        },
        {
            key: "searchQuery",
            value: function() {
                var e = this.textarea.selectionEnd,
                t = this.textarea.value.substring(0, e);
                if (!this.disable || !this.disable(t)) for (var n in this.types) {
                    var i = this.types[n],
                    r = t.match(i.match);
                    if (r) return i.normalizeMatch ? i.normalizeMatch(i, e, r) : this.normalizeMatch(i, e, r)
                }
            }
        },
        {
            key: "normalizeMatch",
            value: function(e, t, n) {
                var i = n[2],
                r = n[3],
                s = t - i.length,
                o = t;
                return {
                    type: e,
                    text: i,
                    query: r,
                    startIndex: s,
                    endIndex: o
                }
            }
        },
        {
            key: "loadSuggestions",
            value: function() {
                var e = this;
                if (!this.suggestions.hasChildNodes()) {
                    var t = this.suggester.getAttribute("data-url");
                    if (t) {
                        var i = h[t] || (h[t] = n.fetchText(t));
                        return i.then(function(t) {
                            return e.onSuggestionsLoaded(t)
                        })
                    }
                }
            }
        },
        {
            key: "onSuggestionsLoaded",
            value: function(e) {
                var t = this;
                return a["default"].parseHTML(e).forEach(function(e) {
                    return t.suggestions.appendChild(e)
                }),
                document.activeElement === this.textarea ? (this.currentSearch = null, this.checkQuery()) : void 0
            }
        }]),
        e
    } ();
    e["default"] = f
}),
function() {
    var e, t, n, i, r, s, o, a, u, c, l, d, h, f, m, p, g = require("github/jquery")["default"];
    a = require("github/feature-detection")["default"],
    e = require("github/suggester")["default"],
    h = function(e, t, n) {
        var i, r, s, o;
        return o = n[3],
        r = n[4],
        s = t - r.length,
        i = t,
        {
            type: e,
            text: o,
            query: r,
            startIndex: s,
            endIndex: i
        }
    },
    p = {
        mention: {
            match: /(^|\s)(@([a-z0-9\-_\/]*))$/i,
            replace: "$1@$value ",
            search: function(e, t) {
                var i, r, s;
                return s = c(t),
                i = g(e).find("ul.mention-suggestions"),
                r = i.fuzzyFilterSortList(t, {
                    limit: 5,
                    text: n,
                    score: s.score
                }),
                Promise.resolve([i, r])
            }
        },
        auditLogUser: {
            match: /(^|\s)((\-?actor:|\-?user:)([a-z0-9\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function(e, t) {
                var n, i;
                return n = g(e).find("ul.user-suggestions"),
                i = n.fuzzyFilterSortList(t, {
                    limit: 5
                }),
                Promise.resolve([n, i])
            },
            normalizeMatch: h
        },
        auditLogOrg: {
            match: /(^|\s)((\-?org:)([a-z0-9\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function(e, t) {
                var n, i;
                return n = g(e).find("ul.org-suggestions"),
                i = n.fuzzyFilterSortList(t, {
                    limit: 5
                }),
                Promise.resolve([n, i])
            },
            normalizeMatch: h
        },
        auditLogAction: {
            match: /(^|\s)((\-?action:)([a-z0-9\.\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function(e, t) {
                var n, i;
                return n = g(e).find("ul.action-suggestions"),
                i = n.fuzzyFilterSortList(t, {
                    limit: 5
                }),
                Promise.resolve([n, i])
            },
            normalizeMatch: h
        },
        auditLogRepo: {
            match: /(^|\s)((\-?repo:)([a-z0-9\/\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function(e, t) {
                var n, i;
                return n = g(e).find("ul.repo-suggestions"),
                i = n.fuzzyFilterSortList(t, {
                    limit: 5
                }),
                Promise.resolve([n, i])
            },
            normalizeMatch: h
        },
        auditLogCountry: {
            match: /(^|\s)((\-?country:)([a-z0-9\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function(e, t) {
                var n, i;
                return n = g(e).find("ul.country-suggestions"),
                i = n.fuzzyFilterSortList(t, {
                    limit: 5
                }),
                Promise.resolve([n, i])
            },
            normalizeMatch: h
        },
        emoji: {
            match: /(^|\s)(:([a-z0-9\-\+_]*))$/i,
            replace: "$1$value ",
            getValue: function(e) {
                return a.emoji && e.getAttribute("data-raw-value") || e.getAttribute("data-value")
            },
            search: function(e, t) {
                var n, i;
                return n = g(e).find("ul.emoji-suggestions"),
                t = " " + t.toLowerCase().replace(/_/g, " "),
                i = n.fuzzyFilterSortList(t, {
                    limit: 5,
                    text: o,
                    score: s
                }),
                Promise.resolve([n, i])
            }
        },
        hashed: {
            match: /(^|\s)(\#([a-z0-9\-_\/]*))$/i,
            replace: "$1#$value ",
            search: function(e, t) {
                var i, r, s, o;
                return i = g(e).find("ul.hashed-suggestions"),
                r = /^\d+$/.test(t) ? (s = new RegExp("\\b" + t),
                function(e) {
                    return d(e, s)
                }) : c(t).score,
                o = i.fuzzyFilterSortList(t, {
                    limit: 5,
                    text: n,
                    score: r
                }),
                Promise.resolve([i, o])
            }
        }
    },
    r = {},
    o = function(e) {
        var t;
        return t = e.getAttribute("data-emoji-name"),
        r[t] = " " + n(e).replace(/_/g, " "),
        t
    },
    n = function(e) {
        return e.getAttribute("data-text").trim().toLowerCase()
    },
    s = function(e, t) {
        var n;
        return n = r[e].indexOf(t),
        n > -1 ? 1e3 - n: 0
    },
    d = function(e, t) {
        var n;
        return n = e.search(t),
        n > -1 ? 1e3 - n: 0
    },
    f = function(e, n) {
        var i, r, s, o, a, u, c;
        if (c = t(e, n[0]), 0 !== c.length) {
            if (1 === n.length) return [c[0], 1, []];
            for (a = null, r = 0, s = c.length; s > r; r++) u = c[r],
            (i = l(e, n, u + 1)) && (o = i[i.length - 1] - u, (!a || o < a[1]) && (a = [u, o, i]));
            return a
        }
    },
    t = function(e, t) {
        var n, i;
        for (n = 0, i = []; (n = e.indexOf(t, n)) > -1;) i.push(n++);
        return i
    },
    l = function(e, t, n) {
        var i, r, s, o;
        for (r = [], i = s = 1, o = t.length; o >= 1 ? o > s: s > o; i = o >= 1 ? ++s: --s) {
            if (n = e.indexOf(t[i], n), -1 === n) return;
            r.push(n++)
        }
        return r
    },
    u = function() {
        return 2
    },
    c = function(e) {
        var t, n;
        return e ? (t = e.toLowerCase().split(""), n = function(n) {
            var i, r;
            return n && (i = f(n, t)) ? (r = e.length / i[1], r /= i[0] / 2 + 1) : 0
        }) : n = u,
        {
            score: n
        }
    },
    i = function(e) {
        var t;
        return t = e.match(/`{3,}/g),
        t || (t = m(e).match(/`/g)),
        (null != t ? t.length: void 0) % 2
    },
    m = function(e) {
        return e.replace(/`{3,}[^`]*\n(.+)?\n`{3,}/g, "")
    },
    g(document).on("focusin:delayed", ".js-suggester-field",
    function() {
        new e({
            input: this,
            suggester: this.closest(".js-suggester-container").querySelector(".js-suggester"),
            types: p,
            disable: i
        }).setup()
    })
}.call(this),
function() {
    function e() {
        return "survey-" + document.querySelector(".js-survey").getAttribute("data-survey-slug")
    }
    function t() {
        return parseInt(f(e())) || 0
    }
    function n() {
        var n = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
        m(e(), t() + n)
    }
    function i() {
        return "github.dev" === location.hostname || location.search.match(/show-survey=1/) ? !0 : t() < v
    }
    function r(e) {
        if (e.getAttribute("data-optional-question")) return ! 0;
        var t = e.querySelector("input.js-other-choice"),
        n = e.querySelector("input[type=text]");
        if (t && t.checked) {
            var i = n.value.trim();
            return i
        }
        return e.querySelector("input:checked") ? !0 : !1
    }
    function s(e) {
        var t = e.closest(".js-survey"),
        n = t.querySelector(".js-survey-button");
        n.disabled = !r(e)
    }
    function o(e) {
        var t = e.querySelector("input.js-other-choice"),
        n = e.querySelector("input[type=text]");
        t && (n.classList.toggle("hidden", !t.checked), t.checked && n.focus())
    }
    function a(e, t) {
        var i = e.querySelector(".js-survey-form"),
        r = e.querySelectorAll(".js-survey-box-header, .js-survey-body, .js-survey-footer"),
        s = e.querySelector(".js-survey-complete");
        t.classList.toggle("hidden", !0),
        Array.from(r).forEach(function(e) {
            return e.classList.toggle("hidden", !0)
        }),
        s.classList.toggle("hidden", !1),
        g({
            category: "survey",
            action: "click",
            label: "submit"
        }),
        n(v),
        c(i).submit(),
        e.classList.contains("js-survey-fixed") && setTimeout(function() {
            return e.classList.toggle("anim-fade-down", !0)
        },
        5e3)
    }
    function u(e, t, n) {
        var i = n.getAttribute("data-next-question"),
        r = e.querySelector(".js-question-" + i),
        o = e.querySelector(".js-question-number");
        g({
            category: "survey",
            action: "click",
            label: "next",
            value: i
        }),
        o.textContent = parseInt(i) + 1,
        r.classList.toggle("hidden", !1),
        s(r),
        r.getAttribute("data-last-question") && (r.querySelector("textarea").focus(), t.textContent = "Submit", t.classList.add("btn-primary"))
    }
    var c = require("github/jquery")["default"],
    l = require("github/observe"),
    d = l.observe,
    h = require("github/local-storage"),
    f = h.getItem,
    m = h.setItem,
    p = require("github/google-analytics"),
    g = p.trackEvent,
    v = 3;
    d(".js-survey",
    function() {
        i() ? (g({
            category: "survey",
            action: "show",
            interactive: !1
        }), n(), this.classList.toggle("hidden", !1)) : this.classList.toggle("hidden", !0)
    }),
    c(document).on("ajaxSuccess", ".js-survey-form",
    function() {
        g({
            category: "survey",
            action: "success"
        })
    }),
    c(document).on("click", ".js-survey-button",
    function() {
        var e = this.closest(".js-survey"),
        t = e.querySelector(".js-question:not(.hidden)"),
        n = t.getAttribute("data-last-question"),
        i = this;
        t.classList.toggle("hidden", !0),
        n ? a(e, i) : u(e, i, t)
    }),
    c(document).on("click", ".js-dismiss-survey",
    function(e) {
        g({
            category: "survey",
            action: "click",
            label: "dismiss"
        }),
        document.querySelector(".js-survey").classList.toggle("anim-fade-down", !0),
        n(v),
        e.preventDefault()
    }),
    c(document).on("change", ".js-survey",
    function() {
        var e = this.querySelector(".js-question:not(.hidden)");
        s(e),
        o(e)
    }),
    d(".js-survey input[type=text]",
    function() {
        c(this).on("input",
        function() {
            var e = this.closest(".js-survey"),
            t = e.querySelector(".js-question:not(.hidden)");
            s(t)
        })
    })
} ();
var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value" in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i)
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n),
        i && e(t, i),
        t
    }
} (); !
function() {
    var e = require("github/jquery")["default"],
    t = require("github/suggester")["default"],
    n = require("github/fuzzy-filter").fuzzyScore,
    i = require("github/hotkey")["default"],
    r = require("github/observe"),
    s = r.observe,
    o = function() {
        function r(e) {
            _classCallCheck(this, r),
            this.container = e.container,
            this.selections = e.selections,
            this.inputWrap = e.inputWrap,
            this.input = e.input,
            this.suggestions = e.suggestions,
            this.tagTemplate = e.tagTemplate
        }
        return _createClass(r, [{
            key: "setup",
            value: function() {
                this.container.addEventListener("click",
                function(e) {
                    e.target.matches(".js-remove") ? this.removeTag(e) : this.onFocus()
                }.bind(this)),
                this.input.addEventListener("focus", this.onFocus.bind(this)),
                this.input.addEventListener("blur", this.onBlur.bind(this)),
                this.input.addEventListener("keydown", this.onKeyDown.bind(this)),
                this.setupSuggester()
            }
        },
        {
            key: "setupSuggester",
            value: function() {
                var e = this.suggestions.cloneNode(!0);
                this.container.appendChild(e),
                new t({
                    input: this.input,
                    suggester: this.suggestions,
                    suggestions: e,
                    repositionManually: !0,
                    teardownManually: !0,
                    onActivate: this.repositionSuggester.bind(this),
                    types: {
                        tag: {
                            match: /.+/i,
                            onSelection: this.selectTag.bind(this),
                            search: this.filterSuggestions.bind(this),
                            normalizeMatch: this.normalizeSuggestionMatch.bind(this)
                        }
                    }
                }).setup(),
                this.container.classList.add("js-suggester-container"),
                this.suggestions.classList.add("js-navigation-container", "suggester")
            }
        },
        {
            key: "onFocus",
            value: function() {
                this.inputWrap.classList.add("focus"),
                this.input != document.activeElement && this.input.focus()
            }
        },
        {
            key: "onBlur",
            value: function() {
                this.inputWrap.classList.remove("focus")
            }
        },
        {
            key: "onKeyDown",
            value: function(e) {
                switch (i(e)) {
                case "backspace":
                    this.onBackspace(e);
                    break;
                case "enter":
                case "tab":
                case ",":
                    !this.isSuggesterVisible() && this.val() && (e.preventDefault(), this.selectTag(this.val()))
                }
            }
        },
        {
            key: "selectTag",
            value: function(e) {
                var t = this.normalizeTag(e);
                t && (this.selections.appendChild(this.templateTag(t)), this.input.value = "")
            }
        },
        {
            key: "removeTag",
            value: function(e) {
                e.preventDefault(),
                e.target.closest(".tag-input-tag").remove()
            }
        },
        {
            key: "templateTag",
            value: function(e) {
                var t = this.tagTemplate.cloneNode(!0);
                return t.querySelector("input").value = e,
                t.querySelector(".js-placeholder-tag-name").replaceWith(e),
                t.classList.remove("hidden", "js-template"),
                t
            }
        },
        {
            key: "normalizeTag",
            value: function(e) {
                return e.toLowerCase().trim().replace(/[\s,']+/g, "-")
            }
        },
        {
            key: "onBackspace",
            value: function() {
                if (!this.val()) {
                    var e = this.selections.querySelector("li:last-child .js-remove");
                    e && e.click()
                }
            }
        },
        {
            key: "val",
            value: function() {
                return this.input.value
            }
        },
        {
            key: "repositionSuggester",
            value: function(e) {
                e.style.position = "absolute",
                e.style.top = this.container.clientHeight + "px"
            }
        },
        {
            key: "filterSuggestions",
            value: function(t, i) {
                var r = this.selectedTags(),
                s = e(t).find("ul.js-tag-suggestions"),
                o = s.fuzzyFilterSortList(i, {
                    limit: 5,
                    score: function(e, t) {
                        return r.indexOf(e) >= 0 ? 0 : n(e, t)
                    }
                });
                return Promise.resolve([s, o])
            }
        },
        {
            key: "normalizeSuggestionMatch",
            value: function(e, t, n) {
                return {
                    type: e,
                    text: n[0],
                    query: n[0]
                }
            }
        },
        {
            key: "selectedTags",
            value: function() {
                var e = this.selections.querySelectorAll("input");
                return [].concat(_toConsumableArray(e)).map(function(e) {
                    return e.value
                })
            }
        },
        {
            key: "isSuggesterVisible",
            value: function() {
                return !! this.suggestions.offsetParent
            }
        }]),
        r
    } ();
    s(".js-tag-input-container",
    function() {
        var e = this.querySelector(".js-template");
        e.remove(),
        new o({
            container: this,
            inputWrap: this.querySelector(".js-tag-input-wrapper"),
            input: this.querySelector('input[type="text"]'),
            suggestions: this.querySelector(".js-tag-input-options"),
            selections: this.querySelector(".js-tag-input-selected-tags"),
            tagTemplate: e
        }).setup()
    })
} (),
function() {
    var e, t, n, i, r, s = require("github/jquery")["default"];
    e = require("github/fetch").fetchJSON,
    n = require("github/observe").observe,
    t = function() {
        var t, n, o, a, u, c;
        if (c = this.getAttribute("data-url")) return u = e(c),
        o = this.getAttribute("data-id"),
        a = s(".js-team-mention[data-id='" + o + "']"),
        a.removeAttr("data-url"),
        t = function(e) {
            return 0 === e.total ? e.members.push("This team has no members") : e.total > e.members.length && e.members.push(e.total - e.members.length + " more"),
            r(a, i(e.members))
        },
        n = function(e) {
            return function(t) {
                var n, i, s;
                return s = (null != (i = t.response) ? i.status: void 0) || 500,
                n = function() {
                    switch (s) {
                    case 404:
                        return this.getAttribute("data-permission-text");
                    default:
                        return this.getAttribute("data-error-text")
                    }
                }.call(e),
                r(a, n)
            }
        } (this),
        u.then(t, n)
    },
    r = function(e, t) {
        return e.attr("aria-label", t),
        e.addClass("tooltipped tooltipped-s tooltipped-multiline")
    },
    i = function(e) {
        var t;
        return 0 === e.length ? "": 1 === e.length ? e[0] : 2 === e.length ? e.join(" and ") : ([].splice.apply(e, [ - 1, 9e9].concat(t = "and " + e.slice( - 1))), e.join(", "))
    },
    n(".js-team-mention",
    function() {
        s(this).on("mouseenter", t)
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxBeforeSend",
    function(t, n, i) {
        var r;
        i.crossDomain || (r = e(".js-timeline-marker"), r.length && n.setRequestHeader("X-Timeline-Last-Modified", r.attr("data-last-modified")))
    })
}.call(this);
var _slicedToArray = function() {
    function e(e, t) {
        var n = [],
        i = !0,
        r = !1,
        s = void 0;
        try {
            for (var o, a = e[Symbol.iterator](); ! (i = (o = a.next()).done) && (n.push(o.value), !t || n.length !== t); i = !0);
        } catch(u) {
            r = !0,
            s = u
        } finally {
            try { ! i && a["return"] && a["return"]()
            } finally {
                if (r) throw s
            }
        }
        return n
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
} (); (function() {
    function e(e) {
        for (var t = 0; t < l.length; t++) {
            var n = l[t].exec(e);
            if (null != n) return [n[1], n[2]]
        }
    }
    function t(e, t, n) {
        var i = new URL(e.getAttribute("data-fragment-url"), window.location.origin),
        r = new URLSearchParams(i.search.slice(1));
        r.append("focus_type", t),
        r.append("focus_value", n),
        i.search = r.toString(),
        e.src = i.toString()
    }
    function n() {
        return window.location.hash.slice(1)
    }
    var i = require("github/dimensions"),
    r = i.overflowOffset,
    s = require("github/observe"),
    o = s.observe,
    a = require("delegated-events"),
    u = a.on;
    u("click", ".js-timeline-progressive-disclosure-button",
    function() {
        var e = this.closest(".js-timeline-progressive-disclosure-container");
        e.src = this.getAttribute("data-url")
    });
    var c = null;
    o(".js-timeline-progressive-disclosure-container",
    function() {
        return {
            add: function(e) {
                return e.addEventListener("loadstart",
                function() {
                    return this.classList.add("is-loading"),
                    !0
                }),
                e.addEventListener("loadend",
                function() {
                    return this.classList.remove("is-loading"),
                    !0
                }),
                e.addEventListener("load",
                function() {
                    if (e === c) {
                        c = null;
                        var t = n(),
                        i = document.getElementById(t);
                        if (i) {
                            var s = i.closest(".js-details-container");
                            null != s && s.classList.add("open");
                            var o = r(i); (o.top < 0 || o.bottom < 0) && i.scrollIntoView()
                        }
                    }
                    return ! 0
                }),
                e.addEventListener("error",
                function() {
                    return this.src = "",
                    !0
                })
            }
        }
    });
    var l = [/^(commitcomment)-(\d+)$/, /^(commits-pushed)-([0-9a-f]{7})$/, /^(discussion)_r(\d+)$/, /^(discussion-diff)-(\d+)(?:[LR]-?\d+)?$/, /^(event)-(\d+)$/, /^(issuecomment)-(\d+)$/, /^(ref-commit)-([0-9a-f]{7})$/, /^(ref-issue)-(\d+)$/, /^(ref-pullrequest)-(\d+)$/]; !
    function() {
        var i = n();
        if (!document.getElementById(i)) {
            var r = document.querySelector(".js-timeline-progressive-disclosure-container");
            if (r) {
                var s = e(i);
                if (s) {
                    var o = _slicedToArray(s, 2),
                    a = o[0],
                    u = o[1];
                    return t(r, a, u),
                    c = r
                }
            }
        }
    } ()
}).call(this),
function() {
    function e() {
        if (!window.performance.timing) try {
            return sessionStorage.setItem("navigationStart", Date.now())
        } catch(e) {}
    }
    function t() {
        return setTimeout(function() {
            var e, t, r, s, o, a, u, c, l, d, h;
            if (d = {},
            d.crossBrowserLoadEvent = Date.now(), window.performance.timing) {
                o = window.performance.timing;
                for (t in o) h = o[t],
                "number" == typeof h && (d[t] = h);
                var f = null != (a = window.chrome) && "function" == typeof a.loadTimes && null != (u = a.loadTimes()) ? u.firstPaintTime: void 0;
                f && (d.chromeFirstPaintTime = Math.round(1e3 * f))
            } else s = function() {
                try {
                    return sessionStorage.getItem("navigationStart")
                } catch(e) {}
            } (),
            s && (d.simulatedNavigationStart = parseInt(s, 10));
            for (l = function() {
                var e, t, i, r;
                for (i = window.performance.getEntriesByType("resource"), r = [], e = 0, t = i.length; t > e; e++) c = i[e],
                r.push(n.extend({},
                c));
                return r
            } (), e = 0, r = l.length; r > e; e++) c = l[e],
            delete c.toJSON;
            return Object.keys(d).length > 1 || l.length ? i({
                timing: d,
                resources: l
            }) : void 0
        },
        0)
    }
    var n = require("github/jquery")["default"],
    i = require("github/stats")["default"];
    n(window).on("pagehide", e),
    n(window).on("load", t)
}.call(this),
function() {
    var e, t, n, i = require("github/jquery")["default"],
    r = require("github/observe"),
    s = r.observe;
    n = 0,
    t = function() {
        var e;
        if (document.hasFocus() && (e = document.querySelector(".js-timeline-marker-form"))) return i(e).submit()
    },
    i.inViewport(".js-unread-item", {
        "in": function() {
            e(this)
        }
    }),
    s(".js-unread-item", {
        add: function() {
            return n++
        },
        remove: function() {
            return n--,
            0 === n ? t(this) : void 0
        }
    }),
    e = function(e) {
        return e.classList.remove("js-unread-item", "unread-item")
    },
    i(document).on("socket:message", ".js-discussion",
    function(t) {
        var n, i, r, s;
        if (this === t.target) for (s = document.querySelectorAll(".js-unread-item"), i = 0, r = s.length; r > i; i++) n = s[i],
        e(n)
    })
}.call(this),
function() {
    function e() {
        var e;
        return e = n ? "(" + n + ") ": "",
        document.title.match(t) ? document.title = document.title.replace(t, e) : document.title = "" + e + document.title
    }
    var t, n, i = require("github/observe"),
    r = i.observe;
    n = 0,
    t = /^\(\d+\)\s+/,
    r(".js-unread-item", {
        add: function() {
            return n++,
            e()
        },
        remove: function() {
            return n--,
            e()
        }
    })
}.call(this),
function() {
    var e, t, n = require("github/jquery")["default"];
    e = require("github/fragment-target").findElementByFragmentName,
    t = function() {
        var t, n;
        if (location.hash && !document.querySelector(":target")) {
            try {
                t = decodeURIComponent(location.hash.slice(1))
            } catch(i) {
                return
            }
            n = e(document, "user-content-" + t),
            null != n && n.scrollIntoView()
        }
    },
    window.addEventListener("hashchange", t),
    n(t),
    document.addEventListener("pjax:success", t)
}.call(this),
function() {
    var e, t, n, i, r, s, o, a = require("github/jquery")["default"],
    u = require("github/observe"),
    c = u.observe;
    o = document.createElement("input"),
    "checkValidity" in o ? (o.required = !0, o.value = "hi", s = o.cloneNode().checkValidity()) : s = !1,
    o = null,
    n = function(i) {
        var r, o, u, c, l;
        if (s) return i.checkValidity();
        if (r = a(i), r.is("[required]") && !t(i)) return ! 1;
        if (r.is("[pattern]") && !e(i)) return ! 1;
        if (r.is("form")) for (l = i.elements, u = 0, c = l.length; c > u; u++) if (o = l[u], !n(o)) return ! 1;
        return ! 0
    },
    t = function(e) {
        return !! e.value.trim()
    },
    e = function(e) {
        var t;
        return t = new RegExp("^(?:" + a(e).attr("pattern") + ")$"),
        0 === e.value.search(t)
    },
    i = function() {
        var e;
        return e = n(this),
        e && a(this).trigger("validation:field:change"),
        function() {
            var t;
            t = n(this),
            t !== e && a(this).trigger("validation:field:change"),
            e = t
        }
    },
    r = ["input[pattern]", "input[required]", "textarea[required]", "select[required]"].join(","),
    a(document).onFocusedInput(r, i),
    a(document).on("change", r, i),
    c(r,
    function() {
        a(this).trigger("validation:field:change")
    }),
    a(document).on("validation:field:change", "form",
    function() {
        var e;
        return e = n(this),
        a(this).trigger("validation:change", [e])
    }),
    a(document).on("validation:change", "form",
    function(e, t) {
        return a(this).find("button[data-disable-invalid]").prop("disabled", !t)
    }),
    a(document).on("submit", ".js-normalize-submit",
    function(e) {
        return n(this) ? void 0 : e.preventDefault()
    })
}.call(this),
function() {
    var e, t = require("github/observe"),
    n = t.observe;
    n(".will-transition-once", {
        add: function() {
            this.addEventListener("transitionend", e)
        },
        remove: function() {
            this.removeEventListener("transitionend", e)
        }
    }),
    e = function(e) {
        return e.target.classList.remove("will-transition-once")
    }
}.call(this),
function() {
    var e, t, n, i, r, s, o, a, u, c, l = require("github/jquery")["default"],
    d = require("github/observe"),
    h = d.observe,
    f = function(e, t) {
        function n() {
            this.constructor = e
        }
        for (var i in t) m.call(t, i) && (e[i] = t[i]);
        return n.prototype = t.prototype,
        e.prototype = new n,
        e.__super__ = t.prototype,
        e
    },
    m = {}.hasOwnProperty;
    u = require("github/failbot").reportError,
    c = require("github/inspect")["default"],
    t = function(e) {
        function t(e) {
            this.name = "ImageWithoutAltAttributeError",
            this.stack = (new Error).stack,
            this.element = e,
            this.message = "Missing alt attribute on " + c(e)
        }
        return f(t, e),
        t
    } (Error),
    n = function(e) {
        function t(e) {
            this.name = "LinkWithoutLabelError",
            this.stack = (new Error).stack,
            this.element = e,
            this.message = "Missing text, title, or aria-label attribute on " + c(e)
        }
        return f(t, e),
        t
    } (Error),
    i = function(e) {
        function t(e) {
            this.name = "LinkWithoutLabelOrRoleError",
            this.stack = (new Error).stack,
            this.element = e,
            this.message = "Missing href or role=button on " + c(e)
        }
        return f(t, e),
        t
    } (Error),
    r = function(e) {
        function t(e) {
            this.name = "LabelMissingControl",
            this.stack = (new Error).stack,
            this.element = e,
            this.message = "Label missing control on " + c(e)
        }
        return f(t, e),
        t
    } (Error),
    e = function(e) {
        function t(e) {
            this.name = "ButtonWithoutLabelError",
            this.stack = (new Error).stack,
            this.element = e,
            this.message = "Missing text or aria-label attribute on " + c(e)
        }
        return f(t, e),
        t
    } (Error),
    o = function(e) {
        return "true" === e.getAttribute("aria-hidden") || l(e).closest('[aria-hidden="true"]').length > 0
    },
    a = function(e) {
        if (!l("body").hasClass("zhio") && !l(e.element).hasClass("zh-login-status") && !l(e.element).parents().hasClass("markdown-body")) {
            var t = e.message;
            l("html").hasClass("is-staff") && console.warn(e.name + ": " + t),
            "1" == l("meta[name=accessibility-logger]").attr("value") && u(e, {
                bucket: "github-accessibility",
                message: t,
                "class": e.name
            })
        }
    },
    s = function(e) {
        var t, n, i, r, o;
        for (o = [], t = 0, n = e.length; n > t; t++) switch (i = e[t], i.nodeType) {
        case Node.ELEMENT_NODE:
            r = s(l(i).contents()),
            r && o.push(r),
            i.hasAttribute("alt") && o.push(i.getAttribute("alt")),
            i.hasAttribute("aria-label") && o.push(i.getAttribute("aria-label"));
            break;
        case Node.TEXT_NODE:
            r = i.data.trim(),
            r && o.push(r)
        }
        return o.join(" ").trim()
    },
    h("img",
    function() {
        this.hasAttribute("alt") || a(new t(this))
    }),
    h("a[href]",
    function() {
        o(this) || s(l(this)) || a(new n(this))
    }),
    h("a",
    function() {
        o(this) || this.hasAttribute("name") || this.getAttribute("href") || "" === this.getAttribute("href") || "button" === this.getAttribute("role") || a(new i(this))
    }),
    h("button",
    function() {
        o(this) || s(l(this)) || a(new e(this), this)
    }),
    h("label",
    function() {
        this.control || a(new r(this))
    }),
    h("input[type=text], textarea",
    function() {
        null != this.labels && (o(this) || this.labels.length > 0 || this.hasAttribute("aria-label") || a(new n(this)))
    })
}.call(this),
function() {
    var e = require("github/observe"),
    t = e.observe,
    n = require("github/google-analytics"),
    i = n.trackEvent,
    r = new WeakMap;
    t(".js-signup-form",
    function() {
        var e = this;
        e.addEventListener("input",
        function(t) {
            if (t.target.closest("input[type=text]") && !r.get(e)) {
                var n = e.querySelector(".js-signup-source");
                i({
                    category: "Signup",
                    action: "Attempt",
                    label: n.value
                }),
                r.set(e, !0)
            }
        })
    })
} (),
function() {
    var e = require("delegated-events"),
    t = e.on,
    n = require("github/fetch"),
    i = n.fetchText;
    t("click", ".js-new-user-contrib-example",
    function(e) {
        var t, n, r;
        e.preventDefault(),
        t = document.querySelector(".js-calendar-graph"),
        t.classList.contains("sample-graph") || (t.classList.add("sample-graph"), n = function(e) {
            var n = document.createElement("div");
            n.innerHTML = e;
            var i;
            i = t.querySelector(".js-calendar-graph-svg"),
            i.replaceWith(n.children[0])
        },
        r = function() {
            return t.classList.remove("sample-graph")
        },
        i(this.getAttribute("href")).then(n, r))
    })
}.call(this),
function() {
    var e, t, n, i, r, s, o, a, u, c, l = require("github/jquery")["default"],
    d = require("github/observe"),
    h = d.observe,
    f = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    };
    u = require("github/fetch"),
    o = u.fetchJSON,
    a = u.fetchPoll,
    i = function() {
        function i(e, t, n) {
            this.container = e,
            this.width = t,
            this.height = n,
            this.initError = f(this.initError, this),
            this.init = f(this.init, this),
            this.loaderInterval = null,
            this.loaderOffset = 0,
            this.ctx = this.initCanvas(this.container, this.width, this.height),
            this.startLoader("Loading graph data"),
            this.loadMeta()
        }
        return i.prototype.initCanvas = function(e) {
            var t, n, i, r, s, o, a;
            return r = e.getElementsByTagName("canvas")[0],
            r.style.zIndex = "0",
            i = r.width,
            n = r.height,
            s = r.getContext("2d"),
            o = window.devicePixelRatio || 1,
            t = s.webkitBackingStorePixelRatio || s.mozBackingStorePixelRatio || s.msBackingStorePixelRatio || s.oBackingStorePixelRatio || s.backingStorePixelRatio || 1,
            a = o / t,
            1 === a ? s: (r.width = i * a, r.height = n * a, r.style.width = i + "px", r.style.height = n + "px", s.scale(a, a), s)
        },
        i.prototype.startLoader = function(e) {
            return this.ctx.save(),
            this.ctx.font = "14px 'Helvetica Neue', Arial, sans-serif",
            this.ctx.fillStyle = "#cacaca",
            this.ctx.textAlign = "center",
            this.ctx.fillText(e, this.width / 2, 155),
            this.ctx.restore(),
            this.displayLoader()
        },
        i.prototype.stopLoader = function() {
            var e;
            return e = this.container.querySelector(".large-loading-area"),
            e.classList.add("is-hidden")
        },
        i.prototype.displayLoader = function() {
            var e;
            return e = this.container.querySelector(".large-loading-area"),
            e.classList.remove("is-hidden")
        },
        i.prototype.loadMeta = function() {
            var e, t;
            return e = function(e) {
                return e.json()
            },
            t = this.container.getAttribute("data-network-graph-meta-url"),
            a(t, {
                headers: {
                    accept: "application/json"
                }
            }).then(e, this.initError).then(this.init)
        },
        i.prototype.init = function(i) {
            var o, a, u, l, d, h;
            if (c) {
                for (this.focus = i.focus, this.nethash = i.nethash, this.spaceMap = i.spacemap, this.userBlocks = i.blocks, this.commits = function() {
                    var t, n, r, s;
                    for (r = i.dates, s = [], u = t = 0, n = r.length; n > t; u = ++t) o = r[u],
                    s.push(new e(u, o));
                    return s
                } (), this.users = {},
                d = i.users, a = 0, l = d.length; l > a; a++) h = d[a],
                this.users[h.name] = h;
                return this.chrome = new r(this, this.ctx, this.width, this.height, this.focus, this.commits, this.userBlocks, this.users),
                this.graph = new s(this, this.ctx, this.width, this.height, this.focus, this.commits, this.users, this.spaceMap, this.userBlocks, this.nethash),
                this.mouseDriver = new n(this.container, this.chrome, this.graph),
                this.keyDriver = new t(this.chrome, this.graph),
                this.stopLoader(),
                this.graph.drawBackground(),
                this.chrome.draw(),
                this.graph.requestInitialChunk()
            }
        },
        i.prototype.initError = function() {
            return this.stopLoader(),
            this.ctx.clearRect(0, 0, this.width, this.height),
            this.startLoader("Graph could not be drawn due to a network problem.")
        },
        i
    } (),
    e = function() {
        function e(e, t) {
            this.time = e,
            this.date = new Date(t),
            this.requested = null,
            this.populated = null
        }
        return e.prototype.populate = function(e, t, n) {
            return this.user = t,
            this.author = e.author,
            this.date = new Date(e.date.replace(" ", "T")),
            this.gravatar = e.gravatar,
            this.id = e.id,
            this.login = e.login,
            this.message = e.message,
            this.space = e.space,
            this.time = e.time,
            this.parents = this.populateParents(e.parents, n),
            this.requested = !0,
            this.populated = new Date
        },
        e.prototype.populateParents = function(e, t) {
            var n, i, r;
            return r = function() {
                var r, s, o;
                for (o = [], r = 0, s = e.length; s > r; r++) n = e[r],
                i = t[n[1]],
                i.id = n[0],
                i.space = n[2],
                o.push(i);
                return o
            } ()
        },
        e
    } (),
    r = function() {
        function e(e, t, n, i, r, s, o, a) {
            this.network = e,
            this.ctx = t,
            this.width = n,
            this.height = i,
            this.focus = r,
            this.commits = s,
            this.userBlocks = o,
            this.users = a,
            this.namesWidth = 120,
            this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            this.userBgColors = ["#fff", "#f7f7f7"],
            this.headerColor = "#f7f7f7",
            this.dividerColor = "#ddd",
            this.headerHeight = 40,
            this.dateRowHeight = 30,
            this.graphTopOffset = 10 + this.headerHeight + this.dateRowHeight,
            this.nameLineHeight = 24,
            this.offsetX = this.namesWidth + (this.width - this.namesWidth) / 2 - this.focus * this.nameLineHeight,
            this.offsetY = 0,
            this.contentHeight = this.calcContentHeight(),
            this.graphMidpoint = this.namesWidth + (this.width - this.namesWidth) / 2,
            this.activeUser = null
        }
        return e.prototype.moveX = function(e) {
            return this.offsetX += e,
            this.offsetX > this.graphMidpoint ? this.offsetX = this.graphMidpoint: this.offsetX < this.graphMidpoint - this.commits.length * this.nameLineHeight ? this.offsetX = this.graphMidpoint - this.commits.length * this.nameLineHeight: void 0
        },
        e.prototype.moveY = function(e) {
            return this.offsetY += e,
            this.offsetY > 0 || this.contentHeight < this.height - this.graphTopOffset ? this.offsetY = 0 : this.offsetY < -this.contentHeight + this.height / 2 ? this.offsetY = -this.contentHeight + this.height / 2 : void 0
        },
        e.prototype.calcContentHeight = function() {
            var e, t, n, i, r;
            for (t = 0, r = this.userBlocks, n = 0, i = r.length; i > n; n++) e = r[n],
            t += e.count;
            return t * this.nameLineHeight
        },
        e.prototype.hover = function(e, t) {
            var n, i, r, s;
            for (s = this.userBlocks, i = 0, r = s.length; r > i; i++) if (n = s[i], e > 0 && e < this.namesWidth && t > this.graphTopOffset + this.offsetY + n.start * this.nameLineHeight && t < this.graphTopOffset + this.offsetY + (n.start + n.count) * this.nameLineHeight) return this.users[n.name];
            return null
        },
        e.prototype.draw = function() {
            return this.drawTimeline(this.ctx),
            this.drawUsers(this.ctx)
        },
        e.prototype.drawTimeline = function(e) {
            var t, n, i, r, s, o, a, u, c, l, d, h, f;
            for (e.fillStyle = this.headerColor, e.fillRect(0, 0, this.width, this.headerHeight), e.fillStyle = this.dividerColor, e.fillRect(0, this.headerHeight - 1, this.width, 1), c = parseInt((0 - this.offsetX) / this.nameLineHeight), 0 > c && (c = 0), u = c + parseInt(this.width / (this.nameLineHeight - 1)), u > this.commits.length && (u = this.commits.length), e.save(), e.translate(this.offsetX, 0), a = null, o = null, s = r = h = c, f = u; f >= h ? f > r: r > f; s = f >= h ? ++r: --r) t = this.commits[s],
            l = this.months[t.date.getMonth()],
            l !== a && (e.font = "bold 12px 'Helvetica Neue', Arial, sans-serif", e.fillStyle = "#555", d = this.ctx.measureText(l).width, e.fillText(l, s * this.nameLineHeight - d / 2, this.headerHeight / 2 + 4), a = l),
            i = t.date.getDate(),
            i !== o && (e.font = "12px 'Helvetica Neue', Arial, sans-serif", e.fillStyle = "#555", n = this.ctx.measureText(i).width, e.fillText(i, s * this.nameLineHeight - n / 2, this.headerHeight + this.dateRowHeight / 2 + 3), o = i, e.fillStyle = "#ddd", e.fillRect(s * this.nameLineHeight, this.headerHeight, 1, 6));
            return e.restore()
        },
        e.prototype.drawUsers = function(e) {
            var t, n, i, r, s, o, a;
            for (e.fillStyle = "#fff", e.fillRect(0, 0, this.namesWidth, this.height), e.save(), e.translate(0, this.headerHeight + this.dateRowHeight + this.offsetY), o = this.userBlocks, i = n = 0, r = o.length; r > n; i = ++n) t = o[i],
            e.fillStyle = this.userBgColors[i % 2],
            e.fillRect(0, t.start * this.nameLineHeight, this.namesWidth, t.count * this.nameLineHeight),
            this.activeUser && this.activeUser.name === t.name && (e.fillStyle = "rgba(0, 0, 0, 0.05)", e.fillRect(0, t.start * this.nameLineHeight, this.namesWidth, t.count * this.nameLineHeight)),
            s = (t.start + t.count / 2) * this.nameLineHeight + 3,
            e.fillStyle = "rgba(0, 0, 0, 0.1)",
            e.fillRect(0, t.start * this.nameLineHeight + t.count * this.nameLineHeight - 1, this.namesWidth, 1),
            e.fillStyle = "#333",
            e.font = "13px 'Helvetica Neue', Arial, sans-serif",
            e.textAlign = "center",
            e.fillText(t.name, this.namesWidth / 2, s, 96);
            return e.restore(),
            e.fillStyle = this.headerColor,
            e.fillRect(0, 0, this.namesWidth, this.headerHeight),
            e.fillStyle = "#777",
            e.font = "12px 'Helvetica Neue', Arial, sans-serif",
            e.fillText("Owners", 40, this.headerHeight / 2 + 3),
            a = 10,
            e.fillStyle = this.dividerColor,
            e.fillRect(this.namesWidth - 1, a, 1, this.headerHeight - 2 * a),
            e.fillStyle = this.dividerColor,
            e.fillRect(0, this.headerHeight - 1, this.namesWidth, 1),
            e.fillStyle = this.dividerColor,
            e.fillRect(this.namesWidth - 1, this.headerHeight, 1, this.height - this.headerHeight)
        },
        e
    } (),
    s = function() {
        function e(e, t, n, i, r, s, o, a, u, c) {
            var l, d, h, f, m, p, g, v, b, y, j, w, x, q, k, S, L;
            for (this.network = e, this.ctx = t, this.width = n, this.height = i, this.focus = r, this.commits = s, this.users = o, this.spaceMap = a, this.userBlocks = u, this.nethash = c, this.namesWidth = 120, this.headerHeight = 40, this.dateRowHeight = 30, this.graphTopOffset = 10 + this.headerHeight + this.dateRowHeight, this.bgColors = ["#fff", "#f9f9f9"], this.nameLineHeight = 24, this.spaceColors = ["#c0392b", "#3498db", "#2ecc71", "#8e44ad", "#f1c40f", "#e67e22", "#34495e", "#e74c3c", "#2980b9", "#1abc9c", "#9b59b6", "#f39c12", "#7f8c8d", "#2c3e50", "#d35400", "#e74c3c", "#95a5a6", "#bdc3c7", "#16a085", "#27ae60"], this.offsetX = this.namesWidth + (this.width - this.namesWidth) / 2 - this.focus * this.nameLineHeight, this.offsetY = 0, this.bgCycle = 0, this.marginMap = {},
            this.gravatars = {},
            this.activeCommit = null, this.contentHeight = this.calcContentHeight(), this.graphMidpoint = this.namesWidth + (this.width - this.namesWidth) / 2, this.showRefs = !0, this.lastHotLoadCenterIndex = null, this.connectionMap = {},
            this.spaceUserMap = {},
            w = this.userBlocks, f = 0, g = w.length; g > f; f++) for (l = w[f], m = p = x = l.start, q = l.start + l.count; q >= x ? q > p: p > q; m = q >= x ? ++p: --p) this.spaceUserMap[m] = this.users[l.name];
            for (this.headsMap = {},
            k = this.userBlocks, y = 0, v = k.length; v > y; y++) for (l = k[y], L = this.users[l.name], S = L.heads, j = 0, b = S.length; b > j; j++) d = S[j],
            this.headsMap[d.id] || (this.headsMap[d.id] = []),
            h = {
                name: L.name,
                head: d
            },
            this.headsMap[d.id].push(h)
        }
        return e.prototype.moveX = function(e) {
            return this.offsetX += e,
            this.offsetX > this.graphMidpoint ? this.offsetX = this.graphMidpoint: this.offsetX < this.graphMidpoint - this.commits.length * this.nameLineHeight && (this.offsetX = this.graphMidpoint - this.commits.length * this.nameLineHeight),
            this.hotLoadCommits()
        },
        e.prototype.moveY = function(e) {
            return this.offsetY += e,
            this.offsetY > 0 || this.contentHeight < this.height - this.graphTopOffset ? this.offsetY = 0 : this.offsetY < -this.contentHeight + this.height / 2 ? this.offsetY = -this.contentHeight + this.height / 2 : void 0
        },
        e.prototype.toggleRefs = function() {
            return this.showRefs = !this.showRefs
        },
        e.prototype.calcContentHeight = function() {
            var e, t, n, i, r;
            for (t = 0, r = this.userBlocks, n = 0, i = r.length; i > n; n++) e = r[n],
            t += e.count;
            return t * this.nameLineHeight
        },
        e.prototype.hover = function(e, t) {
            var n, i, r, s, o, a, u, c;
            for (c = this.timeWindow(), r = i = s = c.min, o = c.max; o >= s ? o >= i: i >= o; r = o >= s ? ++i: --i) if (n = this.commits[r], a = this.offsetX + n.time * this.nameLineHeight, u = this.offsetY + this.graphTopOffset + n.space * this.nameLineHeight, e > a - 5 && a + 5 > e && t > u - 5 && u + 5 > t) return n;
            return null
        },
        e.prototype.hotLoadCommits = function() {
            var e, t, n, i, r, s;
            return r = 200,
            t = parseInt(( - this.offsetX + this.graphMidpoint) / this.nameLineHeight),
            0 > t && (t = 0),
            t > this.commits.length - 1 && (t = this.commits.length - 1),
            this.lastHotLoadCenterIndex && Math.abs(this.lastHotLoadCenterIndex - t) < 10 ? void 0 : (this.lastHotLoadCenterIndex = t, e = this.backSpan(t, r), i = this.frontSpan(t, r), e || i ? (s = e ? e[0] : i[0], n = i ? i[1] : e[1], this.requestChunk(s, n)) : void 0)
        },
        e.prototype.backSpan = function(e, t) {
            var n, i, r, s, o, a, u, c;
            for (s = null, i = n = u = e; (0 >= u ? 0 >= n: n >= 0) && i > e - t; i = 0 >= u ? ++n: --n) if (!this.commits[i].requested) {
                s = i;
                break
            }
            if (null !== s) {
                for (o = null, a = null, i = r = c = s; (0 >= c ? 0 >= r: r >= 0) && i > s - t; i = 0 >= c ? ++r: --r) if (this.commits[i].requested) {
                    o = i;
                    break
                }
                return o ? a = o + 1 : (a = s - t, 0 > a && (a = 0)),
                [a, s]
            }
            return null
        },
        e.prototype.frontSpan = function(e, t) {
            var n, i, r, s, o, a, u, c, l, d;
            for (c = null, i = n = s = e, o = this.commits.length; (o >= s ? o > n: n > o) && e + t > i; i = o >= s ? ++n: --n) if (!this.commits[i].requested) {
                c = i;
                break
            }
            if (null !== c) {
                for (l = null, d = null, i = r = a = c, u = this.commits.length; (u >= a ? u > r: r > u) && c + t > i; i = u >= a ? ++r: --r) if (this.commits[i].requested) {
                    l = i;
                    break
                }
                return d = l ? l - 1 : c + t >= this.commits.length ? this.commits.length - 1 : c + t,
                [c, d]
            }
            return null
        },
        e.prototype.chunkUrl = function() {
            return document.querySelector(".js-network-graph-container").getAttribute("data-network-graph-chunk-url")
        },
        e.prototype.requestInitialChunk = function() {
            var e;
            if (c) return e = this.chunkUrl() + "?" + l.param({
                nethash: this.nethash
            }),
            o(e).then(function(e) {
                return function(t) {
                    return e.importChunk(t),
                    e.draw(),
                    e.network.chrome.draw()
                }
            } (this))
        },
        e.prototype.requestChunk = function(e, t) {
            var n, i, r, s, a;
            if (c) {
                for (i = n = r = e, s = t; s >= r ? s >= n: n >= s; i = s >= r ? ++n: --n) this.commits[i].requested = new Date;
                return a = this.chunkUrl() + "?" + l.param({
                    nethash: this.nethash,
                    start: e,
                    end: t
                }),
                o(a).then(function(e) {
                    return function(t) {
                        return e.importChunk(t),
                        e.draw(),
                        e.network.chrome.draw(),
                        e.lastHotLoadCenterIndex = e.focus
                    }
                } (this))
            }
        },
        e.prototype.importChunk = function(e) {
            var t, n, i, r, s, o, a, u, c;
            if (e.commits) {
                for (a = e.commits, u = [], i = 0, s = a.length; s > i; i++) t = a[i],
                c = this.spaceUserMap[t.space],
                n = this.commits[t.time],
                n.populate(t, c, this.commits),
                u.push(function() {
                    var e, t, i, s;
                    for (i = n.parents, s = [], e = 0, t = i.length; t > e; e++) o = i[e],
                    s.push(function() {
                        var e, t, i, s;
                        for (s = [], r = e = t = o.time + 1, i = n.time; i >= t ? i > e: e > i; r = i >= t ? ++e: --e) this.connectionMap[r] = this.connectionMap[r] || [],
                        s.push(this.connectionMap[r].push(n));
                        return s
                    }.call(this));
                    return s
                }.call(this));
                return u
            }
        },
        e.prototype.timeWindow = function() {
            var e, t;
            return t = parseInt((this.namesWidth - this.offsetX + this.nameLineHeight) / this.nameLineHeight),
            0 > t && (t = 0),
            e = t + parseInt((this.width - this.namesWidth) / this.nameLineHeight),
            e > this.commits.length - 1 && (e = this.commits.length - 1),
            {
                min: t,
                max: e
            }
        },
        e.prototype.draw = function() {
            var e, t, n, i, r, s, o, a, u, c, l, d, h, f, m, p, g, v, b, y, j, w, x, q, k, S, L, C, A, E, T, _, D, M, P;
            for (this.drawBackground(), P = this.timeWindow(), p = P.min, m = P.max, this.ctx.save(), this.ctx.translate(this.offsetX, this.offsetY + this.graphTopOffset), n = {},
            x = this.spaceMap, o = s = 0, c = x.length; c > s; o = ++s) for (D = this.spaceMap.length - o - 1, a = u = k = p, S = m; S >= k ? S >= u: u >= S; a = S >= k ? ++u: --u) e = this.commits[a],
            e.populated && e.space === D && (this.drawConnection(e), n[e.id] = !0);
            for (o = f = L = p, C = m; C >= L ? C >= f: f >= C; o = C >= L ? ++f: --f) if (t = this.connectionMap[o]) for (g = 0, l = t.length; l > g; g++) e = t[g],
            n[e.id] || (this.drawConnection(e), n[e.id] = !0);
            for (A = this.spaceMap, o = b = 0, d = A.length; d > b; o = ++b) for (D = this.spaceMap.length - o - 1, a = j = E = p, T = m; T >= E ? T >= j: j >= T; a = T >= E ? ++j: --j) e = this.commits[a],
            e.populated && e.space === D && (e === this.activeCommit ? this.drawActiveCommit(e) : this.drawCommit(e));
            if (this.showRefs) for (a = w = _ = p, q = m; q >= _ ? q >= w: w >= q; a = q >= _ ? ++w: --w) if (e = this.commits[a], e.populated && (r = this.headsMap[e.id])) for (y = 0, M = 0, h = r.length; h > M; M++) i = r[M],
            this.spaceUserMap[e.space].name === i.name && (v = this.drawHead(e, i.head, y), y += v);
            return this.ctx.restore(),
            this.activeCommit ? this.drawCommitInfo(this.activeCommit) : void 0
        },
        e.prototype.drawBackground = function() {
            var e, t, n, i, r;
            for (this.ctx.clearRect(0, 0, this.width, this.height), this.ctx.save(), this.ctx.translate(0, this.offsetY + this.graphTopOffset), this.ctx.clearRect(0, -10, this.width, this.height), r = this.userBlocks, n = t = 0, i = r.length; i > t; n = ++t) e = r[n],
            this.ctx.fillStyle = this.bgColors[n % 2],
            this.ctx.fillRect(0, e.start * this.nameLineHeight - 10, this.width, e.count * this.nameLineHeight),
            this.ctx.fillStyle = "#DDDDDD",
            this.ctx.fillRect(0, (e.start + e.count) * this.nameLineHeight - 11, this.width, 1);
            return this.ctx.restore()
        },
        e.prototype.drawCommit = function(e) {
            var t, n;
            return t = e.time * this.nameLineHeight,
            n = e.space * this.nameLineHeight,
            this.ctx.beginPath(),
            this.ctx.arc(t, n, 3, 0, 2 * Math.PI, !1),
            this.ctx.fillStyle = this.spaceColor(e.space),
            this.ctx.fill()
        },
        e.prototype.drawActiveCommit = function(e) {
            var t, n;
            return t = e.time * this.nameLineHeight,
            n = e.space * this.nameLineHeight,
            this.ctx.beginPath(),
            this.ctx.arc(t, n, 6, 0, 2 * Math.PI, !1),
            this.ctx.fillStyle = this.spaceColor(e.space),
            this.ctx.fill()
        },
        e.prototype.drawCommitInfo = function(e) {
            var t, n, i, r, s, o, a, u, c, l;
            return t = 3,
            n = 340,
            l = 56,
            c = e.message ? this.splitLines(e.message, 48) : [],
            o = Math.max(l, 38 + 16 * c.length),
            i = this.offsetX + e.time * this.nameLineHeight,
            r = this.graphTopOffset + this.offsetY + e.space * this.nameLineHeight,
            a = 0,
            u = 0,
            a = i < this.graphMidpoint ? i + 10 : i - (n + 10),
            u = r < 40 + (this.height - 40) / 2 ? r + 10 : r - o - 10,
            this.ctx.save(),
            this.ctx.translate(a, u),
            this.ctx.fillStyle = "#fff",
            this.ctx.strokeStyle = "rgba(0, 0, 0, 0.2)",
            this.ctx.lineWidth = 1,
            this.roundRect(0, 0, n, o, t),
            s = this.gravatars[e.gravatar],
            s ? this.drawGravatar(s, 10, 10) : (s = new Image, s.src = e.gravatar, s.onload = function(t) {
                return function() {
                    return t.activeCommit === e ? (t.drawGravatar(s, a + 10, u + 10), t.gravatars[e.gravatar] = s) : void 0
                }
            } (this)),
            this.ctx.fillStyle = "#000",
            this.ctx.font = "bold 12px 'Helvetica Neue', Arial, sans-serif",
            this.ctx.fillText(e.author, 55, 24),
            this.ctx.fillStyle = "#bbb",
            this.ctx.font = "11px Consolas, Menlo, Courier, monospace",
            this.ctx.fillText(e.id.slice(0, 7), 280, 24),
            this.drawMessage(c, 55, 41),
            this.ctx.restore()
        },
        e.prototype.drawGravatar = function(e, t, n) {
            var i;
            return i = 32,
            this.ctx.save(),
            this.ctx.fillStyle = "#fff",
            this.ctx.strokeStyle = "rgba(0, 0, 0, 0.0)",
            this.ctx.lineWidth = .1,
            this.roundRect(t + 2, n + 2, i, i, 4),
            this.ctx.clip(),
            this.ctx.drawImage(e, t + 2, n + 2, i, i),
            this.ctx.restore()
        },
        e.prototype.roundRect = function(e, t, n, i, r) {
            return this.ctx.beginPath(),
            this.ctx.moveTo(e, t + r),
            this.ctx.lineTo(e, t + i - r),
            this.ctx.quadraticCurveTo(e, t + i, e + r, t + i),
            this.ctx.lineTo(e + n - r, t + i),
            this.ctx.quadraticCurveTo(e + n, t + i, e + n, t + i - r),
            this.ctx.lineTo(e + n, t + r),
            this.ctx.quadraticCurveTo(e + n, t, e + n - r, t),
            this.ctx.lineTo(e + r, t),
            this.ctx.quadraticCurveTo(e, t, e, t + r),
            this.ctx.fill(),
            this.ctx.stroke()
        },
        e.prototype.drawMessage = function(e, t, n) {
            var i, r, s, o, a;
            for (this.ctx.font = "12px 'Helvetica Neue', Arial, sans-serif", this.ctx.fillStyle = "#000000", a = [], r = i = 0, s = e.length; s > i; r = ++i) o = e[r],
            a.push(this.ctx.fillText(o, t, n + 16 * r));
            return a
        },
        e.prototype.splitLines = function(e, t) {
            var n, i, r, s, o, a;
            for (a = e.split(" "), s = [], r = "", n = 0, i = a.length; i > n; n++) o = a[n],
            r.length + 1 + o.length < t ? r = "" === r ? o: r + " " + o: (s.push(r), r = o);
            return s.push(r),
            s
        },
        e.prototype.drawHead = function(e, t, n) {
            var i, r, s, o;
            return this.ctx.font = "11px 'Helvetica Neue', Arial, sans-serif",
            this.ctx.save(),
            i = this.ctx.measureText(t.name).width,
            this.ctx.restore(),
            s = e.time * this.nameLineHeight,
            o = e.space * this.nameLineHeight + 5 + n,
            r = 2.5,
            this.ctx.save(),
            this.ctx.translate(s, o - r),
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)",
            this.ctx.beginPath(),
            this.ctx.moveTo(0, r),
            this.ctx.lineTo( - 4, 10),
            this.ctx.quadraticCurveTo( - 9, 10, -9, 15),
            this.ctx.lineTo( - 9, 15 + i),
            this.ctx.quadraticCurveTo( - 9, 15 + i + 5, -4, 15 + i + 5),
            this.ctx.lineTo(4, 15 + i + 5),
            this.ctx.quadraticCurveTo(9, 15 + i + 5, 9, 15 + i),
            this.ctx.lineTo(9, 15),
            this.ctx.quadraticCurveTo(9, 10, 4, 10),
            this.ctx.lineTo(0, r),
            this.ctx.fill(),
            this.ctx.fillStyle = "#fff",
            this.ctx.font = "12px 'Helvetica Neue', Arial, sans-serif",
            this.ctx.textBaseline = "middle",
            this.ctx.scale(.85, .85),
            this.ctx.rotate(Math.PI / 2),
            this.ctx.fillText(t.name, 19, -.5),
            this.ctx.restore(),
            i + this.nameLineHeight
        },
        e.prototype.drawConnection = function(e) {
            var t, n, i, r, s, o;
            for (s = e.parents, o = [], n = t = 0, i = s.length; i > t; n = ++t) r = s[n],
            0 === n ? r.space === e.space ? o.push(this.drawBasicConnection(r, e)) : o.push(this.drawBranchConnection(r, e)) : o.push(this.drawMergeConnection(r, e));
            return o
        },
        e.prototype.drawBasicConnection = function(e, t) {
            var n;
            return n = this.spaceColor(t.space),
            this.ctx.strokeStyle = n,
            this.ctx.lineWidth = 2,
            this.ctx.beginPath(),
            this.ctx.moveTo(e.time * this.nameLineHeight, t.space * this.nameLineHeight),
            this.ctx.lineTo(t.time * this.nameLineHeight, t.space * this.nameLineHeight),
            this.ctx.stroke()
        },
        e.prototype.drawBranchConnection = function(e, t) {
            var n;
            return n = this.spaceColor(t.space),
            this.ctx.strokeStyle = n,
            this.ctx.lineWidth = 2,
            this.ctx.beginPath(),
            this.ctx.moveTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight),
            this.ctx.lineTo(e.time * this.nameLineHeight, t.space * this.nameLineHeight),
            this.ctx.lineTo(t.time * this.nameLineHeight - 10, t.space * this.nameLineHeight),
            this.ctx.stroke(),
            this.threeClockArrow(n, t.time * this.nameLineHeight, t.space * this.nameLineHeight)
        },
        e.prototype.drawMergeConnection = function(e, t) {
            var n, i, r;
            return n = this.spaceColor(e.space),
            this.ctx.strokeStyle = n,
            this.ctx.lineWidth = 2,
            this.ctx.beginPath(),
            e.space > t.space ? (this.ctx.moveTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight), r = this.safePath(e.time, t.time, e.space), r ? (this.ctx.lineTo(t.time * this.nameLineHeight - 10, e.space * this.nameLineHeight), this.ctx.lineTo(t.time * this.nameLineHeight - 10, t.space * this.nameLineHeight + 15), this.ctx.lineTo(t.time * this.nameLineHeight - 5.7, t.space * this.nameLineHeight + 7.5), this.ctx.stroke(), this.oneClockArrow(n, t.time * this.nameLineHeight, t.space * this.nameLineHeight)) : (i = this.closestMargin(e.time, t.time, e.space, -1), e.space === t.space + 1 && e.space === i + 1 ? (this.ctx.lineTo(e.time * this.nameLineHeight, i * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 15, i * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 9.5, i * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(n, t.time * this.nameLineHeight, i * this.nameLineHeight), this.addMargin(e.time, t.time, i)) : e.time + 1 === t.time ? (i = this.closestMargin(e.time, t.time, t.space, 0), this.ctx.lineTo(e.time * this.nameLineHeight, i * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 15, i * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 15, t.space * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 9.5, t.space * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(n, t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.addMargin(e.time, t.time, i)) : (this.ctx.lineTo(e.time * this.nameLineHeight + 10, e.space * this.nameLineHeight - 10), this.ctx.lineTo(e.time * this.nameLineHeight + 10, i * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 10, i * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 10, t.space * this.nameLineHeight + 15), this.ctx.lineTo(t.time * this.nameLineHeight - 5.7, t.space * this.nameLineHeight + 7.5), this.ctx.stroke(), this.oneClockArrow(n, t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.addMargin(e.time, t.time, i)))) : (i = this.closestMargin(e.time, t.time, t.space, -1), i < t.space ? (this.ctx.moveTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight, i * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 12.7, i * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 12.7, t.space * this.nameLineHeight - 10), this.ctx.lineTo(t.time * this.nameLineHeight - 9.4, t.space * this.nameLineHeight - 7.7), this.ctx.stroke(), this.fourClockArrow(n, t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.addMargin(e.time, t.time, i)) : (this.ctx.moveTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight, i * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 12.7, i * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 12.7, t.space * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 9.4, t.space * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(n, t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.addMargin(e.time, t.time, i)))
        },
        e.prototype.addMargin = function(e, t, n) {
            return this.marginMap[n] || (this.marginMap[n] = []),
            this.marginMap[n].push([e, t])
        },
        e.prototype.oneClockArrow = function(e, t, n) {
            return this.ctx.fillStyle = e,
            this.ctx.beginPath(),
            this.ctx.moveTo(t - 3, n + 10.5),
            this.ctx.lineTo(t - 9, n + 5.5),
            this.ctx.lineTo(t - 2.6, n + 3.5),
            this.ctx.fill()
        },
        e.prototype.twoClockArrow = function(e, t, n) {
            return this.ctx.fillStyle = e,
            this.ctx.beginPath(),
            this.ctx.moveTo(t - 12.4, n + 6.6),
            this.ctx.lineTo(t - 9.3, n + 10.6),
            this.ctx.lineTo(t - 3.2, n + 2.4),
            this.ctx.fill()
        },
        e.prototype.threeClockArrow = function(e, t, n) {
            return this.ctx.fillStyle = e,
            this.ctx.beginPath(),
            this.ctx.moveTo(t - 10, n - 3.5),
            this.ctx.lineTo(t - 10, n + 3.5),
            this.ctx.lineTo(t - 4, n),
            this.ctx.fill()
        },
        e.prototype.fourClockArrow = function(e, t, n) {
            return this.ctx.fillStyle = e,
            this.ctx.beginPath(),
            this.ctx.moveTo(t - 12.4, n - 6.6),
            this.ctx.lineTo(t - 9.3, n - 10.6),
            this.ctx.lineTo(t - 3.2, n - 2.4),
            this.ctx.fill()
        },
        e.prototype.safePath = function(e, t, n) {
            var i, r, s, o;
            for (o = this.spaceMap[n], i = 0, r = o.length; r > i; i++) if (s = o[i], this.timeInPath(e, s)) return s[1] === t;
            return ! 1
        },
        e.prototype.closestMargin = function(e, t, n, i) {
            var r, s, o, a, u;
            for (a = this.spaceMap.length, o = i, s = !1, r = !1, u = !1; ! r || !s;) {
                if (n + o >= 0 && this.safeMargin(e, t, n + o)) return n + o;
                0 > n + o && (s = !0),
                n + o > a && (r = !0),
                u === !1 && 0 === o ? (o = -1, u = !0) : o = 0 > o ? -o - 1 : -o - 2
            }
            return n > 0 ? n - 1 : 0
        },
        e.prototype.safeMargin = function(e, t, n) {
            var i, r, s, o;
            if (!this.marginMap[n]) return ! 0;
            for (o = this.marginMap[n], i = 0, r = o.length; r > i; i++) if (s = o[i], this.pathsCollide([e, t], s)) return ! 1;
            return ! 0
        },
        e.prototype.pathsCollide = function(e, t) {
            return this.timeWithinPath(e[0], t) || this.timeWithinPath(e[1], t) || this.timeWithinPath(t[0], e) || this.timeWithinPath(t[1], e)
        },
        e.prototype.timeInPath = function(e, t) {
            return e >= t[0] && e <= t[1]
        },
        e.prototype.timeWithinPath = function(e, t) {
            return e > t[0] && e < t[1]
        },
        e.prototype.spaceColor = function(e) {
            return 0 === e ? "#000000": this.spaceColors[e % this.spaceColors.length]
        },
        e
    } (),
    n = function() {
        function e(e, t, n) {
            this.chrome = t,
            this.graph = n,
            this.out = f(this.out, this),
            this.move = f(this.move, this),
            this.docmove = f(this.docmove, this),
            this.down = f(this.down, this),
            this.up = f(this.up, this),
            this.dragging = !1,
            this.lastPoint = {
                x: 0,
                y: 0
            },
            this.lastHoverCommit = null,
            this.lastHoverUser = null,
            this.pressedCommit = null,
            this.pressedUser = null,
            this.canvas = e.getElementsByTagName("canvas")[0],
            this.canvasOffset = l(this.canvas).offset(),
            this.canvas.style.cursor = "move",
            document.body.addEventListener("mouseup", this.up),
            document.body.addEventListener("mousemove", this.docmove),
            this.canvas.addEventListener("mousedown", this.down),
            this.canvas.addEventListener("mousemove", this.move),
            this.canvas.addEventListener("mouseout", this.out)
        }
        return e.prototype.up = function() {
            return this.dragging = !1,
            this.pressedCommit && this.graph.activeCommit === this.pressedCommit ? window.open("/" + this.graph.activeCommit.user.name + "/" + this.graph.activeCommit.user.repo + "/commit/" + this.graph.activeCommit.id) : this.pressedUser && this.chrome.activeUser === this.pressedUser && (window.location = "/" + this.chrome.activeUser.name + "/" + this.chrome.activeUser.repo + "/network"),
            this.pressedCommit = null,
            this.pressedUser = null
        },
        e.prototype.down = function() {
            return this.graph.activeCommit ? this.pressedCommit = this.graph.activeCommit: this.chrome.activeUser ? this.pressedUser = this.chrome.activeUser: this.dragging = !0
        },
        e.prototype.docmove = function(e) {
            var t, n;
            return t = e.pageX,
            n = e.pageY,
            this.dragging && (this.graph.moveX(t - this.lastPoint.x), this.graph.moveY(n - this.lastPoint.y), this.graph.draw(), this.chrome.moveX(t - this.lastPoint.x), this.chrome.moveY(n - this.lastPoint.y), this.chrome.draw()),
            this.lastPoint.x = t,
            this.lastPoint.y = n
        },
        e.prototype.move = function(e) {
            var t, n, i, r;
            return i = e.pageX,
            r = e.pageY,
            this.dragging ? (this.graph.moveX(i - this.lastPoint.x), this.graph.moveY(r - this.lastPoint.y), this.graph.draw(), this.chrome.moveX(i - this.lastPoint.x), this.chrome.moveY(r - this.lastPoint.y), this.chrome.draw()) : (n = this.chrome.hover(i - this.canvasOffset.left, r - this.canvasOffset.top), n !== this.lastHoverUser ? (this.canvas.style.cursor = n ? "pointer": "move", this.chrome.activeUser = n, this.chrome.draw(), this.lastHoverUser = n) : (t = this.graph.hover(i - this.canvasOffset.left, r - this.canvasOffset.top), t !== this.lastHoverCommit && (this.canvas.style.cursor = t ? "pointer": "move", this.graph.activeCommit = t, this.graph.draw(), this.chrome.draw(), this.lastHoverCommit = t))),
            this.lastPoint.x = i,
            this.lastPoint.y = r
        },
        e.prototype.out = function() {
            return this.graph.activeCommit = null,
            this.chrome.activeUser = null,
            this.graph.draw(),
            this.chrome.draw(),
            this.lastHoverCommit = null,
            this.lastHoverUser = null
        },
        e
    } (),
    t = function() {
        function e(e, t) {
            this.chrome = e,
            this.graph = t,
            this.down = f(this.down, this),
            this.dirty = !1,
            document.addEventListener("keydown", this.down)
        }
        return e.prototype.moveBothX = function(e) {
            return this.graph.moveX(e),
            this.chrome.moveX(e),
            this.graph.activeCommit = null,
            this.dirty = !0
        },
        e.prototype.moveBothY = function(e) {
            return this.graph.moveY(e),
            this.chrome.moveY(e),
            this.graph.activeCommit = null,
            this.dirty = !0
        },
        e.prototype.toggleRefs = function() {
            return this.graph.toggleRefs(),
            this.dirty = !0
        },
        e.prototype.redraw = function() {
            return this.dirty && (this.graph.draw(), this.chrome.draw()),
            this.dirty = !1
        },
        e.prototype.down = function(e) {
            if (l(e.target).is("input")) return ! 0;
            if (e.shiftKey) switch (e.which) {
            case 37:
            case 72:
                return this.moveBothX(999999),
                this.redraw();
            case 38:
            case 75:
                return this.moveBothY(999999),
                this.redraw();
            case 39:
            case 76:
                return this.moveBothX( - 999999),
                this.redraw();
            case 40:
            case 74:
                return this.moveBothY( - 999999),
                this.redraw()
            } else switch (e.which) {
            case 37:
            case 72:
                return this.moveBothX(100),
                this.redraw();
            case 38:
            case 75:
                return this.moveBothY(30),
                this.redraw();
            case 39:
            case 76:
                return this.moveBothX( - 100),
                this.redraw();
            case 40:
            case 74:
                return this.moveBothY( - 30),
                this.redraw();
            case 84:
                return this.toggleRefs(),
                this.redraw()
            }
        },
        e
    } (),
    c = !1,
    h(".js-network-graph-container", {
        add: function() {
            return c = !0,
            new i(this, 980, 600)
        },
        remove: function() {
            return c = !1
        }
    })
}.call(this),
function() {
    var e, t = require("github/jquery")["default"],
    n = require("github/observe"),
    i = n.observe;
    e = function() {
        var e, n;
        n = t(this),
        e = n.find(":selected"),
        e.attr("data-already-member") ? (t(".js-account-membership-form").addClass("is-member"), t(".js-account-membership-form").removeClass("is-not-member")) : (t(".js-account-membership-form").removeClass("is-member"), t(".js-account-membership-form").addClass("is-not-member"))
    },
    i(".js-account-membership", e),
    t(document).on("change", ".js-account-membership", e)
}.call(this),
function() {
    var e, t, n, i, r, s, o, a, u, c, l = require("github/jquery")["default"];
    n = require("github/fetch").fetchPoll,
    u = null,
    o = 300,
    a = [".", ".", "."],
    s = 0,
    t = function() {
        return l(".js-audit-log-export-button").removeClass("disabled")
    },
    e = function() {
        return l(".js-audit-log-export-button").addClass("disabled")
    },
    r = function() {
        var t, n;
        return t = l(".js-audit-log-export-status"),
        t.data("oldText", t.text()),
        n = function() {
            var e;
            return e = a.slice(0, s).join(""),
            t.text("Exporting" + e),
            s >= 3 ? s = 0 : s += 1
        },
        u = setInterval(n, o),
        e()
    },
    c = function() {
        var e;
        return t(),
        e = l(".js-audit-log-export-status"),
        e.text(e.data("oldText")),
        clearInterval(u),
        s = 0
    },
    i = function() {
        return c(),
        l("#ajax-error-message").show(function() {
            return this.classList.add("visible")
        })
    },
    l(document).on("ajaxSend", ".js-audit-log-export", r),
    l(document).on("ajaxError", ".js-audit-log-export", i),
    l(document).on("ajaxSuccess", ".js-audit-log-export",
    function(e, t, r, s) {
        var o;
        return o = function() {
            return c(),
            window.location = s.export_url
        },
        n(s.job_url).then(o, i)
    }),
    l(document).on("navigation:open", ".audit-search-form .js-suggester",
    function() {
        return l(this).closest("form").submit()
    })
}.call(this),
function() {
    var e, t, n = require("github/jquery")["default"],
    i = require("github/observe"),
    r = i.observe;
    n(document).on("submit", ".js-find-coupon-form",
    function(e) {
        var t, i;
        return t = e.target.action,
        i = n("#code").val(),
        window.location = t + "/" + encodeURIComponent(i),
        e.stopPropagation(),
        e.preventDefault()
    }),
    n(document).on("click", ".js-choose-account",
    function(t) {
        return n(".js-plan-row, .js-choose-plan").removeClass("selected"),
        n(".js-plan").val(""),
        n(".js-billing-section").addClass("has-removed-contents"),
        e(n(this).closest(".js-account-row")),
        t.stopPropagation(),
        t.preventDefault()
    }),
    n(document).on("click", ".js-choose-plan",
    function(e) {
        return t(n(this).closest(".js-plan-row")),
        e.stopPropagation(),
        e.preventDefault()
    }),
    r(".js-plan-row.selected", {
        add: function() {
            return n(this).closest("form").find(".js-redeem-button").prop("disabled", n(this).hasClass("free-plan"))
        }
    }),
    e = function(e) {
        var i, r, s, o;
        if (e.length) return s = e.attr("data-login"),
        o = e.attr("data-plan"),
        n(".js-account-row, .js-choose-account").removeClass("selected"),
        e.addClass("selected"),
        e.find(".js-choose-account").addClass("selected"),
        n(".js-account").val(s),
        n(".js-plan-section").removeClass("is-hidden"),
        n(".js-billing-plans").addClass("is-hidden"),
        r = n(".js-plans-for-" + s),
        r.removeClass("is-hidden"),
        i = n(".js-plan-row", r),
        t(1 === i.length ? i: n("[data-name='" + o + "']", r))
    },
    t = function(e) {
        var t, i, r, s, o;
        if (e.length) return s = e.attr("data-name"),
        i = parseInt(e.attr("data-cost"), 10),
        o = e.closest(".js-billing-plans"),
        r = "true" === o.attr("data-has-billing"),
        t = o.attr("data-login"),
        n(".js-plan-row, .js-choose-plan").removeClass("selected"),
        e.addClass("selected"),
        e.find(".js-choose-plan").addClass("selected"),
        n(".js-plan").val(s),
        0 === i || r ? n(".js-billing-section").addClass("has-removed-contents") : n(".js-billing-section[data-login='" + t + "']").removeClass("has-removed-contents")
    },
    n(function() {
        return e(n(".js-account-row.selected")),
        t(n(".js-plan-row.selected"))
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("change", ".js-survey-select",
    function() {
        var t, n, i, r;
        return i = e(this)[0],
        n = e(this).closest(".js-survey-question-form"),
        t = n.find(".js-survey-other-text"),
        r = i.options[i.selectedIndex],
        r.classList.contains("js-survey-option-other") ? (n.addClass("is-other-selected"), t.attr("required", "required"), t.focus()) : (t.removeAttr("required"), n.removeClass("is-other-selected"))
    }),
    e(document).on("change", ".js-survey-radio",
    function() {
        var t, n, i;
        return t = e(this)[0],
        i = e(this).closest(".js-survey-question-form"),
        n = i.find(".js-survey-other-text"),
        t.classList.contains("js-survey-radio-other") ? (i.addClass("is-other-selected"), n.attr("required", "required"), n.focus()) : (n.removeAttr("required"), i.removeClass("is-other-selected")),
        e(this).trigger("validation:field:change")
    })
}.call(this),
define("github/blob-anchor", ["exports"],
function(e) {
    function t(e) {
        var t = e.match(/\#?(?:L|-)(\d+)/gi);
        return t ? t.map(function(e) {
            return parseInt(e.replace(/\D/g, ""))
        }) : []
    }
    function n(e) {
        var t = e.match(/(file-.+?-)L\d+?/i);
        return t ? t[1] : ""
    }
    function i(e) {
        var i = t(e),
        r = n(e);
        return {
            lineRange: i,
            anchorPrefix: r
        }
    }
    function r(e) {
        var t = e.lineRange,
        n = e.anchorPrefix;
        switch (t.sort(s), t.length) {
        case 1:
            return "#" + n + "L" + t[0];
        case 2:
            return "#" + n + "L" + t[0] + "-L" + t[1];
        default:
            return "#"
        }
    }
    function s(e, t) {
        return e - t
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.parseLineRange = t,
    e.parseAnchorPrefix = n,
    e.parseFileAnchor = i,
    e.formatLineRange = r
}),
function() {
    var e, t, n, i, r, s = require("github/jquery")["default"],
    o = require("delegated-events"),
    a = o.fire,
    u = require("github/blob-anchor"),
    c = u.parseLineRange,
    l = u.parseFileAnchor,
    d = u.formatLineRange,
    h = require("github/hash-change")["default"];
    i = !1,
    e = function(e) {
        var t, n, i, r, o;
        if (r = e.lineRange, t = e.anchorPrefix, i = s(".js-file-line"), i.length) {
            if (i.css("background-color", ""), 1 === r.length) return s("#" + t + "LC" + r[0]).css("background-color", "#f8eec7");
            if (r.length > 1) {
                for (n = r[0], o = []; n <= r[1];) s("#" + t + "LC" + n).css("background-color", "#f8eec7"),
                o.push(n++);
                return o
            }
        }
    },
    n = function(t) {
        var n, r, o;
        return null == t && (t = l(window.location.hash)),
        o = t.lineRange,
        n = t.anchorPrefix,
        e(t),
        !i && (r = s("#" + n + "LC" + o[0])).length && s(window).scrollTop(r.offset().top - .33 * s(window).height()),
        i = !1
    },
    r = function(e, t) {
        var n, i, r;
        return r = "FORM" === e.nodeName ? "action": "href",
        n = e.getAttribute(r),
        (i = n.indexOf("#")) >= 0 && (n = n.substr(0, i)),
        n += t,
        e.setAttribute(r, n)
    },
    h(function() {
        var e, t, i, s, o, a;
        if (document.querySelector(".js-file-line-container")) {
            for (setTimeout(n, 0), t = window.location.hash, o = document.querySelectorAll(".js-update-url-with-hash"), a = [], i = 0, s = o.length; s > i; i++) e = o[i],
            a.push(r(e, t));
            return a
        }
    }),
    t = function(e) {
        var t, n;
        return i = !0,
        n = null != (t = s(window).scrollTop()) ? t: 0,
        e(),
        s(window).scrollTop(n)
    },
    s(document).on("mousedown", ".js-line-number",
    function(e) {
        var n, i;
        return n = l(this.id),
        e.shiftKey && (i = c(window.location.hash), n.lineRange.unshift(i[0])),
        t(function() {
            return window.location.hash = d(n)
        }),
        !1
    }),
    s(document).on("submit", ".js-jump-to-line-form",
    function() {
        var e = this.querySelector(".js-jump-to-line-field"),
        t = e.value.replace(/[^\d\-]/g, "");
        return t && (window.location.hash = "L" + t),
        a(document, "facebox:close"),
        !1
    })
}.call(this),
function() {
    var e, t, n, i, r, s, o, a, u, c, l, d, h, f, m, p, g, v, b, y, j, w = require("github/jquery")["default"],
    x = require("github/visible")["default"];
    r = require("github/fetch").fetchText,
    h = require("github/observe").observe,
    u = function(e) {
        var t, n, i;
        return n = e[0],
        t = n.querySelector(".js-blob-filename"),
        t ? "." === (i = t.value) || ".." === i || ".git" === i ? !1 : /\S/.test(t.value) : !0
    },
    e = function(e) {
        var t;
        return t = e.querySelector(".js-blob-contents"),
        t ? "true" === t.getAttribute("data-allow-unchanged") ? !0 : s(t) : !0
    },
    d = function(e) {
        var t;
        return t = e.querySelector(".js-new-filename-field"),
        s(t)
    },
    t = function(t) {
        var n;
        return t = w(".js-blob-form"),
        n = t[0],
        Array.from(t.find(".js-check-for-fork")).some(x) ? !1 : u(t) ? e(n) || d(n) : !1
    },
    v = function(e) {
        var t;
        return t = e.find(".js-blob-contents")[0],
        t ? w(t).attr("data-allow-unchanged") ? !0 : s(t) : !1
    },
    c = function(e) {
        var t, n;
        return n = e[0],
        t = n.querySelector(".js-blob-contents"),
        s(t) || d(n)
    },
    n = null,
    i = function(e) {
        var t;
        return t = w(e).attr("data-github-confirm-unload"),
        ("yes" === t || "true" === t) && (t = ""),
        null == t && (t = "false"),
        "no" === t || "false" === t ? null: function() {
            return t
        }
    },
    f = function() {
        var e;
        return e = w(".js-blob-form"),
        e[0] ? (e.find(".js-blob-submit").prop("disabled", !t(e)), e.find(".js-blob-contents-changed").val(v(e)), n ? c(e) ? window.onbeforeunload = n: window.onbeforeunload = null: void 0) : void 0
    },
    m = function(e) {
        var t, n, i, r, s;
        for (r = e.querySelectorAll("input"), s = [], n = 0, i = r.length; i > n; n++) t = r[n],
        "hidden" === t.getAttribute("type") && t.getAttribute("class") && (null == t.getAttribute("data-default-value") ? s.push(t.setAttribute("data-default-value", t.value)) : s.push(void 0));
        return s
    },
    s = function(e) {
        return null == e ? !0 : "hidden" === e.type ? e.value !== e.getAttribute("data-default-value") : e.value !== e.defaultValue
    },
    p = function(e) {
        var t, n, i, r;
        return t = e.querySelector(".js-blob-contents"),
        i = e.querySelector(".js-new-filename-field"),
        n = e.querySelector(".js-blob-filename"),
        t && i && n && (null != (r = n.defaultValue) ? r.length: void 0) ? w(t).data("old-filename", i.value) : void 0
    },
    h(".js-blob-form",
    function() {
        m(this),
        p(this),
        f(),
        n = i(this),
        w(this).on("submit",
        function() {
            return window.onbeforeunload = null
        })
    }),
    w(document).on("change", ".js-blob-contents",
    function() {
        return g(w(".js-blob-filename")),
        f()
    }),
    w(document).onFocusedInput(".js-blob-filename",
    function() {
        return function() {
            return w(".js-blob-contents").attr("data-filename", w(this).val()),
            l(w(this).val()),
            g(w(this))
        }
    }),
    w(document).onFocusedInput(".js-breadcrumb-nav",
    function() {
        return function() {
            return j(w(this)),
            g(w(this))
        }
    }),
    w(document).onFocusedKeydown(".js-breadcrumb-nav",
    function() {
        return function(e) {
            var t, n, i;
            return n = [this.selectionStart, this.selectionEnd],
            i = [0, 0],
            t = 0 === w(n).not(i).length && 0 === w(i).not(n).length,
            t && 8 === e.keyCode && 1 !== w(this).parent().children(".separator").length && (a(w(this), !0), e.preventDefault()),
            g(w(this))
        }
    }),
    g = function(e) {
        return null != e[0] && (y(e), b(e)),
        f()
    },
    j = function(e) {
        var t, n, i, r, s, u;
        for (i = []; e.val().split("/").length > 1;) t = e.val(),
        r = t.split("/"),
        n = r[0],
        u = r.slice(1).join("/"),
        "" === n || "." === n || ".git" === n ? (e.val(u), s = function() {
            e[0].focus(),
            e[0].setSelectionRange(0, 0)
        },
        i.push(window.setTimeout(s, 1))) : ".." === n ? i.push(a(e)) : i.push(o(e, n, u));
        return i
    },
    l = function(e) {
        var t, n;
        return t = w(".js-gitignore-template"),
        n = w(".js-license-template"),
        /^(.+\/)?\.gitignore$/.test(e) ? t.addClass("is-visible") : /^(.+\/)?(licen[sc]e|copying)($|\.)/i.test(e) ? n.addClass("is-visible") : (t.removeClass("is-visible"), n.removeClass("is-visible"))
    },
    b = function(e) {
        var t, n, i, r, o, a, u, c, l, d, h, f;
        return i = e.closest("form"),
        n = w(".js-blob-contents"),
        t = i.find(".js-new-blob-commit-summary"),
        u = e.val() ? "Create " + e.val() : "Create new file",
        h = n.data("old-filename"),
        c = w(".js-new-filename-field").val(),
        n.removeData("new-filename"),
        u = (null != h ? h.length: void 0) && c !== h && null != e[0] ? (n.data("new-filename", !0), o = s(n[0]), r = o ? "Update and rename": "Rename", e.val().length && c.length ? (f = h.split("/"), l = c.split("/"), d = !0, a = f.length - 1, f.forEach(function(e, t) {
            return t !== a && e !== l[t] ? d = !1 : void 0
        }), f.length === l.length && d ? r + " " + f[a] + " to " + l[a] : r + " " + h + " to " + c) : r + " " + h) : (null != h ? h.length: void 0) && c === h ? "Update " + e.val() : u,
        t.attr("placeholder", u),
        w(".js-commit-message-fallback").val(u)
    },
    y = function(e) {
        var t, n;
        return t = w(".breadcrumb").children(".js-path-segment"),
        n = "",
        t.each(function() {
            var e;
            return e = w(this),
            n = n + e.text() + "/"
        }),
        n += e.val(),
        w(".js-new-filename-field").val(n)
    },
    a = function(e, t) {
        var n, i;
        return null == t && (t = !1),
        t || e.val(e.val().replace("../", "")),
        i = function() {
            e[0].focus(),
            e[0].setSelectionRange(0, 0)
        },
        1 !== e.parent().children(".separator").length && (e.prev().remove(), n = e.prev().children().children().html(), e.prev().remove(), t && (e.val("" + n + e.val()), i = function() {
            t && (e[0].focus(), e[0].setSelectionRange(n.length, n.length))
        })),
        l(e.val()),
        window.setTimeout(i, 1)
    },
    o = function(e, t, n) {
        var i, r, s, o, a, u, c;
        return null == n && (n = ""),
        t = t.replace(/[^-.a-z_0-9]+/gi, "-"),
        t = t.replace(/^-+|-+$/g, ""),
        t.length > 0 && (c = e.parent().children(".js-repo-root, [itemtype]").children("a").last().attr("href"), c || (i = e.parent().children(".js-repo-root, [itemtype]").children("span").children("a").last(), r = i.attr("data-branch"), a = i.attr("href"), c = a + "/tree/" + r), s = w(".js-crumb-template").clone().removeClass("js-crumb-template"), s.find("a[itemscope]").attr("href", c + "/" + t), s.find("span").text(t), o = w(".js-crumb-separator").clone().removeClass("js-crumb-separator"), e.before(s, o)),
        e.val(n),
        l(e.val()),
        u = function() {
            e[0].focus(),
            e[0].setSelectionRange(0, 0)
        },
        window.setTimeout(u, 1)
    },
    w(document).onFocusedInput(".js-new-blob-commit-summary",
    function() {
        var e;
        return e = w(this).closest(".js-file-commit-form"),
        function() {
            return e.toggleClass("is-too-long-error", w(this).val().length > 50)
        }
    }),
    h(".js-check-for-fork",
    function() {
        this.addEventListener("load",
        function() {
            return f()
        })
    }),
    w(document).on("change", ".js-gitignore-template input[type=radio]",
    function() {
        var e;
        return e = w(this).closest(".js-blob-form").find(".js-code-editor").data("code-editor"),
        r(this.getAttribute("data-template-url")).then(function(t) {
            return e.setCode(t)
        })
    }),
    w(document).on("change", ".js-license-template input[type=radio]",
    function() {
        var e, t;
        return e = w(this).closest(".js-blob-form").find(".js-code-editor").data("code-editor"),
        t = w(this).attr("data-template-contents"),
        e.setCode(t)
    }),
    w(document).onFocusedKeydown(".js-new-blob-commit-description",
    function() {
        return function(e) {
            return "ctrl+enter" === e.hotkey || "meta+enter" === e.hotkey ? (w(this).closest("form").submit(), !1) : void 0
        }
    })
}.call(this),
function() {
    var e, t, n = require("github/jquery")["default"];
    e = function(e) {
        var t, i, r, s, o, a;
        for (e = e.toLowerCase(), t = n(".js-csv-data tbody tr"), s = [], i = 0, r = t.length; r > i; i++) o = t[i],
        a = n(o).text().toLowerCase(),
        -1 === a.indexOf(e) ? s.push(n(o).hide()) : s.push(n(o).show());
        return s
    },
    t = function(t) {
        var n;
        n = t.target.value,
        null != n && e(n),
        t.preventDefault()
    },
    n(document).on("focus", ".js-csv-filter-field",
    function() {
        return n(this).on("keyup", t)
    }),
    n(document).on("blur", ".js-csv-filter-field",
    function() {
        return n(this).off("keyup", t)
    })
}.call(this),
function() {
    var e, t, n, i = require("github/jquery")["default"];
    n = require("github/history").replaceState,
    t = require("github/observe").observe,
    e = null,
    t(".js-branch-search-field",
    function() {
        var t, r, s, o, a, u, c, l, d, h, f, m, p, g;
        r = i(this),
        s = r.closest(".js-branch-search"),
        t = s.closest(".js-branches"),
        o = t.find(".js-branches-subnav .js-subnav-item"),
        p = s.prop("action"),
        m = s.attr("data-reset-url"),
        g = s.attr("data-results-container"),
        d = /\S/,
        c = function() {
            return d.test(r.val())
        },
        h = function(e, t) {
            var r;
            return n(null, "", t),
            r = document.getElementById(g),
            i(r).html(e)
        },
        u = null,
        a = function(e) {
            return u && u.readyState < 4 && u.abort(),
            u = i.ajax(e)
        },
        l = function() {
            var n, i;
            return null === e && (e = o.filter(".selected")),
            n = c(),
            i = n ? p + "?" + s.serialize() : m,
            a({
                url: i,
                context: s
            }).always(function() {
                return t.removeClass("is-loading")
            }).done(function(e) {
                return h(e, i)
            }),
            t.toggleClass("is-search-mode", n),
            t.addClass("is-loading"),
            o.removeClass("selected"),
            n ? o.filter(".js-branches-all").addClass("selected") : (e.addClass("selected"), e = null)
        },
        f = function() {
            var e;
            return e = c(),
            r.val(""),
            e ? l() : void 0
        },
        r.on("throttled:input", l),
        r.on("keyup",
        function(e) {
            return "esc" === e.hotkey ? (f(), this.blur()) : void 0
        })
    }),
    i(document).on("submit", ".js-branch-search", !1),
    i(document).on("click", ".js-clear-branch-search",
    function(e) {
        var t;
        if (1 === e.which) return t = i(this).closest(".js-branch-search").find(".js-branch-search-field"),
        t.focus().val("").trigger("input"),
        e.preventDefault()
    }),
    i(document).on("ajaxSend", ".js-branch-destroy, .js-branch-restore",
    function(e, t) {
        var n, r, s, o, a;
        return r = i(this),
        a = r.is(".js-branch-destroy"),
        o = r.closest(".js-branch-row").attr("data-branch-name"),
        n = r.closest(".js-branches").find(".js-branch-row").filter(function() {
            return this.getAttribute("data-branch-name") === o
        }),
        s = r.find("button[type=submit]"),
        s.blur().removeClass("tooltipped"),
        n.addClass("loading"),
        t.done(function() {
            return n.toggleClass("is-deleted", a)
        }).always(function() {
            return n.removeClass("loading"),
            s.addClass("tooltipped")
        })
    })
}.call(this),
function() {
    var e, t, n = require("github/jquery")["default"];
    e = function() {
        var e, i, r, s, o, a;
        return o = [],
        i = n(".js-advanced-search-input").val(),
        a = {
            Repositories: 0,
            Users: 0,
            Code: 0
        },
        e = n("input[type=text].js-advanced-search-prefix, select.js-advanced-search-prefix"),
        o = t(e,
        function(e, t, n) {
            return "" === e ? "": ("" !== t && a[n]++, "" !== t ? "" + e + t: void 0)
        }),
        n.merge(o, t(n("input[type=checkbox].js-advanced-search-prefix"),
        function(e, t, i) {
            var r;
            return r = n(this).prop("checked"),
            r !== !1 && a[i]++,
            r !== !1 ? "" + e + r: void 0
        })),
        r = function(e) {
            return e.Users > e.Code && e.Users > e.Repositories ? "Users": e.Code > e.Users && e.Code > e.Repositories ? "Code": "Repositories"
        },
        s = n.trim(o.join(" ")),
        n(".js-type-value").val(r(a)),
        n(".js-search-query").val(n.trim(i + " " + s)),
        n(".js-advanced-query").empty(),
        n(".js-advanced-query").text("" + s),
        n(".js-advanced-query").prepend(n("<span>").text(n.trim(i)), " ")
    },
    t = function(e, t) {
        return n.map(e,
        function(e) {
            var i, r, s, o;
            return s = n.trim(n(e).val()),
            i = n(e).attr("data-search-prefix"),
            r = n(e).attr("data-search-type"),
            o = function(e) {
                return - 1 !== e.search(/\s/g) ? '"' + e + '"': e
            },
            "" === i ? t.call(e, i, s, r) : -1 !== s.search(/\,/g) && "location" !== i ? s.split(/\,/).map(function(s) {
                return t.call(e, i, o(n.trim(s)), r)
            }) : t.call(e, i, o(s), r)
        })
    },
    n(document).onFocusedInput(".js-advanced-search-prefix",
    function() {
        return function() {
            return e()
        }
    }),
    n(document).on("change", ".js-advanced-search-prefix", e),
    n(document).on("focusin", ".js-advanced-search-input",
    function() {
        return n(this).closest(".js-advanced-search-label").addClass("focus")
    }),
    n(document).on("focusout", ".js-advanced-search-input",
    function() {
        return n(this).closest(".js-advanced-search-label").removeClass("focus")
    }),
    n(document).on("click", ".js-see-all-search-cheatsheet",
    function() {
        return n(".js-more-cheatsheet-info").removeClass("hidden"),
        !1
    }),
    n(function() {
        return n(".js-advanced-search-input").length ? e() : void 0
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("navigation:keyopen", ".commits-list-item",
    function() {
        return e(this).find(".commit-title > a").first().click(),
        !1
    }),
    e(document).on("navigation:keydown", ".commits-list-item",
    function(t) {
        return "c" === t.hotkey ? (e(this).find(".commit-title > a").first().click(), !1) : void 0
    })
} (),
function() {
    var e, t, n = require("github/jquery")["default"],
    i = require("github/hash-change")["default"],
    r = require("github/visible")["default"];
    e = require("delegated-events"),
    t = require("github/observe").observe,
    n(document).on("click", ".js-compare-tabs a",
    function() {
        return n(this).closest(".js-compare-tabs").find("a").removeClass("selected"),
        n(this).addClass("selected"),
        n("#commits_bucket, #files_bucket, #commit_comments_bucket").hide(),
        n(this.hash).show(),
        !1
    }),
    i(function() {
        return n(this).closest("#files_bucket")[0] && !r(this) ? n('a.tabnav-tab[href="#files_bucket"]').click() : void 0
    }),
    n(document).on("click", ".js-toggle-range-editor-cross-repo",
    function() {
        return n(".js-range-editor").toggleClass("is-cross-repo"),
        !1
    }),
    e.on("pjax:click", ".js-range-editor",
    function(e) {
        var t;
        t = e.detail.options,
        n(".js-compare-pr").hasClass("open") && !t.url.match(/expand=1/) && (null == t.data && (t.data = {}), t.data.expand = "1")
    }),
    n(document).on("navigation:open", "form.js-commitish-form",
    function() {
        var e, t, i;
        return t = n(this),
        i = t.find(".js-new-item-name").text(),
        e = n("<input>", {
            type: "hidden",
            name: "new_compare_ref",
            value: i
        }),
        t.append(e),
        t.submit()
    }),
    t(".js-compare-pr.open", {
        add: function() {
            return document.body.classList.add("is-pr-composer-expanded")
        },
        remove: function() {
            return document.body.classList.remove("is-pr-composer-expanded")
        }
    })
}.call(this),
function() {
    var e, t, n, i, r, s, o = require("github/jquery")["default"],
    a = require("github/hash-change")["default"],
    u = require("github/preserve-position"),
    c = u.preservingScrollPosition;
    t = require("github/fetch").fetchText,
    s = require("github/dimensions").overflowOffset,
    n = require("github/fragment-target").findElementByFragmentName,
    a(function() {
        var t, a, u, c, l, d, h, f;
        return u = window.location.hash,
        u && (l = r(u)) && (t = l[1], f = l[2], c = l[3], !n(document, u.slice(1))) ? (h = 0, d = 1, (a = function() {
            var r, l;
            if ((l = o(n(document, t)).next()[0]) && (r = i(l, f, c))) return o(r).parents(".js-details-container").addClass("open"),
            e(r).then(function() {
                var e, t, i, r = n(document, u.slice(1));
                if (r) {
                    if (t = s(r), i = t.top, e = t.bottom, 0 > i || 0 > e) return r.scrollIntoView()
                } else if (d > h) return h++,
                a()
            })
        })()) : void 0
    }),
    o(document).on("click", ".js-expand",
    function() {
        return e(this),
        !1
    }),
    e = function(e) {
        var n;
        return n = e.getAttribute("data-url"),
        n += "&anchor=" + encodeURIComponent(e.hash.slice(1)),
        n = n.replace(/[?&]/, "?"),
        new Promise(function(i, r) {
            return t(n).then(function(t) {
                var n, r;
                return n = o(e).closest(".js-expandable-line"),
                r = n.next(".file-diff-line"),
                c(r[0],
                function() {
                    n.replaceWith(t)
                }),
                i()
            },
            r)
        })
    },
    r = function(e) {
        var t, n;
        return t = e.match(/\#(diff\-[a-f0-9]+)([L|R])(\d+)$/i),
        null != t && 4 === t.length ? t: (n = e.match(/\#(discussion\-diff\-[0-9]+)([L|R])(\d+)$/i), null != n && 4 === n.length ? n: null)
    },
    i = function(e, t, n) {
        var i, r, s, a, u, c, l, d;
        for (n = parseInt(n, 10), c = o(e).find(".js-expand"), a = 0, u = c.length; u > a; a++) if (r = c[a], i = "R" === t ? "data-right-range": "data-left-range", l = r.getAttribute(i).split("-"), d = l[0], s = l[1], parseInt(d, 10) <= n && n <= parseInt(s, 10)) return r;
        return null
    }
}.call(this),
function() {
    var e, t, n, i, r, s, o, a, u, c, l = require("github/jquery")["default"];
    c = require("github/observe").observe,
    l(document).on("click", ".js-add-single-line-comment",
    function() {
        var e, t, n, r, s, u;
        i(l(this).closest(".file")[0]),
        s = this.getAttribute("data-path"),
        e = this.getAttribute("data-anchor"),
        u = this.getAttribute("data-position"),
        t = this.getAttribute("data-line"),
        r = a(l(this).closest("tr")[0], {
            path: s,
            anchor: e,
            position: u,
            line: t
        }),
        n = l(r).find(".js-line-comments")[0],
        n.classList.contains("is-resolved") ? n.classList.toggle("is-collapsed") : o(n)
    }),
    l(document).on("click", ".js-add-split-line-comment",
    function() {
        var e, t, n, s, a, c, d, h;
        i(l(this).closest(".file")[0]),
        h = this.getAttribute("data-type"),
        c = this.getAttribute("data-path"),
        e = this.getAttribute("data-anchor"),
        d = this.getAttribute("data-position"),
        n = this.getAttribute("data-line"),
        t = function() {
            switch (h) {
            case "addition":
                return "js-addition";
            case "deletion":
                return "js-deletion"
            }
        } (),
        a = u(l(this).closest("tr")[0]),
        s = r(a, t, {
            type: h,
            anchor: e,
            path: c,
            position: d,
            line: n
        }),
        s.classList.contains("is-resolved") ? s.classList.toggle("is-collapsed") : o(s)
    }),
    l(document).on("click", ".js-toggle-inline-comment-form",
    function() {
        return o(l(this).closest(".js-line-comments")[0]),
        !1
    }),
    l(document).on("quote:selection", ".js-line-comments",
    function() {
        o(this)
    }),
    l(document).onFocusedKeydown(".js-inline-comment-form .js-comment-field",
    function() {
        return function(t) {
            return l(this).hasClass("js-navigation-enable") ? void 0 : "esc" === t.hotkey && 0 === this.value.length ? (e(l(this).closest(".js-inline-comment-form")[0]), !1) : void 0
        }
    }),
    l(document).on("click", ".js-hide-inline-comment-form",
    function() {
        return e(l(this).closest(".js-inline-comment-form")[0]),
        !1
    }),
    l(document).on("ajaxSuccess", ".js-inline-comment-form",
    function(t, n, i, r) {
        var s;
        this === t.target && (s = l(this).closest(".js-line-comments"), s.find(".js-comments-holder").append(r.inline_comment), e(this))
    }),
    l(document).on("session:resume",
    function(e) {
        var t; (t = e.targetId.match(/^new_inline_comment_diff_([\w-]+)_(\d+)$/)) && l(".js-add-line-comment[data-anchor=" + t[1] + "][data-position=" + t[2] + "]").click()
    }),
    o = function(e) {
        return l(e).find(".js-inline-comment-form-container").addClass("open"),
        l(e).find(".js-write-tab").click(),
        l(e).find(".js-comment-field").focus()
    },
    e = function(e) {
        return e.reset(),
        l(e).closest(".js-inline-comment-form-container").removeClass("open"),
        t()
    },
    i = function(e) {
        return l(e).find(".js-toggle-file-notes").prop("checked", !0).trigger("change")
    },
    t = function() {
        var e, t, n, i, r, s, o;
        for (o = l(".file .js-inline-comments-container"), r = 0, s = o.length; s > r; r++) t = o[r],
        e = l(t).find(".js-comments-holder > *"),
        i = e.length > 0,
        n = l(t).find(".js-inline-comment-form-container").hasClass("open"),
        i || n || l(t).remove()
    },
    n = function(e) {
        var t, n;
        return n = document.querySelector(e),
        t = n.firstElementChild.cloneNode(!0),
        t.querySelector("textarea").value = "",
        t
    },
    c(".js-comment", {
        remove: t
    }),
    a = function(e, t) {
        null == t && (t = {});
        var i = l(e).next(".js-inline-comments-container")[0];
        if (i) return i;
        i = n("#js-inline-comments-single-container-template");
        var r = i.querySelector(".js-inline-comment-form");
        return r && s(r, t),
        e.after(i),
        i
    },
    r = function(e, t, i) {
        var r;
        null == i && (i = {});
        var o = l(e).find(".js-line-comments." + t)[0];
        if (o) return o;
        o = n("#js-inline-comments-split-form-container-template"),
        o.classList.add(t);
        var a = o.querySelector(".js-inline-comment-form");
        return a && s(a, i),
        r = l(e).find("." + t),
        r.last().after(o),
        r.remove(),
        o
    },
    u = function(e) {
        var t = l(e).next(".js-inline-comments-container")[0];
        return t ? t: (t = l("#js-inline-comments-split-container-template").clone().children()[0], l(e).after(t), t)
    },
    s = function(e, t) {
        var n, i, r, s, o;
        for (s = e.elements, i = 0, r = s.length; r > i; i++) n = s[i],
        n.name in t && (n.value = t[n.name]);
        o = e.querySelector(".js-comment-field"),
        o.id = o.id.replace(/^r\d+ /, "").replace("${anchor}", t.anchor).replace("${position}", t.position)
    }
}.call(this),
function() {
    var e, t, n = require("github/jquery")["default"],
    i = require("github/observe"),
    r = i.observe;
    e = function(e, t, i) {
        return r(e,
        function(e) {
            var r, s, o, a, u, c;
            return c = null,
            s = o = function() {
                c && i(c, !1),
                c = null
            },
            a = function(e) {
                c && i(c, !1),
                c = n(e.target).closest(t)[0],
                c && i(c, !0)
            },
            r = function() {
                return e.addEventListener("mouseenter", s),
                e.addEventListener("mouseleave", o),
                e.addEventListener("mouseover", a)
            },
            u = function() {
                return e.removeEventListener("mouseenter", s),
                e.removeEventListener("mouseleave", o),
                e.removeEventListener("mouseover", a)
            },
            {
                add: r,
                remove: u
            }
        })
    },
    t = function(e) {
        return Math.floor(e / 2)
    },
    e(".diff-table", "td.blob-code, td.blob-num",
    function(e, n) {
        var i, r, s, o, a, u, c, l, d, h;
        if (h = e.parentNode, i = h.children, 4 === i.length) for (o = a = 0, c = i.length; c > a; o = ++a) s = i[o],
        s === e && (r = t(o));
        for (d = [], o = u = 0, l = i.length; l > u; o = ++u) s = i[o],
        (null == r || t(o) === r) && d.push(s.classList.toggle("is-hovered", n));
        return d
    })
}.call(this),
function() {
    var e, t, n, i = require("delegated-events"),
    r = i.on,
    s = require("github/observe"),
    o = s.observe,
    a = require("github/hash-change")["default"];
    r("click", ".js-linkable-line-number",
    function(e) {
        window.location.hash = this.id,
        e.preventDefault()
    }),
    e = null,
    n = function(e) {
        return Math.floor(e / 2)
    },
    t = function() {
        var t, i, r, s, o, a, u, c, l, d, h;
        if (e) {
            for (a = 0, c = e.length; c > a; a++) r = e[a],
            r.classList.remove("selected-line");
            e = null
        }
        if (o = window.location.hash.substring(1), o && (h = document.getElementById(o)), h && h.classList.contains("js-linkable-line-number")) {
            if (d = h.parentNode, t = d.children, 4 === t.length) for (s = u = 0, l = t.length; l > u; s = ++u) r = t[s],
            r === h && (i = n(s));
            e = function() {
                var e, o, a;
                for (a = [], s = e = 0, o = t.length; o > e; s = ++e) r = t[s],
                (null == i || n(s) === i) && (r.classList.toggle("selected-line"), a.push(r));
                return a
            } ()
        }
    },
    a(t),
    o(".blob-expanded", t)
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("click", ".js-rich-diff.collapsed .js-expandable",
    function(t) {
        t.preventDefault(),
        e(t.target).closest(".js-rich-diff").removeClass("collapsed")
    }),
    e(document).on("click", ".js-show-rich-diff",
    function(t) {
        t.preventDefault(),
        e(this).closest(".js-warn-no-visible-changes").addClass("hidden").hide().siblings(".js-no-rich-changes").removeClass("hidden").show()
    })
} (),
function() {
    function e() {
        var e = document.querySelector("meta[name=diff-view]"),
        t = e && e.content,
        n = document.querySelector(".file-diff-split"),
        i = "split" === t && n;
        document.body.classList.toggle("split-diff", i)
    }
    var t = require("github/observe"),
    n = t.observe;
    n("meta[name=diff-view]", {
        add: e,
        remove: e
    }),
    n(".file-diff-split", {
        add: e,
        remove: e
    }),
    n(".js-compare-tabs .tabnav-tab.selected", {
        add: e,
        remove: e
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"],
    t = require("github/observe"),
    n = t.observe;
    e(document).on("change", ".js-toggle-file-notes",
    function() {
        return e(this).closest(".file").toggleClass("show-inline-notes", this.checked)
    }),
    e(document).on("click", ".js-toggle-all-file-notes",
    function() {
        var t, n;
        return t = e(".js-toggle-file-notes"),
        n = 0 === t.filter(":checked").length,
        t.prop("checked", n).trigger("change"),
        !1
    }),
    n(".js-inline-comments-container",
    function() {
        var t, n, i = e(this).closest(".file")[0];
        return i ? (t = n = function() {
            var e;
            e = null != i.querySelector(".js-inline-comments-container"),
            i.classList.toggle("has-inline-notes", e)
        },
        {
            add: t,
            remove: n
        }) : void 0
    })
}.call(this),
function() {
    function e(e) {
        var t, n, i;
        i = e.parentElement,
        n = i.querySelectorAll("td.js-line-comments").length,
        t = i.querySelectorAll("td.js-line-comments.is-collapsed").length,
        i.classList.toggle("is-collapsed", t > 0 && n === t)
    }
    var t = require("github/observe"),
    n = t.observe;
    n("td.js-line-comments.is-collapsed", {
        add: function(t) {
            e(t)
        },
        remove: function(t) {
            e(t)
        }
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("focusin", ".js-url-field",
    function() {
        var t;
        return t = this,
        setTimeout(function() {
            return e(t).select()
        },
        0)
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"],
    t = require("github/google-analytics"),
    n = t.trackEvent;
    document.querySelector(".js-account-membership-form") && (e(document).one("change.early-access-tracking", ".js-account-membership-form",
    function() {
        n({
            category: "Large File Storage",
            action: "attempt",
            label: "location: early access form"
        })
    }), e(document).on("submit.early-access-tracking", ".js-account-membership-form",
    function() {
        n({
            category: "Large File Storage",
            action: "submit",
            label: "location: early access form"
        })
    }))
}.call(this),
function() {
    var e, t, n = require("github/jquery")["default"],
    i = require("github/visible")["default"];
    t = require("github/fetch").fetchText,
    e = function() {
        return n(Array.from(n(".js-repo-toggle-team:checked")).filter(i))
    },
    n(document).onFocusedInput(".js-repository-name",
    function() {
        var e, t, i;
        return i = /[^0-9A-Za-z_\-.]/g,
        t = n(".js-form-note"),
        e = n(".js-rename-repository-button"),
        function() {
            t.html("Will be renamed as <strong>" + this.value.replace(i, "-") + "</strong>"),
            i.test(this.value) ? t.show() : t.hide(),
            this.value && this.value !== n(this).attr("data-original-name") ? e.prop("disabled", !1) : e.prop("disabled", !0)
        }
    }),
    n(document).on("click", ".js-repo-team-suggestions-view-all",
    function() {
        return t(this.href).then(function(t) {
            return function(i) {
                var r, s;
                return s = e().map(function() {
                    return this.value
                }),
                r = n(t).closest("ul"),
                r.html(i),
                s.each(function() {
                    return r.find(".js-repo-toggle-team[value=" + this + "]").prop("checked", !0)
                })
            }
        } (this)),
        !1
    })
}.call(this),
function() {
    var e, t, n, i, r, s, o, a = require("github/jquery")["default"];
    r = require("github/observe").observe,
    o = function(e, t) {
        var n;
        return n = t.querySelector(".js-repo-access-error"),
        n.textContent = e,
        n.classList.remove("hidden")
    },
    i = function() {
        var e, t, n, i, r;
        for (i = document.querySelectorAll(".js-repo-access-error"), r = [], t = 0, n = i.length; n > t; t++) e = i[t],
        e.textContent = "",
        r.push(e.classList.add("hidden"));
        return r
    },
    e = function(e) {
        return e.classList.toggle("is-empty", !e.querySelector(".js-repo-access-entry"))
    },
    s = function() {
        var e = document.getElementById("collaborators");
        e && (e.querySelector(".js-add-new-collab").disabled = !0, a(e.querySelector(".js-add-repo-access-field")).data("autocompleted"))
    },
    r(".js-add-new-collab", s),
    t = function(e) {
        var t, n, i, r, s, o, a = document.querySelector(".js-repo-access-team-select");
        if (a) {
            for (o = 0, s = a.querySelectorAll(".js-repo-access-team-select-option"), t = 0, r = s.length; r > t; t++) n = s[t],
            i = n.classList,
            e === n.getAttribute("data-team-id") && (i.add("has-access"), i.remove("selected")),
            i.contains("has-access") || o++;
            if (0 === o) return a.closest(".js-repo-access-group").classList.add("no-form")
        }
    },
    n = function(e) {
        var t, n = document.querySelector(".js-repo-access-team-select");
        return n ? (null != (t = n.querySelector("[data-team-id='" + e + "']")) && t.classList.remove("has-access"), n.closest(".js-repo-access-group").classList.remove("no-form")) : void 0
    },
    a(document).on("autocomplete:autocompleted:changed", ".js-add-repo-access-field",
    function() {
        return a(this).data("autocompleted") ? this.form.querySelector(".js-add-new-collab").disabled = !1 : s()
    }),
    a(document).on("selectmenu:selected", ".js-repo-access-team-select",
    function() {
        var e, t;
        return e = this.querySelector(".js-repo-access-team-select-option.selected").getAttribute("data-team-id"),
        t = this.closest(".js-repo-access-group").querySelector(".js-add-repo-access-field"),
        t.value = e,
        a(t.form).submit()
    }),
    a(document).on("ajaxSend", ".js-add-repo-access-form",
    function() {
        i()
    }),
    a(document).on("ajaxSuccess", ".js-add-repo-access-form",
    function(n, i, r, a) {
        var u, c, l, d;
        return c = this.closest(".js-repo-access-group"),
        u = this.querySelector(".js-add-repo-access-field"),
        l = "teams" === c.id ? c.querySelector(".js-repo-access-list") : c.querySelector(".js-repo-access-list-invites"),
        d = u.value,
        u.value = "",
        a.error ? o(a.error, c) : (s(), l.insertAdjacentHTML("beforeend", a.html), e(c), "teams" === c.id ? t(d) : void 0)
    }),
    a(document).on("ajaxSuccess", ".js-remove-repo-access-form",
    function() {
        var t, r;
        return i(),
        t = this.closest(".js-repo-access-entry"),
        r = this.closest(".js-repo-access-group"),
        "teams" === r.id && n(t.getAttribute("data-team-id")),
        t.remove(),
        e(r)
    }),
    a(document).on("ajaxError", ".js-remove-repo-access-form",
    function() {
        return o(this.getAttribute("data-error-message"), this.closest(".js-repo-access-group")),
        !1
    })
}.call(this),
function() {
    function e(e) {
        var t = e.querySelector(".js-authorized-pushers"),
        n = parseInt(t.getAttribute("data-limit")),
        i = t.querySelectorAll(".js-authorized-user-or-team").length;
        t.classList.toggle("at-limit", i >= n)
    }
    var t = require("github/jquery")["default"],
    n = require("github/fetch"),
    i = n.fetchText,
    r = require("delegated-events"),
    s = r.on;
    t(document).on("change", ".js-default-branch",
    function() {
        var e = document.querySelector(".js-default-branch-confirmation"),
        t = document.querySelector(".js-change-default-branch-button");
        t.disabled = this.value === e.getAttribute("data-original-value"),
        e.value = this.value
    }),
    s("change", ".js-repo-features-form input[type=checkbox]",
    function() {
        var e = this.closest(".js-repo-option").querySelector(".js-status-indicator");
        e.classList.remove("status-indicator-success", "status-indicator-failed"),
        e.classList.add("status-indicator-loading")
    }),
    t(document).on("ajaxSuccess", ".js-repo-features-form",
    function(e, n, i, r) {
        Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function(e) {
            e.classList.remove("status-indicator-loading"),
            e.classList.add("status-indicator-success")
        }),
        /^\s*</.test(r) && t(document.querySelector(".js-repo-nav")).replaceWith(r)
    }),
    t(document).on("ajaxError", ".js-repo-features-form",
    function() {
        Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function(e) {
            e.classList.remove("status-indicator-loading"),
            e.classList.add("status-indicator-failed");
            var t = e.closest(".js-repo-option").querySelector("input[type=checkbox]");
            t.checked = !t.checked
        })
    }),
    s("change", ".js-merge-features-form input[type=checkbox]",
    function() {
        Array.from(this.form.querySelectorAll(".errored")).forEach(function(e) {
            return e.classList.remove("errored")
        });
        var e = this.closest(".js-repo-option"),
        t = e.querySelector(".js-status-indicator");
        t.classList.remove("status-indicator-success", "status-indicator-failed"),
        t.classList.add("status-indicator-loading")
    }),
    t(document).on("ajaxSuccess", ".js-merge-features-form",
    function() {
        Array.from(this.querySelectorAll(".errored")).forEach(function(e) {
            return e.classList.remove("errored")
        }),
        Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function(e) {
            e.classList.remove("status-indicator-loading"),
            e.classList.add("status-indicator-success")
        })
    }),
    t(document).on("ajaxError", ".js-merge-features-form",
    function(e) {
        Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function(e) {
            e.classList.remove("status-indicator-loading"),
            e.classList.add("status-indicator-failed");
            var t = e.closest(".js-repo-option");
            t.classList.add("errored");
            var n = t.querySelector("input[type=checkbox]");
            n.checked = !n.checked
        }),
        Array.from(this.querySelectorAll(".status-indicator-success")).forEach(function(e) {
            e.classList.remove("status-indicator-success")
        }),
        e.preventDefault()
    }),
    t(document).on("change", ".js-protect-branch",
    function() {
        var e = this.closest(".js-protected-branch-settings"),
        t = this.checked;
        Array.from(e.querySelectorAll(".js-protected-branch-options")).forEach(function(e) {
            e.classList.toggle("active", t)
        }),
        Array.from(e.querySelectorAll(".js-protected-branch-option")).forEach(function(e) {
            t ? e.removeAttribute("disabled") : e.setAttribute("disabled", "disabled")
        })
    }),
    t(document).on("change", ".js-required-status-toggle",
    function() {
        var e = this.closest(".js-protected-branch-settings"),
        t = e.querySelector(".js-required-statuses");
        t.classList.toggle("hidden", !this.checked)
    }),
    t(document).on("change", ".js-required-status-checkbox",
    function() {
        var e = this.closest(".js-protected-branches-item");
        e.querySelector(".js-required-status-badge").classList.toggle("hidden", !this.checked)
    }),
    t(document).on("change", ".js-authorized-branch-pushers-toggle",
    function() {
        var e = this.closest(".js-protected-branch-settings"),
        t = e.querySelector(".js-authorized-pushers");
        t.classList.toggle("hidden", !this.checked),
        t.querySelector(".js-autocomplete-field").focus()
    }),
    t(document).on("change", ".js-protected-branch-include-admin-toggle",
    function() {
        var e = this.closest(".js-protected-branch-settings"),
        t = e.querySelectorAll(".js-protected-branch-admin-permission");
        Array.from(t).forEach(function(e) {
            e.classList.toggle("hidden"),
            e.classList.toggle("active", !e.classList.contains("hidden"))
        })
    }),
    t(document).on("autocomplete:result", ".js-add-protected-branch-user-or-team",
    function(t, n) {
        var r = this.closest(".js-protected-branch-options"),
        s = this.closest(".js-autocomplete-container"),
        o = new URL(s.getAttribute("data-url"), window.location.origin),
        a = new URLSearchParams(o.search.slice(1));
        a.append("item", n),
        o.search = a.toString();
        var u = r.querySelector(".js-authorized-users-and-teams"),
        c = u.querySelector("div[data-user-or-team-name='" + n + "']");
        c ? (s.querySelector(".js-autocomplete-field").value = "", c.querySelector(".js-protected-branch-pusher").classList.add("user-already-added")) : i(o.toString()).then(function(t) {
            s.querySelector(".js-autocomplete-field").value = "",
            u.insertAdjacentHTML("beforeend", t),
            e(r)
        })
    }),
    s("click", ".js-remove-authorized-user-or-team",
    function() {
        var t = this.closest(".js-protected-branch-options");
        this.closest(".js-authorized-user-or-team").remove(),
        e(t)
    })
} (),
function() {
    var e, t, n, i, r, s, o, a, u, c = require("github/jquery")["default"],
    l = require("github/visible")["default"],
    d = require("github/observe"),
    h = d.observe;
    a = ["is-render-pending", "is-render-ready", "is-render-loading", "is-render-loaded"].reduce(function(e, t) {
        return e + " " + t
    }),
    o = function(e) {
        var t;
        return t = e.data("timing"),
        null != t ? (t.load = t.hello = null, t.helloTimer && (clearTimeout(t.helloTimer), t.helloTimer = null), t.loadTimer ? (clearTimeout(t.loadTimer), t.loadTimer = null) : void 0) : void 0
    },
    i = function(e) {
        var t, n, i;
        if (!e.data("timing")) return t = 10,
        n = 45,
        i = {
            load: null,
            hello: null,
            helloTimer: null,
            loadTimer: null
        },
        i.load = Date.now(),
        i.helloTimer = setTimeout(u(e,
        function() {
            return ! i.hello
        }), 1e3 * t),
        i.loadTimer = setTimeout(u(e), 1e3 * n),
        e.data("timing", i)
    },
    s = function(e) {
        return e.addClass("is-render-requested")
    },
    r = function(e) {
        return e.removeClass(a),
        e.addClass("is-render-failed"),
        o(e)
    },
    u = function(e, t) {
        return null == t && (t = function() {
            return ! 0
        }),
        function() {
            var n, i;
            return n = function() {
                try {
                    return Array.from(e).some(l)
                } catch(t) {
                    return Array.from(e).filter(l).length > 0
                }
            } (),
            !n || e.hasClass("is-render-ready") || e.hasClass("is-render-failed") || e.hasClass("is-render-failed-fatally") || !t() ? void 0 : (i = e.data("timing")) ? (console.error("Render timeout: " + JSON.stringify(i) + " Now: " + Date.now()), r(e)) : console.error("No timing data on $:", e)
        }
    },
    e = function(e) {
        var t, n;
        t = c(e || this),
        (null != (n = t.data("timing")) ? n.load: 0) || (o(t), i(t), t.addClass("is-render-automatic"), s(t))
    },
    h(".js-render-target", e),
    t = function(e) {
        var t;
        return t = ".js-render-target",
        c(e ? t + "[data-identity='" + e + "']": t)
    },
    c(window).on("message",
    function(e) {
        var i, r, s, o, a, u, c, l, d, h;
        return l = null != (c = e.originalEvent) ? c: e,
        s = l.data,
        a = l.origin,
        s && a && (d = function() {
            try {
                return JSON.parse(s)
            } catch(t) {
                return e = t,
                s
            }
        } (), h = d.type, o = d.identity, r = d.body, u = d.payload, h && r && 1 === (i = t(o)).length && a === i.attr("data-host") && "render" === h) ? n(i, h, o, r, u) : void 0
    }),
    n = function(e, t, n, i, s) {
        var o, u, c, l, d, h;
        switch (i) {
        case "hello":
            if (d = e.data("timing") || {
                untimed: !0
            },
            d.hello = Date.now(), o = {
                type: "render:cmd",
                body: {
                    cmd: "ack",
                    ack: !0
                }
            },
            c = {
                type: "render:cmd",
                body: {
                    cmd: "branding",
                    branding: !1
                }
            },
            h = null != (l = e.find("iframe").get(0)) ? l.contentWindow: void 0, "function" == typeof h.postMessage && h.postMessage(JSON.stringify(o), "*"), "function" == typeof h.postMessage && h.postMessage(JSON.stringify(c), "*"), e.hasClass("is-local")) return u = e.parents(".js-code-editor").data("code-editor"),
            c = {
                type: "render:data",
                body: u.code()
            },
            "function" == typeof h.postMessage ? h.postMessage(JSON.stringify(c), "*") : void 0;
            break;
        case "error":
            return r(e);
        case "error:fatal":
            return r(e),
            e.addClass("is-render-failed-fatal");
        case "error:invalid":
            return r(e, "invalid"),
            e.addClass("is-render-failed-invalid");
        case "loading":
            return e.removeClass(a),
            e.addClass("is-render-loading");
        case "loaded":
            return e.removeClass(a),
            e.addClass("is-render-loaded");
        case "ready":
            if (e.removeClass(a), e.addClass("is-render-ready"), null != (null != s ? s.height: void 0)) return e.height(s.height);
            break;
        case "resize":
            return null != (null != s ? s.height: void 0) && e.hasClass("is-render-ready") ? e.height(s.height) : console.error("Resize event sent without height or before ready");
        default:
            return console.error("Unknown message [" + t + "]=>'" + i + "'")
        }
    }
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(function() {
        var t, n;
        return t = e(".js-newsletter-frequency-choice"),
        t.length ? (n = function() {
            var e;
            return t.find(".selected").removeClass("selected"),
            e = t.find("input[type=radio]:enabled:checked"),
            e.closest(".choice").addClass("selected")
        },
        t.on("change", "input[type=radio]",
        function() {
            return n()
        }), n()) : void 0
    }),
    e(document).on("ajaxSuccess", ".js-subscription-toggle",
    function() {
        var t;
        return t = e(this).find(".selected .notice"),
        t.addClass("visible"),
        setTimeout(function() {
            return t.removeClass("visible")
        },
        2e3)
    }),
    e(document).on("ajaxSuccess", ".js-explore-newsletter-subscription-container",
    function(t, n) {
        return e(this).replaceWith(n.responseText)
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("navigation:open", ".js-create-branch",
    function() {
        return e(this).submit(),
        !1
    })
} (),
function() {
    var e = require("delegated-events"),
    t = e.on;
    t("click", ".js-toggle-lang-stats",
    function(e) {
        var t = document.querySelector(".js-stats-switcher-viewport"),
        n = 0 !== t.scrollTop ? "is-revealing-overview": "is-revealing-lang-stats";
        t.classList.toggle(n),
        e.preventDefault()
    })
} (),
function() {
    var e, t, n = require("github/jquery")["default"],
    i = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    };
    e = function() {
        function e(e) {
            var t;
            t = n(e),
            this.name = t.attr("data-theme-name"),
            this.slug = t.attr("data-theme-slug"),
            this.baseHref = t.attr("href")
        }
        return e.prototype.wrappedKey = function(e, t) {
            return null == t && (t = null),
            t ? t + "[" + e + "]": e
        },
        e.prototype.params = function(e) {
            var t;
            return null == e && (e = null),
            t = {},
            t[this.wrappedKey("theme_slug", e)] = this.slug,
            t
        },
        e.prototype.previewSrc = function() {
            return [this.baseHref, n.param(this.params())].join("&")
        },
        e
    } (),
    t = function() {
        function t() {
            this.updateScrollLinks = i(this.updateScrollLinks, this),
            this.scrollThemeLinksContainer = i(this.scrollThemeLinksContainer, this),
            this.onPublishClick = i(this.onPublishClick, this),
            this.onHideClick = i(this.onHideClick, this),
            this.onThemeLinkClick = i(this.onThemeLinkClick, this),
            this.onThemeNavNextClick = i(this.onThemeNavNextClick, this),
            this.onThemeNavPrevClick = i(this.onThemeNavPrevClick, this),
            this.onScrollForwardsClick = i(this.onScrollForwardsClick, this),
            this.onScrollBackwardsClick = i(this.onScrollBackwardsClick, this),
            this.onPagePreviewLoad = i(this.onPagePreviewLoad, this),
            this.$pagePreview = n("#page-preview"),
            this.$contextLoader = n(".theme-picker-spinner"),
            this.$fullPicker = n(".theme-picker-thumbs"),
            this.$miniPicker = n(".theme-picker-controls"),
            this.$scrollBackwardsLinks = n(".theme-toggle-full-left"),
            this.$scrollForwardsLinks = n(".theme-toggle-full-right"),
            this.$prevLinks = n(".theme-picker-prev"),
            this.$nextLinks = n(".theme-picker-next"),
            this.themeLinksContainer = this.$fullPicker.find(".js-theme-selector"),
            this.themeLinks = this.themeLinksContainer.find(".theme-selector-thumbnail"),
            this.themes = [],
            this.themeLinks.each(function(t) {
                return function(n, i) {
                    return t.themes.push(new e(i))
                }
            } (this)),
            this.selectedTheme = this.themes[0],
            this.$pagePreview.load(this.onPagePreviewLoad),
            this.$scrollBackwardsLinks.click(this.onScrollBackwardsClick),
            this.$scrollForwardsLinks.click(this.onScrollForwardsClick),
            this.$prevLinks.click(this.onThemeNavPrevClick),
            this.$nextLinks.click(this.onThemeNavNextClick),
            this.themeLinks.click(this.onThemeLinkClick),
            n(".theme-picker-view-toggle").click(this.onHideClick),
            n("#page-edit").click(this.onEditClick),
            n("#page-publish").click(this.onPublishClick),
            this.theme(this.selectedTheme),
            this.updateScrollLinks()
        }
        return t.prototype.onPagePreviewLoad = function() {
            var e, t;
            return this.$contextLoader.removeClass("visible"),
            e = this.$pagePreview[0].contentDocument ? this.$pagePreview[0].contentDocument: this.$pagePreview[0].contentWindow.document,
            t = this.getDocHeight(e) + "px",
            this.$pagePreview.css("visibility", "hidden"),
            this.$pagePreview.height("10px"),
            this.$pagePreview.height(t),
            this.$pagePreview.css("visibility", "visible")
        },
        t.prototype.onScrollBackwardsClick = function() {
            return this.scrollThemeLinksContainer( - 1)
        },
        t.prototype.onScrollForwardsClick = function() {
            return this.scrollThemeLinksContainer(1)
        },
        t.prototype.onThemeNavPrevClick = function() {
            return this.theme(this.prevTheme())
        },
        t.prototype.onThemeNavNextClick = function() {
            return this.theme(this.nextTheme())
        },
        t.prototype.onThemeLinkClick = function(e) {
            return this.theme(this.themeForLink(e.currentTarget)),
            !1
        },
        t.prototype.onHideClick = function(e) {
            var t;
            return this.$fullPicker.toggle(),
            this.$miniPicker.toggle(),
            this.scrollToTheme(this.theme(), !1),
            t = n(e.currentTarget),
            t.toggleClass("open")
        },
        t.prototype.onEditClick = function() {
            return n("#page-edit-form").submit(),
            !1
        },
        t.prototype.onPublishClick = function() {
            var e;
            return e = n("#page-publish-form"),
            e.find('input[name="page[theme_slug]"]').val(this.theme().slug),
            n("#page-publish-form").submit(),
            !1
        },
        t.prototype.scrollThemeLinksContainer = function(e) {
            var t, n, i;
            return n = this.themeLinksContainer.scrollLeft(),
            i = this.themeLinksContainer.outerWidth(!0),
            t = n + i * e,
            this.themeLinksContainer.animate({
                scrollLeft: t
            },
            400,
            function(e) {
                return function() {
                    return e.updateScrollLinks()
                }
            } (this)),
            !1
        },
        t.prototype.updateScrollLinks = function() {
            var e, t, n;
            return e = this.themeLinksContainer.scrollLeft(),
            0 >= e ? (this.$scrollBackwardsLinks.addClass("disabled"), this.$scrollForwardsLinks.removeClass("disabled")) : (this.$scrollBackwardsLinks.removeClass("disabled"), n = this.themeLinksContainer[0].scrollWidth, t = n - this.themeLinksContainer.outerWidth(!0), e >= t ? this.$scrollForwardsLinks.addClass("disabled") : this.$scrollForwardsLinks.removeClass("disabled"))
        },
        t.prototype.selectedThemeIndex = function() {
            return this.themes.indexOf(this.selectedTheme)
        },
        t.prototype.prevTheme = function() {
            var e;
            return e = (this.selectedThemeIndex() - 1) % this.themes.length,
            0 > e && (e += this.themes.length),
            this.themes[e]
        },
        t.prototype.nextTheme = function() {
            return this.themes[(this.selectedThemeIndex() + 1) % this.themes.length]
        },
        t.prototype.themeForLink = function(e) {
            return this.themes[this.themeLinks.index(n(e))]
        },
        t.prototype.linkForTheme = function(e) {
            return n(this.themeLinks[this.themes.indexOf(e)])
        },
        t.prototype.scrollToTheme = function(e, t) {
            var n, i, r, s, o, a;
            return null == t && (t = !0),
            n = this.linkForTheme(e),
            a = this.themes.indexOf(e),
            s = n.outerWidth(!0),
            r = a * s,
            i = this.themeLinksContainer.scrollLeft(),
            o = i + this.themeLinksContainer.outerWidth(!0),
            i > r || r + s > o ? t ? this.themeLinksContainer.animate({
                scrollLeft: r
            },
            500) : this.themeLinksContainer.scrollLeft(r) : void 0
        },
        t.prototype.theme = function(e) {
            return null == e && (e = null),
            e ? (this.selectedTheme = e, this.showPreviewFor(e), this.themeLinks.removeClass("selected"), this.linkForTheme(e).addClass("selected"), this.scrollToTheme(e), this.$miniPicker.find(".js-theme-name").text(e.name), !1) : this.selectedTheme
        },
        t.prototype.showPreviewFor = function(e) {
            var t;
            return this.$contextLoader.addClass("visible"),
            t = this.$fullPicker.find("form"),
            t.find('input[name="theme_slug"]').val(e.slug),
            t.submit()
        },
        t.prototype.getDocHeight = function(e) {
            var t, n;
            return this.$pagePreview.height("auto"),
            t = e.body,
            n = e.documentElement,
            Math.max(t.scrollHeight, t.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight)
        },
        t
    } (),
    n(function() {
        return document.getElementById("theme-picker-wrap") ? new t: void 0
    })
}.call(this),
function() {
    function e(e) {
        document.querySelector(".js-gist-dropzone").classList.remove("hidden"),
        e.stopPropagation(),
        e.preventDefault()
    }
    function t(e) {
        var t; (null != (t = e.target.classList) ? t.contains("js-gist-dropzone") : void 0) && e.target.classList.add("hidden")
    }
    function n(e) {
        var t, n, r, s, o, u;
        for (u = e.dataTransfer.files, s = 0, o = u.length; o > s; s++) r = u[s],
        a({
            category: "Interaction",
            action: "File Drop",
            label: r.type
        }),
        t = function(t) {
            var n;
            return r = t.file,
            n = t.data,
            e.target.dispatchEvent(new CustomEvent("gist:filedrop", {
                bubbles: !0,
                cancelable: !0,
                detail: {
                    file: r,
                    text: n
                }
            }))
        },
        n = function() {},
        i(r).then(t, n);
        document.querySelector(".js-gist-dropzone").classList.add("hidden"),
        e.stopPropagation(),
        e.preventDefault()
    }
    function i(e) {
        return new Promise(function(t, n) {
            var i;
            return i = new FileReader,
            i.onload = function() {
                var r;
                return r = i.result,
                r && !/\0/.test(r) ? t({
                    file: e,
                    data: r
                }) : n(new Error("invalid file"))
            },
            i.readAsText(e)
        })
    }
    var r = require("github/observe"),
    s = r.observe,
    o = require("github/google-analytics"),
    a = o.trackEvent;
    s(".js-gist-dropzone", {
        add: function() {
            document.body.addEventListener("dragenter", e),
            document.body.addEventListener("dragleave", t),
            document.body.addEventListener("dragover", e),
            document.body.addEventListener("drop", n)
        },
        remove: function() {
            document.body.removeEventListener("dragenter", e),
            document.body.removeEventListener("dragleave", t),
            document.body.removeEventListener("dragover", e),
            document.body.removeEventListener("drop", n)
        }
    })
}.call(this),
function() {
    var e, t, n, i, r, s, o, a, u = require("github/jquery")["default"],
    c = require("github/observe"),
    l = c.observe;
    n = require("github/fetch").fetchJSON,
    t = function(e) {
        var t, n, i, r, s, o, a, u, c, l, d;
        for (i = e.querySelector(".js-gist-files"), d = document.getElementById("js-gist-file-template"), t = document.createElement("div"), t.innerHTML = d.textContent, c = t.querySelectorAll("[id]"), r = 0, o = c.length; o > r; r++) n = c[r],
        n.removeAttribute("id");
        for (u = t.querySelector(".js-code-textarea"), null != u && u.setAttribute("id", "blob_contents_" + Date.now()), l = t.children, s = 0, a = l.length; a > s; s++) n = l[s],
        i.append(n);
        return i.lastElementChild
    },
    a = function(e) {
        var n, i, r, s, o, a;
        for (o = e.querySelectorAll(".js-gist-file"), r = 0, s = o.length; s > r; r++) if (n = o[r], i = n.querySelector(".js-gist-filename"), a = n.querySelector(".js-blob-contents"), !i.value && !a.value) return n;
        return t(e)
    },
    o = function(e) {
        var t;
        return t = e.closest(".js-code-editor"),
        new Promise(function(e) {
            var n = u(t).data("code-editor");
            return n ? e(n) : u(t).one("codeEditor:ready",
            function() {
                return e(u(this).data("code-editor"))
            })
        })
    },
    e = function(e) {
        var t, n, i, r;
        for (i = e.querySelectorAll(".js-code-textarea"), t = 0, n = i.length; n > t; t++) if (r = i[t], r.value.trim().length > 0) return ! 0;
        return ! 1
    },
    r = function() {
        var t, n, i, r, s;
        for (r = document.querySelectorAll(".js-gist-create"), s = [], n = 0, i = r.length; i > n; n++) t = r[n],
        s.push(t.disabled = !e(t.form));
        return s
    },
    u(document).on("change", ".js-code-textarea",
    function() {
        return r()
    }),
    i = function() {
        var e, t;
        return t = this,
        (e = t.getAttribute("data-language-detection-url")) ? n(e + "?filename=" + encodeURIComponent(t.value)).then(function(e) {
            return o(t).then(function(t) {
                return t.setMode(e.language)
            })
        }) : void 0
    },
    u(document).onFocusedInput(".js-gist-filename",
    function(e) {
        var t, n;
        return n = this,
        t = n.closest(".js-code-editor"),
        o(t).then(function(t) {
            return null == t.ace ? !1 : u(n).on("throttled:input." + e, i)
        }),
        !1
    }),
    u(document).on("click", ".js-add-gist-file",
    function() {
        var e;
        return e = this.closest(".js-blob-form"),
        t(e).scrollIntoView(),
        !1
    }),
    u(document).on("gist:filedrop", ".js-blob-form",
    function(e) {
        var t, n, r, s, u;
        return s = e.originalEvent.detail,
        t = s.file,
        u = s.text,
        n = a(this),
        r = n.querySelector(".js-gist-filename"),
        r.value = t.name,
        i.call(r),
        o(r).then(function(e) {
            return e.setCode(u)
        }),
        n.scrollIntoView()
    }),
    u(document).on("click", ".js-remove-gist-file",
    function() {
        var e, t, n, i, r;
        for (e = this.closest(".js-gist-file"), r = e.querySelectorAll(".js-gist-deleted input"), t = 0, i = r.length; i > t; t++) n = r[t],
        n.disabled = !1;
        return e.querySelector(".js-code-editor").remove(),
        !1
    }),
    u(function() {
        return r()
    }),
    s = function(e) {
        var t, n, i, r, s;
        for (n = e.querySelectorAll(".js-remove-gist-file"), s = [], i = 0, r = n.length; r > i; i++) t = n[i],
        s.push(t.classList.toggle("hidden", n.length < 2));
        return s
    },
    l(".js-remove-gist-file",
    function() {
        var e;
        return e = this.closest(".js-gist-files"),
        {
            add: function() {
                return s(e)
            },
            remove: function() {
                return s(e)
            }
        }
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxComplete", ".js-gist-file-update-container .js-comment-update",
    function(e, t) {
        var n;
        200 === t.status && (n = JSON.parse(t.responseText), this.action = n.url)
    })
} (),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("click", ".js-skip-to-content",
    function() {
        return e("#start-of-content").next().attr("tabindex", "-1").focus(),
        !1
    })
} (),
function() {
    function e(e) {
        var t = e.target,
        n = parseInt(t.value, 10) || 0,
        i = t.getAttribute("data-price"),
        r = n * i,
        s = t.form,
        o = s.querySelector(".js-job-posting-credit-total-cost");
        o.textContent = r.toLocaleString();
        var a = s.querySelector(".js-job-posting-units");
        a.textContent = "job credit" + (1 === n ? "": "s")
    }
    var t = require("github/observe"),
    n = t.observe;
    n(".js-job-posting-credit-credits-purchased",
    function() {
        this.addEventListener("change", e),
        this.addEventListener("keyup", e)
    })
} (),
function() {
    function e(e) {
        var t = e.target,
        n = t.querySelector("button[type=submit]");
        n.disabled && e.preventDefault()
    }
    function t(e, t) {
        Array.from(e).forEach(function(e) {
            return e.classList.toggle("hidden", !t)
        })
    }
    function n(e, n) {
        var i = e.querySelectorAll(".js-job-posting-form-edit-section");
        t(i, n)
    }
    function i(e, n) {
        var i = e.querySelectorAll(".js-job-posting-form-preview-section");
        t(i, n)
    }
    function r(e, t) {
        var n = e.querySelector(".js-job-posting-form-preview");
        n.innerHTML = t
    }
    function s(e) {
        for (var t = [], n = e.elements, i = 0; i < n.length; i++) {
            var r = n[i];
            if ("_method" !== r.name && "" !== r.name) {
                var s = "INPUT" === r.tagName && "checkbox" === r.type,
                o = s && r.checked; (s && o || !s) && t.push(r.name + "=" + encodeURIComponent(r.value))
            }
        }
        return t.join("&")
    }
    function o(e) {
        var t = e.target,
        n = t.parentNode.querySelector(".selected");
        if (n) n.classList.remove("selected"),
        t.classList.add("selected");
        else {
            var o = document.querySelector(".js-job-posting-form-tabs");
            o.querySelector(".selected.tabnav-tab").classList.remove("selected"),
            o.querySelector(".js-show-job-posting-preview").classList.add("selected")
        }
        window.scrollTo(0, 0);
        var a = t.form,
        u = document.querySelector(".js-job-posting-preview-loading").innerHTML;
        document.querySelector(".js-job-posting-form-preview").innerHTML = u,
        i(a, !0);
        for (var c = a.querySelectorAll(".js-job-posting-form-edit-section"), l = 0; l < c.length; l++) c[l].classList.add("hidden");
        var h = t.getAttribute("data-url"),
        f = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: s(a)
        };
        d(h, f).then(function(e) {
            r(a, e)
        })
    }
    function a(e) {
        var t = e.target,
        r = t.parentNode.querySelector(".selected");
        r && (r.classList.remove("selected"), t.classList.add("selected"));
        var s = t.form;
        n(s, !0),
        i(s, !1)
    }
    var u = require("github/observe"),
    c = u.observe,
    l = require("github/fetch"),
    d = l.fetchText;
    c(".js-job-posting-form",
    function() {
        this.addEventListener("submit", e)
    }),
    c(".js-show-job-posting-preview",
    function() {
        this.addEventListener("click", o)
    }),
    c(".js-show-job-posting-form",
    function() {
        this.addEventListener("click", a)
    })
} (),
function() {
    function e() {
        var e = b(".js-job-search-input")[0];
        if ("undefined" != typeof e) {
            var t = e.value,
            i = b("input[type=text].js-job-search-prefix, select.js-job-search-prefix, input[type=hidden].js-job-search-prefix"),
            r = n(i,
            function(e, t) {
                return "" === e ? "": "" !== t ? e + t: void 0
            }),
            s = "input[type=checkbox].js-job-search-prefix";
            b.merge(r, n(b(s),
            function(e, t) {
                return "true" === t ? e + t: void 0
            }));
            var o = b.trim(r.join(" "));
            b(".js-hidden-job-query").val(b.trim(t + " " + o))
        }
    }
    function t(e) {
        return - 1 !== e.search(/\s/g) ? '"' + e.replace(/"/g, '\\"') + '"': e
    }
    function n(e, n) {
        return b.map(e,
        function(e) {
            var i = null;
            if (b(e).is("[type=checkbox]")) i = b(e).prop("checked") ? "true": "false";
            else {
                var r = e.getAttribute("data-search-value");
                i = null === r ? e.value.trim() : r
            }
            var s = e.getAttribute("data-search-prefix");
            return "" === s ? n.call(e, s, i) : -1 !== i.search(/\,/g) && s.indexOf("location") < 0 ? i.split(/\,/).map(function(i) {
                return n.call(e, s, t(i.trim()))
            }) : n.call(e, s, t(i))
        })
    }
    function i(e) {
        var n = e[0].getAttribute("data-suggestion");
        null === n && (n = e[0].getAttribute("data-value"));
        var i = e.closest(".js-suggester-container"),
        r = i.find('input[type="text"]:not(.js-applied-suggestions-value)'),
        s = i.find(".js-job-search-prefix"),
        o = e[0].getAttribute("data-search-prefix");
        null !== o && (n = o + t(n)),
        s.val(n).change(),
        null === o && r.val(e[0].getAttribute("data-value")).change(),
        e.closest(".js-suggester").empty().addClass("hidden"),
        r.focus()
    }
    function r(e) {
        var t = e[0].getAttribute("data-value"),
        n = e.closest(".js-suggester-container"),
        i = n.find(".js-job-search-prefix"),
        r = e[0].getAttribute("data-search-prefix");
        i.attr("data-search-prefix", r).attr("data-search-value", t).attr("name", "exact_location"),
        i.val(e[0].getAttribute("data-value")).change(),
        e.closest(".js-suggester").empty().addClass("hidden"),
        i.focus()
    }
    function s(e) {
        var t = e[0].getAttribute("data-geonameid"),
        n = e.closest(".js-suggester-container"),
        i = n.find('input[type="text"]:not(.js-applied-suggestions-value)'),
        r = n.find(".applied-suggestions"),
        s = document.createElement("li");
        s.className = "applied-suggestion";
        var o = n.find(".js-applied-suggestions-value"),
        a = o[0].value,
        u = "";
        u = a.length < 1 ? t: a.split(",").concat(t).join(","),
        o.val(u).change(),
        s.appendChild(document.createTextNode(e.text()));
        var c = document.createElement("button");
        c.setAttribute("data-value", t),
        b(c).append("&times;"),
        c.className = "js-remove-suggestion remove-suggestion tooltipped tooltipped-e",
        c.setAttribute("aria-label", "Remove"),
        c.type = "button",
        s.appendChild(c),
        r[0].appendChild(s),
        i.val(""),
        r.removeClass("hidden"),
        e.closest(".js-suggester").empty().addClass("hidden"),
        i.focus()
    }
    function o(e) {
        var t = e.getAttribute("data-default-search-prefix");
        e.setAttribute("data-search-prefix", t),
        e.removeAttribute("data-search-value")
    }
    function a(e, t) {
        var n = e.find(".js-navigation-item");
        if (! (n.length < 1)) {
            var i = e.find(".js-navigation-item.navigation-focus"),
            r = null;
            if (i.length > 0) {
                var s = i.next(),
                o = i.prev();
                i.removeClass("navigation-focus"),
                r = 1 === t ? s.length > 0 ? s: n.first() : o.length > 0 ? o: n.last()
            } else r = 1 === t ? n.first() : n.last();
            r.addClass("navigation-focus")
        }
    }
    function u(e, t) {
        var n = e.closest(".js-suggester-container")[0],
        i = n.querySelector(".js-suggester");
        i.innerHTML = t,
        i.querySelectorAll("li").length > 0 ? (i.classList.remove("hidden"), i.style.display = "block") : i.classList.add("hidden")
    }
    function c(e, t, n) {
        var i = e[0].value.trim(),
        r = e.closest(".js-suggester-container"),
        s = r[0].querySelector(".octospinner");
        if (r.find(".js-suggester").empty(), !(i.length < 1)) {
            s.classList.remove("hidden");
            var o = t.indexOf("?") > -1 ? "&": "?";
            t += o + "q=" + n(i),
            x(t).then(function(t) {
                u(e, t),
                s.classList.add("hidden")
            })
        }
    }
    function l(e, t) {
        c(e, t,
        function(e) {
            return 'title:"' + encodeURIComponent(e) + '"'
        })
    }
    function d(e, t) {
        c(e, t,
        function(e) {
            return encodeURIComponent(e)
        })
    }
    function h(e) {
        for (; e.hasChildNodes();) e.removeChild(e.lastChild);
        e.classList.add("hidden")
    }
    function f(e, t, n, i) {
        var r = b(t.target),
        s = r.closest(".js-suggester-container"),
        o = s.find(".js-suggester");
        if (q[e] && clearTimeout(q[e]), 38 === t.keyCode) return void a(o, -1);
        if (40 === t.keyCode) return void a(o, 1);
        if (9 === t.keyCode) {
            var u = o.find(".js-navigation-item.navigation-focus");
            return void(u.length > 0 ? (t.preventDefault(), i(u)) : h(o[0]))
        }
        if (27 === t.keyCode) return void h(o[0]);
        if (13 === t.keyCode) {
            var c = o.find(".js-navigation-item.navigation-focus");
            return void(c.length > 0 && (t.preventDefault(), i(c)))
        }
        var l = s[0].querySelector(".js-navigation-container").getAttribute("data-url");
        q[e] = setTimeout(function() {
            n(r, l)
        },
        500)
    }
    function m(e) {
        var t = e.target;
        t.classList.contains("js-navigation-item") || (t = t.closest(".js-navigation-item"));
        var n = t.closest(".js-job-search-suggester").querySelector(".navigation-focus");
        null !== n && n.classList.remove("navigation-focus"),
        t.classList.add("navigation-focus")
    }
    function p(e) {
        var t = e.target;
        t.classList.contains("js-navigation-item") || (t = t.closest(".js-navigation-item")),
        t.classList.remove("navigation-focus")
    }
    function g(e) {
        var t = e.target;
        t.classList.contains("js-navigation-item") || (t = t.closest(".js-navigation-item"));
        var n = t.getAttribute("data-search-prefix"),
        o = t.closest(".js-suggester"),
        a = o.classList.contains("js-job-search-suggester-with-list");
        "title:" === n ? i(b(t)) : a ? s(b(t)) : r(b(t))
    }
    function v(e) {
        e.preventDefault();
        var t = b(e.target),
        n = t[0].getAttribute("data-value"),
        i = t.closest(".js-suggester-container"),
        r = i[0].querySelector(".js-applied-suggestions-value"),
        s = r.value.split(","),
        o = s.indexOf(n);
        o > -1 && s.splice(o, 1),
        r.value = s.join(",");
        var a = t.closest(".applied-suggestions")[0];
        t.closest("li").remove(),
        a.querySelectorAll("li").length < 1 && a.classList.add("hidden")
    }
    var b = require("github/jquery")["default"],
    y = require("github/observe"),
    j = y.observe,
    w = require("github/fetch"),
    x = w.fetchText;
    b(document).on("focusin", ".js-job-search-prefix",
    function() {
        var t = document.getElementById("job-title-suggester");
        h(t);
        var n = document.getElementById("job-location-suggester");
        return h(n),
        function() {
            e()
        }
    }),
    b(document).on("focusin", ".js-job-search-input",
    function() {
        b(this).closest(".js-advanced-search-label").addClass("focus")
    }),
    b(document).on("change", ".js-job-search-prefix", e),
    b(document).on("ajaxSuccess", ".js-job-search-unwatch",
    function(e) {
        var t = b(e.target),
        n = t.closest(".menu");
        t.closest(".menu-item").remove(),
        n.find(".menu-item").length < 1 && (b(".search-job-postings-watched, .js-job-search-watch").removeClass("hidden"), b(".js-watched-orgs").addClass("hidden"))
    }),
    b(document).on("ajaxSuccess", ".js-org-job-search-unwatch",
    function() {
        b(".js-org-job-search-watch").removeClass("hidden")
    }),
    b(document).on("ajaxSuccess", ".js-job-search-watch",
    function(e, t, n, i) {
        b(".js-job-search-watch")[0].classList.add("hidden"),
        b(".js-job-search-watches").empty().append(b(i))
    }),
    b(document).on("ajaxSuccess", ".js-org-job-search-watch",
    function(e, t, n, i) {
        b(".js-org-job-search-watch")[0].classList.add("hidden"),
        b(".js-org-job-search-unwatch").removeClass("hidden"),
        Array.from(document.querySelectorAll(".js-org-job-search-id")).forEach(function(e) {
            e.value = i.saved_search.id
        })
    }),
    b(".js-select-menu.js-job-search-watch, .js-select-menu.js-org-job-search-watch").on("menu:activated",
    function(e) {
        b(e.target).find(".js-job-search-title").focus()
    }),
    b(document).on("submit", ".js-job-search-unwatch, .js-org-job-search-unwatch",
    function(e) {
        var t = e.target;
        t.blur(),
        t.classList.add("hidden")
    });
    var q = {};
    q.jobTitle = null,
    q.jobLocation = null,
    j(".js-job-search-input",
    function() {
        this.addEventListener("keydown",
        function(e) {
            f("jobTitle", e, l, i)
        })
    }),
    j(".js-job-search-suggester .js-navigation-item",
    function() {
        this.addEventListener("mouseover", m),
        this.addEventListener("mouseout", p),
        this.addEventListener("click", g)
    }),
    j(".js-job-posting-location",
    function() {
        this.addEventListener("keydown",
        function(e) {
            o(e.target),
            f("jobLocation", e, d, r)
        })
    }),
    j(".js-job-posting-location-with-list",
    function() {
        this.addEventListener("keydown",
        function(e) {
            f("jobLocation", e, d, s)
        })
    }),
    j(".js-job-search-input, .js-job-search-hidden",
    function() {
        e()
    }),
    j(".js-remove-suggestion",
    function() {
        this.addEventListener("click", v)
    })
} (),
function() {
    var e, t, n, i, r, s, o, a, u = require("github/jquery")["default"],
    c = require("github/sudo")["default"];
    o = require("github/fetch"),
    n = o.fetch,
    i = o.fetchText,
    r = require("delegated-events").fire,
    s = require("github/observe").observe,
    e = {
        isHttpFragment: function(e) {
            return 0 === "http://".indexOf(e) || 0 === "https://".indexOf(e)
        },
        isValidHttpUrl: function(e) {
            var t, n, i;
            return e = e.trim(),
            i = function() {
                try {
                    return new URL(e)
                } catch(t) {}
            } (),
            null == i ? !1 : (t = /^https?/.test(i.protocol), n = i.href === e || i.href === e + "/", t && n)
        }
    },
    s(".js-hook-url-field",
    function(t) {
        var n, i, r;
        n = u(t),
        i = function(e) {
            var t, n;
            return t = u(e).closest("form"),
            n = /^https:\/\/.+/.test(e.val()),
            t.toggleClass("is-ssl", n)
        },
        r = function(t) {
            var n, i;
            return n = t.val(),
            i = e.isHttpFragment(n) || e.isValidHttpUrl(n),
            t.closest("form").toggleClass("is-invalid-url", !i)
        },
        n.on("keyup",
        function() {
            return i(n)
        }),
        n.on("throttled:input",
        function() {
            return r(n)
        }),
        i(n),
        r(n)
    }),
    u(document).on("click", ".js-hook-toggle-ssl-verification",
    function(e) {
        return e.preventDefault(),
        u(".js-ssl-hook-fields").toggleClass("is-not-verifying-ssl"),
        u(".js-ssl-hook-fields").hasClass("is-not-verifying-ssl") ? (u(".js-hook-ssl-verification-field").val("1"), r(document, "facebox:close")) : u(".js-hook-ssl-verification-field").val("0")
    }),
    t = function(e) {
        var t;
        return t = u(".js-hook-event-checkbox"),
        t.prop("checked", !1),
        null != e ? t.filter(e).prop("checked", !0) : void 0
    },
    u(document).on("change", ".js-hook-event-choice",
    function() {
        var e;
        return e = "custom" === u(this).val(),
        u(".js-hook-events-field").toggleClass("is-custom", e),
        !0
    }),
    u(document).on("submit", ".js-hook-form",
    function() {
        var e, n;
        return e = u(this),
        n = e.find(".js-hook-event-choice:checked").val(),
        "custom" === n && u(".js-hook-wildcard-event").prop("checked", !1),
        "push" === n && t('[value="push"]'),
        "all" === n && t(".js-hook-wildcard-event"),
        !0
    }),
    u(document).on("details:toggled", ".js-hook-secret",
    function() {
        var e, t;
        return e = u(this),
        t = e.find("input[type=password]"),
        e.hasClass("open") ? t.removeAttr("disabled").focus() : t.attr("disabled", "disabled")
    }),
    u(document).on("details:toggle", ".js-hook-delivery-item",
    function() {
        var e, t;
        return e = u(this),
        t = this.querySelector(".js-hook-delivery-details"),
        e.data("details-load-initiated") ? void 0 : c().then(function() {
            var n, r;
            return e.data("details-load-initiated", !0),
            t.classList.add("is-loading"),
            n = function(e) {
                return u(t).replaceWith(e),
                t.classList.remove("is-loading")
            },
            r = function() {
                return t.classList.add("has-error"),
                t.classList.remove("is-loading")
            },
            i(t.getAttribute("data-url")).then(n, r)
        })
    }),
    u(document).on("click", ".js-hook-delivery-details .js-tabnav-tab",
    function() {
        var e, t, n;
        return t = u(this),
        e = t.closest(".js-hook-delivery-details"),
        e.find(".js-tabnav-tab").removeClass("selected"),
        n = e.find(".js-tabnav-tabcontent").removeClass("selected"),
        t.addClass("selected"),
        n.filter(function() {
            return this.getAttribute("data-tab-name") === t.attr("data-tab-target")
        }).addClass("selected")
    }),
    u(document).on("click", ".js-hook-deliveries-pagination-button",
    function(e) {
        var t, n;
        return e.preventDefault(),
        n = this,
        t = u(this).parent(),
        c().then(function() {
            return t.addClass("loading"),
            i(n.getAttribute("href")).then(function(e) {
                return t.replaceWith(e)
            })
        })
    }),
    u(document).on("click", ".js-redeliver-hook-delivery-init-button",
    function(e) {
        var t;
        return e.preventDefault(),
        t = this.getAttribute("href"),
        c().then(function() {
            return u.facebox({
                div: t
            })
        })
    }),
    u(document).on("ajaxSuccess", ".js-redeliver-hook-form",
    function(e, t) {
        var n, i, s, o;
        return o = this.getAttribute("data-delivery-guid"),
        n = u(".js-hook-delivery-details").filter(function() {
            return this.getAttribute("data-delivery-guid") === o
        }),
        s = n.closest(".js-hook-delivery-item"),
        r(document, "facebox:close"),
        i = u(t.responseText),
        n.replaceWith(i),
        i.on("load",
        function() {
            return n = s.find(".js-hook-delivery-details"),
            s.find(".js-item-status").removeClass("success pending failure").addClass(n.attr("data-status-class")),
            s.find(".js-item-status-tooltip").attr("aria-label", n.attr("data-status-message"))
        })
    }),
    u(document).on("ajaxError", ".js-redeliver-hook-form",
    function() {
        return u(this).siblings(".js-redelivery-dialog").addClass("failed")
    }),
    u(document).on("submit", ".js-test-hook-form",
    function(e) {
        var t;
        return e.preventDefault(),
        t = this,
        c().then(function() {
            var e, i, r, s;
            return s = document.querySelector(".js-test-hook-message"),
            s.classList.remove("error", "success"),
            e = function() {
                return t.dispatchEvent(new CustomEvent("ajaxComplete", {
                    bubbles: !0
                }))
            },
            i = function() {
                return s.classList.add("success")
            },
            r = function(e) {
                var t;
                return s.classList.add("error"),
                t = s.querySelector(".js-test-hook-message-errors"),
                null != e.response ? e.response.json().then(function(e) {
                    return t.textContent = e.errors
                }) : t.textContent = "Network request failed"
            },
            n(t.action, {
                method: t.method,
                body: u(t).serialize(),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }).then(i, r).then(e, e)
        })
    }),
    a = function() {
        var e, t, n, i, r;
        return n = u(this),
        i = n.find(".js-value"),
        e = n.closest("form"),
        t = e.find(".js-enforcement-value")[0],
        t.value = i.text().split("_")[0],
        r = e.find(".js-final-value")[0],
        "undefined" != typeof r && (i.text().split("_")[1] ? r.value = !1 : r.value = !0),
        e.submit()
    },
    u(document).on("click", ".js-hook-enforcement-select .js-navigation-item", a)
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("navigation:open", ".js-issues-custom-filter",
    function() {
        var t, n, i, r;
        return n = e(this),
        r = n.find(".js-new-item-name").text(),
        i = n.attr("data-name"),
        t = e("<input>", {
            type: "hidden",
            name: i,
            value: r
        }),
        n.append(t),
        n.submit()
    })
}.call(this),
function() {
    var e, t, n, i = require("github/jquery")["default"],
    r = require("github/setimmediate")["default"];
    t = function(t, n) {
        return t.closest(".js-label-editor").find(".js-color-editor-bg").css("background-color", n),
        t.css("color", e(n, -.5)),
        t.css("border-color", n)
    },
    n = function(e) {
        var t, n;
        return n = "#c00",
        t = i(e).closest(".js-color-editor"),
        t.find(".js-color-editor-bg").css("background-color", n),
        e.css("color", "#c00"),
        e.css("border-color", n)
    },
    e = function(e, t) {
        var n, i, r;
        for (e = String(e).toLowerCase().replace(/[^0-9a-f]/g, ""), e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), t = t || 0, r = "#", n = void 0, i = 0; 3 > i;) n = parseInt(e.substr(2 * i, 2), 16),
        n = Math.round(Math.min(Math.max(0, n + n * t), 255)).toString(16),
        r += ("00" + n).substr(n.length),
        i++;
        return r
    },
    i(document).on("focusin", ".js-color-editor-input",
    function() {
        var e, r;
        return r = i(this),
        e = i(this).closest(".js-label-editor"),
        r.on("throttled:input.colorEditor",
        function() {
            var i;
            return "#" !== r.val().charAt(0) && r.val("#" + r.val()),
            e.removeClass("is-valid is-not-valid"),
            i = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(r.val()),
            i ? (e.addClass("is-valid"), t(r, r.val())) : (e.addClass("is-not-valid"), n(r))
        }),
        r.on("blur.colorEditor",
        function() {
            return r.off(".colorEditor")
        })
    }),
    i(document).on("mousedown", ".js-color-chooser-color",
    function() {
        var e, n, r;
        return i(this).closest(".js-color-editor").removeClass("open"),
        e = i(this).closest(".js-label-editor"),
        n = "#" + i(this).attr("data-hex-color"),
        r = e.find(".js-color-editor-input"),
        e.removeClass("is-valid is-not-valid"),
        r.val(n),
        t(r, n)
    }),
    i(document).on("submit", ".js-label-editor form",
    function() {
        var e, t;
        return e = i(this).find(".js-color-editor-input"),
        t = e.val(),
        t.length < 6 && (t = t[1] + t[1] + t[2] + t[2] + t[3] + t[3]),
        e.val(t.replace("#", ""))
    }),
    i(document).on("focusin", ".js-label-editor",
    function() {
        return i(this).closest(".js-label-editor").addClass("open")
    }),
    i(document).on("reset", ".js-create-label",
    function() {
        var e, n, s;
        return e = i(this).find(".color-chooser span").removeAttr("data-selected"),
        s = e.eq(Math.floor(Math.random() * e.length)),
        n = "#" + s.attr("data-selected", "").attr("data-hex-color"),
        r(function(e) {
            return function() {
                var r;
                return r = i(e).find(".js-color-editor-input"),
                r.attr("data-original-color", n).attr("value", n),
                t(r, r.val())
            }
        } (this))
    })
}.call(this),
function() {
    function e(e, t) {
        return e.closest("div.js-details-container").classList.toggle("is-empty", t)
    }
    function t(e) {
        var t, n, i;
        return t = document.querySelector(".js-labels-count"),
        i = a(t.textContent),
        n = i + e,
        t.textContent = o(n),
        r(n, document.querySelector(".js-labels-label")),
        n
    }
    var n = require("github/jquery")["default"],
    i = require("github/inflector"),
    r = i.pluralizeNode,
    s = require("github/number-helpers"),
    o = s.formatNumber,
    a = s.parseFormattedNumber;
    n(document).on("click", ".js-edit-label",
    function() {
        n(this).closest(".labels-list-item").addClass("edit")
    }),
    n(document).on("click", ".js-edit-label-cancel",
    function() {
        this.form.reset(),
        n(this).closest(".labels-list-item").removeClass("edit")
    }),
    n(document).on("ajaxSuccess", ".js-create-label",
    function(i, r, s, o) {
        this.reset(),
        n(this).nextAll(".table-list").prepend(o),
        t(1),
        e(this, !1)
    }),
    n(document).on("ajaxSuccess", ".js-update-label",
    function(e, t, i, r) {
        n(this).closest(".labels-list-item").replaceWith(r)
    }),
    n(document).on("ajaxSend", ".js-update-label, .js-create-label",
    function() {
        n(this).find(".error").text("")
    }),
    n(document).on("ajaxError", ".js-update-label, .js-create-label",
    function(e, t) {
        return n(this).find(".error").text(t.responseText),
        !1
    }),
    n(document).on("ajaxSuccess", ".js-delete-label",
    function() {
        var i;
        i = t( - 1),
        e(this, 0 === i),
        n(this).closest(".labels-list-item").fadeOut()
    })
}.call(this),
function() {
    var e = require("github/hash-change")["default"];
    e(function(e) {
        var t, n;
        n = e.newURL;
        var i = n.match(/\/issues#issue\/(\d+)$/);
        return i ? (t = i[1], window.location = n.replace(/\/?#issue\/.+/, "/" + t)) : void 0
    }),
    e(function(e) {
        var t, n, i;
        i = e.newURL;
        var r = i.match(/\/issues#issue\/(\d+)\/comment\/(\d+)$/);
        return r ? (n = r[1], t = r[2], window.location = i.replace(/\/?#issue\/.+/, "/" + n + "#issuecomment-" + t)) : void 0
    })
}.call(this),
function() {
    var e, t = require("github/jquery")["default"],
    n = require("github/observe"),
    i = n.observe;
    i(".js-issues-list-check:checked", {
        add: function() {
            return t(this).closest(".js-issue-row").addClass("selected")
        },
        remove: function() {
            return t(this).closest(".js-issue-row").removeClass("selected")
        }
    }),
    t(document).on("navigation:keydown", ".js-issue-row",
    function(t) {
        return "x" === t.hotkey ? (e(this), !1) : void 0
    }),
    t("#js-issues-search").focus(function() {
        return this.value = this.value
    }),
    e = function(e) {
        var n = e.querySelector(".js-issues-list-check");
        n && (n.checked = !n.checked, t(n).trigger("change"))
    }
}.call(this),
function() {
    var e = require("delegated-events"),
    t = e.on,
    n = e.fire,
    i = require("github/text"),
    r = i.insertText;
    t("selectmenu:selected", ".js-saved-reply-container",
    function(e) {
        var t = e.target.querySelector(".js-saved-reply-body"),
        i = t.textContent.trim(),
        s = this.closest(".js-previewable-comment-form"),
        o = s.querySelector(".js-comment-field");
        r(o, i),
        n(o, "change");
        var a = s.querySelector(".js-saved-reply-id");
        a.value = t.getAttribute("data-saved-reply-id")
    })
} (),
function() {
    var e, t, n, i, r, s = require("github/jquery")["default"];
    e = require("github/fetch").fetchText,
    s(document).on("selectmenu:selected", ".js-issue-sidebar-form",
    function(e) {
        var t, i, r, o, a, u, c, l;
        r = e.target,
        l = function(e) {
            return function() {
                return e.matches("form") ? s(e).submit() : n(e)
            }
        } (this);
        var d = r.closest(".js-select-menu");
        if (u = d.hasAttribute("data-multiple"), r.hasAttribute("data-assignee-value") && (a = r.closest(".js-menu-content"), t = a.querySelector(".js-assignee-field"), t.value = r.getAttribute("data-assignee-value"), t.disabled = !1), r.hasAttribute("data-clear-assignees")) {
            for (a = r.closest(".js-menu-content"), c = a.querySelectorAll('input[name="issue[user_assignee_ids][]"]:checked'), i = 0, o = c.length; o > i; i++) t = c[i],
            t.disabled = !1,
            t.checked = !1;
            l()
        }
        if (u) {
            var h = d.getAttribute("data-max-options");
            if (h) {
                var f = Number(h),
                m = d.querySelectorAll('input[type="checkbox"]:checked').length,
                p = m > f;
                d.querySelector(".js-max-warning").classList.toggle("hidden", !p)
            }
            return s(this).off(".deferredSubmit"),
            s(this).one("menu:deactivate.deferredSubmit", l)
        }
        return l()
    }),
    r = function(e, t) {
        var n;
        e.replaceWith.apply(e, s.parseHTML(t)),
        n = document.querySelector(".js-discussion-sidebar-item .js-assignee-field"),
        n && n.value && (n.disabled = !1)
    },
    s(document).on("ajaxSuccess", ".js-discussion-sidebar-item",
    function(e, t, n, i) {
        var s;
        s = e.target.classList,
        s.contains("js-issue-sidebar-form") && r(this, i)
    }),
    s(document).on("click", "div.js-issue-sidebar-form .js-issue-assign-self",
    function(e) {
        var t;
        t = this.closest(".js-issue-sidebar-form"),
        n(t, {
            name: this.name,
            value: this.value
        }),
        e.preventDefault()
    }),
    n = function(t, n) {
        var o;
        o = i(t),
        n && o.push(n),
        o.push({
            name: "authenticity_token",
            value: t.closest("form").elements.authenticity_token.value
        }),
        e(t.getAttribute("data-url"), {
            method: "post",
            body: s.param(o),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(function(e) {
            return r(t.closest(".js-discussion-sidebar-item"), e)
        })
    },
    i = function(e) {
        var n, i, r, o, a, u;
        for (n = e.closest("form"), a = s(n).serializeArray(), u = [], i = 0, r = a.length; r > i; i++) o = a[i],
        s.contains(e, t(n, o)) && u.push(o);
        return u
    },
    t = function(e, t) {
        var n, i, r, s;
        for (s = e.elements, i = 0, r = s.length; r > i; i++) if (n = s[i], n.name === t.name && n.value === t.value) return n
    }
}.call(this),
function() {
    var e, t, n, i, r = require("github/jquery")["default"];
    n = require("github/fetch"),
    e = n.fetchJSON,
    t = n.fetchPoll,
    i = require("github/setimmediate")["default"];
    var s = require("github/select-menu/loading"),
    o = s.setLoadingData;
    r(document).on("change", ".js-issues-list-check",
    function() {
        r("#js-issues-toolbar").toggleClass("triage-mode", r(".js-issues-list-check:checked").length > 0)
    }),
    r(document).on("change", ".js-issues-list-check",
    function() {
        var e = r(".js-issues-list-check:checked"),
        t = document.querySelectorAll("#js-issues-toolbar .js-issues-toolbar-triage .js-select-menu");
        Array.from(t).forEach(function(t) {
            o(t, e),
            t.classList.add("js-load-contents")
        })
    }),
    r(document).on("selectmenu:selected", ".js-issues-toolbar-triage .js-navigation-item",
    function() {
        var e, t, n, s, o, a = this.closest(".js-menu-container").hasAttribute("data-submits-hash");
        e = r(this).closest("form"),
        s = r(this).hasClass("selected"),
        n = r(this).attr("data-name"),
        o = r(this).attr("data-value"),
        t = a ? r("<input>", {
            type: "hidden",
            name: n + "[" + o + "]",
            value: s ? "1": "0"
        }) : r("<input>", {
            type: "hidden",
            name: n,
            value: s ? o: ""
        }),
        i(function(e) {
            return function() {
                return r(e).menu("deactivate")
            }
        } (this)),
        e.find(".js-issues-triage-fields").append(t),
        e.addClass("will-submit")
    }),
    r(document).on("menu:deactivate", ".js-issues-toolbar-triage .js-menu-container",
    function(n) {
        var i, s; (i = this.querySelector("form.will-submit")) && (this.classList.add("is-loading"), s = e(i.getAttribute("action"), {
            method: i.getAttribute("method"),
            body: r.param(r(i).serializeArray()),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }), s.then(function(e) {
            return function(n) {
                var i, s, o;
                return o = t(n.job.url, {
                    headers: {
                        accept: "application/json"
                    }
                }),
                i = function() {
                    return r(e).menu("deactivate"),
                    location.reload()
                },
                s = function() {
                    return e.classList.add("has-error")
                },
                o.then(i, s)
            }
        } (this)), i.classList.remove("will-submit"), n.preventDefault())
    })
}.call(this),
define("github/date-input", ["exports", "./jquery"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e, t) {
        "object" != typeof t && (t = {}),
        r["default"].extend(this, i.DEFAULT_OPTS, t),
        this.input = r["default"](e),
        this.bindMethodsToObj("show", "hide", "hideIfClickOutside", "keydownHandler", "selectDate"),
        this.build(),
        this.selectDate(),
        this.show(),
        this.input.hide(),
        this.input.data("datePicker", this)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = i;
    var r = n(t);
    i.DEFAULT_OPTS = {
        month_names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        short_month_names: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        short_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        start_of_week: 1
    },
    i.prototype = {
        build: function() {
            var e = r["default"]('<p class="month-nav"><span class="date-button prev" title="[Page-Up]">\u25c0</span> <span class="month-name"></span> <span class="date-button next" title="[Page-Down]">\u25b6</span></p>');
            this.monthNameSpan = r["default"](".month-name", e),
            r["default"](".prev", e).click(this.bindToObj(function() {
                this.moveMonthBy( - 1)
            })),
            r["default"](".next", e).click(this.bindToObj(function() {
                this.moveMonthBy(1)
            }));
            var t = r["default"]('<p class="year-nav"><span class="date-button prev" title="[Ctrl+Page-Up]">\u25c0</span> <span class="year-name"></span> <span class="date-button next" title="[Ctrl+Page-Down]">\u25b6</span></p>');
            this.yearNameSpan = r["default"](".year-name", t),
            r["default"](".prev", t).click(this.bindToObj(function() {
                this.moveMonthBy( - 12)
            })),
            r["default"](".next", t).click(this.bindToObj(function() {
                this.moveMonthBy(12)
            }));
            var n = r["default"]("<div></div>").append(e, t),
            i = "<table><thead><tr>";
            r["default"](this.adjustDays(this.short_day_names)).each(function() {
                i += "<th>" + this + "</th>"
            }),
            i += "</tr></thead><tbody></tbody></table>",
            this.dateSelector = this.rootLayers = r["default"]('<div class="date-selector"></div>').append(n, i).insertAfter(this.input),
            this.tbody = r["default"]("tbody", this.dateSelector),
            this.input.change(this.bindToObj(function() {
                this.selectDate()
            })),
            this.selectDate()
        },
        selectMonth: function(e) {
            var t = new Date(e.getFullYear(), e.getMonth(), 1);
            if (!this.currentMonth || this.currentMonth.getFullYear() != t.getFullYear() || this.currentMonth.getMonth() != t.getMonth()) {
                this.currentMonth = t;
                for (var n = this.rangeStart(e), i = this.rangeEnd(e), s = this.daysBetween(n, i), o = "", a = 0; s >= a; a++) {
                    var u = new Date(n.getFullYear(), n.getMonth(), n.getDate() + a, 12, 0);
                    this.isFirstDayOfWeek(u) && (o += "<tr>"),
                    o += u.getMonth() == e.getMonth() ? '<td class="selectable-day" date="' + this.dateToString(u) + '">' + u.getDate() + "</td>": '<td class="unselected-month" date="' + this.dateToString(u) + '">' + u.getDate() + "</td>",
                    this.isLastDayOfWeek(u) && (o += "</tr>")
                }
                this.tbody.empty().append(o),
                this.monthNameSpan.empty().append(this.monthName(e)),
                this.yearNameSpan.empty().append(this.currentMonth.getFullYear()),
                r["default"](".selectable-day", this.tbody).mousedown(this.bindToObj(function(e) {
                    this.changeInput(r["default"](e.target).attr("date"))
                })),
                r["default"]("td[date='" + this.dateToString(new Date) + "']", this.tbody).addClass("today"),
                r["default"]("td.selectable-day", this.tbody).mouseover(function() {
                    r["default"](this).addClass("hover")
                }),
                r["default"]("td.selectable-day", this.tbody).mouseout(function() {
                    r["default"](this).removeClass("hover")
                })
            }
            r["default"](".selected", this.tbody).removeClass("selected"),
            r["default"]('td[date="' + this.selectedDateString + '"]', this.tbody).addClass("selected")
        },
        selectDate: function(e) {
            "undefined" == typeof e && (e = this.stringToDate(this.input.val())),
            e || (e = new Date),
            this.selectedDate = e,
            this.selectedDateString = this.dateToString(this.selectedDate),
            this.selectMonth(this.selectedDate)
        },
        resetDate: function() {
            r["default"](".selected", this.tbody).removeClass("selected"),
            this.changeInput("")
        },
        changeInput: function(e) {
            this.input.val(e).change(),
            this.hide()
        },
        show: function() {
            this.rootLayers.css("display", "block"),
            r["default"]([window, document.body]).click(this.hideIfClickOutside),
            this.input.unbind("focus", this.show),
            this.rootLayers.keydown(this.keydownHandler),
            this.setPosition()
        },
        hide: function() {},
        hideIfClickOutside: function(e) {
            e.target == this.input[0] || this.insideSelector(e) || this.hide()
        },
        insideSelector: function(e) {
            var t = r["default"](e.target);
            return t.parents(".date-selector").length || t.is(".date-selector")
        },
        keydownHandler: function(e) {
            switch (e.keyCode) {
            case 9:
            case 27:
                return void this.hide();
            case 13:
                this.changeInput(this.selectedDateString);
                break;
            case 33:
                this.moveDateMonthBy(e.ctrlKey ? -12 : -1);
                break;
            case 34:
                this.moveDateMonthBy(e.ctrlKey ? 12 : 1);
                break;
            case 38:
                this.moveDateBy( - 7);
                break;
            case 40:
                this.moveDateBy(7);
                break;
            case 37:
                this.moveDateBy( - 1);
                break;
            case 39:
                this.moveDateBy(1);
                break;
            default:
                return
            }
            e.preventDefault()
        },
        stringToDate: function(e) {
            var t = e.match(/^(\d{1,2}) ([^\s]+) (\d{4,4})$/);
            return t ? new Date(t[3], this.shortMonthNum(t[2]), t[1], 12, 0) : null
        },
        dateToString: function(e) {
            return e.getDate() + " " + this.short_month_names[e.getMonth()] + " " + e.getFullYear()
        },
        setPosition: function() {
            var e = this.input.offset();
            this.rootLayers.css({
                top: e.top + this.input.outerHeight(),
                left: e.left
            }),
            this.ieframe && this.ieframe.css({
                width: this.dateSelector.outerWidth(),
                height: this.dateSelector.outerHeight()
            })
        },
        moveDateBy: function(e) {
            var t = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate() + e);
            this.selectDate(t)
        },
        moveDateMonthBy: function(e) {
            var t = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + e, this.selectedDate.getDate());
            t.getMonth() == this.selectedDate.getMonth() + e + 1 && t.setDate(0),
            this.selectDate(t)
        },
        moveMonthBy: function(e) {
            var t = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + e, this.currentMonth.getDate());
            this.selectMonth(t)
        },
        monthName: function(e) {
            return this.month_names[e.getMonth()]
        },
        bindToObj: function(e) {
            var t = this;
            return function() {
                return e.apply(t, arguments)
            }
        },
        bindMethodsToObj: function() {
            for (var e = 0; e < arguments.length; e++) this[arguments[e]] = this.bindToObj(this[arguments[e]])
        },
        indexFor: function(e, t) {
            for (var n = 0; n < e.length; n++) if (t == e[n]) return n
        },
        monthNum: function(e) {
            return this.indexFor(this.month_names, e)
        },
        shortMonthNum: function(e) {
            return this.indexFor(this.short_month_names, e)
        },
        shortDayNum: function(e) {
            return this.indexFor(this.short_day_names, e)
        },
        daysBetween: function(e, t) {
            return e = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()),
            t = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()),
            (t - e) / 864e5
        },
        changeDayTo: function(e, t, n) {
            var i = n * (Math.abs(t.getDay() - e - 7 * n) % 7);
            return new Date(t.getFullYear(), t.getMonth(), t.getDate() + i)
        },
        rangeStart: function(e) {
            return this.changeDayTo(this.start_of_week, new Date(e.getFullYear(), e.getMonth()), -1)
        },
        rangeEnd: function(e) {
            return this.changeDayTo((this.start_of_week - 1) % 7, new Date(e.getFullYear(), e.getMonth() + 1, 0), 1)
        },
        isFirstDayOfWeek: function(e) {
            return e.getDay() == this.start_of_week
        },
        isLastDayOfWeek: function(e) {
            return e.getDay() == (this.start_of_week - 1) % 7
        },
        adjustDays: function(e) {
            for (var t = [], n = 0; n < e.length; n++) t[n] = e[(n + this.start_of_week) % 7];
            return t
        }
    }
}),
function() {
    var e = require("github/jquery")["default"],
    t = require("github/date-input")["default"],
    n = require("github/has-interactions"),
    i = n.hasDirtyFields,
    r = require("github/observe"),
    s = r.observe;
    s("input.js-date-input",
    function() {
        e(this).next(".date-selector").remove(),
        new t(this)
    }),
    e(document).on("click", ".js-date-input-clear",
    function() {
        return e("input.js-date-input").data("datePicker").resetDate(),
        !1
    }),
    e(document).on("change click", ".js-milestone-edit-form",
    function() {
        var e = this.querySelector(".js-milestone-edit-cancel");
        i(this) ? e.setAttribute("data-confirm", e.getAttribute("data-confirm-changes")) : e.removeAttribute("data-confirm")
    })
} (),
function() {
    function e(e) {
        return e.classList.contains("read") ? void 0 : (e.classList.toggle("unread"), e.classList.toggle("read"))
    }
    var t = require("github/jquery")["default"];
    t(document).on("click", ".js-notification-target",
    function(t) {
        t.which > 1 || e(this.closest(".js-notification"))
    }),
    t(document).on("ajaxSuccess", ".js-delete-notification",
    function() {
        e(this.closest(".js-notification"))
    }),
    t(document).on("ajaxSuccess", ".js-mute-notification",
    function() {
        var t;
        e(this.closest(".js-notification")),
        t = this.closest(".js-notification"),
        t.classList.contains("muted") ? this.action = this.action.replace("unmute", "mute") : this.action = this.action.replace("mute", "unmute"),
        t.classList.toggle("muted")
    }),
    t(document).on("ajaxSuccess", ".js-unmute-notification",
    function() {
        var e;
        e = this.closest(".js-notification"),
        e.classList.contains("muted") ? this.action = this.action.replace("unmute", "mute") : this.action = this.action.replace("mute", "unmute"),
        e.classList.toggle("muted")
    }),
    t(document).on("ajaxSuccess", ".js-mark-visible-as-read",
    function() {
        var e, t, n, i, r, s, o;
        for (e = this.closest(".js-notifications-browser"), r = e.querySelectorAll(".unread"), n = 0, i = r.length; i > n; n++) t = r[n],
        t.classList.remove("unread"),
        t.classList.add("read");
        return null != (s = e.querySelector(".js-mark-visible-as-read")) && s.classList.add("mark-all-as-read-confirmed"),
        null != (o = e.querySelector(".js-mark-as-read-confirmation")) ? o.classList.add("mark-all-as-read-confirmed") : void 0
    }),
    t(document).on("ajaxSuccess", ".js-mark-remaining-as-read",
    function() {
        var e, t, n;
        return e = this.closest(".js-notifications-browser"),
        null != (t = e.querySelector(".js-mark-remaining-as-read")) && t.classList.add("hidden"),
        null != (n = e.querySelector(".js-mark-remaining-as-read-confirmation")) ? n.classList.remove("hidden") : void 0
    }),
    t(document).on("navigation:keydown", ".js-notification",
    function(e) {
        switch (e.hotkey) {
        case "I":
        case "e":
        case "y":
            return t(this).find(".js-delete-notification").submit(),
            !1;
        case "M":
        case "m":
            return t(this).find(".js-mute-notification").submit(),
            !1
        }
    }),
    t(document).on("navigation:keyopen", ".js-notification",
    function() {
        e(this)
    }),
    t(document).on("ajaxSend", ".js-notifications-subscription",
    function() {
        this.querySelector(".js-spinner").classList.remove("hidden")
    }),
    t(document).on("ajaxComplete", ".js-notifications-subscription",
    function() {
        this.querySelector(".js-spinner").classList.add("hidden")
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"],
    t = require("github/updatable-content"),
    n = t.replaceContent;
    e(document).on("ajaxSend", ".js-auto-subscribe-toggle",
    function() {
        e(this).find(".js-status-indicator").removeClass("status-indicator-success").removeClass("status-indicator-loading").addClass("status-indicator-loading")
    }),
    e(document).on("ajaxError", ".js-auto-subscribe-toggle",
    function() {
        e(this).find(".js-status-indicator").removeClass("status-indicator-loading").addClass("status-indicator-failed")
    }),
    e(document).on("ajaxSuccess", ".js-auto-subscribe-toggle",
    function() {
        e(this).find(".js-status-indicator").removeClass("status-indicator-loading").addClass("status-indicator-success")
    }),
    e(document).on("ajaxSend", ".js-unignore-form, .js-ignore-form",
    function() {
        e(this).closest(".js-subscription-row").addClass("loading")
    }),
    e(document).on("ajaxError", ".js-unignore-form, .js-ignore-form",
    function() {
        e(this).closest(".js-subscription-row").removeClass("loading"),
        e(this).find(".btn-sm").addClass("btn-danger").attr("title", "There was a problem unignoring this repo.")
    }),
    e(document).on("ajaxSuccess", ".js-unignore-form",
    function() {
        e(this).closest(".js-subscription-row").removeClass("loading").addClass("unsubscribed")
    }),
    e(document).on("ajaxSuccess", ".js-ignore-form",
    function() {
        e(this).closest(".js-subscription-row").removeClass("loading unsubscribed")
    }),
    e(document).on("ajaxSend", ".js-unsubscribe-form, .js-subscribe-form",
    function() {
        e(this).closest(".js-subscription-row").addClass("loading")
    }),
    e(document).on("ajaxError", ".js-unsubscribe-form, .js-subscribe-form",
    function() {
        e(this).closest(".js-subscription-row").removeClass("loading"),
        e(this).find(".btn-sm").addClass("btn-danger").attr("title", "There was a problem with unsubscribing :(")
    }),
    e(document).on("ajaxSuccess", ".js-unsubscribe-form",
    function() {
        e(this).closest(".js-subscription-row").removeClass("loading").addClass("unsubscribed")
    }),
    e(document).on("ajaxSuccess", ".js-subscribe-form",
    function() {
        e(this).closest(".js-subscription-row").removeClass("loading unsubscribed")
    }),
    e(document).on("ajaxSuccess", ".js-thread-subscription-status",
    function(e, t, i, r) {
        n(document.querySelector(".js-thread-subscription-status"), r)
    })
} (),
function() {
    var e, t, n, i, r, s, o = require("github/jquery")["default"];
    t = require("delegated-events").fire,
    r = require("github/observe").observe,
    o(document).on("ajaxSend", ".js-toggler-container .js-set-approval-state",
    function() {
        return this.closest(".js-toggler-container").classList.add("loading")
    }),
    o(document).on("ajaxComplete", ".js-toggler-container .js-set-approval-state",
    function() {
        return this.closest(".js-toggler-container").classList.remove("loading")
    }),
    o(document).on("ajaxSuccess", ".js-toggler-container .js-set-approval-state",
    function() {
        return this.closest(".js-toggler-container").classList.add("on")
    }),
    o(document).on("ajaxSuccess", ".js-request-approval-facebox-form",
    function() {
        var e;
        return e = this.getAttribute("data-container-id"),
        document.getElementById(e).classList.add("on"),
        t(document, "facebox:close")
    }),
    s = function(e) {
        return e.querySelectorAll(".js-integrations-install-repo-picked .js-repository-picker-result").length
    },
    e = function(e) {
        return s(e) > 0
    },
    i = function(e) {
        var t = +e.getAttribute("data-max-repos");
        return t ? s(e) >= t: void 0
    },
    n = function(t) {
        var n;
        return n = t.querySelector(".js-all-repositories-radio"),
        n.checked || e(t)
    },
    r(".js-integrations-install-form",
    function() {
        var e, t, r, s, a, u;
        a = this,
        s = a.querySelector(".js-integrations-install-form-submit"),
        e = a.querySelector(".js-autocomplete"),
        r = e.getAttribute("data-search-url"),
        t = a.querySelector(".js-autocomplete-field"),
        u = function() {
            return s.disabled = !n(this),
            t.disabled = i(this),
            a.querySelector(".flash").classList.toggle("hidden", !i(this))
        },
        this.addEventListener("change", u),
        u.call(this),
        o(document).on("click", ".js-repository-picker-remove",
        function() {
            var e;
            return e = this.closest(".js-repository-picker-result"),
            e.remove(),
            u.call(a)
        }),
        o(document).on("focus", ".js-integrations-install-repo-picker .js-autocomplete-field",
        function() {
            return document.querySelector(".js-select-repositories-radio").checked = !0,
            u.call(a)
        }),
        o(document).on("autocomplete:autocompleted:changed", ".js-integrations-install-repo-picker",
        function() {
            var t, n, i, s, o;
            for (o = r, s = document.querySelectorAll(".js-integrations-install-repo-picked .js-selected-repository-field"), n = 0, i = s.length; i > n; n++) t = s[n],
            o += ~o.indexOf("?") ? "&": "?",
            o += t.name + "=" + encodeURIComponent(t.value);
            return e.setAttribute("data-search-url", o)
        }),
        o(document).on("autocomplete:result", ".js-integrations-install-repo-picker",
        function(e, n) {
            var i, r;
            return r = this.querySelector("#repo-result-" + n),
            i = a.querySelector(".js-integrations-install-repo-picked"),
            r.classList.remove("hidden"),
            i.insertBefore(r, i.firstChild),
            t.value = "",
            a.querySelector(".js-autocomplete-results").innerHTML = "",
            u.call(a)
        }),
        o(document).on("change", ".js-all-repositories-radio",
        function() {
            Array.from(document.querySelectorAll(".js-repository-picker-result")).forEach(function(e) {
                return e.remove()
            })
        }),
        o(document).on("submit", ".js-integrations-install-form",
        function() {
            this.querySelector(".js-all-repositories-radio").checked && Array.from(this.querySelectorAll('input[name="repository_ids[]"]')).forEach(function(e) {
                return e.remove()
            })
        })
    })
}.call(this),
function() {
    var e = require("delegated-events"),
    t = e.on;
    t("submit", ".org form[data-results-container]",
    function(e) {
        e.preventDefault()
    })
} (),
function() {
    var e, t, n = require("github/jquery")["default"],
    i = require("github/visible")["default"];
    t = require("github/fetch").fetchText,
    e = function() {
        return n(Array.from(n(".js-invitation-toggle-team:checked")).filter(i))
    },
    n(document).on("click", ".js-invitations-team-suggestions-view-all",
    function() {
        return t(this.href).then(function(t) {
            return function(i) {
                var r, s;
                return s = e().map(function() {
                    return this.value
                }),
                r = n(t).closest("ul"),
                r.html(i),
                s.each(function() {
                    return r.find(".js-invitation-toggle-team[value=" + this + "]").prop("checked", !0)
                })
            }
        } (this)),
        !1
    })
}.call(this),
define("github/org-sidebar-stats", ["exports", "./number-helpers", "./inflector"],
function(e, t, n) {
    function i(e, i) {
        var s = arguments.length <= 2 || void 0 === arguments[2] ? "+": arguments[2],
        o = e.querySelector("." + i),
        a = o.parentNode.querySelector(".js-stat-label"),
        u = t.parseFormattedNumber(o.textContent),
        c = r(u, s);
        o.textContent = c,
        n.pluralizeNode(c, a)
    }
    function r(e, t) {
        switch (t) {
        case "+":
            return e + 1;
        case "-":
            return e - 1;
        default:
            return e
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.updateStat = i
}),
function() {
    var e, t, n, i, r, s, o = require("github/jquery")["default"],
    a = require("github/sudo")["default"];
    s = require("github/org-sidebar-stats").updateStat,
    r = require("github/setimmediate")["default"],
    e = [],
    t = function() {
        var e, t, n;
        return e = o(".js-person-grid"),
        t = e.find(".js-org-person").has(".js-org-person-toggle:checked"),
        function() {
            var e, i, r;
            for (r = [], e = 0, i = t.length; i > e; e++) n = t[e],
            r.push(o(n).attr("data-id"));
            return r
        } ().sort()
    },
    i = null,
    o(document).on("change", ".js-org-person-toggle",
    function() {
        var n, r, s, a;
        return n = o(".js-org-toolbar"),
        r = n.find(".js-member-selected-actions"),
        s = t(),
        a = s.length > 0,
        JSON.stringify(s) !== JSON.stringify(e) ? (e = s, n.find(".js-org-toolbar-select-all-label").toggleClass("has-selected-members", a), o(".js-member-not-selected-actions").toggleClass("hidden", a), r.toggleClass("hidden", !a), n.addClass("disabled"), null != i && i.abort(), i = o.ajax({
            url: r.attr("data-toolbar-actions-url"),
            data: {
                member_ids: s
            }
        }), i.done(function(e) {
            return r.html(e)
        }), i.always(function() {
            return n.removeClass("disabled")
        })) : void 0
    }),
    o(document).on("click", ".js-member-remove-confirm-button",
    function(e) {
        return e.preventDefault(),
        o.facebox(function() {
            var n;
            return n = o.ajax({
                url: o(e.target).attr("data-url"),
                data: {
                    member_ids: t()
                }
            }),
            n.done(function(e) {
                return o.facebox(e)
            })
        })
    }),
    o(document).on("click", ".js-member-search-filter",
    function() {
        var e, t;
        return t = o(this).attr("data-filter"),
        e = o(".js-member-filter-field"),
        e.val(t + " "),
        e.focus(),
        e.trigger("throttled:input"),
        !1
    }),
    o(document).on("ajaxSend ajaxComplete", ".js-add-team-member-or-repo-form",
    function(e) {
        return this === e.target ? this.classList.toggle("is-sending", "ajaxSend" === e.type) : void 0
    }),
    n = navigator.userAgent.match(/Macintosh/) ? "meta": "ctrl",
    o(document).onFocusedKeydown(".js-add-team-member-or-repo-form .js-autocomplete-field",
    function() {
        return function(e) {
            return "enter" === e.hotkey || e.hotkey === n + "+enter" ? e.preventDefault() : void 0
        }
    }),
    o(document).on("autocomplete:result", ".js-bulk-add-team-form .js-autocomplete-field",
    function(e) {
        var t, n;
        return n = o(this).data("autocompleted"),
        n.indexOf("/") > 0 ? (t = this.form.action, a().then(function() {
            return o.facebox(function() {
                var e;
                return e = o.ajax({
                    url: t,
                    method: "post",
                    data: {
                        member: n
                    }
                }),
                e.done(function(e) {
                    return o.facebox(e)
                })
            })
        }), e.stopPropagation()) : void 0
    }),
    o(document).on("autocomplete:result", ".js-add-team-member-or-repo-form",
    function() {
        return r(function(e) {
            return function() {
                return o(e).submit()
            }
        } (this))
    }),
    o(document).on("ajaxSuccess", ".js-add-team-member-or-repo-form",
    function(e, t) {
        var n, i, r, a, u, c, l, d;
        try {
            d = JSON.parse(t.responseText)
        } catch(h) {}
        d ? (n = o(d.list_item_html), d.stat_count_class && s(document.body, d.stat_count_class, "+")) : n = o(t.responseText),
        i = o(".js-member-list"),
        this.querySelector(".js-autocomplete-field").value = "";
        var f = n.attr("data-login");
        if (f) for (l = i.children(), r = 0, u = l.length; u > r; r++) if (a = l[r], a.getAttribute("data-login") === f) return;
        return i.prepend(n),
        c = !i.children().length,
        i.closest(".js-org-section").toggleClass("is-empty", c),
        i.siblings(".js-subnav").addClass("subnav-bordered")
    }),
    o(document).on("ajaxSuccess", ".js-remove-team-repository",
    function() {
        var e, t, n, i;
        return t = o(this),
        e = t.closest(".js-org-section"),
        n = e.find(".js-org-list"),
        t.closest(".js-org-repo").remove(),
        i = !n.children().length,
        e.toggleClass("is-empty", i),
        i && (n.removeClass("table-list-bordered"), n.siblings(".js-subnav").removeClass("subnav-bordered")),
        s(document.body, "js-repositories-count", "-")
    }),
    o(document).on("ajaxError", ".js-add-team-member-or-repo-form, .js-remove-team-repository",
    function(e, t) {
        var n, i, r;
        if (!/<html/.test(t.responseText)) {
            i = o(".js-member-list").siblings(".js-blankslate");
            try {
                r = JSON.parse(t.responseText),
                n = r.message_html
            } catch(s) {
                n = o(t.responseText)
            }
            return o(".flash-messages").remove(),
            i.before(n),
            !1
        }
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("click", ".js-remove-person-from-org-button",
    function(t) {
        var n;
        return t.preventDefault(),
        n = e(t.target),
        e.facebox(function() {
            var t;
            return t = e.ajax({
                url: n.attr("data-url"),
                data: {
                    member_ids: [n.attr("data-user-id")],
                    redirect_to_path: n.attr("data-redirect-to-path")
                }
            }),
            t.done(function(t) {
                return e.facebox(t)
            })
        })
    })
}.call(this),
function() {
    var e, t, n, i, r, s, o = require("github/jquery")["default"];
    t = require("github/debounce")["default"],
    o(document).on("change", ".js-customize-member-privileges-default-repository-permission-radio",
    function() {
        var e;
        return e = document.querySelector(".js-migrate-ability-list-item-default-repository-permission"),
        e.classList.toggle("migrate-ability-not-possible", n()),
        s()
    }),
    o(document).on("change", ".js-customize-member-privileges-repository-creation-radio",
    function() {
        var e;
        return e = document.querySelector(".js-migrate-ability-list-item-members-can-create-repositories"),
        e.classList.toggle("migrate-ability-not-possible", i()),
        s()
    }),
    o(document).on("change", ".js-customize-member-privileges-team-privacy-radio",
    function() {
        var e;
        return e = document.querySelector(".js-migrate-ability-list-item-team-privacy"),
        e.classList.toggle("migrate-ability-not-possible", r()),
        s()
    }),
    s = function() {
        var t;
        return t = document.querySelector(".js-save-member-privileges-button-container"),
        t.classList.toggle("member-privilege-radios-preserved", e())
    },
    n = function() {
        return "" === document.querySelector(".js-customize-member-privileges-default-repository-permission-radio:checked").value
    },
    i = function() {
        return "0" === document.querySelector(".js-customize-member-privileges-repository-creation-radio:checked").value
    },
    r = function() {
        return "secret" === document.querySelector(".js-customize-member-privileges-team-privacy-radio:checked").value
    },
    e = function() {
        return n() && i() && r()
    },
    o(function() {
        var e, n, i, r, o, a, u, c, l;
        return a = document.querySelector(".js-org-migration-settings-sidebar"),
        null != a ? (u = a.getBoundingClientRect(), c = 16, l = u.top + window.pageYOffset - c, n = a.style.position, i = a.style.top, e = a.style.left, r = a.style.width, o = t(function() {
            var t, s;
            return t = a.parentNode.getBoundingClientRect(),
            s = t.right - u.width,
            window.pageYOffset >= l ? (a.style.position = "fixed", a.style.top = c + "px", a.style.left = s + "px", a.style.width = "250px") : (a.style.position = n, a.style.top = i, a.style.left = e, a.style.width = r)
        },
        5), window.addEventListener("scroll", o, {
            passive: !0
        }), window.addEventListener("resize", o, {
            passive: !0
        }), s()) : void 0
    })
}.call(this),
function() {
    var e, t, n, i = require("github/jquery")["default"];
    e = require("github/fetch").fetchText,
    t = require("github/observe").observe,
    t(".js-rename-owners-team-input",
    function() {
        i(this).on("throttled:input",
        function() {
            var t, i, r, s;
            return t = this.form,
            i = this.value.trim().toLowerCase(),
            "owners" === i || "" === i ? n(!1, "") : (t.classList.add("is-sending"), s = new URL(this.getAttribute("data-check-url"), window.location.origin), r = new URLSearchParams(s.search.slice(1)), r.append("name", i), s.search = r.toString(), e(s.toString()).then(function(e) {
                var i;
                return e = e.trim(),
                i = "" === e,
                t.classList.remove("is-sending"),
                n(i, e)
            }))
        })
    }),
    n = function(e, t) {
        return document.querySelector(".js-rename-owners-team-button").classList.toggle("disabled", !e),
        document.querySelector(".js-rename-owners-team-errors").innerHTML = t,
        document.querySelector(".js-rename-owners-team-note").classList.toggle("hidden", "" !== t)
    }
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).onFocusedInput(".js-new-organization-name",
    function() {
        var e;
        return (e = this.closest("dd").querySelector(".js-field-hint-name")) ?
        function() {
            return "innerText" in e ? e.innerText = this.value: e.textContent = this.value
        }: void 0
    }),
    e(document).on("ajaxSend", ".js-org-list-item .js-org-remove-item",
    function() {
        return this.closest(".js-org-list-item").classList.add("hidden")
    }),
    e(document).on("ajaxSuccess", ".js-org-list-item .js-org-remove-item",
    function() {
        return this.closest(".js-org-list-item").remove()
    }),
    e(document).on("ajaxError", ".js-org-list-item .js-org-remove-item",
    function() {
        this.closest(".js-org-list-item").classList.remove("hidden");
        var e = this.getAttribute("data-error-message");
        return e ? alert(e) : void 0
    })
}.call(this),
function() {
    var e, t, n = require("github/jquery")["default"];
    n(document).on("click", ".js-org-billing-plans .js-choose-plan",
    function() {
        return e(n(this).closest(".js-plan-row")),
        !1
    }),
    e = function(e) {
        var i, r, s, o;
        return s = e.attr("data-name"),
        r = parseInt(e.attr("data-cost"), 10),
        i = parseInt(null != (o = e.attr("data-balance")) ? o: "0", 10),
        n(".js-org-billing-plans").find(".js-plan-row, .js-choose-plan").removeClass("selected"),
        e.find(".js-choose-plan").addClass("selected"),
        e.addClass("selected"),
        n(".js-plan").val(s),
        0 === r && 0 === i ? n(".js-billing-section").addClass("has-removed-contents") : (n(".js-billing-section").removeClass("has-removed-contents"), null != e.attr("data-balance") ? t(s) : void 0)
    },
    t = function(e) {
        return n(".js-plan-change-message").addClass("is-hidden"),
        n('.js-plan-change-message[data-name="' + e + '"]').removeClass("is-hidden")
    },
    n(function() {
        return n(".selected .js-choose-plan").click()
    })
}.call(this),
function() {
    var e, t = require("github/jquery")["default"];
    e = function(e) {
        var n, i, r, s;
        i = e.selectors;
        for (r in i) s = i[r],
        t(r).text(s);
        return n = 100 === e.filled_seats_percent,
        t(".js-live-update-seats-percent").css("width", e.filled_seats_percent + "%"),
        t(".js-need-more-seats").toggleClass("hidden", !n),
        t(".js-add-team-member-or-repo-form").toggleClass("hidden", n)
    },
    t(document).on("ajaxSuccess", ".js-per-seat-invite-field, .js-per-seat-invite .js-org-remove-item",
    function(t, n) {
        return e(JSON.parse(n.responseText))
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"],
    t = require("delegated-events"),
    n = t.on,
    i = require("github/fetch"),
    r = i.fetchText,
    s = require("github/hotkey")["default"],
    o = require("github/observe"),
    a = o.observe;
    n("click", ".js-repo-search-filter",
    function() {
        var t = this.getAttribute("data-filter"),
        n = this.getAttribute("data-negate"),
        i = document.querySelector(".js-repo-filter-field"),
        r = i.value;
        if (r.indexOf(n) > -1 && (r = r.replace(n, ""), r = r.replace(/^\s*/, "")), -1 === r.indexOf(t)) {
            var s = r && r.match(/\s$/) ? "": " ";
            i.value = "" + r + s + t + " ",
            i.focus(),
            e(i).trigger("throttled:input")
        }
        document.body.classList.remove("menu-active")
    }),
    a(".js-repository-fallback-search",
    function() {
        this.addEventListener("keypress",
        function(e) {
            if ("enter" === s(e)) {
                var t = new URL(this.getAttribute("data-url"), window.location.origin),
                n = new URLSearchParams(t.search.slice(1)),
                i = n.get("q") || "";
                n.set("q", i + " " + this.value),
                t.search = n.toString(),
                window.location = t.toString()
            }
        })
    }),
    n("click", ".js-team-repo-higher-access",
    function() {
        var t = this.getAttribute("data-url");
        e.facebox(function() {
            r(t).then(e.facebox)
        })
    })
} (),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("selectmenu:selected", ".js-select-repo-permission",
    function() {
        return e(this).submit()
    }),
    e(document).on("ajaxSend", ".js-select-repo-permission",
    function() {
        return this.classList.remove("was-successful")
    }),
    e(document).on("ajaxSuccess", ".js-select-repo-permission",
    function(e, t, n, i) {
        var r;
        return this.classList.add("was-successful"),
        null != (r = this.closest(".js-org-repo")) ? r.classList.toggle("with-higher-access", i.members_with_higher_access) : void 0
    })
} (),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("click", ".js-change-default-repository-permission-confirm",
    function(t) {
        t.preventDefault(),
        e(document).find(".js-change-default-repository-permission-form").submit()
    })
} (),
function() {
    var e = require("github/jquery")["default"],
    t = require("github/sudo")["default"];
    e(document).on("autocomplete:autocompleted:changed", ".js-team-add-user-name",
    function() {
        var t;
        return t = e(".js-team-add-user-button")[0],
        t.disabled = !e(this).data("autocompleted")
    }),
    e(document).on("click", ".js-team-remove-user",
    function(t) {
        var n;
        t.preventDefault(),
        e(".js-team-add-user-form").removeClass("hidden"),
        e(".js-team-add-user-name").focus(),
        n = e(this).closest("li").remove(),
        n.attr("data-login")
    }),
    e(document).on("click", ".js-team-add-user-button",
    function(n) {
        var i, r, s, o, a, u;
        if (n.preventDefault(), r = e(".js-team-add-user-name"), u = r.val(), u && r.data("autocompleted")) {
            for (r.val(""), a = e(".js-team-user-logins li"), i = 0, s = a.length; s > i; i++) if (o = a[i], e(o).attr("data-login") === u) return;
            return t().then(function() {
                return e.ajax({
                    url: e(".js-team-add-user-form").attr("data-template-url"),
                    data: {
                        member: u
                    },
                    success: function(t) {
                        return e(".js-team-user-logins").append(t),
                        e(".js-login-field").prop("disabled", !1),
                        e(".js-team-add-user-form").addClass("hidden")
                    }
                }),
                e(".js-team-add-user-name").focus()
            })
        }
    })
}.call(this),
function() {
    var e;
    e = require("github/observe").observe;
    var t = require("github/jquery")["default"];
    t(document).on("ajaxSend", ".js-ldap-import-groups-container",
    function(e, t) {
        return t.setRequestHeader("X-Context", "import")
    }),
    t(document).on("autocomplete:autocompleted:changed", ".js-team-ldap-group-field",
    function() {
        var e; (e = this.closest(".js-ldap-group-adder")) && (e.classList.remove("is-exists"), e.querySelector(".js-ldap-group-adder-button").disabled = !t(this).data("autocompleted"))
    }),
    t(document).on("navigation:open", ".js-team-ldap-group-autocomplete-results .js-navigation-item",
    function() {
        var e, n;
        return e = t(this).closest(".js-ldap-group-adder"),
        n = t(this).attr("data-dn"),
        e.find(".js-team-ldap-dn-field").val(n),
        t(this).closest(".js-ldap-import-groups-container").find(".js-ldap-group-dn").map(function(i, r) {
            t(r).text() === n && (e.addClass("is-exists"), e[0].querySelector(".js-ldap-group-adder-button").disabled = !0)
        })
    }),
    t(document).on("ajaxSend", ".js-import-container",
    function() {
        this.classList.add("is-importing"),
        this.querySelector(".js-ldap-group-adder-button").disabled = !0
    }),
    t(document).on("ajaxComplete", ".js-import-container",
    function() {
        return t(this).removeClass("is-importing")
    }),
    t(document).on("ajaxSuccess", ".js-ldap-group-adder",
    function(e, n, i, r) {
        return t(this).closest(".js-ldap-import-groups-container").removeClass("is-empty").find(".js-ldap-imported-groups").prepend(t(r)),
        this.reset(),
        t(this).find(".js-team-ldap-group-field").focus(),
        this.querySelector(".js-ldap-group-adder-button").disabled = !0,
        t(".js-import-form-actions").removeClass("hidden")
    }),
    t(document).on("submit", ".js-team-remove-group",
    function() {
        this.closest(".js-team").classList.add("is-removing"),
        document.querySelector(".js-team-ldap-group-field").focus()
    }),
    t(document).on("ajaxSuccess", ".js-team-remove-group",
    function() {
        this.closest(".js-team").remove(),
        document.querySelector(".js-team:not(.is-removing)") || (document.querySelector(".js-ldap-import-groups-container").classList.add("is-empty"), document.querySelector(".js-import-form-actions").classList.add("hidden"))
    }),
    t(document).on("ajaxError", ".js-team-remove-group",
    function() {
        this.closest(".js-team").classList.remove("is-removing")
    }),
    t(document).on("click", ".js-edit-team",
    function(e) {
        return t(this).closest(".js-team").hasClass("is-removing") ? !1 : (e.preventDefault(), t(this).closest(".js-team").addClass("is-editing"), t(this).closest(".js-team").find(".js-team-name-field").focus())
    }),
    t(document).on("click", ".js-save-button",
    function() {
        return t(this).hasClass("disabled") ? !1 : t(this).closest(".js-team").addClass("is-sending")
    }),
    t(document).on("click", ".js-cancel-team-edit",
    function(e) {
        var n, i;
        return e.preventDefault(),
        i = t(this).closest(".js-team").removeClass("is-editing"),
        n = i.find(".js-team-form").removeClass("is-exists"),
        n.find(".js-slug").text(n.find(".js-slug").attr("data-original-slug")),
        n[0].reset()
    }),
    t(document).on("ajaxSuccess", ".js-team-form:not(.is-checking)",
    function(e, n, i, r) {
        return n.nameCheck ? void 0 : t(this).closest(".js-team").removeClass("is-editing").replaceWith(t(r))
    }),
    t(document).on("ajaxSuccess", ".js-team-form.is-checking",
    function(e, n, i, r) {
        var s, o;
        return s = t(this).removeClass("is-checking"),
        "function" == typeof(o = s.find(".js-team-name-field")).removeData && o.removeData("autocheck-xhr"),
        r.error ? (s.find(".js-save-button").addClass("disabled"), "exists" === r.error ? (s.addClass("is-exists"), s.find(".js-slug").html(r.slug)) : void 0) : (s.find(".js-slug").html(r.slug), s.find(".js-save-button").removeClass("disabled"))
    }),
    t(document).on("ajaxError", ".js-team-form",
    function(e, t) {
        return t.nameCheck && "abort" === t.statusText ? !1 : void 0
    }),
    e(".js-team-name-field",
    function() {
        t(this).on("throttled:input",
        function() {
            var e, n, i, r;
            return n = t(this),
            e = n.closest(".js-team-form"),
            null != (i = n.data("autocheck-xhr")) && i.abort(),
            e.removeClass("is-exists").addClass("is-checking"),
            e.find(".js-save-button").addClass("disabled"),
            r = t.ajax({
                url: n.attr("data-check-url"),
                type: "GET",
                context: this,
                data: {
                    name: this.value
                }
            }),
            r.nameCheck = !0,
            n.data("autocheck-xhr", r)
        })
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("click", ".js-show-own-teams",
    function() {
        var t, n, i, r;
        return t = e(".js-team-search-field"),
        r = t.val(),
        i = e(this).attr("data-me"),
        -1 === r.indexOf("@" + i) && (n = r ? " ": "", t.val("" + r + n + "@" + i), t.focus(), t.trigger("throttled:input")),
        !1
    })
}.call(this),
function() {
    var e, t, n, i = require("github/jquery")["default"];
    t = require("github/fetch").fetchText,
    n = require("github/observe").observe,
    e = function(e) {
        var n, i, r, s;
        r = e.value.trim(),
        n = e.form,
        n.classList.add("is-sending"),
        n.classList.remove("is-name-check-fail"),
        n.classList.remove("is-name-check-success"),
        s = new URL(e.getAttribute("data-check-url"), window.location.origin),
        i = new URLSearchParams(s.search.slice(1)),
        i.append("name", r),
        s.search = i.toString(),
        t(s.toString()).then(function(t) {
            var i, s, o, a, u;
            return n.classList.remove("is-sending"),
            n.querySelector(".js-team-name-errors").innerHTML = t || "",
            o = null != (a = e.getAttribute("data-original")) ? a.trim() : void 0,
            s = o && r === o,
            i = !!n.querySelector(".js-error"),
            u = (i || !r) && !s,
            n.querySelector(".js-create-team-button").disabled = u,
            n.classList.toggle("is-name-check-fail", i),
            n.classList.toggle("is-name-check-success", !i && r)
        })
    },
    n(".js-new-team",
    function() {
        i(this).on("throttled:input",
        function() {
            return e(this)
        })
    }),
    n(".js-new-org-team",
    function() {
        var t;
        t = this.querySelector(".js-new-team"),
        t.value && e(t)
    })
}.call(this),
function() {
    var e, t, n, i = require("github/jquery")["default"],
    r = require("github/sudo")["default"];
    e = require("github/fetch").fetch,
    n = require("github/org-sidebar-stats").updateStat,
    t = require("delegated-events").fire,
    i(document).on("submit", ".js-remove-team-members-form",
    function() {
        return r().then(function(t) {
            return function() {
                var r;
                return r = i(t),
                e(r.attr("action"), {
                    method: "post",
                    body: r.serialize(),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                }).then(function() {
                    var e;
                    return e = r.closest(".js-org-section"),
                    r.closest(".js-edit-team-member").remove(),
                    e.toggleClass("is-empty", !e.find(".js-org-list").children().length),
                    n(document.body, "js-members-count", "-")
                })
            }
        } (this)),
        !1
    }),
    i(document).on("click", ".js-team-description-toggle",
    function() {
        return i(".js-description-toggler").toggleClass("on")
    }),
    i(document).on("ajaxComplete", ".js-team-description-form",
    function() {
        var e;
        return e = i(".js-team-description-field").val(),
        i(".js-description-toggler").toggleClass("on"),
        e.trim() ? i(".js-team-description .description").text(e) : i(".js-team-description .description").html("<span class='link'>This team has no description</span>")
    }),
    i(document).on("ajaxSuccess", ".js-add-team-members-form",
    function(e, n) {
        var r;
        return r = i(document).find(".js-member-listings-container"),
        t(document, "facebox:close"),
        r.html(n.responseText)
    }),
    i(document).on("click", ".js-rename-owners-team-next-btn",
    function() {
        return document.querySelector(".js-rename-owners-team-about-content").classList.toggle("migrate-owners-content-hidden"),
        document.querySelector(".js-rename-owners-team-rename-form").classList.toggle("migrate-owners-content-hidden")
    })
}.call(this),
function() {
    var e = require("github/observe"),
    t = e.observe;
    t(".js-org-transform-poller",
    function() {
        var e;
        e = this.getAttribute("data-redirect-url"),
        this.addEventListener("load",
        function() {
            return window.location.href = e
        })
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(function() {
        var t;
        return e("#load-readme").click(function() {
            var n, i, r, s, o, a;
            return i = e("#gollum-editor-body"),
            n = e("#editor-body-buffer"),
            s = e("#undo-load-readme"),
            a = n.text(),
            t(i, n),
            r = e(this),
            r.prop("disabled", !0),
            r.text(r.attr("data-readme-name") + " loaded"),
            s.show(),
            o = function() {
                return e(this).val() !== a && s.hide(),
                i.off("change keyup", o)
            },
            i.on("change keyup", o),
            !1
        }),
        e("#undo-load-readme").click(function() {
            var n;
            return t(e("#gollum-editor-body"), e("#editor-body-buffer")),
            n = e("#load-readme"),
            n.prop("disabled", !1),
            n.text("Load " + n.attr("data-readme-name")),
            e(this).hide(),
            !1
        }),
        t = function(t, n) {
            var i, r, s;
            return i = e(t),
            r = e(n),
            s = i.val(),
            i.val(r.text()),
            r.text(s)
        }
    })
}.call(this),
function() {
    function e(e, t) {
        var n = e.querySelector("table.timeline-commits > tbody"),
        i = t.querySelectorAll("table.timeline-commits > tbody > tr.commit");
        Array.from(i).forEach(function(e) {
            n.appendChild(e)
        }),
        t.remove()
    }
    var t = require("github/observe"),
    n = t.observe,
    i = ".discussion-item.discussion-commits + .discussion-item.discussion-commits";
    n(".discussion-item.discussion-commits", {
        add: function() {
            var t = document.querySelectorAll(i);
            Array.from(t).forEach(function(t) {
                t.querySelector(".discussion-item-header") || e(t.previousElementSibling, t)
            })
        }
    })
} (),
function() {
    var e = require("github/jquery")["default"],
    t = require("github/perform-transition")["default"];
    e(document).on("click", ".js-merge-branch-action",
    function(n) {
        var i, r;
        r = e(this),
        i = r.closest(".js-merge-pr"),
        r.fire("details:toggle", {
            relatedTarget: n.target
        },
        function() {}),
        t(i[0],
        function() {
            i.toggleClass("open"),
            i.fire("details:toggled", {
                relatedTarget: n.target,
                async: !0
            })
        }),
        n.preventDefault()
    })
} (),
function() {
    var e = require("github/jquery")["default"],
    t = require("github/visible")["default"],
    n = require("github/updatable-content"),
    i = n.replaceContent;
    e(document).on("details:toggled", ".js-pull-merging",
    function() {
        var n;
        n = e(this).find(".js-merge-pull-request"),
        n.toggleClass("is-dirty", Array.from(n).some(t))
    }),
    e(document).on("ajaxSuccess", ".js-merge-pull-request",
    function(t, n, r, s) {
        var o, a, u;
        this.reset(),
        e(this).removeClass("is-dirty"),
        a = s.updateContent;
        for (u in a) {
            o = a[u];
            var c = document.querySelector(u);
            c && i(c, o)
        }
    }),
    e(document).on("session:resume",
    function(t) {
        var n = document.getElementById(t.targetId);
        if (n) {
            var i = e(n).closest(".js-merge-pull-request");
            i.closest(".js-details-container").addClass("open")
        }
    }),
    e(document).on("change", ".js-merge-method",
    function() {
        var e;
        e = this.closest(".js-merge-methods"),
        e.classList.toggle("is-squashing", "merge" !== this.value)
    }),
    e(document).on("change", ".js-merge-button-toggle",
    function() {
        var e, t, n, i, r, s;
        for (i = this.closest(".js-merge-pr"), r = !this.checked, s = i.querySelectorAll(".js-merge-commit-button"), t = 0, n = s.length; n > t; t++) e = s[t],
        e.disabled = r
    }),
    e(document).on("navigation:open", ".js-merge-method-menu .js-navigation-item",
    function() {
        var e = this.closest(".js-commit-form"),
        t = e.querySelector(".js-merge-title"),
        n = e.querySelector(".js-merge-message");
        t.defaultValue == t.value && (t.defaultValue = this.getAttribute("data-input-title-value")),
        n.defaultValue == n.value && (n.defaultValue = this.getAttribute("data-input-message-value"))
    })
}.call(this),
function() {
    var e, t = require("github/jquery")["default"];
    e = require("github/fetch").fetchText,
    t(document).on("ajaxError", ".js-handle-pull-merging-errors",
    function(e, n) {
        var i, r, s;
        return i = this.closest(".js-pull-merging"),
        i.classList.add("is-error"),
        422 === n.status && (s = n.responseText) && (r = i.querySelector(".js-pull-merging-error"), t(r).replaceWith(s)),
        !1
    }),
    t(document).on("click", ".js-pull-merging-refresh",
    function() {
        var n, i;
        return n = this.closest(".js-pull-merging"),
        i = n.getAttribute("data-url"),
        e(i).then(function(e) {
            return t(n).replaceWith(e)
        }),
        !1
    })
}.call(this),
function() {
    function e() {
        n(".pull-request-ref-restore").removeClass("last").last().addClass("last")
    }
    function t() {
        var e = n("#js-pull-restorable").length;
        n(".js-pull-discussion-timeline").toggleClass("is-pull-restorable", e)
    }
    var n = require("github/jquery")["default"],
    i = require("github/observe"),
    r = i.observe;
    r(".pull-request-ref-restore", {
        add: e,
        remove: e
    }),
    r("#js-pull-restorable", {
        add: t,
        remove: t
    })
} (),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("pjax:end",
    function() {
        e(".js-pull-refresh-on-pjax").trigger("socket:message")
    })
} (),
function() {
    var e, t, n, i, r, s, o, a, u, c, l = require("github/jquery")["default"];
    t = require("github/fetch").fetchJSON,
    s = require("github/history").replaceState,
    n = require("github/observe").observe,
    i = require("github/pjax"),
    l(document).on("click", ".js-timeline-tags-expander",
    function() {
        return l(this).closest(".js-timeline-tags").removeClass("is-collapsed")
    }),
    o = ["is-default", "is-saving", "is-saved", "is-failed"],
    a = function(e, t) {
        var n;
        return (n = e.classList).remove.apply(n, o),
        e.classList.add(t),
        e.disabled = "is-saving" === t
    },
    l(document).on("click", ".js-save-draft",
    function() {
        var e, n, i, r;
        return e = this,
        r = e.closest("form"),
        r.querySelector("#release_draft").value = "1",
        n = function(t) {
            return a(e, "is-saved"),
            setTimeout(function() {
                return a(e, "is-default")
            },
            5e3),
            r.dispatchEvent(new CustomEvent("release:saved", {
                bubbles: !0,
                cancelable: !1,
                detail: {
                    release: t
                }
            }))
        },
        i = function() {
            return a(e, "is-failed")
        },
        t(r.action, {
            method: r.method,
            body: l(r).serialize(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(n, i),
        a(e, "is-saving"),
        !1
    }),
    l(document).on("release:saved", ".js-release-form",
    function(e) {
        var t, n, o, a, u, c;
        o = e.originalEvent.detail.release,
        n = this,
        u = n.getAttribute("data-repo-url"),
        c = r("tag", u, o.tag_name),
        t = r("edit", u, o.tag_name),
        n.setAttribute("action", c),
        s(i.getState(), document.title, t);
        var d = document.querySelector("#delete_release_confirm form");
        return d && d.setAttribute("action", c),
        a = n.querySelector("#release_id"),
        a.value ? void 0 : (a.value = o.id, l(n).append('<input type="hidden" name="_method" value="put">'))
    }),
    l(document).on("click", ".js-publish-release",
    function() {
        return l("#release_draft").val("0")
    }),
    c = ["is-loading", "is-empty", "is-valid", "is-invalid", "is-duplicate", "is-pending"],
    u = function(e) {
        var t;
        switch (e) {
        case "is-valid":
            l(".release-target-wrapper").addClass("hidden");
            break;
        case "is-loading":
            break;
        default:
            l(".release-target-wrapper").removeClass("hidden")
        }
        return t = l(".js-release-tag"),
        t.removeClass(c.join(" ")),
        t.addClass(e)
    },
    e = function(e) {
        return e.val() && e.val() !== e.data("last-checked") ? (u("is-loading"), l.ajax({
            url: e.attr("data-url"),
            type: "GET",
            data: {
                tag_name: e.val()
            },
            dataType: "json",
            success: function(t) {
                return "duplicate" === t.status && parseInt(e.attr("data-existing-id")) === parseInt(t.release_id) ? void u("is-valid") : (l(".js-release-tag .js-edit-release-link").attr("href", t.url), u("is-" + t.status))
            },
            error: function() {
                return u("is-invalid")
            },
            complete: function() {
                return e.data("last-checked", e.val())
            }
        })) : void 0
    },
    r = function(e, t, n) {
        return t + "/releases/" + e + "/" + n
    },
    l(document).on("blur", ".js-release-tag-field",
    function() {
        return e(l(this))
    }),
    n(".js-release-tag-field",
    function() {
        e(l(this))
    }),
    l(document).on("change", ".js-release-tag",
    function() {
        var e, t, n, i, r, s, o, a, u;
        if (n = l(this), e = n.closest("form"), t = e.find(".js-previewable-comment-form"), t.length) {
            for (i = t.data("base-preview-url"), i || (i = t.attr("data-preview-url"), i += i.indexOf("?") >= 0 ? "&": "?", t.data("base-preview-url", i)), r = [], u = n.find('input[name="release[tag_name]"], input[name="release[target_commitish]"]:checked'), s = 0, a = u.length; a > s; s++) o = u[s],
            o.value && r.push({
                name: o.name,
                value: o.value
            });
            return t.attr("data-preview-url", i + l.param(r))
        }
    }),
    n(".js-release-form .js-previewable-comment-form",
    function() {
        l(this).closest("form").find(".js-release-tag").trigger("change")
    })
}.call(this),
function() {
    document.addEventListener("facebox:reveal",
    function() {
        var e;
        e = document.querySelector("#facebox .js-fork-select-fragment"),
        e && e.setAttribute("src", e.getAttribute("data-url"))
    })
}.call(this),
function() {
    var e, t = require("github/jquery")["default"];
    e = require("github/pjax"),
    t(document).on("change", ".js-pulse-period",
    function(n) {
        var i;
        return i = t(n.target).attr("data-url"),
        e["default"]({
            url: i,
            container: "#js-repo-pjax-container"
        })
    })
}.call(this),
function() {
    function e(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }
    var t, n, i = require("github/jquery")["default"];
    n = require("delegated-events"),
    t = function() {
        function t() {
            this.validate = e(this.validate, this),
            this.updateUpsell = e(this.updateUpsell, this),
            this.selectedPrivacyToggleElement = e(this.selectedPrivacyToggleElement, this),
            this.handlePrivacyChange = e(this.handlePrivacyChange, this),
            this.handleOwnerChange = e(this.handleOwnerChange, this),
            this.elements = {
                $ownerContainer: i(".js-owner-container"),
                $iconPreviewPublic: i(".js-icon-preview-public"),
                $iconPreviewPrivate: i(".js-icon-preview-private"),
                $upgradeUpsell: i("#js-upgrade-container").hide(),
                $upgradeConfirmationCheckbox: i(".js-confirm-upgrade"),
                $upsells: i(".js-upgrade"),
                $privacyToggles: i(".js-privacy-toggle"),
                $privateRadio: i(".js-privacy-toggle[value=false]"),
                $publicRadio: i(".js-privacy-toggle[value=true]"),
                $repoNameField: i("input[type=text].js-repo-name"),
                $form: i("#new_repository"),
                $licenseContainer: i(".js-license-container"),
                $suggestion: i(".js-reponame-suggestion")
            },
            this.current_login = i("input[name=owner]:checked").prop("value"),
            this.privateRepo = !1,
            this.changedPrivacyManually = !1,
            this.elements.$ownerContainer.on("change", "input[type=radio]", this.handleOwnerChange),
            this.elements.$privacyToggles.on("change",
            function(e) {
                return function(t) {
                    return e.handlePrivacyChange(t.targetElement, t)
                }
            } (this)),
            this.elements.$upgradeUpsell.on("change input", "input", this.validate),
            this.elements.$form.on("repoform:validate", this.validate),
            this.elements.$suggestion.on("click",
            function(e) {
                return function(t) {
                    var n;
                    return n = e.elements.$repoNameField,
                    n.val(i(t.target).text()),
                    n.trigger("change")
                }
            } (this)),
            this.handleOwnerChange(),
            this.validate()
        }
        return t.prototype.handleOwnerChange = function() {
            var e;
            return this.current_login = i("input[name=owner]:checked").prop("value"),
            this.elements.$repoNameField.trigger("change"),
            e = this.elements.$ownerContainer.find(".select-menu-item.selected"),
            this.changedPrivacyManually || ("private" === e.attr("data-default") ? this.elements.$privateRadio.prop("checked", "checked").change() : this.elements.$publicRadio.prop("checked", "checked").change()),
            "yes" === e.attr("data-permission") ? (i(".with-permission-fields").show(), i(".without-permission-fields").hide(), i(".errored").show(), i("dl.warn").show()) : (i(".with-permission-fields").hide(), i(".without-permission-fields").show(), i(".errored").hide(), i("dl.warn").hide()),
            this.updateUpsell(),
            this.handlePrivacyChange()
        },
        t.prototype.handlePrivacyChange = function(e, t) {
            var n;
            return null == e && (e = this.selectedPrivacyToggleElement()),
            null == t && (t = null),
            t && !t.isTrigger && (this.changedPrivacyManually = !0),
            n = this.elements.$upgradeUpsell.find(".js-billing-section"),
            "false" === e.val() ? (this.privateRepo = !0, this.elements.$upgradeUpsell.show(), n.removeClass("has-removed-contents"), this.elements.$upgradeUpsell.find("input[type=checkbox]").prop("checked", "checked"), this.elements.$iconPreviewPublic.hide(), this.elements.$iconPreviewPrivate.show()) : (this.privateRepo = !1, this.elements.$upgradeUpsell.hide(), n.addClass("has-removed-contents"), this.elements.$upgradeUpsell.find("input[type=checkbox]").prop("checked", null), this.elements.$form.attr("action", this.elements.$form.attr("data-url")), this.elements.$iconPreviewPrivate.hide(), this.elements.$iconPreviewPublic.show()),
            this.validate()
        },
        t.prototype.selectedPrivacyToggleElement = function() {
            return this.elements.$privateRadio.is(":checked") ? this.elements.$privateRadio: this.elements.$publicRadio
        },
        t.prototype.updateUpsell = function() {
            var e;
            return e = this.elements.$upsells.filter("[data-login=" + this.current_login + "]"),
            this.elements.$upgradeUpsell.html(e)
        },
        t.prototype.validate = function() {
            var e, t;
            return t = !0,
            this.elements.$repoNameField.is(".is-autocheck-successful") || (t = !1),
            e = this.elements.$upgradeUpsell.find("input[type=checkbox]"),
            this.privateRepo && e.length && !e.is(":checked") && (t = !1),
            this.elements.$form.find("button.primary").prop("disabled", !t)
        },
        t
    } (),
    i(function() {
        return i(".page-new-repo").length ? new t: void 0
    }),
    n.on("autocheck:send", "#repository_name",
    function(e) {
        var t, n, r;
        n = e.detail,
        t = i(this),
        r = t.closest("form").find("input[name=owner]:checked").val(),
        n.owner = r,
        t.trigger("repoform:validate")
    }),
    n.on("autocheck:complete", "#repository_name",
    function() {
        return i(this).trigger("repoform:validate")
    }),
    n.on("autocheck:success", "#repository_name",
    function(e) {
        var t, n, i, r = null != (n = e.detail) ? n.trim() : void 0;
        r && (t = this.closest("dl.form-group"), t.classList.add("warn"), i = document.createElement("dd"), i.classList.add("warning"), i.innerHTML = r, t.append(i))
    })
} (),
function() {
    var e = require("github/jquery")["default"];
    document.addEventListener("pjax:end",
    function() {
        var t, n, i, r, s, o, a, u, c, l, d;
        if (d = e(document.head).find("meta[name='selected-link']").attr("value"), null != d) for (i = e(".js-sidenav-container-pjax .js-selected-navigation-item").removeClass("selected"), t = 0, s = i.length; s > t; t++) for (n = i[t], u = null != (c = e(n).attr("data-selected-links")) ? c: "", l = u.split(" "), r = 0, o = l.length; o > r; r++) a = l[r],
        a === d && e(n).addClass("selected")
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"],
    t = require("delegated-events"),
    n = t.fire;
    e(document).on("change", ".js-repository-import-owner-container input",
    function() {
        var e = this.getAttribute("data-upsell"),
        t = this.getAttribute("data-billing-url");
        document.querySelector(".js-repository-import-billing-url").href = t,
        document.querySelector(".js-repository-import-upsell").classList.toggle("d-none", "false" == e),
        document.querySelector(".js-repository-import-no-upsell").classList.toggle("d-none", "true" == e)
    }),
    e(document).on("socket:message", ".repository-import",
    function(e, t) {
        t.redirect_to && (document.location.href = t.redirect_to, e.stopImmediatePropagation())
    }),
    e(document).on("change", ".js-repository-import-lfs-opt",
    function() {
        var e = this.getAttribute("data-percent-used"),
        t = this.closest(".js-repository-import-lfs-container"),
        n = this.getAttribute("data-used");
        t.querySelector(".js-repository-import-lfs-warn").classList.toggle("d-none", !(e > 100)),
        t.querySelector(".js-usage-bar").classList.toggle("exceeded", e >= 100),
        t.querySelector(".js-usage-bar").setAttribute("aria-label", e + "%"),
        t.querySelector(".js-repository-import-lfs-progress").style.width = e + "%",
        t.querySelector("span.js-usage-text").innerText = n
    }),
    e(document).on("menu:activated selectmenu:load", ".js-repository-import-author-select-menu",
    function() {
        var e = this.querySelector(".js-repository-import-author-autocomplete");
        e.focus(),
        e.select()
    }),
    e(document).on("autocomplete:result", ".js-repository-import-author-autocomplete",
    function() {
        var e = this.closest(".js-repository-import-author"),
        t = e.querySelector(".js-author-login-info");
        t.value = this.value,
        n(t, "change")
    }),
    e(document).on("ajaxSuccess", ".js-repository-import-author-form",
    function(t, n, i, r) {
        var s = e.parseHTML(r.trim()),
        o = this.closest(".js-repository-import-author");
        o.replaceWith.apply(o, _toConsumableArray(s))
    }),
    e(document).on("click", ".js-repository-import-projects-cancel-button",
    function() {
        document.querySelector(".js-repository-import-projects-cancel-form").submit()
    })
} (),
function() {
    function e() {
        document.body.classList.add("is-sending"),
        document.body.classList.remove("is-sent", "is-not-sent")
    }
    function t() {
        document.body.classList.add("is-sent"),
        document.body.classList.remove("is-sending")
    }
    function n(e) {
        e && (document.querySelector(".js-sms-error").textContent = e),
        document.body.classList.add("is-not-sent"),
        document.body.classList.remove("is-sending")
    }
    var i = require("github/jquery")["default"],
    r = require("github/fetch"),
    s = r.fetch,
    o = require("delegated-events"),
    a = o.on;
    i(document).on("ajaxSend", ".js-send-auth-code", e),
    i(document).on("ajaxSuccess", ".js-send-auth-code", t),
    i(document).on("ajaxError", ".js-send-auth-code",
    function(e, t) {
        n(t.responseText)
    }),
    a("click", ".js-send-two-factor-code",
    function() {
        var i = this.form,
        r = i.querySelector(".js-country-code-select").value,
        o = i.querySelector(".js-sms-number").value,
        a = r + " " + o,
        u = i.querySelector(".js-two-factor-secret").value;
        e();
        var c = new FormData;
        c.append("number", a),
        c.append("two_factor_secret", u),
        c.append("authenticity_token", i.elements.authenticity_token.value),
        s(this.getAttribute("data-url"), {
            method: "post",
            body: c
        }).then(function() {
            t(),
            Array.from(i.querySelectorAll(".js-2fa-enable")).forEach(function(e) {
                return e.disabled = !1
            }),
            i.querySelector(".js-2fa-otp").focus()
        })["catch"](function(e) {
            e.response && e.response.text().then(n),
            Array.from(i.querySelectorAll(".js-2fa-enable")).forEach(function(e) {
                return e.disabled = !0
            })
        })
    }),
    document.addEventListener("facebox:reveal",
    function() {
        var e = document.querySelector("#facebox .js-two-factor-set-sms-fallback");
        e && (i(".js-configure-sms-fallback .facebox-alert").text("").hide(), i(".js-configure-sms-fallback").show(), i(".js-verify-sms-fallback").hide())
    }),
    i(document).on("ajaxSuccess", ".js-two-factor-set-sms-fallback",
    function(e, t) {
        switch (t.status) {
        case 200:
        case 201:
            window.location.reload();
            break;
        case 202:
            i(".js-configure-sms-fallback").hide(),
            i(".js-verify-sms-fallback").show(),
            i(".js-fallback-otp").focus()
        }
    }),
    i(document).on("ajaxError", ".js-two-factor-set-sms-fallback",
    function(e, t) {
        switch (t.status) {
        case 422:
            window.location.reload();
            break;
        case 429:
            return i(".js-configure-sms-fallback .facebox-alert").text(t.responseText).show(),
            !1
        }
    })
} (),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSuccess", ".js-saved-reply-delete",
    function() {
        var e = this.closest(".js-saved-reply-container"),
        t = e.querySelectorAll(".js-saved-reply-list-item").length;
        e.classList.toggle("has-replies", t > 1),
        this.closest(".js-saved-reply-list-item").remove()
    })
} (),
function() {
    function e() {
        var e = this,
        t = parseInt(e.getAttribute("data-max-length"), 10),
        n = e.closest(".js-user-profile-bio-container").querySelector(".js-user-profile-bio-message"),
        i = e.value,
        r = e.getAttribute("data-bio-label"),
        s = t - i.length;
        i.length > t || 5 >= s ? (n.textContent = s + " " + r, n.classList.remove("hidden")) : (n.textContent = "", n.classList.add("hidden"))
    }
    var t, n;
    t = require("delegated-events").fire,
    n = require("github/observe").observe;
    var i = require("github/jquery")["default"];
    n(".js-email-global-unsubscribe-form",
    function() {
        this.querySelector(".js-email-global-unsubscribe-submit").disabled = !0
    }),
    i(document).on("change", ".js-email-global-unsubscribe-form",
    function() {
        var e, t;
        return e = function() {
            var e, n, i, r;
            for (i = this.querySelectorAll(".js-email-global-unsubscribe"), r = [], e = 0, n = i.length; n > e; e++) t = i[e],
            t.checked && r.push(t);
            return r
        }.call(this),
        this.querySelector(".js-email-global-unsubscribe-submit").disabled = e[0].defaultChecked
    }),
    i(document).on("ajaxSend", ".js-remove-ssh-key",
    function() {
        return i(this).addClass("disabled").find("span").text("Deleting\u2026")
    }),
    i(document).on("ajaxError", ".js-remove-ssh-key",
    function() {
        return i(this).removeClass("disabled").find("span").text("Error. Try again.")
    }),
    i(document).on("ajaxSuccess", ".js-remove-ssh-key",
    function() {
        return i(this).closest("li").remove(),
        0 === i(".js-ssh-keys-box li").length ? i(".js-ssh-keys-container").removeClass("has-keys") : void 0
    }),
    i(document).on("ajaxSend", ".js-remove-gpg-key",
    function() {
        return i(this).addClass("disabled").find("span").text("Deleting\u2026")
    }),
    i(document).on("ajaxError", ".js-remove-gpg-key",
    function() {
        return i(this).removeClass("disabled").find("span").text("Error. Try again.")
    }),
    i(document).on("ajaxSuccess", ".js-remove-gpg-key",
    function() {
        return i(this).closest("li").remove(),
        0 === i(".js-gpg-keys-box li").length ? i(".js-gpg-keys-container").removeClass("has-keys") : void 0
    }),
    i(document).on("ajaxSend", ".js-verify-ssh-key",
    function() {
        return i(this).addClass("disabled").find("span").text("Verifying\u2026")
    }),
    i(document).on("ajaxError", ".js-verify-ssh-key",
    function() {
        return i(this).removeClass("disabled").find("span").text("Error. Try again.")
    }),
    i(document).on("ajaxSuccess", ".js-verify-ssh-key",
    function() {
        var e;
        return e = this.closest("li"),
        e.querySelector(".js-unverified-user-key-notice").remove(),
        e.querySelector(".js-user-key-icon").classList.remove("unverified-user-key"),
        this.remove()
    }),
    i(document).on("ajaxSuccess", ".js-leave-collaborated-repo",
    function(e) {
        var t, n;
        t = e.target.getAttribute("data-repo-id"),
        n = document.querySelector(".js-collab-repo[data-repo-id='" + t + "']"),
        n.remove(),
        i.facebox.close()
    }),
    i(document).on("ajaxSuccess", ".js-newsletter-unsubscribe-form",
    function() {
        var e, t, n, i, r;
        for (i = document.querySelectorAll(".js-newsletter-unsubscribe-message"), r = [], t = 0, n = i.length; n > t; t++) e = i[t],
        r.push(e.classList.toggle("hidden"));
        return r
    }),
    i(document).on("click", ".js-show-new-ssh-key-form",
    function() {
        return i(".js-new-ssh-key-box").toggle().find(".js-ssh-key-title").focus(),
        !1
    }),
    i(document).on("click", ".js-show-new-gpg-key-form",
    function() {
        return i(".js-new-gpg-key-box").toggle().find(".js-gpg-key-public_key").focus(),
        !1
    }),
    i(document).on("ajaxSuccess", ".js-revoke-access-form",
    function() {
        var e, t, n;
        e = this.getAttribute("data-id"),
        n = this.getAttribute("data-type-name"),
        t = document.querySelector(".js-revoke-item[data-type='" + n + "'][data-id='" + e + "']"),
        i.facebox.close(),
        t.remove(),
        t.classList.contains("new-token") && document.querySelector(".js-flash-new-token").remove()
    }),
    i(document).on("click", ".js-delete-oauth-application-image",
    function() {
        var e, t, n, r, s, o;
        return e = i(this).closest(".js-uploadable-container"),
        t = e.closest("form"),
        n = this.getAttribute("data-app-logo-destroy-path"),
        r = this.getAttribute("data-app-logo-destroy-method"),
        s = this.getAttribute("data-app-logo-destroy-field-name"),
        o = this.getAttribute("data-app-logo-destroy-field-value"),
        t.attr("action", n),
        t.append('<input name="' + s + '" type="hidden" value="' + o + '">'),
        t.append('<input name="_method" type="hidden" value="' + r + '">'),
        t.submit(),
        !1
    }),
    i(document).on("click", ".js-new-callback",
    function(e) {
        var t, n;
        return e.preventDefault(),
        t = i(e.currentTarget).closest(".js-callback-urls"),
        n = t.find(".js-callback-url").first().clone(),
        n.removeClass("is-default-callback"),
        n.find("input").val(""),
        t.addClass("has-many"),
        i(e.currentTarget).before(n)
    }),
    i(document).on("click", ".js-delete-callback",
    function(e) {
        var t, n;
        return e.preventDefault(),
        t = i(e.currentTarget).closest(".js-callback-urls"),
        i(e.currentTarget).closest(".js-callback-url").remove(),
        n = t.find(".js-callback-url"),
        n.length <= 1 ? t.removeClass("has-many") : void 0
    }),
    i(document).on("click", ".js-oauth-application-whitelist .js-deny-this-request",
    function(e) {
        return i(e.currentTarget).siblings("#state").val("denied"),
        i(e.currentTarget).closest(".js-org-application-access-form").submit()
    }),
    i(document).on("ajaxSuccess", ".js-org-application-access-form",
    function() {
        return window.location.reload()
    }),
    i(document).on("click", ".js-user-rename-warning-continue",
    function() {
        var e, t, n, i, r;
        for (i = document.querySelectorAll(".js-user-rename-warning, .js-user-rename-form"), r = [], t = 0, n = i.length; n > t; t++) e = i[t],
        r.push(e.classList.toggle("hidden"));
        return r
    }),
    i(document).on("change", ".js-checkbox-scope",
    function() {
        var e, t, n, i, r, s;
        for (i = this.closest(".js-check-scope-container"), r = i.querySelectorAll(".js-checkbox-scope"), s = [], t = 0, n = r.length; n > t; t++) e = r[t],
        e !== this ? (e.checked = this.checked, s.push(e.disabled = this.checked)) : s.push(void 0);
        return s
    }),
    i(document).on("click", ".js-generate-integration-key",
    function() {
        var e;
        return t(document, "facebox:close"),
        e = document.querySelector(".js-integration-key-management-wrapper"),
        e.classList.add("downloading")
    }),
    i(document).on("keyup", ".js-user-profile-bio", e).on("change", ".js-user-profile-bio", e)
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSuccess", ".js-user-sessions-revoke",
    function() {
        this.closest("li").remove()
    })
} (),
function() {
    var e = require("github/jquery")["default"],
    t = require("github/observe"),
    n = t.observe;
    e(function() {
        return e(".js-email-notice-trigger").focus(function() {
            return e(".js-email-notice").addClass("notice-highlight")
        }),
        e(".js-email-notice-trigger").blur(function() {
            return e(".js-email-notice").removeClass("notice-highlight")
        })
    }),
    n(".js-plan-choice:checked", {
        add: function() {
            return e(this).closest(".plan-row").addClass("selected")
        },
        remove: function() {
            return e(this).closest(".plan-row").removeClass("selected")
        }
    }),
    n(".js-plan-row.selected", {
        add: function() {
            var t;
            return t = e(this).find(".js-choose-button"),
            t.text(t.attr("data-selected-text"))
        },
        remove: function() {
            var t;
            return t = e(this).find(".js-choose-button"),
            t.text(t.attr("data-default-text"))
        }
    }),
    n(".js-plan-row.free-plan.selected, .js-plan-choice-label.plan-choice-free.open", {
        add: function() {
            return e("#js-signup-billing-fields").addClass("has-removed-contents")
        },
        remove: function() {
            return e("#js-signup-billing-fields").removeClass("has-removed-contents")
        }
    }),
    n(".js-setup-organization:checked", {
        add: function() {
            var t;
            return t = e(".js-choose-plan-submit"),
            t.attr("data-default-text") || t.attr("data-default-text", t.text()),
            t.text(t.attr("data-org-text"))
        },
        remove: function() {
            var t;
            return t = e(".js-choose-plan-submit"),
            t.text(t.attr("data-default-text"))
        }
    })
}.call(this),
function() {
    function e(e) {
        var t = i(".js-site-search-form")[0];
        t.setAttribute("action", t.getAttribute("data-unscoped-search-url")),
        i(".js-site-search").removeClass("scoped-search"),
        e.setAttribute("placeholder", e.getAttribute("data-unscoped-placeholder"))
    }
    function t(e) {
        var t = i(".js-site-search-form")[0];
        t.setAttribute("action", t.getAttribute("data-scoped-search-url")),
        i(".js-site-search").addClass("scoped-search"),
        e.setAttribute("placeholder", e.getAttribute("data-scoped-placeholder"))
    }
    function n(n) {
        var i = n.target,
        r = i.value;
        "" === r && "backspace" === n.hotkey && i.classList.contains("is-clearable") && e(i),
        "" === r && "esc" === n.hotkey && t(i),
        i.classList.toggle("is-clearable", "" === r)
    }
    var i = require("github/jquery")["default"];
    i(document).on("focus", ".js-site-search-field",
    function() {
        return i(this).on("keyup", n)
    }),
    i(document).on("blur", ".js-site-search-field",
    function() {
        return i(this).off("keyup", n)
    }),
    i(document).on("focusout", ".js-site-search-focus",
    function() {
        this.closest(".js-chromeless-input-container").classList.remove("focus"),
        "" === this.value && this.classList.contains("js-site-search-field") && t(this)
    }),
    i(document).on("focusin", ".js-site-search-focus",
    function() {
        this.closest(".js-chromeless-input-container").classList.add("focus")
    })
}.call(this),
function() {
    var e = require("github/observe"),
    t = e.observe;
    t(".js-contact-javascript-flag",
    function(e) {
        e.value = "true"
    })
} (),
function() {
    var e, t, n = require("github/observe"),
    i = n.observe,
    r = require("github/jquery")["default"];
    e = function() {
        var e;
        return e = r("#js-features-branch-diagram"),
        e.removeClass("preload"),
        e.find("path").each(function() {
            var e, t, n;
            return r(this).is("#js-branch-diagram-branch") ? n = "stroke-dashoffset 3.5s linear 0.25s": r(this).is("#js-branch-diagram-master") ? n = "stroke-dashoffset 4.1s linear 0s": r(this).is("#js-branch-diagram-arrow") && (n = "stroke-dashoffset 0.2s linear 4.3s"),
            t = r(this).get(0),
            e = t.getTotalLength(),
            t.style.transition = t.style.WebkitTransition = "none",
            t.style.strokeDasharray = e + " " + e,
            t.style.strokeDashoffset = e,
            t.getBoundingClientRect(),
            t.style.transition = t.style.WebkitTransition = n,
            t.style.strokeDashoffset = "0"
        })
    },
    r(document).on("click", ".js-segmented-nav-button",
    function(e) {
        var t, n;
        return n = r(this).attr("data-selected-tab"),
        t = r(this).closest(".js-segmented-nav"),
        t.find(".js-segmented-nav-button").removeClass("selected"),
        t.siblings(".js-selected-nav-tab").removeClass("active"),
        r(this).addClass("selected"),
        r("." + n).addClass("active"),
        e.preventDefault()
    }),
    t = function() {
        return r(document).scrollTop() >= r("#js-features-branch-diagram").offset().top - 700 ? e() : void 0
    },
    i("#js-features-branch-diagram.preload", {
        add: function() {
            return r(window).on("scroll", t)
        },
        remove: function() {
            return r(window).off("scroll", t)
        }
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("socket:message", ".js-notification-indicator",
    function(t, n) {
        e(this).attr({
            "aria-label": n.aria_label,
            "data-ga-click": n.ga_click
        }),
        e("span", this).attr("class", n.span_class)
    })
} (),
function() {
    var e, t, n = require("github/jquery")["default"],
    i = require("github/visible")["default"];
    e = require("github/fetch").fetchText,
    t = function() {
        var t;
        return t = "/site/keyboard_shortcuts?url=" + window.location.pathname,
        n.facebox(function() {
            return e(t).then(function(e) {
                return n.facebox(e, "shortcuts")
            })
        })
    },
    n(document).on("click", ".js-keyboard-shortcuts",
    function() {
        return t(),
        !1
    }),
    n(document).on("click", ".js-see-all-keyboard-shortcuts",
    function() {
        return this.remove(),
        n(".facebox .js-hidden-pane").css("display", "table-row-group"),
        !1
    }),
    n(document).on("keypress",
    function(e) {
        return e.target === document.body && 63 === e.which ? (Array.from(n(".facebox")).some(i) ? n.facebox.close() : t(), !1) : void 0
    })
}.call(this),
function() {
    var e = require("github/observe"),
    t = e.observe;
    t(".js-site-status-container",
    function() {
        var e, t, n, i, r;
        r = this,
        t = r.querySelector(".js-site-status-message"),
        n = r.querySelector(".js-site-status-time"),
        e = r.querySelector(".flash"),
        i = document.querySelector("meta[name=site-status-api-url]").content,
        window.fetch(i).then(function(e) {
            return e.json()
        }).then(function(i) {
            var s;
            null != i.status && "good" !== i.status && (t.textContent = i.body, n.setAttribute("datetime", i.created_on), s = "major" === i.status ? "error": "warn", e.classList.add("flash-" + s), r.classList.remove("hidden"))
        })
    })
} (),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSend", ".js-action-ldap-create",
    function() {
        return e(this).find(".btn-sm").addClass("disabled")
    }),
    e(document).on("ajaxError", ".js-action-ldap-create",
    function() {
        return ! 1
    }),
    e(document).on("ajaxComplete", ".js-action-ldap-create",
    function(t, n) {
        var i, r;
        return i = e(this),
        r = 500 === n.status ? "Oops, something went wrong.": n.responseText,
        i.find(".js-message").show().html(" &ndash; " + r),
        200 === n.status && i.find(".btn").hide(),
        !1
    })
}.call(this),
function() {
    function e(t, i) {
        var r = document.getElementById(t.getAttribute("data-results"));
        if (r) {
            var s = h.get(r);
            if (!s) return void(null == d && (d = o(r.getAttribute("data-url")).then(function(n) {
                h.set(r, n.paths),
                e(t),
                d = null
            })["catch"](function() {
                d = null
            })));
            var a = r.querySelector(".js-tree-browser-result-template").firstElementChild,
            f = r.querySelector(".js-tree-finder-results");
            null == i && (i = t.value);
            var m = void 0,
            p = void 0;
            i ? (m = c(i), p = u(s, i)) : p = s,
            r.classList.toggle("filterable-empty", !p.length);
            for (var g = document.createDocumentFragment(), v = p.slice(0, 50), b = 0, y = v.length; y > b; b++) {
                var j = v[b],
                w = a.cloneNode(!0),
                x = w.getElementsByClassName("js-tree-finder-path")[0],
                q = new URL(x.href);
                q.pathname = q.pathname + "/" + j,
                x.href = q.href,
                x.textContent = j,
                l(x, i, m),
                g.appendChild(w)
            }
            f.innerHTML = "",
            f.appendChild(g),
            n(f).navigation("focus")
        }
    }
    function t(t) {
        e(t.target)
    }
    var n = require("github/jquery")["default"],
    i = require("github/observe"),
    r = i.observe,
    s = require("github/fetch"),
    o = s.fetchJSON,
    a = require("github/fuzzy-filter"),
    u = a.fuzzySort,
    c = a.fuzzyRegexp,
    l = a.fuzzyHighlightElement,
    d = null,
    h = new WeakMap;
    n(document).onFocusedKeydown(".js-tree-finder-field",
    function() {
        return function(e) {
            "esc" === e.hotkey && (history.back(), e.preventDefault())
        }
    }),
    r(".js-tree-finder-field", {
        init: function(t) {
            e(t)
        },
        add: function(e) {
            n(e).on("throttled:input", t),
            e.focus()
        },
        remove: function(e) {
            n(e).off("throttled:input", t)
        }
    })
} (),
function() {
    var e, t, n, i, r, s, o, a, u, c, l, d, h, f, m, p, g, v, b, y, j, w, x, q = require("github/jquery")["default"];
    s = require("delegated-events"),
    f = require("github/inflector").pluralize,
    o = require("github/number-helpers").formatNumber,
    c = require("github/observe").observe,
    h = require("github/pjax"),
    d = null,
    m = null,
    y = null,
    j = null,
    i = function() {
        return document.querySelector(".js-calendar-graph").getAttribute("data-url")
    },
    s.on("pjax:send", ".js-contribution-activity",
    function() {
        this.classList.add("loading")
    }),
    s.on("pjax:complete", ".js-contribution-activity",
    function() {
        this.classList.remove("loading")
    }),
    c(".js-calendar-graph-svg",
    function() {
        var e, t, i;
        e = this.closest(".js-calendar-graph"),
        e.addEventListener("mouseover", n),
        e.addEventListener("mouseout", r),
        t = e.getAttribute("data-from"),
        t && (t = m = x(t)),
        i = e.getAttribute("data-to"),
        i && (i = x(i)),
        (t || i) && p(t, i, !0)
    }),
    s.on("click", ".js-calendar-graph rect.day",
    function(e) {
        var t;
        t = x(this.getAttribute("data-date")),
        p(t, e.shiftKey, !1)
    }),
    n = function(e) {
        return e.target.matches("rect.day") ? w(e.target) : void 0
    },
    r = function() {
        var e;
        return null != (e = document.querySelector(".svg-tip")) ? e.remove() : void 0
    },
    e = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    w = function(t) {
        var n, i, r, s, a, u, c, l;
        return r = x(t.getAttribute("data-date")),
        i = parseInt(t.getAttribute("data-count")),
        u = 0 === i ? "No": o(i),
        a = e[r.getUTCMonth()].slice(0, 3) + " " + r.getUTCDate() + ", " + r.getUTCFullYear(),
        s = q('<div class="svg-tip svg-tip-one-line">\n  <strong>' + u + " " + f(i, "contribution") + "</strong> on " + a + "\n</div>").get(0),
        q(".svg-tip").remove(),
        document.body.appendChild(s),
        n = t.getBoundingClientRect(),
        c = n.left + window.pageXOffset - s.offsetWidth / 2 + n.width / 2,
        l = n.bottom + window.pageYOffset - s.offsetHeight - 2 * n.height,
        s.style.top = l + "px",
        s.style.left = c + "px"
    },
    u = function(e) {
        return h["default"]({
            url: e,
            container: ".js-contribution-activity",
            scrollTo: !1,
            replace: !0
        })
    },
    v = function(e) {
        var t;
        return d = e,
        y = null,
        j = null,
        t = i() + "?tab=overview&period=" + d,
        b(),
        u(t)
    },
    g = function(e, t) {
        var n, i;
        return i = e.getAttribute("class").trim().split(" "),
        i = function() {
            var e, r, s;
            for (s = [], e = 0, r = i.length; r > e; e++) n = i[e],
            n !== t && s.push(n);
            return s
        } (),
        e.setAttribute("class", i.join(" "))
    },
    t = function(e, t) {
        var n;
        return n = e.getAttribute("class") + " " + t,
        e.setAttribute("class", n.trim())
    },
    b = function(e, n) {
        var i, r, s, o, a, u, c, l, d;
        for (i = document.querySelector(".js-calendar-graph"), d = i.querySelectorAll("rect.day"), o = 0, u = d.length; u > o; o++) r = d[o],
        g(r, "active");
        if (i.classList.remove("days-selected"), e || n) {
            for (i.classList.add("days-selected"), s = function(t) {
                var i;
                return i = x(t.getAttribute("data-date")).getTime(),
                e && n ? e.getTime() <= i && i <= n.getTime() : i === e.getTime()
            },
            l = [], a = 0, c = d.length; c > a; a++) r = d[a],
            s(r) && l.push(t(r, "active"));
            return l
        }
    },
    l = function(e) {
        return ("0" + e).slice( - 2)
    },
    a = function(e) {
        return e.getUTCFullYear() + "-" + l(e.getUTCMonth() + 1) + "-" + l(e.getUTCDate())
    },
    x = function(e) {
        var t, n, i, r, s;
        return i = function() {
            var t, n, i, s;
            for (i = e.split("-"), s = [], t = 0, n = i.length; n > t; t++) r = i[t],
            s.push(parseInt(r));
            return s
        } (),
        s = i[0],
        n = i[1],
        t = i[2],
        new Date(Date.UTC(s, n - 1, t))
    },
    p = function(e, t, n) {
        var r, s, o, c, l, h, f, p;
        return p = i() + "?tab=overview",
        e >= y && j >= e ? void v("weekly") : ("object" == typeof t && (m = t, t = !0), m && t ? (o = new Date(m.getTime() - 26784e5), s = new Date(m.getTime() + 26784e5), c = e > m ? [m, e] : [e, m], r = c[0], f = c[1], o > r && (r = o), f > s && (f = s), l = [r, f], y = l[0], j = l[1], p += "&from=" + a(r) + "&to=" + a(f)) : (r = e, h = [r, null], y = h[0], j = h[1], p += "&from=" + a(r)), m = e, d = "custom", b(r, f), n ? void 0 : u(p))
    },
    q(document).on("change", ".js-period-container",
    function(e) {
        var t;
        return e.preventDefault(),
        e.stopPropagation(),
        t = e.target.value.toLowerCase(),
        d !== t ? v(t) : void 0
    })
}.call(this);
var _slicedToArray = function() {
    function e(e, t) {
        var n = [],
        i = !0,
        r = !1,
        s = void 0;
        try {
            for (var o, a = e[Symbol.iterator](); ! (i = (o = a.next()).done) && (n.push(o.value), !t || n.length !== t); i = !0);
        } catch(u) {
            r = !0,
            s = u
        } finally {
            try { ! i && a["return"] && a["return"]()
            } finally {
                if (r) throw s
            }
        }
        return n
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
} (); !
function() {
    function e(e, t, n) {
        var i = e.querySelector(".js-remaining-pinned-repos-count"),
        r = i.getAttribute("data-remaining-label"),
        s = n - t;
        i.textContent = s + " " + r,
        i.classList.toggle("text-red", 1 > s)
    }
    function t(t) {
        var n = parseInt(t.getAttribute("data-max-repo-count"), 10),
        i = t.querySelectorAll("input[type=checkbox]:checked").length,
        r = Array.from(t.querySelectorAll("input[type=checkbox]"));
        i === n ? r.forEach(function(e) {
            return e.disabled = !e.checked
        }) : n > i && r.forEach(function(e) {
            return e.disabled = !1
        });
        var s = t.closest(".js-pinned-repos-selection-form");
        e(s, i, n)
    }
    function n(e) {
        var t = e.querySelectorAll(".js-pinned-repo-source:checked"),
        n = Array.from(t).map(function(e) {
            return e.value
        }),
        i = n.indexOf("owned") > -1,
        r = n.indexOf("contributed") > -1;
        return [i, r]
    }
    function i(e) {
        var t = e.classList.contains("js-owned-repo"),
        n = e.classList.contains("js-contributed-repo");
        return [t, n]
    }
    function r(e) {
        "enter" === a(e) && e.preventDefault();
        var t = e.target.closest(".js-pinned-repos-selection-form"),
        r = t.querySelector(".js-pinned-repos-filter").value.trim(),
        s = r.length < 1,
        o = t.querySelectorAll(".js-pinned-repos-selection"),
        u = n(t),
        c = _slicedToArray(u, 2),
        l = c[0],
        d = c[1];
        Array.from(o).forEach(function(e) {
            var t = e.querySelector(".js-repo").textContent.trim(),
            n = i(e),
            o = _slicedToArray(n, 2),
            a = o[0],
            u = o[1],
            c = e.querySelector('input[type="checkbox"]').checked,
            h = t.indexOf(r) > -1,
            f = (s || h) && (a && l || u && d),
            m = c || f;
            e.classList.toggle("hidden", !m)
        })
    }
    var s = require("delegated-events"),
    o = s.on,
    a = require("github/hotkey")["default"];
    o("change", ".js-pinned-repos-selection-list input[type=checkbox]",
    function() {
        var e = this.closest(".js-pinned-repos-selection");
        e.classList.toggle("selected", this.checked),
        t(e.closest(".js-pinned-repos-selection-list"))
    }),
    o("keyup", ".js-pinned-repos-filter", r),
    o("change", ".js-pinned-repos-filter", r),
    o("search", ".js-pinned-repos-filter", r),
    o("change", ".js-pinned-repo-source", r),
    document.addEventListener("facebox:reveal",
    function() {
        var e = document.querySelector("#facebox .js-pinned-repos-settings-fragment");
        e && e.setAttribute("src", e.getAttribute("data-url"))
    })
} (),
function() {
    function e(e, t) {
        var n = e.target.closest(".js-pinned-repo-list-item"),
        i = n.querySelector(".js-icon-no-drag"),
        r = n.querySelector(".js-icon-drag");
        t ? (i.classList.add("hidden"), r.classList.remove("hidden")) : (i.classList.remove("hidden"), r.classList.add("hidden"))
    }
    function t(t) {
        w || e(t, !0)
    }
    function n(t) {
        e(t, !1)
    }
    function i(e, t) {
        if (e.parentNode === t.parentNode) for (; e;) {
            if (e === t) return ! 0;
            e = e.previousElementSibling
        }
        return ! 1
    }
    function r(e) {
        if (w) return void e.preventDefault();
        p = e.target.closest(".js-pinned-repo-list-item");
        var t = p.querySelector(".js-repo").textContent.trim();
        e.dataTransfer.setData("text/plain", t),
        g = p,
        v = !1,
        p.classList.add("is-ghost"),
        y = p.closest(".js-pinned-repos-reorder-list");
        var n = Array.from(y.children);
        b = n.indexOf(p),
        j = n[b + 1] || null
    }
    function s() {
        p.classList.remove("is-ghost"),
        v || y.insertBefore(p, j),
        p = null,
        g = null
    }
    function o(e) {
        if (p) {
            var t = e.currentTarget.closest(".js-pinned-repo-list-item");
            if (e.preventDefault(), e.dataTransfer.dropEffect = "move", g !== t) return g = t,
            i(p, t) ? t.before(p) : t.after(p),
            !1
        }
    }
    function a(e) {
        return p ? (e.preventDefault(), e.dataTransfer.dropEffect = "move", !1) : void 0
    }
    function u() {
        if (p) {
            v = !0;
            var e = Array.from(p.parentNode.children).indexOf(p);
            if (b !== e) {
                var t = p,
                n = j,
                i = p.closest(".js-pinned-repos-reorder-form"),
                r = i.closest(".js-pinned-repos-reorder-container"),
                s = r.querySelector(".js-pinned-repos-spinner"),
                o = r.querySelector(".js-pinned-repos-reorder-error");
                o.textContent = "",
                s.style.display = "inline-block",
                w = !0,
                m(i.action, {
                    method: i.method,
                    body: new FormData(i)
                }).then(function() {
                    s.style.display = "none",
                    w = !1
                },
                function() {
                    s.style.display = "none",
                    o.textContent = "Something went wrong.",
                    y.insertBefore(t, n),
                    w = !1
                })
            }
        }
    }
    var c = require("delegated-events"),
    l = c.on,
    d = require("github/observe"),
    h = d.observe,
    f = require("github/fetch"),
    m = f.fetchText,
    p = null,
    g = null,
    v = !1,
    b = null,
    y = null,
    j = null,
    w = !1;
    h(".js-pinned-repo-list-item",
    function() {
        this.addEventListener("mouseover", t),
        this.addEventListener("mouseout", n)
    }),
    h(".js-pinned-repository-reorder",
    function() {
        this.addEventListener("dragstart", r),
        this.addEventListener("dragenter", o),
        this.addEventListener("dragend", s),
        this.addEventListener("dragover", a),
        this.addEventListener("drop", u)
    });
    var x = [".js-pinned-repo-list-item", ".js-pinned-repo-list-item a", ".js-pinned-repo-list-item .js-repo"];
    x.forEach(function(e) {
        h(e,
        function() {
            this.addEventListener("dragenter", o),
            this.addEventListener("dragover", a),
            this.addEventListener("drop", u)
        })
    }),
    l("submit", ".js-pinned-repos-reorder-form",
    function(e) {
        e.preventDefault()
    })
} (),
function() {
    var e = require("github/jquery")["default"];
    e(function() {
        function t() {
            var n = e("#current-version").val();
            n && i("_current").then(function(i) {
                n == i ? setTimeout(t, 5e3) : r || (e("#gollum-error-message").text("Someone has edited the wiki since you started. Please reload this page and re-apply your changes."), e("#gollum-error-message").show(), e("#gollum-editor-submit").attr("disabled", "disabled"), e("#gollum-editor-submit").attr("value", "Cannot Save, Someone Else Has Edited"))
            })
        }
        var n = require("github/fetch"),
        i = n.fetchText,
        r = !1;
        e("#gollum-editor-body").each(t),
        e("#gollum-editor-submit").click(function() {
            r = !0
        })
    })
} (),
function() {
    var e, t, n, i, r = require("github/observe"),
    s = r.observe;
    t = null != (n = document.querySelector("meta[name=form-nonce]")) ? n.content: void 0,
    null != t && (i = require("github/failbot").reportError, e = require("github/inspect")["default"], s("form",
    function(n) {
        var r, s;
        "get" !== n.method.toLowerCase() && (s = n.getAttribute("data-form-nonce"), null != s && s !== t && (r = new Error("Incorrect form-nonce"), i(r, {
            form: e(n),
            method: n.method,
            action: n.action
        })), (null == s || s !== t) && n.remove())
    }))
}.call(this),
function() {
    var e, t, n, i, r, s;
    s = require("github/failbot").reportError,
    i = require("github/proxy-site-detection")["default"],
    e = "$__",
    i(document) && (t = {
        url: window.location.href,
        proxyPayload: document.querySelector("meta[name=js-proxy-site-detection-payload]").content
    },
    n = new Error, s(n, (r = {},
    r["" + e] = btoa(JSON.stringify(t)), r)))
}.call(this);