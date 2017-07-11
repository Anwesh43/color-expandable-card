const w = window.innerWidth,h = window.innerHeight
class ColorExpandableDivComponent extends HTMLElement {
    constructor() {
        super()
        this.color = this.getAttribute('color')
        const shadow = this.attachShadow({mode:'open'})
        this.div = document.createElement('canvas')
        shadow.appendChild(this.div)
    }
    render() {
        const canvas = document.createElement('canvas')
        canvas.width = w/4
        canvas.height = h/4
        const context = canvas.getContext('2d')
        this.div.background = `url(${canvas.toDataURL()})`
    }
    connectedCallback() {
        this.render()
    }
}
