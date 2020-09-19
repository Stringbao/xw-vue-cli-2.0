import Vue from "vue";
import Main from './main.vue';
import tool from "../leCompsTool.js";
function isVNode(node) {
    return node !== null && typeof node === 'object' && hasOwnProperty.call(node, 'componentOptions');
};
function merge(target) {
    for (let i = 1, len = arguments.length; i < len; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }
    return target;
}

const defaults = {
    title: "提示",
    closed: false,
    message:"",
}

let MessageBoxConstructor = Vue.extend(Main);
let instance;
let msgQueue = [];
let seed = 1;



const MessageBox = function (options, callback) {
    if (typeof options === 'string' || isVNode(options)) {
        options = {
            message: options
        };
        if (typeof arguments[1] === 'string') {
            options.message = arguments[1];
        }
    } else if (options.callback && !callback) {
        callback = options.callback;
    }
    options = merge({}, defaults,options);
    let id = 'messageBox_' + seed++;

    instance = new MessageBoxConstructor({
        el:document.createElement('div'),
        data: options
    });

    let userOnClose  = options.onClose;
    options.onClose = function(){
        MessageBox.close(id,userOnClose)
    }
    instance.id = id;
    instance.callback = callback;
    document.body.appendChild(instance.$el);
    instance.$el.style.zIndex = tool._idSeed.newId();
    msgQueue.push(instance);
    Vue.nextTick(() => {
        instance.visible = true;
    });
}
MessageBox.close = function(id,userOnClose){
    let len = msgQueue.length;
    let index = -1;
    for (let i = 0; i < len; i++) {
        if (id === msgQueue[i].id) {
            index = i;
            if (typeof userOnClose === 'function') {
                userOnClose(msgQueue[i]);
            }
            msgQueue.splice(i, 1);
            break;
        }
    }
}


export default MessageBox;