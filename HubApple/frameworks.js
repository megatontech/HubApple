!
function() {
    "use strict";
    function e(e) {
        if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
        return e.toLowerCase()
    }
    function t(e) {
        return "string" != typeof e && (e = String(e)),
        e
    }
    function n(e) {
        this.map = {},
        e instanceof n ? e.forEach(function(e, t) {
            this.append(t, e)
        },
        this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
            this.append(t, e[t])
        },
        this)
    }
    function r(e) {
        return e.bodyUsed ? Promise.reject(new TypeError("Already read")) : void(e.bodyUsed = !0)
    }
    function i(e) {
        return new Promise(function(t, n) {
            e.onload = function() {
                t(e.result)
            },
            e.onerror = function() {
                n(e.error)
            }
        })
    }
    function o(e) {
        var t = new FileReader;
        return t.readAsArrayBuffer(e),
        i(t)
    }
    function a(e) {
        var t = new FileReader;
        return t.readAsText(e),
        i(t)
    }
    function s() {
        return this.bodyUsed = !1,
        this._initBody = function(e) {
            if (this._bodyInit = e, "string" == typeof e) this._bodyText = e;
            else if (p.blob && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
            else if (p.formData && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e;
            else if (e) {
                if (!p.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(e)) throw new Error("unsupported BodyInit type")
            } else this._bodyText = ""
        },
        p.blob ? (this.blob = function() {
            var e = r(this);
            if (e) return e;
            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
            if (this._bodyFormData) throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]))
        },
        this.arrayBuffer = function() {
            return this.blob().then(o)
        },
        this.text = function() {
            var e = r(this);
            if (e) return e;
            if (this._bodyBlob) return a(this._bodyBlob);
            if (this._bodyFormData) throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText)
        }) : this.text = function() {
            var e = r(this);
            return e ? e: Promise.resolve(this._bodyText)
        },
        p.formData && (this.formData = function() {
            return this.text().then(l)
        }),
        this.json = function() {
            return this.text().then(JSON.parse)
        },
        this
    }
    function u(e) {
        var t = e.toUpperCase();
        return h.indexOf(t) > -1 ? t: e
    }
    function c(e, t) {
        t = t || {};
        var r = t.body;
        if (c.prototype.isPrototypeOf(e)) {
            if (e.bodyUsed) throw new TypeError("Already read");
            this.url = e.url,
            this.credentials = e.credentials,
            t.headers || (this.headers = new n(e.headers)),
            this.method = e.method,
            this.mode = e.mode,
            r || (r = e._bodyInit, e.bodyUsed = !0)
        } else this.url = e;
        if (this.credentials = t.credentials || this.credentials || "omit", (t.headers || !this.headers) && (this.headers = new n(t.headers)), this.method = u(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && r) throw new TypeError("Body not allowed for GET or HEAD requests");
        this._initBody(r)
    }
    function l(e) {
        var t = new FormData;
        return e.trim().split("&").forEach(function(e) {
            if (e) {
                var n = e.split("="),
                r = n.shift().replace(/\+/g, " "),
                i = n.join("=").replace(/\+/g, " ");
                t.append(decodeURIComponent(r), decodeURIComponent(i))
            }
        }),
        t
    }
    function f(e) {
        var t = new n,
        r = e.getAllResponseHeaders().trim().split("\n");
        return r.forEach(function(e) {
            var n = e.trim().split(":"),
            r = n.shift().trim(),
            i = n.join(":").trim();
            t.append(r, i)
        }),
        t
    }
    function d(e, t) {
        t || (t = {}),
        this._initBody(e),
        this.type = "default",
        this.status = t.status,
        this.ok = this.status >= 200 && this.status < 300,
        this.statusText = t.statusText,
        this.headers = t.headers instanceof n ? t.headers: new n(t.headers),
        this.url = t.url || ""
    }
    if (!self.fetch) {
        n.prototype.append = function(n, r) {
            n = e(n),
            r = t(r);
            var i = this.map[n];
            i || (i = [], this.map[n] = i),
            i.push(r)
        },
        n.prototype["delete"] = function(t) {
            delete this.map[e(t)]
        },
        n.prototype.get = function(t) {
            var n = this.map[e(t)];
            return n ? n[0] : null
        },
        n.prototype.getAll = function(t) {
            return this.map[e(t)] || []
        },
        n.prototype.has = function(t) {
            return this.map.hasOwnProperty(e(t))
        },
        n.prototype.set = function(n, r) {
            this.map[e(n)] = [t(r)]
        },
        n.prototype.forEach = function(e, t) {
            Object.getOwnPropertyNames(this.map).forEach(function(n) {
                this.map[n].forEach(function(r) {
                    e.call(t, r, n, this)
                },
                this)
            },
            this)
        };
        var p = {
            blob: "FileReader" in self && "Blob" in self &&
            function() {
                try {
                    return new Blob,
                    !0
                } catch(e) {
                    return ! 1
                }
            } (),
            formData: "FormData" in self,
            arrayBuffer: "ArrayBuffer" in self
        },
        h = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        c.prototype.clone = function() {
            return new c(this)
        },
        s.call(c.prototype),
        s.call(d.prototype),
        d.prototype.clone = function() {
            return new d(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new n(this.headers),
                url: this.url
            })
        },
        d.error = function() {
            var e = new d(null, {
                status: 0,
                statusText: ""
            });
            return e.type = "error",
            e
        };
        var m = [301, 302, 303, 307, 308];
        d.redirect = function(e, t) {
            if ( - 1 === m.indexOf(t)) throw new RangeError("Invalid status code");
            return new d(null, {
                status: t,
                headers: {
                    location: e
                }
            })
        },
        self.Headers = n,
        self.Request = c,
        self.Response = d,
        self.fetch = function(e, t) {
            return new Promise(function(n, r) {
                function i() {
                    return "responseURL" in a ? a.responseURL: /^X-Request-URL:/m.test(a.getAllResponseHeaders()) ? a.getResponseHeader("X-Request-URL") : void 0
                }
                var o;
                o = c.prototype.isPrototypeOf(e) && !t ? e: new c(e, t);
                var a = new XMLHttpRequest;
                a.onload = function() {
                    var e = 1223 === a.status ? 204 : a.status;
                    if (100 > e || e > 599) return void r(new TypeError("Network request failed"));
                    var t = {
                        status: e,
                        statusText: a.statusText,
                        headers: f(a),
                        url: i()
                    },
                    o = "response" in a ? a.response: a.responseText;
                    n(new d(o, t))
                },
                a.onerror = function() {
                    r(new TypeError("Network request failed"))
                },
                a.open(o.method, o.url, !0),
                "include" === o.credentials && (a.withCredentials = !0),
                "responseType" in a && p.blob && (a.responseType = "blob"),
                o.headers.forEach(function(e, t) {
                    a.setRequestHeader(t, e)
                }),
                a.send("undefined" == typeof o._bodyInit ? null: o._bodyInit)
            })
        },
        self.fetch.polyfill = !0
    }
} (),
"undefined" == typeof WeakMap && !
function() {
    var e = Object.defineProperty,
    t = Date.now() % 1e9,
    n = function() {
        this.name = "__st" + (1e9 * Math.random() >>> 0) + (t+++"__")
    };
    n.prototype = {
        set: function(t, n) {
            var r = t[this.name];
            return r && r[0] === t ? r[1] = n: e(t, this.name, {
                value: [t, n],
                writable: !0
            }),
            this
        },
        get: function(e) {
            var t;
            return (t = e[this.name]) && t[0] === e ? t[1] : void 0
        },
        "delete": function(e) {
            var t = e[this.name];
            return t && t[0] === e ? (t[0] = t[1] = void 0, !0) : !1
        },
        has: function(e) {
            var t = e[this.name];
            return t ? t[0] === e: !1
        }
    },
    window.WeakMap = n
} (),
function(e) {
    function t(e) {
        w.push(e),
        b || (b = !0, m(r))
    }
    function n(e) {
        return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(e) || e
    }
    function r() {
        b = !1;
        var e = w;
        w = [],
        e.sort(function(e, t) {
            return e.uid_ - t.uid_
        });
        var t = !1;
        e.forEach(function(e) {
            var n = e.takeRecords();
            i(e),
            n.length && (e.callback_(n, e), t = !0)
        }),
        t && r()
    }
    function i(e) {
        e.nodes_.forEach(function(t) {
            var n = v.get(t);
            n && n.forEach(function(t) {
                t.observer === e && t.removeTransientObservers()
            })
        })
    }
    function o(e, t) {
        for (var n = e; n; n = n.parentNode) {
            var r = v.get(n);
            if (r) for (var i = 0; i < r.length; i++) {
                var o = r[i],
                a = o.options;
                if (n === e || a.subtree) {
                    var s = t(a);
                    s && o.enqueue(s)
                }
            }
        }
    }
    function a(e) {
        this.callback_ = e,
        this.nodes_ = [],
        this.records_ = [],
        this.uid_ = ++x
    }
    function s(e, t) {
        this.type = e,
        this.target = t,
        this.addedNodes = [],
        this.removedNodes = [],
        this.previousSibling = null,
        this.nextSibling = null,
        this.attributeName = null,
        this.attributeNamespace = null,
        this.oldValue = null
    }
    function u(e) {
        var t = new s(e.type, e.target);
        return t.addedNodes = e.addedNodes.slice(),
        t.removedNodes = e.removedNodes.slice(),
        t.previousSibling = e.previousSibling,
        t.nextSibling = e.nextSibling,
        t.attributeName = e.attributeName,
        t.attributeNamespace = e.attributeNamespace,
        t.oldValue = e.oldValue,
        t
    }
    function c(e, t) {
        return E = new s(e, t)
    }
    function l(e) {
        return T ? T: (T = u(E), T.oldValue = e, T)
    }
    function f() {
        E = T = void 0
    }
    function d(e) {
        return e === T || e === E
    }
    function p(e, t) {
        return e === t ? e: T && d(e) ? T: null
    }
    function h(e, t, n) {
        this.observer = e,
        this.target = t,
        this.options = n,
        this.transientObservedNodes = []
    }
    if (!e.JsMutationObserver) {
        var m, v = new WeakMap;
        if (/Trident|Edge/.test(navigator.userAgent)) m = setTimeout;
        else if (window.setImmediate) m = window.setImmediate;
        else {
            var g = [],
            y = String(Math.random());
            window.addEventListener("message",
            function(e) {
                if (e.data === y) {
                    var t = g;
                    g = [],
                    t.forEach(function(e) {
                        e()
                    })
                }
            }),
            m = function(e) {
                g.push(e),
                window.postMessage(y, "*")
            }
        }
        var b = !1,
        w = [],
        x = 0;
        a.prototype = {
            observe: function(e, t) {
                if (e = n(e), !t.childList && !t.attributes && !t.characterData || t.attributeOldValue && !t.attributes || t.attributeFilter && t.attributeFilter.length && !t.attributes || t.characterDataOldValue && !t.characterData) throw new SyntaxError;
                var r = v.get(e);
                r || v.set(e, r = []);
                for (var i, o = 0; o < r.length; o++) if (r[o].observer === this) {
                    i = r[o],
                    i.removeListeners(),
                    i.options = t;
                    break
                }
                i || (i = new h(this, e, t), r.push(i), this.nodes_.push(e)),
                i.addListeners()
            },
            disconnect: function() {
                this.nodes_.forEach(function(e) {
                    for (var t = v.get(e), n = 0; n < t.length; n++) {
                        var r = t[n];
                        if (r.observer === this) {
                            r.removeListeners(),
                            t.splice(n, 1);
                            break
                        }
                    }
                },
                this),
                this.records_ = []
            },
            takeRecords: function() {
                var e = this.records_;
                return this.records_ = [],
                e
            }
        };
        var E, T;
        h.prototype = {
            enqueue: function(e) {
                var n = this.observer.records_,
                r = n.length;
                if (n.length > 0) {
                    var i = n[r - 1],
                    o = p(i, e);
                    if (o) return void(n[r - 1] = o)
                } else t(this.observer);
                n[r] = e
            },
            addListeners: function() {
                this.addListeners_(this.target)
            },
            addListeners_: function(e) {
                var t = this.options;
                t.attributes && e.addEventListener("DOMAttrModified", this, !0),
                t.characterData && e.addEventListener("DOMCharacterDataModified", this, !0),
                t.childList && e.addEventListener("DOMNodeInserted", this, !0),
                (t.childList || t.subtree) && e.addEventListener("DOMNodeRemoved", this, !0)
            },
            removeListeners: function() {
                this.removeListeners_(this.target)
            },
            removeListeners_: function(e) {
                var t = this.options;
                t.attributes && e.removeEventListener("DOMAttrModified", this, !0),
                t.characterData && e.removeEventListener("DOMCharacterDataModified", this, !0),
                t.childList && e.removeEventListener("DOMNodeInserted", this, !0),
                (t.childList || t.subtree) && e.removeEventListener("DOMNodeRemoved", this, !0)
            },
            addTransientObserver: function(e) {
                if (e !== this.target) {
                    this.addListeners_(e),
                    this.transientObservedNodes.push(e);
                    var t = v.get(e);
                    t || v.set(e, t = []),
                    t.push(this)
                }
            },
            removeTransientObservers: function() {
                var e = this.transientObservedNodes;
                this.transientObservedNodes = [],
                e.forEach(function(e) {
                    this.removeListeners_(e);
                    for (var t = v.get(e), n = 0; n < t.length; n++) if (t[n] === this) {
                        t.splice(n, 1);
                        break
                    }
                },
                this)
            },
            handleEvent: function(e) {
                switch (e.stopImmediatePropagation(), e.type) {
                case "DOMAttrModified":
                    var t = e.attrName,
                    n = e.relatedNode.namespaceURI,
                    r = e.target,
                    i = new c("attributes", r);
                    i.attributeName = t,
                    i.attributeNamespace = n;
                    var a = e.attrChange === MutationEvent.ADDITION ? null: e.prevValue;
                    o(r,
                    function(e) {
                        return ! e.attributes || e.attributeFilter && e.attributeFilter.length && -1 === e.attributeFilter.indexOf(t) && -1 === e.attributeFilter.indexOf(n) ? void 0 : e.attributeOldValue ? l(a) : i
                    });
                    break;
                case "DOMCharacterDataModified":
                    var r = e.target,
                    i = c("characterData", r),
                    a = e.prevValue;
                    o(r,
                    function(e) {
                        return e.characterData ? e.characterDataOldValue ? l(a) : i: void 0
                    });
                    break;
                case "DOMNodeRemoved":
                    this.addTransientObserver(e.target);
                case "DOMNodeInserted":
                    var s, u, d = e.target;
                    "DOMNodeInserted" === e.type ? (s = [d], u = []) : (s = [], u = [d]);
                    var p = d.previousSibling,
                    h = d.nextSibling,
                    i = c("childList", e.target.parentNode);
                    i.addedNodes = s,
                    i.removedNodes = u,
                    i.previousSibling = p,
                    i.nextSibling = h,
                    o(e.relatedNode,
                    function(e) {
                        return e.childList ? i: void 0
                    })
                }
                f()
            }
        },
        e.JsMutationObserver = a,
        e.MutationObserver || (e.MutationObserver = a, a._isPolyfilled = !0)
    }
} (self),
function(e) {
    "use strict";
    if (!window.performance) {
        var t = Date.now();
        window.performance = {
            now: function() {
                return Date.now() - t
            }
        }
    }
    window.requestAnimationFrame || (window.requestAnimationFrame = function() {
        var e = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
        return e ?
        function(t) {
            return e(function() {
                t(performance.now())
            })
        }: function(e) {
            return window.setTimeout(e, 1e3 / 60)
        }
    } ()),
    window.cancelAnimationFrame || (window.cancelAnimationFrame = function() {
        return window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame ||
        function(e) {
            clearTimeout(e)
        }
    } ());
    var n = function() {
        var e = document.createEvent("Event");
        return e.initEvent("foo", !0, !0),
        e.preventDefault(),
        e.defaultPrevented
    } ();
    if (!n) {
        var r = Event.prototype.preventDefault;
        Event.prototype.preventDefault = function() {
            this.cancelable && (r.call(this), Object.defineProperty(this, "defaultPrevented", {
                get: function() {
                    return ! 0
                },
                configurable: !0
            }))
        }
    }
    var i = /Trident/.test(navigator.userAgent);
    if ((!window.CustomEvent || i && "function" != typeof window.CustomEvent) && (window.CustomEvent = function(e, t) {
        t = t || {};
        var n = document.createEvent("CustomEvent");
        return n.initCustomEvent(e, Boolean(t.bubbles), Boolean(t.cancelable), t.detail),
        n
    },
    window.CustomEvent.prototype = window.Event.prototype), !window.Event || i && "function" != typeof window.Event) {
        var o = window.Event;
        window.Event = function(e, t) {
            t = t || {};
            var n = document.createEvent("Event");
            return n.initEvent(e, Boolean(t.bubbles), Boolean(t.cancelable)),
            n
        },
        window.Event.prototype = o.prototype
    }
} (window.WebComponents),
window.CustomElements = window.CustomElements || {
    flags: {}
},
function(e) {
    var t = e.flags,
    n = [],
    r = function(e) {
        n.push(e)
    },
    i = function() {
        n.forEach(function(t) {
            t(e)
        })
    };
    e.addModule = r,
    e.initializeModules = i,
    e.hasNative = Boolean(document.registerElement),
    e.isIE = /Trident/.test(navigator.userAgent),
    e.useNative = !t.register && e.hasNative && !window.ShadowDOMPolyfill && (!window.HTMLImports || window.HTMLImports.useNative)
} (window.CustomElements),
window.CustomElements.addModule(function(e) {
    function t(e, t) {
        n(e,
        function(e) {
            return t(e) ? !0 : void r(e, t)
        }),
        r(e, t)
    }
    function n(e, t, r) {
        var i = e.firstElementChild;
        if (!i) for (i = e.firstChild; i && i.nodeType !== Node.ELEMENT_NODE;) i = i.nextSibling;
        for (; i;) t(i, r) !== !0 && n(i, t, r),
        i = i.nextElementSibling;
        return null
    }
    function r(e, n) {
        for (var r = e.shadowRoot; r;) t(r, n),
        r = r.olderShadowRoot
    }
    function i(e, t) {
        o(e, t, [])
    }
    function o(e, t, n) {
        if (e = window.wrap(e), !(n.indexOf(e) >= 0)) {
            n.push(e);
            for (var r, i = e.querySelectorAll("link[rel=" + a + "]"), s = 0, u = i.length; u > s && (r = i[s]); s++) r["import"] && o(r["import"], t, n);
            t(e)
        }
    }
    var a = window.HTMLImports ? window.HTMLImports.IMPORT_LINK_TYPE: "none";
    e.forDocumentTree = i,
    e.forSubtree = t
}),
window.CustomElements.addModule(function(e) {
    function t(e, t) {
        return n(e, t) || r(e, t)
    }
    function n(t, n) {
        return e.upgrade(t, n) ? !0 : void(n && a(t))
    }
    function r(e, t) {
        b(e,
        function(e) {
            return n(e, t) ? !0 : void 0
        })
    }
    function i(e) {
        T.push(e),
        E || (E = !0, setTimeout(o))
    }
    function o() {
        E = !1;
        for (var e, t = T,
        n = 0,
        r = t.length; r > n && (e = t[n]); n++) e();
        T = []
    }
    function a(e) {
        x ? i(function() {
            s(e)
        }) : s(e)
    }
    function s(e) {
        e.__upgraded__ && !e.__attached && (e.__attached = !0, e.attachedCallback && e.attachedCallback())
    }
    function u(e) {
        c(e),
        b(e,
        function(e) {
            c(e)
        })
    }
    function c(e) {
        x ? i(function() {
            l(e)
        }) : l(e)
    }
    function l(e) {
        e.__upgraded__ && e.__attached && (e.__attached = !1, e.detachedCallback && e.detachedCallback())
    }
    function f(e) {
        for (var t = e,
        n = window.wrap(document); t;) {
            if (t == n) return ! 0;
            t = t.parentNode || t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && t.host
        }
    }
    function d(e) {
        if (e.shadowRoot && !e.shadowRoot.__watched) {
            y.dom && console.log("watching shadow-root for: ", e.localName);
            for (var t = e.shadowRoot; t;) m(t),
            t = t.olderShadowRoot
        }
    }
    function p(e, n) {
        if (y.dom) {
            var r = n[0];
            if (r && "childList" === r.type && r.addedNodes && r.addedNodes) {
                for (var i = r.addedNodes[0]; i && i !== document && !i.host;) i = i.parentNode;
                var o = i && (i.URL || i._URL || i.host && i.host.localName) || "";
                o = o.split("/?").shift().split("/").pop()
            }
            console.group("mutations (%d) [%s]", n.length, o || "")
        }
        var a = f(e);
        n.forEach(function(e) {
            "childList" === e.type && (_(e.addedNodes,
            function(e) {
                e.localName && t(e, a)
            }), _(e.removedNodes,
            function(e) {
                e.localName && u(e)
            }))
        }),
        y.dom && console.groupEnd()
    }
    function h(e) {
        for (e = window.wrap(e), e || (e = window.wrap(document)); e.parentNode;) e = e.parentNode;
        var t = e.__observer;
        t && (p(e, t.takeRecords()), o())
    }
    function m(e) {
        if (!e.__observer) {
            var t = new MutationObserver(p.bind(this, e));
            t.observe(e, {
                childList: !0,
                subtree: !0
            }),
            e.__observer = t
        }
    }
    function v(e) {
        e = window.wrap(e),
        y.dom && console.group("upgradeDocument: ", e.baseURI.split("/").pop());
        var n = e === window.wrap(document);
        t(e, n),
        m(e),
        y.dom && console.groupEnd()
    }
    function g(e) {
        w(e, v)
    }
    var y = e.flags,
    b = e.forSubtree,
    w = e.forDocumentTree,
    x = window.MutationObserver._isPolyfilled && y["throttle-attached"];
    e.hasPolyfillMutations = x,
    e.hasThrottledAttached = x;
    var E = !1,
    T = [],
    _ = Array.prototype.forEach.call.bind(Array.prototype.forEach),
    k = Element.prototype.createShadowRoot;
    k && (Element.prototype.createShadowRoot = function() {
        var e = k.call(this);
        return window.CustomElements.watchShadow(this),
        e
    }),
    e.watchShadow = d,
    e.upgradeDocumentTree = g,
    e.upgradeDocument = v,
    e.upgradeSubtree = r,
    e.upgradeAll = t,
    e.attached = a,
    e.takeRecords = h
}),
window.CustomElements.addModule(function(e) {
    function t(t, r) {
        if ("template" === t.localName && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(t), !t.__upgraded__ && t.nodeType === Node.ELEMENT_NODE) {
            var i = t.getAttribute("is"),
            o = e.getRegisteredDefinition(t.localName) || e.getRegisteredDefinition(i);
            if (o && (i && o.tag == t.localName || !i && !o["extends"])) return n(t, o, r)
        }
    }
    function n(t, n, i) {
        return a.upgrade && console.group("upgrade:", t.localName),
        n.is && t.setAttribute("is", n.is),
        r(t, n),
        t.__upgraded__ = !0,
        o(t),
        i && e.attached(t),
        e.upgradeSubtree(t, i),
        a.upgrade && console.groupEnd(),
        t
    }
    function r(e, t) {
        Object.__proto__ ? e.__proto__ = t.prototype: (i(e, t.prototype, t["native"]), e.__proto__ = t.prototype)
    }
    function i(e, t, n) {
        for (var r = {},
        i = t; i !== n && i !== HTMLElement.prototype;) {
            for (var o, a = Object.getOwnPropertyNames(i), s = 0; o = a[s]; s++) r[o] || (Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(i, o)), r[o] = 1);
            i = Object.getPrototypeOf(i)
        }
    }
    function o(e) {
        e.createdCallback && e.createdCallback()
    }
    var a = e.flags;
    e.upgrade = t,
    e.upgradeWithDefinition = n,
    e.implementPrototype = r
}),
window.CustomElements.addModule(function(e) {
    function t(t, r) {
        var u = r || {};
        if (!t) throw new Error("document.registerElement: first argument `name` must not be empty");
        if (t.indexOf("-") < 0) throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '" + String(t) + "'.");
        if (i(t)) throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '" + String(t) + "'. The type name is invalid.");
        if (c(t)) throw new Error("DuplicateDefinitionError: a type with name '" + String(t) + "' is already registered");
        return u.prototype || (u.prototype = Object.create(HTMLElement.prototype)),
        u.__name = t.toLowerCase(),
        u.lifecycle = u.lifecycle || {},
        u.ancestry = o(u["extends"]),
        a(u),
        s(u),
        n(u.prototype),
        l(u.__name, u),
        u.ctor = f(u),
        u.ctor.prototype = u.prototype,
        u.prototype.constructor = u.ctor,
        e.ready && g(document),
        u.ctor
    }
    function n(e) {
        if (!e.setAttribute._polyfilled) {
            var t = e.setAttribute;
            e.setAttribute = function(e, n) {
                r.call(this, e, n, t)
            };
            var n = e.removeAttribute;
            e.removeAttribute = function(e) {
                r.call(this, e, null, n)
            },
            e.setAttribute._polyfilled = !0
        }
    }
    function r(e, t, n) {
        e = e.toLowerCase();
        var r = this.getAttribute(e);
        n.apply(this, arguments);
        var i = this.getAttribute(e);
        this.attributeChangedCallback && i !== r && this.attributeChangedCallback(e, r, i)
    }
    function i(e) {
        for (var t = 0; t < E.length; t++) if (e === E[t]) return ! 0
    }
    function o(e) {
        var t = c(e);
        return t ? o(t["extends"]).concat([t]) : []
    }
    function a(e) {
        for (var t, n = e["extends"], r = 0; t = e.ancestry[r]; r++) n = t.is && t.tag;
        e.tag = n || e.__name,
        n && (e.is = e.__name)
    }
    function s(e) {
        if (!Object.__proto__) {
            var t = HTMLElement.prototype;
            if (e.is) {
                var n = document.createElement(e.tag);
                t = Object.getPrototypeOf(n)
            }
            for (var r, i = e.prototype,
            o = !1; i;) i == t && (o = !0),
            r = Object.getPrototypeOf(i),
            r && (i.__proto__ = r),
            i = r;
            o || console.warn(e.tag + " prototype not found in prototype chain for " + e.is),
            e["native"] = t
        }
    }
    function u(e) {
        return b(k(e.tag), e)
    }
    function c(e) {
        return e ? T[e.toLowerCase()] : void 0
    }
    function l(e, t) {
        T[e] = t
    }
    function f(e) {
        return function() {
            return u(e)
        }
    }
    function d(e, t, n) {
        return e === _ ? p(t, n) : C(e, t)
    }
    function p(e, t) {
        e && (e = e.toLowerCase()),
        t && (t = t.toLowerCase());
        var n = c(t || e);
        if (n) {
            if (e == n.tag && t == n.is) return new n.ctor;
            if (!t && !n.is) return new n.ctor
        }
        var r;
        return t ? (r = p(e), r.setAttribute("is", t), r) : (r = k(e), e.indexOf("-") >= 0 && w(r, HTMLElement), r)
    }
    function h(e, t) {
        var n = e[t];
        e[t] = function() {
            var e = n.apply(this, arguments);
            return y(e),
            e
        }
    }
    var m, v = e.isIE,
    g = e.upgradeDocumentTree,
    y = e.upgradeAll,
    b = e.upgradeWithDefinition,
    w = e.implementPrototype,
    x = e.useNative,
    E = ["annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph"],
    T = {},
    _ = "http://www.w3.org/1999/xhtml",
    k = document.createElement.bind(document),
    C = document.createElementNS.bind(document);
    m = Object.__proto__ || x ?
    function(e, t) {
        return e instanceof t
    }: function(e, t) {
        if (e instanceof t) return ! 0;
        for (var n = e; n;) {
            if (n === t.prototype) return ! 0;
            n = n.__proto__
        }
        return ! 1
    },
    h(Node.prototype, "cloneNode"),
    h(document, "importNode"),
    v && !
    function() {
        var e = document.importNode;
        document.importNode = function() {
            var t = e.apply(document, arguments);
            if (t.nodeType == t.DOCUMENT_FRAGMENT_NODE) {
                var n = document.createDocumentFragment();
                return n.appendChild(t),
                n
            }
            return t
        }
    } (),
    document.registerElement = t,
    document.createElement = p,
    document.createElementNS = d,
    e.registry = T,
    e["instanceof"] = m,
    e.reservedTagList = E,
    e.getRegisteredDefinition = c,
    document.register = document.registerElement
}),
function(e) {
    function t() {
        o(window.wrap(document)),
        window.CustomElements.ready = !0;
        var e = window.requestAnimationFrame ||
        function(e) {
            setTimeout(e, 16)
        };
        e(function() {
            setTimeout(function() {
                window.CustomElements.readyTime = Date.now(),
                window.HTMLImports && (window.CustomElements.elapsed = window.CustomElements.readyTime - window.HTMLImports.readyTime),
                document.dispatchEvent(new CustomEvent("WebComponentsReady", {
                    bubbles: !0
                }))
            })
        })
    }
    var n = e.useNative,
    r = e.initializeModules;
    e.isIE;
    if (n) {
        var i = function() {};
        e.watchShadow = i,
        e.upgrade = i,
        e.upgradeAll = i,
        e.upgradeDocumentTree = i,
        e.upgradeSubtree = i,
        e.takeRecords = i,
        e["instanceof"] = function(e, t) {
            return e instanceof t
        }
    } else r();
    var o = e.upgradeDocumentTree,
    a = e.upgradeDocument;
    if (window.wrap || (window.ShadowDOMPolyfill ? (window.wrap = window.ShadowDOMPolyfill.wrapIfNeeded, window.unwrap = window.ShadowDOMPolyfill.unwrapIfNeeded) : window.wrap = window.unwrap = function(e) {
        return e
    }), window.HTMLImports && (window.HTMLImports.__importsParsingHook = function(e) {
        e["import"] && a(wrap(e["import"]))
    }), "complete" === document.readyState || e.flags.eager) t();
    else if ("interactive" !== document.readyState || window.attachEvent || window.HTMLImports && !window.HTMLImports.ready) {
        var s = window.HTMLImports && !window.HTMLImports.ready ? "HTMLImportsLoaded": "DOMContentLoaded";
        window.addEventListener(s, t)
    } else t()
} (window.CustomElements),
function(e) {
    "use strict";
    function t(e) {
        return void 0 !== d[e]
    }
    function n() {
        s.call(this),
        this._isInvalid = !0
    }
    function r(e) {
        return "" == e && n.call(this),
        e.toLowerCase()
    }
    function i(e) {
        var t = e.charCodeAt(0);
        return t > 32 && 127 > t && -1 == [34, 35, 60, 62, 63, 96].indexOf(t) ? e: encodeURIComponent(e)
    }
    function o(e) {
        var t = e.charCodeAt(0);
        return t > 32 && 127 > t && -1 == [34, 35, 60, 62, 96].indexOf(t) ? e: encodeURIComponent(e)
    }
    function a(e, a, s) {
        function u(e) {
            b.push(e)
        }
        var c = a || "scheme start",
        l = 0,
        f = "",
        g = !1,
        y = !1,
        b = [];
        e: for (; (e[l - 1] != h || 0 == l) && !this._isInvalid;) {
            var w = e[l];
            switch (c) {
            case "scheme start":
                if (!w || !m.test(w)) {
                    if (a) {
                        u("Invalid scheme.");
                        break e
                    }
                    f = "",
                    c = "no scheme";
                    continue
                }
                f += w.toLowerCase(),
                c = "scheme";
                break;
            case "scheme":
                if (w && v.test(w)) f += w.toLowerCase();
                else {
                    if (":" != w) {
                        if (a) {
                            if (h == w) break e;
                            u("Code point not allowed in scheme: " + w);
                            break e
                        }
                        f = "",
                        l = 0,
                        c = "no scheme";
                        continue
                    }
                    if (this._scheme = f, f = "", a) break e;
                    t(this._scheme) && (this._isRelative = !0),
                    c = "file" == this._scheme ? "relative": this._isRelative && s && s._scheme == this._scheme ? "relative or authority": this._isRelative ? "authority first slash": "scheme data"
                }
                break;
            case "scheme data":
                "?" == w ? (query = "?", c = "query") : "#" == w ? (this._fragment = "#", c = "fragment") : h != w && "	" != w && "\n" != w && "\r" != w && (this._schemeData += i(w));
                break;
            case "no scheme":
                if (s && t(s._scheme)) {
                    c = "relative";
                    continue
                }
                u("Missing scheme."),
                n.call(this);
                break;
            case "relative or authority":
                if ("/" != w || "/" != e[l + 1]) {
                    u("Expected /, got: " + w),
                    c = "relative";
                    continue
                }
                c = "authority ignore slashes";
                break;
            case "relative":
                if (this._isRelative = !0, "file" != this._scheme && (this._scheme = s._scheme), h == w) {
                    this._host = s._host,
                    this._port = s._port,
                    this._path = s._path.slice(),
                    this._query = s._query,
                    this._username = s._username,
                    this._password = s._password;
                    break e
                }
                if ("/" == w || "\\" == w)"\\" == w && u("\\ is an invalid code point."),
                c = "relative slash";
                else if ("?" == w) this._host = s._host,
                this._port = s._port,
                this._path = s._path.slice(),
                this._query = "?",
                this._username = s._username,
                this._password = s._password,
                c = "query";
                else {
                    if ("#" != w) {
                        var x = e[l + 1],
                        E = e[l + 2]; ("file" != this._scheme || !m.test(w) || ":" != x && "|" != x || h != E && "/" != E && "\\" != E && "?" != E && "#" != E) && (this._host = s._host, this._port = s._port, this._username = s._username, this._password = s._password, this._path = s._path.slice(), this._path.pop()),
                        c = "relative path";
                        continue
                    }
                    this._host = s._host,
                    this._port = s._port,
                    this._path = s._path.slice(),
                    this._query = s._query,
                    this._fragment = "#",
                    this._username = s._username,
                    this._password = s._password,
                    c = "fragment"
                }
                break;
            case "relative slash":
                if ("/" != w && "\\" != w) {
                    "file" != this._scheme && (this._host = s._host, this._port = s._port, this._username = s._username, this._password = s._password),
                    c = "relative path";
                    continue
                }
                "\\" == w && u("\\ is an invalid code point."),
                c = "file" == this._scheme ? "file host": "authority ignore slashes";
                break;
            case "authority first slash":
                if ("/" != w) {
                    u("Expected '/', got: " + w),
                    c = "authority ignore slashes";
                    continue
                }
                c = "authority second slash";
                break;
            case "authority second slash":
                if (c = "authority ignore slashes", "/" != w) {
                    u("Expected '/', got: " + w);
                    continue
                }
                break;
            case "authority ignore slashes":
                if ("/" != w && "\\" != w) {
                    c = "authority";
                    continue
                }
                u("Expected authority, got: " + w);
                break;
            case "authority":
                if ("@" == w) {
                    g && (u("@ already seen."), f += "%40"),
                    g = !0;
                    for (var T = 0; T < f.length; T++) {
                        var _ = f[T];
                        if ("	" != _ && "\n" != _ && "\r" != _) if (":" != _ || null !== this._password) {
                            var k = i(_);
                            null !== this._password ? this._password += k: this._username += k
                        } else this._password = "";
                        else u("Invalid whitespace in authority.")
                    }
                    f = ""
                } else {
                    if (h == w || "/" == w || "\\" == w || "?" == w || "#" == w) {
                        l -= f.length,
                        f = "",
                        c = "host";
                        continue
                    }
                    f += w
                }
                break;
            case "file host":
                if (h == w || "/" == w || "\\" == w || "?" == w || "#" == w) {
                    2 != f.length || !m.test(f[0]) || ":" != f[1] && "|" != f[1] ? 0 == f.length ? c = "relative path start": (this._host = r.call(this, f), f = "", c = "relative path start") : c = "relative path";
                    continue
                }
                "	" == w || "\n" == w || "\r" == w ? u("Invalid whitespace in file host.") : f += w;
                break;
            case "host":
            case "hostname":
                if (":" != w || y) {
                    if (h == w || "/" == w || "\\" == w || "?" == w || "#" == w) {
                        if (this._host = r.call(this, f), f = "", c = "relative path start", a) break e;
                        continue
                    }
                    "	" != w && "\n" != w && "\r" != w ? ("[" == w ? y = !0 : "]" == w && (y = !1), f += w) : u("Invalid code point in host/hostname: " + w)
                } else if (this._host = r.call(this, f), f = "", c = "port", "hostname" == a) break e;
                break;
            case "port":
                if (/[0-9]/.test(w)) f += w;
                else {
                    if (h == w || "/" == w || "\\" == w || "?" == w || "#" == w || a) {
                        if ("" != f) {
                            var C = parseInt(f, 10);
                            C != d[this._scheme] && (this._port = C + ""),
                            f = ""
                        }
                        if (a) break e;
                        c = "relative path start";
                        continue
                    }
                    "	" == w || "\n" == w || "\r" == w ? u("Invalid code point in port: " + w) : n.call(this)
                }
                break;
            case "relative path start":
                if ("\\" == w && u("'\\' not allowed in path."), c = "relative path", "/" != w && "\\" != w) continue;
                break;
            case "relative path":
                if (h != w && "/" != w && "\\" != w && (a || "?" != w && "#" != w))"	" != w && "\n" != w && "\r" != w && (f += i(w));
                else {
                    "\\" == w && u("\\ not allowed in relative path.");
                    var j; (j = p[f.toLowerCase()]) && (f = j),
                    ".." == f ? (this._path.pop(), "/" != w && "\\" != w && this._path.push("")) : "." == f && "/" != w && "\\" != w ? this._path.push("") : "." != f && ("file" == this._scheme && 0 == this._path.length && 2 == f.length && m.test(f[0]) && "|" == f[1] && (f = f[0] + ":"), this._path.push(f)),
                    f = "",
                    "?" == w ? (this._query = "?", c = "query") : "#" == w && (this._fragment = "#", c = "fragment")
                }
                break;
            case "query":
                a || "#" != w ? h != w && "	" != w && "\n" != w && "\r" != w && (this._query += o(w)) : (this._fragment = "#", c = "fragment");
                break;
            case "fragment":
                h != w && "	" != w && "\n" != w && "\r" != w && (this._fragment += w)
            }
            l++
        }
    }
    function s() {
        this._scheme = "",
        this._schemeData = "",
        this._username = "",
        this._password = null,
        this._host = "",
        this._port = "",
        this._path = [],
        this._query = "",
        this._fragment = "",
        this._isInvalid = !1,
        this._isRelative = !1
    }
    function u(e, t) {
        void 0 === t || t instanceof u || (t = new u(String(t))),
        this._url = e,
        s.call(this);
        var n = e.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");
        a.call(this, n, null, t)
    }
    var c = !1;
    if (!e.forceJURL) try {
        var l = new URL("b", "http://a");
        l.pathname = "c%20d",
        c = "http://a/c%20d" === l.href
    } catch(f) {}
    if (!c) {
        var d = Object.create(null);
        d.ftp = 21,
        d.file = 0,
        d.gopher = 70,
        d.http = 80,
        d.https = 443,
        d.ws = 80,
        d.wss = 443;
        var p = Object.create(null);
        p["%2e"] = ".",
        p[".%2e"] = "..",
        p["%2e."] = "..",
        p["%2e%2e"] = "..";
        var h = void 0,
        m = /[a-zA-Z]/,
        v = /[a-zA-Z0-9\+\-\.]/;
        u.prototype = {
            toString: function() {
                return this.href
            },
            get href() {
                if (this._isInvalid) return this._url;
                var e = "";
                return ("" != this._username || null != this._password) && (e = this._username + (null != this._password ? ":" + this._password: "") + "@"),
                this.protocol + (this._isRelative ? "//" + e + this.host: "") + this.pathname + this._query + this._fragment
            },
            set href(e) {
                s.call(this),
                a.call(this, e)
            },
            get protocol() {
                return this._scheme + ":"
            },
            set protocol(e) {
                this._isInvalid || a.call(this, e + ":", "scheme start")
            },
            get host() {
                return this._isInvalid ? "": this._port ? this._host + ":" + this._port: this._host
            },
            set host(e) { ! this._isInvalid && this._isRelative && a.call(this, e, "host")
            },
            get hostname() {
                return this._host
            },
            set hostname(e) { ! this._isInvalid && this._isRelative && a.call(this, e, "hostname")
            },
            get port() {
                return this._port
            },
            set port(e) { ! this._isInvalid && this._isRelative && a.call(this, e, "port")
            },
            get pathname() {
                return this._isInvalid ? "": this._isRelative ? "/" + this._path.join("/") : this._schemeData
            },
            set pathname(e) { ! this._isInvalid && this._isRelative && (this._path = [], a.call(this, e, "relative path start"))
            },
            get search() {
                return this._isInvalid || !this._query || "?" == this._query ? "": this._query
            },
            set search(e) { ! this._isInvalid && this._isRelative && (this._query = "?", "?" == e[0] && (e = e.slice(1)), a.call(this, e, "query"))
            },
            get hash() {
                return this._isInvalid || !this._fragment || "#" == this._fragment ? "": this._fragment
            },
            set hash(e) {
                this._isInvalid || (this._fragment = "#", "#" == e[0] && (e = e.slice(1)), a.call(this, e, "fragment"))
            },
            get origin() {
                var e;
                if (this._isInvalid || !this._scheme) return "";
                switch (this._scheme) {
                case "data":
                case "file":
                case "javascript":
                case "mailto":
                    return "null"
                }
                return e = this.host,
                e ? this._scheme + "://" + e: ""
            }
        };
        var g = e.URL;
        g && (u.createObjectURL = function(e) {
            return g.createObjectURL.apply(g, arguments)
        },
        u.revokeObjectURL = function(e) {
            g.revokeObjectURL(e)
        }),
        e.URL = u
    }
} (this);
var URLSearchParams = URLSearchParams ||
function() {
    "use strict";
    function e(e) {
        return encodeURIComponent(e).replace(o, u)
    }
    function t(e) {
        return decodeURIComponent(e.replace(a, " "))
    }
    function n(e) {
        if (this[l] = Object.create(null), e) for (var n, r, i = (e || "").split("&"), o = 0, a = i.length; a > o; o++) r = i[o],
        n = r.indexOf("="),
        n > -1 && this.append(t(r.slice(0, n)), t(r.slice(n + 1)))
    }
    function r() {
        try {
            return !! Symbol.iterator
        } catch(e) {
            return ! 1
        }
    }
    var i = n.prototype,
    o = /[!'\(\)~]|%20|%00/g,
    a = /\+/g,
    s = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\x00"
    },
    u = function(e) {
        return s[e]
    },
    c = r(),
    l = "__URLSearchParams__:" + Math.random();
    i.append = function(e, t) {
        var n = this[l];
        e in n ? n[e].push("" + t) : n[e] = ["" + t]
    },
    i["delete"] = function(e) {
        delete this[l][e]
    },
    i.get = function(e) {
        var t = this[l];
        return e in t ? t[e][0] : null
    },
    i.getAll = function(e) {
        var t = this[l];
        return e in t ? t[e].slice(0) : []
    },
    i.has = function(e) {
        return e in this[l]
    },
    i.set = function(e, t) {
        this[l][e] = ["" + t]
    },
    i.forEach = function(e, t) {
        var n = this[l];
        Object.getOwnPropertyNames(n).forEach(function(r) {
            n[r].forEach(function(n) {
                e.call(t, n, r, this)
            },
            this)
        },
        this)
    },
    i.keys = function() {
        var e = [];
        this.forEach(function(t, n) {
            e.push(n)
        });
        var t = {
            next: function() {
                var t = e.shift();
                return {
                    done: void 0 === t,
                    value: t
                }
            }
        };
        return c && (t[Symbol.iterator] = function() {
            return t
        }),
        t
    },
    i.values = function() {
        var e = [];
        this.forEach(function(t) {
            e.push(t)
        });
        var t = {
            next: function() {
                var t = e.shift();
                return {
                    done: void 0 === t,
                    value: t
                }
            }
        };
        return c && (t[Symbol.iterator] = function() {
            return t
        }),
        t
    },
    i.entries = function() {
        var e = [];
        this.forEach(function(t, n) {
            e.push([n, t])
        });
        var t = {
            next: function() {
                var t = e.shift();
                return {
                    done: void 0 === t,
                    value: t
                }
            }
        };
        return c && (t[Symbol.iterator] = function() {
            return t
        }),
        t
    },
    c && (i[Symbol.iterator] = i.entries),
    i.toJSON = function() {
        return {}
    },
    i.toString = function() {
        var t, n, r, i, o = this[l],
        a = [];
        for (n in o) for (r = e(n), t = 0, i = o[n]; t < i.length; t++) a.push(r + "=" + e(i[t]));
        return a.join("&")
    };
    var f = Object.defineProperty,
    d = Object.getOwnPropertyDescriptor,
    p = function(e) {
        function t(t, n) {
            i.append.call(this, t, n),
            t = this.toString(),
            e.set.call(this._usp, t ? "?" + t: "")
        }
        function n(t) {
            i["delete"].call(this, t),
            t = this.toString(),
            e.set.call(this._usp, t ? "?" + t: "")
        }
        function r(t, n) {
            i.set.call(this, t, n),
            t = this.toString(),
            e.set.call(this._usp, t ? "?" + t: "")
        }
        return function(e, i) {
            return e.append = t,
            e["delete"] = n,
            e.set = r,
            f(e, "_usp", {
                configurable: !0,
                writable: !0,
                value: i
            })
        }
    },
    h = function(e) {
        return function(t, n) {
            return f(t, "_searchParams", {
                configurable: !0,
                writable: !0,
                value: e(n, t)
            }),
            n
        }
    },
    m = function(e) {
        var t = e.append;
        e.append = i.append,
        n.call(e, e._usp.search.slice(1)),
        e.append = t
    },
    v = function(e, t) {
        if (! (e instanceof t)) throw new TypeError("'searchParams' accessed on an object that does not implement interface " + t.name);
    },
    g = function(e) {
        var t, r = e.prototype,
        i = d(r, "searchParams"),
        o = d(r, "href"),
        a = d(r, "search"); ! i && a && a.set && (t = h(p(a)), Object.defineProperties(r, {
            href: {
                get: function() {
                    return o.get.call(this)
                },
                set: function(e) {
                    var t = this._searchParams;
                    o.set.call(this, e),
                    t && m(t)
                }
            },
            search: {
                get: function() {
                    return a.get.call(this)
                },
                set: function(e) {
                    var t = this._searchParams;
                    a.set.call(this, e),
                    t && m(t)
                }
            },
            searchParams: {
                get: function() {
                    return v(this, e),
                    this._searchParams || t(this, new n(this.search.slice(1)))
                },
                set: function(n) {
                    v(this, e),
                    t(this, n)
                }
            }
        }))
    };
    return g(HTMLAnchorElement),
    /^function|object$/.test(typeof URL) && g(URL),
    n
} (); !
function(e) {
    "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector ||
    function(e) {
        for (var t = this,
        n = (t.document || t.ownerDocument).querySelectorAll(e), r = 0; n[r] && n[r] !== t;)++r;
        return !! n[r]
    }),
    "function" != typeof e.closest && (e.closest = function(e) {
        for (var t = this; t && 11 != t.nodeType;) {
            if (t.matches(e)) return t;
            t = t.parentElement
        }
        return null
    })
} (Element.prototype),
function(e) {
    function t(e) {
        return "string" == typeof e ? document.createTextNode(e) : e
    }
    function n(e) {
        if (e.length) {
            if (1 === e.length) return t(e[0]);
            var n, r = document.createDocumentFragment();
            for (n = 0; n < e.length; n++) r.appendChild(t(e[n]));
            return r
        }
        throw new Error("DOM Exception 8")
    }
    "prepend" in e || (e.prepend = function() {
        this.insertBefore(n(arguments), this.firstChild)
    }),
    "append" in e || (e.append = function() {
        this.appendChild(n(arguments))
    }),
    "before" in e || (e.before = function() {
        this.parentNode && this.parentNode.insertBefore(n(arguments), this)
    }),
    "after" in e || (e.after = function() {
        this.parentNode && this.parentNode.insertBefore(n(arguments), this.nextSibling)
    }),
    "replaceWith" in e || (e.replaceWith = function() {
        this.parentNode && this.parentNode.replaceChild(n(arguments), this)
    }),
    "remove" in e || (e.remove = function() {
        this.parentNode && this.parentNode.removeChild(this)
    })
} (Element.prototype),
String.prototype.endsWith || !
function() {
    "use strict";
    var e = function() {
        try {
            var e = {},
            t = Object.defineProperty,
            n = t(e, e, e) && t
        } catch(r) {}
        return n
    } (),
    t = {}.toString,
    n = function(e) {
        if (null == this) throw TypeError();
        var n = String(this);
        if (e && "[object RegExp]" == t.call(e)) throw TypeError();
        var r = n.length,
        i = String(e),
        o = i.length,
        a = r;
        if (arguments.length > 1) {
            var s = arguments[1];
            void 0 !== s && (a = s ? Number(s) : 0, a != a && (a = 0))
        }
        var u = Math.min(Math.max(a, 0), r),
        c = u - o;
        if (0 > c) return ! 1;
        for (var l = -1; ++l < o;) if (n.charCodeAt(c + l) != i.charCodeAt(l)) return ! 1;
        return ! 0
    };
    e ? e(String.prototype, "endsWith", {
        value: n,
        configurable: !0,
        writable: !0
    }) : String.prototype.endsWith = n
} (),
String.prototype.startsWith || !
function() {
    "use strict";
    var e = function() {
        try {
            var e = {},
            t = Object.defineProperty,
            n = t(e, e, e) && t
        } catch(r) {}
        return n
    } (),
    t = {}.toString,
    n = function(e) {
        if (null == this) throw TypeError();
        var n = String(this);
        if (e && "[object RegExp]" == t.call(e)) throw TypeError();
        var r = n.length,
        i = String(e),
        o = i.length,
        a = arguments.length > 1 ? arguments[1] : void 0,
        s = a ? Number(a) : 0;
        s != s && (s = 0);
        var u = Math.min(Math.max(s, 0), r);
        if (o + u > r) return ! 1;
        for (var c = -1; ++c < o;) if (n.charCodeAt(u + c) != i.charCodeAt(c)) return ! 1;
        return ! 0
    };
    e ? e(String.prototype, "startsWith", {
        value: n,
        configurable: !0,
        writable: !0
    }) : String.prototype.startsWith = n
} (),
Array.from || !
function() {
    "use strict";
    var e = function() {
        try {
            var e = {},
            t = Object.defineProperty,
            n = t(e, e, e) && t
        } catch(r) {}
        return n ||
        function(e, t, n) {
            e[t] = n.value
        }
    } (),
    t = Object.prototype.toString,
    n = function(e) {
        return "function" == typeof e || "[object Function]" == t.call(e)
    },
    r = function(e) {
        var t = Number(e);
        return isNaN(t) ? 0 : 0 != t && isFinite(t) ? (t > 0 ? 1 : -1) * Math.floor(Math.abs(t)) : t
    },
    i = Math.pow(2, 53) - 1,
    o = function(e) {
        var t = r(e);
        return Math.min(Math.max(t, 0), i)
    },
    a = function(t) {
        var r = this;
        if (null == t) throw new TypeError("`Array.from` requires an array-like object, not `null` or `undefined`");
        var i, a, s = Object(t);
        arguments.length > 1;
        if (arguments.length > 1) {
            if (i = arguments[1], !n(i)) throw new TypeError("When provided, the second argument to `Array.from` must be a function");
            arguments.length > 2 && (a = arguments[2])
        }
        for (var u, c, l = o(s.length), f = n(r) ? Object(new r(l)) : new Array(l), d = 0; l > d;) u = s[d],
        c = i ? "undefined" == typeof a ? i(u, d) : i.call(a, u, d) : u,
        e(f, d, {
            value: c,
            configurable: !0,
            enumerable: !0
        }),
        ++d;
        return f.length = l,
        f
    };
    e(Array, "from", {
        value: a,
        configurable: !0,
        writable: !0
    })
} (),
function(e) {
    "use strict";
    "undefined" == typeof e && (e = {}),
    "undefined" == typeof e.performance && (e.performance = {}),
    e._perfRefForUserTimingPolyfill = e.performance,
    e.performance.userTimingJsNow = !1,
    e.performance.userTimingJsNowPrefixed = !1,
    e.performance.userTimingJsUserTiming = !1,
    e.performance.userTimingJsUserTimingPrefixed = !1,
    e.performance.userTimingJsPerformanceTimeline = !1,
    e.performance.userTimingJsPerformanceTimelinePrefixed = !1;
    var t, n, r = [],
    i = [],
    o = null;
    if ("function" != typeof e.performance.now) {
        for (e.performance.userTimingJsNow = !0, i = ["webkitNow", "msNow", "mozNow"], t = 0; t < i.length; t++) if ("function" == typeof e.performance[i[t]]) {
            e.performance.now = e.performance[i[t]],
            e.performance.userTimingJsNowPrefixed = !0;
            break
        }
        var a = +new Date;
        e.performance.timing && e.performance.timing.navigationStart && (a = e.performance.timing.navigationStart),
        "function" != typeof e.performance.now && (Date.now ? e.performance.now = function() {
            return Date.now() - a
        }: e.performance.now = function() {
            return + new Date - a
        })
    }
    var s = function() {},
    u = function() {},
    c = [],
    l = !1,
    f = !1;
    if ("function" != typeof e.performance.getEntries || "function" != typeof e.performance.mark) {
        for ("function" == typeof e.performance.getEntries && "function" != typeof e.performance.mark && (f = !0), e.performance.userTimingJsPerformanceTimeline = !0, r = ["webkit", "moz"], i = ["getEntries", "getEntriesByName", "getEntriesByType"], t = 0; t < i.length; t++) for (n = 0; n < r.length; n++) o = r[n] + i[t].substr(0, 1).toUpperCase() + i[t].substr(1),
        "function" == typeof e.performance[o] && (e.performance[i[t]] = e.performance[o], e.performance.userTimingJsPerformanceTimelinePrefixed = !0);
        s = function(e) {
            c.push(e),
            "measure" === e.entryType && (l = !0)
        };
        var d = function() {
            l && (c.sort(function(e, t) {
                return e.startTime - t.startTime
            }), l = !1)
        };
        if (u = function(e, n) {
            for (t = 0; t < c.length;) c[t].entryType === e && ("undefined" == typeof n || c[t].name === n) ? c.splice(t, 1) : t++
        },
        "function" != typeof e.performance.getEntries || f) {
            var p = e.performance.getEntries;
            e.performance.getEntries = function() {
                d();
                var t = c.slice(0);
                return f && p && (Array.prototype.push.apply(t, p.call(e.performance)), t.sort(function(e, t) {
                    return e.startTime - t.startTime
                })),
                t
            }
        }
        if ("function" != typeof e.performance.getEntriesByType || f) {
            var h = e.performance.getEntriesByType;
            e.performance.getEntriesByType = function(n) {
                if ("undefined" == typeof n || "mark" !== n && "measure" !== n) return f && h ? h.call(e.performance, n) : [];
                "measure" === n && d();
                var r = [];
                for (t = 0; t < c.length; t++) c[t].entryType === n && r.push(c[t]);
                return r
            }
        }
        if ("function" != typeof e.performance.getEntriesByName || f) {
            var m = e.performance.getEntriesByName;
            e.performance.getEntriesByName = function(n, r) {
                if (r && "mark" !== r && "measure" !== r) return f && m ? m.call(e.performance, n, r) : [];
                "undefined" != typeof r && "measure" === r && d();
                var i = [];
                for (t = 0; t < c.length; t++)("undefined" == typeof r || c[t].entryType === r) && c[t].name === n && i.push(c[t]);
                return f && m && (Array.prototype.push.apply(i, m.call(e.performance, n, r)), i.sort(function(e, t) {
                    return e.startTime - t.startTime
                })),
                i
            }
        }
    }
    if ("function" != typeof e.performance.mark) {
        for (e.performance.userTimingJsUserTiming = !0, r = ["webkit", "moz", "ms"], i = ["mark", "measure", "clearMarks", "clearMeasures"], t = 0; t < i.length; t++) for (n = 0; n < r.length; n++) o = r[n] + i[t].substr(0, 1).toUpperCase() + i[t].substr(1),
        "function" == typeof e.performance[o] && (e.performance[i[t]] = e.performance[o], e.performance.userTimingJsUserTimingPrefixed = !0);
        var v = {};
        "function" != typeof e.performance.mark && (e.performance.mark = function(t) {
            var n = e.performance.now();
            if ("undefined" == typeof t) throw new SyntaxError("Mark name must be specified");
            if (e.performance.timing && t in e.performance.timing) throw new SyntaxError("Mark name is not allowed");
            v[t] || (v[t] = []),
            v[t].push(n),
            s({
                entryType: "mark",
                name: t,
                startTime: n,
                duration: 0
            })
        }),
        "function" != typeof e.performance.clearMarks && (e.performance.clearMarks = function(e) {
            e ? v[e] = [] : v = {},
            u("mark", e)
        }),
        "function" != typeof e.performance.measure && (e.performance.measure = function(t, n, r) {
            var i = e.performance.now();
            if ("undefined" == typeof t) throw new SyntaxError("Measure must be specified");
            if (!n) return void s({
                entryType: "measure",
                name: t,
                startTime: 0,
                duration: i
            });
            var o = 0;
            if (e.performance.timing && n in e.performance.timing) {
                if ("navigationStart" !== n && 0 === e.performance.timing[n]) throw new Error(n + " has a timing of 0");
                o = e.performance.timing[n] - e.performance.timing.navigationStart
            } else {
                if (! (n in v)) throw new Error(n + " mark not found");
                o = v[n][v[n].length - 1]
            }
            var a = i;
            if (r) if (a = 0, e.performance.timing && r in e.performance.timing) {
                if ("navigationStart" !== r && 0 === e.performance.timing[r]) throw new Error(r + " has a timing of 0");
                a = e.performance.timing[r] - e.performance.timing.navigationStart
            } else {
                if (! (r in v)) throw new Error(r + " mark not found");
                a = v[r][v[r].length - 1]
            }
            var u = a - o;
            s({
                entryType: "measure",
                name: t,
                startTime: o,
                duration: u
            })
        }),
        "function" != typeof e.performance.clearMeasures && (e.performance.clearMeasures = function(e) {
            u("measure", e)
        })
    }
    "undefined" != typeof define && define.amd ? define([],
    function() {
        return e.performance
    }) : "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = e.performance)
} ("undefined" != typeof window ? window: void 0),
!
function(e) {
    "use strict";
    function t(e, t, n, i) {
        var o = Object.create((t || r).prototype),
        a = new d(i || []);
        return o._invoke = c(e, n, a),
        o
    }
    function n(e, t, n) {
        try {
            return {
                type: "normal",
                arg: e.call(t, n)
            }
        } catch(r) {
            return {
                type: "throw",
                arg: r
            }
        }
    }
    function r() {}
    function i() {}
    function o() {}
    function a(e) { ["next", "throw", "return"].forEach(function(t) {
            e[t] = function(e) {
                return this._invoke(t, e)
            }
        })
    }
    function s(e) {
        this.arg = e
    }
    function u(e) {
        function t(r, i, o, a) {
            var u = n(e[r], e, i);
            if ("throw" !== u.type) {
                var c = u.arg,
                l = c.value;
                return l instanceof s ? Promise.resolve(l.arg).then(function(e) {
                    t("next", e, o, a)
                },
                function(e) {
                    t("throw", e, o, a)
                }) : Promise.resolve(l).then(function(e) {
                    c.value = e,
                    o(c)
                },
                a)
            }
            a(u.arg)
        }
        function r(e, n) {
            function r() {
                return new Promise(function(r, i) {
                    t(e, n, r, i)
                })
            }
            return i = i ? i.then(r, r) : r()
        }
        "object" == typeof process && process.domain && (t = process.domain.bind(t));
        var i;
        this._invoke = r
    }
    function c(e, t, r) {
        var i = E;
        return function(o, a) {
            if (i === _) throw new Error("Generator is already running");
            if (i === k) {
                if ("throw" === o) throw a;
                return h()
            }
            for (;;) {
                var s = r.delegate;
                if (s) {
                    if ("return" === o || "throw" === o && s.iterator[o] === m) {
                        r.delegate = null;
                        var u = s.iterator["return"];
                        if (u) {
                            var c = n(u, s.iterator, a);
                            if ("throw" === c.type) {
                                o = "throw",
                                a = c.arg;
                                continue
                            }
                        }
                        if ("return" === o) continue
                    }
                    var c = n(s.iterator[o], s.iterator, a);
                    if ("throw" === c.type) {
                        r.delegate = null,
                        o = "throw",
                        a = c.arg;
                        continue
                    }
                    o = "next",
                    a = m;
                    var l = c.arg;
                    if (!l.done) return i = T,
                    l;
                    r[s.resultName] = l.value,
                    r.next = s.nextLoc,
                    r.delegate = null
                }
                if ("next" === o) i === T ? r.sent = a: r.sent = m;
                else if ("throw" === o) {
                    if (i === E) throw i = k,
                    a;
                    r.dispatchException(a) && (o = "next", a = m)
                } else "return" === o && r.abrupt("return", a);
                i = _;
                var c = n(e, t, r);
                if ("normal" === c.type) {
                    i = r.done ? k: T;
                    var l = {
                        value: c.arg,
                        done: r.done
                    };
                    if (c.arg !== C) return l;
                    r.delegate && "next" === o && (a = m)
                } else "throw" === c.type && (i = k, o = "throw", a = c.arg)
            }
        }
    }
    function l(e) {
        var t = {
            tryLoc: e[0]
        };
        1 in e && (t.catchLoc = e[1]),
        2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]),
        this.tryEntries.push(t)
    }
    function f(e) {
        var t = e.completion || {};
        t.type = "normal",
        delete t.arg,
        e.completion = t
    }
    function d(e) {
        this.tryEntries = [{
            tryLoc: "root"
        }],
        e.forEach(l, this),
        this.reset(!0)
    }
    function p(e) {
        if (e) {
            var t = e[y];
            if (t) return t.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
                var n = -1,
                r = function i() {
                    for (; ++n < e.length;) if (v.call(e, n)) return i.value = e[n],
                    i.done = !1,
                    i;
                    return i.value = m,
                    i.done = !0,
                    i
                };
                return r.next = r
            }
        }
        return {
            next: h
        }
    }
    function h() {
        return {
            value: m,
            done: !0
        }
    }
    var m, v = Object.prototype.hasOwnProperty,
    g = "function" == typeof Symbol ? Symbol: {},
    y = g.iterator || "@@iterator",
    b = g.toStringTag || "@@toStringTag",
    w = "object" == typeof module,
    x = e.regeneratorRuntime;
    if (x) return void(w && (module.exports = x));
    x = e.regeneratorRuntime = w ? module.exports: {},
    x.wrap = t;
    var E = "suspendedStart",
    T = "suspendedYield",
    _ = "executing",
    k = "completed",
    C = {},
    j = o.prototype = r.prototype;
    i.prototype = j.constructor = o,
    o.constructor = i,
    o[b] = i.displayName = "GeneratorFunction",
    x.isGeneratorFunction = function(e) {
        var t = "function" == typeof e && e.constructor;
        return t ? t === i || "GeneratorFunction" === (t.displayName || t.name) : !1
    },
    x.mark = function(e) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : (e.__proto__ = o, b in e || (e[b] = "GeneratorFunction")),
        e.prototype = Object.create(j),
        e
    },
    x.awrap = function(e) {
        return new s(e)
    },
    a(u.prototype),
    x.async = function(e, n, r, i) {
        var o = new u(t(e, n, r, i));
        return x.isGeneratorFunction(n) ? o: o.next().then(function(e) {
            return e.done ? e.value: o.next()
        })
    },
    a(j),
    j[y] = function() {
        return this
    },
    j[b] = "Generator",
    j.toString = function() {
        return "[object Generator]"
    },
    x.keys = function(e) {
        var t = [];
        for (var n in e) t.push(n);
        return t.reverse(),
        function r() {
            for (; t.length;) {
                var n = t.pop();
                if (n in e) return r.value = n,
                r.done = !1,
                r
            }
            return r.done = !0,
            r
        }
    },
    x.values = p,
    d.prototype = {
        constructor: d,
        reset: function(e) {
            if (this.prev = 0, this.next = 0, this.sent = m, this.done = !1, this.delegate = null, this.tryEntries.forEach(f), !e) for (var t in this)"t" === t.charAt(0) && v.call(this, t) && !isNaN( + t.slice(1)) && (this[t] = m)
        },
        stop: function() {
            this.done = !0;
            var e = this.tryEntries[0],
            t = e.completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval
        },
        dispatchException: function(e) {
            function t(t, r) {
                return o.type = "throw",
                o.arg = e,
                n.next = t,
                !!r
            }
            if (this.done) throw e;
            for (var n = this,
            r = this.tryEntries.length - 1; r >= 0; --r) {
                var i = this.tryEntries[r],
                o = i.completion;
                if ("root" === i.tryLoc) return t("end");
                if (i.tryLoc <= this.prev) {
                    var a = v.call(i, "catchLoc"),
                    s = v.call(i, "finallyLoc");
                    if (a && s) {
                        if (this.prev < i.catchLoc) return t(i.catchLoc, !0);
                        if (this.prev < i.finallyLoc) return t(i.finallyLoc)
                    } else if (a) {
                        if (this.prev < i.catchLoc) return t(i.catchLoc, !0)
                    } else {
                        if (!s) throw new Error("try statement without catch or finally");
                        if (this.prev < i.finallyLoc) return t(i.finallyLoc)
                    }
                }
            }
        },
        abrupt: function(e, t) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];
                if (r.tryLoc <= this.prev && v.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                    var i = r;
                    break
                }
            }
            i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
            var o = i ? i.completion: {};
            return o.type = e,
            o.arg = t,
            i ? this.next = i.finallyLoc: this.complete(o),
            C
        },
        complete: function(e, t) {
            if ("throw" === e.type) throw e.arg;
            "break" === e.type || "continue" === e.type ? this.next = e.arg: "return" === e.type ? (this.rval = e.arg, this.next = "end") : "normal" === e.type && t && (this.next = t)
        },
        finish: function(e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var n = this.tryEntries[t];
                if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc),
                f(n),
                C
            }
        },
        "catch": function(e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var n = this.tryEntries[t];
                if (n.tryLoc === e) {
                    var r = n.completion;
                    if ("throw" === r.type) {
                        var i = r.arg;
                        f(n)
                    }
                    return i
                }
            }
            throw new Error("illegal catch attempt")
        },
        delegateYield: function(e, t, n) {
            return this.delegate = {
                iterator: p(e),
                resultName: t,
                nextLoc: n
            },
            C
        }
    }
} ("object" == typeof global ? global: "object" == typeof window ? window: "object" == typeof self ? self: this),
function(e, t) {
    "use strict";
    function n(e) {
        return h[p] = r.apply(t, e),
        p++
    }
    function r(e) {
        var n = [].slice.call(arguments, 1);
        return function() {
            "function" == typeof e ? e.apply(t, n) : new Function("" + e)()
        }
    }
    function i(e) {
        if (m) setTimeout(r(i, e), 0);
        else {
            var t = h[e];
            if (t) {
                m = !0;
                try {
                    t()
                } finally {
                    o(e),
                    m = !1
                }
            }
        }
    }
    function o(e) {
        delete h[e]
    }
    function a() {
        d = function() {
            var e = n(arguments);
            return process.nextTick(r(i, e)),
            e
        }
    }
    function s() {
        if (e.postMessage && !e.importScripts) {
            var t = !0,
            n = e.onmessage;
            return e.onmessage = function() {
                t = !1
            },
            e.postMessage("", "*"),
            e.onmessage = n,
            t
        }
    }
    function u() {
        var t = "setImmediate$" + Math.random() + "$",
        r = function(n) {
            n.source === e && "string" == typeof n.data && 0 === n.data.indexOf(t) && i( + n.data.slice(t.length))
        };
        e.addEventListener ? e.addEventListener("message", r, !1) : e.attachEvent("onmessage", r),
        d = function() {
            var r = n(arguments);
            return e.postMessage(t + r, "*"),
            r
        }
    }
    function c() {
        var e = new MessageChannel;
        e.port1.onmessage = function(e) {
            var t = e.data;
            i(t)
        },
        d = function() {
            var t = n(arguments);
            return e.port2.postMessage(t),
            t
        }
    }
    function l() {
        var e = v.documentElement;
        d = function() {
            var t = n(arguments),
            r = v.createElement("script");
            return r.onreadystatechange = function() {
                i(t),
                r.onreadystatechange = null,
                e.removeChild(r),
                r = null
            },
            e.appendChild(r),
            t
        }
    }
    function f() {
        d = function() {
            var e = n(arguments);
            return setTimeout(r(i, e), 0),
            e
        }
    }
    if (!e.setImmediate) {
        var d, p = 1,
        h = {},
        m = !1,
        v = e.document,
        g = Object.getPrototypeOf && Object.getPrototypeOf(e);
        g = g && g.setTimeout ? g: e,
        "[object process]" === {}.toString.call(e.process) ? a() : s() ? u() : e.MessageChannel ? c() : v && "onreadystatechange" in v.createElement("script") ? l() : f(),
        g.setImmediate = d,
        g.clearImmediate = o
    }
} ("undefined" == typeof self ? "undefined" == typeof global ? this: global: self);
var _slicedToArray = function() {
    function e(e, t) {
        var n = [],
        r = !0,
        i = !1,
        o = void 0;
        try {
            for (var a, s = e[Symbol.iterator](); ! (r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
        } catch(u) {
            i = !0,
            o = u
        } finally {
            try { ! r && s["return"] && s["return"]()
            } finally {
                if (i) throw o
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
function(e) {
    function t() {
        var e = void 0,
        n = void 0,
        r = void 0;
        if (1 === arguments.length ? (e = t.amd, n = [], r = arguments[0]) : 2 === arguments.length ? (e = t.amd, n = arguments[0], r = arguments[1]) : 3 === arguments.length && (e = arguments[0], n = arguments[1], r = arguments[2]), "object" == typeof r && !
        function() {
            var e = r;
            r = function() {
                return e
            }
        } (), "string" != typeof e) throw new TypeError("name was not a string");
        if ("object" != typeof n) throw new TypeError("deps was not an array");
        if ("function" != typeof r) throw new TypeError("definition was not a function");
        s[e] && console.warn("Module redefined", e),
        s[e] = {
            deps: n,
            callback: r
        },
        c[e] && i(e)()
    }
    function n(e, t) {
        if (!t && e) return e;
        if (e.match("!")) throw new Error("can't resolve name with loader: " + e);
        if ("." !== e.charAt(0)) return e;
        for (var n = e.split("/"), r = t.split("/").slice(0, -1), i = 0, o = n.length; o > i; i++) {
            var a = n[i];
            if (".." === a) r.pop();
            else {
                if ("." === a) continue;
                r.push(a)
            }
        }
        return r.join("/")
    }
    function r() {
        var e = void 0,
        t = void 0,
        n = new Promise(function(n, r) {
            e = n,
            t = r
        });
        return {
            promise: n,
            resolve: e,
            reject: t
        }
    }
    function i(e) {
        return function(t) {
            return t ? o(e) : Promise.resolve().then(function() {
                return s[e] ? o(e) : (c[e] || !
                function() {
                    c[e] = r();
                    var t = c[e].reject;
                    setTimeout(function() {
                        t(new Error("timeout loading module: " + e))
                    },
                    5e3)
                } (), c[e].promise)
            })
        }
    }
    function o(e, t) {
        var r = e.split("!", 2),
        a = 2 === r.length ? r: [null, e],
        l = _slicedToArray(a, 2),
        f = l[0],
        d = l[1],
        p = n(d, t);
        if ("async" === f) return i(p);
        if (f) throw new Error("unknown require plugin: " + f);
        if (u[p]) return u[p];
        if (!s[p]) throw new Error("Could not find module " + p);
        u[p] = {};
        var h = c[p];
        delete c[p];
        for (var m = s[p], v = m.deps, g = m.callback, y = [], b = void 0, w = 0, x = v.length; x > w; w++)"exports" === v[w] ? y.push(b = {}) : y.push(o(v[w], p));
        var E = g.apply(this, y),
        T = u[p] = b || E;
        return h && h.resolve(T),
        T
    }
    function a(e, t) {
        var n = Promise.all(e.map(function(e) {
            return i(e)()
        })).then(function() {
            return o
        });
        return t && n.then(t),
        n
    }
    if (e.define) throw new Error("Module registry already exists");
    var s = {},
    u = {},
    c = {};
    e.define = t,
    e.require = o,
    e.require.ensure = a
} (this),
define.amd = "jquery",
function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    }: t(e)
} ("undefined" != typeof window ? window: this,
function(e, t) {
    function n(e) {
        var t = e.length,
        n = Q.type(e);
        return "function" === n || Q.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }
    function r(e, t, n) {
        if (Q.isFunction(t)) return Q.grep(e,
        function(e, r) {
            return !! t.call(e, r, e) !== n
        });
        if (t.nodeType) return Q.grep(e,
        function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (se.test(t)) return Q.filter(t, e, n);
            t = Q.filter(t, e)
        }
        return Q.grep(e,
        function(e) {
            return X.call(t, e) >= 0 !== n
        })
    }
    function i(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType;);
        return e
    }
    function o(e) {
        var t = he[e] = {};
        return Q.each(e.match(pe) || [],
        function(e, n) {
            t[n] = !0
        }),
        t
    }
    function a() {
        K.removeEventListener("DOMContentLoaded", a, !1),
        e.removeEventListener("load", a, !1),
        Q.ready()
    }
    function s() {
        Object.defineProperty(this.cache = {},
        0, {
            get: function() {
                return {}
            }
        }),
        this.expando = Q.expando + s.uid++
    }
    function u(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(we, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
            try {
                n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null: +n + "" === n ? +n: be.test(n) ? Q.parseJSON(n) : n
            } catch(i) {}
            ye.set(e, t, n)
        } else n = void 0;
        return n
    }
    function c() {
        return ! 0
    }
    function l() {
        return ! 1
    }
    function f() {
        try {
            return K.activeElement
        } catch(e) {}
    }
    function d(e, t) {
        return Q.nodeName(e, "table") && Q.nodeName(11 !== t.nodeType ? t: t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function p(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
        e
    }
    function h(e) {
        var t = Ie.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"),
        e
    }
    function m(e, t) {
        for (var n = 0,
        r = e.length; r > n; n++) ge.set(e[n], "globalEval", !t || ge.get(t[n], "globalEval"))
    }
    function v(e, t) {
        var n, r, i, o, a, s, u, c;
        if (1 === t.nodeType) {
            if (ge.hasData(e) && (o = ge.access(e), a = ge.set(t, o), c = o.events)) {
                delete a.handle,
                a.events = {};
                for (i in c) for (n = 0, r = c[i].length; r > n; n++) Q.event.add(t, i, c[i][n])
            }
            ye.hasData(e) && (s = ye.access(e), u = Q.extend({},
            s), ye.set(t, u))
        }
    }
    function g(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && Q.nodeName(e, t) ? Q.merge([e], n) : n
    }
    function y(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && _e.test(e.type) ? t.checked = e.checked: ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }
    function b(t, n) {
        var r, i = Q(n.createElement(t)).appendTo(n.body),
        o = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display: Q.css(i[0], "display");
        return i.detach(),
        o
    }
    function w(e) {
        var t = K,
        n = He[e];
        return n || (n = b(e, t), "none" !== n && n || (Fe = (Fe || Q("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Fe[0].contentDocument, t.write(), t.close(), n = b(e, t), Fe.detach()), He[e] = n),
        n
    }
    function x(e, t, n) {
        var r, i, o, a, s = e.style;
        return n = n || Be(e),
        n && (a = n.getPropertyValue(t) || n[t]),
        n && ("" !== a || Q.contains(e.ownerDocument, e) || (a = Q.style(e, t)), Ue.test(a) && ze.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)),
        void 0 !== a ? a + "": a
    }
    function E(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get: (this.get = t).apply(this, arguments)
            }
        }
    }
    function T(e, t) {
        if (t in e) return t;
        for (var n = t[0].toUpperCase() + t.slice(1), r = t, i = Je.length; i--;) if (t = Je[i] + n, t in e) return t;
        return r
    }
    function _(e, t, n) {
        var r = $e.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }
    function k(e, t, n, r, i) {
        for (var o = n === (r ? "border": "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)"margin" === n && (a += Q.css(e, n + Ee[o], !0, i)),
        r ? ("content" === n && (a -= Q.css(e, "padding" + Ee[o], !0, i)), "margin" !== n && (a -= Q.css(e, "border" + Ee[o] + "Width", !0, i))) : (a += Q.css(e, "padding" + Ee[o], !0, i), "padding" !== n && (a += Q.css(e, "border" + Ee[o] + "Width", !0, i)));
        return a
    }
    function C(e, t, n) {
        var r = !0,
        i = "width" === t ? e.offsetWidth: e.offsetHeight,
        o = Be(e),
        a = "border-box" === Q.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = x(e, t, o), (0 > i || null == i) && (i = e.style[t]), Ue.test(i)) return i;
            r = a && (Y.boxSizingReliable() || i === e.style[t]),
            i = parseFloat(i) || 0
        }
        return i + k(e, t, n || (a ? "border": "content"), r, o) + "px"
    }
    function j(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) r = e[a],
        r.style && (o[a] = ge.get(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && Te(r) && (o[a] = ge.access(r, "olddisplay", w(r.nodeName)))) : (i = Te(r), "none" === n && i || ge.set(r, "olddisplay", i ? n: Q.css(r, "display"))));
        for (a = 0; s > a; a++) r = e[a],
        r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "": "none"));
        return e
    }
    function S(e, t, n, r, i) {
        return new S.prototype.init(e, t, n, r, i)
    }
    function L() {
        return setTimeout(function() {
            Ye = void 0
        }),
        Ye = Q.now()
    }
    function O(e, t) {
        var n, r = 0,
        i = {
            height: e
        };
        for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = Ee[r],
        i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e),
        i
    }
    function N(e, t, n) {
        for (var r, i = (nt[t] || []).concat(nt["*"]), o = 0, a = i.length; a > o; o++) if (r = i[o].call(n, t, e)) return r
    }
    function D(e, t, n) {
        var r, i, o, a, s, u, c, l, f = this,
        d = {},
        p = e.style,
        h = e.nodeType && Te(e),
        m = ge.get(e, "fxshow");
        n.queue || (s = Q._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function() {
            s.unqueued || u()
        }), s.unqueued++, f.always(function() {
            f.always(function() {
                s.unqueued--,
                Q.queue(e, "fx").length || s.empty.fire()
            })
        })),
        1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], c = Q.css(e, "display"), l = "none" === c ? ge.get(e, "olddisplay") || w(e.nodeName) : c, "inline" === l && "none" === Q.css(e, "float") && (p.display = "inline-block")),
        n.overflow && (p.overflow = "hidden", f.always(function() {
            p.overflow = n.overflow[0],
            p.overflowX = n.overflow[1],
            p.overflowY = n.overflow[2]
        }));
        for (r in t) if (i = t[r], Ze.exec(i)) {
            if (delete t[r], o = o || "toggle" === i, i === (h ? "hide": "show")) {
                if ("show" !== i || !m || void 0 === m[r]) continue;
                h = !0
            }
            d[r] = m && m[r] || Q.style(e, r)
        } else c = void 0;
        if (Q.isEmptyObject(d))"inline" === ("none" === c ? w(e.nodeName) : c) && (p.display = c);
        else {
            m ? "hidden" in m && (h = m.hidden) : m = ge.access(e, "fxshow", {}),
            o && (m.hidden = !h),
            h ? Q(e).show() : f.done(function() {
                Q(e).hide()
            }),
            f.done(function() {
                var t;
                ge.remove(e, "fxshow");
                for (t in d) Q.style(e, t, d[t])
            });
            for (r in d) a = N(h ? m[r] : 0, r, f),
            r in m || (m[r] = a.start, h && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
        }
    }
    function M(e, t) {
        var n, r, i, o, a;
        for (n in e) if (r = Q.camelCase(n), i = t[r], o = e[n], Q.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = Q.cssHooks[r], a && "expand" in a) {
            o = a.expand(o),
            delete e[r];
            for (n in o) n in e || (e[n] = o[n], t[n] = i)
        } else t[r] = i
    }
    function A(e, t, n) {
        var r, i, o = 0,
        a = tt.length,
        s = Q.Deferred().always(function() {
            delete u.elem
        }),
        u = function() {
            if (i) return ! 1;
            for (var t = Ye || L(), n = Math.max(0, c.startTime + c.duration - t), r = n / c.duration || 0, o = 1 - r, a = 0, u = c.tweens.length; u > a; a++) c.tweens[a].run(o);
            return s.notifyWith(e, [c, o, n]),
            1 > o && u ? n: (s.resolveWith(e, [c]), !1)
        },
        c = s.promise({
            elem: e,
            props: Q.extend({},
            t),
            opts: Q.extend(!0, {
                specialEasing: {}
            },
            n),
            originalProperties: t,
            originalOptions: n,
            startTime: Ye || L(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var r = Q.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                return c.tweens.push(r),
                r
            },
            stop: function(t) {
                var n = 0,
                r = t ? c.tweens.length: 0;
                if (i) return this;
                for (i = !0; r > n; n++) c.tweens[n].run(1);
                return t ? s.resolveWith(e, [c, t]) : s.rejectWith(e, [c, t]),
                this
            }
        }),
        l = c.props;
        for (M(l, c.opts.specialEasing); a > o; o++) if (r = tt[o].call(c, e, l, c.opts)) return r;
        return Q.map(l, N, c),
        Q.isFunction(c.opts.start) && c.opts.start.call(e, c),
        Q.fx.timer(Q.extend(u, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })),
        c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }
    function P(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
            o = t.toLowerCase().match(pe) || [];
            if (Q.isFunction(n)) for (; r = o[i++];)"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }
    function I(e, t, n, r) {
        function i(s) {
            var u;
            return o[s] = !0,
            Q.each(e[s] || [],
            function(e, s) {
                var c = s(t, n, r);
                return "string" != typeof c || a || o[c] ? a ? !(u = c) : void 0 : (t.dataTypes.unshift(c), i(c), !1)
            }),
            u
        }
        var o = {},
        a = e === bt;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }
    function q(e, t) {
        var n, r, i = Q.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e: r || (r = {}))[n] = t[n]);
        return r && Q.extend(!0, e, r),
        e
    }
    function R(e, t, n) {
        for (var r, i, o, a, s = e.contents,
        u = e.dataTypes;
        "*" === u[0];) u.shift(),
        void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r) for (i in s) if (s[i] && s[i].test(r)) {
            u.unshift(i);
            break
        }
        if (u[0] in n) o = u[0];
        else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break
                }
                a || (a = i)
            }
            o = o || a
        }
        return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0
    }
    function F(e, t, n, r) {
        var i, o, a, s, u, c = {},
        l = e.dataTypes.slice();
        if (l[1]) for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
        for (o = l.shift(); o;) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = l.shift()) if ("*" === o) o = u;
        else if ("*" !== u && u !== o) {
            if (a = c[u + " " + o] || c["* " + o], !a) for (i in c) if (s = i.split(" "), s[1] === o && (a = c[u + " " + s[0]] || c["* " + s[0]])) {
                a === !0 ? a = c[i] : c[i] !== !0 && (o = s[0], l.unshift(s[1]));
                break
            }
            if (a !== !0) if (a && e["throws"]) t = a(t);
            else try {
                t = a(t)
            } catch(f) {
                return {
                    state: "parsererror",
                    error: a ? f: "No conversion from " + u + " to " + o
                }
            }
        }
        return {
            state: "success",
            data: t
        }
    }
    function H(e, t, n, r) {
        var i;
        if (Q.isArray(t)) Q.each(t,
        function(t, i) {
            n || _t.test(e) ? r(e, i) : H(e + "[" + ("object" == typeof i ? t: "") + "]", i, n, r)
        });
        else if (n || "object" !== Q.type(t)) r(e, t);
        else for (i in t) H(e + "[" + i + "]", t[i], n, r)
    }
    function z(e) {
        return Q.isWindow(e) ? e: 9 === e.nodeType && e.defaultView
    }
    var U = [],
    B = U.slice,
    W = U.concat,
    $ = U.push,
    X = U.indexOf,
    V = {},
    G = V.toString,
    J = V.hasOwnProperty,
    Y = {},
    K = e.document,
    Z = "2.1.3",
    Q = function(e, t) {
        return new Q.fn.init(e, t)
    },
    ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    te = /^-ms-/,
    ne = /-([\da-z])/gi,
    re = function(e, t) {
        return t.toUpperCase()
    };
    Q.fn = Q.prototype = {
        jquery: Z,
        constructor: Q,
        selector: "",
        length: 0,
        toArray: function() {
            return B.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : B.call(this)
        },
        pushStack: function(e) {
            var t = Q.merge(this.constructor(), e);
            return t.prevObject = this,
            t.context = this.context,
            t
        },
        each: function(e, t) {
            return Q.each(this, e, t)
        },
        map: function(e) {
            return this.pushStack(Q.map(this,
            function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(B.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq( - 1)
        },
        eq: function(e) {
            var t = this.length,
            n = +e + (0 > e ? t: 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: $,
        sort: U.sort,
        splice: U.splice
    },
    Q.extend = Q.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {},
        s = 1,
        u = arguments.length,
        c = !1;
        for ("boolean" == typeof a && (c = a, a = arguments[s] || {},
        s++), "object" == typeof a || Q.isFunction(a) || (a = {}), s === u && (a = this, s--); u > s; s++) if (null != (e = arguments[s])) for (t in e) n = a[t],
        r = e[t],
        a !== r && (c && r && (Q.isPlainObject(r) || (i = Q.isArray(r))) ? (i ? (i = !1, o = n && Q.isArray(n) ? n: []) : o = n && Q.isPlainObject(n) ? n: {},
        a[t] = Q.extend(c, o, r)) : void 0 !== r && (a[t] = r));
        return a
    },
    Q.extend({
        expando: "jQuery" + (Z + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === Q.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            return ! Q.isArray(e) && e - parseFloat(e) + 1 >= 0
        },
        isPlainObject: function(e) {
            return "object" !== Q.type(e) || e.nodeType || Q.isWindow(e) ? !1 : e.constructor && !J.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return ! 1;
            return ! 0
        },
        type: function(e) {
            return null == e ? e + "": "object" == typeof e || "function" == typeof e ? V[G.call(e)] || "object": typeof e
        },
        globalEval: function(e) {
            var t, n = eval;
            e = Q.trim(e),
            e && (1 === e.indexOf("use strict") ? (t = K.createElement("script"), t.text = e, K.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        },
        camelCase: function(e) {
            return e.replace(te, "ms-").replace(ne, re)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, r) {
            var i, o = 0,
            a = e.length,
            s = n(e);
            if (r) {
                if (s) for (; a > o && (i = t.apply(e[o], r), i !== !1); o++);
                else for (o in e) if (i = t.apply(e[o], r), i === !1) break
            } else if (s) for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++);
            else for (o in e) if (i = t.call(e[o], o, e[o]), i === !1) break;
            return e
        },
        trim: function(e) {
            return null == e ? "": (e + "").replace(ee, "")
        },
        makeArray: function(e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? Q.merge(r, "string" == typeof e ? [e] : e) : $.call(r, e)),
            r
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : X.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length,
            r = 0,
            i = e.length; n > r; r++) e[i++] = t[r];
            return e.length = i,
            e
        },
        grep: function(e, t, n) {
            for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++) r = !t(e[o], o),
            r !== s && i.push(e[o]);
            return i
        },
        map: function(e, t, r) {
            var i, o = 0,
            a = e.length,
            s = n(e),
            u = [];
            if (s) for (; a > o; o++) i = t(e[o], o, r),
            null != i && u.push(i);
            else for (o in e) i = t(e[o], o, r),
            null != i && u.push(i);
            return W.apply([], u)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            return "string" == typeof t && (n = e[t], t = e, e = n),
            Q.isFunction(e) ? (r = B.call(arguments, 2), i = function() {
                return e.apply(t || this, r.concat(B.call(arguments)))
            },
            i.guid = e.guid = e.guid || Q.guid++, i) : void 0
        },
        now: Date.now,
        support: Y
    }),
    Q.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
    function(e, t) {
        V["[object " + t + "]"] = t.toLowerCase()
    });
    var ie = function(e) {
        function t(e, t, n, r) {
            var i, o, a, s, u, c, f, p, h, m;
            if ((t ? t.ownerDocument || t: H) !== D && N(t), t = t || D, n = n || [], s = t.nodeType, "string" != typeof e || !e || 1 !== s && 9 !== s && 11 !== s) return n;
            if (!r && A) {
                if (11 !== s && (i = ye.exec(e))) if (a = i[1]) {
                    if (9 === s) {
                        if (o = t.getElementById(a), !o || !o.parentNode) return n;
                        if (o.id === a) return n.push(o),
                        n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && R(t, o) && o.id === a) return n.push(o),
                    n
                } else {
                    if (i[2]) return Z.apply(n, t.getElementsByTagName(e)),
                    n;
                    if ((a = i[3]) && x.getElementsByClassName) return Z.apply(n, t.getElementsByClassName(a)),
                    n
                }
                if (x.qsa && (!P || !P.test(e))) {
                    if (p = f = F, h = t, m = 1 !== s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                        for (c = k(e), (f = t.getAttribute("id")) ? p = f.replace(we, "\\$&") : t.setAttribute("id", p), p = "[id='" + p + "'] ", u = c.length; u--;) c[u] = p + d(c[u]);
                        h = be.test(e) && l(t.parentNode) || t,
                        m = c.join(",")
                    }
                    if (m) try {
                        return Z.apply(n, h.querySelectorAll(m)),
                        n
                    } catch(v) {} finally {
                        f || t.removeAttribute("id")
                    }
                }
            }
            return j(e.replace(ue, "$1"), t, n, r)
        }
        function n() {
            function e(n, r) {
                return t.push(n + " ") > E.cacheLength && delete e[t.shift()],
                e[n + " "] = r
            }
            var t = [];
            return e
        }
        function r(e) {
            return e[F] = !0,
            e
        }
        function i(e) {
            var t = D.createElement("div");
            try {
                return !! e(t)
            } catch(n) {
                return ! 1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function o(e, t) {
            for (var n = e.split("|"), r = e.length; r--;) E.attrHandle[n[r]] = t
        }
        function a(e, t) {
            var n = t && e,
            r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
            if (r) return r;
            if (n) for (; n = n.nextSibling;) if (n === t) return - 1;
            return e ? 1 : -1
        }
        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }
        function u(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function c(e) {
            return r(function(t) {
                return t = +t,
                r(function(n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }
        function l(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        function f() {}
        function d(e) {
            for (var t = 0,
            n = e.length,
            r = ""; n > t; t++) r += e[t].value;
            return r
        }
        function p(e, t, n) {
            var r = t.dir,
            i = n && "parentNode" === r,
            o = U++;
            return t.first ?
            function(t, n, o) {
                for (; t = t[r];) if (1 === t.nodeType || i) return e(t, n, o)
            }: function(t, n, a) {
                var s, u, c = [z, o];
                if (a) {
                    for (; t = t[r];) if ((1 === t.nodeType || i) && e(t, n, a)) return ! 0
                } else for (; t = t[r];) if (1 === t.nodeType || i) {
                    if (u = t[F] || (t[F] = {}), (s = u[r]) && s[0] === z && s[1] === o) return c[2] = s[2];
                    if (u[r] = c, c[2] = e(t, n, a)) return ! 0
                }
            }
        }
        function h(e) {
            return e.length > 1 ?
            function(t, n, r) {
                for (var i = e.length; i--;) if (!e[i](t, n, r)) return ! 1;
                return ! 0
            }: e[0]
        }
        function m(e, n, r) {
            for (var i = 0,
            o = n.length; o > i; i++) t(e, n[i], r);
            return r
        }
        function v(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, c = null != t; u > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), c && t.push(s));
            return a
        }
        function g(e, t, n, i, o, a) {
            return i && !i[F] && (i = g(i)),
            o && !o[F] && (o = g(o, a)),
            r(function(r, a, s, u) {
                var c, l, f, d = [],
                p = [],
                h = a.length,
                g = r || m(t || "*", s.nodeType ? [s] : s, []),
                y = !e || !r && t ? g: v(g, d, e, s, u),
                b = n ? o || (r ? e: h || i) ? [] : a: y;
                if (n && n(y, b, s, u), i) for (c = v(b, p), i(c, [], s, u), l = c.length; l--;)(f = c[l]) && (b[p[l]] = !(y[p[l]] = f));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (c = [], l = b.length; l--;)(f = b[l]) && c.push(y[l] = f);
                            o(null, b = [], c, u)
                        }
                        for (l = b.length; l--;)(f = b[l]) && (c = o ? ee(r, f) : d[l]) > -1 && (r[c] = !(a[c] = f))
                    }
                } else b = v(b === a ? b.splice(h, b.length) : b),
                o ? o(null, a, b, u) : Z.apply(a, b)
            })
        }
        function y(e) {
            for (var t, n, r, i = e.length,
            o = E.relative[e[0].type], a = o || E.relative[" "], s = o ? 1 : 0, u = p(function(e) {
                return e === t
            },
            a, !0), c = p(function(e) {
                return ee(t, e) > -1
            },
            a, !0), l = [function(e, n, r) {
                var i = !o && (r || n !== S) || ((t = n).nodeType ? u(e, n, r) : c(e, n, r));
                return t = null,
                i
            }]; i > s; s++) if (n = E.relative[e[s].type]) l = [p(h(l), n)];
            else {
                if (n = E.filter[e[s].type].apply(null, e[s].matches), n[F]) {
                    for (r = ++s; i > r && !E.relative[e[r].type]; r++);
                    return g(s > 1 && h(l), s > 1 && d(e.slice(0, s - 1).concat({
                        value: " " === e[s - 2].type ? "*": ""
                    })).replace(ue, "$1"), n, r > s && y(e.slice(s, r)), i > r && y(e = e.slice(r)), i > r && d(e))
                }
                l.push(n)
            }
            return h(l)
        }
        function b(e, n) {
            var i = n.length > 0,
            o = e.length > 0,
            a = function(r, a, s, u, c) {
                var l, f, d, p = 0,
                h = "0",
                m = r && [],
                g = [],
                y = S,
                b = r || o && E.find.TAG("*", c),
                w = z += null == y ? 1 : Math.random() || .1,
                x = b.length;
                for (c && (S = a !== D && a); h !== x && null != (l = b[h]); h++) {
                    if (o && l) {
                        for (f = 0; d = e[f++];) if (d(l, a, s)) {
                            u.push(l);
                            break
                        }
                        c && (z = w)
                    }
                    i && ((l = !d && l) && p--, r && m.push(l))
                }
                if (p += h, i && h !== p) {
                    for (f = 0; d = n[f++];) d(m, g, a, s);
                    if (r) {
                        if (p > 0) for (; h--;) m[h] || g[h] || (g[h] = Y.call(u));
                        g = v(g)
                    }
                    Z.apply(u, g),
                    c && !r && g.length > 0 && p + n.length > 1 && t.uniqueSort(u)
                }
                return c && (z = w, S = y),
                m
            };
            return i ? r(a) : a
        }
        var w, x, E, T, _, k, C, j, S, L, O, N, D, M, A, P, I, q, R, F = "sizzle" + 1 * new Date,
        H = e.document,
        z = 0,
        U = 0,
        B = n(),
        W = n(),
        $ = n(),
        X = function(e, t) {
            return e === t && (O = !0),
            0
        },
        V = 1 << 31,
        G = {}.hasOwnProperty,
        J = [],
        Y = J.pop,
        K = J.push,
        Z = J.push,
        Q = J.slice,
        ee = function(e, t) {
            for (var n = 0,
            r = e.length; r > n; n++) if (e[n] === t) return n;
            return - 1
        },
        te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        ne = "[\\x20\\t\\r\\n\\f]",
        re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        ie = re.replace("w", "w#"),
        oe = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
        ae = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
        se = new RegExp(ne + "+", "g"),
        ue = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
        ce = new RegExp("^" + ne + "*," + ne + "*"),
        le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
        fe = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
        de = new RegExp(ae),
        pe = new RegExp("^" + ie + "$"),
        he = {
            ID: new RegExp("^#(" + re + ")"),
            CLASS: new RegExp("^\\.(" + re + ")"),
            TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + oe),
            PSEUDO: new RegExp("^" + ae),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + te + ")$", "i"),
            needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
        },
        me = /^(?:input|select|textarea|button)$/i,
        ve = /^h\d$/i,
        ge = /^[^{]+\{\s*\[native \w/,
        ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        be = /[+~]/,
        we = /'|\\/g,
        xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
        Ee = function(e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t: 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        },
        Te = function() {
            N()
        };
        try {
            Z.apply(J = Q.call(H.childNodes), H.childNodes),
            J[H.childNodes.length].nodeType
        } catch(_e) {
            Z = {
                apply: J.length ?
                function(e, t) {
                    K.apply(e, Q.call(t))
                }: function(e, t) {
                    for (var n = e.length,
                    r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        x = t.support = {},
        _ = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName: !1
        },
        N = t.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e: H;
            return r !== D && 9 === r.nodeType && r.documentElement ? (D = r, M = r.documentElement, n = r.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Te, !1) : n.attachEvent && n.attachEvent("onunload", Te)), A = !_(r), x.attributes = i(function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }), x.getElementsByTagName = i(function(e) {
                return e.appendChild(r.createComment("")),
                !e.getElementsByTagName("*").length
            }), x.getElementsByClassName = ge.test(r.getElementsByClassName), x.getById = i(function(e) {
                return M.appendChild(e).id = F,
                !r.getElementsByName || !r.getElementsByName(F).length
            }), x.getById ? (E.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && A) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            },
            E.filter.ID = function(e) {
                var t = e.replace(xe, Ee);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete E.find.ID, E.filter.ID = function(e) {
                var t = e.replace(xe, Ee);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), E.find.TAG = x.getElementsByTagName ?
            function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : x.qsa ? t.querySelectorAll(e) : void 0
            }: function(e, t) {
                var n, r = [],
                i = 0,
                o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            },
            E.find.CLASS = x.getElementsByClassName &&
            function(e, t) {
                return A ? t.getElementsByClassName(e) : void 0
            },
            I = [], P = [], (x.qsa = ge.test(r.querySelectorAll)) && (i(function(e) {
                M.appendChild(e).innerHTML = "<a id='" + F + "'></a><select id='" + F + "-\f]' msallowcapture=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowcapture^='']").length && P.push("[*^$]=" + ne + "*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || P.push("\\[" + ne + "*(?:value|" + te + ")"),
                e.querySelectorAll("[id~=" + F + "-]").length || P.push("~="),
                e.querySelectorAll(":checked").length || P.push(":checked"),
                e.querySelectorAll("a#" + F + "+*").length || P.push(".#.+[+~]")
            }), i(function(e) {
                var t = r.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && P.push("name" + ne + "*[*^$|!~]?="),
                e.querySelectorAll(":enabled").length || P.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                P.push(",.*:")
            })), (x.matchesSelector = ge.test(q = M.matches || M.webkitMatchesSelector || M.mozMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && i(function(e) {
                x.disconnectedMatch = q.call(e, "div"),
                q.call(e, "[s!='']:x"),
                I.push("!=", ae)
            }), P = P.length && new RegExp(P.join("|")), I = I.length && new RegExp(I.join("|")), t = ge.test(M.compareDocumentPosition), R = t || ge.test(M.contains) ?
            function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement: e,
                r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            }: function(e, t) {
                if (t) for (; t = t.parentNode;) if (t === e) return ! 0;
                return ! 1
            },
            X = t ?
            function(e, t) {
                if (e === t) return O = !0,
                0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n: (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !x.sortDetached && t.compareDocumentPosition(e) === n ? e === r || e.ownerDocument === H && R(H, e) ? -1 : t === r || t.ownerDocument === H && R(H, t) ? 1 : L ? ee(L, e) - ee(L, t) : 0 : 4 & n ? -1 : 1)
            }: function(e, t) {
                if (e === t) return O = !0,
                0;
                var n, i = 0,
                o = e.parentNode,
                s = t.parentNode,
                u = [e],
                c = [t];
                if (!o || !s) return e === r ? -1 : t === r ? 1 : o ? -1 : s ? 1 : L ? ee(L, e) - ee(L, t) : 0;
                if (o === s) return a(e, t);
                for (n = e; n = n.parentNode;) u.unshift(n);
                for (n = t; n = n.parentNode;) c.unshift(n);
                for (; u[i] === c[i];) i++;
                return i ? a(u[i], c[i]) : u[i] === H ? -1 : c[i] === H ? 1 : 0
            },
            r) : D
        },
        t.matches = function(e, n) {
            return t(e, null, null, n)
        },
        t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== D && N(e), n = n.replace(fe, "='$1']"), x.matchesSelector && A && (!I || !I.test(n)) && (!P || !P.test(n))) try {
                var r = q.call(e, n);
                if (r || x.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch(i) {}
            return t(n, D, null, [e]).length > 0
        },
        t.contains = function(e, t) {
            return (e.ownerDocument || e) !== D && N(e),
            R(e, t)
        },
        t.attr = function(e, t) { (e.ownerDocument || e) !== D && N(e);
            var n = E.attrHandle[t.toLowerCase()],
            r = n && G.call(E.attrHandle, t.toLowerCase()) ? n(e, t, !A) : void 0;
            return void 0 !== r ? r: x.attributes || !A ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value: null
        },
        t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        },
        t.uniqueSort = function(e) {
            var t, n = [],
            r = 0,
            i = 0;
            if (O = !x.detectDuplicates, L = !x.sortStable && e.slice(0), e.sort(X), O) {
                for (; t = e[i++];) t === e[i] && (r = n.push(i));
                for (; r--;) e.splice(n[r], 1)
            }
            return L = null,
            e
        },
        T = t.getText = function(e) {
            var t, n = "",
            r = 0,
            i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += T(e)
                } else if (3 === i || 4 === i) return e.nodeValue
            } else for (; t = e[r++];) n += T(t);
            return n
        },
        E = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: he,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(xe, Ee),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(xe, Ee),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return he.CHILD.test(e[0]) ? null: (e[3] ? e[2] = e[4] || e[5] || "": n && de.test(n) && (t = k(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(xe, Ee).toLowerCase();
                    return "*" === e ?
                    function() {
                        return ! 0
                    }: function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = B[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && B(e,
                    function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, r) {
                    return function(i) {
                        var o = t.attr(i, e);
                        return null == o ? "!=" === n: n ? (o += "", "=" === n ? o === r: "!=" === n ? o !== r: "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice( - r.length) === r: "~=" === n ? (" " + o.replace(se, " ") + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-": !1) : !0
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                    a = "last" !== e.slice( - 4),
                    s = "of-type" === t;
                    return 1 === r && 0 === i ?
                    function(e) {
                        return !! e.parentNode
                    }: function(t, n, u) {
                        var c, l, f, d, p, h, m = o !== a ? "nextSibling": "previousSibling",
                        v = t.parentNode,
                        g = s && t.nodeName.toLowerCase(),
                        y = !u && !s;
                        if (v) {
                            if (o) {
                                for (; m;) {
                                    for (f = t; f = f[m];) if (s ? f.nodeName.toLowerCase() === g: 1 === f.nodeType) return ! 1;
                                    h = m = "only" === e && !h && "nextSibling"
                                }
                                return ! 0
                            }
                            if (h = [a ? v.firstChild: v.lastChild], a && y) {
                                for (l = v[F] || (v[F] = {}), c = l[e] || [], p = c[0] === z && c[1], d = c[0] === z && c[2], f = p && v.childNodes[p]; f = ++p && f && f[m] || (d = p = 0) || h.pop();) if (1 === f.nodeType && ++d && f === t) {
                                    l[e] = [z, p, d];
                                    break
                                }
                            } else if (y && (c = (t[F] || (t[F] = {}))[e]) && c[0] === z) d = c[1];
                            else for (; (f = ++p && f && f[m] || (d = p = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== g: 1 !== f.nodeType) || !++d || (y && ((f[F] || (f[F] = {}))[e] = [z, d]), f !== t)););
                            return d -= i,
                            d === r || d % r === 0 && d / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var i, o = E.pseudos[e] || E.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[F] ? o(n) : o.length > 1 ? (i = [e, e, "", n], E.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                        for (var r, i = o(e, n), a = i.length; a--;) r = ee(e, i[a]),
                        e[r] = !(t[r] = i[a])
                    }) : function(e) {
                        return o(e, 0, i)
                    }) : o
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = [],
                    n = [],
                    i = C(e.replace(ue, "$1"));
                    return i[F] ? r(function(e, t, n, r) {
                        for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, r, o) {
                        return t[0] = e,
                        i(t, null, o, n),
                        t[0] = null,
                        !n.pop()
                    }
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: r(function(e) {
                    return e = e.replace(xe, Ee),
                    function(t) {
                        return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
                    }
                }),
                lang: r(function(e) {
                    return pe.test(e || "") || t.error("unsupported lang: " + e),
                    e = e.replace(xe, Ee).toLowerCase(),
                    function(t) {
                        var n;
                        do
                        if (n = A ? t.lang: t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(),
                        n === e || 0 === n.indexOf(e + "-");
                        while ((t = t.parentNode) && 1 === t.nodeType);
                        return ! 1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === M
                },
                focus: function(e) {
                    return e === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return ! 1;
                    return ! 0
                },
                parent: function(e) {
                    return ! E.pseudos.empty(e)
                },
                header: function(e) {
                    return ve.test(e.nodeName)
                },
                input: function(e) {
                    return me.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: c(function() {
                    return [0]
                }),
                last: c(function(e, t) {
                    return [t - 1]
                }),
                eq: c(function(e, t, n) {
                    return [0 > n ? n + t: n]
                }),
                even: c(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: c(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: c(function(e, t, n) {
                    for (var r = 0 > n ? n + t: n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: c(function(e, t, n) {
                    for (var r = 0 > n ? n + t: n; ++r < t;) e.push(r);
                    return e
                })
            }
        },
        E.pseudos.nth = E.pseudos.eq;
        for (w in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) E.pseudos[w] = s(w);
        for (w in {
            submit: !0,
            reset: !0
        }) E.pseudos[w] = u(w);
        return f.prototype = E.filters = E.pseudos,
        E.setFilters = new f,
        k = t.tokenize = function(e, n) {
            var r, i, o, a, s, u, c, l = W[e + " "];
            if (l) return n ? 0 : l.slice(0);
            for (s = e, u = [], c = E.preFilter; s;) { (!r || (i = ce.exec(s))) && (i && (s = s.slice(i[0].length) || s), u.push(o = [])),
                r = !1,
                (i = le.exec(s)) && (r = i.shift(), o.push({
                    value: r,
                    type: i[0].replace(ue, " ")
                }), s = s.slice(r.length));
                for (a in E.filter) ! (i = he[a].exec(s)) || c[a] && !(i = c[a](i)) || (r = i.shift(), o.push({
                    value: r,
                    type: a,
                    matches: i
                }), s = s.slice(r.length));
                if (!r) break
            }
            return n ? s.length: s ? t.error(e) : W(e, u).slice(0)
        },
        C = t.compile = function(e, t) {
            var n, r = [],
            i = [],
            o = $[e + " "];
            if (!o) {
                for (t || (t = k(e)), n = t.length; n--;) o = y(t[n]),
                o[F] ? r.push(o) : i.push(o);
                o = $(e, b(i, r)),
                o.selector = e
            }
            return o
        },
        j = t.select = function(e, t, n, r) {
            var i, o, a, s, u, c = "function" == typeof e && e,
            f = !r && k(e = c.selector || e);
            if (n = n || [], 1 === f.length) {
                if (o = f[0] = f[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && x.getById && 9 === t.nodeType && A && E.relative[o[1].type]) {
                    if (t = (E.find.ID(a.matches[0].replace(xe, Ee), t) || [])[0], !t) return n;
                    c && (t = t.parentNode),
                    e = e.slice(o.shift().value.length)
                }
                for (i = he.needsContext.test(e) ? 0 : o.length; i--&&(a = o[i], !E.relative[s = a.type]);) if ((u = E.find[s]) && (r = u(a.matches[0].replace(xe, Ee), be.test(o[0].type) && l(t.parentNode) || t))) {
                    if (o.splice(i, 1), e = r.length && d(o), !e) return Z.apply(n, r),
                    n;
                    break
                }
            }
            return (c || C(e, f))(r, t, !A, n, be.test(e) && l(t.parentNode) || t),
            n
        },
        x.sortStable = F.split("").sort(X).join("") === F,
        x.detectDuplicates = !!O,
        N(),
        x.sortDetached = i(function(e) {
            return 1 & e.compareDocumentPosition(D.createElement("div"))
        }),
        i(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width",
        function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }),
        x.attributes && i(function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }) || o("value",
        function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }),
        i(function(e) {
            return null == e.getAttribute("disabled")
        }) || o(te,
        function(e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value: null
        }),
        t
    } (e);
    Q.find = ie,
    Q.expr = ie.selectors,
    Q.expr[":"] = Q.expr.pseudos,
    Q.unique = ie.uniqueSort,
    Q.text = ie.getText,
    Q.isXMLDoc = ie.isXML,
    Q.contains = ie.contains;
    var oe = Q.expr.match.needsContext,
    ae = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    se = /^.[^:#\[\.,]*$/;
    Q.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === r.nodeType ? Q.find.matchesSelector(r, e) ? [r] : [] : Q.find.matches(e, Q.grep(t,
        function(e) {
            return 1 === e.nodeType
        }))
    },
    Q.fn.extend({
        find: function(e) {
            var t, n = this.length,
            r = [],
            i = this;
            if ("string" != typeof e) return this.pushStack(Q(e).filter(function() {
                for (t = 0; n > t; t++) if (Q.contains(i[t], this)) return ! 0
            }));
            for (t = 0; n > t; t++) Q.find(e, i[t], r);
            return r = this.pushStack(n > 1 ? Q.unique(r) : r),
            r.selector = this.selector ? this.selector + " " + e: e,
            r
        },
        filter: function(e) {
            return this.pushStack(r(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(r(this, e || [], !0))
        },
        is: function(e) {
            return !! r(this, "string" == typeof e && oe.test(e) ? Q(e) : e || [], !1).length
        }
    });
    var ue, ce = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    le = Q.fn.init = function(e, t) {
        var n, r;
        if (!e) return this;
        if ("string" == typeof e) {
            if (n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ce.exec(e), !n || !n[1] && t) return ! t || t.jquery ? (t || ue).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof Q ? t[0] : t, Q.merge(this, Q.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t: K, !0)), ae.test(n[1]) && Q.isPlainObject(t)) for (n in t) Q.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this
            }
            return r = K.getElementById(n[2]),
            r && r.parentNode && (this.length = 1, this[0] = r),
            this.context = K,
            this.selector = e,
            this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : Q.isFunction(e) ? "undefined" != typeof ue.ready ? ue.ready(e) : e(Q) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), Q.makeArray(e, this))
    };
    le.prototype = Q.fn,
    ue = Q(K);
    var fe = /^(?:parents|prev(?:Until|All))/,
    de = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    Q.extend({
        dir: function(e, t, n) {
            for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;) if (1 === e.nodeType) {
                if (i && Q(e).is(n)) break;
                r.push(e)
            }
            return r
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }),
    Q.fn.extend({
        has: function(e) {
            var t = Q(e, this),
            n = t.length;
            return this.filter(function() {
                for (var e = 0; n > e; e++) if (Q.contains(this, t[e])) return ! 0
            })
        },
        closest: function(e, t) {
            for (var n, r = 0,
            i = this.length,
            o = [], a = oe.test(e) || "string" != typeof e ? Q(e, t || this.context) : 0; i > r; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && Q.find.matchesSelector(n, e))) {
                o.push(n);
                break
            }
            return this.pushStack(o.length > 1 ? Q.unique(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? X.call(Q(e), this[0]) : X.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length: -1
        },
        add: function(e, t) {
            return this.pushStack(Q.unique(Q.merge(this.get(), Q(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject: this.prevObject.filter(e))
        }
    }),
    Q.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t: null
        },
        parents: function(e) {
            return Q.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return Q.dir(e, "parentNode", n)
        },
        next: function(e) {
            return i(e, "nextSibling")
        },
        prev: function(e) {
            return i(e, "previousSibling")
        },
        nextAll: function(e) {
            return Q.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return Q.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return Q.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return Q.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return Q.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return Q.sibling(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || Q.merge([], e.childNodes)
        }
    },
    function(e, t) {
        Q.fn[e] = function(n, r) {
            var i = Q.map(this, t, n);
            return "Until" !== e.slice( - 5) && (r = n),
            r && "string" == typeof r && (i = Q.filter(r, i)),
            this.length > 1 && (de[e] || Q.unique(i), fe.test(e) && i.reverse()),
            this.pushStack(i)
        }
    });
    var pe = /\S+/g,
    he = {};
    Q.Callbacks = function(e) {
        e = "string" == typeof e ? he[e] || o(e) : Q.extend({},
        e);
        var t, n, r, i, a, s, u = [],
        c = !e.once && [],
        l = function(o) {
            for (t = e.memory && o, n = !0, s = i || 0, i = 0, a = u.length, r = !0; u && a > s; s++) if (u[s].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                t = !1;
                break
            }
            r = !1,
            u && (c ? c.length && l(c.shift()) : t ? u = [] : f.disable())
        },
        f = {
            add: function() {
                if (u) {
                    var n = u.length; !
                    function o(t) {
                        Q.each(t,
                        function(t, n) {
                            var r = Q.type(n);
                            "function" === r ? e.unique && f.has(n) || u.push(n) : n && n.length && "string" !== r && o(n)
                        })
                    } (arguments),
                    r ? a = u.length: t && (i = n, l(t))
                }
                return this
            },
            remove: function() {
                return u && Q.each(arguments,
                function(e, t) {
                    for (var n; (n = Q.inArray(t, u, n)) > -1;) u.splice(n, 1),
                    r && (a >= n && a--, s >= n && s--)
                }),
                this
            },
            has: function(e) {
                return e ? Q.inArray(e, u) > -1 : !(!u || !u.length)
            },
            empty: function() {
                return u = [],
                a = 0,
                this
            },
            disable: function() {
                return u = c = t = void 0,
                this
            },
            disabled: function() {
                return ! u
            },
            lock: function() {
                return c = void 0,
                t || f.disable(),
                this
            },
            locked: function() {
                return ! c
            },
            fireWith: function(e, t) {
                return ! u || n && !c || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? c.push(t) : l(t)),
                this
            },
            fire: function() {
                return f.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !! n
            }
        };
        return f
    },
    Q.extend({
        Deferred: function(e) {
            var t = [["resolve", "done", Q.Callbacks("once memory"), "resolved"], ["reject", "fail", Q.Callbacks("once memory"), "rejected"], ["notify", "progress", Q.Callbacks("memory")]],
            n = "pending",
            r = {
                state: function() {
                    return n
                },
                always: function() {
                    return i.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var e = arguments;
                    return Q.Deferred(function(n) {
                        Q.each(t,
                        function(t, o) {
                            var a = Q.isFunction(e[t]) && e[t];
                            i[o[1]](function() {
                                var e = a && a.apply(this, arguments);
                                e && Q.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                            })
                        }),
                        e = null
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? Q.extend(e, r) : r
                }
            },
            i = {};
            return r.pipe = r.then,
            Q.each(t,
            function(e, o) {
                var a = o[2],
                s = o[3];
                r[o[1]] = a.add,
                s && a.add(function() {
                    n = s
                },
                t[1 ^ e][2].disable, t[2][2].lock),
                i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r: this, arguments),
                    this
                },
                i[o[0] + "With"] = a.fireWith
            }),
            r.promise(i),
            e && e.call(i, i),
            i
        },
        when: function(e) {
            var t, n, r, i = 0,
            o = B.call(arguments),
            a = o.length,
            s = 1 !== a || e && Q.isFunction(e.promise) ? a: 0,
            u = 1 === s ? e: Q.Deferred(),
            c = function(e, n, r) {
                return function(i) {
                    n[e] = this,
                    r[e] = arguments.length > 1 ? B.call(arguments) : i,
                    r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
                }
            };
            if (a > 1) for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++) o[i] && Q.isFunction(o[i].promise) ? o[i].promise().done(c(i, r, o)).fail(u.reject).progress(c(i, n, t)) : --s;
            return s || u.resolveWith(r, o),
            u.promise()
        }
    });
    var me;
    Q.fn.ready = function(e) {
        return Q.ready.promise().done(e),
        this
    },
    Q.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? Q.readyWait++:Q.ready(!0)
        },
        ready: function(e) { (e === !0 ? --Q.readyWait: Q.isReady) || (Q.isReady = !0, e !== !0 && --Q.readyWait > 0 || (me.resolveWith(K, [Q]), Q.fn.triggerHandler && (Q(K).triggerHandler("ready"), Q(K).off("ready"))))
        }
    }),
    Q.ready.promise = function(t) {
        return me || (me = Q.Deferred(), "complete" === K.readyState ? setTimeout(Q.ready) : (K.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1))),
        me.promise(t)
    },
    Q.ready.promise();
    var ve = Q.access = function(e, t, n, r, i, o, a) {
        var s = 0,
        u = e.length,
        c = null == n;
        if ("object" === Q.type(n)) {
            i = !0;
            for (s in n) Q.access(e, t, s, n[s], !0, o, a)
        } else if (void 0 !== r && (i = !0, Q.isFunction(r) || (a = !0), c && (a ? (t.call(e, r), t = null) : (c = t, t = function(e, t, n) {
            return c.call(Q(e), n)
        })), t)) for (; u > s; s++) t(e[s], n, a ? r: r.call(e[s], s, t(e[s], n)));
        return i ? e: c ? t.call(e) : u ? t(e[0], n) : o
    };
    Q.acceptData = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    },
    s.uid = 1,
    s.accepts = Q.acceptData,
    s.prototype = {
        key: function(e) {
            if (!s.accepts(e)) return 0;
            var t = {},
            n = e[this.expando];
            if (!n) {
                n = s.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    },
                    Object.defineProperties(e, t)
                } catch(r) {
                    t[this.expando] = n,
                    Q.extend(e, t)
                }
            }
            return this.cache[n] || (this.cache[n] = {}),
            n
        },
        set: function(e, t, n) {
            var r, i = this.key(e),
            o = this.cache[i];
            if ("string" == typeof t) o[t] = n;
            else if (Q.isEmptyObject(o)) Q.extend(this.cache[i], t);
            else for (r in t) o[r] = t[r];
            return o
        },
        get: function(e, t) {
            var n = this.cache[this.key(e)];
            return void 0 === t ? n: n[t]
        },
        access: function(e, t, n) {
            var r;
            return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), void 0 !== r ? r: this.get(e, Q.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n: t)
        },
        remove: function(e, t) {
            var n, r, i, o = this.key(e),
            a = this.cache[o];
            if (void 0 === t) this.cache[o] = {};
            else {
                Q.isArray(t) ? r = t.concat(t.map(Q.camelCase)) : (i = Q.camelCase(t), t in a ? r = [t, i] : (r = i, r = r in a ? [r] : r.match(pe) || [])),
                n = r.length;
                for (; n--;) delete a[r[n]]
            }
        },
        hasData: function(e) {
            return ! Q.isEmptyObject(this.cache[e[this.expando]] || {})
        },
        discard: function(e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    };
    var ge = new s,
    ye = new s,
    be = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    we = /([A-Z])/g;
    Q.extend({
        hasData: function(e) {
            return ye.hasData(e) || ge.hasData(e)
        },
        data: function(e, t, n) {
            return ye.access(e, t, n)
        },
        removeData: function(e, t) {
            ye.remove(e, t)
        },
        _data: function(e, t, n) {
            return ge.access(e, t, n)
        },
        _removeData: function(e, t) {
            ge.remove(e, t)
        }
    }),
    Q.fn.extend({
        data: function(e, t) {
            var n, r, i, o = this[0],
            a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = ye.get(o), 1 === o.nodeType && !ge.get(o, "hasDataAttrs"))) {
                    for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = Q.camelCase(r.slice(5)), u(o, r, i[r])));
                    ge.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                ye.set(this, e)
            }) : ve(this,
            function(t) {
                var n, r = Q.camelCase(e);
                if (o && void 0 === t) {
                    if (n = ye.get(o, e), void 0 !== n) return n;
                    if (n = ye.get(o, r), void 0 !== n) return n;
                    if (n = u(o, r, void 0), void 0 !== n) return n
                } else this.each(function() {
                    var n = ye.get(this, r);
                    ye.set(this, r, t),
                    -1 !== e.indexOf("-") && void 0 !== n && ye.set(this, e, t)
                })
            },
            null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                ye.remove(this, e)
            })
        }
    }),
    Q.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = ge.get(e, t), n && (!r || Q.isArray(n) ? r = ge.access(e, t, Q.makeArray(n)) : r.push(n)), r || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = Q.queue(e, t),
            r = n.length,
            i = n.shift(),
            o = Q._queueHooks(e, t),
            a = function() {
                Q.dequeue(e, t)
            };
            "inprogress" === i && (i = n.shift(), r--),
            i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)),
            !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return ge.get(e, n) || ge.access(e, n, {
                empty: Q.Callbacks("once memory").add(function() {
                    ge.remove(e, [t + "queue", n])
                })
            })
        }
    }),
    Q.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--),
            arguments.length < n ? Q.queue(this[0], e) : void 0 === t ? this: this.each(function() {
                var n = Q.queue(this, e, t);
                Q._queueHooks(this, e),
                "fx" === e && "inprogress" !== n[0] && Q.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                Q.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
            i = Q.Deferred(),
            o = this,
            a = this.length,
            s = function() {--r || i.resolveWith(o, [o])
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = ge.get(o[a], e + "queueHooks"),
            n && n.empty && (r++, n.empty.add(s));
            return s(),
            i.promise(t)
        }
    });
    var xe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    Ee = ["Top", "Right", "Bottom", "Left"],
    Te = function(e, t) {
        return e = t || e,
        "none" === Q.css(e, "display") || !Q.contains(e.ownerDocument, e)
    },
    _e = /^(?:checkbox|radio)$/i; !
    function() {
        var e = K.createDocumentFragment(),
        t = e.appendChild(K.createElement("div")),
        n = K.createElement("input");
        n.setAttribute("type", "radio"),
        n.setAttribute("checked", "checked"),
        n.setAttribute("name", "t"),
        t.appendChild(n),
        Y.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked,
        t.innerHTML = "<textarea>x</textarea>",
        Y.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    } ();
    var ke = "undefined";
    Y.focusinBubbles = "onfocusin" in e;
    var Ce = /^key/,
    je = /^(?:mouse|pointer|contextmenu)|click/,
    Se = /^(?:focusinfocus|focusoutblur)$/,
    Le = /^([^.]*)(?:\.(.+)|)$/;
    Q.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var o, a, s, u, c, l, f, d, p, h, m, v = ge.get(e);
            if (v) for (n.handler && (o = n, n = o.handler, i = o.selector), n.guid || (n.guid = Q.guid++), (u = v.events) || (u = v.events = {}), (a = v.handle) || (a = v.handle = function(t) {
                return typeof Q !== ke && Q.event.triggered !== t.type ? Q.event.dispatch.apply(e, arguments) : void 0
            }), t = (t || "").match(pe) || [""], c = t.length; c--;) s = Le.exec(t[c]) || [],
            p = m = s[1],
            h = (s[2] || "").split(".").sort(),
            p && (f = Q.event.special[p] || {},
            p = (i ? f.delegateType: f.bindType) || p, f = Q.event.special[p] || {},
            l = Q.extend({
                type: p,
                origType: m,
                data: r,
                handler: n,
                guid: n.guid,
                selector: i,
                needsContext: i && Q.expr.match.needsContext.test(i),
                namespace: h.join(".")
            },
            o), (d = u[p]) || (d = u[p] = [], d.delegateCount = 0, f.setup && f.setup.call(e, r, h, a) !== !1 || e.addEventListener && e.addEventListener(p, a, !1)), f.add && (f.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, l) : d.push(l), Q.event.global[p] = !0)
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, c, l, f, d, p, h, m, v = ge.hasData(e) && ge.get(e);
            if (v && (u = v.events)) {
                for (t = (t || "").match(pe) || [""], c = t.length; c--;) if (s = Le.exec(t[c]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p) {
                    for (f = Q.event.special[p] || {},
                    p = (r ? f.delegateType: f.bindType) || p, d = u[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = d.length; o--;) l = d[o],
                    !i && m !== l.origType || n && n.guid !== l.guid || s && !s.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (d.splice(o, 1), l.selector && d.delegateCount--, f.remove && f.remove.call(e, l));
                    a && !d.length && (f.teardown && f.teardown.call(e, h, v.handle) !== !1 || Q.removeEvent(e, p, v.handle), delete u[p])
                } else for (p in u) Q.event.remove(e, p + t[c], n, r, !0);
                Q.isEmptyObject(u) && (delete v.handle, ge.remove(e, "events"))
            }
        },
        trigger: function(t, n, r, i) {
            var o, a, s, u, c, l, f, d = [r || K],
            p = J.call(t, "type") ? t.type: t,
            h = J.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = s = r = r || K, 3 !== r.nodeType && 8 !== r.nodeType && !Se.test(p + Q.event.triggered) && (p.indexOf(".") >= 0 && (h = p.split("."), p = h.shift(), h.sort()), c = p.indexOf(":") < 0 && "on" + p, t = t[Q.expando] ? t: new Q.Event(p, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : Q.makeArray(n, [t]), f = Q.event.special[p] || {},
            i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                if (!i && !f.noBubble && !Q.isWindow(r)) {
                    for (u = f.delegateType || p, Se.test(u + p) || (a = a.parentNode); a; a = a.parentNode) d.push(a),
                    s = a;
                    s === (r.ownerDocument || K) && d.push(s.defaultView || s.parentWindow || e)
                }
                for (o = 0; (a = d[o++]) && !t.isPropagationStopped();) t.type = o > 1 ? u: f.bindType || p,
                l = (ge.get(a, "events") || {})[t.type] && ge.get(a, "handle"),
                l && l.apply(a, n),
                l = c && a[c],
                l && l.apply && Q.acceptData(a) && (t.result = l.apply(a, n), t.result === !1 && t.preventDefault());
                return t.type = p,
                i || t.isDefaultPrevented() || f._default && f._default.apply(d.pop(), n) !== !1 || !Q.acceptData(r) || c && Q.isFunction(r[p]) && !Q.isWindow(r) && (s = r[c], s && (r[c] = null), Q.event.triggered = p, r[p](), Q.event.triggered = void 0, s && (r[c] = s)),
                t.result
            }
        },
        dispatch: function(e) {
            e = Q.event.fix(e);
            var t, n, r, i, o, a = [],
            s = B.call(arguments),
            u = (ge.get(this, "events") || {})[e.type] || [],
            c = Q.event.special[e.type] || {};
            if (s[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                for (a = Q.event.handlers.call(this, e, u), t = 0; (i = a[t++]) && !e.isPropagationStopped();) for (e.currentTarget = i.elem, n = 0; (o = i.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((Q.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, e),
                e.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a = [],
            s = t.delegateCount,
            u = e.target;
            if (s && u.nodeType && (!e.button || "click" !== e.type)) for (; u !== this; u = u.parentNode || this) if (u.disabled !== !0 || "click" !== e.type) {
                for (r = [], n = 0; s > n; n++) o = t[n],
                i = o.selector + " ",
                void 0 === r[i] && (r[i] = o.needsContext ? Q(i, this).index(u) >= 0 : Q.find(i, this, null, [u]).length),
                r[i] && r.push(o);
                r.length && a.push({
                    elem: u,
                    handlers: r
                })
            }
            return s < t.length && a.push({
                elem: this,
                handlers: t.slice(s)
            }),
            a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode: t.keyCode),
                e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, o = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || K, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)),
                e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
                e
            }
        },
        fix: function(e) {
            if (e[Q.expando]) return e;
            var t, n, r, i = e.type,
            o = e,
            a = this.fixHooks[i];
            for (a || (this.fixHooks[i] = a = je.test(i) ? this.mouseHooks: Ce.test(i) ? this.keyHooks: {}), r = a.props ? this.props.concat(a.props) : this.props, e = new Q.Event(o), t = r.length; t--;) n = r[t],
            e[n] = o[n];
            return e.target || (e.target = K),
            3 === e.target.nodeType && (e.target = e.target.parentNode),
            a.filter ? a.filter(e, o) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== f() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === f() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && Q.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return Q.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = Q.extend(new Q.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? Q.event.trigger(i, null, t) : Q.event.dispatch.call(t, i),
            i.isDefaultPrevented() && n.preventDefault()
        }
    },
    Q.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    },
    Q.Event = function(e, t) {
        return this instanceof Q.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? c: l) : this.type = e, t && Q.extend(this, t), this.timeStamp = e && e.timeStamp || Q.now(), void(this[Q.expando] = !0)) : new Q.Event(e, t)
    },
    Q.Event.prototype = {
        isDefaultPrevented: l,
        isPropagationStopped: l,
        isImmediatePropagationStopped: l,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = c,
            e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = c,
            e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = c,
            e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    Q.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    },
    function(e, t) {
        Q.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                i = e.relatedTarget,
                o = e.handleObj;
                return (!i || i !== r && !Q.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t),
                n
            }
        }
    }),
    Y.focusinBubbles || Q.each({
        focus: "focusin",
        blur: "focusout"
    },
    function(e, t) {
        var n = function(e) {
            Q.event.simulate(t, e.target, Q.event.fix(e), !0)
        };
        Q.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                i = ge.access(r, t);
                i || r.addEventListener(e, n, !0),
                ge.access(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                i = ge.access(r, t) - 1;
                i ? ge.access(r, t, i) : (r.removeEventListener(e, n, !0), ge.remove(r, t))
            }
        }
    }),
    Q.fn.extend({
        on: function(e, t, n, r, i) {
            var o, a;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (a in e) this.on(a, t, n, e[a], i);
                return this
            }
            if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = l;
            else if (!r) return this;
            return 1 === i && (o = r, r = function(e) {
                return Q().off(e),
                o.apply(this, arguments)
            },
            r.guid = o.guid || (o.guid = Q.guid++)),
            this.each(function() {
                Q.event.add(this, e, r, n, t)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj,
            Q(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace: r.origType, r.selector, r.handler),
            this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0),
            n === !1 && (n = l),
            this.each(function() {
                Q.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                Q.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? Q.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Oe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    Ne = /<([\w:]+)/,
    De = /<|&#?\w+;/,
    Me = /<(?:script|style|link)/i,
    Ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Pe = /^$|\/(?:java|ecma)script/i,
    Ie = /^true\/(.*)/,
    qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Re = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    Re.optgroup = Re.option,
    Re.tbody = Re.tfoot = Re.colgroup = Re.caption = Re.thead,
    Re.th = Re.td,
    Q.extend({
        clone: function(e, t, n) {
            var r, i, o, a, s = e.cloneNode(!0),
            u = Q.contains(e.ownerDocument, e);
            if (! (Y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Q.isXMLDoc(e))) for (a = g(s), o = g(e), r = 0, i = o.length; i > r; r++) y(o[r], a[r]);
            if (t) if (n) for (o = o || g(e), a = a || g(s), r = 0, i = o.length; i > r; r++) v(o[r], a[r]);
            else v(e, s);
            return a = g(s, "script"),
            a.length > 0 && m(a, !u && g(e, "script")),
            s
        },
        buildFragment: function(e, t, n, r) {
            for (var i, o, a, s, u, c, l = t.createDocumentFragment(), f = [], d = 0, p = e.length; p > d; d++) if (i = e[d], i || 0 === i) if ("object" === Q.type(i)) Q.merge(f, i.nodeType ? [i] : i);
            else if (De.test(i)) {
                for (o = o || l.appendChild(t.createElement("div")), a = (Ne.exec(i) || ["", ""])[1].toLowerCase(), s = Re[a] || Re._default, o.innerHTML = s[1] + i.replace(Oe, "<$1></$2>") + s[2], c = s[0]; c--;) o = o.lastChild;
                Q.merge(f, o.childNodes),
                o = l.firstChild,
                o.textContent = ""
            } else f.push(t.createTextNode(i));
            for (l.textContent = "", d = 0; i = f[d++];) if ((!r || -1 === Q.inArray(i, r)) && (u = Q.contains(i.ownerDocument, i), o = g(l.appendChild(i), "script"), u && m(o), n)) for (c = 0; i = o[c++];) Pe.test(i.type || "") && n.push(i);
            return l
        },
        cleanData: function(e) {
            for (var t, n, r, i, o = Q.event.special,
            a = 0; void 0 !== (n = e[a]); a++) {
                if (Q.acceptData(n) && (i = n[ge.expando], i && (t = ge.cache[i]))) {
                    if (t.events) for (r in t.events) o[r] ? Q.event.remove(n, r) : Q.removeEvent(n, r, t.handle);
                    ge.cache[i] && delete ge.cache[i]
                }
                delete ye.cache[n[ye.expando]]
            }
        }
    }),
    Q.fn.extend({
        text: function(e) {
            return ve(this,
            function(e) {
                return void 0 === e ? Q.text(this) : this.empty().each(function() { (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
                })
            },
            null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments,
            function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = d(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments,
            function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = d(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments,
            function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments,
            function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            for (var n, r = e ? Q.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || Q.cleanData(g(n)),
            n.parentNode && (t && Q.contains(n.ownerDocument, n) && m(g(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (Q.cleanData(g(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e,
            t = null == t ? e: t,
            this.map(function() {
                return Q.clone(this, e, t)
            })
        },
        html: function(e) {
            return ve(this,
            function(e) {
                var t = this[0] || {},
                n = 0,
                r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !Me.test(e) && !Re[(Ne.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(Oe, "<$1></$2>");
                    try {
                        for (; r > n; n++) t = this[n] || {},
                        1 === t.nodeType && (Q.cleanData(g(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch(i) {}
                }
                t && this.empty().append(e)
            },
            null, e, arguments.length)
        },
        replaceWith: function() {
            var e = arguments[0];
            return this.domManip(arguments,
            function(t) {
                e = this.parentNode,
                Q.cleanData(g(this)),
                e && e.replaceChild(t, this)
            }),
            e && (e.length || e.nodeType) ? this: this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t) {
            e = W.apply([], e);
            var n, r, i, o, a, s, u = 0,
            c = this.length,
            l = this,
            f = c - 1,
            d = e[0],
            m = Q.isFunction(d);
            if (m || c > 1 && "string" == typeof d && !Y.checkClone && Ae.test(d)) return this.each(function(n) {
                var r = l.eq(n);
                m && (e[0] = d.call(this, n, r.html())),
                r.domManip(e, t)
            });
            if (c && (n = Q.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) {
                for (i = Q.map(g(n, "script"), p), o = i.length; c > u; u++) a = n,
                u !== f && (a = Q.clone(a, !0, !0), o && Q.merge(i, g(a, "script"))),
                t.call(this[u], a, u);
                if (o) for (s = i[i.length - 1].ownerDocument, Q.map(i, h), u = 0; o > u; u++) a = i[u],
                Pe.test(a.type || "") && !ge.access(a, "globalEval") && Q.contains(s, a) && (a.src ? Q._evalUrl && Q._evalUrl(a.src) : Q.globalEval(a.textContent.replace(qe, "")))
            }
            return this
        }
    }),
    Q.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(e, t) {
        Q.fn[e] = function(e) {
            for (var n, r = [], i = Q(e), o = i.length - 1, a = 0; o >= a; a++) n = a === o ? this: this.clone(!0),
            Q(i[a])[t](n),
            $.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var Fe, He = {},
    ze = /^margin/,
    Ue = new RegExp("^(" + xe + ")(?!px)[a-z%]+$", "i"),
    Be = function(t) {
        return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
    }; !
    function() {
        function t() {
            a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
            a.innerHTML = "",
            i.appendChild(o);
            var t = e.getComputedStyle(a, null);
            n = "1%" !== t.top,
            r = "4px" === t.width,
            i.removeChild(o)
        }
        var n, r, i = K.documentElement,
        o = K.createElement("div"),
        a = K.createElement("div");
        a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", Y.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", o.appendChild(a), e.getComputedStyle && Q.extend(Y, {
            pixelPosition: function() {
                return t(),
                n
            },
            boxSizingReliable: function() {
                return null == r && t(),
                r
            },
            reliableMarginRight: function() {
                var t, n = a.appendChild(K.createElement("div"));
                return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                n.style.marginRight = n.style.width = "0",
                a.style.width = "1px",
                i.appendChild(o),
                t = !parseFloat(e.getComputedStyle(n, null).marginRight),
                i.removeChild(o),
                a.removeChild(n),
                t
            }
        }))
    } (),
    Q.swap = function(e, t, n, r) {
        var i, o, a = {};
        for (o in t) a[o] = e.style[o],
        e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t) e.style[o] = a[o];
        return i
    };
    var We = /^(none|table(?!-c[ea]).+)/,
    $e = new RegExp("^(" + xe + ")(.*)$", "i"),
    Xe = new RegExp("^([+-])=(" + xe + ")", "i"),
    Ve = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    },
    Ge = {
        letterSpacing: "0",
        fontWeight: "400"
    },
    Je = ["Webkit", "O", "Moz", "ms"];
    Q.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = x(e, "opacity");
                        return "" === n ? "1": n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = Q.camelCase(t),
                u = e.style;
                return t = Q.cssProps[s] || (Q.cssProps[s] = T(u, s)),
                a = Q.cssHooks[t] || Q.cssHooks[s],
                void 0 === n ? a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i: u[t] : (o = typeof n, "string" === o && (i = Xe.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(Q.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || Q.cssNumber[s] || (n += "px"), Y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u[t] = n)), void 0)
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = Q.camelCase(t);
            return t = Q.cssProps[s] || (Q.cssProps[s] = T(e.style, s)),
            a = Q.cssHooks[t] || Q.cssHooks[s],
            a && "get" in a && (i = a.get(e, !0, n)),
            void 0 === i && (i = x(e, t, r)),
            "normal" === i && t in Ge && (i = Ge[t]),
            "" === n || n ? (o = parseFloat(i), n === !0 || Q.isNumeric(o) ? o || 0 : i) : i
        }
    }),
    Q.each(["height", "width"],
    function(e, t) {
        Q.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? We.test(Q.css(e, "display")) && 0 === e.offsetWidth ? Q.swap(e, Ve,
                function() {
                    return C(e, t, r)
                }) : C(e, t, r) : void 0
            },
            set: function(e, n, r) {
                var i = r && Be(e);
                return _(e, n, r ? k(e, t, r, "border-box" === Q.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }),
    Q.cssHooks.marginRight = E(Y.reliableMarginRight,
    function(e, t) {
        return t ? Q.swap(e, {
            display: "inline-block"
        },
        x, [e, "marginRight"]) : void 0
    }),
    Q.each({
        margin: "",
        padding: "",
        border: "Width"
    },
    function(e, t) {
        Q.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0,
                i = {},
                o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + Ee[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        },
        ze.test(e) || (Q.cssHooks[e + t].set = _)
    }),
    Q.fn.extend({
        css: function(e, t) {
            return ve(this,
            function(e, t, n) {
                var r, i, o = {},
                a = 0;
                if (Q.isArray(t)) {
                    for (r = Be(e), i = t.length; i > a; a++) o[t[a]] = Q.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? Q.style(e, t, n) : Q.css(e, t)
            },
            e, t, arguments.length > 1)
        },
        show: function() {
            return j(this, !0)
        },
        hide: function() {
            return j(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Te(this) ? Q(this).show() : Q(this).hide()
            })
        }
    }),
    Q.Tween = S,
    S.prototype = {
        constructor: S,
        init: function(e, t, n, r, i, o) {
            this.elem = e,
            this.prop = n,
            this.easing = i || "swing",
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = r,
            this.unit = o || (Q.cssNumber[n] ? "": "px")
        },
        cur: function() {
            var e = S.propHooks[this.prop];
            return e && e.get ? e.get(this) : S.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = S.propHooks[this.prop];
            return this.options.duration ? this.pos = t = Q.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : S.propHooks._default.set(this),
            this
        }
    },
    S.prototype.init.prototype = S.prototype,
    S.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Q.css(e.elem, e.prop, ""), t && "auto" !== t ? t: 0) : e.elem[e.prop]
            },
            set: function(e) {
                Q.fx.step[e.prop] ? Q.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Q.cssProps[e.prop]] || Q.cssHooks[e.prop]) ? Q.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    },
    S.propHooks.scrollTop = S.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    Q.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return.5 - Math.cos(e * Math.PI) / 2
        }
    },
    Q.fx = S.prototype.init,
    Q.fx.step = {};
    var Ye, Ke, Ze = /^(?:toggle|show|hide)$/,
    Qe = new RegExp("^(?:([+-])=|)(" + xe + ")([a-z%]*)$", "i"),
    et = /queueHooks$/,
    tt = [D],
    nt = {
        "*": [function(e, t) {
            var n = this.createTween(e, t),
            r = n.cur(),
            i = Qe.exec(t),
            o = i && i[3] || (Q.cssNumber[e] ? "": "px"),
            a = (Q.cssNumber[e] || "px" !== o && +r) && Qe.exec(Q.css(n.elem, e)),
            s = 1,
            u = 20;
            if (a && a[3] !== o) {
                o = o || a[3],
                i = i || [],
                a = +r || 1;
                do s = s || ".5",
                a /= s,
                Q.style(n.elem, e, a + o);
                while (s !== (s = n.cur() / r) && 1 !== s && --u)
            }
            return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]),
            n
        }]
    };
    Q.Animation = Q.extend(A, {
        tweener: function(e, t) {
            Q.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, r = 0,
            i = e.length; i > r; r++) n = e[r],
            nt[n] = nt[n] || [],
            nt[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? tt.unshift(e) : tt.push(e)
        }
    }),
    Q.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? Q.extend({},
        e) : {
            complete: n || !n && t || Q.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !Q.isFunction(t) && t
        };
        return r.duration = Q.fx.off ? 0 : "number" == typeof r.duration ? r.duration: r.duration in Q.fx.speeds ? Q.fx.speeds[r.duration] : Q.fx.speeds._default,
        (null == r.queue || r.queue === !0) && (r.queue = "fx"),
        r.old = r.complete,
        r.complete = function() {
            Q.isFunction(r.old) && r.old.call(this),
            r.queue && Q.dequeue(this, r.queue)
        },
        r
    },
    Q.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Te).css("opacity", 0).show().end().animate({
                opacity: t
            },
            e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = Q.isEmptyObject(e),
            o = Q.speed(t, n, r),
            a = function() {
                var t = A(this, Q.extend({},
                e), o); (i || ge.get(this, "finish")) && t.stop(!0)
            };
            return a.finish = a,
            i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop,
                t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0),
            t && e !== !1 && this.queue(e || "fx", []),
            this.each(function() {
                var t = !0,
                i = null != e && e + "queueHooks",
                o = Q.timers,
                a = ge.get(this);
                if (i) a[i] && a[i].stop && r(a[i]);
                else for (i in a) a[i] && a[i].stop && et.test(i) && r(a[i]);
                for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1)); (t || !n) && Q.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"),
            this.each(function() {
                var t, n = ge.get(this),
                r = n[e + "queue"],
                i = n[e + "queueHooks"],
                o = Q.timers,
                a = r ? r.length: 0;
                for (n.finish = !0, Q.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }),
    Q.each(["toggle", "show", "hide"],
    function(e, t) {
        var n = Q.fn[t];
        Q.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(O(t, !0), e, r, i)
        }
    }),
    Q.each({
        slideDown: O("show"),
        slideUp: O("hide"),
        slideToggle: O("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    },
    function(e, t) {
        Q.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }),
    Q.timers = [],
    Q.fx.tick = function() {
        var e, t = 0,
        n = Q.timers;
        for (Ye = Q.now(); t < n.length; t++) e = n[t],
        e() || n[t] !== e || n.splice(t--, 1);
        n.length || Q.fx.stop(),
        Ye = void 0
    },
    Q.fx.timer = function(e) {
        Q.timers.push(e),
        e() ? Q.fx.start() : Q.timers.pop()
    },
    Q.fx.interval = 13,
    Q.fx.start = function() {
        Ke || (Ke = setInterval(Q.fx.tick, Q.fx.interval))
    },
    Q.fx.stop = function() {
        clearInterval(Ke),
        Ke = null
    },
    Q.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    Q.fn.delay = function(e, t) {
        return e = Q.fx ? Q.fx.speeds[e] || e: e,
        t = t || "fx",
        this.queue(t,
        function(t, n) {
            var r = setTimeout(t, e);
            n.stop = function() {
                clearTimeout(r)
            }
        })
    },
    function() {
        var e = K.createElement("input"),
        t = K.createElement("select"),
        n = t.appendChild(K.createElement("option"));
        e.type = "checkbox",
        Y.checkOn = "" !== e.value,
        Y.optSelected = n.selected,
        t.disabled = !0,
        Y.optDisabled = !n.disabled,
        e = K.createElement("input"),
        e.value = "t",
        e.type = "radio",
        Y.radioValue = "t" === e.value
    } ();
    var rt, it, ot = Q.expr.attrHandle;
    Q.fn.extend({
        attr: function(e, t) {
            return ve(this, Q.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                Q.removeAttr(this, e)
            })
        }
    }),
    Q.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o) return typeof e.getAttribute === ke ? Q.prop(e, t, n) : (1 === o && Q.isXMLDoc(e) || (t = t.toLowerCase(), r = Q.attrHooks[t] || (Q.expr.match.bool.test(t) ? it: rt)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i: (i = Q.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i: (e.setAttribute(t, n + ""), n) : void Q.removeAttr(e, t))
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
            o = t && t.match(pe);
            if (o && 1 === e.nodeType) for (; n = o[i++];) r = Q.propFix[n] || n,
            Q.expr.match.bool.test(n) && (e[r] = !1),
            e.removeAttribute(n)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!Y.radioValue && "radio" === t && Q.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        }
    }),
    it = {
        set: function(e, t, n) {
            return t === !1 ? Q.removeAttr(e, n) : e.setAttribute(n, n),
            n
        }
    },
    Q.each(Q.expr.match.bool.source.match(/\w+/g),
    function(e, t) {
        var n = ot[t] || Q.find.attr;
        ot[t] = function(e, t, r) {
            var i, o;
            return r || (o = ot[t], ot[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, ot[t] = o),
            i
        }
    });
    var at = /^(?:input|select|textarea|button)$/i;
    Q.fn.extend({
        prop: function(e, t) {
            return ve(this, Q.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[Q.propFix[e] || e]
            })
        }
    }),
    Q.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var r, i, o, a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !Q.isXMLDoc(e),
            o && (t = Q.propFix[t] || t, i = Q.propHooks[t]),
            void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r: e[t] = n: i && "get" in i && null !== (r = i.get(e, t)) ? r: e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    return e.hasAttribute("tabindex") || at.test(e.nodeName) || e.href ? e.tabIndex: -1
                }
            }
        }
    }),
    Y.optSelected || (Q.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex,
            null
        }
    }),
    Q.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"],
    function() {
        Q.propFix[this.toLowerCase()] = this
    });
    var st = /[\t\r\n\f]/g;
    Q.fn.extend({
        addClass: function(e) {
            var t, n, r, i, o, a, s = "string" == typeof e && e,
            u = 0,
            c = this.length;
            if (Q.isFunction(e)) return this.each(function(t) {
                Q(this).addClass(e.call(this, t, this.className))
            });
            if (s) for (t = (e || "").match(pe) || []; c > u; u++) if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(st, " ") : " ")) {
                for (o = 0; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                a = Q.trim(r),
                n.className !== a && (n.className = a)
            }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, a, s = 0 === arguments.length || "string" == typeof e && e,
            u = 0,
            c = this.length;
            if (Q.isFunction(e)) return this.each(function(t) {
                Q(this).removeClass(e.call(this, t, this.className))
            });
            if (s) for (t = (e || "").match(pe) || []; c > u; u++) if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(st, " ") : "")) {
                for (o = 0; i = t[o++];) for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                a = e ? Q.trim(r) : "",
                n.className !== a && (n.className = a)
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : Q.isFunction(e) ? this.each(function(n) {
                Q(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if ("string" === n) for (var t, r = 0,
                i = Q(this), o = e.match(pe) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else(n === ke || "boolean" === n) && (this.className && ge.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "": ge.get(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ",
            n = 0,
            r = this.length; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(st, " ").indexOf(t) >= 0) return ! 0;
            return ! 1
        }
    });
    var ut = /\r/g;
    Q.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0]; {
                if (arguments.length) return r = Q.isFunction(e),
                this.each(function(n) {
                    var i;
                    1 === this.nodeType && (i = r ? e.call(this, n, Q(this).val()) : e, null == i ? i = "": "number" == typeof i ? i += "": Q.isArray(i) && (i = Q.map(i,
                    function(e) {
                        return null == e ? "": e + ""
                    })), t = Q.valHooks[this.type] || Q.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                });
                if (i) return t = Q.valHooks[i.type] || Q.valHooks[i.nodeName.toLowerCase()],
                t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n: (n = i.value, "string" == typeof n ? n.replace(ut, "") : null == n ? "": n)
            }
        }
    }),
    Q.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = Q.find.attr(e, "value");
                    return null != t ? t: Q.trim(Q.text(e))
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options,
                    i = e.selectedIndex,
                    o = "select-one" === e.type || 0 > i,
                    a = o ? null: [], s = o ? i + 1 : r.length, u = 0 > i ? s: o ? i: 0; s > u; u++) if (n = r[u], (n.selected || u === i) && (Y.optDisabled ? !n.disabled: null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !Q.nodeName(n.parentNode, "optgroup"))) {
                        if (t = Q(n).val(), o) return t;
                        a.push(t)
                    }
                    return a
                },
                set: function(e, t) {
                    for (var n, r, i = e.options,
                    o = Q.makeArray(t), a = i.length; a--;) r = i[a],
                    (r.selected = Q.inArray(r.value, o) >= 0) && (n = !0);
                    return n || (e.selectedIndex = -1),
                    o
                }
            }
        }
    }),
    Q.each(["radio", "checkbox"],
    function() {
        Q.valHooks[this] = {
            set: function(e, t) {
                return Q.isArray(t) ? e.checked = Q.inArray(Q(e).val(), t) >= 0 : void 0
            }
        },
        Y.checkOn || (Q.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on": e.value
        })
    }),
    Q.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
    function(e, t) {
        Q.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }),
    Q.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var ct = Q.now(),
    lt = /\?/;
    Q.parseJSON = function(e) {
        return JSON.parse(e + "")
    },
    Q.parseXML = function(e) {
        var t, n;
        if (!e || "string" != typeof e) return null;
        try {
            n = new DOMParser,
            t = n.parseFromString(e, "text/xml")
        } catch(r) {
            t = void 0
        }
        return (!t || t.getElementsByTagName("parsererror").length) && Q.error("Invalid XML: " + e),
        t
    };
    var ft = /#.*$/,
    dt = /([?&])_=[^&]*/,
    pt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    ht = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    mt = /^(?:GET|HEAD)$/,
    vt = /^\/\//,
    gt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    yt = {},
    bt = {},
    wt = "*/".concat("*"),
    xt = e.location.href,
    Et = gt.exec(xt.toLowerCase()) || [];
    Q.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: xt,
            type: "GET",
            isLocal: ht.test(Et[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": wt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": Q.parseJSON,
                "text xml": Q.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? q(q(e, Q.ajaxSettings), t) : q(Q.ajaxSettings, e)
        },
        ajaxPrefilter: P(yt),
        ajaxTransport: P(bt),
        ajax: function(e, t) {
            function n(e, t, n, a) {
                var u, l, g, y, w, E = t;
                2 !== b && (b = 2, s && clearTimeout(s), r = void 0, o = a || "", x.readyState = e > 0 ? 4 : 0, u = e >= 200 && 300 > e || 304 === e, n && (y = R(f, x, n)), y = F(f, y, x, u), u ? (f.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (Q.lastModified[i] = w), w = x.getResponseHeader("etag"), w && (Q.etag[i] = w)), 204 === e || "HEAD" === f.type ? E = "nocontent": 304 === e ? E = "notmodified": (E = y.state, l = y.data, g = y.error, u = !g)) : (g = E, (e || !E) && (E = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (t || E) + "", u ? h.resolveWith(d, [l, E, x]) : h.rejectWith(d, [x, E, g]), x.statusCode(v), v = void 0, c && p.trigger(u ? "ajaxSuccess": "ajaxError", [x, f, u ? l: g]), m.fireWith(d, [x, E]), c && (p.trigger("ajaxComplete", [x, f]), --Q.active || Q.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = void 0),
            t = t || {};
            var r, i, o, a, s, u, c, l, f = Q.ajaxSetup({},
            t),
            d = f.context || f,
            p = f.context && (d.nodeType || d.jquery) ? Q(d) : Q.event,
            h = Q.Deferred(),
            m = Q.Callbacks("once memory"),
            v = f.statusCode || {},
            g = {},
            y = {},
            b = 0,
            w = "canceled",
            x = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === b) {
                        if (!a) for (a = {}; t = pt.exec(o);) a[t[1].toLowerCase()] = t[2];
                        t = a[e.toLowerCase()]
                    }
                    return null == t ? null: t
                },
                getAllResponseHeaders: function() {
                    return 2 === b ? o: null
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    return b || (e = y[n] = y[n] || e, g[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return b || (f.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e) if (2 > b) for (t in e) v[t] = [v[t], e[t]];
                    else x.always(e[x.status]);
                    return this
                },
                abort: function(e) {
                    var t = e || w;
                    return r && r.abort(t),
                    n(0, t),
                    this
                }
            };
            if (h.promise(x).complete = m.add, x.success = x.done, x.error = x.fail, f.url = ((e || f.url || xt) + "").replace(ft, "").replace(vt, Et[1] + "//"), f.type = t.method || t.type || f.method || f.type, f.dataTypes = Q.trim(f.dataType || "*").toLowerCase().match(pe) || [""], null == f.crossDomain && (u = gt.exec(f.url.toLowerCase()), f.crossDomain = !(!u || u[1] === Et[1] && u[2] === Et[2] && (u[3] || ("http:" === u[1] ? "80": "443")) === (Et[3] || ("http:" === Et[1] ? "80": "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = Q.param(f.data, f.traditional)), I(yt, f, t, x), 2 === b) return x;
            c = Q.event && f.global,
            c && 0 === Q.active++&&Q.event.trigger("ajaxStart"),
            f.type = f.type.toUpperCase(),
            f.hasContent = !mt.test(f.type),
            i = f.url,
            f.hasContent || (f.data && (i = f.url += (lt.test(i) ? "&": "?") + f.data, delete f.data), f.cache === !1 && (f.url = dt.test(i) ? i.replace(dt, "$1_=" + ct++) : i + (lt.test(i) ? "&": "?") + "_=" + ct++)),
            f.ifModified && (Q.lastModified[i] && x.setRequestHeader("If-Modified-Since", Q.lastModified[i]), Q.etag[i] && x.setRequestHeader("If-None-Match", Q.etag[i])),
            (f.data && f.hasContent && f.contentType !== !1 || t.contentType) && x.setRequestHeader("Content-Type", f.contentType),
            x.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + wt + "; q=0.01": "") : f.accepts["*"]);
            for (l in f.headers) x.setRequestHeader(l, f.headers[l]);
            if (f.beforeSend && (f.beforeSend.call(d, x, f) === !1 || 2 === b)) return x.abort();
            w = "abort";
            for (l in {
                success: 1,
                error: 1,
                complete: 1
            }) x[l](f[l]);
            if (r = I(bt, f, t, x)) {
                x.readyState = 1,
                c && p.trigger("ajaxSend", [x, f]),
                f.async && f.timeout > 0 && (s = setTimeout(function() {
                    x.abort("timeout")
                },
                f.timeout));
                try {
                    b = 1,
                    r.send(g, n)
                } catch(E) {
                    if (! (2 > b)) throw E;
                    n( - 1, E)
                }
            } else n( - 1, "No Transport");
            return x
        },
        getJSON: function(e, t, n) {
            return Q.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return Q.get(e, void 0, t, "script")
        }
    }),
    Q.each(["get", "post"],
    function(e, t) {
        Q[t] = function(e, n, r, i) {
            return Q.isFunction(n) && (i = i || r, r = n, n = void 0),
            Q.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }),
    Q._evalUrl = function(e) {
        return Q.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    },
    Q.fn.extend({
        wrapAll: function(e) {
            var t;
            return Q.isFunction(e) ? this.each(function(t) {
                Q(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = Q(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return Q.isFunction(e) ? this.each(function(t) {
                Q(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = Q(this),
                n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = Q.isFunction(e);
            return this.each(function(n) {
                Q(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                Q.nodeName(this, "body") || Q(this).replaceWith(this.childNodes)
            }).end()
        }
    }),
    Q.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0
    },
    Q.expr.filters.visible = function(e) {
        return ! Q.expr.filters.hidden(e)
    };
    var Tt = /%20/g,
    _t = /\[\]$/,
    kt = /\r?\n/g,
    Ct = /^(?:submit|button|image|reset|file)$/i,
    jt = /^(?:input|select|textarea|keygen)/i;
    Q.param = function(e, t) {
        var n, r = [],
        i = function(e, t) {
            t = Q.isFunction(t) ? t() : null == t ? "": t,
            r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = Q.ajaxSettings && Q.ajaxSettings.traditional), Q.isArray(e) || e.jquery && !Q.isPlainObject(e)) Q.each(e,
        function() {
            i(this.name, this.value)
        });
        else for (n in e) H(n, e[n], t, i);
        return r.join("&").replace(Tt, "+")
    },
    Q.fn.extend({
        serialize: function() {
            return Q.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = Q.prop(this, "elements");
                return e ? Q.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !Q(this).is(":disabled") && jt.test(this.nodeName) && !Ct.test(e) && (this.checked || !_e.test(e))
            }).map(function(e, t) {
                var n = Q(this).val();
                return null == n ? null: Q.isArray(n) ? Q.map(n,
                function(e) {
                    return {
                        name: t.name,
                        value: e.replace(kt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(kt, "\r\n")
                }
            }).get()
        }
    }),
    Q.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch(e) {}
    };
    var St = 0,
    Lt = {},
    Ot = {
        0 : 200,
        1223 : 204
    },
    Nt = Q.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload",
    function() {
        for (var e in Lt) Lt[e]()
    }),
    Y.cors = !!Nt && "withCredentials" in Nt,
    Y.ajax = Nt = !!Nt,
    Q.ajaxTransport(function(e) {
        var t;
        return Y.cors || Nt && !e.crossDomain ? {
            send: function(n, r) {
                var i, o = e.xhr(),
                a = ++St;
                if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (i in e.xhrFields) o[i] = e.xhrFields[i];
                e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType),
                e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n) o.setRequestHeader(i, n[i]);
                t = function(e) {
                    return function() {
                        t && (delete Lt[a], t = o.onload = o.onerror = null, "abort" === e ? o.abort() : "error" === e ? r(o.status, o.statusText) : r(Ot[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {
                            text: o.responseText
                        }: void 0, o.getAllResponseHeaders()))
                    }
                },
                o.onload = t(),
                o.onerror = t("error"),
                t = Lt[a] = t("abort");
                try {
                    o.send(e.hasContent && e.data || null)
                } catch(s) {
                    if (t) throw s
                }
            },
            abort: function() {
                t && t()
            }
        }: void 0
    }),
    Q.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return Q.globalEval(e),
                e
            }
        }
    }),
    Q.ajaxPrefilter("script",
    function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET")
    }),
    Q.ajaxTransport("script",
    function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = Q("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(),
                        n = null,
                        e && i("error" === e.type ? 404 : 200, e.type)
                    }),
                    K.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var Dt = [],
    Mt = /(=)\?(?=&|$)|\?\?/;
    Q.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Dt.pop() || Q.expando + "_" + ct++;
            return this[e] = !0,
            e
        }
    }),
    Q.ajaxPrefilter("json jsonp",
    function(t, n, r) {
        var i, o, a, s = t.jsonp !== !1 && (Mt.test(t.url) ? "url": "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Mt.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = Q.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Mt, "$1" + i) : t.jsonp !== !1 && (t.url += (lt.test(t.url) ? "&": "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return a || Q.error(i + " was not called"),
            a[0]
        },
        t.dataTypes[0] = "json", o = e[i], e[i] = function() {
            a = arguments
        },
        r.always(function() {
            e[i] = o,
            t[i] && (t.jsonpCallback = n.jsonpCallback, Dt.push(i)),
            a && Q.isFunction(o) && o(a[0]),
            a = o = void 0
        }), "script") : void 0
    }),
    Q.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1),
        t = t || K;
        var r = ae.exec(e),
        i = !n && [];
        return r ? [t.createElement(r[1])] : (r = Q.buildFragment([e], t, i), i && i.length && Q(i).remove(), Q.merge([], r.childNodes))
    };
    var At = Q.fn.load;
    Q.fn.load = function(e, t, n) {
        if ("string" != typeof e && At) return At.apply(this, arguments);
        var r, i, o, a = this,
        s = e.indexOf(" ");
        return s >= 0 && (r = Q.trim(e.slice(s)), e = e.slice(0, s)),
        Q.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"),
        a.length > 0 && Q.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments,
            a.html(r ? Q("<div>").append(Q.parseHTML(e)).find(r) : e)
        }).complete(n &&
        function(e, t) {
            a.each(n, o || [e.responseText, t, e])
        }),
        this
    },
    Q.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"],
    function(e, t) {
        Q.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    Q.expr.filters.animated = function(e) {
        return Q.grep(Q.timers,
        function(t) {
            return e === t.elem
        }).length
    };
    var Pt = e.document.documentElement;
    Q.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, c, l = Q.css(e, "position"),
            f = Q(e),
            d = {};
            "static" === l && (e.style.position = "relative"),
            s = f.offset(),
            o = Q.css(e, "top"),
            u = Q.css(e, "left"),
            c = ("absolute" === l || "fixed" === l) && (o + u).indexOf("auto") > -1,
            c ? (r = f.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0),
            Q.isFunction(t) && (t = t.call(e, n, s)),
            null != t.top && (d.top = t.top - s.top + a),
            null != t.left && (d.left = t.left - s.left + i),
            "using" in t ? t.using.call(e, d) : f.css(d)
        }
    },
    Q.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this: this.each(function(t) {
                Q.offset.setOffset(this, e, t)
            });
            var t, n, r = this[0],
            i = {
                top: 0,
                left: 0
            },
            o = r && r.ownerDocument;
            if (o) return t = o.documentElement,
            Q.contains(t, r) ? (typeof r.getBoundingClientRect !== ke && (i = r.getBoundingClientRect()), n = z(o), {
                top: i.top + n.pageYOffset - t.clientTop,
                left: i.left + n.pageXOffset - t.clientLeft
            }) : i
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0],
                r = {
                    top: 0,
                    left: 0
                };
                return "fixed" === Q.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), Q.nodeName(e[0], "html") || (r = e.offset()), r.top += Q.css(e[0], "borderTopWidth", !0), r.left += Q.css(e[0], "borderLeftWidth", !0)),
                {
                    top: t.top - r.top - Q.css(n, "marginTop", !0),
                    left: t.left - r.left - Q.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || Pt; e && !Q.nodeName(e, "html") && "static" === Q.css(e, "position");) e = e.offsetParent;
                return e || Pt
            })
        }
    }),
    Q.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    },
    function(t, n) {
        var r = "pageYOffset" === n;
        Q.fn[t] = function(i) {
            return ve(this,
            function(t, i, o) {
                var a = z(t);
                return void 0 === o ? a ? a[n] : t[i] : void(a ? a.scrollTo(r ? e.pageXOffset: o, r ? o: e.pageYOffset) : t[i] = o)
            },
            t, i, arguments.length, null)
        }
    }),
    Q.each(["top", "left"],
    function(e, t) {
        Q.cssHooks[t] = E(Y.pixelPosition,
        function(e, n) {
            return n ? (n = x(e, t), Ue.test(n) ? Q(e).position()[t] + "px": n) : void 0
        })
    }),
    Q.each({
        Height: "height",
        Width: "width"
    },
    function(e, t) {
        Q.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        },
        function(n, r) {
            Q.fn[r] = function(r, i) {
                var o = arguments.length && (n || "boolean" != typeof r),
                a = n || (r === !0 || i === !0 ? "margin": "border");
                return ve(this,
                function(t, n, r) {
                    var i;
                    return Q.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? Q.css(t, n, a) : Q.style(t, n, r, a)
                },
                t, o ? r: void 0, o, null)
            }
        })
    }),
    Q.fn.size = function() {
        return this.length
    },
    Q.fn.andSelf = Q.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [],
    function() {
        return Q
    });
    var It = e.jQuery,
    qt = e.$;
    return Q.noConflict = function(t) {
        return e.$ === Q && (e.$ = qt),
        t && e.jQuery === Q && (e.jQuery = It),
        Q
    },
    typeof t === ke && (e.jQuery = e.$ = Q),
    Q
}),
delete define.amd,
define.amd = "selector-set",
function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.SelectorSet = t()
} (this,
function() {
    "use strict";
    function e() {
        return this instanceof e ? (this.size = 0, this.uid = 0, this.selectors = [], this.indexes = Object.create(this.indexes), void(this.activeIndexes = [])) : new e
    }
    function t(e, t) {
        e = e.slice(0).concat(e["default"]);
        var n, r, i, o, a, s, u = e.length,
        c = t,
        f = [];
        do
        if (l.exec(""), (i = l.exec(c)) && (c = i[3], i[2] || !c)) for (n = 0; u > n; n++) if (s = e[n], a = s.selector(i[1])) {
            for (r = f.length, o = !1; r--;) if (f[r].index === s && f[r].key === a) {
                o = !0;
                break
            }
            o || f.push({
                index: s,
                key: a
            });
            break
        }
        while (i);
        return f
    }
    function n(e, t) {
        var n, r, i;
        for (n = 0, r = e.length; r > n; n++) if (i = e[n], t.isPrototypeOf(i)) return i
    }
    function r(e, t) {
        return e.id - t.id
    }
    var i = window.document.documentElement,
    o = i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.oMatchesSelector || i.msMatchesSelector;
    e.prototype.matchesSelector = function(e, t) {
        return o.call(e, t)
    },
    e.prototype.querySelectorAll = function(e, t) {
        return t.querySelectorAll(e)
    },
    e.prototype.indexes = [];
    var a = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
    e.prototype.indexes.push({
        name: "ID",
        selector: function(e) {
            var t;
            return (t = e.match(a)) ? t[0].slice(1) : void 0
        },
        element: function(e) {
            return e.id ? [e.id] : void 0
        }
    });
    var s = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
    e.prototype.indexes.push({
        name: "CLASS",
        selector: function(e) {
            var t;
            return (t = e.match(s)) ? t[0].slice(1) : void 0
        },
        element: function(e) {
            var t = e.className;
            if (t) {
                if ("string" == typeof t) return t.split(/\s/);
                if ("object" == typeof t && "baseVal" in t) return t.baseVal.split(/\s/)
            }
        }
    });
    var u = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
    e.prototype.indexes.push({
        name: "TAG",
        selector: function(e) {
            var t;
            return (t = e.match(u)) ? t[0].toUpperCase() : void 0
        },
        element: function(e) {
            return [e.nodeName.toUpperCase()]
        }
    }),
    e.prototype.indexes["default"] = {
        name: "UNIVERSAL",
        selector: function() {
            return ! 0
        },
        element: function() {
            return [!0]
        }
    };
    var c;
    c = "function" == typeof window.Map ? window.Map: function() {
        function e() {
            this.map = {}
        }
        return e.prototype.get = function(e) {
            return this.map[e + " "]
        },
        e.prototype.set = function(e, t) {
            this.map[e + " "] = t
        },
        e
    } ();
    var l = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
    return e.prototype.logDefaultIndexUsed = function() {},
    e.prototype.add = function(e, r) {
        var i, o, a, s, u, l, f, d, p = this.activeIndexes,
        h = this.selectors;
        if ("string" == typeof e) {
            for (i = {
                id: this.uid++,
                selector: e,
                data: r
            },
            f = t(this.indexes, e), o = 0; o < f.length; o++) d = f[o],
            s = d.key,
            a = d.index,
            u = n(p, a),
            u || (u = Object.create(a), u.map = new c, p.push(u)),
            a === this.indexes["default"] && this.logDefaultIndexUsed(i),
            l = u.map.get(s),
            l || (l = [], u.map.set(s, l)),
            l.push(i);
            this.size++,
            h.push(e)
        }
    },
    e.prototype.remove = function(e, n) {
        if ("string" == typeof e) {
            var r, i, o, a, s, u, c, l, f = this.activeIndexes,
            d = {},
            p = 1 === arguments.length;
            for (r = t(this.indexes, e), o = 0; o < r.length; o++) for (i = r[o], a = f.length; a--;) if (u = f[a], i.index.isPrototypeOf(u)) {
                if (c = u.map.get(i.key)) for (s = c.length; s--;) l = c[s],
                l.selector !== e || !p && l.data !== n || (c.splice(s, 1), d[l.id] = !0);
                break
            }
            this.size -= Object.keys(d).length
        }
    },
    e.prototype.queryAll = function(e) {
        if (!this.selectors.length) return [];
        var t, n, i, o, a, s, u, c, l = {},
        f = [],
        d = this.querySelectorAll(this.selectors.join(", "), e);
        for (t = 0, i = d.length; i > t; t++) for (a = d[t], s = this.matches(a), n = 0, o = s.length; o > n; n++) c = s[n],
        l[c.id] ? u = l[c.id] : (u = {
            id: c.id,
            selector: c.selector,
            data: c.data,
            elements: []
        },
        l[c.id] = u, f.push(u)),
        u.elements.push(a);
        return f.sort(r)
    },
    e.prototype.matches = function(e) {
        if (!e) return [];
        var t, n, i, o, a, s, u, c, l, f, d, p = this.activeIndexes,
        h = {},
        m = [];
        for (t = 0, o = p.length; o > t; t++) if (u = p[t], c = u.element(e)) for (n = 0, a = c.length; a > n; n++) if (l = u.map.get(c[n])) for (i = 0, s = l.length; s > i; i++) f = l[i],
        d = f.id,
        !h[d] && this.matchesSelector(e, f.selector) && (h[d] = !0, m.push(f));
        return m.sort(r)
    },
    e
}),
delete define.amd,
define.amd = "jquery-selector-set",
function(e, t) {
    if ("function" == typeof define && define.amd) define(["jquery", "selector-set"], t);
    else if ("object" == typeof exports) {
        var n = require("jquery"),
        r = require("selector-set");
        module.exports = t(n, r)
    } else t(e.jQuery, e.SelectorSet)
} (this,
function(e, t) {
    function n(e) {
        var t = [],
        n = e.target,
        r = e.handleObj.selectorSet;
        do {
            if (1 !== n.nodeType) break;
            var i = r.matches(n);
            i.length && t.push({
                elem: n,
                handlers: i
            })
        } while ( n = n . parentElement );
        return t
    }
    function r(e) {
        for (var t, r = n(e), i = 0; (t = r[i++]) && !e.isPropagationStopped();) {
            e.currentTarget = t.elem;
            for (var o, a = 0; (o = t.handlers[a++]) && !e.isImmediatePropagationStopped();) {
                var s = o.data.apply(t.elem, arguments);
                void 0 !== s && (e.result = s, s === !1 && (e.preventDefault(), e.stopPropagation()))
            }
        }
    }
    var i = window.document,
    o = e.event.add,
    a = e.event.remove,
    s = {};
    if (!t) throw "SelectorSet undefined - https://github.com/josh/jquery-selector-set";
    e.event.add = function(n, a, u, c, l) {
        if (n !== i || a.match(/\./) || c || !l) o.call(this, n, a, u, c, l);
        else for (var f = a.match(/\S+/g), d = f.length; d--;) {
            var p = f[d],
            h = e.event.special[p] || {};
            p = h.delegateType || p;
            var m = s[p];
            m || (m = s[p] = {
                handler: r,
                selectorSet: new t
            },
            m.selectorSet.matchesSelector = e.find.matchesSelector, o.call(this, n, p, m)),
            m.selectorSet.add(l, u),
            e.expr.cacheLength++,
            e.find.compile && e.find.compile(l)
        }
    },
    e.event.remove = function(t, n, r, o, u) {
        if (t === i && n && !n.match(/\./) && o) for (var c = n.match(/\S+/g), l = c.length; l--;) {
            var f = c[l],
            d = e.event.special[f] || {};
            f = d.delegateType || f;
            var p = s[f];
            p && p.selectorSet.remove(o, r)
        }
        a.call(this, t, n, r, o, u)
    }
}),
delete define.amd,
function() {
    var e, t, n, r, i, o, a, s, u, c, l, f, d, p, h, m, v, g, y, b, w, x, E, T, _, k = [].slice,
    C = [].indexOf ||
    function(e) {
        for (var t = 0,
        n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
        return - 1
    };
    e = window.jQuery || window.Zepto || window.$,
    e.payment = {},
    e.payment.fn = {},
    e.fn.payment = function() {
        var t, n;
        return n = arguments[0],
        t = 2 <= arguments.length ? k.call(arguments, 1) : [],
        e.payment.fn[n].apply(this, t)
    },
    i = /(\d{1,4})/g,
    e.payment.cards = r = [{
        type: "visaelectron",
        pattern: /^4(026|17500|405|508|844|91[37])/,
        format: i,
        length: [16],
        cvcLength: [3],
        luhn: !0
    },
    {
        type: "maestro",
        pattern: /^(5(018|0[23]|[68])|6(39|7))/,
        format: i,
        length: [12, 13, 14, 15, 16, 17, 18, 19],
        cvcLength: [3],
        luhn: !0
    },
    {
        type: "forbrugsforeningen",
        pattern: /^600/,
        format: i,
        length: [16],
        cvcLength: [3],
        luhn: !0
    },
    {
        type: "dankort",
        pattern: /^5019/,
        format: i,
        length: [16],
        cvcLength: [3],
        luhn: !0
    },
    {
        type: "visa",
        pattern: /^4/,
        format: i,
        length: [13, 16],
        cvcLength: [3],
        luhn: !0
    },
    {
        type: "mastercard",
        pattern: /^(5[0-5]|2[2-7])/,
        format: i,
        length: [16],
        cvcLength: [3],
        luhn: !0
    },
    {
        type: "amex",
        pattern: /^3[47]/,
        format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
        length: [15],
        cvcLength: [3, 4],
        luhn: !0
    },
    {
        type: "dinersclub",
        pattern: /^3[0689]/,
        format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
        length: [14],
        cvcLength: [3],
        luhn: !0
    },
    {
        type: "discover",
        pattern: /^6([045]|22)/,
        format: i,
        length: [16],
        cvcLength: [3],
        luhn: !0
    },
    {
        type: "unionpay",
        pattern: /^(62|88)/,
        format: i,
        length: [16, 17, 18, 19],
        cvcLength: [3],
        luhn: !1
    },
    {
        type: "jcb",
        pattern: /^35/,
        format: i,
        length: [16],
        cvcLength: [3],
        luhn: !0
    }],
    t = function(e) {
        var t, n, i;
        for (e = (e + "").replace(/\D/g, ""), n = 0, i = r.length; i > n; n++) if (t = r[n], t.pattern.test(e)) return t
    },
    n = function(e) {
        var t, n, i;
        for (n = 0, i = r.length; i > n; n++) if (t = r[n], t.type === e) return t
    },
    h = function(e) {
        var t, n, r, i, o, a;
        for (r = !0, i = 0, n = (e + "").split("").reverse(), o = 0, a = n.length; a > o; o++) t = n[o],
        t = parseInt(t, 10),
        (r = !r) && (t *= 2),
        t > 9 && (t -= 9),
        i += t;
        return i % 10 === 0
    },
    p = function(e) {
        var t;
        return null != e.prop("selectionStart") && e.prop("selectionStart") !== e.prop("selectionEnd") ? !0 : null != ("undefined" != typeof document && null !== document && null != (t = document.selection) ? t.createRange: void 0) && document.selection.createRange().text ? !0 : !1
    },
    T = function(e, t) {
        var n, r, i;
        try {
            n = t.prop("selectionStart")
        } catch(o) {
            r = o,
            n = null
        }
        return i = t.val(),
        t.val(e),
        null !== n && t.is(":focus") ? (n === i.length && (n = e.length), t.prop("selectionStart", n), t.prop("selectionEnd", n)) : void 0
    },
    y = function(t) {
        return setTimeout(function() {
            var n, r;
            return n = e(t.currentTarget),
            r = n.val(),
            r = r.replace(/\D/g, ""),
            T(r, n)
        })
    },
    v = function(t) {
        return setTimeout(function() {
            var n, r;
            return n = e(t.currentTarget),
            r = n.val(),
            r = e.payment.formatCardNumber(r),
            T(r, n)
        })
    },
    s = function(n) {
        var r, i, o, a, s, u, c;
        return o = String.fromCharCode(n.which),
        !/^\d+$/.test(o) || (r = e(n.currentTarget), c = r.val(), i = t(c + o), a = (c.replace(/\D/g, "") + o).length, u = 16, i && (u = i.length[i.length.length - 1]), a >= u || null != r.prop("selectionStart") && r.prop("selectionStart") !== c.length) ? void 0 : (s = i && "amex" === i.type ? /^(\d{4}|\d{4}\s\d{6})$/: /(?:^|\s)(\d{4})$/, s.test(c) ? (n.preventDefault(), setTimeout(function() {
            return r.val(c + " " + o)
        })) : s.test(c + o) ? (n.preventDefault(), setTimeout(function() {
            return r.val(c + o + " ")
        })) : void 0)
    },
    o = function(t) {
        var n, r;
        return n = e(t.currentTarget),
        r = n.val(),
        8 !== t.which || null != n.prop("selectionStart") && n.prop("selectionStart") !== r.length ? void 0 : /\d\s$/.test(r) ? (t.preventDefault(), setTimeout(function() {
            return n.val(r.replace(/\d\s$/, ""))
        })) : /\s\d?$/.test(r) ? (t.preventDefault(), setTimeout(function() {
            return n.val(r.replace(/\d$/, ""))
        })) : void 0
    },
    g = function(t) {
        return setTimeout(function() {
            var n, r;
            return n = e(t.currentTarget),
            r = n.val(),
            r = e.payment.formatExpiry(r),
            T(r, n)
        })
    },
    u = function(t) {
        var n, r, i;
        return r = String.fromCharCode(t.which),
        /^\d+$/.test(r) ? (n = e(t.currentTarget), i = n.val() + r, /^\d$/.test(i) && "0" !== i && "1" !== i ? (t.preventDefault(), setTimeout(function() {
            return n.val("0" + i + " / ")
        })) : /^\d\d$/.test(i) ? (t.preventDefault(), setTimeout(function() {
            return n.val("" + i + " / ")
        })) : void 0) : void 0
    },
    c = function(t) {
        var n, r, i;
        return r = String.fromCharCode(t.which),
        /^\d+$/.test(r) ? (n = e(t.currentTarget), i = n.val(), /^\d\d$/.test(i) ? n.val("" + i + " / ") : void 0) : void 0
    },
    l = function(t) {
        var n, r, i;
        return i = String.fromCharCode(t.which),
        "/" === i || " " === i ? (n = e(t.currentTarget), r = n.val(), /^\d$/.test(r) && "0" !== r ? n.val("0" + r + " / ") : void 0) : void 0
    },
    a = function(t) {
        var n, r;
        return n = e(t.currentTarget),
        r = n.val(),
        8 !== t.which || null != n.prop("selectionStart") && n.prop("selectionStart") !== r.length ? void 0 : /\d\s\/\s$/.test(r) ? (t.preventDefault(), setTimeout(function() {
            return n.val(r.replace(/\d\s\/\s$/, ""))
        })) : void 0
    },
    m = function(t) {
        return setTimeout(function() {
            var n, r;
            return n = e(t.currentTarget),
            r = n.val(),
            r = r.replace(/\D/g, "").slice(0, 4),
            T(r, n)
        })
    },
    f = function(t) {
        return 229 === t.which ? e(t.currentTarget).data("ime", !0) : void 0
    },
    d = function(t) {
        var n, r;
        return n = e(t.currentTarget),
        r = String.fromCharCode(t.which),
        n.data("ime") === !0 ? (n.data("ime", !1), n.val(n.val() + r), n.trigger("input")) : void 0
    },
    E = function(e) {
        var t;
        return e.metaKey || e.ctrlKey ? !0 : 32 === e.which ? !1 : 0 === e.which ? !0 : e.which < 33 ? !0 : (t = String.fromCharCode(e.which), !!/[\d\s]/.test(t))
    },
    w = function(n) {
        var r, i, o, a;
        return r = e(n.currentTarget),
        o = String.fromCharCode(n.which),
        /^\d+$/.test(o) && !p(r) ? (a = (r.val() + o).replace(/\D/g, ""), i = t(a), i ? a.length <= i.length[i.length.length - 1] : a.length <= 16) : void 0
    },
    x = function(t) {
        var n, r, i;
        return n = e(t.currentTarget),
        r = String.fromCharCode(t.which),
        /^\d+$/.test(r) && !p(n) ? (i = n.val() + r, i = i.replace(/\D/g, ""), i.length > 6 ? !1 : void 0) : void 0
    },
    b = function(t) {
        var n, r, i;
        return n = e(t.currentTarget),
        r = String.fromCharCode(t.which),
        /^\d+$/.test(r) && !p(n) ? (i = n.val() + r, i.length <= 4) : void 0
    },
    _ = function(t) {
        var n, i, o, a, s;
        return n = e(t.currentTarget),
        s = n.val(),
        a = e.payment.cardType(s) || "unknown",
        n.hasClass(a) ? void 0 : (i = function() {
            var e, t, n;
            for (n = [], e = 0, t = r.length; t > e; e++) o = r[e],
            n.push(o.type);
            return n
        } (), n.removeClass("unknown"), n.removeClass(i.join(" ")), n.addClass(a), n.toggleClass("identified", "unknown" !== a), n.trigger("payment.cardType", a))
    },
    e.payment.fn.formatCardCVC = function() {
        return this.on("keydown", f),
        this.on("keyup", d),
        this.on("keypress", E),
        this.on("keypress", b),
        this.on("paste", m),
        this.on("change", m),
        this.on("input", m),
        this
    },
    e.payment.fn.formatCardExpiry = function() {
        return this.on("keydown", f),
        this.on("keyup", d),
        this.on("keypress", E),
        this.on("keypress", x),
        this.on("keypress", u),
        this.on("keypress", l),
        this.on("keypress", c),
        this.on("keydown", a),
        this.on("change", g),
        this.on("input", g),
        this
    },
    e.payment.fn.formatCardNumber = function() {
        return this.on("keydown", f),
        this.on("keyup", d),
        this.on("keypress", E),
        this.on("keypress", w),
        this.on("keypress", s),
        this.on("keydown", o),
        this.on("keyup", _),
        this.on("paste", v),
        this.on("change", v),
        this.on("input", v),
        this.on("input", _),
        this
    },
    e.payment.fn.restrictNumeric = function() {
        return this.on("keydown", f),
        this.on("keyup", d),
        this.on("keypress", E),
        this.on("paste", y),
        this.on("change", y),
        this.on("input", y),
        this
    },
    e.payment.fn.cardExpiryVal = function() {
        return e.payment.cardExpiryVal(e(this).val())
    },
    e.payment.cardExpiryVal = function(e) {
        var t, n, r, i;
        return i = e.split(/[\s\/]+/, 2),
        t = i[0],
        r = i[1],
        2 === (null != r ? r.length: void 0) && /^\d+$/.test(r) && (n = (new Date).getFullYear(), n = n.toString().slice(0, 2), r = n + r),
        t = parseInt(t, 10),
        r = parseInt(r, 10),
        {
            month: t,
            year: r
        }
    },
    e.payment.validateCardNumber = function(e) {
        var n, r;
        return e = (e + "").replace(/\s+|-/g, ""),
        /^\d+$/.test(e) ? (n = t(e), n ? (r = e.length, C.call(n.length, r) >= 0 && (n.luhn === !1 || h(e))) : !1) : !1
    },
    e.payment.validateCardExpiry = function(t, n) {
        var r, i, o;
        return "object" == typeof t && "month" in t && (o = t, t = o.month, n = o.year),
        t && n ? (t = e.trim(t), n = e.trim(n), /^\d+$/.test(t) && /^\d+$/.test(n) && t >= 1 && 12 >= t ? (2 === n.length && (n = 70 > n ? "20" + n: "19" + n), 4 !== n.length ? !1 : (i = new Date(n, t), r = new Date, i.setMonth(i.getMonth() - 1), i.setMonth(i.getMonth() + 1, 1), i > r)) : !1) : !1
    },
    e.payment.validateCardCVC = function(t, r) {
        var i, o;
        return t = e.trim(t),
        /^\d+$/.test(t) ? (i = n(r), null != i ? (o = t.length, C.call(i.cvcLength, o) >= 0) : t.length >= 3 && t.length <= 4) : !1
    },
    e.payment.cardType = function(e) {
        var n;
        return e ? (null != (n = t(e)) ? n.type: void 0) || null: null
    },
    e.payment.formatCardNumber = function(n) {
        var r, i, o, a;
        return n = n.replace(/\D/g, ""),
        (r = t(n)) ? (o = r.length[r.length.length - 1], n = n.slice(0, o), r.format.global ? null != (a = n.match(r.format)) ? a.join(" ") : void 0 : (i = r.format.exec(n), null != i ? (i.shift(), i = e.grep(i,
        function(e) {
            return e
        }), i.join(" ")) : void 0)) : n
    },
    e.payment.formatExpiry = function(e) {
        var t, n, r, i;
        return (n = e.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/)) ? (t = n[1] || "", r = n[2] || "", i = n[3] || "", i.length > 0 ? r = " / ": " /" === r ? (t = t.substring(0, 1), r = "") : 2 === t.length || r.length > 0 ? r = " / ": 1 === t.length && "0" !== t && "1" !== t && (t = "0" + t, r = " / "), t + r + i) : ""
    }
}.call(this),
function(e) {
    e.Jcrop = function(t, n) {
        function r(e) {
            return Math.round(e) + "px"
        }
        function i(e) {
            return P.baseClass + "-" + e
        }
        function o() {
            return e.fx.step.hasOwnProperty("backgroundColor")
        }
        function a(t) {
            var n = e(t).offset();
            return [n.left, n.top]
        }
        function s(e) {
            return [e.pageX - A[0], e.pageY - A[1]]
        }
        function u(t) {
            "object" != typeof t && (t = {}),
            P = e.extend(P, t),
            e.each(["onChange", "onSelect", "onRelease", "onDblClick"],
            function(e, t) {
                "function" != typeof P[t] && (P[t] = function() {})
            })
        }
        function c(e, t, n) {
            if (A = a(B), he.setCursor("move" === e ? e: e + "-resize"), "move" === e) return he.activateHandlers(f(t), v, n);
            var r = fe.getFixed(),
            i = d(e),
            o = fe.getCorner(d(i));
            fe.setPressed(fe.getCorner(i)),
            fe.setCurrent(o),
            he.activateHandlers(l(e, r), v, n)
        }
        function l(e, t) {
            return function(n) {
                if (P.aspectRatio) switch (e) {
                case "e":
                    n[1] = t.y + 1;
                    break;
                case "w":
                    n[1] = t.y + 1;
                    break;
                case "n":
                    n[0] = t.x + 1;
                    break;
                case "s":
                    n[0] = t.x + 1
                } else switch (e) {
                case "e":
                    n[1] = t.y2;
                    break;
                case "w":
                    n[1] = t.y2;
                    break;
                case "n":
                    n[0] = t.x2;
                    break;
                case "s":
                    n[0] = t.x2
                }
                fe.setCurrent(n),
                pe.update()
            }
        }
        function f(e) {
            var t = e;
            return me.watchKeys(),
            function(e) {
                fe.moveOffset([e[0] - t[0], e[1] - t[1]]),
                t = e,
                pe.update()
            }
        }
        function d(e) {
            switch (e) {
            case "n":
                return "sw";
            case "s":
                return "nw";
            case "e":
                return "nw";
            case "w":
                return "ne";
            case "ne":
                return "sw";
            case "nw":
                return "se";
            case "se":
                return "nw";
            case "sw":
                return "ne"
            }
        }
        function p(e) {
            return function(t) {
                return P.disabled ? !1 : "move" !== e || P.allowMove ? (A = a(B), re = !0, c(e, s(t)), t.stopPropagation(), t.preventDefault(), !1) : !1
            }
        }
        function h(e, t, n) {
            var r = e.width(),
            i = e.height();
            r > t && t > 0 && (r = t, i = t / e.width() * e.height()),
            i > n && n > 0 && (i = n, r = n / e.height() * e.width()),
            te = e.width() / r,
            ne = e.height() / i,
            e.width(r).height(i)
        }
        function m(e) {
            return {
                x: e.x * te,
                y: e.y * ne,
                x2: e.x2 * te,
                y2: e.y2 * ne,
                w: e.w * te,
                h: e.h * ne
            }
        }
        function v(e) {
            var t = fe.getFixed();
            t.w > P.minSelect[0] && t.h > P.minSelect[1] ? (pe.enableHandles(), pe.done()) : pe.release(),
            he.setCursor(P.allowSelect ? "crosshair": "default")
        }
        function g(e) {
            if (!P.disabled && P.allowSelect) {
                re = !0,
                A = a(B),
                pe.disableHandles(),
                he.setCursor("crosshair");
                var t = s(e);
                return fe.setPressed(t),
                pe.update(),
                he.activateHandlers(y, v, "touch" === e.type.substring(0, 5)),
                me.watchKeys(),
                e.stopPropagation(),
                e.preventDefault(),
                !1
            }
        }
        function y(e) {
            fe.setCurrent(e),
            pe.update()
        }
        function b() {
            var t = e("<div></div>").addClass(i("tracker"));
            return q && t.css({
                opacity: 0,
                backgroundColor: "white"
            }),
            t
        }
        function w(e) {
            X.removeClass().addClass(i("holder")).addClass(e)
        }
        function x(e, t) {
            function n() {
                window.setTimeout(y, f)
            }
            var r = e[0] / te,
            i = e[1] / ne,
            o = e[2] / te,
            a = e[3] / ne;
            if (!ie) {
                var s = fe.flipCoords(r, i, o, a),
                u = fe.getFixed(),
                c = [u.x, u.y, u.x2, u.y2],
                l = c,
                f = P.animationDelay,
                d = s[0] - c[0],
                p = s[1] - c[1],
                h = s[2] - c[2],
                m = s[3] - c[3],
                v = 0,
                g = P.swingSpeed;
                r = l[0],
                i = l[1],
                o = l[2],
                a = l[3],
                pe.animMode(!0);
                var y = function() {
                    return function() {
                        v += (100 - v) / g,
                        l[0] = Math.round(r + v / 100 * d),
                        l[1] = Math.round(i + v / 100 * p),
                        l[2] = Math.round(o + v / 100 * h),
                        l[3] = Math.round(a + v / 100 * m),
                        v >= 99.8 && (v = 100),
                        100 > v ? (T(l), n()) : (pe.done(), pe.animMode(!1), "function" == typeof t && t.call(ve))
                    }
                } ();
                n()
            }
        }
        function E(e) {
            T([e[0] / te, e[1] / ne, e[2] / te, e[3] / ne]),
            P.onSelect.call(ve, m(fe.getFixed())),
            pe.enableHandles()
        }
        function T(e) {
            fe.setPressed([e[0], e[1]]),
            fe.setCurrent([e[2], e[3]]),
            pe.update()
        }
        function _() {
            return m(fe.getFixed())
        }
        function k() {
            return fe.getFixed()
        }
        function C(e) {
            u(e),
            M()
        }
        function j() {
            P.disabled = !0,
            pe.disableHandles(),
            pe.setCursor("default"),
            he.setCursor("default")
        }
        function S() {
            P.disabled = !1,
            M()
        }
        function L() {
            pe.done(),
            he.activateHandlers(null, null)
        }
        function O() {
            X.remove(),
            H.show(),
            H.css("visibility", "visible"),
            e(t).removeData("Jcrop")
        }
        function N(e, t) {
            pe.release(),
            j();
            var n = new Image;
            n.onload = function() {
                var r = n.width,
                i = n.height,
                o = P.boxWidth,
                a = P.boxHeight;
                B.width(r).height(i),
                B.attr("src", e),
                V.attr("src", e),
                h(B, o, a),
                W = B.width(),
                $ = B.height(),
                V.width(W).height($),
                se.width(W + 2 * ae).height($ + 2 * ae),
                X.width(W).height($),
                de.resize(W, $),
                S(),
                "function" == typeof t && t.call(ve)
            },
            n.src = e
        }
        function D(e, t, n) {
            var r = t || P.bgColor;
            P.bgFade && o() && P.fadeTime && !n ? e.animate({
                backgroundColor: r
            },
            {
                queue: !1,
                duration: P.fadeTime
            }) : e.css("backgroundColor", r)
        }
        function M(e) {
            P.allowResize ? e ? pe.enableOnly() : pe.enableHandles() : pe.disableHandles(),
            he.setCursor(P.allowSelect ? "crosshair": "default"),
            pe.setCursor(P.allowMove ? "move": "default"),
            P.hasOwnProperty("trueSize") && (te = P.trueSize[0] / W, ne = P.trueSize[1] / $),
            P.hasOwnProperty("setSelect") && (E(P.setSelect), pe.done(), delete P.setSelect),
            de.refresh(),
            P.bgColor != ue && (D(P.shade ? de.getShades() : X, P.shade ? P.shadeColor || P.bgColor: P.bgColor), ue = P.bgColor),
            ce != P.bgOpacity && (ce = P.bgOpacity, P.shade ? de.refresh() : pe.setBgOpacity(ce)),
            K = P.maxSize[0] || 0,
            Z = P.maxSize[1] || 0,
            Q = P.minSize[0] || 0,
            ee = P.minSize[1] || 0,
            P.hasOwnProperty("outerImage") && (B.attr("src", P.outerImage), delete P.outerImage),
            pe.refresh()
        }
        var A, P = e.extend({},
        e.Jcrop.defaults),
        I = navigator.userAgent.toLowerCase(),
        q = /msie/.test(I),
        R = /msie [1-6]\./.test(I);
        "object" != typeof t && (t = e(t)[0]),
        "object" != typeof n && (n = {}),
        u(n);
        var F = {
            border: "none",
            visibility: "visible",
            margin: 0,
            padding: 0,
            position: "absolute",
            top: 0,
            left: 0
        },
        H = e(t),
        z = !0;
        if ("IMG" == t.tagName) {
            if (0 != H[0].width && 0 != H[0].height) H.width(H[0].width),
            H.height(H[0].height);
            else {
                var U = new Image;
                U.src = H[0].src,
                H.width(U.width),
                H.height(U.height)
            }
            var B = H.clone().removeAttr("id").css(F).show();
            B.width(H.width()),
            B.height(H.height()),
            H.after(B).hide()
        } else B = H.css(F).show(),
        z = !1,
        null === P.shade && (P.shade = !0);
        h(B, P.boxWidth, P.boxHeight);
        var W = B.width(),
        $ = B.height(),
        X = e("<div />").width(W).height($).addClass(i("holder")).css({
            position: "relative",
            backgroundColor: P.bgColor
        }).insertAfter(H).append(B);
        P.addClass && X.addClass(P.addClass);
        var V = e("<div />"),
        G = e("<div />").width("100%").height("100%").css({
            zIndex: 310,
            position: "absolute",
            overflow: "hidden"
        }),
        J = e("<div />").width("100%").height("100%").css("zIndex", 320),
        Y = e("<div />").css({
            position: "absolute",
            zIndex: 600
        }).dblclick(function() {
            var e = fe.getFixed();
            P.onDblClick.call(ve, e)
        }).insertBefore(B).append(G, J);
        z && (V = e("<img />").attr("src", B.attr("src")).css(F).width(W).height($), G.append(V)),
        R && Y.css({
            overflowY: "hidden"
        });
        var K, Z, Q, ee, te, ne, re, ie, oe, ae = P.boundary,
        se = b().width(W + 2 * ae).height($ + 2 * ae).css({
            position: "absolute",
            top: r( - ae),
            left: r( - ae),
            zIndex: 290
        }).mousedown(g),
        ue = P.bgColor,
        ce = P.bgOpacity;
        A = a(B);
        var le = function() {
            function e() {
                var e, t = {},
                n = ["touchstart", "touchmove", "touchend"],
                r = document.createElement("div");
                try {
                    for (e = 0; e < n.length; e++) {
                        var i = n[e];
                        i = "on" + i;
                        var o = i in r;
                        o || (r.setAttribute(i, "return;"), o = "function" == typeof r[i]),
                        t[n[e]] = o
                    }
                    return t.touchstart && t.touchend && t.touchmove
                } catch(a) {
                    return ! 1
                }
            }
            function t() {
                return P.touchSupport === !0 || P.touchSupport === !1 ? P.touchSupport: e()
            }
            return {
                createDragger: function(e) {
                    return function(t) {
                        return P.disabled ? !1 : "move" !== e || P.allowMove ? (A = a(B), re = !0, c(e, s(le.cfilter(t)), !0), t.stopPropagation(), t.preventDefault(), !1) : !1
                    }
                },
                newSelection: function(e) {
                    return g(le.cfilter(e))
                },
                cfilter: function(e) {
                    return e.pageX = e.originalEvent.changedTouches[0].pageX,
                    e.pageY = e.originalEvent.changedTouches[0].pageY,
                    e
                },
                isSupported: e,
                support: t()
            }
        } (),
        fe = function() {
            function e(e) {
                e = a(e),
                h = d = e[0],
                m = p = e[1]
            }
            function t(e) {
                e = a(e),
                l = e[0] - h,
                f = e[1] - m,
                h = e[0],
                m = e[1]
            }
            function n() {
                return [l, f]
            }
            function r(e) {
                var t = e[0],
                n = e[1];
                0 > d + t && (t -= t + d),
                0 > p + n && (n -= n + p),
                m + n > $ && (n += $ - (m + n)),
                h + t > W && (t += W - (h + t)),
                d += t,
                h += t,
                p += n,
                m += n
            }
            function i(e) {
                var t = o();
                switch (e) {
                case "ne":
                    return [t.x2, t.y];
                case "nw":
                    return [t.x, t.y];
                case "se":
                    return [t.x2, t.y2];
                case "sw":
                    return [t.x, t.y2]
                }
            }
            function o() {
                if (!P.aspectRatio) return u();
                var e, t, n, r, i = P.aspectRatio,
                o = P.minSize[0] / te,
                a = P.maxSize[0] / te,
                l = P.maxSize[1] / ne,
                f = h - d,
                v = m - p,
                g = Math.abs(f),
                y = Math.abs(v),
                b = g / y;
                return 0 === a && (a = 10 * W),
                0 === l && (l = 10 * $),
                i > b ? (t = m, n = y * i, e = 0 > f ? d - n: n + d, 0 > e ? (e = 0, r = Math.abs((e - d) / i), t = 0 > v ? p - r: r + p) : e > W && (e = W, r = Math.abs((e - d) / i), t = 0 > v ? p - r: r + p)) : (e = h, r = g / i, t = 0 > v ? p - r: p + r, 0 > t ? (t = 0, n = Math.abs((t - p) * i), e = 0 > f ? d - n: n + d) : t > $ && (t = $, n = Math.abs(t - p) * i, e = 0 > f ? d - n: n + d)),
                e > d ? (o > e - d ? e = d + o: e - d > a && (e = d + a), t = t > p ? p + (e - d) / i: p - (e - d) / i) : d > e && (o > d - e ? e = d - o: d - e > a && (e = d - a), t = t > p ? p + (d - e) / i: p - (d - e) / i),
                0 > e ? (d -= e, e = 0) : e > W && (d -= e - W, e = W),
                0 > t ? (p -= t, t = 0) : t > $ && (p -= t - $, t = $),
                c(s(d, p, e, t))
            }
            function a(e) {
                return e[0] < 0 && (e[0] = 0),
                e[1] < 0 && (e[1] = 0),
                e[0] > W && (e[0] = W),
                e[1] > $ && (e[1] = $),
                [Math.round(e[0]), Math.round(e[1])]
            }
            function s(e, t, n, r) {
                var i = e,
                o = n,
                a = t,
                s = r;
                return e > n && (i = n, o = e),
                t > r && (a = r, s = t),
                [i, a, o, s]
            }
            function u() {
                var e, t = h - d,
                n = m - p;
                return K && Math.abs(t) > K && (h = t > 0 ? d + K: d - K),
                Z && Math.abs(n) > Z && (m = n > 0 ? p + Z: p - Z),
                ee / ne && Math.abs(n) < ee / ne && (m = n > 0 ? p + ee / ne: p - ee / ne),
                Q / te && Math.abs(t) < Q / te && (h = t > 0 ? d + Q / te: d - Q / te),
                0 > d && (h -= d, d -= d),
                0 > p && (m -= p, p -= p),
                0 > h && (d -= h, h -= h),
                0 > m && (p -= m, m -= m),
                h > W && (e = h - W, d -= e, h -= e),
                m > $ && (e = m - $, p -= e, m -= e),
                d > W && (e = d - $, m -= e, p -= e),
                p > $ && (e = p - $, m -= e, p -= e),
                c(s(d, p, h, m))
            }
            function c(e) {
                return {
                    x: e[0],
                    y: e[1],
                    x2: e[2],
                    y2: e[3],
                    w: e[2] - e[0],
                    h: e[3] - e[1]
                }
            }
            var l, f, d = 0,
            p = 0,
            h = 0,
            m = 0;
            return {
                flipCoords: s,
                setPressed: e,
                setCurrent: t,
                getOffset: n,
                moveOffset: r,
                getCorner: i,
                getFixed: o
            }
        } (),
        de = function() {
            function t(e, t) {
                h.left.css({
                    height: r(t)
                }),
                h.right.css({
                    height: r(t)
                })
            }
            function n() {
                return i(fe.getFixed())
            }
            function i(e) {
                h.top.css({
                    left: r(e.x),
                    width: r(e.w),
                    height: r(e.y)
                }),
                h.bottom.css({
                    top: r(e.y2),
                    left: r(e.x),
                    width: r(e.w),
                    height: r($ - e.y2)
                }),
                h.right.css({
                    left: r(e.x2),
                    width: r(W - e.x2)
                }),
                h.left.css({
                    width: r(e.x)
                })
            }
            function o() {
                return e("<div />").css({
                    position: "absolute",
                    backgroundColor: P.shadeColor || P.bgColor
                }).appendTo(p)
            }
            function a() {
                d || (d = !0, p.insertBefore(B), n(), pe.setBgOpacity(1, 0, 1), V.hide(), s(P.shadeColor || P.bgColor, 1), pe.isAwake() ? c(P.bgOpacity, 1) : c(1, 1))
            }
            function s(e, t) {
                D(f(), e, t)
            }
            function u() {
                d && (p.remove(), V.show(), d = !1, pe.isAwake() ? pe.setBgOpacity(P.bgOpacity, 1, 1) : (pe.setBgOpacity(1, 1, 1), pe.disableHandles()), D(X, 0, 1))
            }
            function c(e, t) {
                d && (P.bgFade && !t ? p.animate({
                    opacity: 1 - e
                },
                {
                    queue: !1,
                    duration: P.fadeTime
                }) : p.css({
                    opacity: 1 - e
                }))
            }
            function l() {
                P.shade ? a() : u(),
                pe.isAwake() && c(P.bgOpacity)
            }
            function f() {
                return p.children()
            }
            var d = !1,
            p = e("<div />").css({
                position: "absolute",
                zIndex: 240,
                opacity: 0
            }),
            h = {
                top: o(),
                left: o().height($),
                right: o().height($),
                bottom: o()
            };
            return {
                update: n,
                updateRaw: i,
                getShades: f,
                setBgColor: s,
                enable: a,
                disable: u,
                resize: t,
                refresh: l,
                opacity: c
            }
        } (),
        pe = function() {
            function t(t) {
                var n = e("<div />").css({
                    position: "absolute",
                    opacity: P.borderOpacity
                }).addClass(i(t));
                return G.append(n),
                n
            }
            function n(t, n) {
                var r = e("<div />").mousedown(p(t)).css({
                    cursor: t + "-resize",
                    position: "absolute",
                    zIndex: n
                }).addClass("ord-" + t);
                return le.support && r.bind("touchstart.jcrop", le.createDragger(t)),
                J.append(r),
                r
            }
            function o(e) {
                var t = P.handleSize,
                r = n(e, j++).css({
                    opacity: P.handleOpacity
                }).addClass(i("handle"));
                return t && r.width(t).height(t),
                r
            }
            function a(e) {
                return n(e, j++).addClass("jcrop-dragbar")
            }
            function s(e) {
                var t;
                for (t = 0; t < e.length; t++) O[e[t]] = a(e[t])
            }
            function u(e) {
                var n, r;
                for (r = 0; r < e.length; r++) {
                    switch (e[r]) {
                    case "n":
                        n = "hline";
                        break;
                    case "s":
                        n = "hline bottom";
                        break;
                    case "e":
                        n = "vline right";
                        break;
                    case "w":
                        n = "vline"
                    }
                    S[e[r]] = t(n)
                }
            }
            function c(e) {
                var t;
                for (t = 0; t < e.length; t++) L[e[t]] = o(e[t])
            }
            function l(e, t) {
                P.shade || V.css({
                    top: r( - t),
                    left: r( - e)
                }),
                Y.css({
                    top: r(t),
                    left: r(e)
                })
            }
            function f(e, t) {
                Y.width(Math.round(e)).height(Math.round(t))
            }
            function d() {
                var e = fe.getFixed();
                fe.setPressed([e.x, e.y]),
                fe.setCurrent([e.x2, e.y2]),
                h()
            }
            function h(e) {
                return C ? v(e) : void 0
            }
            function v(e) {
                var t = fe.getFixed();
                f(t.w, t.h),
                l(t.x, t.y),
                P.shade && de.updateRaw(t),
                C || y(),
                e ? P.onSelect.call(ve, m(t)) : P.onChange.call(ve, m(t))
            }
            function g(e, t, n) { (C || t) && (P.bgFade && !n ? B.animate({
                    opacity: e
                },
                {
                    queue: !1,
                    duration: P.fadeTime
                }) : B.css("opacity", e));
            }
            function y() {
                Y.show(),
                P.shade ? de.opacity(ce) : g(ce, !0),
                C = !0
            }
            function w() {
                T(),
                Y.hide(),
                P.shade ? de.opacity(1) : g(1),
                C = !1,
                P.onRelease.call(ve)
            }
            function x() {
                N && J.show()
            }
            function E() {
                return N = !0,
                P.allowResize ? (J.show(), !0) : void 0
            }
            function T() {
                N = !1,
                J.hide()
            }
            function _(e) {
                e ? (ie = !0, T()) : (ie = !1, E())
            }
            function k() {
                _(!1),
                d()
            }
            var C, j = 370,
            S = {},
            L = {},
            O = {},
            N = !1;
            P.dragEdges && e.isArray(P.createDragbars) && s(P.createDragbars),
            e.isArray(P.createHandles) && c(P.createHandles),
            P.drawBorders && e.isArray(P.createBorders) && u(P.createBorders),
            e(document).bind("touchstart.jcrop-ios",
            function(t) {
                e(t.currentTarget).hasClass("jcrop-tracker") && t.stopPropagation()
            });
            var D = b().mousedown(p("move")).css({
                cursor: "move",
                position: "absolute",
                zIndex: 360
            });
            return le.support && D.bind("touchstart.jcrop", le.createDragger("move")),
            G.append(D),
            T(),
            {
                updateVisible: h,
                update: v,
                release: w,
                refresh: d,
                isAwake: function() {
                    return C
                },
                setCursor: function(e) {
                    D.css("cursor", e)
                },
                enableHandles: E,
                enableOnly: function() {
                    N = !0
                },
                showHandles: x,
                disableHandles: T,
                animMode: _,
                setBgOpacity: g,
                done: k
            }
        } (),
        he = function() {
            function t(t) {
                se.css({
                    zIndex: 450
                }),
                t ? e(document).bind("touchmove.jcrop", a).bind("touchend.jcrop", u) : d && e(document).bind("mousemove.jcrop", r).bind("mouseup.jcrop", i)
            }
            function n() {
                se.css({
                    zIndex: 290
                }),
                e(document).unbind(".jcrop")
            }
            function r(e) {
                return l(s(e)),
                !1
            }
            function i(e) {
                return e.preventDefault(),
                e.stopPropagation(),
                re && (re = !1, f(s(e)), pe.isAwake() && P.onSelect.call(ve, m(fe.getFixed())), n(), l = function() {},
                f = function() {}),
                !1
            }
            function o(e, n, r) {
                return re = !0,
                l = e,
                f = n,
                t(r),
                !1
            }
            function a(e) {
                return l(s(le.cfilter(e))),
                !1
            }
            function u(e) {
                return i(le.cfilter(e))
            }
            function c(e) {
                se.css("cursor", e)
            }
            var l = function() {},
            f = function() {},
            d = P.trackDocument;
            return d || se.mousemove(r).mouseup(i).mouseout(i),
            B.before(se),
            {
                activateHandlers: o,
                setCursor: c
            }
        } (),
        me = function() {
            function t() {
                P.keySupport && (o.show(), o.focus())
            }
            function n(e) {
                o.hide()
            }
            function r(e, t, n) {
                P.allowMove && (fe.moveOffset([t, n]), pe.updateVisible(!0)),
                e.preventDefault(),
                e.stopPropagation()
            }
            function i(e) {
                if (e.ctrlKey || e.metaKey) return ! 0;
                oe = e.shiftKey ? !0 : !1;
                var t = oe ? 10 : 1;
                switch (e.keyCode) {
                case 37:
                    r(e, -t, 0);
                    break;
                case 39:
                    r(e, t, 0);
                    break;
                case 38:
                    r(e, 0, -t);
                    break;
                case 40:
                    r(e, 0, t);
                    break;
                case 27:
                    P.allowSelect && pe.release();
                    break;
                case 9:
                    return ! 0
                }
                return ! 1
            }
            var o = e('<input type="radio" />').css({
                position: "fixed",
                left: "-120px",
                width: "12px"
            }).addClass("jcrop-keymgr"),
            a = e("<div />").css({
                position: "absolute",
                overflow: "hidden"
            }).append(o);
            return P.keySupport && (o.keydown(i).blur(n), R || !P.fixedSupport ? (o.css({
                position: "absolute",
                left: "-20px"
            }), a.append(o).insertBefore(B)) : o.insertBefore(B)),
            {
                watchKeys: t
            }
        } ();
        le.support && se.bind("touchstart.jcrop", le.newSelection),
        J.hide(),
        M(!0);
        var ve = {
            setImage: N,
            animateTo: x,
            setSelect: E,
            setOptions: C,
            tellSelect: _,
            tellScaled: k,
            setClass: w,
            disable: j,
            enable: S,
            cancel: L,
            release: pe.release,
            destroy: O,
            focus: me.watchKeys,
            getBounds: function() {
                return [W * te, $ * ne]
            },
            getWidgetSize: function() {
                return [W, $]
            },
            getScaleFactor: function() {
                return [te, ne]
            },
            getOptions: function() {
                return P
            },
            ui: {
                holder: X,
                selection: Y
            }
        };
        return q && X.bind("selectstart",
        function() {
            return ! 1
        }),
        H.data("Jcrop", ve),
        ve
    },
    e.fn.Jcrop = function(t, n) {
        var r;
        return this.each(function() {
            if (e(this).data("Jcrop")) {
                if ("api" === t) return e(this).data("Jcrop");
                e(this).data("Jcrop").setOptions(t)
            } else "IMG" == this.tagName ? e.Jcrop.Loader(this,
            function() {
                e(this).css({
                    display: "block",
                    visibility: "hidden"
                }),
                r = e.Jcrop(this, t),
                e.isFunction(n) && n.call(r)
            }) : (e(this).css({
                display: "block",
                visibility: "hidden"
            }), r = e.Jcrop(this, t), e.isFunction(n) && n.call(r))
        }),
        this
    },
    e.Jcrop.Loader = function(t, n, r) {
        function i() {
            a.complete ? (o.unbind(".jcloader"), e.isFunction(n) && n.call(a)) : window.setTimeout(i, 50)
        }
        var o = e(t),
        a = o[0];
        o.bind("load.jcloader", i).bind("error.jcloader",
        function(t) {
            o.unbind(".jcloader"),
            e.isFunction(r) && r.call(a)
        }),
        a.complete && e.isFunction(n) && (o.unbind(".jcloader"), n.call(a))
    },
    e.Jcrop.defaults = {
        allowSelect: !0,
        allowMove: !0,
        allowResize: !0,
        trackDocument: !0,
        baseClass: "jcrop",
        addClass: null,
        bgColor: "black",
        bgOpacity: .6,
        bgFade: !1,
        borderOpacity: .4,
        handleOpacity: .5,
        handleSize: null,
        aspectRatio: 0,
        keySupport: !0,
        createHandles: ["n", "s", "e", "w", "nw", "ne", "se", "sw"],
        createDragbars: ["n", "s", "e", "w"],
        createBorders: ["n", "s", "e", "w"],
        drawBorders: !0,
        dragEdges: !0,
        fixedSupport: !0,
        touchSupport: null,
        shade: null,
        boxWidth: 0,
        boxHeight: 0,
        boundary: 2,
        fadeTime: 400,
        animationDelay: 20,
        swingSpeed: 3,
        minSelect: [0, 0],
        maxSize: [0, 0],
        minSize: [0, 0],
        onChange: function() {},
        onSelect: function() {},
        onDblClick: function() {},
        onRelease: function() {}
    }
} (jQuery),
require("jquery-selector-set"),
function() {
    var e = require("jquery");
    e.fn.focused = function(e) {
        var t, n, r;
        return n = [],
        r = [],
        t = e ? this.find(e).filter(document.activeElement)[0] : this.filter(document.activeElement)[0],
        this.on("focusin", e,
        function() {
            var e, r, i;
            if (!t) for (t = this, r = 0, i = n.length; i > r; r++) e = n[r],
            e.call(this)
        }),
        this.on("focusout", e,
        function() {
            var e, n, i;
            if (t) for (t = null, n = 0, i = r.length; i > n; n++) e = r[n],
            e.call(this)
        }),
        {
            "in": function(e) {
                return n.push(e),
                t && e.call(t),
                this
            },
            out: function(e) {
                return r.push(e),
                this
            }
        }
    }
}.call(this),
function() {
    var e = require("jquery");
    e.fn.onFocusedInput = function(t, n) {
        var r;
        return r = "focusInput" + Math.floor(1e3 * Math.random()),
        this.focused(t)["in"](function() {
            var t = n.call(this, r);
            return t ? e(this).on("input." + r, t) : void 0
        }).out(function() {
            return e(this).off("." + r)
        }),
        this
    }
}.call(this),
function() {
    var e = require("jquery");
    e.fn.onFocusedKeydown = function(t, n) {
        var r;
        return r = "focusKeydown" + Math.floor(1e3 * Math.random()),
        this.focused(t)["in"](function() {
            var t = n.call(this, r);
            return t ? e(this).on("keydown." + r, t) : void 0
        }).out(function() {
            return e(this).off("." + r)
        }),
        this
    }
}.call(this),
define("github/setimmediate", ["exports"],
function(e) {
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = function(e) {
        return setImmediate(e)
    }
}),
define("github/dimensions", ["exports", "jquery"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function r(e) {
        var t = e.ownerDocument;
        if (t && e !== t.body) {
            for (; e !== t.body;) {
                if (e = e.parentElement, !e) return;
                var n = a["default"](e).css("overflow-y"),
                r = a["default"](e).css("overflow-x");
                if ("auto" === n || "auto" === r || "scroll" === n || "scroll" === r) break
            }
            return e
        }
    }
    function i(e, t) {
        var n = e.ownerDocument;
        if (n) {
            null == t && (t = n.body);
            var r = o(e, t);
            if (r) {
                var i = void 0;
                t.offsetParent ? i = {
                    top: a["default"](t).scrollTop(),
                    left: a["default"](t).scrollLeft()
                }: (i = {
                    top: a["default"](n.defaultView).scrollTop(),
                    left: a["default"](n.defaultView).scrollLeft()
                },
                t = n.documentElement);
                var s = r.top - i.top,
                u = r.left - i.left,
                c = t.clientHeight,
                l = t.clientWidth,
                f = c - (s + e.offsetHeight),
                d = l - (u + e.offsetWidth);
                return {
                    top: s,
                    left: u,
                    bottom: f,
                    right: d,
                    height: c,
                    width: l
                }
            }
        }
    }
    function o(e, t) {
        var n = e.ownerDocument;
        if (n) {
            for (var r = 0,
            i = 0,
            o = e.offsetHeight,
            s = e.offsetWidth; e !== n.body && e !== t;) if (r += e.offsetTop || 0, i += e.offsetLeft || 0, e = e.offsetParent, !e) return;
            var u = void 0,
            c = void 0;
            t && t.offsetParent ? (u = t.scrollHeight, c = t.scrollWidth) : (u = a["default"](n).height(), c = a["default"](n).width());
            var l = u - (r + o),
            f = c - (i + s);
            return {
                top: r,
                left: i,
                bottom: l,
                right: f
            }
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.overflowParent = r,
    e.overflowOffset = i,
    e.positionedOffset = o;
    var a = n(t)
}),
function() {
    var e, t = require("jquery"),
    n = require("github/setimmediate")["default"],
    r = require("github/dimensions"),
    i = r.positionedOffset,
    o = [].slice;
    t.fn.scrollTo = function() {
        var n, r, a, s, u, c, l;
        return n = 1 <= arguments.length ? o.call(arguments, 0) : [],
        (r = this[0]) ? (s = {},
        t.isPlainObject(n[0]) ? (s = n[0], t.isFunction(n[1]) && null == s.complete && (s.complete = n[1])) : null != n[0] && (s.target = n[0]), null == s.top && null == s.left && (s.target ? (u = i(t(s.target)[0], r), l = u.top, a = u.left, s.top = l, s.left = a) : (c = i(t(r)[0]), l = c.top, a = c.left, s.top = l, s.left = a, r = document)), r.offsetParent ? s.duration ? e(r, s) : (null != s.top && (r.scrollTop = s.top), null != s.left && (r.scrollLeft = s.left), "function" == typeof s.complete && s.complete()) : s.duration ? e("html, body", s) : (null != s.top && t(document).scrollTop(s.top), null != s.left && t(document).scrollLeft(s.left), "function" == typeof s.complete && s.complete()), this) : this
    },
    e = function(e, r) {
        var i, o, a;
        return a = {},
        null != r.top && (a.scrollTop = r.top),
        null != r.left && (a.scrollLeft = r.left),
        o = {
            duration: r.duration,
            queue: !1
        },
        r.complete && (i = t(e).length, o.complete = function() {
            return 0 === --i ? n(r.complete) : void 0
        }),
        t(e).animate(a, o)
    }
}.call(this),
function() {
    var e = require("jquery"),
    t = require("github/dimensions"),
    n = t.overflowParent;
    e.fn.cumulativeScrollBy = function(t, r) {
        var i, o, a, s, u;
        i = o = 0;
        for (var c = n(this[0]); c && (a = e(c).scrollBy(t - i, r - o), s = a[0], u = a[1], i += s, o += u, i !== t || o !== r);) c = n(c)
    }
}.call(this),
function() {
    var e = require("jquery"),
    t = require("github/setimmediate")["default"];
    e.fn.fire = function(n) {
        var r, i, o, a, s = arguments[1];
        return s && (e.isPlainObject(s) ? o = s: e.isFunction(s) && (r = s)),
        s = arguments[2],
        s && e.isFunction(s) && (r = s),
        i = this[0],
        null == o && (o = {}),
        null == o.cancelable && (o.cancelable = !!r),
        null == o.bubbles && (o.bubbles = !0),
        a = function() {
            var t;
            return t = e.Event(n, o),
            e.event.trigger(t, [], i, !t.bubbles),
            r && !t.isDefaultPrevented() && r.call(i, t),
            t
        },
        o.async ? (delete o.async, void t(a)) : a()
    }
}.call(this),
define("github/fuzzy-filter", ["exports"],
function(e) {
    function t(e, t) {
        var n = s(e, t);
        if (n && -1 === t.indexOf("/")) {
            var r = e.substring(e.lastIndexOf("/") + 1);
            n += s(r, t)
        }
        return n
    }
    function n(e, n) {
        e = function() {
            for (var r = [], i = 0, o = e.length; o > i; i++) {
                var a = e[i],
                s = t(a, n);
                s && r.push([a, s])
            }
            return r
        } (),
        e.sort(r);
        for (var i = [], o = 0, a = e.length; a > o; o++) {
            var s = e[o];
            i.push(s[0])
        }
        return i
    }
    function r(e, t) {
        var n = e[0],
        r = t[0],
        i = e[1],
        o = t[1];
        return i > o ? -1 : o > i ? 1 : r > n ? -1 : n > r ? 1 : 0
    }
    function i(e) {
        var t = e.toLowerCase(),
        n = "+.*?[]{}()^$|\\".replace(/(.)/g, "\\$1"),
        r = new RegExp("\\(([" + n + "])\\)", "g");
        return e = t.replace(/(.)/g, "($1)(.*?)").replace(r, "(\\$1)"),
        new RegExp("(.*)" + e + "$", "i")
    }
    function o(e, t, n) {
        null == n && (n = null);
        var r = e.innerHTML.trim();
        if (t) {
            null == n && (n = i(t));
            var o = r.match(n);
            if (!o) return;
            var a = !1;
            r = [];
            var s = void 0,
            u = void 0,
            c = void 0;
            for (s = u = 1, c = o.length; c >= 1 ? c > u: u > c; s = c >= 1 ? ++u: --u) {
                var l = o[s];
                l && (s % 2 === 0 ? a || (r.push("<mark>"), a = !0) : a && (r.push("</mark>"), a = !1), r.push(l))
            }
            e.innerHTML = r.join("")
        } else {
            var f = r.replace(/<\/?mark>/g, "");
            r !== f && (e.innerHTML = f)
        }
    }
    function a(e, t, n) {
        null == n && (n = i(t));
        for (var r = e.match(n), o = [], a = null, s = 1; s < r.length; s++) {
            var u = r[s];
            u && (s % 2 === 0 ? a || (a = [], o.push(a)) : a = null, a ? a.push(u) : o.push(u))
        }
        return o.map(function(e) {
            return "string" == typeof e ? e: [e.join("")]
        })
    }
    function s(e, t) {
        if (e === t) return 1;
        var n = e.length,
        r = 0,
        i = 0,
        o = void 0,
        a = void 0,
        s = void 0;
        for (o = a = 0, s = t.length; s > a; o = ++a) {
            var u = t[o],
            c = e.indexOf(u.toLowerCase()),
            l = e.indexOf(u.toUpperCase()),
            f = Math.min(c, l),
            d = f > -1 ? f: Math.max(c, l);
            if ( - 1 === d) return 0;
            r += .1,
            e[d] === u && (r += .1),
            0 === d && (r += .8, 0 === o && (i = 1)),
            " " === e.charAt(d - 1) && (r += .8),
            e = e.substring(d + 1, n)
        }
        var p = t.length,
        h = r / p,
        m = (h * (p / n) + h) / 2;
        return i && 1 > m + .1 && (m += .1),
        m
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.fuzzyScore = t,
    e.fuzzySort = n,
    e.fuzzyRegexp = i,
    e.fuzzyHighlightElement = o,
    e.fuzzyHighlight = a
}),
function() {
    var e, t, n, r, i, o, a, s, u, c = require("jquery");
    s = require("github/fuzzy-filter"),
    o = s.fuzzyScore,
    i = s.fuzzyRegexp,
    r = s.fuzzyHighlightElement,
    a = new WeakMap,
    c.fn.fuzzyFilterSortList = function(r, s) {
        var l, f, d, p, h, m, v, g, y, b, w, x, E, T, _, k, C, j, S, L, O, N, D, M, A, P;
        if (null == s && (s = {}), _ = this[0]) {
            r = r.toLowerCase(),
            d = null != (j = s.content) ? j: e,
            M = null != (S = s.text) ? S: n,
            D = null != (L = s.score) ? L: o,
            T = s.limit,
            s.mark === !0 ? k = t: null != (null != (O = s.mark) ? O.call: void 0) && (k = s.mark);
            var I = a.get(_);
            for (I ? l = c(_).children() : (l = I = c(_).children(), _.webkitWeakMapWorkaround = 1, a.set(_, I.slice(0))), p = 0, b = l.length; b > p; p++) h = l[p],
            _.removeChild(h),
            h.style.display = "";
            if (N = document.createDocumentFragment(), A = 0, P = 0, r) {
                for (m = I.slice(0), g = 0, x = m.length; x > g; g++) h = m[g],
                null == h.fuzzyFilterTextCache && (h.fuzzyFilterTextCache = M(d(h))),
                h.fuzzyFilterScoreCache = D(h.fuzzyFilterTextCache, r);
                for (m.sort(u), C = i(r), y = 0, E = m.length; E > y; y++) h = m[y],
                (!T || T > A) && h.fuzzyFilterScoreCache > 0 && (P++, k && (f = d(h), k(f), k(f, r, C)), N.appendChild(h)),
                A++
            } else for (v = 0, w = I.length; w > v; v++) h = I[v],
            (!T || T > A) && (P++, k && k(d(h)), N.appendChild(h)),
            A++;
            return _.appendChild(N),
            P
        }
    },
    u = function(e, t) {
        var n, r, i, o;
        return n = e.fuzzyFilterScoreCache,
        i = t.fuzzyFilterScoreCache,
        r = e.fuzzyFilterTextCache,
        o = t.fuzzyFilterTextCache,
        n > i ? -1 : i > n ? 1 : o > r ? -1 : r > o ? 1 : 0
    },
    e = function(e) {
        return e
    },
    n = function(e) {
        return c.trim(e.textContent.toLowerCase())
    },
    t = r
}.call(this),
define("github/observe", ["exports", "jquery", "selector-set", "./setimmediate"],
function(e, t, n, r) {
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        var n = void 0,
        r = void 0,
        i = void 0; (n = L.get(e)) || (n = [], L.set(e, n)),
        -1 === n.indexOf(t.id) && (null != t.initialize && (r = t.initialize.call(e, e)), !r || "length" in r || ((i = N.get(e)) || (i = {},
        N.set(e, i)), i[t.id] = r), n.push(t.id))
    }
    function a(e, t) {
        var n = void 0,
        r = void 0,
        i = void 0,
        o = void 0;
        if ((n = O.get(e)) || (n = [], O.set(e, n)), -1 === n.indexOf(t.id)) {
            t.elements.push(e);
            var a = null != (r = N.get(e)) ? r[t.id] : void 0;
            a && null != (i = a.add) && i.call(e, e),
            null != (o = t.add) && o.call(e, e),
            n.push(t.id)
        }
    }
    function s(e, t) {
        var n = void 0,
        r = void 0,
        i = void 0,
        o = void 0,
        a = void 0,
        s = void 0,
        u = void 0,
        c = void 0,
        l = void 0,
        f = void 0,
        d = void 0;
        if (n = O.get(e)) if (t) {
            if (o = t.elements.indexOf(e), -1 !== o && t.elements.splice(o, 1), o = n.indexOf(t.id), -1 !== o) {
                var p = null != (s = N.get(e)) ? s[t.id] : void 0;
                p && null != (u = p.remove) && u.call(e, e),
                null != (c = t.remove) && c.call(e, e),
                n.splice(o, 1)
            }
            0 === n.length && O["delete"](e)
        } else {
            for (l = n.slice(0), r = 0, a = l.length; a > r; r++) if (i = l[r], t = j[i]) {
                o = t.elements.indexOf(e),
                -1 !== o && t.elements.splice(o, 1);
                var h = N.get(e),
                m = null != h ? h[t.id] : void 0;
                m && null != (f = m.remove) && f.call(e, e),
                null != (d = t.remove) && d.call(e, e)
            }
            O["delete"](e)
        }
    }
    function u(e, t) {
        var n = void 0,
        r = void 0,
        i = void 0,
        o = void 0,
        a = void 0,
        s = void 0,
        u = void 0,
        c = void 0,
        l = void 0,
        f = void 0,
        d = void 0,
        p = void 0;
        for (o = 0, c = t.length; c > o; o++) {
            var h = t[o];
            if (h.nodeType === Node.ELEMENT_NODE) {
                var m = S.matches(h);
                for (a = 0, l = m.length; l > a; a++) n = m[a].data,
                e.push(["add", h, n]);
                var v = S.queryAll(h);
                for (s = 0, f = v.length; f > s; s++) for (p = v[s], n = p.data, i = p.elements, u = 0, d = i.length; d > u; u++) r = i[u],
                e.push(["add", r, n])
            }
        }
    }
    function c(e, t) {
        var n = void 0,
        r = void 0,
        i = void 0,
        o = void 0,
        a = void 0;
        for (r = 0, o = t.length; o > r; r++) {
            var s = t[r];
            if (s.nodeType === Node.ELEMENT_NODE) {
                e.push(["remove", s]);
                var u = s.getElementsByTagName("*");
                for (i = 0, a = u.length; a > i; i++) n = u[i],
                e.push(["remove", n])
            }
        }
    }
    function l(e) {
        var t = void 0,
        n = void 0,
        r = void 0,
        i = void 0,
        o = void 0,
        a = void 0;
        for (n = 0, i = j.length; i > n; n++) {
            var s = j[n];
            if (s) for (a = s.elements, r = 0, o = a.length; o > r; r++) t = a[r],
            t.parentNode || e.push(["remove", t])
        }
    }
    function f(e, t) {
        var n = void 0,
        r = void 0,
        i = void 0,
        o = void 0,
        a = void 0,
        s = void 0;
        if (t.nodeType === Node.ELEMENT_NODE) {
            var u = S.matches(t);
            for (r = 0, a = u.length; a > r; r++) n = u[r].data,
            e.push(["add", t, n]);
            var c = O.get(t);
            if (c) for (o = 0, s = c.length; s > o; o++) {
                i = c[o];
                var l = j[i];
                l && (S.matchesSelector(t, l.selector) || e.push(["remove", t, l]))
            }
        }
    }
    function d(e, t) {
        var n = void 0,
        r = void 0,
        i = void 0;
        if (t.nodeType === Node.ELEMENT_NODE) {
            f(e, t);
            var o = t.getElementsByTagName("*");
            for (r = 0, i = o.length; i > r; r++) n = o[r],
            f(e, n)
        }
    }
    function p(e) {
        var t = void 0,
        n = void 0,
        r = void 0,
        i = void 0,
        u = void 0,
        c = void 0;
        for (n = 0, r = e.length; r > n; n++) u = e[n],
        c = u[0],
        t = u[1],
        i = u[2],
        "add" === c ? (o(t, i), a(t, i)) : "remove" === c && s(t, i)
    }
    function h(e) {
        var t = void 0,
        n = void 0,
        r = e.elements;
        for (t = 0, n = r.length; n > t; t++) {
            var i = r[t];
            s(i, e)
        }
        S.remove(e.selector, e),
        delete j[e.id],
        M--
    }
    function m(e, t) {
        null != t.call && (t = {
            initialize: t
        });
        var n = {
            id: C++,
            selector: e,
            initialize: t.initialize || t.init,
            add: t.add,
            remove: t.remove,
            elements: [],
            stop: function() {
                return h(n)
            }
        };
        return S.add(e, n),
        j[n.id] = n,
        v(),
        M++,
        n
    }
    function v() {
        return D ? void 0 : (_["default"](g), D = !0)
    }
    function g() {
        var e = [];
        return u(e, [document.documentElement]),
        p(e),
        D = !1
    }
    function y() {
        return M
    }
    function b() {
        var e = void 0,
        t = void 0,
        n = void 0,
        r = void 0,
        i = void 0,
        o = void 0,
        a = void 0,
        s = [],
        u = A;
        for (A = [], n = 0, i = u.length; i > n; n++) for (a = u[n], t = a.form ? a.form.elements: a.ownerDocument.getElementsByTagName("input"), r = 0, o = t.length; o > r; r++) e = t[r],
        f(s, e);
        p(s)
    }
    function w(e) {
        A.push(e.target),
        _["default"](b)
    }
    function x(e) {
        var t = void 0,
        n = void 0,
        r = void 0,
        i = [];
        for (t = 0, n = e.length; n > t; t++) r = e[t],
        "childList" === r.type ? (u(i, r.addedNodes), c(i, r.removedNodes)) : "attributes" === r.type && f(i, r.target);
        k && l(i),
        p(i)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.observe = m,
    e.getObserverCount = y;
    var E = i(t),
    T = i(n),
    _ = i(r),
    k = function() {
        var e = document.createElement("div"),
        t = document.createElement("div"),
        n = document.createElement("div");
        return e.appendChild(t),
        t.appendChild(n),
        e.innerHTML = "",
        n.parentNode !== t
    } (),
    C = 0,
    j = [],
    S = new T["default"];
    S.querySelectorAll = E["default"].find,
    S.matchesSelector = E["default"].find.matchesSelector;
    var L = new WeakMap,
    O = new WeakMap,
    N = new WeakMap,
    D = !1,
    M = 0;
    E["default"](document).on("observe:dirty",
    function(e) {
        var t = [];
        d(t, e.target),
        p(t)
    });
    var A = [];
    document.addEventListener("change", w, !1),
    E["default"](document).on("change", w);
    var P = new MutationObserver(x);
    E["default"](function() {
        P.observe(document, {
            childList: !0,
            attributes: !0,
            subtree: !0
        });
        var e = [];
        u(e, [document.documentElement]),
        p(e)
    },
    !1)
}),
define("github/page-focused", ["exports"],
function(e) {
    function t(e) {
        return new Promise(function(t) {
            function n() {
                e.hasFocus() && (t(), e.removeEventListener("visibilitychange", n), window.removeEventListener("focus", n), window.removeEventListener("blur", n))
            }
            e.addEventListener("visibilitychange", n),
            window.addEventListener("focus", n),
            window.addEventListener("blur", n),
            n()
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = t
}),
function() {
    var e, t, n, r, i, o, a, s = require("jquery"),
    u = require("github/observe"),
    c = u.observe,
    l = require("github/page-focused")["default"];
    i = 0,
    n = -1,
    t = function(e) {
        var t, n, r, i;
        return t = e.getBoundingClientRect(),
        r = s(window).height(),
        i = s(window).width(),
        0 === t.height ? !1 : t.height < r ? t.top >= 0 && t.left >= 0 && t.bottom <= r && t.right <= i: (n = Math.ceil(r / 2), t.top >= 0 && t.top + n < r)
    },
    e = function(e) {
        var n, r, i, o, a, s, u;
        for (o = e.elements, u = [], r = 0, i = o.length; i > r; r++) n = o[r],
        t(n) ? u.push(null != (a = e["in"]) ? a.call(n, n, e) : void 0) : u.push(null != (s = e.out) ? s.call(n, n, e) : void 0);
        return u
    },
    a = function(t) {
        return document.hasFocus() && window.scrollY !== n && (n = window.scrollY, !t.checkPending) ? (t.checkPending = !0, window.requestAnimationFrame(function() {
            return t.checkPending = !1,
            e(t)
        })) : void 0
    },
    r = function(t, n) {
        return 0 === n.elements.length && (window.addEventListener("scroll", n.scrollHandler, {
            capture: !0,
            passive: !0
        }), l(document).then(function() {
            return e(n)
        })),
        n.elements.push(t)
    },
    o = function(e, t) {
        var n;
        return n = t.elements.indexOf(e),
        -1 !== n && t.elements.splice(n, 1),
        0 === t.elements.length ? window.removeEventListener("scroll", t.scrollHandler, {
            capture: !0,
            passive: !0
        }) : void 0
    },
    s.inViewport = function(e, t) {
        var n;
        return null != t.call && (t = {
            "in": t
        }),
        n = {
            id: i++,
            selector: e,
            "in": t["in"],
            out: t.out,
            elements: [],
            checkPending: !1
        },
        n.scrollHandler = function() {
            return a(n)
        },
        c(e, {
            add: function(e) {
                return r(e, n)
            },
            remove: function(e) {
                return o(e, n)
            }
        }),
        n
    }
}.call(this),
function(e) {
    function t(t) {
        return e.facebox.settings.inited ? !0 : (e.facebox.settings.inited = !0, e(document).trigger("init.facebox"), void(t && e.extend(e.facebox.settings, t)))
    }
    function n() {
        var e, t;
        return self.pageYOffset ? (t = self.pageYOffset, e = self.pageXOffset) : document.documentElement && document.documentElement.scrollTop ? (t = document.documentElement.scrollTop, e = document.documentElement.scrollLeft) : document.body && (t = document.body.scrollTop, e = document.body.scrollLeft),
        new Array(e, t)
    }
    function r() {
        var e;
        return self.innerHeight ? e = self.innerHeight: document.documentElement && document.documentElement.clientHeight ? e = document.documentElement.clientHeight: document.body && (e = document.body.clientHeight),
        e
    }
    function i(t, n) {
        if (t.match(/#/)) {
            var r = window.location.href.split("#")[0],
            i = t.replace(r, "");
            if ("#" == i) return;
            e.facebox.reveal(e(i).html(), n)
        }
    }
    function o() {
        return 0 == e.facebox.settings.overlay || null === e.facebox.settings.opacity
    }
    function a() {
        return o() ? void 0 : (0 == e(".facebox-overlay").length && e("body").append('<div class="facebox-overlay facebox-overlay-hide"></div>'), e(".facebox-overlay").hide().addClass("facebox-overlay-active").css("opacity", e.facebox.settings.opacity).click(function() {
            u(document, "facebox:close")
        }).fadeIn(200), !1)
    }
    function s() {
        return o() ? void 0 : (e(".facebox-overlay").fadeOut(200,
        function() {
            e(".facebox-overlay").removeClass("facebox-overlay-active"),
            e(".facebox-overlay").addClass("facebox-overlay-hide"),
            e(".facebox-overlay").remove()
        }), !1)
    }
    function u(e, t, n) {
        return e.dispatchEvent(new CustomEvent(t, {
            bubbles: !0,
            cancelable: !0,
            detail: n
        }))
    }
    e.facebox = function(t, n) {
        return e.facebox.loading(),
        new Promise(function(r) {
            e(document).one("facebox:reveal",
            function() {
                r(e(".facebox-content")[0])
            }),
            t.div ? i(t.div, n) : e.isFunction(t) ? t.call(e) : e.facebox.reveal(t, n)
        })
    },
    e.extend(e.facebox, {
        settings: {
            opacity: .5,
            overlay: !0
        },
        loading: function() {
            return t(),
            1 == e(".facebox-loading").length ? !0 : (a(), e(".facebox-content").empty().append('<div class="facebox-loading"></div>'), e(".facebox").show().css({
                top: n()[1] + r() / 10,
                left: e(window).width() / 2 - e(".facebox-popup").outerWidth() / 2
            }), e(document).bind("keydown.facebox",
            function(t) {
                return 27 == t.keyCode && e.facebox.close(),
                !0
            }), void u(document, "facebox:loading"))
        },
        reveal: function(t, n) {
            e(document).trigger("beforeReveal.facebox"),
            n && e(".facebox-content").addClass(n),
            e(".facebox-content").empty().append(t),
            e(".facebox-loading").remove(),
            e(".facebox-popup").children().fadeIn("normal"),
            e(".facebox").css("left", e(window).width() / 2 - e(".facebox-popup").outerWidth() / 2),
            e(".facebox-header").attr("tabindex", "-1"),
            e(".facebox-content [data-facebox-id]").each(function() {
                e(this).attr("id", e(this).attr("data-facebox-id"))
            }),
            e(".facebox .facebox-header").focus(),
            u(document, "facebox:reveal"),
            e(document).trigger("afterReveal.facebox")
        },
        close: function() {
            return u(document, "facebox:close"),
            !1
        }
    }),
    e.fn.facebox = function(n) {
        function r(t) {
            t.preventDefault(),
            e.facebox.loading(!0);
            var n = this.rel.match(/facebox\[?\.(\w+)\]?/);
            n && (n = n[1]),
            i(this.href, n)
        }
        if (0 != e(this).length) return t(n),
        this.bind("click.facebox", r)
    },
    document.addEventListener("facebox:close",
    function() {
        e(document).unbind("keydown.facebox"),
        e(".facebox").fadeOut(function() {
            e(".facebox-content").removeClass().addClass("facebox-content"),
            e(".facebox-loading").remove(),
            u(document, "facebox:afterClose")
        }),
        s()
    }),
    e(document).on("click", ".js-facebox-close", e.facebox.close)
} (jQuery),
define("github/hotkey", ["exports"],
function(e) {
    function t(e) {
        var t = n[e.which],
        i = "";
        if (e.ctrlKey && "ctrl" !== t && (i += "ctrl+"), e.altKey && "alt" !== t && (i += "alt+"), e.metaKey && !e.ctrlKey && "meta" !== t && (i += "meta+"), e.shiftKey) {
            var o = r[e.which];
            return o ? i + o: "shift" === t ? i + "shift": t ? i + "shift+" + t: null
        }
        return t ? i + t: null
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = t;
    var n = {
        8 : "backspace",
        9 : "tab",
        13 : "enter",
        16 : "shift",
        17 : "ctrl",
        18 : "alt",
        19 : "pause",
        20 : "capslock",
        27 : "esc",
        32 : "space",
        33 : "pageup",
        34 : "pagedown",
        35 : "end",
        36 : "home",
        37 : "left",
        38 : "up",
        39 : "right",
        40 : "down",
        45 : "insert",
        46 : "del",
        48 : "0",
        49 : "1",
        50 : "2",
        51 : "3",
        52 : "4",
        53 : "5",
        54 : "6",
        55 : "7",
        56 : "8",
        57 : "9",
        65 : "a",
        66 : "b",
        67 : "c",
        68 : "d",
        69 : "e",
        70 : "f",
        71 : "g",
        72 : "h",
        73 : "i",
        74 : "j",
        75 : "k",
        76 : "l",
        77 : "m",
        78 : "n",
        79 : "o",
        80 : "p",
        81 : "q",
        82 : "r",
        83 : "s",
        84 : "t",
        85 : "u",
        86 : "v",
        87 : "w",
        88 : "x",
        89 : "y",
        90 : "z",
        91 : "meta",
        93 : "meta",
        96 : "0",
        97 : "1",
        98 : "2",
        99 : "3",
        100 : "4",
        101 : "5",
        102 : "6",
        103 : "7",
        104 : "8",
        105 : "9",
        106 : "*",
        107 : "+",
        109 : "-",
        110 : ".",
        111 : "/",
        112 : "f1",
        113 : "f2",
        114 : "f3",
        115 : "f4",
        116 : "f5",
        117 : "f6",
        118 : "f7",
        119 : "f8",
        120 : "f9",
        121 : "f10",
        122 : "f11",
        123 : "f12",
        144 : "numlock",
        145 : "scroll",
        186 : "",
        187 : "=",
        188 : ",",
        189 : "-",
        190 : ".",
        191 : "/",
        192 : "`",
        219 : "[",
        220 : "\\",
        221 : "]",
        222 : "'"
    },
    r = {
        48 : ")",
        49 : "!",
        50 : "@",
        51 : "#",
        52 : "$",
        53 : "%",
        54 : "^",
        55 : "&",
        56 : "*",
        57 : "(",
        65 : "A",
        66 : "B",
        67 : "C",
        68 : "D",
        69 : "E",
        70 : "F",
        71 : "G",
        72 : "H",
        73 : "I",
        74 : "J",
        75 : "K",
        76 : "L",
        77 : "M",
        78 : "N",
        79 : "O",
        80 : "P",
        81 : "Q",
        82 : "R",
        83 : "S",
        84 : "T",
        85 : "U",
        86 : "V",
        87 : "W",
        88 : "X",
        89 : "Y",
        90 : "Z",
        186 : ":",
        187 : "+",
        188 : "<",
        189 : "_",
        190 : ">",
        191 : "?",
        192 : "~",
        219 : "{",
        220 : "|",
        221 : "}",
        222 : '"'
    }
}),
define.amd = "delegated-events",
define(["exports", "selector-set"],
function(e, t) {
    "use strict";
    function n(e, t, n) {
        var r = e[t];
        return e[t] = function() {
            return n.apply(e, arguments),
            r.apply(e, arguments)
        },
        e
    }
    function r(e, t) {
        var n = [],
        r = t;
        do {
            if (1 !== r.nodeType) break;
            var i = e.matches(r);
            i.length && n.push({
                node: r,
                observers: i
            })
        } while ( r = r . parentElement );
        return n
    }
    function i() {
        p.set(this, !0)
    }
    function o() {
        p.set(this, !0),
        h.set(this, !0)
    }
    function a() {
        return m.get(this) || null
    }
    function s(e) {
        var t = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
        t && Object.defineProperty(e, "currentTarget", {
            get: a
        })
    }
    function u(e) {
        n(e, "stopPropagation", i),
        n(e, "stopImmediatePropagation", o),
        s(e);
        for (var t = d[e.type], a = r(t, e.target), u = 0, c = a.length; c > u && !p.get(e); u++) {
            var l = a[u];
            m.set(e, l.node);
            for (var f = 0,
            v = l.observers.length; v > f && !h.get(e); f++) l.observers[f].data.call(l.node, e)
        }
        m["delete"](e)
    }
    function c(e, n, r) {
        var i = d[e];
        i || (i = new t, d[e] = i, document.addEventListener(e, u, !1)),
        i.add(n, r)
    }
    function l(e, t, n) {
        var r = d[e];
        r && (r.remove(t, n), r.size || (delete d[e], document.removeEventListener(e, u, !1)))
    }
    function f(e, t, n) {
        return e.dispatchEvent(new CustomEvent(t, {
            bubbles: !0,
            cancelable: !0,
            detail: n
        }))
    }
    t = "default" in t ? t["default"] : t;
    var d = {},
    p = new WeakMap,
    h = new WeakMap,
    m = new WeakMap;
    e.on = c,
    e.off = l,
    e.fire = f
}),
delete define.amd,
define("github/perform-transition", ["exports", "jquery"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function r(e, t) {
        if (!s) return void t.apply(e);
        var n = a["default"](e).find(".js-transitionable");
        n = n.add(a["default"](e).filter(".js-transitionable"));
        for (var r = function(e, t) {
            var r = n[e],
            s = a["default"](r),
            u = i(r);
            s.one("transitionend",
            function() {
                r.style.display = null,
                r.style.visibility = null,
                u && o(r,
                function() {
                    r.style.height = null
                })
            }),
            r.style.display = "block",
            r.style.visibility = "visible",
            u && o(r,
            function() {
                r.style.height = s.height() + "px"
            }),
            r.offsetHeight
        },
        u = 0, c = n.length; c > u; u++) r(u, c);
        t.apply(e);
        for (var l = 0,
        f = n.length; f > l; l++) {
            var d = n[l];
            i(d) && (0 === a["default"](d).height() ? d.style.height = d.scrollHeight + "px": d.style.height = "0px")
        }
    }
    function i(e) {
        return "height" === a["default"](e).css("transitionProperty")
    }
    function o(e, t) {
        e.style.transition = "none",
        t(e),
        e.offsetHeight,
        e.style.transition = null
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = r;
    var a = n(t),
    s = "ontransitionend" in window
}),
function() {
    function e(e) {
        f && t(f),
        c(e, "menu:activate") && (i(document).on("keydown.menu", r), i(document).on("click.menu", n), f = e, l(e,
        function() {
            e.classList.add("active");
            var t = e.querySelector(".js-menu-content [tabindex]");
            t && t.focus();
            var n = e.querySelector(".js-menu-content[aria-hidden]");
            n && n.setAttribute("aria-hidden", "false")
        }), i(e).fire("menu:activated", {
            async: !0
        }))
    }
    function t(e) {
        c(e, "menu:deactivate") && (i(document).off(".menu"), f = null, l(e,
        function() {
            e.classList.remove("active");
            var t = e.querySelector(".js-menu-content[aria-hidden]");
            t && t.setAttribute("aria-hidden", "true")
        }), i(e).fire("menu:deactivated", {
            async: !0
        }))
    }
    function n(e) {
        f && (i(e.target).closest(f)[0] || (e.preventDefault(), t(f)))
    }
    function r(e) {
        if (f && "esc" === o(e.originalEvent)) {
            var n = i(document.activeElement).parents().get();
            n.indexOf(f) >= 0 && document.activeElement.blur(),
            e.preventDefault(),
            t(f)
        }
    }
    var i = require("jquery"),
    o = require("github/hotkey")["default"],
    a = require("github/observe"),
    s = a.observe,
    u = require("delegated-events"),
    c = u.fire,
    l = require("github/perform-transition")["default"],
    f = null;
    i(document).on("click", ".js-menu-container",
    function(n) {
        var r = this,
        o = i(n.target).closest(".js-menu-target")[0];
        o ? (n.preventDefault(), r === f ? t(r) : e(r)) : i(n.target).closest(".js-menu-content")[0] || r === f && (n.preventDefault(), t(r))
    }),
    i(document).on("click", ".js-menu-container .js-menu-close",
    function(e) {
        t(this.closest(".js-menu-container")),
        e.preventDefault()
    }),
    i.fn.menu = function(n) {
        var r = this.closest(".js-menu-container")[0];
        if (r) switch (n) {
        case "activate":
            e(r);
            break;
        case "deactivate":
            t(r)
        }
    },
    s(".js-menu-container.active", {
        add: function() {
            document.body.classList.add("menu-active")
        },
        remove: function() {
            document.body.classList.remove("menu-active")
        }
    })
} (),
define("github/visible", ["exports"],
function(e) {
    function t(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0
    }
    function n(e) {
        return ! t(e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = n
}),
function() {
    function e(e) {
        e.addEventListener("mousemove", n, !1),
        e.addEventListener("mouseover", r, !1)
    }
    function t(e) {
        e.removeEventListener("mousemove", n, !1),
        e.removeEventListener("mouseover", r, !1)
    }
    function n(e) { (A.x !== e.clientX || A.y !== e.clientY) && (M = !1),
        A = {
            x: e.clientX,
            y: e.clientY
        }
    }
    function r(e) {
        M || T(e.target).trigger("navigation:mouseover")
    }
    function i(e) {
        var t, n, r;
        r = e.currentTarget,
        n = e.modifierKey || e.altKey || e.ctrlKey || e.metaKey,
        t = T(r).fire("navigation:open", {
            modifierKey: n
        }),
        t.isDefaultPrevented() && e.preventDefault()
    }
    function o(e) {
        var t;
        return t = y(),
        e !== t ? T(e).fire("navigation:activate",
        function() {
            return t && t.classList.remove("js-active-navigation-container"),
            e.classList.add("js-active-navigation-container"),
            T(e).fire("navigation:activated", {
                async: !0
            })
        }) : void 0
    }
    function a(e) {
        return T(e).fire("navigation:deactivate",
        function() {
            return e.classList.remove("js-active-navigation-container"),
            T(e).fire("navigation:deactivated", {
                async: !0
            })
        })
    }
    function s(e) {
        var t = y();
        t && P.push(t),
        o(e)
    }
    function u(e) {
        a(e),
        l(e);
        var t = P.pop();
        t && o(t)
    }
    function c(e, t, n) {
        var r, i, a;
        if (null == n && (n = "smooth"), r = b(t)[0], a = T(e).closest(".js-navigation-item")[0] || r, o(t), a) {
            if (i = g(a, t)) return;
            x(j(a), a, n)
        }
    }
    function l(e) {
        T(e).find(".navigation-focus.js-navigation-item").removeClass("navigation-focus")
    }
    function f(e, t, n) {
        null == n && (n = "smooth"),
        l(t),
        c(e, t, n)
    }
    function d(e, t) {
        var n, r, i, o;
        i = b(t),
        r = T.inArray(e, i);
        var a = i[r - 1];
        if (a) {
            if (n = g(a, t)) return;
            o = j(a),
            "page" === w(t) ? x(o, a) : E(o, a)
        }
    }
    function p(e, t) {
        var n, r, i, o;
        i = b(t),
        r = T.inArray(e, i);
        var a = i[r + 1];
        if (a) {
            if (n = g(a, t)) return;
            o = j(a),
            "page" === w(t) ? x(o, a) : E(o, a)
        }
    }
    function h(e, t) {
        var n, r, i, o, a;
        for (i = b(t), r = T.inArray(e, i), o = j(e); (a = i[r - 1]) && C(a, o).top >= 0;) r--;
        if (a) {
            if (n = g(a, t)) return;
            x(o, a)
        }
    }
    function m(e, t) {
        var n, r, i, o, a;
        for (i = b(t), r = T.inArray(e, i), a = j(e); (o = i[r + 1]) && C(o, a).bottom >= 0;) r++;
        if (o) {
            if (n = g(o, t)) return;
            x(a, o)
        }
    }
    function v(e, t) {
        null == t && (t = !1),
        T(e).fire("navigation:keyopen", {
            modifierKey: t
        })
    }
    function g(e, t) {
        var n;
        return n = T(e).fire("navigation:focus",
        function() {
            return l(t),
            e.classList.add("navigation-focus"),
            T(e).fire("navigation:focused", {
                async: !0
            })
        }),
        n.isDefaultPrevented()
    }
    function y() {
        return T(".js-active-navigation-container")[0]
    }
    function b(e) {
        return T(Array.from(T(e).find(".js-navigation-item")).filter(_))
    }
    function w(e) {
        var t;
        return null != (t = T(e).attr("data-navigation-scroll")) ? t: "item"
    }
    function x(e, t, n) {
        var r, i, o, a;
        return null == n && (n = "smooth"),
        o = S(t, e),
        i = C(t, e),
        r = {},
        "smooth" === n && (r.duration = 200),
        i.bottom <= 0 ? r.top = o.top - 30 : i.top <= 0 && (a = null != e.offsetParent ? e.scrollHeight: T(document).height(), r.top = a - (o.bottom + i.height) + 30),
        i.bottom <= 0 || i.top <= 0 ? T(e).scrollTo(r) : void 0
    }
    function E(e, t) {
        var n, r, i, o;
        return r = S(t, e),
        n = C(t, e),
        n.bottom <= 0 ? (i = null != e.offsetParent ? e.scrollHeight: T(document).height(), o = i - (r.bottom + n.height), T(e).scrollTo({
            top: o
        })) : n.top <= 0 ? T(e).scrollTo({
            top: r.top
        }) : void 0
    }
    var T = require("jquery"),
    _ = require("github/visible")["default"],
    k = require("github/dimensions"),
    C = k.overflowOffset,
    j = k.overflowParent,
    S = k.positionedOffset,
    L = require("github/observe"),
    O = L.observe,
    N = navigator.userAgent.match(/Macintosh/),
    D = navigator.userAgent.match(/Macintosh/) ? "meta": "ctrl",
    M = !1,
    A = {
        x: 0,
        y: 0
    };
    O(".js-navigation-container", {
        add: e,
        remove: t
    }),
    T(document).on("keydown",
    function(e) {
        var t, n, r; (e.target === document.body || e.target.classList.contains("js-navigation-enable")) && (t = y()) && (M = !0, r = T(t).find(".js-navigation-item.navigation-focus")[0] || t, n = T(r).fire("navigation:keydown", {
            originalEvent: e,
            hotkey: e.hotkey,
            relatedTarget: t
        }), n.isDefaultPrevented() && e.preventDefault())
    }),
    T(document).on("navigation:keydown", ".js-active-navigation-container",
    function(e) {
        var t, n;
        if (t = this, n = T(e.originalEvent.target).is("input, textarea"), T(e.target).is(".js-navigation-item")) {
            var r = e.target;
            if (n) {
                if (N) switch (e.hotkey) {
                case "ctrl+n":
                    p(r, t);
                    break;
                case "ctrl+p":
                    d(r, t)
                }
                switch (e.hotkey) {
                case "up":
                    d(r, t);
                    break;
                case "down":
                    p(r, t);
                    break;
                case "enter":
                    v(r);
                    break;
                case D + "+enter": v(r, !0)
                }
            } else {
                if (N) switch (e.hotkey) {
                case "ctrl+n":
                    p(r, t);
                    break;
                case "ctrl+p":
                    d(r, t);
                    break;
                case "alt+v":
                    h(r, t);
                    break;
                case "ctrl+v":
                    m(r, t)
                }
                switch (e.hotkey) {
                case "j":
                case "J":
                    p(r, t);
                    break;
                case "k":
                case "K":
                    d(r, t);
                    break;
                case "o":
                case "enter":
                    v(r);
                    break;
                case D + "+enter": v(r, !0)
                }
            }
        } else {
            var i = b(t)[0];
            if (i) if (n) {
                if (N) switch (e.hotkey) {
                case "ctrl+n":
                    g(i, t)
                }
                switch (e.hotkey) {
                case "down":
                    g(i, t)
                }
            } else {
                if (N) switch (e.hotkey) {
                case "ctrl+n":
                case "ctrl+v":
                    g(i, t)
                }
                switch (e.hotkey) {
                case "j":
                    g(i, t)
                }
            }
        }
        if (n) {
            if (N) switch (e.hotkey) {
            case "ctrl+n":
            case "ctrl+p":
                e.preventDefault();
            }
            switch (e.hotkey) {
            case "up":
            case "down":
                e.preventDefault();
                break;
            case "enter":
            case D + "+enter": e.preventDefault()
            }
        } else {
            if (N) switch (e.hotkey) {
            case "ctrl+n":
            case "ctrl+p":
            case "alt+v":
            case "ctrl+v":
                e.preventDefault()
            }
            switch (e.hotkey) {
            case "j":
            case "k":
                e.preventDefault();
                break;
            case "o":
            case "enter":
            case D + "+enter": e.preventDefault()
            }
        }
    }),
    T(document).on("navigation:mouseover", ".js-active-navigation-container .js-navigation-item",
    function(e) {
        var t;
        t = T(e.currentTarget).closest(".js-navigation-container")[0],
        g(e.currentTarget, t)
    }),
    T(document).on("click", ".js-active-navigation-container .js-navigation-item",
    function(e) {
        i(e)
    }),
    T(document).on("navigation:keyopen", ".js-active-navigation-container .js-navigation-item",
    function(e) {
        var t = T(this).filter(".js-navigation-open")[0] || T(this).find(".js-navigation-open")[0];
        t ? (e.modifierKey ? (window.open(t.href, "_blank"), window.focus()) : T(t).click(), e.preventDefault()) : i(e)
    });
    var P = [];
    T.fn.navigation = function(e, t) {
        var n, r;
        return null == t && (t = {}),
        "active" === e ? y() : (n = T(this).closest(".js-navigation-container")[0]) ? (r = {
            activate: function() {
                return o(n)
            },
            deactivate: function() {
                return a(n)
            },
            push: function() {
                return s(n)
            },
            pop: function() {
                return u(n)
            },
            focus: function(e) {
                return function() {
                    return c(e[0], n, t.behavior)
                }
            } (this),
            clear: function() {
                return l(n)
            },
            refocus: function(e) {
                return function() {
                    return f(e[0], n, t.behavior)
                }
            } (this)
        },
        "function" == typeof r[e] ? r[e]() : void 0) : void 0
    }
}.call(this),
function() {
    var e, t, n = require("jquery");
    n.fn.prefixFilterList = function(r, i) {
        var o, a, s, u, c, l, f, d, p, h, m;
        if (null == i && (i = {}), l = this[0]) {
            for (r = r.toLowerCase(), h = null != (d = i.text) ? d: t, o = n(l).children(), c = i.limit, i.mark === !0 ? f = e: null != (null != (p = i.mark) ? p.call: void 0) && (f = i.mark), m = 0, a = 0, u = o.length; u > a; a++) s = o[a],
            0 === h(s).indexOf(r) ? c && m >= c ? s.style.display = "none": (m++, s.style.display = "", f && (f(s), f(s, r))) : s.style.display = "none";
            return m
        }
    },
    t = function(e) {
        return n.trim(e.textContent.toLowerCase())
    },
    e = function(e, t) {
        var n, r, i;
        r = e.innerHTML,
        t ? (i = new RegExp(t, "i"), e.innerHTML = r.replace(i, "<mark>$&</mark>")) : (n = r.replace(/<\/?mark>/g, ""), r !== n && (e.innerHTML = n))
    }
}.call(this),
function() {
    function e(e) {
        return e.offsetParent ? {
            top: t(e).scrollTop(),
            left: t(e).scrollLeft()
        }: {
            top: t(document).scrollTop(),
            left: t(document).scrollLeft()
        }
    }
    var t = require("jquery");
    t.fn.scrollBy = function(t, n) {
        var r, i;
        return 0 === t && 0 === n ? [0, 0] : (i = e(this[0]), this.scrollTo({
            top: i.top + n,
            left: i.left + t
        }), r = e(this[0]), [r.left - i.left, r.top - i.top])
    }
}.call(this),
function() {
    var e, t, n = require("jquery");
    n.fn.substringFilterList = function(r, i) {
        var o, a, s, u, c, l, f, d, p, h, m;
        if (null == i && (i = {}), l = this[0]) {
            for (r = r.toLowerCase(), h = null != (d = i.text) ? d: t, c = i.limit, o = n(l).children(), i.mark === !0 ? f = e: null != (null != (p = i.mark) ? p.call: void 0) && (f = i.mark), m = 0, a = 0, u = o.length; u > a; a++) s = o[a],
            -1 !== h(s).indexOf(r) ? c && m >= c ? s.style.display = "none": (m++, s.style.display = "", f && (f(s), f(s, r))) : s.style.display = "none";
            return m
        }
    },
    t = function(e) {
        return n.trim(e.textContent.toLowerCase())
    },
    e = function(e, t) {
        var n, r, i;
        r = e.innerHTML,
        t ? (i = new RegExp(t, "i"), e.innerHTML = r.replace(i, "<mark>$&</mark>")) : (n = r.replace(/<\/?mark>/g, ""), r !== n && (e.innerHTML = n))
    }
}.call(this),
define("github/task-list-parsing", ["exports"],
function(e) {
    function t(e) {
        return e.replace(/\s*$/, "")
    }
    function n(e) {
        return e.match(/^\s*([-*])/)[1]
    }
    function r(e) {
        var t = e.match(/^\s*[-*]\s+\[([\sx])\].*/)[1];
        return "x" === t
    }
    function i(e) {
        return e.match(/^\s*[-*]\s+\[[\sx]\]\s+(.*)/)[1]
    }
    function o(e) {
        var t = a(e);
        return t && t > 0
    }
    function a(e) {
        var t = e.match(/^(\s+)[-*]/);
        return t ? t[1].length: void 0
    }
    function s(e) {
        var t = new c,
        s = null,
        d = null;
        return e.split("\n").forEach(function(e, c) {
            if (e.match(u)) {
                s || (s = new l, s.startLine = c, t.addTaskList(s));
                var p = new f;
                p.bullet = n(e),
                p.checked = r(e),
                p.text = i(e),
                o(e) ? (p.indentation = a(e), d.subitems.push(p)) : (d = p, s.items.push(p))
            } else s && (s = null),
            t.lines.push(e)
        }),
        t
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.parseMarkdown = s;
    var u = /^\s*[-*]\s+\[[\sx]\].*/,
    c = e.MarkdownDocument = function() {
        function e() {
            this.lines = [],
            this.taskLists = []
        }
        return e.prototype.toMarkdown = function() {
            return this.lines.map(function(e) {
                return "string" == typeof e ? e: e.toMarkdown()
            }).join("\n").trim()
        },
        e.prototype.addTaskList = function(e) {
            this.lines.push(e),
            this.taskLists.push(e)
        },
        e
    } (),
    l = function() {
        function e() {
            this.items = [],
            this.startLine = -1
        }
        return e.prototype.toMarkdown = function() {
            var e = this.items.map(function(e) {
                return e.toMarkdown()
            }).join("\n");
            return e.trim()
        },
        e
    } (),
    f = function() {
        function e() {
            this.subitems = []
        }
        return e.prototype.toMarkdown = function() {
            var e = "";
            return this.indentation && (e = Array(this.indentation + 1).join(" ")),
            e = e + this.bullet + " ",
            e += this.checked ? "[x] ": "[ ] ",
            e = e + this.text + "\n",
            this.subitems.length > 0 && (e += this.subitems.map(function(e) {
                return e.toMarkdown()
            }).join("\n")),
            t(e)
        },
        e
    } ()
}),
function() {
    function e(e, t, n) {
        var r = e.replace(/\r/g, "").replace(q, "").replace(R, "").split("\n"),
        i = 0;
        return e.split("\n").map(function(e) {
            return r.indexOf(e) >= 0 && e.match(I) && (i += 1, i === t && (e = n ? e.replace(j, C) : e.replace(S, k))),
            e
        }).join("\n")
    }
    function t(e) {
        return e.replace(/([\[\]])/g, "\\$1").replace(/\s/, "\\s").replace("x", "[xX]")
    }
    function n(e) {
        e.target.classList.add("hovered")
    }
    function r(e) {
        e.target.classList.remove("hovered")
    }
    function i(e, t) {
        if (e.parentNode === t.parentNode) for (; e;) {
            if (e === t) return ! 0;
            e = e.previousElementSibling
        }
        return ! 1
    }
    function o(e, t) {
        return e.closest(".js-comment-body") === t.closest(".js-comment-body")
    }
    function a(e) {
        var t = e.closest(".js-comment-body"),
        n = Array.from(t.querySelectorAll("ul.contains-task-list")),
        r = Array.from(t.querySelectorAll(".task-list-item > .contains-task-list")),
        i = n.filter(function(e) {
            return - 1 === r.indexOf(e)
        });
        return i.indexOf(e)
    }
    function s(e) {
        e.dataTransfer.setData("text/plain", e.target.textContent.trim()),
        A = e.target,
        L = !1,
        O = e.target,
        P = O.closest("ul.contains-task-list"),
        O.classList.add("is-ghost"),
        M = Array.from(O.parentNode.children),
        D = M.indexOf(O),
        N = M[D + 1] || null
    }
    function u(e) {
        if (O) {
            var t = e.currentTarget;
            if (!o(O, t)) return void e.stopPropagation();
            e.preventDefault(),
            e.dataTransfer.dropEffect = "move",
            A !== t && O && (O.classList.add("is-dragging"), A = t, i(O, t) ? t.before(O) : t.after(O))
        }
    }
    function c(e) {
        if (O) {
            L = !0;
            var t = Array.from(O.parentNode.children).indexOf(O),
            n = e.target.closest("ul.contains-task-list");
            if (D != t || P !== n) {
                var r = a(P),
                i = a(n),
                o = e.target.closest(".js-task-list-container"),
                s = o.querySelector(".js-task-list-field"),
                u = _(s.value),
                c = u.taskLists[r].items.splice(D, 1)[0];
                u.taskLists[i].items.splice(t, 0, c),
                s.value = u.toMarkdown(),
                g(o, "reordered")
            }
        }
    }
    function l() {
        O.classList.remove("is-dragging"),
        O.classList.remove("is-ghost"),
        L || P.insertBefore(O, N),
        O = null,
        N = null,
        L = !1,
        A = null
    }
    function f(e) {
        if (O) {
            var t = e.currentTarget;
            if (!o(O, t)) return void e.stopPropagation();
            e.preventDefault(),
            e.dataTransfer.dropEffect = "move"
        }
    }
    function d() {
        var e = document.createElement("span"),
        t = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        n = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return e.classList.add("handle"),
        t.classList.add("drag-handle"),
        t.setAttribute("aria-hidden", "true"),
        t.setAttribute("width", "16"),
        t.setAttribute("height", "15"),
        t.setAttribute("version", "1.1"),
        t.setAttribute("viewBox", "0 0 16 15"),
        n.setAttribute("d", "M12,4V5H4V4h8ZM4,8h8V7H4V8Zm0,3h8V10H4v1Z"),
        t.appendChild(n),
        e.appendChild(t),
        e
    }
    function p() {
        this.closest(".task-list-item").setAttribute("draggable", !0)
    }
    function h() {
        O || this.closest(".task-list-item").setAttribute("draggable", !1)
    }
    function m(e) {
        e.querySelectorAll(".js-task-list-field").length > 0 && (e.classList.add("is-task-list-enabled"), Array.from(e.querySelectorAll(".task-list-item")).forEach(function(e) {
            return e.classList.add("enabled")
        }), Array.from(e.querySelectorAll(".task-list-item-checkbox")).forEach(function(e) {
            return e.disabled = !1
        }))
    }
    function v(e) {
        e.classList.remove("is-task-list-enabled"),
        Array.from(e.querySelectorAll(".task-list-item")).forEach(function(e) {
            return e.classList.remove("enabled")
        }),
        Array.from(e.querySelectorAll(".task-list-item-checkbox")).forEach(function(e) {
            return e.disabled = !0
        })
    }
    function g(e, t) {
        var n = e.querySelector("form.js-comment-update");
        v(e);
        var r = document.createElement("input");
        if (r.setAttribute("type", "hidden"), r.setAttribute("name", "task_list_track"), r.setAttribute("value", t), n.appendChild(r), !n.elements.task_list_key) {
            var i = document.createElement("input");
            i.setAttribute("type", "hidden"),
            i.setAttribute("name", "task_list_key"),
            i.setAttribute("value", n.querySelector(".js-task-list-field").getAttribute("name").split("[")[0]),
            n.appendChild(i)
        }
        y(n).submit()
    }
    var y = require("jquery"),
    b = require("github/observe"),
    w = b.observe,
    x = require("delegated-events"),
    E = x.on,
    T = require("github/task-list-parsing"),
    _ = T.parseMarkdown,
    k = "[ ]",
    C = "[x]",
    j = RegExp("" + t(k)),
    S = RegExp("" + t(C)),
    L = !1,
    O = null,
    N = null,
    D = null,
    M = null,
    A = null,
    P = null,
    I = RegExp("^(?:\\s*(?:>\\s*)*(?:[-+*]|(?:\\d+\\.)))\\s*(" + t(C) + "|" + t(k) + ")\\s+(?!\\(.*?\\))(?=(?:\\[.*?\\]\\s*(?:\\[.*?\\]|\\(.*?\\))\\s*)*(?:[^\\[]|$))"),
    q = /^`{3}(?:\s*\w+)?[\S\s].*[\S\s]^`{3}$/gm,
    R = RegExp("^(" + t(C) + "|" + t(k) + ").+$", "g");
    w(".contains-task-list",
    function() {
        var e = this.closest(".js-task-list-container");
        e && m(e)
    }),
    E("change", ".task-list-item-checkbox",
    function() {
        var t = this.closest(".js-task-list-container"),
        n = t.querySelector(".js-task-list-field"),
        r = 1 + Array.from(t.querySelectorAll(".task-list-item-checkbox")).indexOf(this),
        i = this.checked;
        n.value = e(n.value, r, i),
        g(t, "checked:" + (i ? 1 : 0))
    }),
    w(".js-reorderable-task-lists .js-comment-body > .contains-task-list > .task-list-item",
    function() {
        if (! (this.closest(".js-comment-body").querySelectorAll(".task-list-item").length <= 1) && this.closest(".is-task-list-enabled")) {
            var e = d();
            this.insertBefore(e, this.firstChild),
            e.addEventListener("mouseenter", p),
            e.addEventListener("mouseleave", h),
            this.addEventListener("dragstart", s),
            this.addEventListener("dragenter", u),
            this.addEventListener("dragend", l),
            this.addEventListener("drop", c),
            this.addEventListener("dragover", f),
            this.addEventListener("mouseenter", n),
            this.addEventListener("mouseleave", r)
        }
    }),
    y(document).on("ajaxComplete", "form.js-comment-update",
    function(e, t) {
        var n = this.elements.task_list_track;
        n && n.remove(),
        200 !== t.status || /^\s*</.test(t.responseText) ? 422 === t.status && t.stale && window.location.reload() : m(this.closest(".js-task-list-container"))
    })
} (),
function() {
    var e, t, n = require("jquery");
    e = function() {
        var e, t, r, i, o;
        return t = !1,
        e = !1,
        i = null,
        o = parseInt(this.getAttribute("data-throttle-wait")) || 100,
        r = function(t) {
            return function(r) {
                i && clearTimeout(i),
                i = setTimeout(function() {
                    var o;
                    i = null,
                    e = !1,
                    o = new n.Event("throttled:input", {
                        target: r
                    }),
                    n.event.trigger(o, null, t, !0)
                },
                o)
            }
        } (this),
        n(this).on("keydown.throttledInput",
        function() {
            t = !0,
            i && clearTimeout(i)
        }),
        n(this).on("keyup.throttledInput",
        function(n) {
            t = !1,
            e && r(n.target)
        }),
        n(this).on("input.throttledInput",
        function(n) {
            e = !0,
            t || r(n.target)
        })
    },
    t = function() {
        return n(this).off("keydown.throttledInput"),
        n(this).off("keyup.throttledInput"),
        n(this).off("input.throttledInput")
    },
    n.event.special["throttled:input"] = {
        setup: e,
        teardown: t
    }
}.call(this),
define("github/jquery", ["exports", "jquery"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(t);
    e["default"] = r["default"].noConflict(!0)
}),
define("github/node", ["exports"],
function(e) {
    function t(e) {
        return n(e).defaultView
    }
    function n(e) {
        switch (e.nodeType) {
        case 1:
            return e.ownerDocument;
        case 9:
            return e;
        default:
            return e.document ? e.document: null
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getWindow = t,
    e.getDocument = n
}),
define("github/inspect", ["exports", "./node"],
function(e, t) {
    function n(e) {
        for (var n = []; e && (n.push(r(e)), e !== t.getDocument(e).body && !e.id);) e = e.parentNode;
        return n.reverse().join(" > ")
    }
    function r(e) {
        if (e.window) return "window";
        var t = [e.nodeName.toLowerCase()],
        n = e.id;
        if (n && t.push("#" + n), "function" == typeof e.getAttribute && e.getAttribute("class")) {
            var r = e.getAttribute("class").trim().split(/\s+/).join(".");
            r && t.push("." + r)
        }
        return t.join("")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = n
}),
define("github/jquery-event-error-context", ["./jquery", "./inspect"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var r = n(e),
    i = n(t),
    o = r["default"].event.dispatch;
    r["default"].event.dispatch = function(e) {
        if ("error" === e.type && e.target === window) return o.apply(this, arguments);
        try {
            return o.apply(this, arguments)
        } catch(t) {
            throw t.failbotContext || (t.failbotContext = {
                eventType: e.type,
                eventTarget: i["default"](e.target)
            }),
            t
        }
    }
}),
define("github/proxy-site-detection", ["exports"],
function(e) {
    function t(e) {
        var t = e.querySelector("meta[name=expected-hostname]");
        if (!t) return ! 1;
        var n = t.content.split(".").slice( - 2).join("."),
        r = e.location.hostname.split(".").slice( - 2).join(".");
        return n != r
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = t
}),
define("github/history", ["exports"],
function(e) {
    function t() {
        return p
    }
    function n() {
        return m
    }
    function r() {
        var e = {
            _id: (new Date).getTime()
        };
        return o(e),
        e
    }
    function i() {
        return history.length - 1 + h
    }
    function o(e) {
        m = e;
        var t = location.href;
        p[i()] = {
            url: t,
            state: m
        },
        p.length = history.length;
        var n = new CustomEvent("statechange", {
            bubbles: !1,
            cancelable: !1
        });
        n.state = m,
        window.dispatchEvent(n)
    }
    function a(e, t) {
        var n = {
            _id: t
        };
        if (e) for (var r in e) n[r] = e[r];
        return n
    }
    function s() {
        return (new Date).getTime()
    }
    function u(e, t, n) {
        h = 0,
        e = a(e, s()),
        history.pushState(e, t, n),
        o(e)
    }
    function c(e, t, r) {
        e = a(e, n()._id),
        history.replaceState(e, t, r),
        o(e)
    }
    function l() {
        var e = p[i() - 1];
        return e ? e.url: void 0
    }
    function f() {
        var e = p[i() + 1];
        return e ? e.url: void 0
    }
    function d() {
        function e(e, t, n) {
            this.id = e,
            this.url = t,
            n && (this.current = n)
        }
        for (var t = [], n = 0; n < history.length; n++) {
            var r = p[n];
            r ? t.push(new e(r.state._id, r.url, i() === n)) : t.push(new e)
        }
        console.table(t)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getEntries = t,
    e.getState = n,
    e.pushState = u,
    e.replaceState = c,
    e.getBackURL = l,
    e.getForwardURL = f,
    e.debug = d;
    var p = [],
    h = 0,
    m = r();
    window.addEventListener("popstate",
    function(e) {
        if (e.state && e.state._id) {
            var t = e.state._id;
            t < n()._id ? h--:h++,
            o(e.state)
        }
    },
    !0),
    window.addEventListener("hashchange",
    function() {
        if (history.length > p.length) {
            var e = a({},
            s());
            history.replaceState(e, null, location.href),
            o(e)
        }
    },
    !0)
}),
define("github/failbot", ["exports", "./jquery", "./proxy-site-detection", "./history", "./jquery-event-error-context"],
function(e, t, n, r) {
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e) {
        d(e) && s(u(e))
    }
    function a(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1];
        s(c(e, t))
    }
    function s(e) {
        var t = document.querySelector("meta[name=browser-errors-url]");
        if (t) {
            var n = t.content;
            m++,
            window.fetch(n, {
                method: "post",
                body: JSON.stringify(e)
            })
        }
    }
    function u(e) {
        var t = e.message,
        n = e.filename,
        r = e.lineno,
        i = e.error;
        return c(i, {
            message: t,
            filename: n,
            lineno: r
        })
    }
    function c(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1];
        return p["default"].extend({
            originalHistoryState: JSON.stringify(window.history.state),
            url: window.location.href,
            readyState: document.readyState,
            referrer: document.referrer,
            stack: e && e.stack,
            historyState: JSON.stringify(window.history.state),
            timeSinceLoad: Math.round((new Date).getTime() - v),
            extensionScripts: JSON.stringify(f().sort()),
            navigations: JSON.stringify(r.getEntries()),
            user: l(),
            jquery: p["default"].fn.jquery
        },
        e.failbotContext, t)
    }
    function l() {
        var e = document.querySelector("meta[name=user-login]");
        return e ? e.content: void 0
    }
    function f() {
        for (var e = document.getElementsByTagName("script"), t = [], n = 0, r = e.length; r > n; n++) {
            var i = e[n];
            /^(?:chrome-extension|file):/.test(i.src) && t.push(i.src)
        }
        return t
    }
    function d(e) {
        var t = e.lineno,
        n = e.error;
        return h["default"](document) ? !1 : n && n.stack && t ? g ? !1 : p["default"].fn.fire ? m >= 10 ? !1 : !0 : !1 : !1
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.reportEvent = o,
    e.reportError = a,
    e.report = s,
    e.errorContext = c;
    var p = i(t),
    h = i(n),
    m = 0,
    v = (new Date).getTime(),
    g = !1;
    window.addEventListener("pageshow",
    function() {
        g = !1
    }),
    window.addEventListener("pagehide",
    function() {
        g = !0
    })
}),
function() {
    var e = require("github/failbot"),
    t = e.reportEvent,
    n = require("github/setimmediate")["default"];
    window.addEventListener("error", t),
    n(function() {
        return "#b00m" === window.location.hash ? b00m() : void 0
    })
} (),
function() {
    var e = require("github/jquery")["default"]; ("undefined" == typeof Zepto || null === Zepto) && e.ajaxSetup({
        beforeSend: function(t, n) {
            var r, i;
            if (n.global) return r = n.context || document,
            i = e.Event("ajaxBeforeSend"),
            e(r).trigger(i, [t, n]),
            i.isDefaultPrevented() ? !1 : i.result
        }
    })
}.call(this),
function() {
    var e, t, n, r, i, o = require("github/jquery")["default"];
    "undefined" != typeof Zepto && null !== Zepto ? (e = function(e) {
        var t, n, r, i;
        n = document.createEvent("Events");
        for (r in e) i = e[r],
        n[r] = i;
        return n.initEvent(e.type + ":prepare", !0, !0),
        t = function(t, r) {
            return function() {
                return t.apply(e),
                r.apply(n)
            }
        },
        n.preventDefault = t(e.preventDefault, n.preventDefault),
        n.stopPropagation = t(e.stopPropagation, n.stopPropagation),
        n.stopImmediatePropagation = t(e.stopImmediatePropagation, n.stopImmediatePropagation),
        e.target.dispatchEvent(n),
        n.result
    },
    window.addEventListener("click", e, !0), window.addEventListener("submit", e, !0)) : (t = null, n = function(e) {
        var n, r;
        r = e.type + ":" + e.timeStamp,
        r !== t && (n = e.type, e.type = n + ":prepare", o.event.trigger(e, [], e.target, !1), e.type = n, t = r)
    },
    r = function(e) {
        return function() {
            o(this).on(e + ".prepare",
            function() {})
        }
    },
    i = function(e) {
        return function() {
            o(this).off(e + ".prepare",
            function() {})
        }
    },
    o.event.special.click = {
        preDispatch: n
    },
    o.event.special.submit = {
        preDispatch: n
    },
    o.event.special["click:prepare"] = {
        setup: r("click"),
        teardown: i("click")
    },
    o.event.special["submit:prepare"] = {
        setup: r("submit"),
        teardown: i("submit")
    })
}.call(this),
function() {
    var e = require("github/jquery")["default"];
    e(document).on("submit", "form[data-remote]",
    function(t) {
        var n, r, i, o, a, s;
        return i = e(this),
        o = {},
        o.context = this,
        a = i.attr("method"),
        a && (o.type = a),
        s = this.action,
        s && (o.url = s),
        n = i.serializeArray(),
        n && (o.data = n),
        r = i.attr("data-type"),
        r && (o.dataType = r),
        e.ajax(o),
        t.preventDefault(),
        !1
    }),
    e(document).on("ajaxSend", "[data-remote]",
    function(t, n) {
        e(this).data("remote-xhr", n)
    }),
    e(document).on("ajaxComplete", "[data-remote]",
    function() {
        var t;
        "function" == typeof(t = e(this)).removeData && t.removeData("remote-xhr")
    })
}.call(this),
function() {
    var e, t = require("github/jquery")["default"];
    e = "form[data-remote] input[type=submit],\nform[data-remote] button[type=submit],\nform[data-remote] button:not([type]),\nform[data-remote-submit] input[type=submit],\nform[data-remote-submit] button[type=submit],\nform[data-remote-submit] button:not([type]),\nform input[type=submit][data-disable-with],\nform button[type=submit][data-disable-with]",
    t(document).on("click", e,
    function() {
        var e, n, r, i, o;
        i = t(this),
        n = i.closest("form"),
        r = n.find(".is-submit-button-value");
        var a = i.attr("name");
        a ? (e = i.is("input[type=submit]") ? "Submit": "", o = i.val() || e, r[0] ? (r.attr("name", a), r.attr("value", o)) : (r = document.createElement("input"), r.setAttribute("type", "hidden"), r.setAttribute("name", a), r.setAttribute("value", o), r.setAttribute("class", "is-submit-button-value"), n.prepend(r))) : r.remove()
    }),
    t(document).on("ajaxComplete", "form",
    function() {
        var e;
        return null != (e = this.querySelector(".is-submit-button-value")) ? e.remove() : void 0
    })
}.call(this),
define.amd = "zeroclipboard",
function(e, t) {
    "use strict";
    var n, r, i = e,
    o = i.document,
    a = i.navigator,
    s = i.setTimeout,
    u = i.encodeURIComponent,
    c = i.ActiveXObject,
    l = i.Error,
    f = i.Number.parseInt || i.parseInt,
    d = i.Number.parseFloat || i.parseFloat,
    p = i.Number.isNaN || i.isNaN,
    h = i.Math.round,
    m = i.Date.now,
    v = i.Object.keys,
    g = i.Object.defineProperty,
    y = i.Object.prototype.hasOwnProperty,
    b = i.Array.prototype.slice,
    w = function() {
        var e = function(e) {
            return e
        };
        if ("function" == typeof i.wrap && "function" == typeof i.unwrap) try {
            var t = o.createElement("div"),
            n = i.unwrap(t);
            1 === t.nodeType && n && 1 === n.nodeType && (e = i.unwrap)
        } catch(r) {}
        return e
    } (),
    x = function(e) {
        return b.call(e, 0)
    },
    E = function() {
        var e, n, r, i, o, a, s = x(arguments),
        u = s[0] || {};
        for (e = 1, n = s.length; n > e; e++) if (null != (r = s[e])) for (i in r) y.call(r, i) && (o = u[i], a = r[i], u !== a && a !== t && (u[i] = a));
        return u
    },
    T = function(e) {
        var t, n, r, i;
        if ("object" != typeof e || null == e) t = e;
        else if ("number" == typeof e.length) for (t = [], n = 0, r = e.length; r > n; n++) y.call(e, n) && (t[n] = T(e[n]));
        else {
            t = {};
            for (i in e) y.call(e, i) && (t[i] = T(e[i]))
        }
        return t
    },
    _ = function(e, t) {
        for (var n = {},
        r = 0,
        i = t.length; i > r; r++) t[r] in e && (n[t[r]] = e[t[r]]);
        return n
    },
    k = function(e, t) {
        var n = {};
        for (var r in e) - 1 === t.indexOf(r) && (n[r] = e[r]);
        return n
    },
    C = function(e) {
        if (e) for (var t in e) y.call(e, t) && delete e[t];
        return e
    },
    j = function(e, t) {
        if (e && 1 === e.nodeType && e.ownerDocument && t && (1 === t.nodeType && t.ownerDocument && t.ownerDocument === e.ownerDocument || 9 === t.nodeType && !t.ownerDocument && t === e.ownerDocument)) do {
            if (e === t) return ! 0;
            e = e.parentNode
        } while ( e );
        return ! 1
    },
    S = function(e) {
        var t;
        return "string" == typeof e && e && (t = e.split("#")[0].split("?")[0], t = e.slice(0, e.lastIndexOf("/") + 1)),
        t
    },
    L = function(e) {
        var t, n;
        return "string" == typeof e && e && (n = e.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), n && n[1] ? t = n[1] : (n = e.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), n && n[1] && (t = n[1]))),
        t
    },
    O = function() {
        var e, t;
        try {
            throw new l
        } catch(n) {
            t = n
        }
        return t && (e = t.sourceURL || t.fileName || L(t.stack)),
        e
    },
    N = function() {
        var e, n, r;
        if (o.currentScript && (e = o.currentScript.src)) return e;
        if (n = o.getElementsByTagName("script"), 1 === n.length) return n[0].src || t;
        if ("readyState" in n[0]) for (r = n.length; r--;) if ("interactive" === n[r].readyState && (e = n[r].src)) return e;
        return "loading" === o.readyState && (e = n[n.length - 1].src) ? e: (e = O()) ? e: t
    },
    D = function() {
        var e, n, r, i = o.getElementsByTagName("script");
        for (e = i.length; e--;) {
            if (! (r = i[e].src)) {
                n = null;
                break
            }
            if (r = S(r), null == n) n = r;
            else if (n !== r) {
                n = null;
                break
            }
        }
        return n || t
    },
    M = function() {
        var e = S(N()) || D() || "";
        return e + "ZeroClipboard.swf"
    },
    A = {
        bridge: null,
        version: "0.0.0",
        pluginType: "unknown",
        disabled: null,
        outdated: null,
        unavailable: null,
        deactivated: null,
        overdue: null,
        ready: null
    },
    P = "11.0.0",
    I = {},
    q = {},
    R = null,
    F = {
        ready: "Flash communication is established",
        error: {
            "flash-disabled": "Flash is disabled or not installed",
            "flash-outdated": "Flash is too outdated to support ZeroClipboard",
            "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript",
            "flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate",
            "flash-overdue": "Flash communication was established but NOT within the acceptable time limit"
        }
    },
    H = {
        swfPath: M(),
        trustedDomains: e.location.host ? [e.location.host] : [],
        cacheBust: !0,
        forceEnhancedClipboard: !1,
        flashLoadTimeout: 3e4,
        autoActivate: !0,
        bubbleEvents: !0,
        containerId: "global-zeroclipboard-html-bridge",
        containerClass: "global-zeroclipboard-container",
        swfObjectId: "global-zeroclipboard-flash-bridge",
        hoverClass: "zeroclipboard-is-hover",
        activeClass: "zeroclipboard-is-active",
        forceHandCursor: !1,
        title: null,
        zIndex: 999999999
    },
    z = function(e) {
        if ("object" == typeof e && null !== e) for (var t in e) if (y.call(e, t)) if (/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(t)) H[t] = e[t];
        else if (null == A.bridge) if ("containerId" === t || "swfObjectId" === t) {
            if (!ne(e[t])) throw new Error("The specified `" + t + "` value is not valid as an HTML4 Element ID");
            H[t] = e[t]
        } else H[t] = e[t]; {
            if ("string" != typeof e || !e) return T(H);
            if (y.call(H, e)) return H[e]
        }
    },
    U = function() {
        return {
            browser: _(a, ["userAgent", "platform", "appName"]),
            flash: k(A, ["bridge"]),
            zeroclipboard: {
                version: Ne.version,
                config: Ne.config()
            }
        }
    },
    B = function() {
        return !! (A.disabled || A.outdated || A.unavailable || A.deactivated)
    },
    W = function(e, t) {
        var n, r, i, o = {};
        if ("string" == typeof e && e) i = e.toLowerCase().split(/\s+/);
        else if ("object" == typeof e && e && "undefined" == typeof t) for (n in e) y.call(e, n) && "string" == typeof n && n && "function" == typeof e[n] && Ne.on(n, e[n]);
        if (i && i.length) {
            for (n = 0, r = i.length; r > n; n++) e = i[n].replace(/^on/, ""),
            o[e] = !0,
            I[e] || (I[e] = []),
            I[e].push(t);
            if (o.ready && A.ready && Ne.emit({
                type: "ready"
            }), o.error) {
                var a = ["disabled", "outdated", "unavailable", "deactivated", "overdue"];
                for (n = 0, r = a.length; r > n; n++) if (A[a[n]] === !0) {
                    Ne.emit({
                        type: "error",
                        name: "flash-" + a[n]
                    });
                    break
                }
            }
        }
        return Ne
    },
    $ = function(e, t) {
        var n, r, i, o, a;
        if (0 === arguments.length) o = v(I);
        else if ("string" == typeof e && e) o = e.split(/\s+/);
        else if ("object" == typeof e && e && "undefined" == typeof t) for (n in e) y.call(e, n) && "string" == typeof n && n && "function" == typeof e[n] && Ne.off(n, e[n]);
        if (o && o.length) for (n = 0, r = o.length; r > n; n++) if (e = o[n].toLowerCase().replace(/^on/, ""), a = I[e], a && a.length) if (t) for (i = a.indexOf(t); - 1 !== i;) a.splice(i, 1),
        i = a.indexOf(t, i);
        else a.length = 0;
        return Ne
    },
    X = function(e) {
        var t;
        return t = "string" == typeof e && e ? T(I[e]) || null: T(I)
    },
    V = function(e) {
        var t, n, r;
        return e = re(e),
        e && !ce(e) ? "ready" === e.type && A.overdue === !0 ? Ne.emit({
            type: "error",
            name: "flash-overdue"
        }) : (t = E({},
        e), ue.call(this, t), "copy" === e.type && (r = me(q), n = r.data, R = r.formatMap), n) : void 0
    },
    G = function() {
        if ("boolean" != typeof A.ready && (A.ready = !1), !Ne.isFlashUnusable() && null === A.bridge) {
            var e = H.flashLoadTimeout;
            "number" == typeof e && e >= 0 && s(function() {
                "boolean" != typeof A.deactivated && (A.deactivated = !0),
                A.deactivated === !0 && Ne.emit({
                    type: "error",
                    name: "flash-deactivated"
                })
            },
            e),
            A.overdue = !1,
            pe()
        }
    },
    J = function() {
        Ne.clearData(),
        Ne.blur(),
        Ne.emit("destroy"),
        he(),
        Ne.off()
    },
    Y = function(e, t) {
        var n;
        if ("object" == typeof e && e && "undefined" == typeof t) n = e,
        Ne.clearData();
        else {
            if ("string" != typeof e || !e) return;
            n = {},
            n[e] = t
        }
        for (var r in n)"string" == typeof r && r && y.call(n, r) && "string" == typeof n[r] && n[r] && (q[r] = n[r])
    },
    K = function(e) {
        "undefined" == typeof e ? (C(q), R = null) : "string" == typeof e && y.call(q, e) && delete q[e]
    },
    Z = function(e) {
        return "undefined" == typeof e ? T(q) : "string" == typeof e && y.call(q, e) ? q[e] : void 0
    },
    Q = function(e) {
        if (e && 1 === e.nodeType) {
            n && (Te(n, H.activeClass), n !== e && Te(n, H.hoverClass)),
            n = e,
            Ee(e, H.hoverClass);
            var t = e.getAttribute("title") || H.title;
            if ("string" == typeof t && t) {
                var r = de(A.bridge);
                r && r.setAttribute("title", t)
            }
            var i = H.forceHandCursor === !0 || "pointer" === _e(e, "cursor");
            Se(i),
            je()
        }
    },
    ee = function() {
        var e = de(A.bridge);
        e && (e.removeAttribute("title"), e.style.left = "0px", e.style.top = "-9999px", e.style.width = "1px", e.style.top = "1px"),
        n && (Te(n, H.hoverClass), Te(n, H.activeClass), n = null)
    },
    te = function() {
        return n || null
    },
    ne = function(e) {
        return "string" == typeof e && e && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(e)
    },
    re = function(e) {
        var t;
        if ("string" == typeof e && e ? (t = e, e = {}) : "object" == typeof e && e && "string" == typeof e.type && e.type && (t = e.type), t) { ! e.target && /^(copy|aftercopy|_click)$/.test(t.toLowerCase()) && (e.target = r),
            E(e, {
                type: t.toLowerCase(),
                target: e.target || n || null,
                relatedTarget: e.relatedTarget || null,
                currentTarget: A && A.bridge || null,
                timeStamp: e.timeStamp || m() || null
            });
            var i = F[e.type];
            return "error" === e.type && e.name && i && (i = i[e.name]),
            i && (e.message = i),
            "ready" === e.type && E(e, {
                target: null,
                version: A.version
            }),
            "error" === e.type && (/^flash-(disabled|outdated|unavailable|deactivated|overdue)$/.test(e.name) && E(e, {
                target: null,
                minimumVersion: P
            }), /^flash-(outdated|unavailable|deactivated|overdue)$/.test(e.name) && E(e, {
                version: A.version
            })),
            "copy" === e.type && (e.clipboardData = {
                setData: Ne.setData,
                clearData: Ne.clearData
            }),
            "aftercopy" === e.type && (e = ve(e, R)),
            e.target && !e.relatedTarget && (e.relatedTarget = ie(e.target)),
            e = oe(e)
        }
    },
    ie = function(e) {
        var t = e && e.getAttribute && e.getAttribute("data-clipboard-target");
        return t ? o.getElementById(t) : null
    },
    oe = function(e) {
        if (e && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(e.type)) {
            var n = e.target,
            r = "_mouseover" === e.type && e.relatedTarget ? e.relatedTarget: t,
            a = "_mouseout" === e.type && e.relatedTarget ? e.relatedTarget: t,
            s = Ce(n),
            u = i.screenLeft || i.screenX || 0,
            c = i.screenTop || i.screenY || 0,
            l = o.body.scrollLeft + o.documentElement.scrollLeft,
            f = o.body.scrollTop + o.documentElement.scrollTop,
            d = s.left + ("number" == typeof e._stageX ? e._stageX: 0),
            p = s.top + ("number" == typeof e._stageY ? e._stageY: 0),
            h = d - l,
            m = p - f,
            v = u + h,
            g = c + m,
            y = "number" == typeof e.movementX ? e.movementX: 0,
            b = "number" == typeof e.movementY ? e.movementY: 0;
            delete e._stageX,
            delete e._stageY,
            E(e, {
                srcElement: n,
                fromElement: r,
                toElement: a,
                screenX: v,
                screenY: g,
                pageX: d,
                pageY: p,
                clientX: h,
                clientY: m,
                x: h,
                y: m,
                movementX: y,
                movementY: b,
                offsetX: 0,
                offsetY: 0,
                layerX: 0,
                layerY: 0
            })
        }
        return e
    },
    ae = function(e) {
        var t = e && "string" == typeof e.type && e.type || "";
        return ! /^(?:(?:before)?copy|destroy)$/.test(t)
    },
    se = function(e, t, n, r) {
        r ? s(function() {
            e.apply(t, n)
        },
        0) : e.apply(t, n)
    },
    ue = function(e) {
        if ("object" == typeof e && e && e.type) {
            var t = ae(e),
            n = I["*"] || [],
            r = I[e.type] || [],
            o = n.concat(r);
            if (o && o.length) {
                var a, s, u, c, l, f = this;
                for (a = 0, s = o.length; s > a; a++) u = o[a],
                c = f,
                "string" == typeof u && "function" == typeof i[u] && (u = i[u]),
                "object" == typeof u && u && "function" == typeof u.handleEvent && (c = u, u = u.handleEvent),
                "function" == typeof u && (l = E({},
                e), se(u, c, [l], t))
            }
            return this
        }
    },
    ce = function(e) {
        var t = e.target || n || null,
        i = "swf" === e._source;
        delete e._source;
        var o = ["flash-disabled", "flash-outdated", "flash-unavailable", "flash-deactivated", "flash-overdue"];
        switch (e.type) {
        case "error":
            -1 !== o.indexOf(e.name) && E(A, {
                disabled: "flash-disabled" === e.name,
                outdated: "flash-outdated" === e.name,
                unavailable: "flash-unavailable" === e.name,
                deactivated: "flash-deactivated" === e.name,
                overdue: "flash-overdue" === e.name,
                ready: !1
            });
            break;
        case "ready":
            var a = A.deactivated === !0;
            E(A, {
                disabled: !1,
                outdated: !1,
                unavailable: !1,
                deactivated: !1,
                overdue: a,
                ready: !a
            });
            break;
        case "beforecopy":
            r = t;
            break;
        case "copy":
            var s, u, c = e.relatedTarget; ! q["text/html"] && !q["text/plain"] && c && (u = c.value || c.outerHTML || c.innerHTML) && (s = c.value || c.textContent || c.innerText) ? (e.clipboardData.clearData(), e.clipboardData.setData("text/plain", s), u !== s && e.clipboardData.setData("text/html", u)) : !q["text/plain"] && e.target && (s = e.target.getAttribute("data-clipboard-text")) && (e.clipboardData.clearData(), e.clipboardData.setData("text/plain", s));
            break;
        case "aftercopy":
            Ne.clearData(),
            t && t !== xe() && t.focus && t.focus();
            break;
        case "_mouseover":
            Ne.focus(t),
            H.bubbleEvents === !0 && i && (t && t !== e.relatedTarget && !j(e.relatedTarget, t) && le(E({},
            e, {
                type: "mouseenter",
                bubbles: !1,
                cancelable: !1
            })), le(E({},
            e, {
                type: "mouseover"
            })));
            break;
        case "_mouseout":
            Ne.blur(),
            H.bubbleEvents === !0 && i && (t && t !== e.relatedTarget && !j(e.relatedTarget, t) && le(E({},
            e, {
                type: "mouseleave",
                bubbles: !1,
                cancelable: !1
            })), le(E({},
            e, {
                type: "mouseout"
            })));
            break;
        case "_mousedown":
            Ee(t, H.activeClass),
            H.bubbleEvents === !0 && i && le(E({},
            e, {
                type: e.type.slice(1)
            }));
            break;
        case "_mouseup":
            Te(t, H.activeClass),
            H.bubbleEvents === !0 && i && le(E({},
            e, {
                type: e.type.slice(1)
            }));
            break;
        case "_click":
            r = null,
            H.bubbleEvents === !0 && i && le(E({},
            e, {
                type: e.type.slice(1)
            }));
            break;
        case "_mousemove":
            H.bubbleEvents === !0 && i && le(E({},
            e, {
                type: e.type.slice(1)
            }))
        }
        return /^_(?:click|mouse(?:over|out|down|up|move))$/.test(e.type) ? !0 : void 0
    },
    le = function(e) {
        if (e && "string" == typeof e.type && e) {
            var t, n = e.target || null,
            r = n && n.ownerDocument || o,
            a = {
                view: r.defaultView || i,
                canBubble: !0,
                cancelable: !0,
                detail: "click" === e.type ? 1 : 0,
                button: "number" == typeof e.which ? e.which - 1 : "number" == typeof e.button ? e.button: r.createEvent ? 0 : 1
            },
            s = E(a, e);
            n && r.createEvent && n.dispatchEvent && (s = [s.type, s.canBubble, s.cancelable, s.view, s.detail, s.screenX, s.screenY, s.clientX, s.clientY, s.ctrlKey, s.altKey, s.shiftKey, s.metaKey, s.button, s.relatedTarget], t = r.createEvent("MouseEvents"), t.initMouseEvent && (t.initMouseEvent.apply(t, s), t._source = "js", n.dispatchEvent(t)))
        }
    },
    fe = function() {
        var e = o.createElement("div");
        return e.id = H.containerId,
        e.className = H.containerClass,
        e.style.position = "absolute",
        e.style.left = "0px",
        e.style.top = "-9999px",
        e.style.width = "1px",
        e.style.height = "1px",
        e.style.zIndex = "" + Le(H.zIndex),
        e
    },
    de = function(e) {
        for (var t = e && e.parentNode; t && "OBJECT" === t.nodeName && t.parentNode;) t = t.parentNode;
        return t || null
    },
    pe = function() {
        var e, t = A.bridge,
        n = de(t);
        if (!t) {
            var r = we(i.location.host, H),
            a = "never" === r ? "none": "all",
            s = ye(H),
            u = H.swfPath + ge(H.swfPath, H);
            n = fe();
            var c = o.createElement("div");
            n.appendChild(c),
            o.body.appendChild(n);
            var l = o.createElement("div"),
            f = "activex" === A.pluginType;
            l.innerHTML = '<object id="' + H.swfObjectId + '" name="' + H.swfObjectId + '" width="100%" height="100%" ' + (f ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"': 'type="application/x-shockwave-flash" data="' + u + '"') + ">" + (f ? '<param name="movie" value="' + u + '"/>': "") + '<param name="allowScriptAccess" value="' + r + '"/><param name="allowNetworking" value="' + a + '"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="' + s + '"/></object>',
            t = l.firstChild,
            l = null,
            w(t).ZeroClipboard = Ne,
            n.replaceChild(t, c)
        }
        return t || (t = o[H.swfObjectId], t && (e = t.length) && (t = t[e - 1]), !t && n && (t = n.firstChild)),
        A.bridge = t || null,
        t
    },
    he = function() {
        var e = A.bridge;
        if (e) {
            var t = de(e);
            t && ("activex" === A.pluginType && "readyState" in e ? (e.style.display = "none",
            function n() {
                if (4 === e.readyState) {
                    for (var r in e)"function" == typeof e[r] && (e[r] = null);
                    e.parentNode && e.parentNode.removeChild(e),
                    t.parentNode && t.parentNode.removeChild(t)
                } else s(n, 10)
            } ()) : (e.parentNode && e.parentNode.removeChild(e), t.parentNode && t.parentNode.removeChild(t))),
            A.ready = null,
            A.bridge = null,
            A.deactivated = null
        }
    },
    me = function(e) {
        var t = {},
        n = {};
        if ("object" == typeof e && e) {
            for (var r in e) if (r && y.call(e, r) && "string" == typeof e[r] && e[r]) switch (r.toLowerCase()) {
            case "text/plain":
            case "text":
            case "air:text":
            case "flash:text":
                t.text = e[r],
                n.text = r;
                break;
            case "text/html":
            case "html":
            case "air:html":
            case "flash:html":
                t.html = e[r],
                n.html = r;
                break;
            case "application/rtf":
            case "text/rtf":
            case "rtf":
            case "richtext":
            case "air:rtf":
            case "flash:rtf":
                t.rtf = e[r],
                n.rtf = r
            }
            return {
                data: t,
                formatMap: n
            }
        }
    },
    ve = function(e, t) {
        if ("object" != typeof e || !e || "object" != typeof t || !t) return e;
        var n = {};
        for (var r in e) if (y.call(e, r)) {
            if ("success" !== r && "data" !== r) {
                n[r] = e[r];
                continue
            }
            n[r] = {};
            var i = e[r];
            for (var o in i) o && y.call(i, o) && y.call(t, o) && (n[r][t[o]] = i[o])
        }
        return n
    },
    ge = function(e, t) {
        var n = null == t || t && t.cacheBust === !0;
        return n ? ( - 1 === e.indexOf("?") ? "?": "&") + "noCache=" + m() : ""
    },
    ye = function(e) {
        var t, n, r, o, a = "",
        s = [];
        if (e.trustedDomains && ("string" == typeof e.trustedDomains ? o = [e.trustedDomains] : "object" == typeof e.trustedDomains && "length" in e.trustedDomains && (o = e.trustedDomains)), o && o.length) for (t = 0, n = o.length; n > t; t++) if (y.call(o, t) && o[t] && "string" == typeof o[t]) {
            if (r = be(o[t]), !r) continue;
            if ("*" === r) {
                s.length = 0,
                s.push(r);
                break
            }
            s.push.apply(s, [r, "//" + r, i.location.protocol + "//" + r])
        }
        return s.length && (a += "trustedOrigins=" + u(s.join(","))),
        e.forceEnhancedClipboard === !0 && (a += (a ? "&": "") + "forceEnhancedClipboard=true"),
        "string" == typeof e.swfObjectId && e.swfObjectId && (a += (a ? "&": "") + "swfObjectId=" + u(e.swfObjectId)),
        a
    },
    be = function(e) {
        if (null == e || "" === e) return null;
        if (e = e.replace(/^\s+|\s+$/g, ""), "" === e) return null;
        var t = e.indexOf("//");
        e = -1 === t ? e: e.slice(t + 2);
        var n = e.indexOf("/");
        return e = -1 === n ? e: -1 === t || 0 === n ? null: e.slice(0, n),
        e && ".swf" === e.slice( - 4).toLowerCase() ? null: e || null
    },
    we = function() {
        var e = function(e) {
            var t, n, r, i = [];
            if ("string" == typeof e && (e = [e]), "object" != typeof e || !e || "number" != typeof e.length) return i;
            for (t = 0, n = e.length; n > t; t++) if (y.call(e, t) && (r = be(e[t]))) {
                if ("*" === r) {
                    i.length = 0,
                    i.push("*");
                    break
                } - 1 === i.indexOf(r) && i.push(r)
            }
            return i
        };
        return function(t, n) {
            var r = be(n.swfPath);
            null === r && (r = t);
            var i = e(n.trustedDomains),
            o = i.length;
            if (o > 0) {
                if (1 === o && "*" === i[0]) return "always";
                if ( - 1 !== i.indexOf(t)) return 1 === o && t === r ? "sameDomain": "always"
            }
            return "never"
        }
    } (),
    xe = function() {
        try {
            return o.activeElement
        } catch(e) {
            return null
        }
    },
    Ee = function(e, t) {
        if (!e || 1 !== e.nodeType) return e;
        if (e.classList) return e.classList.contains(t) || e.classList.add(t),
        e;
        if (t && "string" == typeof t) {
            var n = (t || "").split(/\s+/);
            if (1 === e.nodeType) if (e.className) {
                for (var r = " " + e.className + " ",
                i = e.className,
                o = 0,
                a = n.length; a > o; o++) r.indexOf(" " + n[o] + " ") < 0 && (i += " " + n[o]);
                e.className = i.replace(/^\s+|\s+$/g, "")
            } else e.className = t
        }
        return e
    },
    Te = function(e, t) {
        if (!e || 1 !== e.nodeType) return e;
        if (e.classList) return e.classList.contains(t) && e.classList.remove(t),
        e;
        if ("string" == typeof t && t) {
            var n = t.split(/\s+/);
            if (1 === e.nodeType && e.className) {
                for (var r = (" " + e.className + " ").replace(/[\n\t]/g, " "), i = 0, o = n.length; o > i; i++) r = r.replace(" " + n[i] + " ", " ");
                e.className = r.replace(/^\s+|\s+$/g, "")
            }
        }
        return e
    },
    _e = function(e, t) {
        var n = i.getComputedStyle(e, null).getPropertyValue(t);
        return "cursor" !== t || n && "auto" !== n || "A" !== e.nodeName ? n: "pointer"
    },
    ke = function() {
        var e, t, n, r = 1;
        return "function" == typeof o.body.getBoundingClientRect && (e = o.body.getBoundingClientRect(), t = e.right - e.left, n = o.body.offsetWidth, r = h(t / n * 100) / 100),
        r
    },
    Ce = function(e) {
        var t = {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        };
        if (e.getBoundingClientRect) {
            var n, r, a, s = e.getBoundingClientRect();
            "pageXOffset" in i && "pageYOffset" in i ? (n = i.pageXOffset, r = i.pageYOffset) : (a = ke(), n = h(o.documentElement.scrollLeft / a), r = h(o.documentElement.scrollTop / a));
            var u = o.documentElement.clientLeft || 0,
            c = o.documentElement.clientTop || 0;
            t.left = s.left + n - u,
            t.top = s.top + r - c,
            t.width = "width" in s ? s.width: s.right - s.left,
            t.height = "height" in s ? s.height: s.bottom - s.top
        }
        return t
    },
    je = function() {
        var e;
        if (n && (e = de(A.bridge))) {
            var t = Ce(n);
            E(e.style, {
                width: t.width + "px",
                height: t.height + "px",
                top: t.top + "px",
                left: t.left + "px",
                zIndex: "" + Le(H.zIndex)
            })
        }
    },
    Se = function(e) {
        A.ready === !0 && (A.bridge && "function" == typeof A.bridge.setHandCursor ? A.bridge.setHandCursor(e) : A.ready = !1)
    },
    Le = function(e) {
        if (/^(?:auto|inherit)$/.test(e)) return e;
        var t;
        return "number" != typeof e || p(e) ? "string" == typeof e && (t = Le(f(e, 10))) : t = e,
        "number" == typeof t ? t: "auto"
    },
    Oe = function(e) {
        function t(e) {
            var t = e.match(/[\d]+/g);
            return t.length = 3,
            t.join(".")
        }
        function n(e) {
            return !! e && (e = e.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(e) || "chrome.plugin" === e.slice( - 13))
        }
        function r(e) {
            e && (u = !0, e.version && (f = t(e.version)), !f && e.description && (f = t(e.description)), e.filename && (l = n(e.filename)))
        }
        var i, o, s, u = !1,
        c = !1,
        l = !1,
        f = "";
        if (a.plugins && a.plugins.length) i = a.plugins["Shockwave Flash"],
        r(i),
        a.plugins["Shockwave Flash 2.0"] && (u = !0, f = "2.0.0.11");
        else if (a.mimeTypes && a.mimeTypes.length) s = a.mimeTypes["application/x-shockwave-flash"],
        i = s && s.enabledPlugin,
        r(i);
        else if ("undefined" != typeof e) {
            c = !0;
            try {
                o = new e("ShockwaveFlash.ShockwaveFlash.7"),
                u = !0,
                f = t(o.GetVariable("$version"))
            } catch(p) {
                try {
                    o = new e("ShockwaveFlash.ShockwaveFlash.6"),
                    u = !0,
                    f = "6.0.21"
                } catch(h) {
                    try {
                        o = new e("ShockwaveFlash.ShockwaveFlash"),
                        u = !0,
                        f = t(o.GetVariable("$version"))
                    } catch(m) {
                        c = !1
                    }
                }
            }
        }
        A.disabled = u !== !0,
        A.outdated = f && d(f) < d(P),
        A.version = f || "0.0.0",
        A.pluginType = l ? "pepper": c ? "activex": u ? "netscape": "unknown"
    };
    Oe(c);
    var Ne = function() {
        return this instanceof Ne ? void("function" == typeof Ne._createClient && Ne._createClient.apply(this, x(arguments))) : new Ne
    };
    g(Ne, "version", {
        value: "2.1.6",
        writable: !1,
        configurable: !0,
        enumerable: !0
    }),
    Ne.config = function() {
        return z.apply(this, x(arguments))
    },
    Ne.state = function() {
        return U.apply(this, x(arguments))
    },
    Ne.isFlashUnusable = function() {
        return B.apply(this, x(arguments))
    },
    Ne.on = function() {
        return W.apply(this, x(arguments))
    },
    Ne.off = function() {
        return $.apply(this, x(arguments))
    },
    Ne.handlers = function() {
        return X.apply(this, x(arguments))
    },
    Ne.emit = function() {
        return V.apply(this, x(arguments))
    },
    Ne.create = function() {
        return G.apply(this, x(arguments))
    },
    Ne.destroy = function() {
        return J.apply(this, x(arguments))
    },
    Ne.setData = function() {
        return Y.apply(this, x(arguments))
    },
    Ne.clearData = function() {
        return K.apply(this, x(arguments))
    },
    Ne.getData = function() {
        return Z.apply(this, x(arguments))
    },
    Ne.focus = Ne.activate = function() {
        return Q.apply(this, x(arguments))
    },
    Ne.blur = Ne.deactivate = function() {
        return ee.apply(this, x(arguments))
    },
    Ne.activeElement = function() {
        return te.apply(this, x(arguments))
    };
    var De = 0,
    Me = {},
    Ae = 0,
    Pe = {},
    Ie = {};
    E(H, {
        autoActivate: !0
    });
    var qe = function(e) {
        var t = this;
        t.id = "" + De++,
        Me[t.id] = {
            instance: t,
            elements: [],
            handlers: {}
        },
        e && t.clip(e),
        Ne.on("*",
        function(e) {
            return t.emit(e)
        }),
        Ne.on("destroy",
        function() {
            t.destroy()
        }),
        Ne.create()
    },
    Re = function(e, t) {
        var n, r, i, o = {},
        a = Me[this.id] && Me[this.id].handlers;
        if ("string" == typeof e && e) i = e.toLowerCase().split(/\s+/);
        else if ("object" == typeof e && e && "undefined" == typeof t) for (n in e) y.call(e, n) && "string" == typeof n && n && "function" == typeof e[n] && this.on(n, e[n]);
        if (i && i.length) {
            for (n = 0, r = i.length; r > n; n++) e = i[n].replace(/^on/, ""),
            o[e] = !0,
            a[e] || (a[e] = []),
            a[e].push(t);
            if (o.ready && A.ready && this.emit({
                type: "ready",
                client: this
            }), o.error) {
                var s = ["disabled", "outdated", "unavailable", "deactivated", "overdue"];
                for (n = 0, r = s.length; r > n; n++) if (A[s[n]]) {
                    this.emit({
                        type: "error",
                        name: "flash-" + s[n],
                        client: this
                    });
                    break
                }
            }
        }
        return this
    },
    Fe = function(e, t) {
        var n, r, i, o, a, s = Me[this.id] && Me[this.id].handlers;
        if (0 === arguments.length) o = v(s);
        else if ("string" == typeof e && e) o = e.split(/\s+/);
        else if ("object" == typeof e && e && "undefined" == typeof t) for (n in e) y.call(e, n) && "string" == typeof n && n && "function" == typeof e[n] && this.off(n, e[n]);
        if (o && o.length) for (n = 0, r = o.length; r > n; n++) if (e = o[n].toLowerCase().replace(/^on/, ""), a = s[e], a && a.length) if (t) for (i = a.indexOf(t); - 1 !== i;) a.splice(i, 1),
        i = a.indexOf(t, i);
        else a.length = 0;
        return this
    },
    He = function(e) {
        var t = null,
        n = Me[this.id] && Me[this.id].handlers;
        return n && (t = "string" == typeof e && e ? n[e] ? n[e].slice(0) : [] : T(n)),
        t
    },
    ze = function(e) {
        if (Xe.call(this, e)) {
            "object" == typeof e && e && "string" == typeof e.type && e.type && (e = E({},
            e));
            var t = E({},
            re(e), {
                client: this
            });
            Ve.call(this, t)
        }
        return this
    },
    Ue = function(e) {
        e = Ge(e);
        for (var t = 0; t < e.length; t++) if (y.call(e, t) && e[t] && 1 === e[t].nodeType) {
            e[t].zcClippingId ? -1 === Pe[e[t].zcClippingId].indexOf(this.id) && Pe[e[t].zcClippingId].push(this.id) : (e[t].zcClippingId = "zcClippingId_" + Ae++, Pe[e[t].zcClippingId] = [this.id], H.autoActivate === !0 && Je(e[t]));
            var n = Me[this.id] && Me[this.id].elements; - 1 === n.indexOf(e[t]) && n.push(e[t])
        }
        return this
    },
    Be = function(e) {
        var t = Me[this.id];
        if (!t) return this;
        var n, r = t.elements;
        e = "undefined" == typeof e ? r.slice(0) : Ge(e);
        for (var i = e.length; i--;) if (y.call(e, i) && e[i] && 1 === e[i].nodeType) {
            for (n = 0; - 1 !== (n = r.indexOf(e[i], n));) r.splice(n, 1);
            var o = Pe[e[i].zcClippingId];
            if (o) {
                for (n = 0; - 1 !== (n = o.indexOf(this.id, n));) o.splice(n, 1);
                0 === o.length && (H.autoActivate === !0 && Ye(e[i]), delete e[i].zcClippingId)
            }
        }
        return this
    },
    We = function() {
        var e = Me[this.id];
        return e && e.elements ? e.elements.slice(0) : []
    },
    $e = function() {
        this.unclip(),
        this.off(),
        delete Me[this.id]
    },
    Xe = function(e) {
        if (!e || !e.type) return ! 1;
        if (e.client && e.client !== this) return ! 1;
        var t = Me[this.id] && Me[this.id].elements,
        n = !!t && t.length > 0,
        r = !e.target || n && -1 !== t.indexOf(e.target),
        i = e.relatedTarget && n && -1 !== t.indexOf(e.relatedTarget),
        o = e.client && e.client === this;
        return r || i || o ? !0 : !1
    },
    Ve = function(e) {
        if ("object" == typeof e && e && e.type) {
            var t = ae(e),
            n = Me[this.id] && Me[this.id].handlers["*"] || [],
            r = Me[this.id] && Me[this.id].handlers[e.type] || [],
            o = n.concat(r);
            if (o && o.length) {
                var a, s, u, c, l, f = this;
                for (a = 0, s = o.length; s > a; a++) u = o[a],
                c = f,
                "string" == typeof u && "function" == typeof i[u] && (u = i[u]),
                "object" == typeof u && u && "function" == typeof u.handleEvent && (c = u, u = u.handleEvent),
                "function" == typeof u && (l = E({},
                e), se(u, c, [l], t))
            }
            return this
        }
    },
    Ge = function(e) {
        return "string" == typeof e && (e = []),
        "number" != typeof e.length ? [e] : e
    },
    Je = function(e) {
        if (e && 1 === e.nodeType) {
            var t = function(e) { (e || (e = i.event)) && ("js" !== e._source && (e.stopImmediatePropagation(), e.preventDefault()), delete e._source)
            },
            n = function(n) { (n || (n = i.event)) && (t(n), Ne.focus(e))
            };
            e.addEventListener("mouseover", n, !1),
            e.addEventListener("mouseout", t, !1),
            e.addEventListener("mouseenter", t, !1),
            e.addEventListener("mouseleave", t, !1),
            e.addEventListener("mousemove", t, !1),
            Ie[e.zcClippingId] = {
                mouseover: n,
                mouseout: t,
                mouseenter: t,
                mouseleave: t,
                mousemove: t
            }
        }
    },
    Ye = function(e) {
        if (e && 1 === e.nodeType) {
            var t = Ie[e.zcClippingId];
            if ("object" == typeof t && t) {
                for (var n, r, i = ["move", "leave", "enter", "out", "over"], o = 0, a = i.length; a > o; o++) n = "mouse" + i[o],
                r = t[n],
                "function" == typeof r && e.removeEventListener(n, r, !1);
                delete Ie[e.zcClippingId]
            }
        }
    };
    Ne._createClient = function() {
        qe.apply(this, x(arguments))
    },
    Ne.prototype.on = function() {
        return Re.apply(this, x(arguments))
    },
    Ne.prototype.off = function() {
        return Fe.apply(this, x(arguments))
    },
    Ne.prototype.handlers = function() {
        return He.apply(this, x(arguments))
    },
    Ne.prototype.emit = function() {
        return ze.apply(this, x(arguments))
    },
    Ne.prototype.clip = function() {
        return Ue.apply(this, x(arguments))
    },
    Ne.prototype.unclip = function() {
        return Be.apply(this, x(arguments))
    },
    Ne.prototype.elements = function() {
        return We.apply(this, x(arguments))
    },
    Ne.prototype.destroy = function() {
        return $e.apply(this, x(arguments))
    },
    Ne.prototype.setText = function(e) {
        return Ne.setData("text/plain", e),
        this
    },
    Ne.prototype.setHtml = function(e) {
        return Ne.setData("text/html", e),
        this
    },
    Ne.prototype.setRichText = function(e) {
        return Ne.setData("application/rtf", e),
        this
    },
    Ne.prototype.setData = function() {
        return Ne.setData.apply(this, x(arguments)),
        this
    },
    Ne.prototype.clearData = function() {
        return Ne.clearData.apply(this, x(arguments)),
        this
    },
    Ne.prototype.getData = function() {
        return Ne.getData.apply(this, x(arguments))
    },
    "function" == typeof define && define.amd ? define(function() {
        return Ne
    }) : "object" == typeof module && module && "object" == typeof module.exports && module.exports ? module.exports = Ne: e.ZeroClipboard = Ne
} (function() {
    return this || window
} ()),
delete define.amd,
function() {
    "use strict";
    function e(e, t) {
        setTimeout(function() {
            var n = t.ownerDocument.createEvent("Event");
            n.initEvent(e, !0, !0),
            t.dispatchEvent(n)
        },
        0)
    }
    function t(e, t) {
        return t.then(function(t) {
            e.insertAdjacentHTML("afterend", t),
            e.parentNode.removeChild(e)
        },
        function() {
            e.classList.add("is-error")
        })
    }
    function n(e) {
        var t = e.src,
        n = r.get(e);
        return n && n.src === t ? n.data: (n = e.load(t), r.set(e, {
            src: t,
            data: n
        }), n)
    }
    var r = new WeakMap,
    i = Object.create(window.HTMLElement.prototype);
    Object.defineProperty(i, "src", {
        get: function() {
            var e = this.getAttribute("src");
            if (e) {
                var t = this.ownerDocument.createElement("a");
                return t.href = e,
                t.href
            }
            return ""
        },
        set: function(e) {
            this.setAttribute("src", e)
        }
    }),
    Object.defineProperty(i, "data", {
        get: function() {
            return n(this)
        }
    }),
    i.attributeChangedCallback = function(e) {
        if ("src" === e) {
            var r = n(this);
            this._attached && t(this, r)
        }
    },
    i.createdCallback = function() {
        n(this)["catch"](function() {})
    },
    i.attachedCallback = function() {
        this._attached = !0,
        this.src && t(this, n(this))
    },
    i.detachedCallback = function() {
        this._attached = !1
    },
    i.load = function(t) {
        var n = this;
        return t ? (e("loadstart", n), n.fetch(t).then(function(t) {
            return e("load", n),
            e("loadend", n),
            t
        },
        function(t) {
            throw e("error", n),
            e("loadend", n),
            t
        })) : Promise.reject(new Error("missing src"))
    },
    i.fetch = function(e) {
        return new Promise(function(t, n) {
            var r = new XMLHttpRequest;
            r.onload = function() {
                if (200 === r.status) {
                    var e = r.getResponseHeader("Content-Type");
                    e && e.match(/^text\/html/) ? t(r.responseText) : n(new Error("Failed to load resource: expected text/html but was " + e))
                } else n(new Error("Failed to load resource: the server responded with a status of " + r.status))
            },
            r.onerror = n,
            r.open("GET", e),
            r.setRequestHeader("Accept", "text/html"),
            r.send()
        })
    },
    window.IncludeFragmentElement = document.registerElement("include-fragment", {
        prototype: i
    })
} (),
function() {
    var e;
    e = "a[data-confirm], input[type=submit][data-confirm], button[data-confirm]",
    document.addEventListener("click",
    function(t) {
        var n, r, i; (r = "function" == typeof(n = t.target).closest ? n.closest(e) : void 0) && (i = r.getAttribute("data-confirm")) && (confirm(i) || (t.stopImmediatePropagation(), t.preventDefault()))
    },
    !0)
}.call(this),
function() {
    var e, t, n;
    e = null != (n = IncludeFragmentElement.prototype) ? n: Object.getPrototypeOf(new IncludeFragmentElement),
    t = Object.create(e),
    t.fetch = function(e) {
        return new Promise(function(t, n) {
            var r;
            return (r = function(i) {
                var o;
                return o = new XMLHttpRequest,
                o.onload = function() {
                    switch (o.status) {
                    case 200:
                        return t(o.responseText);
                    case 202:
                        return window.setTimeout(function() {
                            return r(1.5 * i)
                        },
                        i);
                    default:
                        return n()
                    }
                },
                o.onerror = n,
                o.open("GET", e),
                o.send()
            })(1e3)
        })
    },
    window.PollIncludeFragmentElement = document.registerElement("poll-include-fragment", {
        prototype: t
    })
}.call(this),
function() {
    var e = require("delegated-events"),
    t = e.on,
    n = function() {
        var e = document.createElement("div");
        return e.style.cssText = "-ms-user-select: element; user-select: contain;",
        "element" === e.msUserSelect || "contain" === e.userSelect
    } ();
    n || null == window.getSelection || t("click", ".user-select-contain",
    function() {
        var e = window.getSelection();
        if (e.rangeCount) {
            var t = e.getRangeAt(0).commonAncestorContainer;
            this.contains(t) || e.selectAllChildren(this)
        }
    })
} (),
function() {
    "use strict";
    function e(e) {
        return ("0" + e).slice( - 2)
    }
    function t(n, r) {
        var i = n.getDay(),
        o = n.getDate(),
        a = n.getMonth(),
        s = n.getFullYear(),
        u = n.getHours(),
        f = n.getMinutes(),
        d = n.getSeconds();
        return r.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g,
        function(r) {
            var p, h = r[1];
            switch (h) {
            case "%":
                return "%";
            case "a":
                return c[i].slice(0, 3);
            case "A":
                return c[i];
            case "b":
                return l[a].slice(0, 3);
            case "B":
                return l[a];
            case "c":
                return n.toString();
            case "d":
                return e(o);
            case "e":
                return o;
            case "H":
                return e(u);
            case "I":
                return e(t(n, "%l"));
            case "l":
                return 0 === u || 12 === u ? 12 : (u + 12) % 12;
            case "m":
                return e(a + 1);
            case "M":
                return e(f);
            case "p":
                return u > 11 ? "PM": "AM";
            case "P":
                return u > 11 ? "pm": "am";
            case "S":
                return e(d);
            case "w":
                return i;
            case "y":
                return e(s % 100);
            case "Y":
                return s;
            case "Z":
                return p = n.toString().match(/\((\w+)\)$/),
                p ? p[1] : "";
            case "z":
                return p = n.toString().match(/\w([+-]\d\d\d\d) /),
                p ? p[1] : ""
            }
        })
    }
    function n(e) {
        this.date = e
    }
    function r() {
        if (null !== f) return f;
        if (! ("Intl" in window)) return ! 1;
        var e = {
            day: "numeric",
            month: "short"
        },
        t = new window.Intl.DateTimeFormat(void 0, e),
        n = t.format(new Date(0));
        return f = !!n.match(/^\d/)
    }
    function i() {
        if (null !== d) return d;
        if (! ("Intl" in window)) return ! 0;
        var e = {
            day: "numeric",
            month: "short",
            year: "numeric"
        },
        t = new window.Intl.DateTimeFormat(void 0, e),
        n = t.format(new Date(0));
        return d = !!n.match(/\d,/)
    }
    function o(e) {
        var t = new Date;
        return t.getUTCFullYear() === e.getUTCFullYear()
    }
    function a() {
        var e, t, n;
        for (t = 0, n = h.length; n > t; t++) e = h[t],
        e.textContent = e.getFormattedDate()
    }
    function s(e) {
        var n = {
            weekday: {
                "short": "%a",
                "long": "%A"
            },
            day: {
                numeric: "%e",
                "2-digit": "%d"
            },
            month: {
                "short": "%b",
                "long": "%B"
            },
            year: {
                numeric: "%Y",
                "2-digit": "%y"
            }
        },
        i = r() ? "weekday day month year": "weekday month day, year";
        for (var o in n) {
            var a = n[o][e.getAttribute(o)];
            i = i.replace(o, a || "")
        }
        return i = i.replace(/(\s,)|(,\s$)/, ""),
        t(e._date, i).replace(/\s+/, " ").trim()
    }
    function u(e) {
        var n = {
            hour: e.getAttribute("hour"),
            minute: e.getAttribute("minute"),
            second: e.getAttribute("second")
        };
        for (var r in n) n[r] || delete n[r];
        if (0 !== Object.keys(n).length) {
            if ("Intl" in window) {
                var i = new window.Intl.DateTimeFormat(void 0, n);
                return i.format(e._date)
            }
            var o = n.second ? "%H:%M:%S": "%H:%M";
            return t(e._date, o)
        }
    }
    var c = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    l = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    n.prototype.toString = function() {
        var e = this.timeElapsed();
        return e ? e: "on " + this.formatDate()
    },
    n.prototype.timeElapsed = function() {
        var e = (new Date).getTime() - this.date.getTime(),
        t = Math.round(e / 1e3),
        n = Math.round(t / 60),
        r = Math.round(n / 60),
        i = Math.round(r / 24);
        return 0 > e ? "just now": 10 > t ? "just now": 45 > t ? t + " seconds ago": 90 > t ? "a minute ago": 45 > n ? n + " minutes ago": 90 > n ? "an hour ago": 24 > r ? r + " hours ago": 36 > r ? "a day ago": 30 > i ? i + " days ago": null
    },
    n.prototype.timeAgo = function() {
        var e = (new Date).getTime() - this.date.getTime(),
        t = Math.round(e / 1e3),
        n = Math.round(t / 60),
        r = Math.round(n / 60),
        i = Math.round(r / 24),
        o = Math.round(i / 30),
        a = Math.round(o / 12);
        return 0 > e ? "just now": 10 > t ? "just now": 45 > t ? t + " seconds ago": 90 > t ? "a minute ago": 45 > n ? n + " minutes ago": 90 > n ? "an hour ago": 24 > r ? r + " hours ago": 36 > r ? "a day ago": 30 > i ? i + " days ago": 45 > i ? "a month ago": 12 > o ? o + " months ago": 18 > o ? "a year ago": a + " years ago"
    },
    n.prototype.microTimeAgo = function() {
        var e = (new Date).getTime() - this.date.getTime(),
        t = e / 1e3,
        n = t / 60,
        r = n / 60,
        i = r / 24,
        o = i / 30,
        a = o / 12;
        return 1 > n ? "1m": 60 > n ? Math.round(n) + "m": 24 > r ? Math.round(r) + "h": 365 > i ? Math.round(i) + "d": Math.round(a) + "y"
    };
    var f = null,
    d = null;
    n.prototype.formatDate = function() {
        var e = r() ? "%e %b": "%b %e";
        return o(this.date) || (e += i() ? ", %Y": " %Y"),
        t(this.date, e)
    },
    n.prototype.formatTime = function() {
        if ("Intl" in window) {
            var e = new window.Intl.DateTimeFormat(void 0, {
                hour: "numeric",
                minute: "2-digit"
            });
            return e.format(this.date)
        }
        return t(this.date, "%l:%M%P")
    };
    var p, h = [],
    m = Object.create(window.HTMLElement.prototype);
    m.attributeChangedCallback = function(e, t, n) {
        if ("datetime" === e) {
            var r = Date.parse(n);
            this._date = isNaN(r) ? null: new Date(r)
        }
        var i = this.getFormattedTitle();
        i && this.setAttribute("title", i);
        var o = this.getFormattedDate();
        o && (this.textContent = o)
    },
    m.getFormattedTitle = function() {
        if (this._date) {
            if (this.hasAttribute("title")) return this.getAttribute("title");
            if ("Intl" in window) {
                var e = {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZoneName: "short"
                },
                t = new window.Intl.DateTimeFormat(void 0, e);
                return t.format(this._date)
            }
            return this._date.toLocaleString()
        }
    };
    var v = Object.create(m);
    v.createdCallback = function() {
        var e = this.getAttribute("datetime");
        e && this.attributeChangedCallback("datetime", null, e)
    },
    v.getFormattedDate = function() {
        return this._date ? new n(this._date).toString() : void 0
    },
    v.attachedCallback = function() {
        h.push(this),
        p || (a(), p = setInterval(a, 6e4))
    },
    v.detachedCallback = function() {
        var e = h.indexOf(this); - 1 !== e && h.splice(e, 1),
        h.length || p && (clearInterval(p), p = null)
    };
    var g = Object.create(v);
    g.getFormattedDate = function() {
        if (this._date) {
            var e = this.getAttribute("format");
            return "micro" === e ? new n(this._date).microTimeAgo() : new n(this._date).timeAgo()
        }
    };
    var y = Object.create(m);
    y.createdCallback = function() {
        var e; (e = this.getAttribute("datetime")) && this.attributeChangedCallback("datetime", null, e),
        (e = this.getAttribute("format")) && this.attributeChangedCallback("format", null, e)
    },
    y.getFormattedDate = function() {
        if (this._date) {
            var e = s(this) || "",
            t = u(this) || "";
            return (e + " " + t).trim()
        }
    },
    window.RelativeTimeElement = document.registerElement("relative-time", {
        prototype: v
    }),
    window.TimeAgoElement = document.registerElement("time-ago", {
        prototype: g
    }),
    window.LocalTimeElement = document.registerElement("local-time", {
        prototype: y
    })
} (),
function() {
    if (! ("u2f" in window) && "chrome" in window) {
        var e, t = window.u2f = {};
        t.EXTENSION_ID = "kmendfapggjehodndflmmgagdbamhnfd",
        t.MessageTypes = {
            U2F_REGISTER_REQUEST: "u2f_register_request",
            U2F_REGISTER_RESPONSE: "u2f_register_response",
            U2F_SIGN_REQUEST: "u2f_sign_request",
            U2F_SIGN_RESPONSE: "u2f_sign_response",
            U2F_GET_API_VERSION_REQUEST: "u2f_get_api_version_request",
            U2F_GET_API_VERSION_RESPONSE: "u2f_get_api_version_response"
        },
        t.ErrorCodes = {
            OK: 0,
            OTHER_ERROR: 1,
            BAD_REQUEST: 2,
            CONFIGURATION_UNSUPPORTED: 3,
            DEVICE_INELIGIBLE: 4,
            TIMEOUT: 5
        },
        t.U2fRequest,
        t.U2fResponse,
        t.Error,
        t.Transport,
        t.Transports,
        t.SignRequest,
        t.SignResponse,
        t.RegisterRequest,
        t.RegisterResponse,
        t.RegisteredKey,
        t.GetJsApiVersionResponse,
        t.getMessagePort = function(e) {
            if ("undefined" != typeof chrome && chrome.runtime) {
                var n = {
                    type: t.MessageTypes.U2F_SIGN_REQUEST,
                    signRequests: []
                };
                chrome.runtime.sendMessage(t.EXTENSION_ID, n,
                function() {
                    chrome.runtime.lastError ? t.getIframePort_(e) : t.getChromeRuntimePort_(e)
                })
            } else t.isAndroidChrome_() ? t.getAuthenticatorPort_(e) : t.isIosChrome_() ? t.getIosPort_(e) : t.getIframePort_(e)
        },
        t.isAndroidChrome_ = function() {
            var e = navigator.userAgent;
            return - 1 != e.indexOf("Chrome") && -1 != e.indexOf("Android")
        },
        t.isIosChrome_ = function() {
            return $.inArray(navigator.platform, ["iPhone", "iPad", "iPod"]) > -1
        },
        t.getChromeRuntimePort_ = function(e) {
            var n = chrome.runtime.connect(t.EXTENSION_ID, {
                includeTlsChannelId: !0
            });
            setTimeout(function() {
                e(new t.WrappedChromeRuntimePort_(n))
            },
            0)
        },
        t.getAuthenticatorPort_ = function(e) {
            setTimeout(function() {
                e(new t.WrappedAuthenticatorPort_)
            },
            0)
        },
        t.getIosPort_ = function(e) {
            setTimeout(function() {
                e(new t.WrappedIosPort_)
            },
            0)
        },
        t.WrappedChromeRuntimePort_ = function(e) {
            this.port_ = e
        },
        t.formatSignRequest_ = function(n, r, i, o, a) {
            if (void 0 === e || 1.1 > e) {
                for (var s = [], u = 0; u < i.length; u++) s[u] = {
                    version: i[u].version,
                    challenge: r,
                    keyHandle: i[u].keyHandle,
                    appId: n
                };
                return {
                    type: t.MessageTypes.U2F_SIGN_REQUEST,
                    signRequests: s,
                    timeoutSeconds: o,
                    requestId: a
                }
            }
            return {
                type: t.MessageTypes.U2F_SIGN_REQUEST,
                appId: n,
                challenge: r,
                registeredKeys: i,
                timeoutSeconds: o,
                requestId: a
            }
        },
        t.formatRegisterRequest_ = function(n, r, i, o, a) {
            if (void 0 === e || 1.1 > e) {
                for (var s = 0; s < i.length; s++) i[s].appId = n;
                for (var u = [], s = 0; s < r.length; s++) u[s] = {
                    version: r[s].version,
                    challenge: i[0],
                    keyHandle: r[s].keyHandle,
                    appId: n
                };
                return {
                    type: t.MessageTypes.U2F_REGISTER_REQUEST,
                    signRequests: u,
                    registerRequests: i,
                    timeoutSeconds: o,
                    requestId: a
                }
            }
            return {
                type: t.MessageTypes.U2F_REGISTER_REQUEST,
                appId: n,
                registerRequests: i,
                registeredKeys: r,
                timeoutSeconds: o,
                requestId: a
            }
        },
        t.WrappedChromeRuntimePort_.prototype.postMessage = function(e) {
            this.port_.postMessage(e)
        },
        t.WrappedChromeRuntimePort_.prototype.addEventListener = function(e, t) {
            var n = e.toLowerCase();
            "message" == n || "onmessage" == n ? this.port_.onMessage.addListener(function(e) {
                t({
                    data: e
                })
            }) : console.error("WrappedChromeRuntimePort only supports onMessage")
        },
        t.WrappedAuthenticatorPort_ = function() {
            this.requestId_ = -1,
            this.requestObject_ = null
        },
        t.WrappedAuthenticatorPort_.prototype.postMessage = function(e) {
            var n = t.WrappedAuthenticatorPort_.INTENT_URL_BASE_ + ";S.request=" + encodeURIComponent(JSON.stringify(e)) + ";end";
            document.location = n
        },
        t.WrappedAuthenticatorPort_.prototype.getPortType = function() {
            return "WrappedAuthenticatorPort_"
        },
        t.WrappedAuthenticatorPort_.prototype.addEventListener = function(e, t) {
            var n = e.toLowerCase();
            if ("message" == n) {
                var r = this;
                window.addEventListener("message", r.onRequestUpdate_.bind(r, t), !1)
            } else console.error("WrappedAuthenticatorPort only supports message")
        },
        t.WrappedAuthenticatorPort_.prototype.onRequestUpdate_ = function(e, t) {
            var n = JSON.parse(t.data),
            r = (n.intentURL, n.errorCode, null);
            n.hasOwnProperty("data") && (r = JSON.parse(n.data)),
            e({
                data: r
            })
        },
        t.WrappedAuthenticatorPort_.INTENT_URL_BASE_ = "intent:#Intent;action=com.google.android.apps.authenticator.AUTHENTICATE",
        t.WrappedIosPort_ = function() {},
        t.WrappedIosPort_.prototype.postMessage = function(e) {
            var t = JSON.stringify(e),
            n = "u2f://auth?" + encodeURI(t);
            location.replace(n)
        },
        t.WrappedIosPort_.prototype.getPortType = function() {
            return "WrappedIosPort_"
        },
        t.WrappedIosPort_.prototype.addEventListener = function(e, t) {
            var n = e.toLowerCase();
            "message" !== n && console.error("WrappedIosPort only supports message")
        },
        t.getIframePort_ = function(e) {
            var n = "chrome-extension://" + t.EXTENSION_ID,
            r = document.createElement("iframe");
            r.src = n + "/u2f-comms.html",
            r.setAttribute("style", "display:none"),
            document.body.appendChild(r);
            var i = new MessageChannel,
            o = function(t) {
                "ready" == t.data ? (i.port1.removeEventListener("message", o), e(i.port1)) : console.error('First event on iframe port was not "ready"')
            };
            i.port1.addEventListener("message", o),
            i.port1.start(),
            r.addEventListener("load",
            function() {
                r.contentWindow.postMessage("init", n, [i.port2])
            })
        },
        t.EXTENSION_TIMEOUT_SEC = 30,
        t.port_ = null,
        t.waitingForPort_ = [],
        t.reqCounter_ = 0,
        t.callbackMap_ = {},
        t.getPortSingleton_ = function(e) {
            t.port_ ? e(t.port_) : (0 == t.waitingForPort_.length && t.getMessagePort(function(e) {
                for (t.port_ = e, t.port_.addEventListener("message", t.responseHandler_); t.waitingForPort_.length;) t.waitingForPort_.shift()(t.port_)
            }), t.waitingForPort_.push(e))
        },
        t.responseHandler_ = function(e) {
            var n = e.data,
            r = n.requestId;
            if (!r || !t.callbackMap_[r]) return void console.error("Unknown or missing requestId in response.");
            var i = t.callbackMap_[r];
            delete t.callbackMap_[r],
            i(n.responseData)
        },
        t.sign = function(n, r, i, o, a) {
            void 0 === e ? t.getApiVersion(function(s) {
                e = void 0 === s.js_api_version ? 0 : s.js_api_version,
                console.log("Extension JS API Version: ", e),
                t.sendSignRequest(n, r, i, o, a)
            }) : t.sendSignRequest(n, r, i, o, a)
        },
        t.sendSignRequest = function(e, n, r, i, o) {
            t.getPortSingleton_(function(a) {
                var s = ++t.reqCounter_;
                t.callbackMap_[s] = i;
                var u = "undefined" != typeof o ? o: t.EXTENSION_TIMEOUT_SEC,
                c = t.formatSignRequest_(e, n, r, u, s);
                a.postMessage(c)
            })
        },
        t.register = function(n, r, i, o, a) {
            void 0 === e ? t.getApiVersion(function(s) {
                e = void 0 === s.js_api_version ? 0 : s.js_api_version,
                console.log("Extension JS API Version: ", e),
                t.sendRegisterRequest(n, r, i, o, a)
            }) : t.sendRegisterRequest(n, r, i, o, a)
        },
        t.sendRegisterRequest = function(e, n, r, i, o) {
            t.getPortSingleton_(function(a) {
                var s = ++t.reqCounter_;
                t.callbackMap_[s] = i;
                var u = "undefined" != typeof o ? o: t.EXTENSION_TIMEOUT_SEC,
                c = t.formatRegisterRequest_(e, r, n, u, s);
                a.postMessage(c)
            })
        },
        t.getApiVersion = function(e, n) {
            t.getPortSingleton_(function(r) {
                if (r.getPortType) {
                    var i;
                    switch (r.getPortType()) {
                    case "WrappedIosPort_":
                    case "WrappedAuthenticatorPort_":
                        i = 1.1;
                        break;
                    default:
                        i = 0
                    }
                    return void e({
                        js_api_version: i
                    })
                }
                var o = ++t.reqCounter_;
                t.callbackMap_[o] = e;
                var a = {
                    type: t.MessageTypes.U2F_GET_API_VERSION_REQUEST,
                    timeoutSeconds: "undefined" != typeof n ? n: t.EXTENSION_TIMEOUT_SEC,
                    requestId: o
                };
                r.postMessage(a)
            })
        }
    }
} (),
function() {
    function e(e) {
        x.set(e)
    }
    function t(e) {
        if (100 != e.get(Ut) && b(se(e, Ot)) % 1e4 >= 100 * ue(e, Ut)) throw "abort"
    }
    function n(e) {
        if (U(se(e, Dt))) throw "abort"
    }
    function r() {
        var e = z.location.protocol;
        if ("http:" != e && "https:" != e) throw "abort"
    }
    function i(t) {
        try {
            H.navigator.sendBeacon ? e(42) : H.XMLHttpRequest && "withCredentials" in new H.XMLHttpRequest && e(40)
        } catch(n) {}
        t.set(dt, T(t), !0),
        t.set(Se, ue(t, Se) + 1);
        var r = [];
        oe.map(function(e, n) {
            if (n.F) {
                var i = t.get(e);
                void 0 != i && i != n.defaultValue && ("boolean" == typeof i && (i *= 1), r.push(n.F + "=" + D("" + i)))
            }
        }),
        r.push("z=" + re()),
        t.set(ke, r.join("&"), !0)
    }
    function o(e) {
        var t = se(e, $t) || G() + "/collect",
        n = se(e, je);
        if (!n && e.get(Ce) && (n = "beacon"), n) {
            var r = se(e, ke),
            i = e.get(_e),
            i = i || N;
            "image" == n ? K(t, r, i) : "xhr" == n && Z(t, r, i) || "beacon" == n && Q(t, r, i) || Y(t, r, i)
        } else Y(t, se(e, ke), e.get(_e));
        e.set(_e, N, !0)
    }
    function a(e) {
        var t = H.gaData;
        t && (t.expId && e.set(it, t.expId), t.expVar && e.set(ot, t.expVar))
    }
    function s() {
        if (H.navigator && "preview" == H.navigator.loadPurpose) throw "abort"
    }
    function u(e) {
        var t = H.gaDevIds;
        C(t) && 0 != t.length && e.set("&did", t.join(","), !0)
    }
    function c(e) {
        if (!e.get(Dt)) throw "abort"
    }
    function l(t) {
        var n = ue(t, ct);
        n >= 500 && e(15);
        var r = se(t, Te);
        if ("transaction" != r && "item" != r) {
            var r = ue(t, ft),
            i = (new Date).getTime(),
            o = ue(t, lt);
            if (0 == o && t.set(lt, i), o = Math.round(2 * (i - o) / 1e3), o > 0 && (r = Math.min(r + o, 20), t.set(lt, i)), 0 >= r) throw "abort";
            t.set(ft, --r)
        }
        t.set(ct, ++n)
    }
    function f(t, n, r, i) {
        n[t] = function() {
            try {
                return i && e(i),
                r.apply(this, arguments)
            } catch(n) {
                throw ee("exc", t, n && n.name),
                n
            }
        }
    }
    function d() {
        var e, t, n;
        if ((n = (n = H.navigator) ? n.plugins: null) && n.length) for (var r = 0; r < n.length && !t; r++) {
            var i = n[r]; - 1 < i.name.indexOf("Shockwave Flash") && (t = i.description)
        }
        if (!t) try {
            e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),
            t = e.GetVariable("$version")
        } catch(o) {}
        if (!t) try {
            e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),
            t = "WIN 6,0,21,0",
            e.AllowScriptAccess = "always",
            t = e.GetVariable("$version")
        } catch(o) {}
        if (!t) try {
            e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
            t = e.GetVariable("$version")
        } catch(o) {}
        return t && (e = t.match(/[\d]+/g)) && 3 <= e.length && (t = e[0] + "." + e[1] + " r" + e[2]),
        t || void 0
    }
    function p(e, t, n) {
        "none" == t && (t = "");
        var r = [],
        i = B(e);
        e = "__utma" == e ? 6 : 2;
        for (var o = 0; o < i.length; o++) {
            var a = ("" + i[o]).split(".");
            a.length >= e && r.push({
                hash: a[0],
                R: i[o],
                O: a
            })
        }
        return 0 == r.length ? void 0 : 1 == r.length ? r[0] : h(t, r) || h(n, r) || h(null, r) || r[0]
    }
    function h(e, t) {
        var n, r;
        null == e ? n = r = 1 : (n = b(e), r = b(S(e, ".") ? e.substring(1) : "." + e));
        for (var i = 0; i < t.length; i++) if (t[i].hash == n || t[i].hash == r) return t[i]
    }
    function m(e) {
        e = e.get(Ot);
        var t = v(e, 0);
        return "_ga=1." + D(t + "." + e)
    }
    function v(e, t) {
        for (var n = new Date,
        r = H.navigator,
        i = r.plugins || [], n = [e, r.userAgent, n.getTimezoneOffset(), n.getYear(), n.getDate(), n.getHours(), n.getMinutes() + t], r = 0; r < i.length; ++r) n.push(i[r].description);
        return b(n.join("."))
    }
    function g(e, t) {
        if (t == z.location.hostname) return ! 1;
        for (var n = 0; n < e.length; n++) if (e[n] instanceof RegExp) {
            if (e[n].test(t)) return ! 0
        } else if (0 <= t.indexOf(e[n])) return ! 0;
        return ! 1
    }
    function y(e) {
        return 0 <= e.indexOf(".") || 0 <= e.indexOf(":")
    }
    function b(e) {
        var t, n = 1,
        r = 0;
        if (e) for (n = 0, t = e.length - 1; t >= 0; t--) r = e.charCodeAt(t),
        n = (n << 6 & 268435455) + r + (r << 14),
        r = 266338304 & n,
        n = 0 != r ? n ^ r >> 21 : n;
        return n
    }
    var w = function(e) {
        this.w = e || []
    };
    w.prototype.set = function(e) {
        this.w[e] = !0
    },
    w.prototype.encode = function() {
        for (var e = [], t = 0; t < this.w.length; t++) this.w[t] && (e[Math.floor(t / 6)] ^= 1 << t % 6);
        for (t = 0; t < e.length; t++) e[t] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(e[t] || 0);
        return e.join("") + "~"
    };
    var x = new w,
    E = function(e, t) {
        var n = new w(_(e));
        n.set(t),
        e.set(pt, n.w)
    },
    T = function(e) {
        e = _(e),
        e = new w(e);
        for (var t = x.w.slice(), n = 0; n < e.w.length; n++) t[n] = t[n] || e.w[n];
        return new w(t).encode()
    },
    _ = function(e) {
        return e = e.get(pt),
        C(e) || (e = []),
        e
    },
    k = function(e) {
        return "function" == typeof e
    },
    C = function(e) {
        return "[object Array]" == Object.prototype.toString.call(Object(e))
    },
    j = function(e) {
        return void 0 != e && -1 < (e.constructor + "").indexOf("String")
    },
    S = function(e, t) {
        return 0 == e.indexOf(t)
    },
    L = function(e) {
        return e ? e.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") : ""
    },
    O = function(e) {
        var t = z.createElement("img");
        return t.width = 1,
        t.height = 1,
        t.src = e,
        t
    },
    N = function() {},
    D = function(t) {
        return encodeURIComponent instanceof Function ? encodeURIComponent(t) : (e(28), t)
    },
    M = function(t, n, r, i) {
        try {
            t.addEventListener ? t.addEventListener(n, r, !!i) : t.attachEvent && t.attachEvent("on" + n, r)
        } catch(o) {
            e(27)
        }
    },
    A = function(e, t) {
        if (e) {
            var n = z.createElement("script");
            n.type = "text/javascript",
            n.async = !0,
            n.src = e,
            t && (n.id = t);
            var r = z.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(n, r)
        }
    },
    P = function() {
        return "https:" == z.location.protocol
    },
    I = function() {
        var e = "" + z.location.hostname;
        return 0 == e.indexOf("www.") ? e.substring(4) : e;
    },
    q = function(e) {
        var t = z.referrer;
        if (/^https?:\/\//i.test(t)) {
            if (e) return t;
            e = "//" + z.location.hostname;
            var n = t.indexOf(e);
            if ((5 == n || 6 == n) && (e = t.charAt(n + e.length), "/" == e || "?" == e || "" == e || ":" == e)) return;
            return t
        }
    },
    R = function(e, t) {
        if (1 == t.length && null != t[0] && "object" == typeof t[0]) return t[0];
        for (var n = {},
        r = Math.min(e.length + 1, t.length), i = 0; r > i; i++) {
            if ("object" == typeof t[i]) {
                for (var o in t[i]) t[i].hasOwnProperty(o) && (n[o] = t[i][o]);
                break
            }
            i < e.length && (n[e[i]] = t[i])
        }
        return n
    },
    F = function() {
        this.keys = [],
        this.values = {},
        this.m = {}
    };
    F.prototype.set = function(e, t, n) {
        this.keys.push(e),
        n ? this.m[":" + e] = t: this.values[":" + e] = t
    },
    F.prototype.get = function(e) {
        return this.m.hasOwnProperty(":" + e) ? this.m[":" + e] : this.values[":" + e]
    },
    F.prototype.map = function(e) {
        for (var t = 0; t < this.keys.length; t++) {
            var n = this.keys[t],
            r = this.get(n);
            r && e(n, r)
        }
    };
    var H = window,
    z = document,
    U = function(e) {
        var t = H._gaUserPrefs;
        if (t && t.ioo && t.ioo() || e && !0 === H["ga-disable-" + e]) return ! 0;
        try {
            var n = H.external;
            if (n && n._gaUserPrefs && "oo" == n._gaUserPrefs) return ! 0
        } catch(r) {}
        return ! 1
    },
    B = function(e) {
        var t = [],
        n = z.cookie.split(";");
        e = new RegExp("^\\s*" + e + "=\\s*(.*?)\\s*$");
        for (var r = 0; r < n.length; r++) {
            var i = n[r].match(e);
            i && t.push(i[1])
        }
        return t
    },
    W = function(t, n, r, i, o, a) {
        if (o = U(o) ? !1 : V.test(z.location.hostname) || "/" == r && X.test(i) ? !1 : !0, !o) return ! 1;
        if (n && 1200 < n.length && (n = n.substring(0, 1200), e(24)), r = t + "=" + n + "; path=" + r + "; ", a && (r += "expires=" + new Date((new Date).getTime() + a).toGMTString() + "; "), i && "none" != i && (r += "domain=" + i + ";"), i = z.cookie, z.cookie = r, !(i = i != z.cookie)) e: {
            for (t = B(t), i = 0; i < t.length; i++) if (n == t[i]) {
                i = !0;
                break e
            }
            i = !1
        }
        return i
    },
    $ = function(e) {
        return D(e).replace(/\(/g, "%28").replace(/\)/g, "%29")
    },
    X = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
    V = /(^|\.)doubleclick\.net$/i,
    G = function() {
        return (ye || P() ? "https:": "http:") + "//www.google-analytics.com"
    },
    J = function(e) {
        this.name = "len",
        this.message = e + "-8192"
    },
    Y = function(e, t, n) {
        if (n = n || N, 2036 >= t.length) K(e, t, n);
        else {
            if (! (8192 >= t.length)) throw ee("len", t.length),
            new J(t.length);
            Q(e, t, n) || Z(e, t, n) || K(e, t, n)
        }
    },
    K = function(e, t, n) {
        var r = O(e + "?" + t);
        r.onload = r.onerror = function() {
            r.onload = null,
            r.onerror = null,
            n()
        }
    },
    Z = function(e, t, n) {
        var r = H.XMLHttpRequest;
        if (!r) return ! 1;
        var i = new r;
        return "withCredentials" in i ? (i.open("POST", e, !0), i.withCredentials = !0, i.setRequestHeader("Content-Type", "text/plain"), i.onreadystatechange = function() {
            4 == i.readyState && (n(), i = null)
        },
        i.send(t), !0) : !1
    },
    Q = function(e, t, n) {
        return H.navigator.sendBeacon && H.navigator.sendBeacon(e, t) ? (n(), !0) : !1
    },
    ee = function(e, t, n) {
        1 <= 100 * Math.random() || U("?") || (e = ["t=error", "_e=" + e, "_v=j41", "sr=1"], t && e.push("_f=" + t), n && e.push("_m=" + D(n.substring(0, 100))), e.push("aip=1"), e.push("z=" + ne()), K(G() + "/collect", e.join("&"), N))
    },
    te = function() {
        this.M = []
    };
    te.prototype.add = function(e) {
        this.M.push(e)
    },
    te.prototype.D = function(e) {
        try {
            for (var t = 0; t < this.M.length; t++) {
                var n = e.get(this.M[t]);
                n && k(n) && n.call(H, e)
            }
        } catch(r) {}
        t = e.get(_e),
        t != N && k(t) && (e.set(_e, N, !0), setTimeout(t, 10))
    };
    var ne = function() {
        return Math.round(2147483647 * Math.random())
    },
    re = function() {
        try {
            var e = new Uint32Array(1);
            return H.crypto.getRandomValues(e),
            2147483647 & e[0]
        } catch(t) {
            return ne()
        }
    },
    ie = function() {
        this.data = new F
    },
    oe = new F,
    ae = [];
    ie.prototype.get = function(e) {
        var t = fe(e),
        n = this.data.get(e);
        return t && void 0 == n && (n = k(t.defaultValue) ? t.defaultValue() : t.defaultValue),
        t && t.Z ? t.Z(this, e, n) : n
    };
    var se = function(e, t) {
        var n = e.get(t);
        return void 0 == n ? "": "" + n
    },
    ue = function(e, t) {
        var n = e.get(t);
        return void 0 == n || "" === n ? 0 : 1 * n
    };
    ie.prototype.set = function(e, t, n) {
        if (e) if ("object" == typeof e) for (var r in e) e.hasOwnProperty(r) && ce(this, r, e[r], n);
        else ce(this, e, t, n)
    };
    var ce = function(e, t, n, r) {
        if (void 0 != n) switch (t) {
        case Dt:
            Ln.test(n)
        }
        var i = fe(t);
        i && i.o ? i.o(e, t, n, r) : e.data.set(t, n, r)
    },
    le = function(e, t, n, r, i) {
        this.name = e,
        this.F = t,
        this.Z = r,
        this.o = i,
        this.defaultValue = n
    },
    fe = function(e) {
        var t = oe.get(e);
        if (!t) for (var n = 0; n < ae.length; n++) {
            var r = ae[n],
            i = r[0].exec(e);
            if (i) {
                t = r[1](i),
                oe.set(t.name, t);
                break
            }
        }
        return t
    },
    de = function(e) {
        var t;
        return oe.map(function(n, r) {
            r.F == e && (t = r)
        }),
        t && t.name
    },
    pe = function(e, t, n, r, i) {
        return e = new le(e, t, n, r, i),
        oe.set(e.name, e),
        e.name
    },
    he = function(e, t) {
        ae.push([new RegExp("^" + e + "$"), t])
    },
    me = function(e, t, n) {
        return pe(e, t, n, void 0, ve)
    },
    ve = function() {},
    ge = j(window.GoogleAnalyticsObject) && L(window.GoogleAnalyticsObject) || "ga",
    ye = !1,
    be = pe("_br"),
    we = me("apiVersion", "v"),
    xe = me("clientVersion", "_v");
    pe("anonymizeIp", "aip");
    var Ee = pe("adSenseId", "a"),
    Te = pe("hitType", "t"),
    _e = pe("hitCallback"),
    ke = pe("hitPayload");
    pe("nonInteraction", "ni"),
    pe("currencyCode", "cu"),
    pe("dataSource", "ds");
    var Ce = pe("useBeacon", void 0, !1),
    je = pe("transport");
    pe("sessionControl", "sc", ""),
    pe("sessionGroup", "sg"),
    pe("queueTime", "qt");
    var Se = pe("_s", "_s");
    pe("screenName", "cd");
    var Le = pe("location", "dl", ""),
    Oe = pe("referrer", "dr"),
    Ne = pe("page", "dp", "");
    pe("hostname", "dh");
    var De = pe("language", "ul"),
    Me = pe("encoding", "de");
    pe("title", "dt",
    function() {
        return z.title || void 0
    }),
    he("contentGroup([0-9]+)",
    function(e) {
        return new le(e[0], "cg" + e[1])
    });
    var Ae = pe("screenColors", "sd"),
    Pe = pe("screenResolution", "sr"),
    Ie = pe("viewportSize", "vp"),
    qe = pe("javaEnabled", "je"),
    Re = pe("flashVersion", "fl");
    pe("campaignId", "ci"),
    pe("campaignName", "cn"),
    pe("campaignSource", "cs"),
    pe("campaignMedium", "cm"),
    pe("campaignKeyword", "ck"),
    pe("campaignContent", "cc");
    var Fe = pe("eventCategory", "ec"),
    He = pe("eventAction", "ea"),
    ze = pe("eventLabel", "el"),
    Ue = pe("eventValue", "ev"),
    Be = pe("socialNetwork", "sn"),
    We = pe("socialAction", "sa"),
    $e = pe("socialTarget", "st"),
    Xe = pe("l1", "plt"),
    Ve = pe("l2", "pdt"),
    Ge = pe("l3", "dns"),
    Je = pe("l4", "rrt"),
    Ye = pe("l5", "srt"),
    Ke = pe("l6", "tcp"),
    Ze = pe("l7", "dit"),
    Qe = pe("l8", "clt"),
    et = pe("timingCategory", "utc"),
    tt = pe("timingVar", "utv"),
    nt = pe("timingLabel", "utl"),
    rt = pe("timingValue", "utt");
    pe("appName", "an"),
    pe("appVersion", "av", ""),
    pe("appId", "aid", ""),
    pe("appInstallerId", "aiid", ""),
    pe("exDescription", "exd"),
    pe("exFatal", "exf");
    var it = pe("expId", "xid"),
    ot = pe("expVar", "xvar"),
    at = pe("_utma", "_utma"),
    st = pe("_utmz", "_utmz"),
    ut = pe("_utmht", "_utmht"),
    ct = pe("_hc", void 0, 0),
    lt = pe("_ti", void 0, 0),
    ft = pe("_to", void 0, 20);
    he("dimension([0-9]+)",
    function(e) {
        return new le(e[0], "cd" + e[1])
    }),
    he("metric([0-9]+)",
    function(e) {
        return new le(e[0], "cm" + e[1])
    }),
    pe("linkerParam", void 0, void 0, m, ve);
    var dt = pe("usage", "_u"),
    pt = pe("_um");
    pe("forceSSL", void 0, void 0,
    function() {
        return ye
    },
    function(t, n, r) {
        e(34),
        ye = !!r
    });
    var ht = pe("_j1", "jid");
    he("\\&(.*)",
    function(e) {
        var t = new le(e[0], e[1]),
        n = de(e[0].substring(1));
        return n && (t.Z = function(e) {
            return e.get(n)
        },
        t.o = function(e, t, r, i) {
            e.set(n, r, i)
        },
        t.F = void 0),
        t
    });
    var mt = me("_oot"),
    vt = pe("previewTask"),
    gt = pe("checkProtocolTask"),
    yt = pe("validationTask"),
    bt = pe("checkStorageTask"),
    wt = pe("historyImportTask"),
    xt = pe("samplerTask"),
    Et = pe("_rlt"),
    Tt = pe("buildHitTask"),
    _t = pe("sendHitTask"),
    kt = pe("ceTask"),
    Ct = pe("devIdTask"),
    jt = pe("timingTask"),
    St = pe("displayFeaturesTask"),
    Lt = me("name"),
    Ot = me("clientId", "cid"),
    Nt = pe("userId", "uid"),
    Dt = me("trackingId", "tid"),
    Mt = me("cookieName", void 0, "_ga"),
    At = me("cookieDomain"),
    Pt = me("cookiePath", void 0, "/"),
    It = me("cookieExpires", void 0, 63072e3),
    qt = me("legacyCookieDomain"),
    Rt = me("legacyHistoryImport", void 0, !0),
    Ft = me("storage", void 0, "cookie"),
    Ht = me("allowLinker", void 0, !1),
    zt = me("allowAnchor", void 0, !0),
    Ut = me("sampleRate", "sf", 100),
    Bt = me("siteSpeedSampleRate", void 0, 1),
    Wt = me("alwaysSendReferrer", void 0, !1),
    $t = pe("transportUrl"),
    Xt = pe("_r", "_r"),
    Vt = function(e, t, n) {
        this.V = 1e4,
        this.fa = e,
        this.$ = !1,
        this.B = t,
        this.ea = n || 1
    },
    Gt = function(e, t) {
        var n;
        if (e.fa && e.$) return 0;
        if (e.$ = !0, t) {
            if (e.B && ue(t, e.B)) return ue(t, e.B);
            if (0 == t.get(Bt)) return 0
        }
        return 0 == e.V ? 0 : (void 0 === n && (n = re()), 0 == n % e.V ? Math.floor(n / e.V) % e.ea + 1 : 0)
    },
    Jt = new Vt(!0, be, 7),
    Yt = function(e) {
        if (!P() && !ye) {
            var t = Gt(Jt, e);
            if (t && !(!H.navigator.sendBeacon && t >= 4 && 6 >= t)) {
                var n = (new Date).getHours(),
                r = [re(), re(), re()].join(".");
                e = (3 == t || 5 == t ? "https:": "http:") + "//www.google-analytics.com/collect?z=br.",
                e += [t, "A", n, r].join(".");
                var i = 1 != t % 3 ? "https:": "http:",
                i = i + "//www.google-analytics.com/collect?z=br.",
                i = i + [t, "B", n, r].join(".");
                7 == t && (i = i.replace("//www.", "//ssl.")),
                n = function() {
                    t >= 4 && 6 >= t ? H.navigator.sendBeacon(i, "") : O(i)
                },
                re() % 2 ? (O(e), n()) : (n(), O(e))
            }
        }
    },
    Kt = function(e, t) {
        var n = Math.min(ue(e, Bt), 100);
        if (! (b(se(e, Ot)) % 100 >= n) && (n = {},
        Zt(n) || Qt(n))) {
            var r = n[Xe];
            void 0 == r || 1 / 0 == r || isNaN(r) || (r > 0 ? (en(n, Ge), en(n, Ke), en(n, Ye), en(n, Ve), en(n, Je), en(n, Ze), en(n, Qe), t(n)) : M(H, "load",
            function() {
                Kt(e, t)
            },
            !1))
        }
    },
    Zt = function(e) {
        var t = H.performance || H.webkitPerformance,
        t = t && t.timing;
        if (!t) return ! 1;
        var n = t.navigationStart;
        return 0 == n ? !1 : (e[Xe] = t.loadEventStart - n, e[Ge] = t.domainLookupEnd - t.domainLookupStart, e[Ke] = t.connectEnd - t.connectStart, e[Ye] = t.responseStart - t.requestStart, e[Ve] = t.responseEnd - t.responseStart, e[Je] = t.fetchStart - n, e[Ze] = t.domInteractive - n, e[Qe] = t.domContentLoadedEventStart - n, !0)
    },
    Qt = function(e) {
        if (H.top != H) return ! 1;
        var t = H.external,
        n = t && t.onloadT;
        return t && !t.isValidLoadTime && (n = void 0),
        n > 2147483648 && (n = void 0),
        n > 0 && t.setPageReadyTime(),
        void 0 == n ? !1 : (e[Xe] = n, !0)
    },
    en = function(e, t) {
        var n = e[t]; (isNaN(n) || 1 / 0 == n || 0 > n) && (e[t] = void 0)
    },
    tn = function(e) {
        return function(t) {
            "pageview" != t.get(Te) || e.I || (e.I = !0, Kt(t,
            function(t) {
                e.send("timing", t)
            }))
        }
    },
    nn = !1,
    rn = function(t) {
        if ("cookie" == se(t, Ft)) {
            var n = se(t, Mt),
            r = sn(t),
            i = fn(se(t, Pt)),
            o = cn(se(t, At)),
            a = 1e3 * ue(t, It),
            s = se(t, Dt);
            if ("auto" != o) W(n, r, i, o, s, a) && (nn = !0);
            else {
                e(32);
                var u;
                if (r = [], o = I().split("."), 4 != o.length || (u = o[o.length - 1], parseInt(u, 10) != u)) {
                    for (u = o.length - 2; u >= 0; u--) r.push(o.slice(u).join("."));
                    r.push("none"),
                    u = r
                } else u = ["none"];
                for (var c = 0; c < u.length; c++) if (o = u[c], t.data.set(At, o), r = sn(t), W(n, r, i, o, s, a)) return void(nn = !0);
                t.data.set(At, "auto")
            }
        }
    },
    on = function(e) {
        if ("cookie" == se(e, Ft) && !nn && (rn(e), !nn)) throw "abort"
    },
    an = function(t) {
        if (t.get(Rt)) {
            var n = se(t, At),
            r = se(t, qt) || I(),
            i = p("__utma", r, n);
            i && (e(19), t.set(ut, (new Date).getTime(), !0), t.set(at, i.R), (n = p("__utmz", r, n)) && i.hash == n.hash && t.set(st, n.R))
        }
    },
    sn = function(e) {
        var t = $(se(e, Ot)),
        n = ln(se(e, At));
        return e = dn(se(e, Pt)),
        e > 1 && (n += "-" + e),
        ["GA1", n, t].join(".")
    },
    un = function(e, t, n) {
        for (var r, i = [], o = [], a = 0; a < e.length; a++) {
            var s = e[a];
            s.H[n] == t ? i.push(s) : void 0 == r || s.H[n] < r ? (o = [s], r = s.H[n]) : s.H[n] == r && o.push(s)
        }
        return 0 < i.length ? i: o
    },
    cn = function(e) {
        return 0 == e.indexOf(".") ? e.substr(1) : e
    },
    ln = function(e) {
        return cn(e).split(".").length
    },
    fn = function(e) {
        return e ? (1 < e.length && e.lastIndexOf("/") == e.length - 1 && (e = e.substr(0, e.length - 1)), 0 != e.indexOf("/") && (e = "/" + e), e) : "/"
    },
    dn = function(e) {
        return e = fn(e),
        "/" == e ? 1 : e.split("/").length
    },
    pn = new RegExp(/^https?:\/\/([^\/:]+)/),
    hn = /(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/,
    mn = function(t) {
        e(48),
        this.target = t,
        this.T = !1
    };
    mn.prototype.ca = function(e, t) {
        if (e.tagName) {
            if ("a" == e.tagName.toLowerCase()) return void(e.href && (e.href = vn(this, e.href, t)));
            if ("form" == e.tagName.toLowerCase()) return gn(this, e)
        }
        return "string" == typeof e ? vn(this, e, t) : void 0
    };
    var vn = function(e, t, n) {
        var r = hn.exec(t);
        r && 3 <= r.length && (t = r[1] + (r[3] ? r[2] + r[3] : "")),
        e = e.target.get("linkerParam");
        var i = t.indexOf("?"),
        r = t.indexOf("#");
        return n ? t += ( - 1 == r ? "#": "&") + e: (n = -1 == i ? "?": "&", t = -1 == r ? t + (n + e) : t.substring(0, r) + n + e + t.substring(r)),
        t = t.replace(/&+_ga=/, "&_ga=")
    },
    gn = function(e, t) {
        if (t && t.action) {
            var n = e.target.get("linkerParam").split("=")[1];
            if ("get" == t.method.toLowerCase()) {
                for (var r = t.childNodes || [], i = 0; i < r.length; i++) if ("_ga" == r[i].name) return void r[i].setAttribute("value", n);
                r = z.createElement("input"),
                r.setAttribute("type", "hidden"),
                r.setAttribute("name", "_ga"),
                r.setAttribute("value", n),
                t.appendChild(r)
            } else "post" == t.method.toLowerCase() && (t.action = vn(e, t.action))
        }
    };
    mn.prototype.S = function(t, n, r) {
        function i(r) {
            try {
                r = r || H.event;
                var i;
                e: {
                    var a = r.target || r.srcElement;
                    for (r = 100; a && r > 0;) {
                        if (a.href && a.nodeName.match(/^a(?:rea)?$/i)) {
                            i = a;
                            break e
                        }
                        a = a.parentNode,
                        r--
                    }
                    i = {}
                } ("http:" == i.protocol || "https:" == i.protocol) && g(t, i.hostname || "") && i.href && (i.href = vn(o, i.href, n))
            } catch(s) {
                e(26)
            }
        }
        var o = this;
        if (this.T || (this.T = !0, M(z, "mousedown", i, !1), M(z, "keyup", i, !1)), r) {
            r = function(e) {
                if (e = e || H.event, (e = e.target || e.srcElement) && e.action) {
                    var n = e.action.match(pn);
                    n && g(t, n[1]) && gn(o, e)
                }
            };
            for (var a = 0; a < z.forms.length; a++) M(z.forms[a], "submit", r)
        }
    };
    var yn, bn = function(e, t, n) {
        this.U = ht,
        this.aa = t,
        (t = n) || (t = (t = se(e, Lt)) && "t0" != t ? _n.test(t) ? "_gat_" + $(se(e, Dt)) : "_gat_" + $(t) : "_gat"),
        this.Y = t
    },
    wn = function(e, t) {
        var n = t.get(Tt);
        t.set(Tt,
        function(t) {
            xn(e, t);
            var r = n(t);
            return En(e, t),
            r
        });
        var r = t.get(_t);
        t.set(_t,
        function(t) {
            var n = r(t);
            return Tn(e, t),
            n
        })
    },
    xn = function(e, t) {
        t.get(e.U) || ("1" == B(e.Y)[0] ? t.set(e.U, "", !0) : t.set(e.U, "" + ne(), !0))
    },
    En = function(e, t) {
        t.get(e.U) && W(e.Y, "1", t.get(Pt), t.get(At), t.get(Dt), 6e5)
    },
    Tn = function(e, t) {
        if (t.get(e.U)) {
            var n = new F,
            r = function(e) {
                fe(e).F && n.set(fe(e).F, t.get(e))
            };
            r(we),
            r(xe),
            r(Dt),
            r(Ot),
            r(Nt),
            r(e.U),
            n.set(fe(dt).F, T(t));
            var i = e.aa;
            n.map(function(e, t) {
                i += D(e) + "=",
                i += D("" + t) + "&"
            }),
            i += "z=" + ne(),
            O(i),
            t.set(e.U, "", !0)
        }
    },
    _n = /^gtm\d+$/,
    kn = function(e, t) {
        var n = e.b;
        if (!n.get("dcLoaded")) {
            E(n, 29),
            t = t || {};
            var r;
            t[Mt] && (r = $(t[Mt])),
            r = new bn(n, "https://stats.g.doubleclick.net/r/collect?t=dc&aip=1&_r=3&", r),
            wn(r, n),
            n.set("dcLoaded", !0)
        }
    },
    Cn = function(e) {
        if (!e.get("dcLoaded") && "cookie" == e.get(Ft)) {
            E(e, 51);
            var t = new bn(e);
            xn(t, e),
            En(t, e),
            e.get(t.U) && (e.set(Xt, 1, !0), e.set($t, G() + "/r/collect", !0))
        }
    },
    jn = function() {
        var e = H.gaGlobal = H.gaGlobal || {};
        return e.hid = e.hid || ne()
    },
    Sn = function(e, t, n) {
        if (!yn) {
            var r;
            r = z.location.hash;
            var i = H.name,
            o = /^#?gaso=([^&]*)/; (i = (r = (r = r && r.match(o) || i && i.match(o)) ? r[1] : B("GASO")[0] || "") && r.match(/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i)) && (W("GASO", "" + r, n, t, e, 0), window._udo || (window._udo = t), window._utcp || (window._utcp = n), e = i[1], A("https://www.google.com/analytics/web/inpage/pub/inpage.js?" + (e ? "prefix=" + e + "&": "") + ne(), "_gasojs")),
            yn = !0
        }
    },
    Ln = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/,
    On = function(e) {
        function f(e, t) {
            p.b.data.set(e, t)
        }
        function d(e, t) {
            f(e, t),
            p.filters.add(e)
        }
        var p = this;
        this.b = new ie,
        this.filters = new te,
        f(Lt, e[Lt]),
        f(Dt, L(e[Dt])),
        f(Mt, e[Mt]),
        f(At, e[At] || I()),
        f(Pt, e[Pt]),
        f(It, e[It]),
        f(qt, e[qt]),
        f(Rt, e[Rt]),
        f(Ht, e[Ht]),
        f(zt, e[zt]),
        f(Ut, e[Ut]),
        f(Bt, e[Bt]),
        f(Wt, e[Wt]),
        f(Ft, e[Ft]),
        f(Nt, e[Nt]),
        f(we, 1),
        f(xe, "j41"),
        d(mt, n),
        d(vt, s),
        d(gt, r),
        d(yt, c),
        d(bt, on),
        d(wt, an),
        d(xt, t),
        d(Et, l),
        d(kt, a),
        d(Ct, u),
        d(St, Cn),
        d(Tt, i),
        d(_t, o),
        d(jt, tn(this)),
        Nn(this.b, e[Ot]),
        Dn(this.b),
        this.b.set(Ee, jn()),
        Sn(this.b.get(Dt), this.b.get(At), this.b.get(Pt))
    },
    Nn = function(t, n) {
        if ("cookie" == se(t, Ft)) {
            nn = !1;
            var r;
            e: {
                var i = B(se(t, Mt));
                if (i && !(1 > i.length)) {
                    r = [];
                    for (var o = 0; o < i.length; o++) {
                        var a;
                        a = i[o].split(".");
                        var s = a.shift(); ("GA1" == s || "1" == s) && 1 < a.length ? (s = a.shift().split("-"), 1 == s.length && (s[1] = "1"), s[0] *= 1, s[1] *= 1, a = {
                            H: s,
                            s: a.join(".")
                        }) : a = void 0,
                        a && r.push(a)
                    }
                    if (1 == r.length) {
                        e(13),
                        r = r[0].s;
                        break e
                    }
                    if (0 != r.length) {
                        if (e(14), i = ln(se(t, At)), r = un(r, i, 0), 1 == r.length) {
                            r = r[0].s;
                            break e
                        }
                        i = dn(se(t, Pt)),
                        r = un(r, i, 1),
                        r = r[0] && r[0].s;
                        break e
                    }
                    e(12)
                }
                r = void 0
            }
            r || (r = se(t, At), i = se(t, qt) || I(), r = p("__utma", i, r), void 0 != r ? (e(10), r = r.O[1] + "." + r.O[2]) : r = void 0),
            r && (t.data.set(Ot, r), nn = !0)
        }
        if (r = t.get(zt), (o = (r = z.location[r ? "href": "search"].match("(?:&|#|\\?)" + D("_ga").replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1") + "=([^&#]*)")) && 2 == r.length ? r[1] : "") && (t.get(Ht) ? (r = o.indexOf("."), -1 == r ? e(22) : (i = o.substring(r + 1), "1" != o.substring(0, r) ? e(22) : (r = i.indexOf("."), -1 == r ? e(22) : (o = i.substring(0, r), r = i.substring(r + 1), o != v(r, 0) && o != v(r, -1) && o != v(r, -2) ? e(23) : (e(11), t.data.set(Ot, r)))))) : e(21)), n && (e(9), t.data.set(Ot, D(n))), !t.get(Ot)) if (r = (r = H.gaGlobal && H.gaGlobal.vid) && -1 != r.search(/^(?:utma\.)?\d+\.\d+$/) ? r: void 0) e(17),
        t.data.set(Ot, r);
        else {
            for (e(8), r = H.navigator.userAgent + (z.cookie ? z.cookie: "") + (z.referrer ? z.referrer: ""), i = r.length, o = H.history.length; o > 0;) r += o--^i++;
            t.data.set(Ot, [ne() ^ 2147483647 & b(r), Math.round((new Date).getTime() / 1e3)].join("."))
        }
        rn(t)
    },
    Dn = function(t) {
        var n = H.navigator,
        r = H.screen,
        i = z.location;
        if (t.set(Oe, q(t.get(Wt))), i) {
            var o = i.pathname || "";
            "/" != o.charAt(0) && (e(31), o = "/" + o),
            t.set(Le, i.protocol + "//" + i.hostname + o + i.search)
        }
        r && t.set(Pe, r.width + "x" + r.height),
        r && t.set(Ae, r.colorDepth + "-bit");
        var r = z.documentElement,
        a = (o = z.body) && o.clientWidth && o.clientHeight,
        s = [];
        if (r && r.clientWidth && r.clientHeight && ("CSS1Compat" === z.compatMode || !a) ? s = [r.clientWidth, r.clientHeight] : a && (s = [o.clientWidth, o.clientHeight]), r = 0 >= s[0] || 0 >= s[1] ? "": s.join("x"), t.set(Ie, r), t.set(Re, d()), t.set(Me, z.characterSet || z.charset), t.set(qe, n && "function" == typeof n.javaEnabled && n.javaEnabled() || !1), t.set(De, (n && (n.language || n.browserLanguage) || "").toLowerCase()), i && t.get(zt) && (n = z.location.hash)) {
            for (n = n.split(/[?&#]+/), i = [], r = 0; r < n.length; ++r)(S(n[r], "utm_id") || S(n[r], "utm_campaign") || S(n[r], "utm_source") || S(n[r], "utm_medium") || S(n[r], "utm_term") || S(n[r], "utm_content") || S(n[r], "gclid") || S(n[r], "dclid") || S(n[r], "gclsrc")) && i.push(n[r]);
            0 < i.length && (n = "#" + i.join("&"), t.set(Le, t.get(Le) + n))
        }
    };
    On.prototype.get = function(e) {
        return this.b.get(e)
    },
    On.prototype.set = function(e, t) {
        this.b.set(e, t)
    };
    var Mn = {
        pageview: [Ne],
        event: [Fe, He, ze, Ue],
        social: [Be, We, $e],
        timing: [et, tt, rt, nt]
    };
    On.prototype.send = function(e) {
        if (! (1 > arguments.length)) {
            var t, n;
            "string" == typeof arguments[0] ? (t = arguments[0], n = [].slice.call(arguments, 1)) : (t = arguments[0] && arguments[0][Te], n = arguments),
            t && (n = R(Mn[t] || [], n), n[Te] = t, this.b.set(n, void 0, !0), this.filters.D(this.b), this.b.data.m = {},
            Yt(this.b))
        }
    };
    var An, Pn, In, qn = function(e) {
        return "prerender" == z.visibilityState ? !1 : (e(), !0)
    },
    Rn = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,
    Fn = function(e) {
        if (k(e[0])) this.u = e[0];
        else {
            var t = Rn.exec(e[0]);
            if (null != t && 4 == t.length && (this.c = t[1] || "t0", this.K = t[2] || "", this.C = t[3], this.a = [].slice.call(e, 1), this.K || (this.A = "create" == this.C, this.i = "require" == this.C, this.g = "provide" == this.C, this.ba = "remove" == this.C), this.i && (3 <= this.a.length ? (this.X = this.a[1], this.W = this.a[2]) : this.a[1] && (j(this.a[1]) ? this.X = this.a[1] : this.W = this.a[1]))), t = e[1], e = e[2], !this.C) throw "abort";
            if (this.i && (!j(t) || "" == t)) throw "abort";
            if (this.g && (!j(t) || "" == t || !k(e))) throw "abort";
            if (y(this.c) || y(this.K)) throw "abort";
            if (this.g && "t0" != this.c) throw "abort"
        }
    };
    An = new F,
    In = new F,
    Pn = {
        ec: 45,
        ecommerce: 46,
        linkid: 47
    };
    var Hn = function(e) {
        function t(e) {
            var t = (e.hostname || "").split(":")[0].toLowerCase(),
            n = (e.protocol || "").toLowerCase(),
            n = 1 * e.port || ("http:" == n ? 80 : "https:" == n ? 443 : "");
            return e = e.pathname || "",
            S(e, "/") || (e = "/" + e),
            [t, "" + n, e]
        }
        var n = z.createElement("a");
        n.href = z.location.href;
        var r = (n.protocol || "").toLowerCase(),
        i = t(n),
        o = n.search || "",
        a = r + "//" + i[0] + (i[1] ? ":" + i[1] : "");
        return S(e, "//") ? e = r + e: S(e, "/") ? e = a + e: !e || S(e, "?") ? e = a + i[2] + (e || o) : 0 > e.split("/")[0].indexOf(":") && (e = a + i[2].substring(0, i[2].lastIndexOf("/")) + "/" + e),
        n.href = e,
        r = t(n),
        {
            protocol: (n.protocol || "").toLowerCase(),
            host: r[0],
            port: r[1],
            path: r[2],
            query: n.search || "",
            url: e || ""
        }
    },
    zn = {
        ga: function() {
            zn.f = []
        }
    };
    zn.ga(),
    zn.D = function(e) {
        var t = zn.J.apply(zn, arguments),
        t = zn.f.concat(t);
        for (zn.f = []; 0 < t.length && !zn.v(t[0]) && (t.shift(), !(0 < zn.f.length)););
        zn.f = zn.f.concat(t)
    },
    zn.J = function(t) {
        for (var n = [], r = 0; r < arguments.length; r++) try {
            var i = new Fn(arguments[r]);
            if (i.g) An.set(i.a[0], i.a[1]);
            else {
                if (i.i) {
                    var o = i,
                    a = o.a[0];
                    if (!k(An.get(a)) && !In.get(a)) {
                        Pn.hasOwnProperty(a) && e(Pn[a]);
                        var s = o.X;
                        if (!s && Pn.hasOwnProperty(a) ? (e(39), s = a + ".js") : e(43), s) {
                            s && 0 <= s.indexOf("/") || (s = (ye || P() ? "https:": "http:") + "//www.google-analytics.com/plugins/ua/" + s);
                            var u, c = Hn(s),
                            o = void 0,
                            l = c.protocol,
                            f = z.location.protocol,
                            o = "https:" == l || l == f ? !0 : "http:" != l ? !1 : "http:" == f;
                            if (u = o) {
                                var o = c,
                                d = Hn(z.location.href);
                                if (o.query || 0 <= o.url.indexOf("?") || 0 <= o.path.indexOf("://")) u = !1;
                                else if (o.host == d.host && o.port == d.port) u = !0;
                                else {
                                    var p = "http:" == o.protocol ? 80 : 443;
                                    u = "www.google-analytics.com" == o.host && (o.port || p) == p && S(o.path, "/plugins/") ? !0 : !1
                                }
                            }
                            u && (A(c.url), In.set(a, !0))
                        }
                    }
                }
                n.push(i)
            }
        } catch(h) {}
        return n
    },
    zn.v = function(e) {
        try {
            if (e.u) e.u.call(H, Un.j("t0"));
            else {
                var t = e.c == ge ? Un: Un.j(e.c);
                if (e.A)"t0" == e.c && Un.create.apply(Un, e.a);
                else if (e.ba) Un.remove(e.c);
                else if (t) if (e.i) {
                    var n, r = e.a[0],
                    i = e.W;
                    t == Un || t.get(Lt);
                    var o = An.get(r);
                    if (k(o) ? (t.plugins_ = t.plugins_ || new F, t.plugins_.get(r) || t.plugins_.set(r, new o(t, i || {})), n = !0) : n = !1, !n) return ! 0
                } else if (e.K) {
                    var a = e.C,
                    s = e.a,
                    u = t.plugins_.get(e.K);
                    u[a].apply(u, s)
                } else t[e.C].apply(t, e.a)
            }
        } catch(c) {}
    };
    var Un = function(t) {
        e(1),
        zn.D.apply(zn, [arguments])
    };
    Un.h = {},
    Un.P = [],
    Un.L = 0,
    Un.answer = 42;
    var Bn = [Dt, At, Lt];
    Un.create = function(e) {
        var t = R(Bn, [].slice.call(arguments));
        t[Lt] || (t[Lt] = "t0");
        var n = "" + t[Lt];
        return Un.h[n] ? Un.h[n] : (t = new On(t), Un.h[n] = t, Un.P.push(t), t)
    },
    Un.remove = function(e) {
        for (var t = 0; t < Un.P.length; t++) if (Un.P[t].get(Lt) == e) {
            Un.P.splice(t, 1),
            Un.h[e] = null;
            break
        }
    },
    Un.j = function(e) {
        return Un.h[e]
    },
    Un.getAll = function() {
        return Un.P.slice(0)
    },
    Un.N = function() {
        "ga" != ge && e(49);
        var t = H[ge];
        if (!t || 42 != t.answer) {
            Un.L = t && t.l,
            Un.loaded = !0;
            var n = H[ge] = Un;
            if (f("create", n, n.create), f("remove", n, n.remove), f("getByName", n, n.j, 5), f("getAll", n, n.getAll, 6), n = On.prototype, f("get", n, n.get, 7), f("set", n, n.set, 4), f("send", n, n.send), n = ie.prototype, f("get", n, n.get), f("set", n, n.set), !P() && !ye) {
                e: {
                    for (var n = z.getElementsByTagName("script"), r = 0; r < n.length && 100 > r; r++) {
                        var i = n[r].src;
                        if (i && 0 == i.indexOf("https://www.google-analytics.com/analytics")) {
                            e(33),
                            n = !0;
                            break e
                        }
                    }
                    n = !1
                }
                n && (ye = !0)
            }
            P() || ye || !Gt(new Vt) || (e(36), ye = !0),
            (H.gaplugins = H.gaplugins || {}).Linker = mn,
            n = mn.prototype,
            An.set("linker", mn),
            f("decorate", n, n.ca, 20),
            f("autoLink", n, n.S, 25),
            An.set("displayfeatures", kn),
            An.set("adfeatures", kn),
            t = t && t.q,
            C(t) ? zn.D.apply(Un, t) : e(50)
        }
    },
    Un.da = function() {
        for (var e = Un.getAll(), t = 0; t < e.length; t++) e[t].get(Lt)
    },
    function() {
        var t = Un.N;
        if (!qn(t)) {
            e(16);
            var n = !1,
            r = function() {
                if (!n && qn(t)) {
                    n = !0;
                    var e = r,
                    i = z;
                    i.removeEventListener ? i.removeEventListener("visibilitychange", e, !1) : i.detachEvent && i.detachEvent("onvisibilitychange", e)
                }
            };
            M(z, "visibilitychange", r)
        }
    } ()
} (window),
function() {
    var e, t, n, r, i, o, a, s = require("jquery"),
    u = require("github/observe"),
    c = u.observe;
    r = e = {},
    o = null,
    a = function() {
        return o = null,
        e = r
    },
    s(document).on("keydown",
    function(t) {
        if (!t.isFormInteraction()) {
            o && clearTimeout(o);
            var n = e[t.hotkey];
            if (n) {
                if (! ("nodeType" in n)) return e = n,
                void(o = setTimeout(a, 1500));
                a(),
                s(n).fire("hotkey:activate", {
                    originalEvent: t
                },
                function() {
                    return s(n).is("input, textarea") ? void s(n).focus() : void s(n).click()
                }),
                t.preventDefault()
            } else a()
        }
    }),
    t = function(e) {
        var t, n, r, i, o;
        for (i = e.getAttribute("data-hotkey").split(/\s*,\s*/), o = [], n = 0, r = i.length; r > n; n++) t = i[n],
        o.push(t.split(/\s+/));
        return o
    },
    n = function(e) {
        var n, i, o, a, s, u, c, l, f;
        for (l = t(e), f = [], o = 0, u = l.length; u > o; o++) s = l[o],
        c = r,
        f.push(function() {
            var t, r, o;
            for (o = [], i = t = 0, r = s.length; r > t; i = ++t) a = s[i],
            i < s.length - 1 ? (n = c[a], (!n || "nodeType" in n) && (c[a] = {}), o.push(c = c[a])) : o.push(c[a] = e);
            return o
        } ());
        return f
    },
    i = function(t) {
        var i, o, a, u;
        for (r = e = {},
        a = s("[data-hotkey]"), u = [], i = 0, o = a.length; o > i; i++) t = a[i],
        u.push(n(t));
        return u
    },
    c("[data-hotkey]", {
        add: n,
        remove: i
    })
}.call(this),
function() {
    function e(e) {
        var t, n;
        return e.nodeType !== Node.ELEMENT_NODE ? !1 : (t = e.nodeName.toLowerCase(), n = (e.getAttribute("type") || "").toLowerCase(), "select" === t || "textarea" === t || "input" === t && "submit" !== n && "reset" !== n)
    }
    function t(t) {
        var n;
        return null == t.hotkey && (t.hotkey = r(t)),
        n = null,
        null == t.isFormInteraction && (t.isFormInteraction = function() {
            return null != n ? n: n = e(this.target)
        }),
        t.handleObj.handler.apply(this, arguments)
    }
    var n = require("jquery"),
    r = require("github/hotkey")["default"];
    n.event.special.keydown = {
        handle: t
    },
    n.event.special.keyup = {
        handle: t
    }
} (),
define("github/debounce", ["exports"],
function(e) {
    function t(e, t) {
        var n = null;
        return function() {
            clearTimeout(n),
            n = setTimeout(e, t)
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = t
}),
define("github/document-ready", ["exports"],
function(e) {
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    e.ready = function() {
        return "interactive" === document.readyState || "complete" === document.readyState ? Promise.resolve() : new Promise(function(e) {
            document.addEventListener("DOMContentLoaded", e)
        })
    } (),
    e.loaded = function() {
        return "complete" === document.readyState ? Promise.resolve() : new Promise(function(e) {
            window.addEventListener("load", e)
        })
    } ()
}),
define("github/emoji-detection", ["exports"],
function(e) {
    function t(e, t) {
        var r = e.getContext("2d");
        return n(r, t),
        0 !== r.getImageData(16, 16, 1, 1).data[0]
    }
    function n(e, t) {
        e.clearRect(0, 0, 400, 400),
        e.fillStyle = "#000",
        e.textBaseline = "top",
        e.font = '32px "Apple Color Emoji", "Segoe UI", "Segoe UI Emoji", "Segoe UI Symbol", Arial',
        e.fillText(t, 0, 0)
    }
    function r() {
        try {
            var e = document.createElement("canvas");
            return {
                "6.0": t(e, o),
                6.1 : t(e, a),
                "7.0": t(e, s),
                "8.0": t(e, u),
                "9.0": t(e, c)
            }
        } catch(n) {
            return {}
        }
    }
    function i() {
        var e = r(),
        t = 0;
        for (var n in e) {
            var i = parseFloat(n);
            e[n] && i > t && (t = i)
        }
        return t
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.detectEmoji = t,
    e.drawEmoji = n,
    e.detectEmojiUnicodeLevel = i;
    var o = e.unicode6emoji = String.fromCharCode(55357) + String.fromCharCode(56836),
    a = e.unicode61emoji = String.fromCharCode(55357) + String.fromCharCode(56853),
    s = e.unicode7emoji = String.fromCharCode(55357) + String.fromCharCode(56898),
    u = e.unicode8emoji = String.fromCharCode(55358) + String.fromCharCode(56596),
    c = e.unicode9emoji = String.fromCharCode(55358) + String.fromCharCode(56631)
}),
define("github/timezone", ["exports"],
function(e) {
    function t() {
        if ("Intl" in window) {
            var e = new Intl.DateTimeFormat;
            return e.resolvedOptions().timeZone
        }
        return void 0
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = t
}),
define("github/feature-detection", ["exports", "./emoji-detection", "./timezone"],
function(e, t, n) {
    function r(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function i(e) {
        return "function" == typeof e && e.toString().match(/native code/) ? !0 : !1
    }
    function o(e, t) {
        return e && t in e && i(e[t]) ? !0 : !1
    }
    function a() {
        if (!o(window, "CustomEvent")) return ! 1;
        try {
            var e = new CustomEvent("test", {
                detail: "supported"
            });
            return "supported" === e.detail
        } catch(t) {
            return ! 1
        }
    }
    function s() {
        return f.classList ? (c.classList.add("a", "b"), c.classList.contains("b")) : !1
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var u = r(n),
    c = document.createElement("input"),
    l = t.detectEmojiUnicodeLevel(),
    f = {
        emoji: l >= 6.1,
        emojiUnicodeVersion: l,
        CustomEvent: a(),
        registerElement: o(document, "registerElement"),
        Promise: o(window, "Promise"),
        URL: o(window, "URL"),
        URLSearchParams: o(window, "URLSearchParams"),
        WeakMap: o(window, "WeakMap"),
        fetch: o(window, "fetch"),
        closest: o(c, "closest"),
        matches: o(c, "matches"),
        stringEndsWith: o(String.prototype, "endsWith"),
        stringStartsWith: o(String.prototype, "startsWith"),
        performanceNow: o(window.performance, "now"),
        performanceMark: o(window.performance, "mark"),
        performanceGetEntries: o(window.performance, "getEntries"),
        timezone: !!u["default"](),
        u2f: "u2f" in window || document.documentElement.classList.contains("is-u2f-enabled"),
        sendBeacon: o(window.navigator, "sendBeacon")
    };
    f.classList = o("classList" in c && c.classList, "add"),
    f.classListMultiArg = s(),
    e["default"] = f
}),
define("github/html-safe", ["exports"],
function(e) {
    function t(e) {
        var t = e.querySelector("meta[name=html-safe-nonce]") || {},
        n = t.content;
        if (n) return n;
        throw new Error("could not find html-safe-nonce on document")
    }
    function n(e, t) {
        var n = t.headers.get("content-type") || "";
        if (!n.startsWith("text/html")) throw new Error("expected response with text/html, but was " + n);
        var r = t.headers.get("x-html-safe") || "";
        if (r !== e) throw new Error("response X-HTML-Safe nonce did not match");
        return t
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getDocumentHtmlSafeNonce = t,
    e.verifyResponseHtmlSafeNonce = n
}),
define("github/parse-html", ["exports"],
function(e) {
    function t(e, t) {
        var n = e.createElement("template");
        if ("content" in n) return n.innerHTML = t,
        e.importNode(n.content, !0);
        var r = function() {
            var n = e.createDocumentFragment(),
            r = e.implementation.createHTMLDocument();
            return r.body.innerHTML = t,
            Array.from(r.body.childNodes).forEach(function(e) {
                return n.appendChild(e)
            }),
            {
                v: n
            }
        } ();
        return "object" == typeof r ? r.v: void 0
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.parseHTML = t
}),
define("github/fetch", ["exports", "./html-safe", "./parse-html"],
function(e, t, n) {
    function r(e) {
        if (e.status >= 200 && e.status < 300) return e;
        var t = new Error(e.statusText || e.status);
        throw t.response = e,
        t
    }
    function i(e) {
        return null == e.headers && (e.headers = {}),
        e.headers["X-Requested-With"] = "XMLHttpRequest",
        e
    }
    function o(e) {
        return null == e.credentials && (e.credentials = "same-origin"),
        e
    }
    function a(e) {
        return e.json()
    }
    function s(e) {
        return e.text()
    }
    function u(e, t) {
        return t = i(o(t || {})),
        self.fetch(e, t).then(r)
    }
    function c(e, t) {
        return t = i(o(t || {})),
        self.fetch(e, t).then(r).then(s)
    }
    function l(e, t) {
        return t = i(o(t || {})),
        t.headers.Accept = "application/json",
        self.fetch(e, t).then(r).then(a)
    }
    function f(e, a, s) {
        var u;
        return regeneratorRuntime.async(function(c) {
            for (;;) switch (c.prev = c.next) {
            case 0:
                return s = i(o(s || {})),
                c.next = 3,
                regeneratorRuntime.awrap(self.fetch(a, s));
            case 3:
                return u = c.sent,
                r(u),
                t.verifyResponseHtmlSafeNonce(t.getDocumentHtmlSafeNonce(e), u),
                c.t0 = e,
                c.next = 9,
                regeneratorRuntime.awrap(u.text());
            case 9:
                return c.t1 = c.sent,
                c.abrupt("return", n.parseHTML(c.t0, c.t1));
            case 11:
            case "end":
                return c.stop()
            }
        },
        null, this)
    }
    function d(e, t) {
        return new Promise(function(n, r) {
            function i(o) {
                function a(e) {
                    switch (e.status) {
                    case 200:
                        n(e);
                        break;
                    case 202:
                        setTimeout(function() {
                            return i(1.5 * o)
                        },
                        o);
                        break;
                    default:
                        var t = new Error(e.statusText || e.status);
                        t.response = e,
                        r(t)
                    }
                }
                u(e, t).then(a, r)
            }
            i(1e3)
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.fetch = u,
    e.fetchText = c,
    e.fetchJSON = l,
    e.fetchSafeDocumentFragment = f,
    e.fetchPoll = d
}),
define("github/fragment-target", ["exports"],
function(e) {
    function t(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? location.hash: arguments[1],
        r = decodeURIComponent(t.slice(1));
        return n(e, r)
    }
    function n(e, t) {
        return e.getElementById(t) || e.getElementsByName(t)[0]
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.findFragmentTarget = t,
    e.findElementByFragmentName = n
}),
define("github/google-analytics", ["exports", "./setimmediate"],
function(e, t) {
    function n(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function r(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1];
        t.page = e,
        ga("send", "pageview", t)
    }
    function i(e, t) {
        ga("set", e, t)
    }
    function o(e) {
        ga("set", {
            location: e
        })
    }
    function a(e) {
        ga("set", {
            title: e
        })
    }
    function s(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? {}: arguments[2];
        ga("create", e, t, n)
    }
    function u(e) {
        ga(function(t) {
            var n = t.get("sendHitTask");
            t.set("sendHitTask",
            function(t) {
                return e(n, t, t.get("hitPayload"))
            })
        })
    }
    function c(e) {
        this.name = "InvalidGAEventValueError",
        this.message = "The event value in '" + JSON.stringify(e) + "' has to be an integer."
    }
    function l(e) {
        if (void 0 !== e.value) if (d.test(e.value)) e.value = Number(e.value);
        else {
            var t = function() {
                var t = new c(e);
                return f["default"](function() {
                    throw t
                }),
                {
                    v: void 0
                }
            } ();
            if ("object" == typeof t) return t.v
        }
        void 0 === e.interactive && (e.interactive = !0),
        ga("send", "event", e.category, e.action, e.label, e.value, {
            nonInteraction: !e.interactive,
            useBeacon: !0
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.trackPageview = r,
    e.setDimension = i,
    e.setGlobalLocation = o,
    e.setGlobalTitle = a,
    e.setGlobalAccount = s,
    e.addSendHook = u,
    e.trackEvent = l;
    var f = n(t);
    window.ga || (window.ga = function() {
        window.ga.q.push(arguments)
    },
    window.ga.q = []),
    c.prototype = Error.prototype;
    var d = /^\d+$/
}),
define("github/hash-change", ["exports", "./document-ready"],
function(e, t) {
    function n(e) {
        o.push(e),
        t.ready.then(r)
    }
    function r() {
        var e = a;
        a = o.length,
        i(o.slice(e), null, window.location.href)
    }
    function i(e, t, n) {
        var r = window.location.hash.slice(1),
        i = r && document.getElementById(r) || window,
        o = {
            oldURL: t,
            newURL: n,
            target: i
        };
        e.forEach(function(e) {
            return e.call(i, o)
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e["default"] = n;
    var o = [],
    a = 0;
    n.clear = function() {
        o.length = a = 0
    };
    var s = window.location.href;
    window.addEventListener("popstate",
    function() {
        s = window.location.href
    }),
    window.addEventListener("hashchange",
    function(e) {
        var t = window.location.href;
        try {
            i(o, e.oldURL || s, t)
        } finally {
            s = t
        }
    });
    var u = null;
    document.addEventListener("pjax:start",
    function() {
        u = window.location.href
    }),
    document.addEventListener("pjax:end",
    function() {
        i(o, u, window.location.href)
    })
}),
define("github/inflector", ["exports"],
function(e) {
    function t(e, t) {
        return t + (e > 1 || 0 == e ? "s": "")
    }
    function n(e, t) {
        var n = 1 == e ? "data-singular-string": "data-plural-string",
        r = t.getAttribute(n);
        t.textContent = r
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.pluralize = t,
    e.pluralizeNode = n
}),
define("github/locale", ["exports"],
function(e) {
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    e.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    e.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
}),
define("github/normalized-event-timestamp", ["exports"],
function(e) {
    function t(e) {
        return ! e || r > e && !(e % 1) ? Date.now() : e
    }
    function n(e) {
        return r > e ? self.performance.now() - e: Date.now() - e
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.normalizedTimestamp = t,
    e.timeSinceTimestamp = n;
    var r = 14594616e5
}),
define("github/number-helpers", ["exports"],
function(e) {
    function t(e) {
        return ("" + e).replace(/(^|[^\w.])(\d{4,})/g,
        function(e, t, n) {
            return t + n.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,")
        })
    }
    function n(e) {
        return "string" == typeof e && (e = e.replace(/,/g, "")),
        parseFloat(e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.formatNumber = t,
    e.parseFormattedNumber = n
}),
define("github/pjax/prefetch", ["exports"],
function(e) {
    function t(e, t) {
        for (var n = e.querySelectorAll("link[rel=pjax-prefetch]"), r = 0, i = n.length; i > r; r++) {
            var o = n[r];
            if (o.href === t.url) return o
        }
    }
    function n(e, n) {
        var r = t(e, n);
        if (r) {
            var o = i.get(r);
            return r.remove(),
            i["delete"](r),
            o
        }
    }
    function r(e, t) {
        i.set(e, t)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.popPrefetchResponseForRequest = n,
    e.setPrefetchResponse = r;
    var i = new WeakMap
}),
define("github/pjax", ["exports", "./history", "./jquery", "./fragment-target", "./inspect", "./pjax/prefetch"],
function(e, t, n, r, i, o) {
    function a(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function s(e, t, n) {
        n = x(t, n);
        var r = e.currentTarget;
        if ("A" !== r.tagName.toUpperCase()) throw new Error("$.fn.pjax or pjax click requires an anchor element");
        if (! (e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || location.protocol !== r.protocol || location.hostname !== r.hostname || r.href.indexOf("#") > -1 && w(r) == w(location) || e.isDefaultPrevented())) {
            var i = {
                url: r.href,
                container: D["default"](r).attr("data-pjax"),
                target: r
            },
            o = D["default"].extend({},
            i, n);
            c(r, "pjax:click", {
                options: o,
                relatedEvent: e.originalEvent
            }) && (l(o), e.preventDefault(), c(r, "pjax:clicked", {
                options: o
            }))
        }
    }
    function u(e, t, n) {
        n = x(t, n);
        var r = e.currentTarget,
        i = D["default"](r);
        if ("FORM" !== r.tagName.toUpperCase()) throw new Error("pjax submit requires a form element");
        var o = {
            type: (i.attr("method") || "GET").toUpperCase(),
            url: i.attr("action"),
            container: i.attr("data-pjax"),
            target: r
        };
        if ("GET" !== o.type && void 0 !== window.FormData) o.data = new FormData(r),
        o.processData = !1,
        o.contentType = !1;
        else {
            if (D["default"](r).find(":file").length) return;
            o.data = D["default"](r).serializeArray()
        }
        l(D["default"].extend({},
        o, n)),
        e.preventDefault()
    }
    function c(e, t, n) {
        return e.dispatchEvent(new CustomEvent(t, {
            bubbles: !0,
            cancelable: !0,
            detail: n
        }))
    }
    function l(e) {
        function n(t, n) {
            "GET" !== n.type && (n.timeout = 0),
            t.setRequestHeader("X-PJAX", "true"),
            t.setRequestHeader("X-PJAX-Container", u.selector),
            n.timeout > 0 && (f = setTimeout(function() {
                c(u[0], "pjax:timeout") && t.abort("timeout")
            },
            n.timeout), n.timeout = 0);
            var r = b(n.url);
            s && (r.hash = s),
            e.requestUrl = y(r)
        }
        function i(t, n) {
            var r = k("", t, e),
            i = c(u[0], "pjax:error");
            "GET" == e.type && "abort" !== n && i && p(r.url),
            f && clearTimeout(f),
            c(u[0], "pjax:complete"),
            c(u[0], "pjax:end")
        }
        function a(n, i, o) {
            var a = I,
            l = O(),
            d = o.getResponseHeader("X-PJAX-Version"),
            h = k(n, o, e),
            m = b(h.url);
            if (s && (m.hash = s, h.url = m.href), l && d && l !== d) return void p(h.url);
            if (!h.contents) return void p(h.url);
            I = {
                id: e.id || v(),
                url: h.url,
                title: h.title,
                container: u.selector,
                fragment: e.fragment,
                timeout: e.timeout
            },
            (e.push || e.replace) && t.replaceState(I, h.title, h.url);
            var g = D["default"].contains(e.container, document.activeElement);
            if (g) try {
                document.activeElement.blur()
            } catch(y) {}
            h.title && (document.title = h.title),
            c(u[0], "pjax:beforeReplace", {
                contents: h.contents,
                state: I,
                previousState: a
            }),
            u.html(h.contents);
            var w = u.find("input[autofocus], textarea[autofocus]").last()[0];
            w && document.activeElement !== w && w.focus(),
            C(h.scripts);
            var x = e.scrollTo;
            if (s) {
                var E = r.findFragmentTarget(document, s);
                E && (x = D["default"](E).offset().top)
            }
            "number" == typeof x && D["default"](window).scrollTop(x),
            c(u[0], "pjax:success"),
            f && clearTimeout(f),
            c(u[0], "pjax:complete"),
            c(u[0], "pjax:end")
        }
        e = D["default"].extend(!0, {},
        D["default"].ajaxSettings, A, e),
        D["default"].isFunction(e.url) && (e.url = e.url());
        var s = b(e.url).hash,
        u = e.context = E(e.container);
        e.data || (e.data = {}),
        D["default"].isArray(e.data) ? e.data.push({
            name: "_pjax",
            value: u.selector
        }) : e.data._pjax = u.selector;
        var f = void 0;
        I || (I = {
            id: v(),
            url: window.location.href,
            title: document.title,
            container: u.selector,
            fragment: e.fragment,
            timeout: e.timeout
        },
        t.replaceState(I, I.title, I.url)),
        m(q),
        e.beforeSend = n,
        l.options = e;
        var d = o.popPrefetchResponseForRequest(u[0], e),
        h = q = d || D["default"].ajax(e);
        return h.readyState > 0 && (e.push && !e.replace && (j(I.id, g(u)), t.pushState(null, "", e.requestUrl)), c(u[0], "pjax:start", {
            url: e.url
        }), c(u[0], "pjax:send")),
        h.done(a).fail(i)
    }
    function f(e, t) {
        var n = e.closest("[data-pjax-container]");
        if (!n) throw new Error("no pjax container for " + M["default"](n));
        t || (t = {});
        var r = E(n),
        i = D["default"].extend({
            "X-PJAX": "true",
            "X-PJAX-Container": r.selector
        },
        t.headers || {});
        return D["default"].ajax({
            type: "GET",
            url: e.href,
            data: {
                _pjax: r.selector
            },
            dataType: "html",
            headers: i
        })
    }
    function d(e, t) {
        var n = {
            url: window.location.href,
            push: !1,
            replace: !0,
            scrollTo: !1
        };
        return l(D["default"].extend(n, x(e, t)))
    }
    function p(e) {
        t.replaceState(null, "", I.url),
        window.location.replace(e)
    }
    function h(e) {
        R || m(q);
        var t = I,
        n = e.originalEvent.state,
        r = void 0;
        if (n && n.container) {
            if (R && F == n.url) return;
            if (t) {
                if (t.id === n.id) return;
                r = t.id < n.id ? "forward": "back"
            }
            var i = z[n.id] || [],
            o = D["default"](i[0] || n.container),
            a = i[1];
            if (o.length) {
                t && S(r, t.id, g(o)),
                c(o[0], "pjax:popstate", {
                    state: n,
                    direction: r
                });
                var s = {
                    id: n.id,
                    url: n.url,
                    container: o,
                    push: !1,
                    fragment: n.fragment,
                    timeout: n.timeout,
                    scrollTo: !1
                };
                a ? (c(o[0], "pjax:start"), I = n, n.title && (document.title = n.title), c(o[0], "pjax:beforeReplace", {
                    contents: a,
                    state: n,
                    previousState: t
                }), o.html(a), c(o[0], "pjax:end")) : l(s),
                o[0].offsetHeight
            } else p(location.href)
        }
        R = !1
    }
    function m(e) {
        e && e.readyState < 4 && (e.onreadystatechange = D["default"].noop, e.abort())
    }
    function v() {
        return (new Date).getTime()
    }
    function g(e) {
        var t = e.clone();
        return t.find("script").each(function() {
            this.src || D["default"]._data(this, "globalEval", !1)
        }),
        [e.selector, t.contents()]
    }
    function y(e) {
        return e.search = e.search.replace(/([?&])(_pjax|_)=[^&]*/g, ""),
        e.href.replace(/\?($|#)/, "$1")
    }
    function b(e) {
        var t = document.createElement("a");
        return t.href = e,
        t
    }
    function w(e) {
        return e.href.replace(/#.*/, "")
    }
    function x(e, t) {
        return e && t ? t.container = e: t = D["default"].isPlainObject(e) ? e: {
            container: e
        },
        t.container && (t.container = E(t.container)),
        t
    }
    function E(e) {
        var t = D["default"](e);
        if (t.length) {
            if ("" !== t.selector && t.context === document) return t;
            if (t.attr("id")) return D["default"]("#" + t.attr("id"));
            throw new Error("cant get selector for pjax container!")
        }
        throw new Error("no pjax container for " + t.selector)
    }
    function T(e, t) {
        return e.filter(t).add(e.find(t))
    }
    function _(e) {
        return D["default"].parseHTML(e, document, !0)
    }
    function k(e, t, n) {
        var r = {},
        i = /<html/i.test(e),
        o = t.getResponseHeader("X-PJAX-URL");
        r.url = o ? y(b(o)) : n.requestUrl;
        var a = (t.getResponseHeader("Content-Type") || "").split(";", 1)[0].trim();
        if ("text/html" != a) return r;
        var s = void 0,
        u = void 0;
        if (i ? (s = D["default"](_(e.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])), u = D["default"](_(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]))) : s = u = D["default"](_(e)), 0 === u.length) return r;
        r.title = T(s, "title").last().text();
        var c = void 0;
        return n.fragment ? (c = "body" === n.fragment ? u: T(u, n.fragment).first(), c.length && (r.contents = "body" === n.fragment ? c: c.contents(), r.title || (r.title = c.attr("title") || c.data("title")))) : i || (r.contents = u),
        r.contents && (r.contents = r.contents.not(function() {
            return D["default"](this).is("title")
        }), r.contents.find("title").remove(), r.scripts = T(r.contents, "script[src]").remove(), r.contents = r.contents.not(r.scripts)),
        r.title && (r.title = D["default"].trim(r.title)),
        r
    }
    function C(e) {
        if (e) {
            var t = D["default"]("script[src]");
            e.each(function() {
                var e = this.src,
                n = t.filter(function() {
                    return this.src === e
                });
                if (!n.length) {
                    var r = document.createElement("script"),
                    i = D["default"](this).attr("type");
                    i && (r.type = i),
                    r.src = D["default"](this).attr("src"),
                    document.head.appendChild(r)
                }
            })
        }
    }
    function j(e, t) {
        z[e] = t,
        B.push(e),
        L(U, 0),
        L(B, P)
    }
    function S(e, t, n) {
        var r = void 0,
        i = void 0;
        z[t] = n,
        "forward" === e ? (r = B, i = U) : (r = U, i = B),
        r.push(t),
        t = i.pop(),
        t && delete z[t],
        L(r, P)
    }
    function L(e, t) {
        for (; e.length > t;) delete z[e.shift()]
    }
    function O() {
        return D["default"]("meta").filter(function() {
            var e = D["default"](this).attr("http-equiv");
            return e && "X-PJAX-VERSION" === e.toUpperCase()
        }).attr("content")
    }
    function N() {
        return I
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.click = s,
    e.submit = u,
    e["default"] = l,
    e.fetch = f,
    e.reload = d,
    e.getState = N;
    var D = a(n),
    M = a(i),
    A = {
        timeout: 650,
        push: !0,
        replace: !1,
        type: "GET",
        dataType: "html",
        scrollTo: 0
    },
    P = 20,
    I = void 0,
    q = void 0,
    R = !0,
    F = window.location.href,
    H = window.history.state;
    H && H.container && (I = H),
    "state" in window.history && (R = !1);
    var z = {},
    U = [],
    B = [];
    D["default"](window).on("popstate.pjax", h)
}),
define("github/select-menu/loading", ["exports", "../jquery", "delegated-events", "../observe"],
function(e, t, n, r) {
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o(e, t) {
        u.set(e, t)
    }
    function a(e) {
        var t = e.currentTarget;
        t.classList.remove("js-load-contents"),
        t.classList.add("is-loading"),
        t.classList.remove("has-error");
        var r = s["default"].ajax({
            url: t.getAttribute("data-contents-url"),
            data: u.get(t)
        });
        r.then(function(e) {
            t.classList.remove("is-loading"),
            t.querySelector(".js-select-menu-deferred-content").innerHTML = e,
            t.classList.contains("active") && n.fire(t, "selectmenu:load")
        },
        function() {
            t.classList.remove("is-loading"),
            t.classList.add("has-error")
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.setLoadingData = o;
    var s = i(t),
    u = new WeakMap;
    r.observe(".js-select-menu.js-load-contents", {
        add: function() {
            s["default"](this).on("mouseenter", a),
            s["default"](this).on("menu:activate", a)
        },
        remove: function() {
            s["default"](this).off("mouseenter", a),
            s["default"](this).off("menu:activate", a)
        }
    })
}),
define("github/sliding-promise-queue", ["exports"],
function(e) {
    function t(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function n() {}
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n),
            r && e(t, r),
            t
        }
    } (),
    i = function() {
        function e() {
            t(this, e),
            this.previousReceiver = {}
        }
        return r(e, [{
            key: "push",
            value: function(e) {
                var t = this;
                return this.previousReceiver.resolve = this.previousReceiver.reject = n,
                new Promise(function(n, r) {
                    var i = {
                        resolve: n,
                        reject: r
                    };
                    t.previousReceiver = i,
                    e.then(function() {
                        i.resolve.apply(this, arguments)
                    },
                    function() {
                        i.reject.apply(this, arguments)
                    })
                })
            }
        }]),
        e
    } ();
    e["default"] = i
}),
define("github/sudo", ["exports", "./fetch", "./jquery", "delegated-events"],
function(e, t, n, r) {
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function o() {
        var e, n;
        return regeneratorRuntime.async(function(r) {
            for (;;) switch (r.prev = r.next) {
            case 0:
                if (e = document.querySelector("link[rel=sudo-modal]"), !document.getElementById("js-sudo-prompt")) {
                    r.next = 5;
                    break
                }
                return r.abrupt("return");
            case 5:
                if (!e) {
                    r.next = 12;
                    break
                }
                return r.next = 8,
                regeneratorRuntime.awrap(t.fetchSafeDocumentFragment(document, e.href));
            case 8:
                n = r.sent,
                document.body.appendChild(n),
                r.next = 13;
                break;
            case 12:
                throw new Error("couldn't load sudo facebox");
            case 13:
            case "end":
                return r.stop()
            }
        },
        null, this)
    }
    function a() {
        return new Promise(function(e) {
            u["default"](document).one("facebox:afterClose", e)
        })
    }
    function s() {
        var e, t, n;
        return regeneratorRuntime.async(function(i) {
            for (;;) switch (i.prev = i.next) {
            case 0:
                return i.next = 2,
                regeneratorRuntime.awrap(o());
            case 2:
                return i.next = 4,
                regeneratorRuntime.awrap(u["default"].facebox({
                    div: "#js-sudo-prompt"
                },
                "sudo"));
            case 4:
                return e = i.sent,
                t = null,
                n = e.querySelector(".js-sudo-form"),
                n.querySelector(".js-sudo-login, .js-sudo-password").focus(),
                u["default"](n).on("ajaxSuccess",
                function() {
                    t = !0,
                    r.fire(document, "facebox:close")
                }),
                u["default"](n).on("ajaxError",
                function() {
                    return t = !1,
                    n.querySelector(".js-sudo-error").textContent = "Incorrect Password.",
                    n.querySelector(".js-sudo-error").style.display = "block",
                    n.querySelector(".js-sudo-password").value = "",
                    !1
                }),
                i.next = 12,
                regeneratorRuntime.awrap(a());
            case 12:
                if (t) {
                    i.next = 14;
                    break
                }
                throw new Error("sudo prompt canceled");
            case 14:
            case "end":
                return i.stop()
            }
        },
        null, this)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var u = i(n);
    e["default"] = function() {
        var e;
        return regeneratorRuntime.async(function(n) {
            for (;;) switch (n.prev = n.next) {
            case 0:
                return n.next = 2,
                regeneratorRuntime.awrap(t.fetchJSON("/sessions/in_sudo.json"));
            case 2:
                if (e = n.sent) {
                    n.next = 6;
                    break
                }
                return n.next = 6,
                regeneratorRuntime.awrap(s());
            case 6:
            case "end":
                return n.stop()
            }
        },
        null, this)
    }
}),
define("frameworks-bootstrap", ["./github/failbot", "./github/jquery-event-error-context", "./github/debounce", "./github/document-ready", "./github/feature-detection", "./github/fetch", "./github/fragment-target", "./github/google-analytics", "./github/hash-change", "./github/inflector", "./github/locale", "./github/normalized-event-timestamp", "./github/number-helpers", "./github/pjax", "./github/select-menu/loading", "./github/sliding-promise-queue", "./github/sudo"],
function() {}),
require("frameworks-bootstrap");