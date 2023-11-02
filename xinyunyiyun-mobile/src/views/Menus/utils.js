/* 判断设备是否为PC */
function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

export function getRealSize() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (w <= 375) {
        return '@1x';
    } else if (w <= 750) {
        return '@2x';
    } else if (w > 750) {
        return '@3x';
    }
    return '@2x';
}

