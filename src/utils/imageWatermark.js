import Compressor from 'compressorjs';
import html2canvas from 'html2canvas';

/**
 * 添加水印
 * @param {blob} file
 * @param {string} el
 * @returns {Promise}
 */
export async function addWaterMarker(file, el = '#markImg', direction = 'rightDown') {
  return new Promise(async (resolve, reject) => {
    try {
      const img = await blobToImg(file)

      let maxWidth = 750
      let imgWidth = img.naturalWidth > maxWidth ? maxWidth : img.naturalWidth

      // 当图片小于500k时，还原图片的原始尺寸，防止截图图片模糊
      if (file.size < 1024 * 500) {
        maxWidth = imgWidth = img.naturalWidth
      }

      // 生成水印图片
      const markEle = document.querySelector(el)
      const scale = imgWidth * 0.25 / markEle.clientWidth
      // 先缩放水印再转成图片
      markEle.style.transform = `scale(${scale})`
      const markImg = await htmlToCanvas(markEle)

      // 压缩和旋转图片
      file = await compressor(file, (context, canvas) => {
        if (direction == 'rightDown') {
          // 填充水印 右下角
          context.drawImage(markImg, canvas.width - markImg.width - 15 * scale, canvas.height - markImg.height - 15 * scale, markImg.width, markImg.height)
        } else {
          // 填充水印 左下角
          context.drawImage(markImg, 15 * scale, canvas.height - markImg.height - 15 * scale, markImg.width, markImg.height)
        }
      }, maxWidth)
      resolve(file)
    } catch (error) {
      reject(error)
    }
  })
}



function blobToImg(blob) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.addEventListener('load', () => {
      let img = new Image()
      img.src = reader.result
      img.addEventListener('load', () => resolve(img))
    })
    reader.readAsDataURL(blob)
  })
}


export function htmlToCanvas(el, backgroundColor = 'rgba(0,0,0,.1)') {
  return new Promise(async (resolve, reject) => {
    try {
      const markImg = await html2canvas(el, {
        scale: 2, //此处不使用默认值window.devicePixelRatio，需跟移动端保持一致
        allowTaint: false, //允许污染
        useCORS: true,
        backgroundColor //'transparent'  //背景色
      })
      resolve(markImg)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 压缩和旋转图片
 * @param {blob} file
 * @param {number} quality  压缩比例
 * @param {number} maxWidth
 * @returns {Promise}
 */
export function compressor(file, drew, maxWidth = 750, quality = 0.6) {
  return new Promise(resolve => {
    new Compressor(file, {
      strict: false,
      maxWidth,
      quality,
      drew,
      success: resolve,
      error(err) {
        console.log(err.message)
      }
    })
  })
}
