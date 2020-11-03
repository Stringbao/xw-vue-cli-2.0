
const fsTool = require("../tool/fsapi.js");
const path = require("path");


let getResult = function(){
    let _path = path.resolve(__dirname,"./test.txt");
    let str = fsTool.file.readFile(_path);
    let arr = str.split('展台 Booth');
    let successCount = 0;
    let errorCount = 0;
    let res = {success:[],error:[], warning:[],total:arr.length -1};
    arr.forEach(item=>{ 
        if(item != ""){
            item = '展台 Booth' + item;
            if(item.indexOf('电话 Tel.') == -1 && item.indexOf('网址 Website:') == -1){
                res.warning.push(
                    {name:/展台.*\s+(.*\s?.*\s)(?:\s?.*){0,3}.*/g.exec(item), tel:``, fax:``, site:``}
                )
            }else{
                var result = /展台.*\s+(.*)(?:\s+.*){1,3}电话 Tel.: ([\s\d]*)\s+(?:传真 Fax: ([\s\d]*)\s+)?(?:网址 Website: ([\w-.:/]*))?.*/g.exec(item);
                // var result = /展台.*\s+(.*\s?.*\s)(?:\s?.*){0,3}电话 Tel.: ([\s\d]*)\s+(?:传真 Fax: ([\s\d]*)\s+)?(?:网址 Website: ([\w\-\.\:/]*))?.*/g.exec(item);
                if(result){
                    res.success.push(
                        {name:result[1], tel:result[2], fax:result[3], site:result[4]}
                    )
                    successCount++;
                }else{
                    res.error.push({name:item})
                    errorCount++;
                }
            }
        }
    })
    return res;
}



module.exports = getResult;