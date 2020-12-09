<template>
    <le-drag
        class="parents"
        :disabled="isDraggable"
        element="tbody"
        :options="dragOptions"
        @update="dragUpdate"
        @change="dragChange"
        @start="dragStart"
        @end="dragEnd"
    >
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
                    <td class="opration" v-if="actions && actions.length != 0"  >
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
    </le-drag>
</template>

<script>
    import { $idSeed,$util,$obj,$date } from "../leCompsTool.js";
    
    export default {
        name: "BodySection",
        props:["actions","data","cols","accpetHBNotice","showCk","singleSelected","drag"],
        data(){
            return {
                // list: [],
                dragOptions: {},
                radioKey:$idSeed.newId()
            }
        },
        computed:{
            isDraggable() {
                if (this.data.length && (this.drag === '' || this.drag)) {
                    return false;
                }
                return true;
            },
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
            dragUpdate(e) { // 挪动了位置才会触发
                // const list = $obj.clone(this.data);
                const oldData = this.data[e.oldIndex];
                const newData = this.data[e.newIndex];
                [this.data[e.newIndex], this.data[e.oldIndex]] = [this.data[e.oldIndex], this.data[e.newIndex]]
                this.$emit('dragUpdate', {
                    ...e,
                    oldData,
                    newData,
                    updateList: this.data
                })
            },
            dragChange(e) { // 挪动了位置才会触发，并且返回按下的行的数据
                this.$emit('dragChange', e);
            },
            dragStart(e) { // 开始挪动时触发（鼠标按下 & 鼠标值变化）
                this.$emit('dragStart', e);
            },
            dragEnd(e) { // 鼠标放下时触发（不管位置是否挪动，都会触发）
                this.$emit('dragEnd', e);
            },
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
                                    val = $date.date(tmp);
                                    break;
                                case "datetime":
                                    val = $date.dateTime(tmp);
                                    break;
                                case "time":
                                    val = $date.time(tmp);
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
    .table tbody tr:hover{
        background-color: #fefced;
    }
    tbody tr td{
        color: rgba(0,0,0,0.65);
        border: 1px solid #c9c9cb;;
        vertical-align: middle;
        text-align: center; 
        word-break: keep-all;
        white-space: nowrap;
        padding: 6px;
        max-width: 300px;
        line-height: 24px;
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
        vertical-align: middle;
        margin:0 4px;
        /* transform: translateY(25%); */
        /* float: left;
        transform: translateY(0); */
    }
    
    .opration{
        max-width: 1000px;
    }
    .opration span.asBtn{
       padding: 0 8px;
       line-height: 20px;
       font-size: 12px;
    }
</style>