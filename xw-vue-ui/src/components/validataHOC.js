

import DEFINE_KEY from "./define.js";

function ValidataHOC(Component){
    return {
        data(){
            return {
                validataComponentType:"HOC"
            }
        },
        inheritAttrs:false,
        methods:{
            //因为HOC没有直接return 当前的Component，所以在界面上面引用的时候，组件返回的是HOC组件, 要拿到具体的子组件必须调用这个方法
            getCurrentComponent(){
                return this.$children[0];
            },
            //校验是否开启验证, 默认关闭，如需要开启 加on标识
            checkVerifyEnabled(){
                if(this.$attrs.on === "" || this.$attrs.on ){
                    return true;
                }
                return false;
            },
            //Input正则验证方法
            verifyReg(val){
                let result = true;

                if(this.$attrs.required !== undefined ){
                    result = val?true:false;
                }

                if(this.$attrs.vType !== undefined){
                    if(val){
                        let reg = DEFINE_KEY.INPUT_VALIDATA_TYPES.TYPES[this.$attrs.vType];
                        reg = new RegExp(reg);
                        if (!reg.test(val)) {
                            result = false;
                        }
                    }
                }   
                
                if(this.$attrs.max !== undefined){
                    if(val){
                        result = val.length <= this.$attrs.max;
                    }
                }


                //如果都没有设置，那么返回true
                // if(this.$attrs.vType == undefined && this.$attrs.required == undefined && this.$attrs.max == undefined){
                //     return true;
                // }
                // //如果设置了vType，没有设置required
                // if(this.$attrs.vType != undefined && this.$attrs.required == undefined){
                //     //如果是空，则不验证，直接验证通过
                //     if(!val){
                //         return true;
                //     }
                //     let reg = DEFINE_KEY.INPUT_VALIDATA_TYPES.TYPES[this.$attrs.vType];
                //     reg = new RegExp(reg);
                //     if (!reg.test(val)) {
                //         return false;
                //     }
                //     return true;
                // }
                // //如果设置了vType，也设置required
                // if(this.$attrs.vType != undefined && this.$attrs.required != undefined){
                //     if(val == ""){
                //         return false;
                //     }else{
                //         let reg = DEFINE_KEY.INPUT_VALIDATA_TYPES.TYPES[this.$attrs.vType];
                //         reg = new RegExp(reg);
                //         if (!reg.test(val)) {
                //             return false;
                //         }
                //         return true;
                //     }
                // }
                // //如果设置了required，没有设置vType
                // if(this.$attrs.required != undefined &&this.$attrs.vType == undefined){
                //     return val?true:false;
                // }
                
                return result;
            },
            //获取组件验证结果
            getVerifyResult(){
                let currentComp = this.$children[0];
                let value = currentComp.getValue();
                let isSuccess = false;
                if(currentComp.validataComponentType == "Input"||currentComp.validataComponentType == "TextArea"){
                    isSuccess = this.verifyReg(value);
                }else{
                    isSuccess = value?true:false;
                }
                return {
                    success:isSuccess,
                    value:value,
                    msg:this.$attrs.msg?this.$attrs.msg:this.$props.msg //兼容属性在$attrs和$props里面(是否显示声明属性都可以)
                }
            },
            //获取组件校验结果，并改变state
            setVerifyCompState(){
                let res = this.getVerifyResult();
                if(res.success){
                    this.setStateByFlag(1);
                }else{
                    this.setStateByFlag(2);
                }
            },
            /**
             * @description 设置成功失败的状态
             * @param {int} flag为  0：恢复出厂设置，1：设置成功隐藏错误信息，2：设置失败，显示错误信息
             */
            setStateByFlag(flag){
                let currentComp = this.$children[0];
                switch(flag){
                    case 0:
                        currentComp.state.successIcon = "";
                        currentComp.state.showError = false;
                        break;
                    case 1:
                        // currentComp.state.successIcon = "fa-check-circle-o";
                        currentComp.state.successIcon = "";
                        currentComp.state.showError = false;
                        break;
                    case 2:
                        currentComp.state.successIcon = "fa-times-circle-o";
                        currentComp.state.showError = true;
                        break;
                    default:
                        currentComp.state.successIcon = "";
                        currentComp.state.showError = false;
                }
            },
            /**
             * @description 重置组件状态，恢复出厂设置
             */
            reset(){
                let currentComp = this.$children[0];
                //清空v-model 和  组件内部的显示字段值, 当前过程是异步的
                currentComp.$emit("input","");
                //所以需要延迟执行清空验证的state.showError 和 state.cls 属性 进行重置
                window.setTimeout(()=>{
                    if(currentComp.state.showError || currentComp.state.successIcon != ""){
                        currentComp.$attrs.setStateByFlag && currentComp.$attrs.setStateByFlag(0);
                    }
                },0)
            }
        },
        mounted(){

        },
        props:Component.props,
        render(h){
            const slots = Object.keys(this.$slots);
            slots.reduce((arr, key) => arr.concat(this.$slots[key]), [])
            .map(vnode => {
                vnode.context = this._self
                return vnode
            })

            if(!this.checkVerifyEnabled()){
                // console.log("当前组件不需要验证");
            }else{
                //通过HOC添加验证需要的方法，具体验证的业务逻辑都在HOC里面执行，当前Vue组件只需要调用即可
                if(Component.data().validataComponentType && Component.data().validataComponentType == "Input"){
                    this.$set(this.$attrs, "verify", this.verifyReg);
                }
            }
            //透传方法
            this.$set(this.$attrs, "reset", this.reset);
            this.$set(this.$attrs, "checkVerifyEnabled", this.checkVerifyEnabled);
            this.$set(this.$attrs, "getVerifyResult", this.getVerifyResult);
            this.$set(this.$attrs, "setStateByFlag", this.setStateByFlag);
            this.$set(this.$attrs, "setVerifyCompState", this.setVerifyCompState);

            return h(Component,{
                on: this.$listeners,
                props: this.$props,
                scopedSlots: this.$scopedSlots,
                attrs: this.$attrs
            },slots)
        }
    }
}

export default ValidataHOC