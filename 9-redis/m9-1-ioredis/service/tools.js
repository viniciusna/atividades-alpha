function titleize(name) {
    return name.split(" ").map((a) => {
        try {
            return a[0].toUpperCase() + a.slice(1)
        } catch {
            return ""
        }
      }).join(" ")
}

module.exports = {
    titleize: titleize
}