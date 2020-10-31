import Vue from "vue";
import { $idSeed,$util,$obj } from "../leCompsTool.js";
import Main from "./main";

function isVNode(node) {
    return node !== null && typeof node === 'object' && hasOwnProperty.call(node, 'componentOptions');
};

let MessageConstructor = Vue.extend(Main);
let instance;
let instances = [];
let seed = 1;

const defaultOptions = {
    offset : 20
}

const Message = function (options) {
    options = options || defaultOptions;
    if (typeof options === 'string') {
        options = {
            message: options
        };
    }
    let userOnClose = options.onClose;
    let id = 'message_' + seed++;

    options.onClose = function () {
        Message.close(id, userOnClose);
    };

    instance = new MessageConstructor({
        data: options
    })
    instance.id = id;
    if (isVNode(instance.message)) {
        instance.$slots.default = [instance.message];
        instance.message = null;
    }
    instance.$mount();
    document.body.insertBefore(instance.$el,document.body.children[0]);
    let verticalOffset = options.offset;
    // instances.forEach(item => {
    //     verticalOffset += item.$el.offsetHeight + 16;
    // });
    instance.verticalOffset = verticalOffset;
    instance.visible = true;
    instance.$el.style.zIndex = $idSeed.newId();
    
    instances.push(instance);
}


Message.close = function (id, userOnClose) {
    let len = instances.length;
    let index = -1;
    let removedHeight;
    for (let i = 0; i < len; i++) {
        if (id === instances[i].id) {
            removedHeight = instances[i].$el.offsetHeight;
            index = i;
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i]);
            }
            instances.splice(i, 1);
            break;
        }
    }
    if (len <= 1 || index === -1 || index > instances.length - 1) return;
    for (let i = index; i < len - 1; i++) {
        let dom = instances[i].$el;
        dom.style['top'] =
            parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
    }
}


Message.closeAll = function () {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
};

export default Message;