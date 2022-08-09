
function watermark(settings) {
  //默认设置
  let defaultSettings = {
    watermarkTxt: settings.watermarkText,
    watermarkx: 20, //水印起始位置x轴坐标
    watermarky: 20, //水印起始位置Y轴坐标
    watermarkrows: 20, //水印行数
    watermarkcols: 20, //水印列数
    watermarkxspace: 50, //水印x轴间隔
    watermarkyspace: 50, //水印y轴间隔
    watermarkcolor: '#aaa', //水印字体颜色
    watermarkalpha: 0.3, //水印透明度
    watermarkfontsize: '15px', //水印字体大小
    watermarkfont: '微软雅黑', //水印字体
    watermarkwidth: 230, //水印宽度
    watermarkHeight: 80, //水印长度
    watermarkAngle: 20 //水印倾斜度数
  };

  if (arguments.length === 1 && typeof arguments[0] === 'object') {
    let src = arguments[0] || {};
    
    for (let key in src) {
      if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key]) {
        continue;
      } else if (src[key]) {
        defaultSettings[key] = src[key];
      }
    }
  }
  if (document.getElementById ('maskdiv_parent')){
    document.getElementById (settings.parentId).removeChild (document.getElementById ('maskdiv_parent'));
  }
  let oTemp = document.createElement ('div');

  oTemp.id = 'maskdiv_parent';
  oTemp.style.pointerEvents = 'none';
  //获取页面最大宽度
  let pagewidth = Math.max (document.body.scrollWidth, document.body.clientWidth),
    cutWidth = pagewidth * 0.0150,
    //获取页面最大高度
    pageheight = Math.max (document.body.scrollHeight, document.body.clientHeight) + 450;

  pagewidth = pagewidth - cutWidth;

  pageheight = Math.max (pageheight, window.innerHeight - 30);
  //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
  if (defaultSettings.watermarkcols === 0 || (parseInt (defaultSettings.watermarkx + defaultSettings.watermarkwidth * defaultSettings.watermarkcols + defaultSettings.watermarkxspace * (defaultSettings.watermarkcols - 1)) > pagewidth)) {
    defaultSettings.watermarkcols = parseInt ((pagewidth - defaultSettings.watermarkx + defaultSettings.watermarkxspace) / (defaultSettings.watermarkwidth + defaultSettings.watermarkxspace));
    defaultSettings.watermarkxspace = parseInt ((pagewidth - defaultSettings.watermarkx - defaultSettings.watermarkwidth * defaultSettings.watermarkcols) / (defaultSettings.watermarkcols - 1));
  }
  //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
  if (defaultSettings.watermarkrows === 0 || (parseInt (defaultSettings.watermarky + defaultSettings.watermarkHeight * defaultSettings.watermarkrows + defaultSettings.watermarkyspace * (defaultSettings.watermarkrows - 1)) > pageheight)) {
    defaultSettings.watermarkrows = parseInt ((defaultSettings.watermarkyspace + pageheight - defaultSettings.watermarky) / (defaultSettings.watermarkHeight + defaultSettings.watermarkyspace));
    defaultSettings.watermarkyspace = parseInt (((pageheight - defaultSettings.watermarky) - defaultSettings.watermarkHeight * defaultSettings.watermarkrows) / (defaultSettings.watermarkrows - 1));
  }

  let x,
    y;

  for (let i = 0; i < defaultSettings.watermarkrows; i++) {
    y = defaultSettings.watermarky + (defaultSettings.watermarkyspace + defaultSettings.watermarkHeight) * i;
    for (let j = 0; j < defaultSettings.watermarkcols; j++) {
      x = defaultSettings.watermarkx + (defaultSettings.watermarkwidth + defaultSettings.watermarkxspace) * j;
      let maskdiv = document.createElement ('div');
      
      maskdiv.id = 'maskdiv' + i + j;
      maskdiv.className = 'maskdiv';
      maskdiv.appendChild (document.createTextNode (defaultSettings.watermarkTxt));
      //设置水印div倾斜显示
      maskdiv.style.webkitTransform = 'rotate(-' + defaultSettings.watermarkAngle + 'deg)';
      maskdiv.style.MozTransform = 'rotate(-' + defaultSettings.watermarkAngle + 'deg)';
      maskdiv.style.msTransform = 'rotate(-' + defaultSettings.watermarkAngle + 'deg)';
      maskdiv.style.OTransform = 'rotate(-' + defaultSettings.watermarkAngle + 'deg)';
      maskdiv.style.transform = 'rotate(-' + defaultSettings.watermarkAngle + 'deg)';
      maskdiv.style.visibility = '';
      maskdiv.style.position = 'absolute';
      maskdiv.style.left = x + 'px';
      maskdiv.style.top = y + 'px';
      maskdiv.style.overflow = 'hidden';
      maskdiv.style.zIndex = '9999';
      //让水印不遮挡页面的点击事件
      maskdiv.style.pointerEvents = 'none';
      maskdiv.style.opacity = defaultSettings.watermarkalpha;
      maskdiv.style.fontSize = defaultSettings.watermarkfontsize;
      maskdiv.style.fontFamily = defaultSettings.watermarkfont;
      maskdiv.style.color = defaultSettings.watermarkcolor;
      maskdiv.style.textAlign = 'center';
      maskdiv.style.width = defaultSettings.watermarkwidth + 'px';
      maskdiv.style.height = defaultSettings.watermarkHeight + 'px';
      maskdiv.style.display = 'block';
      oTemp.appendChild (maskdiv);
    }
  }
  document.getElementById (settings.parentId).appendChild (oTemp);
}

function setWatermark(_this,watermarkJosn) {
  watermark ({'watermarkText':watermarkJosn.watermarkText,parentId:watermarkJosn.parentId});
  setTimeout (()=>{
    if (!_this.$route.meta.watermark&&!watermarkJosn.isAllPage) {
      let watermark = document.getElementById ('maskdiv_parent');

      watermark.style.display = 'none';
    }
  },100);

  if (!watermarkJosn.isAllPage) {
    let getter = _this._watcher.getter;

    _this._watcher.getter = function () {
      getter ();
      watchWatermark (_this);
    };
  }  
  window.onresize = function () {
    if (_this.$route.meta.watermark) {
      watermark ({'watermarkText':watermarkJosn.watermarkText,parentId:watermarkJosn.parentId});
    }  
  };
}

function watchWatermark(_this) {
  let watermarkDom = document.getElementById ('maskdiv_parent');

  if (_this.$route.meta.watermark) {        
    if (watermarkDom) {
      watermarkDom.style.display = 'block';
    } 
  } else if (watermarkDom) {
    watermarkDom.style.display = 'none';
  }
}

export {
  setWatermark
};
