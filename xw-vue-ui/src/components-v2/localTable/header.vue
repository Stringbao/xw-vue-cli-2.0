<template>
    <thead>
        <tr>
            <th v-if="showCk">
                <div v-if="!singleSelected">
                    <input type="checkbox" class="singleSelected" :checked="ck" @click="setAll" />
                </div>
            </th>
            <th class="opration" v-if="actions && actions.length != 0">
               Operation
            </th>
            
            <th v-for="(item,index) in comShowCols" :key="index" class="thCols">
                {{item.val}}
                <i v-if="false" class="icon icon-caidan menu" @click.stop="showChangeColsDialog"></i>
                <!-- <i v-if="index == 0  ? true : false" class="icon icon-caidan menu" @click.stop="showChangeColsDialog"></i> -->
                <div class="colsModal" v-if="index == 0 && colsModalShow ? true : false" @click.stop>
                    <div v-for="(item,index) in defaultCols" :key="index">
                        <p>
                            <input type="checkbox" :checked="item.ck" @click.stop="e=>{itemCheckChange(item,e)}" />
                            <span>{{item.val}}</span>
                        </p>
                    </div>
                </div>
            </th>
        </tr>
    </thead>
</template>

<script>
    import { $idSeed,$util,$obj } from "../leCompsTool.js";
    export default {
        props:["originCols","accpetHBNotice","noticeChangeCols","ck","actions","cols","showCk","singleSelected"],
        name: "HeaderSection",
        data(){
            return {
                colsModalShow:false
            }
        },
        computed:{
            defaultCols:function(){
                return $util.addPrimaryAndCk($obj.clone(this.originCols),true);
            },
            comShowCols() {
                return this.cols.length && this.cols.filter(item => {
                    if (item.show) {
                        return item.show(item);
                    }
                    return true;
                });
            },
        },
        methods:{
            setAll:function(){
                this.accpetHBNotice({ck:!this.ck},null);
            },
            itemCheckChange:function(item,e){
                item.ck = !item.ck;
                e.target.checked = item.ck;

                this.reSetCols();
            },
            reSetCols:function(){
                let cols = $util.getCheckedItems(this.defaultCols).items;
                if(cols.length == 0){
                    this.noticeChangeCols(this.defaultCols);
                    this.defaultCols.forEach(item => {
                        item.ck = true;
                    });
                }else{
                    this.noticeChangeCols(cols);
                }
            },
            showChangeColsDialog:function(){
                this.colsModalShow =  this.colsModalShow ? false : true;
            },
            bodyClick:function(){
                this.colsModalShow = false;
            },
        },
        mounted(){
            document.body.addEventListener("click",this.bodyClick,false);
        },
        beforeDestroy () {
            document.body.removeEventListener("click",this.bodyClick)
        }
    }
</script>
<style scoped>
    .enterIndexCls{width: 50px;display: inline-block;}
    .colsModal{border:1px solid #ddd;padding:10px;border-radius: 3px;position: absolute;left:30px;top:0;background: #fff;color: #000;z-index: 999;}
    .colsModal p {text-align: left;}
    .colsModal p input{float: left;margin-left: 15px;margin-right: 15px;}
    .thCols {position: relative;}
    .colsModal .bot input{width: 50px;line-height: 15px;margin: 0 5px;}
    .menu{position: absolute;left:10px;top:0;font-size: 20px;}
    thead tr th{border:1px solid rgba(0,0,0,0.09);border-bottom:none;font-weight: 600;text-align: center;
    color:rgba(0,0,0,0.85);font-size: 14px;min-width: 50px; }
    .table thead tr th.singleSelected{
        width: 50px;
        min-width: auto;
    }

     .table thead tr th.thCols{
         width: auto;
         word-break: keep-all;
         white-space: nowrap;
         padding: 0 5px;
     }
</style>