const os = require("os");
module.exports =  {
   /**
    * @description 将一维数组根据指定的数字切分成二维数组
    * @param {Array} paddingArr 
    * @param {Number} limitNum 
    * @returns 切割后的二维数组
    */
    groupBy(paddingArr,limitNum){
        if(!this.isArr(paddingArr)){
            return paddingArr
        }
        let _len = paddingArr.length;
        let _limit = _len % limitNum === 0 ? _len / limitNum : Math.floor( (_len / limitNum) + 1 );
        let _resultArray = [];
        for (let i = 0; i < _limit; i++) {
            let temp = paddingArr.slice(i*limitNum, i*limitNum+limitNum);
            _resultArray.push(JSON.parse(JSON.stringify(temp)));
        }
        return _resultArray;
    },
    /**
     * @description 一个字符串首字母大写，其余小写
     * @param {String} str 
     * @returns 处理过后的数组
     */
    titleCase(str){
        str=str.toLowerCase();//全部转换为小写
        return str.substring(0,1).toUpperCase() + str.substring(1);
    },
    /**
     * @description 合并两个数组(并且去掉重复)；
     * @param {Array} arr 
     * @param {Array} pushArr 
     * @returns 合并后的数组
     */
    concatArr(arr,pushArr){
        let newArr = [...arr,...pushArr];
        let resultArr = [];
        newArr.forEach((item) => {
           if(this.isObj(item)){
               let __tag = false;
               //遍历所有resultArr，当前的item要和result所有的item进行逐一对比；如果有重复了  则直接跳过并且不添加
               resultArr.forEach((resultArrItem) => {
                    if(!__tag){
                        __tag = this.checkObjIsExist(item,resultArrItem);
                    }
               })
                if(!__tag){
                    resultArr.push(item);
                }
           }else{
                if(!resultArr.includes(item)){
                    resultArr.push(item);
                }
           }
        })
        return resultArr;
    },
    /**
     * @description 判断两个json是否完全一致
     * @param {Object} item 
     * @param {Object} checkItem
     * @returns Boolean
     */
    checkObjIsExist(item,checkItem){
        let itemLength = this.propertyLength(item);
        let checkItemLength = this.propertyLength(checkItem);
        // 判断两个json属性长度是否一致，如果不一致则直接算作不一致
        if(itemLength == checkItemLength){
            for(var key in item){
                if(item.hasOwnProperty(key) && checkItem.hasOwnProperty(key)){     
                    if(item[key]!==checkItem[key]){
                        return false;
                    };
                }else{
                   return false;
                }
            }
        }else{
            return false;
        }
        return true;
    },
    /**
     * @description 获取obj的长度
     * @param {Object} obj 
     */
    propertyLength(obj){
        var count=0;
        if( obj && typeof obj==="object") {
            for(var ooo in obj) {
                if(obj.hasOwnProperty(ooo)) {
                    count++;
                }
            }
            return count;
        }else{
            return 0;
        }
    },
    /**
     * @description 用于判断传入的值是否是一个对象
     * @param {*} obj
     * @returns Boolean
     */
    isObj(item) {
        return item && typeof (item) == 'object' && Object.prototype.toString.call(item).toLowerCase() == "[object object]";
    },
    /**
     * @description 用于判断传入的值是否是一个数组
     * @param {*} item
     * @returns Boolean
     */
    isArr(item) {
        return item && typeof (item) == 'object' && Object.prototype.toString.call(item).toLowerCase() == "[object array]";
    },
    /**
     * @description 克隆obj
     * @param { Object } source 
     * @returns clone之后的json
     */
    cloneObj(source){
        if(source){
            return JSON.parse(JSON.stringify(source));
        }
        return null;
    },
    /**
     * @description 获取当前运行环境
     * @returns "Windows" || "Mac"
     */
    getRunningEnv(){
        let __Env = os.type();
        if(__Env === "Windows_NT"){
            return "Windows"
        }else{
            return "Mac"
        }
    },
    /**
     * @description 判断一个json数组中是否包含指定的值
     * @param {Array}} paddingArr 
     * @param {String} checkTag 
     * @param {String} checkValue 
     * @returns Boolean
     */
    isExistItem(paddingArr,checkTag,checkValue){
        if(!this.isArr(paddingArr)){
            console.log("paddingArr应该是一个数组");
            return;
        }
        if(!checkTag || checkTag == ""){
            console.log("checkTag不能为空");
            return ;
        }
        if(!checkValue || checkValue == ""){
            console.log("checkValue不能为空");
            return ;
        }
        return paddingArr.some(item => {
            return item[checkTag] == checkValue;
        })
    },
}