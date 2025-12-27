/**
 * 文件: /d:/projects/test_web-ui/src/tools/dateTools.js
 *
 * 导出两个便捷函数：
 * - toYMD(input) -> "YYYY-MM-DD"
 * - toYMDHmsWithTZ(input) -> "YYYY-MM-DD-hh-mm-ss ±HH:MM"
 *
 * input 支持:
 * - Date 对象
 * - 时间戳（秒或毫秒）
 * - 常见字符串格式: "YYYY-MM-DD", "YYYY/MM/DD", "YYYYMMDD", "YYYY-MM-DD hh:mm:ss", "YYYYMMDDhhmmss"
 * - ISO 字符串 (带或不带时区)
 *
 * 解析优先级：尽量按本地时间解析没有时区标记的字符串；带时区标记则按其时区解析。
 */

function pad(n, digits = 2) {
    return String(n).padStart(digits, '0');
}

function parseDate(input) {
    if (input == null) return null;
    if (input instanceof Date) {
        if (isNaN(input.getTime())) return null;
        return new Date(input.getTime());
    }

    // numbers: treat 10-digit as seconds, others as ms
    if (typeof input === 'number') {
        const t = String(input).length === 10 ? input * 1000 : input;
        const d = new Date(t);
        return isNaN(d.getTime()) ? null : d;
    }

    if (typeof input !== 'string') return null;
    const s = input.trim();
    if (!s) return null;

    // pure digits: YYYYMMDD or YYYYMMDDhhmmss
    if (/^\d{8}$/.test(s)) {
        const y = +s.slice(0, 4);
        const m = +s.slice(4, 6);
        const d = +s.slice(6, 8);
        return new Date(y, m - 1, d);
    }
    if (/^\d{14}$/.test(s)) {
        const y = +s.slice(0, 4);
        const m = +s.slice(4, 6);
        const d = +s.slice(6, 8);
        const hh = +s.slice(8, 10);
        const mm = +s.slice(10, 12);
        const ss = +s.slice(12, 14);
        return new Date(y, m - 1, d, hh, mm, ss);
    }

    // common date/time pattern with optional timezone suffix
    // examples matched: "2023-05-06", "2023/05/06 12:30:45", "2023-05-06T12:30:45+08:00", "2023-05-06 12:30"
    const re = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?(?:\s*([+-]\d{2}:?\d{2}|Z))?$/i;
    const m = s.match(re);
    if (m) {
        const year = +m[1];
        const month = +m[2];
        const day = +m[3];
        const hh = +(m[4] ?? 0);
        const mmn = +(m[5] ?? 0);
        const ss = +(m[6] ?? 0);
        const tz = m[7];

        // if timezone part exists, rely on Date.parse to respect it
        if (tz) {
            // normalize timezone like +0800 -> +08:00
            let tzNorm = tz.toUpperCase();
            if (tzNorm !== 'Z' && /^[+-]\d{4}$/.test(tzNorm)) {
                tzNorm = tzNorm.slice(0, 3) + ':' + tzNorm.slice(3);
            }
            // build ISO string
            const iso = `${pad(year,4)}-${pad(month)}-${pad(day)}T${pad(hh)}:${pad(mmn)}:${pad(ss)}${tzNorm}`;
            const d = new Date(iso);
            return isNaN(d.getTime()) ? null : d;
        }

        // no timezone -> construct in local time
        const dLocal = new Date(year, month - 1, day, hh, mmn, ss);
        return isNaN(dLocal.getTime()) ? null : dLocal;
    }

    // fallback: try Date.parse on the raw string (may be implementation dependent)
    const dFallback = new Date(s);
    return isNaN(dFallback.getTime()) ? null : dFallback;
}

/**
 * 返回 "YYYY-MM-DD" 格式字符串
 */
export function toYMD(input) {
    const d = parseDate(input);
    if (!d) return null;
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * 返回 "YYYY-MM-DD-hh-mm-ss ±HH:MM"（注意时区为本地时区偏移）
 */
export function toYMDHmsWithTZ(input) {
    const d = parseDate(input);
    if (!d) return null;
    const yyyy = d.getFullYear();
    const MM = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    const ss = pad(d.getSeconds());

    // timezone offset: convert getTimezoneOffset() to signed "+HH:MM"
    const offsetMinutes = -d.getTimezoneOffset(); // inverse: positive means ahead of UTC
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const absMin = Math.abs(offsetMinutes);
    const tzh = pad(Math.floor(absMin / 60));
    const tzm = pad(absMin % 60);
    const tz = `${sign}${tzh}:${tzm}`;

    return `${yyyy}-${MM}-${dd}-${hh}-${mm}-${ss} ${tz}`;
}

// 默认导出一个对象便于引用
export default {
    parseDate,
    toYMD,
    toYMDHmsWithTZ,
};
