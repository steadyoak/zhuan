function exportCanvasAsPNG(canvas, image, type) {
    image.src = canvas.toDataURL("image/png")
}

p = pick(this, ".imginp")
img = pick(this, ".img")
img1 = pick(this, ".img1")

c1 = pick(this, ".c1")

p.addEventListener("change", function(){
    const fr = new FileReader();
    fr.readAsDataURL(p.files[0]);
    fr.onload = function () {
        img.src = fr.result;
        img.onload = function (){
            w = img.naturalWidth
            h = img.naturalHeight
            c1.width = w
            c1.height = h
            const ctx1 = c1.getContext("2d");
            ctx1.drawImage(img, 0, 0)
            const data = ctx1.getImageData(0, 0, w, h).data

            function toIndex(x, y) {
                return (x+y*w)*4
            }

            function swap(m, n) {
                let o = data[m]
                data[m] = data[n]
                data[n] = o
            }

            for(let x=0; x<w; x++)
                for(let y=0; y<Math.floor(h/2); y++){
                    let i = toIndex(x, y)
                    swap(i+1, toIndex(w-1-x, h-1-y)+1)
                }

            if(h%2==1) {
                for (let x=0; x<Math.ceil(w/2); x++) {
                    let y = Math.floor(h/2)
                    let i = toIndex(x, y)
                    swap(i+1, toIndex(w-1-x, h-1-y)+1)
                }
            }

            for(let x=0; x<Math.ceil(w/2); x++)
                for(let y=0; y<h; y++){
                    let i = toIndex(x, y)
                    swap(i+2, toIndex(w-1-x,y)+2)
                }


            const mtx1 = ctx1.createImageData(w, h)
            mtx1.data.set(data)
            ctx1.putImageData(mtx1, 0, 0)
            exportCanvasAsPNG(c1, img1, p.files[0].type)
        }
    }
})