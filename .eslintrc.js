module.exports = {
  root: true,
  env: {
    node: true,
    //启用浏览器全局变量
    browser: true,
    //启用除了 modules 以外的所有 ECMAScript 6 特性
    es6: true,
    commonjs: true
  },
  //使用eslint推荐的规则作为基础配置，可以在rules中覆盖  用vue-cli需要安装vue/cli-plugin-eslint 不然无法通过eslint检查
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  //rules中的值0、1、2分别表示不开启检查、警告、错误
  rules: {

    'no-cond-assign':2, // 禁止条件表达式中出现赋值操作符

    'no-console': 2, // 禁用 console

    'no-constant-condition': 2, // 禁止在条件中使用常量表达式

    'no-control-regex': 0, // 禁止在正则表达式中使用控制字符;如果你需要使用控制字符模式匹配，那么你应该关闭这个规则

    'no-debugger': 2, // 禁用 debugger

    'no-dupe-args': 2, // 禁止 function 定义中出现重名参数

    'no-dupe-keys': 2, // 禁止对象字面量中出现重复的 key

    'no-duplicate-case': 2, // 禁止在switch中的case标签不能重复

    'no-empty-character-class': 2, // 禁止在正则表达式中使用空字符集

    'no-empty': 2, // 禁止出现空语句块

    'no-ex-assign': 2, // 禁止给catch语句中的异常参数赋值

    'no-extra-boolean-cast': 2, // 禁止不必要的布尔转换

    'no-extra-parens': [2, "all", {

      "conditionalAssign": false,  //"conditionalAssign": false 允许在条件测试表达式中分配的附加括号。

      "nestedBinaryExpressions": false, //"nestedBinaryExpressions": false 允许在嵌套二进制表达式中使用额外的括号

      "returnAssign": false,   //"returnAssign": false允许在return语句中分配的附加括号

      "enforceForArrowConditionals": false, //"enforceForArrowConditionals": false 允许围绕作为箭头函数主体的三元表达式的附加括号

      "ignoreJSX": "none"  //"ignoreJSX": "none|all|multi-line|single-line"允许在非全部/多行/单行 JSX 组件中使用额外的括号默认为none。

    }], // 禁止不必要的括号

    'no-extra-semi': 2, // 禁止不必要的分号

    'no-func-assign': 2, // 禁止对 function 声明重新赋值

    'no-inner-declarations': [2, 'functions'], // 禁止在嵌套的块中出现变量声明或 function 声明

    'no-obj-calls': 2, // 禁止把全局对象作为函数调用

    'no-regex-spaces': 2, // 禁止正则表达式字面量中出现多个空格

    'no-sparse-arrays': 2, // 禁用稀疏数组(例如多余的逗号)

    'no-template-curly-in-string': 1, // 警告常规字符串包含看起来像模板字面占位符的内容（例如："Hello ${name}!";应该写成`Hello ${name}!`;）

    'no-unexpected-multiline': 2, // 不允许混淆多行表达式，换行符看起来像是结束语句，但实际不是

    'no-unreachable': 2, // 禁止在return、throw、continue 和 break 语句之后出现不可执行的代码

    'no-unsafe-finally': 2, // 禁止在 finally 语句块中出现控制流语句

    'no-unsafe-negation': 2, // 不允许否定关系运算符的左操作数

    'use-isnan': 2, // 不允许比较'NaN'

    'valid-typeof': 2,  // 强制 typeof 表达式与有效的字符串进行比较

    'accessor-pairs': 1, // 强制 getter 和 setter 在对象中成对出现

    'curly': [2, 'all'], // 强制所有控制语句使用一致的括号风格

    'default-case': 1, // 要求 switch 语句中有 default 分支（即使默认情况下是空的）

    eqeqeq: 0, // 要求使用 === 和 !==

    'no-case-declarations': 1, // 不允许在 case 子句中使用词法声明

    // 'no-div-regex': 1, // 禁止除法操作符显式的出现在正则表达式开始的位置

    'no-else-return': 2, // 禁止 if 语句中 return 语句之后有 else 块

    // 'no-empty-function': 1, // 禁止出现空函数

    'no-empty-pattern': 1, // 禁止使用空解构模式

    'no-eq-null': 2, // 禁止在没有类型检查操作符的情况下与 null 进行比较

    'no-eval': 1, // 禁用 eval()

    'no-extend-native': 2, // 禁止扩展原生类型

    'no-extra-bind': 2, // 禁止不必要的 .bind() 调用

    'no-extra-label': 1, // 禁用不必要的标签

    'no-fallthrough': 2, // 禁止 case 语句落空

    'no-floating-decimal': 2, // 禁止数字字面量中使用前导和末尾小数点

    'no-global-assign': 1, // 不允许修改只读全局变量

    'no-implicit-coercion': 1, // 禁止使用短符号进行类型转换

    'no-implicit-globals': 1, // 禁止在全局范围内使用变量声明和 function 声明

    'no-implied-eval': 2, // 禁止使用类似 eval() 的方法 (例如setTimeout("alert('Hi!');", 100);)

    'no-iterator': 2, // 禁用 __iterator__ 属性

    'no-labels': 2, // 禁用标签语句

    'no-lone-blocks': 2, // 禁用不必要的嵌套块（例如：自己套自己）

    'no-loop-func': 1, // 禁止在循环中声明函数

    'no-multi-str': 2, // 禁止字符串出现换行的情况

    'no-new-func': 1, // 禁止对 Function 对象使用 new 操作符

    'no-new-wrappers': 2 , // 禁止对 String，Number 和 Boolean 使用 new 操作符

    'no-new': 1, // 禁止在非赋值或条件语句中使用 new 操作符

    'no-octal-escape': 2, // 禁止在字符串中使用八进制转义序列

    'no-octal': 2, // 禁用八进制字面量

    'no-proto': 2, // 禁用 __proto__ 属性

    'no-redeclare': 2, // 禁止多次声明同一变量

    'no-return-assign': 2, // 禁止在 return 语句中使用赋值语句

    'no-self-assign': 2, // 禁止自我赋值

    'no-self-compare': 2, // 禁止自身比较

    'no-throw-literal': 2, // 禁止抛出异常字面量

    'no-unused-expressions': [2, { "allowShortCircuit": true, "allowTernary": true }], // 禁止出现未使用过的表达式(允许您在表达式中使用短路评估、允许您在表达式中使用三元运算符，类似于短路评估)

    'no-unused-labels': 2, // 禁用出现未使用过的标

    'no-useless-call': 2, // 禁止不必要的 .call() 和 .apply()

    'no-useless-concat': 2, // 禁止不必要的字符串字面量或模板字面量的连接

    'no-useless-escape': 0, // 禁用不必要的转义字符 (转义字符串，模板文字和正则表达式中的非特殊字符不会产生任何影响)

    'no-useless-return': 2, // 报告多余的return语句

    'no-void': 0, // 禁用 void 操作符

    'no-with': 2, // 禁用 with 语句

    'vars-on-top': 2, // 要求所有的 var 声明出现在它们所在的作用域顶

    'wrap-iife': [2, 'inside'], // 要求 IIFE 使用括号括起来

    yoda: [2, 'never'], // 禁止 “Yoda” 条件

    strict: 2, // 使用严格模式

    'no-catch-shadow': 2, // 禁止 catch 子句的参数与外层作用域中的变量同名

    'no-delete-var': 2, // 禁止对var声明的变量使用 delete 操作符

    'no-label-var': 2, // 不允许标签与变量同名

    'no-shadow-restricted-names': 2, // 禁止标识符不能作为声明时的变量名使用

    'no-undef-init': 2, // 禁止将变量初始化为 undefined

    'no-undef': 2, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到

    'no-undefined': 2, // 禁止将 undefined 作为标识符

    'no-unused-vars': [0, {vars: 'all', args: 'after-used'}], // 禁止出现未使用过的变量,关闭是为了页面能调用方法

    'no-use-before-define': 1, // 遇到对尚未声明的标识符的引用时发出警告

    // 'callback-return': 1, // 防止多次调用回调

    'global-require': 1, // 要求所有调用require()都位于模块的顶层，类似于 ES6 import和export语句，这也只能在顶层发生

    'no-new-require': 2, // 禁止调用 require 时使用 new 操作符

    'array-bracket-spacing': [2, 'never'], // 强制数组方括号中使用一致的空格

    'block-spacing': [2, 'always'], // 强制在单行代码块中使用一致的空格

    'brace-style': [1, '1tbs'], // 强制在代码块中使用一致的大括号风格

    camelcase: 2, // 强制使用骆驼拼写法命名约定

    'comma-dangle': [2, 'never'], // 要求或禁止末尾逗号

    'comma-style': [2, 'last'], // 强制使用一致的逗号风格

    'computed-property-spacing': [2, "never"], // 强制在计算的属性的方括号中使用一致的空格

    'func-call-spacing': 0, // 要求函数名称和调用它的左括号之间的空格

    indent: [2, 2],   // 强制使用一致的缩进（我们是使用两个空格作缩进）

    'keyword-spacing': [1, { before: true, after: true }], // 强制在关键字前后使用一致的空格（我们在关键字后至少需要一个空格）

    'new-cap': 2, // 要求构造函数首字母大写

    'new-parens': 2, // 要求调用无参构造函数时有圆括号

    'newline-after-var': 2, // 要求变量声明语句后有一行空行

    'no-array-constructor': 2, // 禁用 Array 构造函数

    'no-lonely-if': 1, // 禁止 if 作为唯一的语句出现在 else 语句中

    'no-mixed-operators': [2, {"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}], // 禁止混合使用不同的操作符(&&和||如果同时存在的话，请用括号进行分割，明确代码意图)

    'no-mixed-spaces-and-tabs': [2, false], // 禁止空格和 tab 的混合缩进

    'no-multiple-empty-lines': [1, {max:2}], // 禁止出现多行空行不能超过2空行

    // 'no-negated-condition': 1, // 禁用否定的表达式(在if判定和三元表达式中，禁止出现理解难度更高的否定表达式)

    'no-new-object': 2, // 禁用 Object 的构造函数

    'no-unneeded-ternary': 2, // 禁止可以在有更简单的可替代的表达式时使用三元操作符（过多的三元操作符影响代码阅读，如布尔值判定和短路赋值不需要使用三元操作符）

    'no-whitespace-before-property': 1, // 禁止属性前有空白（当属性和对象在同一行时，属性前不允许出现空格）

    'one-var': [2, { var: 'consecutive', let: 'consecutive', const: 'consecutive'}], // 强制函数中的变量要么一起声明

    'operator-linebreak': [2, 'after'], // 强制操作符使用一致的换行符

    quotes: [2,'single'],  // 强制使用一致的反勾号、双引号或单引号

    semi: [2, 'always'],  // 要求或禁止使用分号而不是 ASI

    'constructor-super':2, // 要求构造函数中有 super() 的调用

    'no-class-assign': 2, // 禁止修改类声明的变量

    'no-confusing-arrow': 1, // 警告不要在可能与比较运算符混淆的地方使用箭头函数语法

    'no-const-assign': 2, // 禁止修改const声明的变量

    'no-dupe-class-members': 2, // 禁止类成员中出现重复的名称

    'no-duplicate-imports': 2, // 禁止从单个模块进行的所有导入都以单一import语句存在（例如import { merge, find } from 'module';）

    'no-new-symbol': 2, // 禁止Symbol与new操作员的意外呼叫（new和Symbol不要一起用，会引起TypeError错误）

    'no-useless-computed-key': 1, // 禁止不必要地使用计算属性键（多余得中括号）

    'no-useless-constructor': 1, // 禁用不必要的构造函数（如空构造函数）

    'no-useless-rename': 2, // 不允许将导入、导出和解构分配重命名为相同的名称

    'no-var': 1, // 要求使用 let 或 const 而不是 var（使用let const 代替 var）

    'sort-imports':[2, { "ignoreCase": false, "ignoreMemberSort": false, "memberSyntaxSortOrder": ["none", "all", "multiple", "single"] }], // 强制模块内的 import 排序

    'vue/html-indent': [2,2], // 强制vue使用一致的缩进（我们是使用两个空格作缩进）

    'vue/no-v-html':'off',  // 关闭默认的v-html的使用

    'vue/no-unused-vars':'off', //关闭 否则不能自定义变量
  },
  // parser指定解析器，默认的为espree。babel-eslint是一个Babel parser的包装器，这个包装器使得 Babel parser 可以和 ESLint 协调工作
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
