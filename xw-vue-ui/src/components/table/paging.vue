<template>
    <div class="pageNumCls" >
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item selectPages">
                    <label>Size:</label>
                    <select v-model='currentSize' @change="changeSize">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                </li>
                <li class="page-item"><a class="page-link span">Total:{{count}}</a></li>
                <li class="page-item" @click="this.prev"><a class="page-link button" >Prev</a></li>
                <li class="page-item" @click="this.next"><a class="page-link button" >Next</a></li>                
                <li class="page-item"><a class="page-link span">Current Page:</a></li>
                <li class="page-item"><a class="page-link span">{{index}}/{{total}}</a></li>
                

                <li class="page-item"><span class="page-link span">Skip to</span></li>                        
                <li class="page-item"><input type="text" :ref="this.goIndexKey" @keyup.enter.stop = "goToIndex" class="enter-number" placeholder=''/></li>
                <li class="page-item"><span class="page-link span">Page</span></li> 
                <li class="page-item" @click="this.goToIndex"><a class="page-link button">Confirm</a></li> 



            </ul>
        </nav>
    </div>
</template>

<script>
    import tool from "../leCompsTool.js";
    export default {
        props:["options","goNext","goPrev","goIndex","changeKey"],
        name: "PagingSection",
        data(){
            return {
                currentSize:this.options.size,
                goIndexKey:tool._idSeed.newId(),
            }
        },
        computed:{
            index:function(){
                return this.options.index;
            },
            count:function(){
                return this.options.count;
            },
            total:function(){
                return this.options.total;
            }
        },
        methods:{
            changeSize(){
                tool._form_event_publisher.broadcast(this.changeKey, {size:this.currentSize});
            },
            next:function () {
                if(this.index >= this.total){
                    return;
                }
                this.goNext();
            },
            prev:function () {
                if(this.index <=1){
                    return;
                }
                this.goPrev();
            },
            goToIndex:function () {
                let eIndex = this.$refs[this.goIndexKey].value;
                if( eIndex > this.total || eIndex< 1 || isNaN(eIndex)){
                    this.$refs[this.goIndexKey].value = "";
                    return;
                }
                this.goIndex(eIndex);
            }
        }
    }
</script>
<style scoped>
    .button{
        cursor: pointer;
        background-color: #5bc0de;
        display: inline-block;
        color: #fff;
        font-size: 12px;
        padding: 0 6px;
        border: none;
    }

    .pagination>li>a.button{
        color:#fff;
        height: 26px;
        line-height: 26px;
    }

    .paging{height: 26px; margin: 30px 0; line-height: 26px;}
    .paging input[type=button]{
        height: 26px;
        min-width: 26px;
        padding: 0 5px;
        border: 1px solid #dfdfdf;
        box-sizing: border-box;
        background: none;
        margin-right: 4px;
        border-radius: 5px;}
    .paging input[type=text]{width: 30px; height: 20px; border: 1px solid #797979; text-align: center;}
    .paging span{padding: 0 5px;}
    .pageNumCls{margin-right: 20px;margin-top:10px;float:right;font-size:14px;text-align:center;}
    .pagination{
        list-style: none;overflow: hidden;font-weight: 600;
    }
    .pagination>li{
        display: block;float: left;margin-left: 8px;height: auto;color: #797979;
    }
    .pagination>li>a, .pagination>li>span{
        border:none;border-radius: 3px;line-height: 27px;color: #797979;

    }

    .pagination li .span{
        padding-right: 0;
    }

    .pagination .enter-number{
        height:18px;
        line-height:18px;
        text-align:center;
        border: 1px solid rgba(217,217,217,1);
        line-height: 20px;
        width: 30px;
        padding: 0 5px;border-radius: 6px;outline: none;
    }

    .button:hover{
        background-color: rgba(0,0,0,0.5);
    }

    .selectPages{
        line-height: 27px;
        color: #797979;
    }

    .selectPages select{
        border: 1px solid rgba(217,217,217,1);
        color: #797979;
    }

</style>
