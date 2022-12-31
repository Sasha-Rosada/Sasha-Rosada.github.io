export async function GenerateCertificate({ settings: { mapping }, dataset, img: imgset, type } = {}) {
    return new Promise((resolve, reject) => {
        try {
            const { context: ctx } = Context(imgset[0].width, imgset[0].height);
            const images = [];

            for (const [lang, img] of [['ua', imgset[0]], ['en', imgset[1]]]) {
                ctx.drawImage(img, 0, 0, img.width, img.height)

                for (const alias in mapping[lang]) {

                    const { pos: rawPos, fontsize, centerX } = mapping[lang][alias]
                    const text = String(dataset[alias]);


                    ctx.textBaseline = 'top'

                    ctx.fillStyle = 'black'
                    ctx.font = `${fontsize}px 'Times New Roman'`

                    let pos = centerX ? CenterPos(ctx, text, rawPos) : rawPos;

                    if (alias.startsWith('nomination')) {
                        const w = 1542;

                        let width = ctx.measureText(text).width;

                        
                        ctx.fillText(text, pos[0] + ((w - width) / 2), pos[1])
                        continue;
                    }

                    if (text.includes(',')) {
                        const offy = 75, absy = 18;
                        const [t1, t2] = text.split(',')
                        ctx.font = `${130}px 'Times New Roman'`

                        let pos = CenterPos(ctx, t1, rawPos)

                        ctx.fillText(t1 + ",", pos[0], pos[1] - offy + absy)
                        ctx.fillText(t2, pos[0], pos[1] + offy + absy)

                        continue;
                    }

                    if (text.startsWith("Візуальне програмування:") || text.startsWith("Visual programming:")) {
                        ctx.font = `${80}px 'Times New Roman'`
                    }

                    ctx.fillText(text, pos[0], pos[1])
                }
                images.push({
                    name: `${type}-${lang}`,
                    image: ctx.canvas.toDataURL("image/jpeg", 1)
                })

                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }

            resolve(images)
        } catch (e) {
            reject(e)
        }
    })


}

function Context(w, h) {
    const canvas = document.createElement('canvas')
    canvas.width = w;
    canvas.height = h;
    const context = canvas.getContext("2d");

    return { context, canvas }
}

function CenterPos(ctx, txt, rawPos) {
    const { width } = ctx.measureText(txt)
    return [
        (ctx.canvas.width - width) / 2,
        rawPos[1]
    ]
}