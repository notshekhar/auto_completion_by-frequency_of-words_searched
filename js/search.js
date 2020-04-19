class Search {
    constructor(keys) {
        this.keys = keys || {}
    }
    addKey(str) {
        if (this.keys[str] != undefined) {
            this.keys[str] += 1
            return this.keys[str]
        }
        this.keys[str] = 1
        return 1
    }
    static match(str1, str2) {
        if (str2.length > str1.length) return false
        for (let i = 0; i < str2.length; i++) {
            if (str2[i] != str1[i]) return false
        }
        return true
    }
    recommand(str, limit) {
        let matches = []
        for (let e in this.keys) {
            if (Search.match(e, str))
                matches.push({ score: this.keys[e], match: e })
        }
        matches.sort((a, b) => b.score - a.score)
        if (limit) return matches.splice(0, limit)
        return matches
    }
}
