"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTML = void 0;
class HTML {
    constructor() {
        this.elements = [];
        this.start = `
    <!DOCTYPE html>
    <html>
    <body>
    `;
        this.end = ` 
    </body>
    </html> `;
        this.br = '<br>';
        this.nbsp = (iterations = 1) => {
            var pattern = `&nbsp;`;
            var res = '';
            while (iterations) {
                res += pattern;
                iterations--;
            }
            return res;
        };
        this.h1 = (v) => `<h1>${v}</h1>`;
        this.h2 = (v) => `<h2>${v}</h2>`;
        this.h3 = (v) => `<h3>${v}</h3>`;
        this.h4 = (v) => `<h4>${v}</h4>`;
        this.h5 = (v) => `<h5>${v}</h5>`;
        this.h6 = (v) => `<h6>${v}</h6>`;
        this.hr = () => `<hr style="border-top: 1px solid#0a551e;">`;
        this.style = (v) => `style="${v}"`;
        this.table = (v = [], style = null) => `<table ${style != null ? this.style(style) : ''} > ${v.join('')}</table>`;
        this.div = (v = [], style = null) => `<div ${style != null ? this.style(style) : ''} > ${v.join('')}</div>`;
        this.tr = (v = []) => `<tr>${v.join('')}</tr>`;
        this.td = (v = [], colspan = 1, style = null) => `<td colspan="${colspan}" ${style != null ? this.style(style + " font-family:  sans-serif; color: #0a551e; ") : this.style("font-family:  sans-serif; color: #0a551e; ")}>${v.join('')}</td>`;
        this.img = (v, width = 100, height = 100) => `<img src="${v}" width='${width}' height='${height}' alt="">`;
    }
    add(v) {
        this.elements.push(v);
    }
    renderScreenHTML() {
        var result = [];
        result.push(this.start);
        this.elements.forEach((e) => {
            result.push(e);
        });
        result.push(this.end);
        return result.join('');
    }
    renderEmailHtml() {
        return this.elements.join('');
    }
}
exports.HTML = HTML;
//# sourceMappingURL=html.helper.js.map