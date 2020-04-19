const input = document.querySelector(".search_input")
const suggestion_div = document.querySelector(".suggestions")

let data = {}
if (localStorage.getItem("searches")) {
    data = JSON.parse(localStorage.getItem("searches"))
}
let search = new Search(data)

input.onchange = () => {
    let value = input.value
    search.addKey(value)
    localStorage.setItem("searches", JSON.stringify(search.keys))
}
let tf = true
input.onclick = () => {
    if (tf) {
        suggest("")
        tf = false
    }
}

input.onkeyup = () => {
    suggest(input.value)
}
function suggest(v) {
    suggestion_div.innerHTML = ""
    let sugg = search.recommand(v, 5)
    console.log(sugg)
    sugg = sugg.map((s) => {
        let li = new_element("li", {
            innerText: s.match,
        })
        return li
    })
    sugg.forEach((s) => suggestion_div.append(s))
}

window.onclick = (e) => {
    console.log(e.target.localName)
    if (e.target.localName == "li") {
        input.value = e.toElement.innerText
    }
}
