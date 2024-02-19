/*!
 * domgameui - v1.0.0
 * By hocti
 * Compiled Mon, 19 Feb 2024 08:50:33 UTC
 *
 * domgameui is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */
var domgameui = function(exports, controlwrap2) {
  "use strict";
  function isUIChild(element) {
    return element && element.getParent && typeof element.getParent == "function";
  }
  function isUIParent(element) {
    return element && typeof element.getChildren == "function" && typeof element.captureAllInput == "function";
  }
  function isUIParentRoot(element) {
    return isUIParent(element) && !isUIChild(element);
  }
  function isUIChildRoof(element) {
    return !isUIParent(element) && isUIChild(element);
  }
  function isContainer(element) {
    return isUIParent(element) && isUIChild(element);
  }
  function isUISelectable(element) {
    return isUIChildRoof(element) && typeof element.unselectable == "boolean";
  }
  function nowSelectable(element) {
    return isUISelectable(element) ? !element.unselectable : isContainer(element) && element.cursorSelectable;
  }
  function isUIPanel(element) {
    return isUIParentRoot(element) && typeof element.clickBG2Close == "boolean";
  }
  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t$2 = globalThis, e$4 = t$2.ShadowRoot && (t$2.ShadyCSS === void 0 || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$3 = Symbol(), o$3 = /* @__PURE__ */ new WeakMap();
  let n$3 = class {
    constructor(t2, e2, o2) {
      if (this._$cssResult$ = !0, o2 !== s$3)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t2, this.t = e2;
    }
    get styleSheet() {
      let t2 = this.o;
      const s2 = this.t;
      if (e$4 && t2 === void 0) {
        const e2 = s2 !== void 0 && s2.length === 1;
        e2 && (t2 = o$3.get(s2)), t2 === void 0 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$3.set(s2, t2));
      }
      return t2;
    }
    toString() {
      return this.cssText;
    }
  };
  const r$5 = (t2) => new n$3(typeof t2 == "string" ? t2 : t2 + "", void 0, s$3), i$2 = (t2, ...e2) => {
    const o2 = t2.length === 1 ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
      if (t3._$cssResult$ === !0)
        return t3.cssText;
      if (typeof t3 == "number")
        return t3;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s2) + t2[o3 + 1], t2[0]);
    return new n$3(o2, t2, s$3);
  }, S$1 = (s2, o2) => {
    if (e$4)
      s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
    else
      for (const e2 of o2) {
        const o3 = document.createElement("style"), n2 = t$2.litNonce;
        n2 !== void 0 && o3.setAttribute("nonce", n2), o3.textContent = e2.cssText, s2.appendChild(o3);
      }
  }, c$2 = e$4 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
    let e2 = "";
    for (const s2 of t3.cssRules)
      e2 += s2.cssText;
    return r$5(e2);
  })(t2) : t2;
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const { is: i$1, defineProperty: e$3, getOwnPropertyDescriptor: r$4, getOwnPropertyNames: h$2, getOwnPropertySymbols: o$2, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$2 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
    switch (s2) {
      case Boolean:
        t2 = t2 ? l$2 : null;
        break;
      case Object:
      case Array:
        t2 = t2 == null ? t2 : JSON.stringify(t2);
    }
    return t2;
  }, fromAttribute(t2, s2) {
    let i2 = t2;
    switch (s2) {
      case Boolean:
        i2 = t2 !== null;
        break;
      case Number:
        i2 = t2 === null ? null : Number(t2);
        break;
      case Object:
      case Array:
        try {
          i2 = JSON.parse(t2);
        } catch {
          i2 = null;
        }
    }
    return i2;
  } }, f$1 = (t2, s2) => !i$1(t2, s2), y$1 = { attribute: !0, type: String, converter: u$1, reflect: !1, hasChanged: f$1 };
  Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
  class b extends HTMLElement {
    static addInitializer(t2) {
      this._$Ei(), (this.l ?? (this.l = [])).push(t2);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t2, s2 = y$1) {
      if (s2.state && (s2.attribute = !1), this._$Ei(), this.elementProperties.set(t2, s2), !s2.noAccessor) {
        const i2 = Symbol(), r2 = this.getPropertyDescriptor(t2, i2, s2);
        r2 !== void 0 && e$3(this.prototype, t2, r2);
      }
    }
    static getPropertyDescriptor(t2, s2, i2) {
      const { get: e2, set: h2 } = r$4(this.prototype, t2) ?? { get() {
        return this[s2];
      }, set(t3) {
        this[s2] = t3;
      } };
      return { get() {
        return e2?.call(this);
      }, set(s3) {
        const r2 = e2?.call(this);
        h2.call(this, s3), this.requestUpdate(t2, r2, i2);
      }, configurable: !0, enumerable: !0 };
    }
    static getPropertyOptions(t2) {
      return this.elementProperties.get(t2) ?? y$1;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d$1("elementProperties")))
        return;
      const t2 = n$2(this);
      t2.finalize(), t2.l !== void 0 && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d$1("finalized")))
        return;
      if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
        const t3 = this.properties, s2 = [...h$2(t3), ...o$2(t3)];
        for (const i2 of s2)
          this.createProperty(i2, t3[i2]);
      }
      const t2 = this[Symbol.metadata];
      if (t2 !== null) {
        const s2 = litPropertyMetadata.get(t2);
        if (s2 !== void 0)
          for (const [t3, i2] of s2)
            this.elementProperties.set(t3, i2);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t3, s2] of this.elementProperties) {
        const i2 = this._$Eu(t3, s2);
        i2 !== void 0 && this._$Eh.set(i2, t3);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s2) {
      const i2 = [];
      if (Array.isArray(s2)) {
        const e2 = new Set(s2.flat(1 / 0).reverse());
        for (const s3 of e2)
          i2.unshift(c$2(s3));
      } else
        s2 !== void 0 && i2.push(c$2(s2));
      return i2;
    }
    static _$Eu(t2, s2) {
      const i2 = s2.attribute;
      return i2 === !1 ? void 0 : typeof i2 == "string" ? i2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$Eg = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$ES(), this.requestUpdate(), this.constructor.l?.forEach((t2) => t2(this));
    }
    addController(t2) {
      (this._$E_ ?? (this._$E_ = /* @__PURE__ */ new Set())).add(t2), this.renderRoot !== void 0 && this.isConnected && t2.hostConnected?.();
    }
    removeController(t2) {
      this._$E_?.delete(t2);
    }
    _$ES() {
      const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
      for (const i2 of s2.keys())
        this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
      t2.size > 0 && (this._$Ep = t2);
    }
    createRenderRoot() {
      const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S$1(t2, this.constructor.elementStyles), t2;
    }
    connectedCallback() {
      this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$E_?.forEach((t2) => t2.hostConnected?.());
    }
    enableUpdating(t2) {
    }
    disconnectedCallback() {
      this._$E_?.forEach((t2) => t2.hostDisconnected?.());
    }
    attributeChangedCallback(t2, s2, i2) {
      this._$AK(t2, i2);
    }
    _$EO(t2, s2) {
      const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
      if (e2 !== void 0 && i2.reflect === !0) {
        const r2 = (i2.converter?.toAttribute !== void 0 ? i2.converter : u$1).toAttribute(s2, i2.type);
        this._$Em = t2, r2 == null ? this.removeAttribute(e2) : this.setAttribute(e2, r2), this._$Em = null;
      }
    }
    _$AK(t2, s2) {
      const i2 = this.constructor, e2 = i2._$Eh.get(t2);
      if (e2 !== void 0 && this._$Em !== e2) {
        const t3 = i2.getPropertyOptions(e2), r2 = typeof t3.converter == "function" ? { fromAttribute: t3.converter } : t3.converter?.fromAttribute !== void 0 ? t3.converter : u$1;
        this._$Em = e2, this[e2] = r2.fromAttribute(s2, t3.type), this._$Em = null;
      }
    }
    requestUpdate(t2, s2, i2, e2 = !1, r2) {
      if (t2 !== void 0) {
        if (i2 ?? (i2 = this.constructor.getPropertyOptions(t2)), !(i2.hasChanged ?? f$1)(e2 ? r2 : this[t2], s2))
          return;
        this.C(t2, s2, i2);
      }
      this.isUpdatePending === !1 && (this._$Eg = this._$EP());
    }
    C(t2, s2, i2) {
      this._$AL.has(t2) || this._$AL.set(t2, s2), i2.reflect === !0 && this._$Em !== t2 && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t2);
    }
    async _$EP() {
      this.isUpdatePending = !0;
      try {
        await this._$Eg;
      } catch (t3) {
        Promise.reject(t3);
      }
      const t2 = this.scheduleUpdate();
      return t2 != null && await t2, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending)
        return;
      if (!this.hasUpdated) {
        if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
          for (const [t4, s3] of this._$Ep)
            this[t4] = s3;
          this._$Ep = void 0;
        }
        const t3 = this.constructor.elementProperties;
        if (t3.size > 0)
          for (const [s3, i2] of t3)
            i2.wrapped !== !0 || this._$AL.has(s3) || this[s3] === void 0 || this.C(s3, this[s3], i2);
      }
      let t2 = !1;
      const s2 = this._$AL;
      try {
        t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), this._$E_?.forEach((t3) => t3.hostUpdate?.()), this.update(s2)) : this._$ET();
      } catch (s3) {
        throw t2 = !1, this._$ET(), s3;
      }
      t2 && this._$AE(s2);
    }
    willUpdate(t2) {
    }
    _$AE(t2) {
      this._$E_?.forEach((t3) => t3.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t2)), this.updated(t2);
    }
    _$ET() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$Eg;
    }
    shouldUpdate(t2) {
      return !0;
    }
    update(t2) {
      this._$Ej && (this._$Ej = this._$Ej.forEach((t3) => this._$EO(t3, this[t3]))), this._$ET();
    }
    updated(t2) {
    }
    firstUpdated(t2) {
    }
  }
  b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d$1("elementProperties")] = /* @__PURE__ */ new Map(), b[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1?.({ ReactiveElement: b }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.0.2");
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t$1 = globalThis, i = t$1.trustedTypes, s$2 = i ? i.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$2 = "$lit$", h$1 = `lit$${(Math.random() + "").slice(9)}$`, o$1 = "?" + h$1, n$1 = `<${o$1}>`, r$3 = document, l$1 = () => r$3.createComment(""), c = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function", a = Array.isArray, u = (t2) => a(t2) || typeof t2?.[Symbol.iterator] == "function", d = `[ 	
\f\r]`, f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, _ = />/g, m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, y = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), x = y(1), w$1 = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), A = /* @__PURE__ */ new WeakMap(), E = r$3.createTreeWalker(r$3, 129);
  function C(t2, i2) {
    if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return s$2 !== void 0 ? s$2.createHTML(i2) : i2;
  }
  const P = (t2, i2) => {
    const s2 = t2.length - 1, o2 = [];
    let r2, l2 = i2 === 2 ? "<svg>" : "", c2 = f;
    for (let i3 = 0; i3 < s2; i3++) {
      const s3 = t2[i3];
      let a2, u2, d2 = -1, y2 = 0;
      for (; y2 < s3.length && (c2.lastIndex = y2, u2 = c2.exec(s3), u2 !== null); )
        y2 = c2.lastIndex, c2 === f ? u2[1] === "!--" ? c2 = v : u2[1] !== void 0 ? c2 = _ : u2[2] !== void 0 ? ($.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m) : u2[3] !== void 0 && (c2 = m) : c2 === m ? u2[0] === ">" ? (c2 = r2 ?? f, d2 = -1) : u2[1] === void 0 ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = u2[3] === void 0 ? m : u2[3] === '"' ? g : p) : c2 === g || c2 === p ? c2 = m : c2 === v || c2 === _ ? c2 = f : (c2 = m, r2 = void 0);
      const x2 = c2 === m && t2[i3 + 1].startsWith("/>") ? " " : "";
      l2 += c2 === f ? s3 + n$1 : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e$2 + s3.slice(d2) + h$1 + x2) : s3 + h$1 + (d2 === -2 ? i3 : x2);
    }
    return [C(t2, l2 + (t2[s2] || "<?>") + (i2 === 2 ? "</svg>" : "")), o2];
  };
  class V {
    constructor({ strings: t2, _$litType$: s2 }, n2) {
      let r2;
      this.parts = [];
      let c2 = 0, a2 = 0;
      const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = P(t2, s2);
      if (this.el = V.createElement(f2, n2), E.currentNode = this.el.content, s2 === 2) {
        const t3 = this.el.content.firstChild;
        t3.replaceWith(...t3.childNodes);
      }
      for (; (r2 = E.nextNode()) !== null && d2.length < u2; ) {
        if (r2.nodeType === 1) {
          if (r2.hasAttributes())
            for (const t3 of r2.getAttributeNames())
              if (t3.endsWith(e$2)) {
                const i2 = v2[a2++], s3 = r2.getAttribute(t3).split(h$1), e2 = /([.?@])?(.*)/.exec(i2);
                d2.push({ type: 1, index: c2, name: e2[2], strings: s3, ctor: e2[1] === "." ? k : e2[1] === "?" ? H : e2[1] === "@" ? I : R }), r2.removeAttribute(t3);
              } else
                t3.startsWith(h$1) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
          if ($.test(r2.tagName)) {
            const t3 = r2.textContent.split(h$1), s3 = t3.length - 1;
            if (s3 > 0) {
              r2.textContent = i ? i.emptyScript : "";
              for (let i2 = 0; i2 < s3; i2++)
                r2.append(t3[i2], l$1()), E.nextNode(), d2.push({ type: 2, index: ++c2 });
              r2.append(t3[s3], l$1());
            }
          }
        } else if (r2.nodeType === 8)
          if (r2.data === o$1)
            d2.push({ type: 2, index: c2 });
          else {
            let t3 = -1;
            for (; (t3 = r2.data.indexOf(h$1, t3 + 1)) !== -1; )
              d2.push({ type: 7, index: c2 }), t3 += h$1.length - 1;
          }
        c2++;
      }
    }
    static createElement(t2, i2) {
      const s2 = r$3.createElement("template");
      return s2.innerHTML = t2, s2;
    }
  }
  function N(t2, i2, s2 = t2, e2) {
    if (i2 === w$1)
      return i2;
    let h2 = e2 !== void 0 ? s2._$Co?.[e2] : s2._$Cl;
    const o2 = c(i2) ? void 0 : i2._$litDirective$;
    return h2?.constructor !== o2 && (h2?._$AO?.(!1), o2 === void 0 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), e2 !== void 0 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), h2 !== void 0 && (i2 = N(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
  }
  class S {
    constructor(t2, i2) {
      this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t2) {
      const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? r$3).importNode(i2, !0);
      E.currentNode = e2;
      let h2 = E.nextNode(), o2 = 0, n2 = 0, l2 = s2[0];
      for (; l2 !== void 0; ) {
        if (o2 === l2.index) {
          let i3;
          l2.type === 2 ? i3 = new M(h2, h2.nextSibling, this, t2) : l2.type === 1 ? i3 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : l2.type === 6 && (i3 = new L(h2, this, t2)), this._$AV.push(i3), l2 = s2[++n2];
        }
        o2 !== l2?.index && (h2 = E.nextNode(), o2++);
      }
      return E.currentNode = r$3, e2;
    }
    p(t2) {
      let i2 = 0;
      for (const s2 of this._$AV)
        s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
    }
  }
  class M {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t2, i2, s2, e2) {
      this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? !0;
    }
    get parentNode() {
      let t2 = this._$AA.parentNode;
      const i2 = this._$AM;
      return i2 !== void 0 && t2?.nodeType === 11 && (t2 = i2.parentNode), t2;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t2, i2 = this) {
      t2 = N(this, t2, i2), c(t2) ? t2 === T || t2 == null || t2 === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t2 !== this._$AH && t2 !== w$1 && this._(t2) : t2._$litType$ !== void 0 ? this.g(t2) : t2.nodeType !== void 0 ? this.$(t2) : u(t2) ? this.T(t2) : this._(t2);
    }
    k(t2) {
      return this._$AA.parentNode.insertBefore(t2, this._$AB);
    }
    $(t2) {
      this._$AH !== t2 && (this._$AR(), this._$AH = this.k(t2));
    }
    _(t2) {
      this._$AH !== T && c(this._$AH) ? this._$AA.nextSibling.data = t2 : this.$(r$3.createTextNode(t2)), this._$AH = t2;
    }
    g(t2) {
      const { values: i2, _$litType$: s2 } = t2, e2 = typeof s2 == "number" ? this._$AC(t2) : (s2.el === void 0 && (s2.el = V.createElement(C(s2.h, s2.h[0]), this.options)), s2);
      if (this._$AH?._$AD === e2)
        this._$AH.p(i2);
      else {
        const t3 = new S(e2, this), s3 = t3.u(this.options);
        t3.p(i2), this.$(s3), this._$AH = t3;
      }
    }
    _$AC(t2) {
      let i2 = A.get(t2.strings);
      return i2 === void 0 && A.set(t2.strings, i2 = new V(t2)), i2;
    }
    T(t2) {
      a(this._$AH) || (this._$AH = [], this._$AR());
      const i2 = this._$AH;
      let s2, e2 = 0;
      for (const h2 of t2)
        e2 === i2.length ? i2.push(s2 = new M(this.k(l$1()), this.k(l$1()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
      e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
    }
    _$AR(t2 = this._$AA.nextSibling, i2) {
      for (this._$AP?.(!1, !0, i2); t2 && t2 !== this._$AB; ) {
        const i3 = t2.nextSibling;
        t2.remove(), t2 = i3;
      }
    }
    setConnected(t2) {
      this._$AM === void 0 && (this._$Cv = t2, this._$AP?.(t2));
    }
  }
  class R {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t2, i2, s2, e2, h2) {
      this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T;
    }
    _$AI(t2, i2 = this, s2, e2) {
      const h2 = this.strings;
      let o2 = !1;
      if (h2 === void 0)
        t2 = N(this, t2, i2, 0), o2 = !c(t2) || t2 !== this._$AH && t2 !== w$1, o2 && (this._$AH = t2);
      else {
        const e3 = t2;
        let n2, r2;
        for (t2 = h2[0], n2 = 0; n2 < h2.length - 1; n2++)
          r2 = N(this, e3[s2 + n2], i2, n2), r2 === w$1 && (r2 = this._$AH[n2]), o2 || (o2 = !c(r2) || r2 !== this._$AH[n2]), r2 === T ? t2 = T : t2 !== T && (t2 += (r2 ?? "") + h2[n2 + 1]), this._$AH[n2] = r2;
      }
      o2 && !e2 && this.O(t2);
    }
    O(t2) {
      t2 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
    }
  }
  class k extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    O(t2) {
      this.element[this.name] = t2 === T ? void 0 : t2;
    }
  }
  class H extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    O(t2) {
      this.element.toggleAttribute(this.name, !!t2 && t2 !== T);
    }
  }
  class I extends R {
    constructor(t2, i2, s2, e2, h2) {
      super(t2, i2, s2, e2, h2), this.type = 5;
    }
    _$AI(t2, i2 = this) {
      if ((t2 = N(this, t2, i2, 0) ?? T) === w$1)
        return;
      const s2 = this._$AH, e2 = t2 === T && s2 !== T || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== T && (s2 === T || e2);
      e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
    }
    handleEvent(t2) {
      typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
    }
  }
  class L {
    constructor(t2, i2, s2) {
      this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t2) {
      N(this, t2);
    }
  }
  const Z = t$1.litHtmlPolyfillSupport;
  Z?.(V, M), (t$1.litHtmlVersions ?? (t$1.litHtmlVersions = [])).push("3.1.0");
  const j = (t2, i2, s2) => {
    const e2 = s2?.renderBefore ?? i2;
    let h2 = e2._$litPart$;
    if (h2 === void 0) {
      const t3 = s2?.renderBefore ?? null;
      e2._$litPart$ = h2 = new M(i2.insertBefore(l$1(), t3), t3, void 0, s2 ?? {});
    }
    return h2._$AI(t2), h2;
  };
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  let s$1 = class extends b {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var _a;
      const t2 = super.createRenderRoot();
      return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t2.firstChild), t2;
    }
    update(t2) {
      const i2 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = j(i2, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
      return w$1;
    }
  };
  s$1._$litElement$ = !0, s$1.finalized = !0, globalThis.litElementHydrateSupport?.({ LitElement: s$1 });
  const r$2 = globalThis.litElementPolyfillSupport;
  r$2?.({ LitElement: s$1 }), (globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.2");
  const clamp = function(value, min, max) {
    return Math.min(Math.max(value, min), max);
  };
  function delay(time = 1e3) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
  async function nextTick(fn) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fn(), resolve();
      }, 0);
    });
  }
  function anyPlayerPress(ips) {
    for (let k2 in ips.player)
      if (controlwrap2.YES(ips.player[k2]) || controlwrap2.PAUSE(ips.player[k2]))
        return parseInt(k2);
    return -1;
  }
  function anyPress(ips) {
    return controlwrap2.click(ips) ? controlwrap2.InputSource.mouse : controlwrap2.YES(ips.system) || controlwrap2.PAUSE(ips.system) ? controlwrap2.InputSource.system : anyPlayerPress(ips) >= 0 ? controlwrap2.InputSource.player : void 0;
  }
  function getRect(obj) {
    const rect = obj.getBoundingClientRect();
    return {
      y: rect.top + window.scrollY,
      x: rect.left + window.scrollX,
      w: rect.width,
      h: rect.height
    };
  }
  function deepEqual(obj1, obj2) {
    if (obj1 === obj2)
      return !0;
    if (typeof obj1 != "object" || typeof obj2 != "object" || obj1 == null || obj2 == null)
      return !1;
    let keys1 = Object.keys(obj1), keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length)
      return !1;
    for (let key of keys1)
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key]))
        return !1;
    return !0;
  }
  function removeElementWithIndex(array, index) {
    return index < 0 || index >= array.length ? array : array.slice(0, index).concat(array.slice(index + 1));
  }
  const s = (v2) => i$2`calc(${v2} * var(--rootS))`, l = (v2) => i$2`calc(${v2} * var(--rootL))`, w = (v2) => i$2`calc(${v2} / 100 * var(--rootWidth))`, h = (v2) => i$2`calc(${v2} / 100 * var(--rootHeight))`;
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t = (t2) => (e2, o2) => {
    o2 !== void 0 ? o2.addInitializer(() => {
      customElements.define(t2, e2);
    }) : customElements.define(t2, e2);
  };
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const o = { attribute: !0, type: String, converter: u$1, reflect: !1, hasChanged: f$1 }, r$1 = (t2 = o, e2, r2) => {
    const { kind: n2, metadata: i2 } = r2;
    let s2 = globalThis.litPropertyMetadata.get(i2);
    if (s2 === void 0 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), s2.set(r2.name, t2), n2 === "accessor") {
      const { name: o2 } = r2;
      return { set(r3) {
        const n3 = e2.get.call(this);
        e2.set.call(this, r3), this.requestUpdate(o2, n3, t2);
      }, init(e3) {
        return e3 !== void 0 && this.C(o2, void 0, t2), e3;
      } };
    }
    if (n2 === "setter") {
      const { name: o2 } = r2;
      return function(r3) {
        const n3 = this[o2];
        e2.call(this, r3), this.requestUpdate(o2, n3, t2);
      };
    }
    throw Error("Unsupported decorator location: " + n2);
  };
  function n(t2) {
    return (e2, o2) => typeof o2 == "object" ? r$1(t2, e2, o2) : ((t3, e3, o3) => {
      const r2 = e3.hasOwnProperty(o3);
      return e3.constructor.createProperty(o3, r2 ? { ...t3, wrapped: !0 } : t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
    })(t2, e2, o2);
  }
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  function r(r2) {
    return n({ ...r2, state: !0, attribute: !1 });
  }
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const e$1 = (e2, t2, c2) => (c2.configurable = !0, c2.enumerable = !0, Reflect.decorate && typeof t2 != "object" && Object.defineProperty(e2, t2, c2), c2);
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  function e(e2, r2) {
    return (n2, s2, i2) => {
      const o2 = (t2) => t2.renderRoot?.querySelector(e2) ?? null;
      if (r2) {
        const { get: e3, set: r3 } = typeof s2 == "object" ? n2 : i2 ?? (() => {
          const t2 = Symbol();
          return { get() {
            return this[t2];
          }, set(e4) {
            this[t2] = e4;
          } };
        })();
        return e$1(n2, s2, { get() {
          let t2 = e3.call(this);
          return t2 === void 0 && (t2 = o2(this), (t2 !== null || this.hasUpdated) && r3.call(this, t2)), t2;
        } });
      }
      return e$1(n2, s2, { get() {
        return o2(this);
      } });
    };
  }
  function getUIChildren(obj) {
    const result = [];
    obj.shadowRoot && obj.shadowRoot.childElementCount > 0 && result.push(...getUIChildren(obj.shadowRoot));
    for (let i2 = 0, t2 = obj.childElementCount; i2 < t2; i2++) {
      const child = obj.children[i2];
      if (isUIChild(child)) {
        const slotName = child.getAttribute("slot");
        if (slotName && obj.shadowRoot && !obj.shadowRoot.querySelector(`slot[name=${slotName}]`))
          continue;
        result.push(child);
      } else
        result.push(...getUIChildren(child));
    }
    return result;
  }
  function getParent(self) {
    let parent = self.parentElement;
    if (!parent && self.parentNode && self.parentNode.host && (parent = self.parentNode.host), parent) {
      if (isUIParent(parent))
        return parent;
    } else
      return;
    return getParent(parent);
  }
  function getRoot(self) {
    let parent = getParent(self);
    if (parent) {
      if (isUIParentRoot(parent))
        return parent;
    } else
      return;
    return getRoot(parent);
  }
  function setParentsCursorToMe(me) {
    const parent = me.getParent();
    parent && (parent.cursorChild !== me && parent.setCursor(me, !1), isUIChild(parent) && setParentsCursorToMe(parent));
  }
  var __defProp$c = Object.defineProperty, __getOwnPropDesc$c = Object.getOwnPropertyDescriptor, __decorateClass$c = (decorators, target, key, kind) => {
    for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target, i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      (decorator = decorators[i2]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
    return kind && result && __defProp$c(target, key, result), result;
  };
  const cacheInstance = /* @__PURE__ */ new Map();
  function getSingletonUI(classRef) {
    return cacheInstance.has(classRef.name) || cacheInstance.set(classRef.name, classRef.createInstance()), cacheInstance.get(classRef.name);
  }
  class UIBase extends s$1 {
    constructor() {
      super(), this._inAnimation = !1, this._isDisplay = !1, new IntersectionObserver((entries) => {
        this.requestUpdate();
      }, { threshold: 0.05 }).observe(this);
    }
    static makeName(tagname) {
      const basename = ("domui-" + tagname.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/_/g, "-")).replace(/-{2,}/g, "-");
      let name = basename;
      for (; customElements.get(name); )
        name = basename + "-" + Math.floor(Math.random() * 1e6);
      return name;
    }
    static createInstance() {
      return this.prepare(), document.createElement(this.eleName);
    }
    static prepare(eleName) {
      const targetName = eleName ?? this.name;
      if (this.initedNode.has(targetName))
        return;
      this.initedNode.add(targetName);
      const superElementName = Object.getPrototypeOf(this).eleName;
      if ((this.eleName === "" || this.eleName === superElementName) && (this.eleName = this.makeName(targetName)), customElements.get(this.eleName)) {
        console.log("defined!!", targetName, this.eleName, superElementName);
        return;
      }
      customElements.define(
        this.eleName,
        this
      );
    }
    renderCore() {
      return x`<slot></slot>`;
    }
    renderWrap(content) {
      return content;
    }
    render() {
      return this.constructor.hasOwnProperty("tempCss") || this.constructor.useTempCss ? x`<style>${this.constructor.tempCss}</style>${this.renderWrap(this.renderCore())}` : this.renderWrap(this.renderCore());
    }
    show() {
      this.style.display = "block", this._isDisplay = !0;
    }
    hide() {
      this.style.display = "none", this._isDisplay = !1;
    }
    async enterAni() {
      this.show();
    }
    async suspend() {
      this.hide();
    }
    async resume() {
      this.show();
    }
    async exitAni() {
      this.hide(), this.constructor.suspendOnExit || this.destory();
    }
    destory() {
      this.parentNode && this.parentNode.removeChild(this), this.remove();
    }
    inAnimation() {
      return this._inAnimation;
    }
    //@property({type:Boolean})
    //display:boolean=false;
    isDisplay() {
      return this._isDisplay;
    }
  }
  UIBase.styles = [i$2`
    :host {
        display:block;
        box-sizing:border-box;
    }
    `], UIBase.useTempCss = !1, UIBase.eleName = "", UIBase.initedNode = /* @__PURE__ */ new Set(), //================================================================================
  UIBase.suspendOnExit = !1;
  class UIInteractiveBase extends UIBase {
    constructor() {
      super(...arguments), this.unselectable = !1;
    }
    captureInput(ip) {
      return !1;
    }
  }
  __decorateClass$c([
    n({ type: Boolean })
  ], UIInteractiveBase.prototype, "unselectable", 2);
  class UIChildBase extends UIInteractiveBase {
    //button,Container
    getParent() {
      return getParent(this);
    }
    getRoot() {
      return getRoot(this);
    }
    setParentsCursorToMe() {
      return setParentsCursorToMe(this);
    }
  }
  var __getProtoOf$6 = Object.getPrototypeOf, __reflectGet$6 = Reflect.get, __superGet$6 = (cls, obj, key) => __reflectGet$6(__getProtoOf$6(cls), key, obj);
  const styled = (name, styles, superclass = UIBase) => {
    var _a;
    const ele = (_a = class extends superclass {
    }, _a.eleName = name, _a.styles = [...__superGet$6(_a, _a, "styles") ? [__superGet$6(_a, _a, "styles")] : [], styles], _a);
    return ele.prepare(name), ele;
  }, fullScreenCSS = i$2`
display: block;
position:absolute;
width:100%;
height:100%;
top:0;
left:0;
`, centerCSS = i$2`
position:absolute;
left:50%;
top:50%;
transform:translate(-50%,-50%);
`, flexCenterCSS = i$2`
display: flex;
justify-content: center;
align-items: center;
`, Layer = styled("domui-layer", i$2`
:host {
    ${fullScreenCSS}
    pointer-events:none;
}
:host * {
    pointer-events:auto;
}
:slotted(*) {
    pointer-events:auto;
}
:host([noninteractive]) {
    pointer-events:none !important;
}
`);
  /*!
   * update-log - v1.1.0
   * By hocti
   * Compiled Tue, 30 Jan 2024 04:44:47 UTC
   *
   * update-log is licensed under the MIT license.
   * http://www.opensource.org/licenses/mit-license
   */
  const values = {}, updater = document.createElement("div");
  updater.style.position = "fixed", updater.style.top = "0", updater.style.left = "0", updater.style.zIndex = "9999", updater.style.color = "blue", updater.style.background = "rgba(255,255,255,0.7)";
  const update = (key, value) => {
    values[key] = value, renewTable();
  }, renewTable = () => {
    updater.innerHTML = `
    <table>
        <tr>
            <th>key</th>
            <th>value</th>
        </tr>
        ${Object.keys(values).map((key) => `
            <tr>
                <td>${key}</td>
                <td>${values[key]}</td>
            </tr>
        `).join("")}
    </table>
    `;
  }, show = (_root) => {
    _root && _root.appendChild(updater), updater.style.display = "block";
  };
  var __defProp$b = Object.defineProperty, __getOwnPropDesc$b = Object.getOwnPropertyDescriptor, __decorateClass$b = (decorators, target, key, kind) => {
    for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target, i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      (decorator = decorators[i2]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
    return kind && result && __defProp$b(target, key, result), result;
  };
  let RootScreen = class extends s$1 {
    render() {
      return x`<slot></slot>`;
    }
  };
  RootScreen.styles = [
    i$2`
        :host{
            ${fullScreenCSS}
            overflow:hidden;
            user-select: none;
        }
        :host(.hideMouse){
            cursor: none;
        }
        `
  ], RootScreen = __decorateClass$b([
    t("root-screen")
  ], RootScreen);
  const layerNames = ["bg", "game", "main", "panel", "fg"];
  class UIMaster extends EventTarget {
    constructor(_div) {
      super(), this.layers = {}, this.lastSize = { w: 0, h: 0 }, this._fontsize = 12, this.minRatio = 1.25, this.maxRatio = 3.5555555555555554, this.minWidth = 1280, this.minHeight = 720, this.fontSizeOnMin = 12, this.scaleAble = !0, this.fixSize = !1, this.hideMouseWhenKeyPress = !0, this.activePanels = [], this.breadCrumb = [], this._div = _div, this._div.style.overflow = "hidden", window.addEventListener("resize", this.onReisze.bind(this)), this.onReisze(), setTimeout(this.onReisze.bind(this), 0), j(x`<root-screen>
            <domui-layer name="bg" noninteractive></domui-layer>
            <domui-layer name="game"></domui-layer>
            <domui-layer name="main"></domui-layer>
            <domui-layer name="panel"></domui-layer>
            <domui-layer name="fg" noninteractive></domui-layer>
        </root-screen>`, this._div), this.rootElement = this._div.getElementsByTagName("root-screen")[0];
      for (const name of layerNames)
        this.layers[name] = this.rootElement.querySelector(`domui-layer[name="${name}"]`);
      controlwrap2.ControlWrap.getInstance().addListener("changeLastInputIndex", this.changeInputType), this.rootElement.addEventListener("mousedown", this.mouseChange.bind(this)), this.rootElement.addEventListener("mousemove", this.mouseChange.bind(this)), show(this._div);
    }
    static getInstance() {
      return UIMaster._instance;
    }
    static init(div) {
      return UIMaster._instance = new UIMaster(div), exports.MI = UIMaster.getInstance(), UIMaster._instance;
    }
    get width() {
      return this.lastSize.w;
    }
    get height() {
      return this.lastSize.h;
    }
    get shortSide() {
      return Math.min(this.lastSize.h, this.lastSize.w);
    }
    get fontSize() {
      return this._fontsize;
    }
    onReisze(e2) {
      if (this.fixSize)
        return;
      const rawRatio = this._div.clientWidth / this._div.clientHeight;
      let newWidth = this._div.clientWidth, newHeight = this._div.clientHeight, newRatio = rawRatio;
      rawRatio < this.minRatio ? (newRatio = this.minRatio, newHeight = newWidth / newRatio) : rawRatio > this.maxRatio && (newRatio = this.maxRatio, newWidth = newHeight * newRatio);
      const scale = Math.min(1, newWidth / this.minWidth, newHeight / this.minHeight);
      scale < 1 && (newWidth /= scale, newHeight /= scale), this.innerSetSize(Math.floor(newWidth), Math.floor(newHeight), scale);
    }
    setSize(w2 = 1280, h2 = 720, scale = 1) {
      this.fixSize = !0, this.innerSetSize(Math.max(this.minWidth, w2), Math.max(this.minHeight, h2), scale);
    }
    innerSetSize(newWidth, newHeight, scale = 1) {
      this._fontsize = Math.min(newWidth / this.minWidth, newHeight / this.minHeight) * this.fontSizeOnMin, this.rootElement && (this.rootElement.style.setProperty("--rootWidth", newWidth + "px"), this.rootElement.style.setProperty("--rootHeight", newHeight + "px"), this.rootElement.style.setProperty("--rootS", Math.min(newHeight, newWidth) / 100 + "px"), this.rootElement.style.setProperty("--rootL", Math.max(newHeight, newWidth) / 100 + "px"), this.rootElement.style.setProperty("--rootFontsize", this._fontsize + "px"), this.rootElement.style.fontSize = this._fontsize + "px", this.rootElement.style.width = newWidth + "px", this.rootElement.style.height = newHeight + "px", scale !== 1 ? (this.rootElement.style.scale = scale.toString(), this.rootElement.style.transformOrigin = "top left") : (this.rootElement.style.scale = "", this.rootElement.style.transformOrigin = ""), this.rootElement.style.left = Math.round((this._div.clientWidth - newWidth * scale) / 2) + "px", this.rootElement.style.top = Math.round((this._div.clientHeight - newHeight * scale) / 2) + "px"), (this.lastSize.w != newWidth || this.lastSize.h != newHeight) && (this.dispatchEvent(new CustomEvent("resize", { detail: {
        oldWidth: this.lastSize.w,
        oldHeight: this.lastSize.h,
        newWidth,
        newHeight,
        fontSize: this._fontsize
      } })), this.lastSize.w = newWidth, this.lastSize.h = newHeight);
    }
    frameUpdate(inputs) {
      if (this.activeGame && this.activeUI === this.activeGame)
        this.activeGame.captureAllInput(inputs);
      else if (!deepEqual(inputs, this.lastInputs)) {
        if (inputs.ui.ui_tap.length > 0 && this.hideMouseWhenKeyPress && this.rootElement.classList.add("hideMouse"), this.activeComponent) {
          let target = this.activeComponent, captured = target.captureInput(inputs.ui);
          for (; !captured; ) {
            const parent = target.getParent();
            if (parent && isUIChild(parent))
              target = parent, captured = target.captureInput(inputs.ui);
            else
              break;
          }
          if (captured)
            return;
        } else if (this.activeUI && inputs.ui.ui_tap.length > 0 && this.activeUI.findAndActiveFirstSelectable(), this.activeChild) {
          let captured = this.activeChild.captureInput(inputs.ui), target = this.activeChild;
          for (; !captured; ) {
            const parent = target.getParent();
            if (parent && isUIChild(parent))
              target = parent, captured = target.captureInput(inputs.ui);
            else
              break;
          }
          if (captured)
            return;
        }
        this.activeUI && (this.activeUI.captureAllInput(inputs), this.activeUI.captureInput(inputs.ui)), this.lastInputs = inputs;
      }
    }
    changeInputType(e2) {
      console.log("changeInputType", e2.buttonLayout);
    }
    mouseChange(e2) {
      this.hideMouseWhenKeyPress && this.rootElement.classList.remove("hideMouse");
    }
    //================================================================
    async showMain(ui) {
      ui !== this.activeMain && (await this.closeMain(), await this.appendMain(ui));
    }
    async closeMain() {
      this.activeMain && await this.activeMain.suspend(), this.activeMain = void 0;
    }
    async appendMain(ui) {
      this.activeMain = ui, ui && (this.layers.main.appendChild(ui), this.setActiveUI(ui), await ui.enterAni());
    }
    async showBG(ui) {
      if (this.activeBG && await this.activeBG.exitAni(), this.activeBG = ui, ui)
        return this.layers.bg.appendChild(ui), ui.enterAni();
    }
    async showFG(ui) {
      if (this.activeFG && await this.activeFG.exitAni(), this.activeFG = ui, ui)
        return this.layers.fg.appendChild(ui), ui.enterAni();
    }
    async showPanel(panel) {
      if (this.activePanels.indexOf(panel) >= 0)
        throw new Error("panel already exist");
      this.activePanels.push(panel), this.layers.panel.appendChild(panel), this.setActiveUI(panel), await panel.enterAni();
    }
    async closedPanel(panel) {
      const id = this.activePanels.indexOf(panel);
      id == this.activePanels.length - 1 ? this.activePanels.pop() : id !== -1 && (this.activePanels = removeElementWithIndex(this.activePanels, id)), this.activeUI === panel && this.findActiveUI();
    }
    async closeAllPanel() {
      await Promise.all(this.activePanels.map((panel) => panel.close())), this.findActiveUI();
    }
    async closeLastPanel() {
      this.activePanels.length > 0 && await this.activePanels.pop().close(), this.findActiveUI();
    }
    async next(ui) {
      this.breadCrumb.push(this.activeUI), await this.activeUI?.suspend(), this.setActiveUI(ui), isUIParent(ui) ? this.showPanel(ui) : this.appendMain(ui), await ui.enterAni();
    }
    async back() {
      this.breadCrumb.length == 0 || !this.activeUI || (await this.activeUI?.exitAni(), this.breadCrumb.length > 0 ? this.setActiveUI(this.breadCrumb.pop()) : this.setActiveUI(this.activeMain), await this.activeUI?.resume());
    }
    //================================================================
    findActiveUI() {
      this.activePanels.length > 0 ? this.setActiveUI(this.activePanels[this.activePanels.length - 1]) : this.activeMain ? this.setActiveUI(this.activeMain) : console.error("no activeUI");
    }
    setActiveUI(ui) {
      this.activeUI && this.activeUI != ui && this.activeUI.classList.add("nonActive"), this.setActiveComponent(void 0), this.activeUI = ui, this.activeUI.classList.remove("nonActive"), update("setActiveUI", ui.tagName);
      const result = this.activeUI.findAndActiveFirstSelectable();
      this.setActiveComponent(result);
    }
    setActiveChild() {
      setTimeout(() => {
        if (!this.activeUI) {
          this.activeChild = void 0, update("activeChild", this.activeChild);
          return;
        }
        if (!this.activeChild && this.activeUI.cursorChild && isUIParent(this.activeUI.cursorChild)) {
          let currChild = this.activeUI.cursorChild;
          for (; currChild.cursorChild && isUIParent(currChild.cursorChild); )
            currChild = currChild.cursorChild;
          this.activeChild = currChild, console.log("setActiveUI4", this.activeChild), update("activeChild", this.activeChild);
          return;
        }
        this.activeChild = void 0, update("activeChild", this.activeChild);
      });
    }
    setActiveComponent(com) {
      if (this.activeComponent === com)
        return !0;
      if (this.activeComponent && (this.activeComponent.active = !1), !com || com.isConnected === !1)
        return this.activeComponent = void 0, update("activeComponent", void 0), this.setActiveChild(), !0;
      const comRoot = com.getRoot();
      if (!this.activeUI)
        this.activeUI = comRoot;
      else if (this.activeUI != comRoot)
        return !1;
      return this.activeComponent = com, update("activeComponent", com.tagName + "," + com.innerHTML), !0;
    }
    removeIfActive(com) {
      this.activeChild === com && (this.activeChild = void 0), this.activeComponent === com && this.setActiveComponent(void 0), isUIParent(com) && com.getChildren().forEach((child) => {
        this.removeIfActive(child);
      }), com.isConnected || com.destory();
    }
  }
  exports.MI = UIMaster.getInstance();
  class UIBG extends UIBase {
  }
  UIBG.styles = [
    i$2`
    :host {
        ${fullScreenCSS}
        pointer-events:none;
    }`
  ];
  var __getProtoOf$5 = Object.getPrototypeOf, __reflectGet$5 = Reflect.get, __superGet$5 = (cls, obj, key) => __reflectGet$5(__getProtoOf$5(cls), key, obj);
  class UIParentBase extends UIInteractiveBase {
    constructor() {
      super(...arguments), this.uiChildren = [], this.cursorSelectable = !1, this.cursorIndex = -1, this.loopCursor = !1, this.bindedButton = /* @__PURE__ */ new Map();
    }
    //================================================
    /*
    protected shouldUpdate(changedProperties: Map<string | number | symbol, unknown>): boolean {
        if (changedProperties.has('cursorIndex') && changedProperties.size === 1) {
            return false;
        }
        return super.shouldUpdate(changedProperties);
    }
    */
    //================================================
    getChildren(renew = !1) {
      return renew && (this.uiChildren = getUIChildren(this)), this.uiChildren;
    }
    updated(_changedProperties) {
      super.updated(_changedProperties);
      const oldChildren = [...this.uiChildren];
      if (this.getChildren(!0), oldChildren.length !== this.uiChildren.length) {
        this.requestUpdate();
        return;
      }
      for (let i2 = 0, t2 = this.uiChildren.length; i2 < t2; i2++)
        if (oldChildren[i2] !== this.uiChildren[i2]) {
          this.requestUpdate();
          return;
        }
      this.cursorChild && this.uiChildren.indexOf(this.cursorChild) == -1 && (exports.MI.removeIfActive(this.cursorChild), this.setCursor(void 0)), setTimeout(() => {
        this.autoFindCursor();
      });
    }
    setCursor(com, autoActive = !0) {
      this.cursorChild = com, com ? (this.cursorIndex = this.uiChildren.indexOf(com), isUISelectable(com) ? autoActive && (com.active = !0) : isUIParent(com) && (com.autoFindCursor(), autoActive && com.findAndActiveFirstSelectable())) : this.cursorIndex = -1, this.tagName === "TAB-LIST" && this.title === "video" && this.cursorIndex === 1 && console.log("video setCursor", this.cursorIndex, autoActive, com.active);
    }
    setCursorById(id, autoActive = !0) {
      this.setCursor(this.uiChildren[id], autoActive);
    }
    autoFindChildCursor(selectFirst = !1, autoActive = !1) {
      for (let i2 = 0, t2 = this.uiChildren.length; i2 < t2; i2++)
        isUIParent(this.uiChildren[i2]) && this.uiChildren[i2].autoFindCursor(selectFirst, autoActive);
    }
    autoFindCursor(selectFirst = !1, autoActive = !1) {
      this.uiChildren.length > 0 ? (selectFirst || !this.cursorChild || this.uiChildren.indexOf(this.cursorChild) == -1 ? this.setCursor(this.uiChildren[0], autoActive) : this.setCursor(this.cursorChild, autoActive), this.autoFindChildCursor(selectFirst, autoActive)) : this.setCursor(void 0);
    }
    /*
    nowSelectableDeep(element:UIChild):boolean{
        if(isUISelectable(element)){
            return !(element as UISelectable).unselectable;
        }else if(isUIParent(element)){
            const par=element as unknown as UIParent;
            for(let i=0,t=par.getChildren().length;i<t;i++){
                if(par.nowSelectableDeep(par.getChildren()[i])){
                    return true;
                }
            }
        }
        return false
    }
    */
    renewSelectable() {
      if (this.uiChildren.length > 0)
        for (let i2 = 0, t2 = this.uiChildren.length; i2 < t2; i2++)
          isUISelectable(this.uiChildren[i2]) && this.uiChildren[i2].unselectable === !1 ? this.cursorSelectable = !0 : isUIParent(this.uiChildren[i2]) && this.uiChildren[i2].renewSelectable() && !this.cursorSelectable && (this.cursorSelectable = !0);
      return this.cursorSelectable;
    }
    findAndActiveIfSelectable(element) {
      if (isUISelectable(element) && element.unselectable === !1)
        return element.active = !0, element;
      if (isUIParent(element)) {
        const result = element.findAndActiveFirstSelectable();
        if (result)
          return result;
      }
    }
    findAndActiveFirstSelectable() {
      if (this.uiChildren.length > 0) {
        if (this.cursorIndex != -1 && this.uiChildren[this.cursorIndex]) {
          const result1 = this.findAndActiveIfSelectable(this.uiChildren[this.cursorIndex]);
          if (result1)
            return result1;
        }
        for (let i2 = 0, t2 = this.uiChildren.length; i2 < t2; i2++) {
          if (i2 === this.cursorIndex)
            continue;
          const result2 = this.findAndActiveIfSelectable(this.uiChildren[i2]);
          if (result2)
            return result2;
        }
      }
    }
    moveCursor(x2, y2) {
      const direction = x2 !== 0 ? x2 == -1 ? "left" : "right" : y2 == -1 ? "up" : y2 == 1 ? "down" : "", toName = this.cursorChild?.getAttribute("next-" + direction);
      if (toName) {
        for (let i2 = 0, t2 = this.uiChildren.length; i2 < t2; i2++)
          if (this.cursorChild !== this.uiChildren[i2] && this.uiChildren[i2].getAttribute("name") === toName)
            return this.setCursor(this.uiChildren[i2], !0), !0;
      }
      const [stayInside, cursor] = this.getNewCursor(x2 !== 0 ? x2 : y2);
      return stayInside ? (this.setCursorById(cursor, !0), !0) : !1;
    }
    getNewCursor(add, fromIndex = -1) {
      fromIndex < 0 && (fromIndex = this.cursorIndex);
      let newIndex = fromIndex + add;
      if (this.loopCursor)
        newIndex = (newIndex % this.uiChildren.length + this.uiChildren.length) % this.uiChildren.length;
      else {
        if (newIndex < 0)
          return [!1, -1];
        if (newIndex >= this.uiChildren.length)
          return [!1, 1];
      }
      return newIndex === this.cursorIndex ? [!1, 0] : nowSelectable(this.uiChildren[newIndex]) ? [!0, newIndex] : this.getNewCursor(add, newIndex);
    }
    //abstract
    captureAllInput(ipg) {
      return !1;
    }
    captureInput(ip) {
      const udlr = controlwrap2.UDLR(ip);
      if ((udlr.x !== 0 && !this.constructor.ignoreX || udlr.y !== 0 && !this.constructor.ignoreY) && this.uiChildren.length > 0)
        return this.cursorIndex === -1 ? (this.autoFindCursor(!0), this.findAndActiveFirstSelectable(), !0) : (this.renewSelectable(), this.moveCursor(udlr.x, udlr.y));
      for (var [buttonName, callback] of this.bindedButton)
        if (ip.ui_tap.indexOf(buttonName) !== -1 && callback(ip))
          return !0;
      return super.captureInput(ip);
    }
    bindButton(buttonName, callback) {
      callback === void 0 ? this.bindedButton.delete(buttonName) : this.bindedButton.set(buttonName, callback);
    }
    destory() {
      this.uiChildren.forEach((child) => {
        child.destory();
      }), this.uiChildren = [], this.cursorChild = void 0, super.destory();
    }
  }
  UIParentBase.ignoreX = !1, UIParentBase.ignoreY = !1;
  const _UIParentRootBase = class extends UIParentBase {
  };
  _UIParentRootBase.suspendOnExit = !0, _UIParentRootBase.styles = [...__superGet$5(_UIParentRootBase, _UIParentRootBase, "styles") ? [__superGet$5(_UIParentRootBase, _UIParentRootBase, "styles")] : [], i$2`
    :host(.nonActive) *{
        pointer-events:none !important;
    }
    :host(.nonActive){
        pointer-events:none !important;
    }
    `];
  let UIParentRootBase = _UIParentRootBase;
  var __getProtoOf$4 = Object.getPrototypeOf, __reflectGet$4 = Reflect.get, __superGet$4 = (cls, obj, key) => __reflectGet$4(__getProtoOf$4(cls), key, obj);
  const _UIPanelBase = class extends UIParentRootBase {
    constructor() {
      super(...arguments), this.clickBG2Close = !1, this.allowUserClose = !0;
    }
    async close() {
      await this.exitAni(), UIMaster.getInstance().closedPanel(this);
    }
  };
  _UIPanelBase.styles = [__superGet$4(_UIPanelBase, _UIPanelBase, "styles"), i$2`
        :host {
            ${centerCSS}
            border:${s(0.3)} solid yellow;
            border-radius:${s(1.5)};
            background-color:rgba(255,255,255,0.5);
            padding:3rem;
            width:auto;
            height:auto;
            min-width:40rem;
            min-height:25rem;
            max-width:${w(95)};
            max-height:${h(95)};
        }
    `];
  let UIPanelBase = _UIPanelBase;
  class Container extends UIParentBase {
    getParent() {
      return getParent(this);
    }
    getRoot() {
      return getRoot(this);
    }
    setParentsCursorToMe() {
      return setParentsCursorToMe(this);
    }
    callFromChild(child) {
    }
  }
  Container.eleName = "domui-container";
  var __defProp$a = Object.defineProperty, __getOwnPropDesc$a = Object.getOwnPropertyDescriptor, __decorateClass$a = (decorators, target, key, kind) => {
    for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target, i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      (decorator = decorators[i2]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
    return kind && result && __defProp$a(target, key, result), result;
  };
  class ScrollContainer extends Container {
    constructor() {
      super(...arguments), this.scrollable = !0, this.scrollFloat = !1, this.scrollFloatSpeed = 2, this.scrollDisplayBlock = 0;
    }
    setCursor(com, autoActive = !0) {
      if (super.setCursor(com, autoActive), this.scrollable && !this.scrollFloat && this.uiChildren.length > 0 && this.cursorChild && this.wrapper) {
        const WB = this.getBoundingClientRect(), currentTargetY = Math.round(this.wrapper.scrollTop + this.cursorChild.getBoundingClientRect().top - WB.top), containerHeight = WB.bottom - WB.top;
        let newY = this.wrapper.scrollTop;
        currentTargetY < this.wrapper.scrollTop ? newY = currentTargetY : currentTargetY > this.wrapper.scrollTop + containerHeight / this.scrollDisplayBlock * (this.scrollDisplayBlock - 1) && (newY = currentTargetY - containerHeight / this.scrollDisplayBlock * (this.scrollDisplayBlock - 1)), this.wrapper.scrollTop = clamp(newY, 0, this.wrapper.scrollHeight);
      }
    }
    renderWrap(content) {
      if (this.scrollable && this.scrollDisplayBlock > 0) {
        const WB = this.getBoundingClientRect();
        return WB.height === 0 && this.uiChildren.length > 0 ? x`<style>
                    .wrapper{
                        min-height:100px;
                    }
                </style>
                <div class='wrapper'>${content}</div>` : x`
                <style>
                    ${this.uiChildren.length > this.scrollDisplayBlock ? i$2`
                    .wrapper{
                    }
                    ` : i$2``}
                    .wrapper>::slotted(*){
                        height:${WB.height == 0 ? 100 / this.scrollDisplayBlock + "%" : WB.height / this.scrollDisplayBlock + "px"};
                    }
                </style>
                <div class='wrapper'>${content}</div>`;
      }
      return x`<style></style><div class='wrapper'>${content}</div>`;
    }
    captureInput(ip) {
      const result = super.captureInput(ip);
      if (!result && this.scrollFloat && this.scrollable) {
        const pressingY = controlwrap2.UDLRpressing(ip).y;
        pressingY && (this.wrapper.scrollTop += pressingY * this.scrollFloatSpeed);
      }
      return result;
    }
  }
  ScrollContainer.eleName = "domui-scroll-container", ScrollContainer.styles = [i$2`
     :host {
        overflow:none;
     }
     .wrapper{
        height:100%;
        overflow-y:auto;
     }
     .wrapper>::slotted(*){
        position:relative;
        display:block;
        margin: 0;
        box-sizing:border-box;
     }
    `], __decorateClass$a([
    n({ type: Boolean })
  ], ScrollContainer.prototype, "scrollable", 2), __decorateClass$a([
    n({ type: Boolean })
  ], ScrollContainer.prototype, "scrollFloat", 2), __decorateClass$a([
    n({ type: Boolean })
  ], ScrollContainer.prototype, "scrollFloatSpeed", 2), __decorateClass$a([
    n({ type: Number })
  ], ScrollContainer.prototype, "scrollDisplayBlock", 2), __decorateClass$a([
    e(".wrapper")
  ], ScrollContainer.prototype, "wrapper", 2);
  var __getProtoOf$3 = Object.getPrototypeOf, __reflectGet$3 = Reflect.get, __superGet$3 = (cls, obj, key) => __reflectGet$3(__getProtoOf$3(cls), key, obj);
  const _HoriContainer = class extends Container {
    constructor() {
      super(...arguments), this.loopCursor = !0;
    }
    /*
      
      REMARK!!
    
      controller switch index即時生效，但mouse hover唔會，要click先得
    
    
      */
  };
  _HoriContainer.styles = [__superGet$3(_HoriContainer, _HoriContainer, "styles"), i$2`
    :host {
        display:flex;
        justify-content:space-between;
    }
   `], _HoriContainer.ignoreY = !0;
  let HoriContainer = _HoriContainer;
  HoriContainer.prepare();
  const _ListContainer = class extends ScrollContainer {
  };
  _ListContainer.eleName = "base-list", _ListContainer.styles = [__superGet$3(_ListContainer, _ListContainer, "styles"), i$2`
    .wrapper {
        display:grid;
        overflow-y:auto;
        max-height:100%;
    }
   `], _ListContainer.ignoreX = !0;
  let ListContainer = _ListContainer;
  var __defProp$9 = Object.defineProperty, __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor, __decorateClass$9 = (decorators, target, key, kind) => {
    for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target, i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      (decorator = decorators[i2]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
    return kind && result && __defProp$9(target, key, result), result;
  };
  class UISelectableBase extends UIChildBase {
    constructor() {
      super(), this.selected = !1, this.triggered = !1, this.hints = "", this.title = "", this.lock = !1, this.active = !1, this.onmouseover = () => {
        !this.lock && !this.unselectable && (this.active = !0);
      };
    }
    select() {
      return !1;
    }
    //abstract doPress():void;
    update(changedProperties) {
      super.update(changedProperties), changedProperties.has("active") && this.active && (exports.MI.setActiveComponent(this) ? this.setParentsCursorToMe() : this.active = !1);
      const classes = { active: this.active, lock: this.lock, unselectable: this.unselectable };
      for (let className in classes)
        changedProperties.has(className) && this.classList.toggle(className, classes[className]);
    }
    //================================================================
    getHints() {
      return this.lock ? "locked!" : this.hints;
    }
  }
  __decorateClass$9([
    n({ type: Boolean })
  ], UISelectableBase.prototype, "lock", 2), __decorateClass$9([
    n({ type: Boolean })
  ], UISelectableBase.prototype, "active", 2), __decorateClass$9([
    n({ type: Function })
  ], UISelectableBase.prototype, "callback", 2);
  var __defProp$8 = Object.defineProperty, __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor, __getProtoOf$2 = Object.getPrototypeOf, __reflectGet$2 = Reflect.get, __decorateClass$8 = (decorators, target, key, kind) => {
    for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target, i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      (decorator = decorators[i2]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
    return kind && result && __defProp$8(target, key, result), result;
  }, __superGet$2 = (cls, obj, key) => __reflectGet$2(__getProtoOf$2(cls), key, obj);
  const _Button = class extends UISelectableBase {
    /*
    
        constructor(title:string,callback:()=>void,hints?:string){
            super(title,callback,hints);
        }*/
    constructor() {
      super(), this.selected = !1;
    }
    /**
     */
    playLockShake() {
    }
    doPress() {
      return this.selected || this.unselectable ? !1 : this.lock ? (this.playLockShake(), !1) : (this.dispatchEvent(new Event("callback")), !0);
    }
    renderCore() {
      return x`
          <button @click=${this.doPress}><slot/></button>
        `;
    }
    captureInput(ip) {
      return controlwrap2.YES(ip) ? (this.doPress(), !0) : !1;
    }
  };
  _Button.eleName = "domui-button", _Button.tempCss = i$2`
    :host{
        border: 1px solid green;
    }
    :host(.active){
        background-color:yellow;
    }
    :host([turnOn]){
        background-color:yellow;
    }
    button{
        cursor:pointer;
        transition: box-shadow 0.5s;
    }
    :host(.active) button{
        box-shadow: yellow 2px 2px 25px;
        border: 2px solid red;
    }
    :host(.unselectable) button{
        cursor:not-allowed;
        opacity:0.2;
    }
    :host(.lock) button{
        opacity:0.5;
    }
    `, _Button.styles = [...__superGet$2(_Button, _Button, "styles") ? [__superGet$2(_Button, _Button, "styles")] : [], i$2`
    :host{
        display:inline-block;
    }
    :host(.lock){
        cursor:not-allowed;
    }
    `], __decorateClass$8([
    n({ type: Boolean })
  ], _Button.prototype, "selected", 2);
  let Button = _Button;
  var __defProp$7 = Object.defineProperty, __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor, __getProtoOf$1 = Object.getPrototypeOf, __reflectGet$1 = Reflect.get, __decorateClass$7 = (decorators, target, key, kind) => {
    for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target, i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      (decorator = decorators[i2]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
    return kind && result && __defProp$7(target, key, result), result;
  }, __superGet$1 = (cls, obj, key) => __reflectGet$1(__getProtoOf$1(cls), key, obj);
  Button.prepare(), HoriContainer.prepare();
  const _TabContainer = class extends Container {
    constructor() {
      super(...arguments), this.loop = !0, this.showLR = !0, this.tabSelectable = !1, this.switchType = 0, this.currentTabIndex = 0, this.slotElements = [];
    }
    firstUpdated(_changedProperties) {
      super.firstUpdated(_changedProperties);
      const slotElement = this.shadowRoot.querySelector("slot");
      this.slotElements = slotElement.assignedElements({ flatten: !0 }), this.slotElements.forEach((node, i2) => {
        node.setAttribute("slot", `tabContent${i2}`);
      }), slotElement.style.display = "none", this.requestUpdate();
    }
    updated(_changedProperties) {
      const lastCursor = this.cursorChild;
      super.updated(_changedProperties), (_changedProperties.has("currentTabIndex") || _changedProperties.has("slotElements")) && setTimeout(() => {
        lastCursor != this.cursorChild && (this.uiChildren.length > 1 ? this.setCursor(this.uiChildren[1], !0) : this.setCursor(this.uiChildren[0], !0));
      });
    }
    renderTabBtn(title, id) {
      return this.tabSelectable ? x`
            <domui-button @callback=${() => this.switchTab(id)} ${this.currentTabIndex == id ? "active selected" : ""} class='tabBtn'>
                ${title}
            </domui-button>
            ` : x`
        <div @click=${() => this.switchTab(id)} class='tabBtn ${this.currentTabIndex == id ? "active" : ""}'>
            ${title}
        </div>
        `;
    }
    renderTabBtns() {
      return console.log("renderTabBtns"), x`
        <div class="tabBtnsContainer">
            ${this.showLR ? x`<a @click=${this.prevTab} name="tab_prev" class="tab_LR"></a>` : x``}
            ${this.tabSelectable ? x`
                <domui-hori-container class='tabBtns'>
                    ${this.slotElements.map((v2, i2) => this.renderTabBtn(v2.title, i2))}
                </domui-hori-container>` : x`
                <div class='tabBtns'>
                    ${this.slotElements.map((v2, i2) => this.renderTabBtn(v2.title, i2))}
                </div>
            `}
            ${this.showLR ? x`<a @click=${this.nextTab} name="tab_next" class="tab_LR"></a>` : x``}
        </div>
        `;
    }
    renderCore() {
      return x`
        ${this.slotElements.length > 1 ? this.renderTabBtns() : x``}
        <slot></slot>
        <slot name='tabContent${this.currentTabIndex}'></slot>
        `;
    }
    //================================================================
    get TotalTab() {
      return this.slotElements.length;
    }
    get currentTab() {
      return this.currentTabIndex;
    }
    switchTab(id) {
      if (id < 0)
        if (this.loop)
          id = this.slotElements.length - 1;
        else
          return;
      else if (id >= this.slotElements.length)
        if (this.loop)
          id = 0;
        else
          return;
      this.currentTabIndex = id;
    }
    nextTab() {
      return this.switchTab(this.currentTabIndex + 1);
    }
    prevTab() {
      return this.switchTab(this.currentTabIndex - 1);
    }
    captureInput(ip) {
      let num = 0;
      return this.switchType === 0 ? num = controlwrap2.L1R1(ip) : this.switchType === 1 && (num = controlwrap2.LR(ip)), num === -1 ? (this.prevTab(), !0) : num === 1 ? (this.nextTab(), !0) : super.captureInput(ip);
    }
  };
  _TabContainer.eleName = "domui-tab-container", _TabContainer.styles = [...__superGet$1(_TabContainer, _TabContainer, "styles") ? [__superGet$1(_TabContainer, _TabContainer, "styles")] : [], i$2`
    .tab_LR{
        cursor: pointer;
    }
    .tabBtn{
        cursor: pointer;
    }
    .tabBtnsContainer{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .tabBtns{
        display: flex;
        justify-content: center;
    }`], _TabContainer.tempCss = i$2`
    .tabBtn{
        padding: 0.5rem 1rem;
        &.active{
            border: 1px solid red;
        }
    }
    .tab_LR{
        &:hover{
            border: 1px solid yellow;
        }
    }
    .tab_LR[name="tab_prev"]:before {
        content: "⬅️"
    }
    .tab_LR[name="tab_next"]:before {
        content: "➡️"
    }
    `, __decorateClass$7([
    n({ type: Number })
  ], _TabContainer.prototype, "currentTabIndex", 2);
  let TabContainer = _TabContainer;
  var __defProp$6 = Object.defineProperty, __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor, __decorateClass$6 = (decorators, target, key, kind) => {
    for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target, i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      (decorator = decorators[i2]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
    return kind && result && __defProp$6(target, key, result), result;
  };
  class GridContainer extends ScrollContainer {
    constructor() {
      super(...arguments), this.eachRow = 4;
    }
    moveCursor(x2, y2) {
      const [stayInside, cursor] = this.getNewCursor(x2 !== 0 ? x2 : y2 * this.eachRow);
      return stayInside ? (this.setCursorById(cursor, !0), !0) : cursor == -1 && this.cursorIndex >= this.eachRow ? (this.setCursorById(0, !0), !0) : cursor == 1 && this.cursorIndex < this.uiChildren.length - 1 ? (this.setCursorById(this.uiChildren.length - 1, !0), !0) : !1;
    }
    renderWrap(content) {
      return x`<style>
        .wrapper{
            display:grid;
            grid-template-columns: repeat(${this.eachRow}, 1fr);
        }
     </style>
     ${super.renderWrap(content)}
   `;
    }
  }
  GridContainer.eleName = "domui-grid-container", __decorateClass$6([
    n({ type: Number })
  ], GridContainer.prototype, "eachRow", 2);
  class GridExtraContainer extends ScrollContainer {
    constructor() {
      super(...arguments), this.eachRow = 5, this.eachCol = 4, this.cursorX = 0, this.cursorY = 0;
    }
    firstUpdated(_changedProperties) {
      super.firstUpdated(_changedProperties), this.eachRow = clamp(this.eachRow, 1, 100), this.eachCol = clamp(this.eachCol, 1, 100);
    }
    moveCursor(x2, y2) {
      return !1;
    }
    render() {
      return x`
        <slot></slot>
    `;
    }
  }
  __decorateClass$6([
    n({ type: Number })
  ], GridExtraContainer.prototype, "eachRow", 2), __decorateClass$6([
    n({ type: Number })
  ], GridExtraContainer.prototype, "eachCol", 2);
  const oppo = (i2) => i2 <= 1 ? i2 == 0 ? 1 : 0 : i2 == 2 ? 3 : 2;
  class MixContainer extends Container {
    constructor() {
      super(...arguments), this.childUDLR = [], this.childRect = [];
    }
    findCloset(id, x2, y2) {
      const selfRect = this.childRect[id], total = this.childRect.length;
      let currId = -1, currDis = 1e4;
      for (let i2 = 0; i2 < total; i2++) {
        if (i2 === id)
          continue;
        const rect = this.childRect[i2];
        let thisDis = -1, otherDis = -1;
        x2 !== 0 ? ((x2 = -1) ? thisDis = selfRect.x - (rect.x + rect.w) : x2 == 1 && (thisDis = rect.x - selfRect.x + selfRect.w), otherDis = selfRect.y > rect.y ? selfRect.y - rect.y : rect.y - (selfRect.y + selfRect.h)) : y2 !== 0 && (y2 == -1 ? thisDis = selfRect.y - (rect.y + rect.w) : y2 == 1 && (thisDis = rect.y - selfRect.y + selfRect.w), otherDis = selfRect.x > rect.x ? selfRect.x - rect.x : rect.x - (selfRect.x + selfRect.w)), thisDis >= 0 && thisDis < currDis && thisDis < otherDis && (currDis = thisDis, currId = i2);
      }
      return currId;
    }
    linkToZero(id) {
      return this.countLinked(id).has(0);
    }
    countLinked(id) {
      let linkedID = /* @__PURE__ */ new Set([...this.childUDLR[id]]);
      for (let i2 = 0; i2 < this.childUDLR.length; i2++)
        i2 !== id && this.childUDLR[i2].indexOf(id) !== -1 && linkedID.add(i2);
      return linkedID;
    }
    updated(_changedProperties) {
      super.updated(_changedProperties), this.childUDLR = [], this.childRect = [];
      const total = this.uiChildren.length;
      for (let i2 = 0; i2 < total; i2++)
        this.childRect[i2] = getRect(this.uiChildren[i2]), this.childUDLR[i2] = [-1, -1, -1, -1];
      for (let i2 = 0; i2 < total; i2++) {
        const tempResult = [
          this.findCloset(i2, 0, -1),
          this.findCloset(i2, 0, 1),
          this.findCloset(i2, -1, 0),
          this.findCloset(i2, 1, 0)
        ];
        for (let j2 = 0; j2 < 4; j2++)
          this.childUDLR[i2][j2] === -1 && tempResult[j2] !== -1 && (this.childUDLR[i2][j2] = tempResult[j2], this.childUDLR[tempResult[j2]][oppo(j2)] = i2);
      }
      for (let i2 = 1; i2 < total; i2++)
        this.linkToZero(i2) || console.error("link fail", i2);
    }
    moveCursor(x2, y2) {
      const newIndex = this.childUDLR[this.cursorIndex][x2 == 1 ? 3 : x2 == -1 ? 2 : y2 == -1 ? 0 : 1];
      return newIndex >= 0 && newIndex !== this.cursorIndex ? (this.setCursorById(newIndex, !0), !0) : !1;
    }
  }
  MixContainer.eleName = "base-mix-container";
  var __defProp$5 = Object.defineProperty, __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor, __decorateClass$5 = (decorators, target, key, kind) => {
    for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target, i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      (decorator = decorators[i2]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
    return kind && result && __defProp$5(target, key, result), result;
  };
  class RangeSlider extends UISelectableBase {
    constructor() {
      super(...arguments), this.value = 0, this.min = 0, this.max = 100, this.each = 1, this.useFloat = !1;
    }
    renderCore() {
      return setTimeout(() => {
        const ip = this.shadowRoot?.querySelector("input");
        ip && parseFloat(ip.value) != this.value && (ip.value = this.value.toString());
      }, 0), x`<input type='range' 
        value=${this.value}
        @change=${this.onChange}
        @mousemove=${this.onChange}
        min=${this.min} max=${this.max} ${this.useFloat ? x`` : x`step=${this.each}`} />`;
    }
    onChange(e2) {
      const target = e2.target, newValue = parseInt(target.value);
      newValue !== this.value && (this.value = newValue);
    }
    renderWrap(content) {
      return x`<div class='rangeBox'>${content}</div>`;
    }
    render() {
      return this.renderWrap(x`
        ${this.renderCore()}
        <p> ${this.value}</p>
        `);
    }
    updated(_changedProperties) {
      super.updated(_changedProperties), _changedProperties.has("value") && _changedProperties.get("value") !== void 0 && this.dispatchEvent(new CustomEvent("callback", {
        detail: {
          value: this.value
        }
      }));
    }
    add(_add) {
      const newValue = clamp(this.value + _add * this.each, this.min, this.max);
      newValue !== this.value && (this.value = newValue);
    }
    captureInput(ip) {
      if (this.useFloat) {
        const { x: x2 } = controlwrap2.UDLRpressing(ip);
        if (x2 !== 0)
          return this.add(x2), !0;
      } else {
        const lr = controlwrap2.LR(ip);
        if (lr)
          return this.add(lr), !0;
      }
      return super.captureInput(ip);
    }
  }
  RangeSlider.eleName = "domui-range", RangeSlider.tempCss = i$2`
        :host(.active) .rangeBox{
            .border: 3px solid red;
            box-shadow: yellow 2px 2px 25px;
        }
    `, __decorateClass$5([
    n({ type: Number })
  ], RangeSlider.prototype, "value", 2), __decorateClass$5([
    n({ type: Number })
  ], RangeSlider.prototype, "min", 2), __decorateClass$5([
    n({ type: Number })
  ], RangeSlider.prototype, "max", 2), __decorateClass$5([
    n({ type: Number })
  ], RangeSlider.prototype, "each", 2), __decorateClass$5([
    n({ type: Boolean })
  ], RangeSlider.prototype, "useFloat", 2), RangeSlider.prepare();
  var __defProp$4 = Object.defineProperty, __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor, __decorateClass$4 = (decorators, target, key, kind) => {
    for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target, i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      (decorator = decorators[i2]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
    return kind && result && __defProp$4(target, key, result), result;
  };
  class RadioGroup extends UISelectableBase {
    constructor() {
      super(), this.value = "", this.optionArray = [], this.optionName = /* @__PURE__ */ new Map(), this.optionArray = this.getAttribute("options").split(",");
      const initValue = this.getAttribute("value");
      (!initValue || this.optionArray.indexOf(initValue) === -1) && (this.value = this.optionArray[0]), this.radioName = "horizontalSelector" + Math.floor(Math.random() * 1e6).toString(16);
    }
    /*
    @property({type:String})
    options:string='';
    */
    renderWrap(content) {
      return x`<div class='containBox'>${content}</div>`;
    }
    renderOption(option) {
      return x`
            <label for=${this.radioName}>${this.getOptionName(option)}
                <input type="radio" name=${this.radioName} value=${option} @change="${this._onChange}"/>
            </label>
        `;
    }
    getOptionName(option) {
      return this.optionName.has(option) ? this.optionName.get(option) : option;
    }
    _onChange(event) {
      const target = event.target;
      this.value = target.value;
    }
    renderCore() {
      return setTimeout(() => {
        const ip = this.shadowRoot?.querySelectorAll("input")[this.optionArray.indexOf(this.value)];
        ip ? ip.checked = !0 : console.log("not found", this.value);
      }, 0), x`
        <a @click=${() => this.add(-1)} name="btn_prev" class="btn_LR"></a>
        ${this.optionArray.map((option) => this.renderOption(option))}
        <a @click=${() => this.add(1)} name="btn_next" class="btn_LR"></a>`;
    }
    /*
    render():TemplateResult<1>{
        return this.renderWrap(html`
        ${this.renderCore()}
        <p>${this.value}</p>
        `)
    }
    */
    /*
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);
        this.optionArray=this.options.split(',');
        this.requestUpdate();
    }
    */
    updated(_changedProperties) {
      super.updated(_changedProperties), _changedProperties.has("value") && _changedProperties.get("value") !== void 0 && this.dispatchEvent(new CustomEvent("callback", {
        detail: {
          value: this.value
        }
      }));
    }
    add(_add) {
      let newID = this.optionArray.indexOf(this.value) + _add;
      newID < 0 ? newID = this.optionArray.length - 1 : newID >= this.optionArray.length && (newID = 0), this.value = this.optionArray[newID];
    }
    captureInput(ip) {
      const lr = controlwrap2.LR(ip);
      return lr ? (this.add(lr), !0) : controlwrap2.YES(ip) ? (this.add(1), !0) : !1;
    }
  }
  RadioGroup.eleName = "domui-radio-group", RadioGroup.tempCss = i$2`
        :host(.active) .containBox{
            .border: 3px solid red;
            box-shadow: yellow 2px 2px 25px;
        }
        .btn_LR{
            cursor: pointer;
            &:hover{
                border: 1px solid yellow;
            }
        }
        .btn_LR[name="btn_prev"]:before {
            content: "⬅️"
        }
        .btn_LR[name="btn_next"]:before {
            content: "➡️"
        }
    `, __decorateClass$4([
    n({ type: String })
  ], RadioGroup.prototype, "value", 2);
  var __defProp$3 = Object.defineProperty, __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor, __decorateClass$3 = (decorators, target, key, kind) => {
    for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target, i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      (decorator = decorators[i2]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
    return kind && result && __defProp$3(target, key, result), result;
  };
  class CheckBox extends UISelectableBase {
    constructor() {
      super(...arguments), this.value = !1;
    }
    renderCore() {
      return setTimeout(() => {
        const ip = this.shadowRoot?.querySelector("input");
        ip && ip.checked != this.value && (ip.checked = this.value);
      }), x`<style>
        :host(.active) input{
            border: 3px solid red;
            box-shadow: yellow 2px 2px 7px;
        }
        </style><input type="checkbox" @change=${this._onChange}/>`;
    }
    _onChange(event) {
      this.value = !this.value;
    }
    updated(_changedProperties) {
      super.updated(_changedProperties), _changedProperties.has("value") && _changedProperties.get("value") !== void 0 && this.dispatchEvent(new CustomEvent("callback", {
        detail: {
          value: this.value
        }
      }));
    }
    captureInput(ip) {
      return controlwrap2.YES(ip) ? (this.value = !this.value, !0) : !1;
    }
  }
  __decorateClass$3([
    n({ type: Boolean })
  ], CheckBox.prototype, "value", 2);
  var __defProp$2 = Object.defineProperty, __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor, __decorateClass$2 = (decorators, target, key, kind) => {
    for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target, i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      (decorator = decorators[i2]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
    return kind && result && __defProp$2(target, key, result), result;
  };
  class Selector extends UISelectableBase {
    constructor() {
      super(), this.value = "", this.optionArray = [], this.optionName = /* @__PURE__ */ new Map(), this.optionArray = this.getAttribute("options").split(",");
      const initValue = this.getAttribute("value");
      (!initValue || this.optionArray.indexOf(initValue) === -1) && (this.value = this.optionArray[0]), this.radioName = "horizontalSelector" + Math.floor(Math.random() * 1e6).toString(16);
    }
    renderWrap(content) {
      return x`<div class='containBox'>${content}</div>`;
    }
    getOptionName(option) {
      return this.optionName.has(option) ? this.optionName.get(option) : option;
    }
    _onChange(event) {
      const target = event.target;
      this.value = target.value;
    }
    renderCore() {
      return setTimeout(() => {
        const ip = this.shadowRoot?.querySelector("select");
        ip && (ip.value = this.value);
      }, 0), x`
        <a @click=${() => this.add(-1)} name="btn_prev" class="btn_LR"></a>
        <select @change=${this._onChange}>
        ${this.optionArray.map((option) => x`<option value=${option}>${this.getOptionName(option)}</option>`)}
        </select>
        <a @click=${() => this.add(1)} name="btn_next" class="btn_LR"></a>`;
    }
    /*
    render():TemplateResult<1>{
        return this.renderWrap(html`
        ${this.renderCore()}
        <p>${this.value}</p>
        `)
    }
    */
    /*
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);
        this.optionArray=this.options.split(',');
        this.requestUpdate();
    }
    */
    updated(_changedProperties) {
      super.updated(_changedProperties), _changedProperties.has("value") && _changedProperties.get("value") !== void 0 && this.dispatchEvent(new CustomEvent("callback", {
        detail: {
          value: this.value
        }
      }));
    }
    add(_add) {
      let newID = this.optionArray.indexOf(this.value) + _add;
      newID < 0 ? newID = this.optionArray.length - 1 : newID >= this.optionArray.length && (newID = 0), this.value = this.optionArray[newID];
    }
    captureInput(ip) {
      const lr = controlwrap2.LR(ip);
      return lr ? (this.add(lr), !0) : controlwrap2.YES(ip) ? (this.add(1), !0) : !1;
    }
  }
  Selector.eleName = "domui-selector", Selector.tempCss = i$2`
        :host(.active) .containBox{
            .border: 3px solid red;
            box-shadow: yellow 2px 2px 25px;
        }
        .btn_LR{
            cursor: pointer;
            &:hover{
                border: 1px solid yellow;
            }
        }
        .btn_LR[name="btn_prev"]:before {
            content: "⬅️"
        }
        .btn_LR[name="btn_next"]:before {
            content: "➡️"
        }
    `, __decorateClass$2([
    n({ type: String })
  ], Selector.prototype, "value", 2);
  var __defProp$1 = Object.defineProperty, __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor, __decorateClass$1 = (decorators, target, key, kind) => {
    for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target, i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      (decorator = decorators[i2]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
    return kind && result && __defProp$1(target, key, result), result;
  };
  class shortCutButton extends UIChildBase {
    constructor() {
      super(...arguments), this.buttonName = "";
    }
    firstUpdated(_changedProperties) {
      super.firstUpdated(_changedProperties), this.buttonName == "" && this.getParent()?.bindButton(this.buttonName, this.callback);
    }
    renderCore() {
      return x`<button @click=${this.callback}><slot></slot></button>`;
    }
  }
  __decorateClass$1([
    n({ type: String })
  ], shortCutButton.prototype, "buttonName", 2), __decorateClass$1([
    n({ type: Function })
  ], shortCutButton.prototype, "callback", 2);
  var __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getProtoOf = Object.getPrototypeOf, __reflectGet = Reflect.get, __decorateClass = (decorators, target, key, kind) => {
    for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target, i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      (decorator = decorators[i2]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
    return kind && result && __defProp(target, key, result), result;
  }, __superGet = (cls, obj, key) => __reflectGet(__getProtoOf(cls), key, obj);
  HoriContainer.prepare(), Button.prepare();
  const _AlertPanel = class extends UIPanelBase {
    constructor() {
      super(...arguments), this.alertType = 0, this.withCancel = !1;
    }
    show() {
      super.show();
    }
    buttonName(input) {
      return input;
    }
    renderButtons() {
      return x`
${this.alertType == 0 ? x`
    <domui-button @callback=${this.onYes}>${this.buttonName("confirm")}</domui-button>
` : ""}

${this.alertType == 1 ? x`
    <domui-hori-container>
        <domui-button @callback=${this.onYes}>${this.buttonName("yes")}</domui-button>
        <domui-button @callback=${this.onNo}>${this.buttonName("no")}</domui-button>
        ${this.withCancel ? x`<domui-button @callback=${this.onCancel}>${this.buttonName("cancel")}</domui-button>` : ""}
    </domui-hori-container>
` : ""}

${this.alertType == 2 ? x`
    <input type="text" />
    <domui-hori-container>
        <domui-button @callback=${this.onYes}>${this.buttonName("confirm")}</domui-button>
        ${this.withCancel ? x`<domui-button @callback=${this.onCancel}>${this.buttonName("cancel")}</domui-button>` : ""}
    </domui-hori-container>

` : ""}
        `;
    }
    renderCore() {
      return x`
            <h1><slot name='title'></slot></h1>
            <hr/>
            <p><slot></slot></p>
            ${this.renderButtons()}
        `;
    }
    static addPanel(str) {
      const ap = this.createInstance();
      return j(x`${str}`, ap), exports.MI.showPanel(ap), ap;
    }
    static async alert(str) {
      return this.addPanel(str).alertType = 0, new Promise((resolve, reject) => {
        const asd = () => {
          resolve(), removeEventListener("Response", asd);
        };
        addEventListener("Response", asd);
      });
    }
    static async confirm(str, withCancel = !1) {
      const ap = this.addPanel(str);
      return ap.alertType = 1, ap.withCancel = withCancel, new Promise((resolve, reject) => {
        const asd = (e2) => {
          e2.detail.yes !== void 0 ? resolve(e2.detail.yes) : reject(), removeEventListener("Response", asd);
        };
        addEventListener("Response", asd);
      });
    }
    /*
    
        static async dialog(str:TemplateResult){
            const ap=this.createInstance() as AlertPanel
            render(html`${str}`,ap)
            MI.showPanel(ap)
        }
        */
    endAlert() {
      dispatchEvent(new Event("Response")), this.close();
    }
    endConfirm(yes) {
      dispatchEvent(new CustomEvent("Response", { detail: { yes } })), this.close();
    }
    onCancel() {
      dispatchEvent(new CustomEvent("Response", { detail: { cancel: !0 } })), this.close();
    }
    onYes() {
      this.alertType == 0 ? this.endAlert() : this.alertType == 1 && this.endConfirm(!0);
    }
    onNo() {
      this.alertType == 0 ? this.endAlert() : this.alertType == 1 && this.endConfirm(!1);
    }
    captureInput(ip) {
      return controlwrap2.YES(ip) ? (this.onYes(), !0) : controlwrap2.NO(ip) ? (this.withCancel ? this.onCancel() : this.onNo(), !0) : super.captureInput(ip);
    }
  };
  _AlertPanel.suspendOnExit = !1, //static readonly eleName:string="setting-panel";
  _AlertPanel.styles = [__superGet(_AlertPanel, _AlertPanel, "styles"), i$2`

    `], __decorateClass([
    r()
  ], _AlertPanel.prototype, "alertType", 2), __decorateClass([
    r()
  ], _AlertPanel.prototype, "withCancel", 2);
  let AlertPanel = _AlertPanel;
  return exports.AlertPanel = AlertPanel, exports.Button = Button, exports.CheckBox = CheckBox, exports.Container = Container, exports.GridContainer = GridContainer, exports.HoriContainer = HoriContainer, exports.Layer = Layer, exports.ListContainer = ListContainer, exports.MixContainer = MixContainer, exports.RadioGroup = RadioGroup, exports.RangeSlider = RangeSlider, exports.ScrollContainer = ScrollContainer, exports.Selector = Selector, exports.TabContainer = TabContainer, exports.UIBG = UIBG, exports.UIBase = UIBase, exports.UIChildBase = UIChildBase, exports.UIInteractiveBase = UIInteractiveBase, exports.UIMaster = UIMaster, exports.UIPanelBase = UIPanelBase, exports.UIParentRootBase = UIParentRootBase, exports.anyPlayerPress = anyPlayerPress, exports.anyPress = anyPress, exports.centerCSS = centerCSS, exports.clamp = clamp, exports.deepEqual = deepEqual, exports.delay = delay, exports.flexCenterCSS = flexCenterCSS, exports.fullScreenCSS = fullScreenCSS, exports.getRect = getRect, exports.getSingletonUI = getSingletonUI, exports.h = h, exports.isContainer = isContainer, exports.isUIChild = isUIChild, exports.isUIChildRoof = isUIChildRoof, exports.isUIPanel = isUIPanel, exports.isUIParent = isUIParent, exports.isUIParentRoot = isUIParentRoot, exports.isUISelectable = isUISelectable, exports.l = l, exports.nextTick = nextTick, exports.nowSelectable = nowSelectable, exports.removeElementWithIndex = removeElementWithIndex, exports.s = s, exports.styled = styled, exports.w = w, exports;
}({}, controlwrap);
//# sourceMappingURL=domgameui.js.map
