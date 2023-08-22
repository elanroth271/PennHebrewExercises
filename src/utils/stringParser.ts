const LTRpunctMarks = ['_', '.', ' ', '?', '!']
export function getLTRSuffix(str: string) {
    let suff = ""
    let foundRTLChar = false
    let ind = 0
    while(!foundRTLChar) {
        if(LTRpunctMarks.indexOf(str[ind]) > -1) {
            suff = str[ind] + suff
        } else {
            foundRTLChar = true
        }
        ind++
    }
    return suff
}

export function getLTRPrefix(str: string): string {
    let pref = ""
    let foundRTLChar = false
    let ind = str.length - 1
    while(!foundRTLChar) {
        if(LTRpunctMarks.indexOf(str[ind]) > -1) {
            pref = str[ind] + pref
        } else {
            foundRTLChar = true
        }
        ind--
    }
    
    return pref
}
function addSpacer(str: string): string {
    return "\u200F" + str + "\u200F"
}

export function cleanRTLString(str: string): string {
    const suffix =  getLTRSuffix(str)
    const prefix = getLTRPrefix(str)

    let cutStr = str.substring(suffix.length, str.length - prefix.length);

    let newStr = addSpacer(prefix) + cutStr + addSpacer(suffix + " ") 
    return newStr
}