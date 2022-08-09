import Vue from 'vue';

Vue.directive ('permission', {
  inserted(el, binding, vnode) {
    let btnPermission = vnode.context.$route.meta.btnPermission;

    if (!btnPermission) {
      return; 
    }
    !btnPermission.includes (binding.value) && el.parentNode.removeChild (el);
  }
});

//绑定输入转为数字
/*
  使用方式
  v-inputNumber="{parentKey,key,isInteger,digit}" 
  key为必传  如果有要修改的为子集值的key父级parentKey带上
  isInteger，为是否整数设置如果必须为整数的则为必传
  digit：非必传默认为两位小数，可设置自己的小数位数
  三位小数设置  v-inputNumber="{key:'numberkey',digit:3}"
  整数设置  v-inputNumber="{key:'numberkey',isInteger:true}"
*/ 
Vue.directive ('inputNumber', function (el,binding,vnode) {
  let parentKey = binding.value&&binding.value.parentKey?binding.value.parentKey:false,
    key = binding.value&&binding.value.key?binding.value.key:'',
    that = vnode.context;

  if (el.nodeName != 'INPUT') {
    let cels = [...el.childNodes];

    cels.forEach ((item) => {
      if (item.nodeName=== 'INPUT') {
        el = item;
      }
    });
  }
  el.oninput  = function () {
    let val = el.value,
      digit = binding.value.digit?binding.value.digit:2,  
      numberRex = /[^0-9\.\-]/g;

    val = val.replace (numberRex,'');
    if (val) {
      let rex = /\s/g;

      val = val.replace (rex,''); 
      if (!isNaN (Number (val))) {
        if (binding.value.isInteger) {
          val = Number (val);
          val = Math.round (val);
        }
        if (parseInt (val) < parseFloat (val)) {
          val = Number (val);
          val = Number (val.toFixed (digit));
        }
        if (parentKey) {
          that[parentKey][key] =  val;
        } else {
          that[key] =  val;
        }           
      } else if (parentKey) {
        that[parentKey][key] =  val;
      } else {
        that[key] =  val;
      }
    } else if (parentKey) {
      that[parentKey][key] = '';
    } else {
      that[key] =  '';
    }
  };

  el.onchange = function () {
    let val = el.value;
    
    if (val) {
      if (parentKey) {
        that[parentKey][key] = Number (val)?Number (val):'';
      } else {
        that[key] =  Number (val)? Number (val):'';
      }
    }  
  };
  
});

//清除两端空格 使用 v-trim
Vue.directive ('trim', function (el) {
  if (el.nodeName != 'INPUT') {
    let cels = [...el.childNodes];

    cels.forEach ((item) => {
      if (item.nodeName=== 'INPUT') {
        el = item;
      }
    });
  }
  el.onchange  = function () {
    let val = el.value;
      
    if (val) {
      el.value = val.replace (/^\s+|\s+$/gm, '');
    } else {
      el.value = '';
    }
  };
});