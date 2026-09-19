import sharp from "sharp"
const img = sharp("/tmp/footer-home.png").ensureAlpha()
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
const W = info.width, H = info.height
// ascii of the whole screenshot downscaled ~16x
for (let y = 0; y < H; y += 16) {
  let line = ""
  for (let x = 0; x < W; x += 16) {
    const i = (y * W + x) * 4
    const lum = (data[i]+data[i+1]+data[i+2]) / 3
    line += lum < 128 ? "#" : (lum < 200 ? "+" : ".")
  }
  console.log(line)
}
