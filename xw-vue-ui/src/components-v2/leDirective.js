

const bodyClick = {
    bind(el, binding, vnode){
        function documentHandler(e){
            if(el.contains(e.target) && e.target.getAttribute("_body_tag") == el.getAttribute("_body_tag")){
                return false;
            }
            
            if(binding.expression){
                //针对datetimepicker组件嵌套单独处理
                if(el.getAttribute('isdatetimepicker') !== ""){
                    binding.value(e);
                }
            }
            el.vueClickOutside = documentHandler;
        }
        document.body.addEventListener('click', documentHandler, false);
    },
    update() {},
    unbind(el, binding) {
        document.body.removeEventListener('click', el.vueClickOutside);
        delete el.vueClickOutside;
    },
}


export default bodyClick;