
const fsTool = require("../tool/fsapi.js");
const path = require("path");

function getName(item){
    if(item.indexOf('地址Add') == -1){
        return "";
    }
    let arr = item.split('地址Add');
    let nameArr = arr[0].split('\r\n');
    return nameArr.join(' ');
}

function getSite(item){
    if(item.indexOf('网址Website') == -1){
        return "";
    }
    let arr = item.split('网址Website');
    let siteArr = arr[1].split('\r\n');
    if(siteArr[0].indexOf(':') != -1){
        return siteArr[0].split(':')[1];
    }
    if(siteArr[0].indexOf('：') != -1){
        return siteArr[0].split('：')[1];
    }
    if(siteArr[0].indexOf('；') != -1){
        return siteArr[0].split('；')[1];
    }
    return siteArr[0];
}

function getEmail(item){
    if(item.indexOf('邮箱E-mail') == -1){
        return "";
    }
    let arr = item.split('邮箱E-mail');
    let emailArr = arr[1].split('\r\n');
    
    if(emailArr[0].indexOf(':') != -1){
        return emailArr[0].split(':')[1];
    }
    if(emailArr[0].indexOf('：') != -1){
        return emailArr[0].split('：')[1];
    }
    return emailArr[0];
}

let getResult = function(){
    let _path = path.resolve(__dirname,"./test1.txt");
    let str = fsTool.file.readFile(_path);
    let arr = str.split('\r\n\r\n');

    let res = {success:[],error:[], total:arr.length - 1};

    arr.forEach(item=>{
        if(item){
            // if(item.indexOf('邮箱E-mail') != -1 && item.indexOf('网址Website') != -1 && item.indexOf('地址Add') != -1){
                let tmpName = getName(item);
                let tmpSite = getSite(item);
                let tmpEmail = getEmail(item);
                res.success.push({name:tmpName, site:tmpSite, email:tmpEmail});
            // }
        }else{
            res.error.push({name:item, site:"", email:""});
        }
    })
    return res;

    // let successCount = 0;
    // let errorCount = 0;
    // let res = {success:[],error:[], warning:[],total:arr.length -1};
    // arr.forEach(item=>{ 
    //     if(item != ""){
    //         item = '展台 Booth' + item;
    //         if(item.indexOf('电话 Tel.') == -1 && item.indexOf('网址 Website:') == -1){
    //             res.warning.push(
    //                 {name:/展台.*\s+(.*\s?.*\s)(?:\s?.*){0,3}.*/g.exec(item), tel:``, fax:``, site:``}
    //             )
    //         }else{
    //             var result = /展台.*\s+(.*)(?:\s+.*){1,3}电话 Tel.: ([\s\d]*)\s+(?:传真 Fax: ([\s\d]*)\s+)?(?:网址 Website: ([\w-.:/]*))?.*/g.exec(item);
    //             // var result = /展台.*\s+(.*\s?.*\s)(?:\s?.*){0,3}电话 Tel.: ([\s\d]*)\s+(?:传真 Fax: ([\s\d]*)\s+)?(?:网址 Website: ([\w\-\.\:/]*))?.*/g.exec(item);
    //             if(result){
    //                 res.success.push(
    //                     {name:result[1], tel:result[2], fax:result[3], site:result[4]}
    //                 )
    //                 successCount++;
    //             }else{
    //                 res.error.push({name:item})
    //                 errorCount++;
    //             }
    //         }
    //     }
    // })
    // return res;
}

// getResult();

module.exports = getResult;