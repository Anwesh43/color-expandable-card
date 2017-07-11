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
class ColorExpandableDiv {
    constructor() {
        this.scale = 0
        this.dir = 0
    }
    draw(context,color,w,h) {
        context.lineWidth = 6
        context.lineCap = "round"
        context.fillStyle = color
        context.strokeStyle = 'white'
        context.fillRect(0,0,w,0.8*h*this.scale)
        context.fillRect(0,0.8*h*this.scale,w,0.2*h)
        context.save()
        context.translate(w/2,0.8*h*this.scale+0.1*h)
        context.rotate(Math.PI*this.scale)
        context.beginPath()
        context.arc(0,0,0.1*h,0,2*Math.PI)
        context.stroke()
        context.beginPath()
        context.moveTo(0,0.09*h)
        context.lineTo(0,-0.09*h)
        context.stroke()
        for(var j=0;j<2;j++) {
            context.save()
            context.translate(0,-0.09*h)
            context.rotate(Math.PI)
            context.moveTo(0,-0.09*h)
            context.lineTo(0.05*h,0.05*h)
            context.stroke()
            context.restore()
        }
        context.restore()
        if(!this.handleTap) {
            this.handleTap = (x,y)=>{
                const currY = (4*h/5)*this.scale
                const condition =  x>=w/2-0.1*h && x<=w/2+0.1*h && y>=currY-0.1*h && y<=currY+0.1*h && this.dir == 0
                if(condition == true) {
                    if(this.scale <= 0) {
                        this.dir = 1
                    }
                    if(this.scale >= 1) {
                        this.dir = 0
                    }
                }
                return condition
            }
        }
    }
    update() {
        this.scale += this.dir *0.2
        if(this.scale > 1) {
            this.scale = 1
            this.dir = 0
        }
        if(this.scale < 0) {
            this.scale = 0
            this.dir = 0
        }
    }
    stopped() {
        return this.dir == 0
    }
}
