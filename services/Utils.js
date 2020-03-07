"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static generateRandomId(size) {
        const my = this;
        if (!my.baseIdSequence) {
            my.baseIdSequence = Date.now();
        }
        my.idSequence++;
        let rs = my.prefixZero(my.baseIdSequence + my.idSequence, size);
        const len = rs.length;
        if (len > size) {
            rs = rs.substr(len - size);
        }
        return rs;
    }
    static formatDate(dt) {
        const my = this;
        const y = dt.getFullYear();
        const m = my.prefixZero(dt.getMonth() + 1, 2);
        const d = my.prefixZero(dt.getDate(), 2);
        return `${y}${m}${d}`;
    }
    static formatTime(tm) {
        const my = this;
        const h = my.prefixZero(tm.getHours(), 2);
        const m = my.prefixZero(tm.getMinutes(), 2);
        const s = my.prefixZero(tm.getSeconds(), 2);
        return `${h}${m}${s}`;
    }
    static generateUid() {
        const my = this;
        my.sequence++;
        const date = new Date();
        return `${my.uidRoot}.${date.getTime()}.${my.sequence}`;
    }
    static prefixZero(n, size) {
        n = n ? n : 0;
        let s = `${n}`;
        while (s.length < size) {
            s = "0" + s;
        }
        return s;
    }
}
exports.Utils = Utils;
Utils.uidRoot = "1.2.345.678.90123";
Utils.sequence = 0;
Utils.baseIdSequence = 0;
Utils.idSequence = 0;
//# sourceMappingURL=Utils.js.map