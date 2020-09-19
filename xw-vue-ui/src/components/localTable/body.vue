<template>
    <tbody>
        <template v-if="data.length > 0">
            <tr v-for="(row,index) in data" @click="e=>selectRow(row,e)" :key="index">
                <td v-if="showCk">
                    <div v-if="singleSelected">
                        <input :name="radioKey" type="radio" :checked="row.ck"/>
                    </div>
                    <div v-else>
                        <input type="checkbox" :checked="row.ck" />
                    </div>
                </td>
                <td class="opration" v-if="actions && actions.length != 0">
                    <div v-for="(x,i) in actions" class="btnContent" :key="i">
                        <le-button v-if="actionShowFn(x,row)" :type="x.key" @click="e=>{x.action(row)}" :value="x.val"></le-button>
                    </div>
                </td>
                
                <td v-for="(item,idx) in cols" :key="idx" :width="item.width">
                    <div v-if="item.etype == 'img'">
                        <img style="width:50px;height:50px;" v-bind:src="row[item.key]" />
                    </div>
                    <div v-else>
                        <div v-html="item.convert?item.convert(item,row):getValByFieldInRow(item,row)" @click="item.action && item.action(row,item)"></div>
                    </div>
                </td>
            </tr>
        </template>
        <tr v-show="data.length == 0" style="text-align:center;width:100%;color:#333;">
            <td :colspan="getAllCols">No data available</td>
        </tr>
    </tbody>
</template>

<script>
    import tool from "../leCompsTool.js";
    
    export default {
        name: "BodySection",
        props:["actions","data","cols","accpetHBNotice","showCk","singleSelected"],
        data(){
            return {
                radioKey:tool._idSeed.newId()
            }
        },
        computed:{
            getAllCols(){
                let count = 0;
                if(this.showCk){
                    count++;
                }
                if(this.actions && this.actions.length>0){
                    count = count + this.actions.length;
                }
                if(this.cols && this.cols.length >0){
                    count = count + this.cols.length;
                }
                return count;
            }
        },
        mounted(){
            
        },
        methods:{
            actionShowFn(action,row){
                if(action.show){
                    return action.show(row);
                }else{
                    return true;
                }
            },
            selectRow:function(row,e){
                if(this.singleSelected){
                    this.data.forEach(el => {
                        el.ck = false;
                    });
                }
                row.ck = !row.ck;
                this.accpetHBNotice(null,{data:this.data});
            },
            getValByFieldInRow:function(item,row){
                let key = item.key;
                let val = "";
                if(typeof row[key] == "boolean"){
                    val = row[key].toString();
                }else{
                    let v = "row."+item.key;
                    let tmp = eval("("+v+")");
                    
                    if(tmp == undefined){
                        val = "";
                    }else{
                        let type = item.type;
                        if(type){
                            type = type.toLowerCase();
                            switch(type){
                                case "date":
                                    val = tool.date.date(tmp);
                                    break;
                                case "datetime":
                                    val = tool.date.dateTime(tmp);
                                    break;
                                case "time":
                                    val = tool.date.time(tmp);
                                    break;
                                default:
                                    val = tmp;
                            }
                        }else{
                            val = tmp;
                        }
                    }
                }
                return val;
            }
        }
    }
</script>

<style scoped>
    .tableList .relative{
        position: relative;
    }
    .tableList .maskLayer{
        position: absolute;left: 0;top: 0;bottom: 0;right: 0;
    }
    .btnCls{
        margin:0 5px;
    }
    tbody tr td{
        color: rgba(0,0,0,0.65);border: 1px solid #ddd;vertical-align: middle;text-align: center; 
        word-break: keep-all;
        white-space: nowrap;
        padding: 0 10px;
        max-width: 300px;
        overflow: hidden;
    }

    tbody tr td div{
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .btn{
        /* margin: 0 5px; */
        border-radius: 4px;
        padding: 2px 10px;
    }
    button.edit{
        background-color: #409eff;
    } 

    button.delete{
        background-color: #f56c6c;
    } 
    .bg-gray{
        background-color: #fafafa;
    }
    /* 新Btn样式 */ 
    button.btn{
        border:none;
    }

    .btnContent{
            width: auto;
        height: auto;
        display: inline-block;
        transform: translateY(25%);
    }

    .opration{
        /* text-align: left; */
        white-space: nowrap;
         max-width: 1000px;
    }

</style>