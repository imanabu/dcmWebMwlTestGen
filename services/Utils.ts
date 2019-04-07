export class Utils {

    public static uidRoot = "1.2.345.678.90123";
    private static sequence = 0;

    public static genrateRandomId(size: number): string {
        // const iAm = "";
        const my = this;
        const r = Math.floor(Math.random() * 100000);
        const rs = my.prefixZero(r, size);
        return rs;
    }

    public static formatDate(dt: Date): string {
        // const iAm = "";
        const my = this;
        const y = dt.getFullYear();
        const m = my.prefixZero(dt.getMonth() + 1, 2);
        const d = my.prefixZero(dt.getDate(),2);
        return `${y}${m}${d}`;
    }

    public static formatTime(tm: Date): string {
        const my = this;
        const h = my.prefixZero(tm.getHours(), 2);
        const m = my.prefixZero(tm.getMinutes(), 2);
        const s = my.prefixZero(tm.getSeconds(), 2);
        return `${h}${m}${s}`;
    }

    public static generateUid(): string {
        // const iAm = "";
        const my = this;
        my.sequence++;
        const date = new Date();
        return `${my.uidRoot}.${date.getTime()}.${my.sequence}`;
    }

    public static prefixZero(n: number, size: number) {
        n = n ? n : 0;
        let s = `${n}`;
        while (s.length < size) {
            s = "0" + s;
        }
        return s;
    }
}