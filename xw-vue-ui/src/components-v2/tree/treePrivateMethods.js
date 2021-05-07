
let _treeTool = {
    /**
     * @description 所有被选中的节点集合
     */
    checkedNodes:[],
    /**
     * @description 保存当前节点上的所有parentNode
     */
    parentNodes:[],
    /**
     * @description 设置单行颜色
     * @param arr 数据源，初始为this.state.data
     * @param node 当前选中行
     * @returns 
     */
    setSingleColor(arr,node){
        for(let i =0;i<arr.length;i++){
            if(arr[i].__tmpId == node.__tmpId){
                if(arr[i].__color){
                    arr[i].__color = "";
                }else{
                    arr[i].__color = "color";
                }
            }else{
                if(arr[i].__color){
                    arr[i].__color = "";
                }
            }
            let children = arr[i].__children;
            if(children && children instanceof Array && children.length >0){
                _treeTool.setSingleColor(children,node);
            }
        }
    },
    /**
     * @description 递归遍历tree的数据源，根据__tmpId找到当前节点
     * @param arr 数据源，初始为this.state.data
     * @param field 字段
     * @param val 值
     * @returns node
     */
    getNodeByField(arr,field,val){
        let res = null;
        for(let i =0;i<arr.length;i++){
            if(arr[i][field] != undefined && arr[i][field].toString() == val.toString()){
                res = arr[i];
                return res;
            }
            let children = arr[i].__children;
            if(children instanceof Array && children && children.length >0){
                let _tmp = _treeTool.getNodeByField(children,field,val);
                if(_tmp){
                    res = _tmp;
                    return res;
                }
            }
        }
        return res;
    },
    getParentNodes(node){
        let parentNode = node.__parentNode;
        if(parentNode){
            _treeTool.parentNodes.push(parentNode);
            _treeTool.getParentNodes(parentNode);
        }
    },
    /**
     * @description 获取所有的checked属性的nodes
     * @param arr数组
     * @returns 
     */
    getAllCheckedNodes(arr){
        for(let i =0;i<arr.length;i++){
            if(arr[i].__checkboxStatus != 2 && arr[i].__checkboxStatus != false){
                _treeTool.checkedNodes.push(arr[i]);
            }
            let _children = arr[i].__children;
            if(_children && _children instanceof Array && _children.length >0){
                _treeTool.getAllCheckedNodes(_children);
            }
        }
    },
    /**
     * @description 获取所有的checked属性的nodes，不包含父节点
     * @param arr数组
     * @returns 
     */
    getAllCheckboxNodesExcludeParent(arr){
        for(let i =0;i<arr.length;i++){
            if(arr[i].__checkboxStatus && arr[i].__children.length == 0){
                _treeTool.checkedNodes.push(arr[i]);
            }
            let _children = arr[i].__children;
            if(_children && _children instanceof Array && _children.length >0){
                _treeTool.getAllCheckboxNodesExcludeParent(_children);
            }
        }
    },
    getOnlyCheckedNodes(arr){
        for(let i =0;i<arr.length;i++){
            if(arr[i].__checkboxStatus == 1&& arr[i].__children.length == 0){
                _treeTool.checkedNodes.push(arr[i]);
            }
            let _children = arr[i].__children;
            if(_children && _children instanceof Array && _children.length >0){
                _treeTool.getOnlyCheckedNodes(_children);
            }
        }
    }
}

export default _treeTool;