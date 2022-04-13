
/**
 * Returns value of a cookie by its name
 *
 * @param {string} name name of a cookie
 * @returns {string} value of a cookie
 */
export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
export function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        // @ts-ignore
        const optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
export function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}


export function getChildrenHeight(el) {
    const children = Array.from(el.children);
    let res = 0;
    if (!children)
        return res;
    children.forEach((child) => {
        res += child.scrollHeight;
    })
    return res;
}


const _timedTimeouts = [];
export function setTimedClass(elements, className, timeout = 1500) {
    _timedTimeouts.forEach((timeout, idxTime) => {
        elements.forEach((el, idxEl) => {
            if (el === timeout.element) {
                clearTimeout(timeout.timeout);
                _timedTimeouts.splice(idxTime, 1);
            }
        });
    });
    elements.forEach(element => {
        element.classList.add(className);

        _timedTimeouts.push({
            element: element,
            timeout: setTimeout(() => element.classList.remove(className), timeout)
        });
    });
}

export function deepClone(obj = {}) {
    return JSON.parse(JSON.stringify(obj));
}
