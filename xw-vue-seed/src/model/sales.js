

export default class SalesModel{
    constructor(){
        this.code = "";
        this.materialNumber = "";
        this.channelCode = "";
        this.createBy = "";
        this.createTime = "";
        this.updateBy = "";
        this.updateTime = "";
    }   

    get(){
        return {
            code:this.code,
            materialNumber:this.materialNumber,
            channelCode:this.channelCode,
            createBy:this.createBy,
            createTime:this.createTime,
            updateBy:this.updateBy,
            updateTime:this.updateTime,
        }
    }

    set(data){
        this.code = data.code;
        this.materialNumber = data.materialNumber;
        this.channelCode = data.channelCode;
        this.createBy = data.createBy;
        this.createTime = data.createTime;
        this.updateBy = data.updateBy;
        this.updateTime = data.updateTime;
    }
}