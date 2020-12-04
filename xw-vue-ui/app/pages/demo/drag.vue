<template>
  <div class="drag-parent">
    <div class="drags">
        <le-drag
            class="parents"
            ghost-class="ghost"
            tag="p"
            :disabled="disabled === 1"
            :options="options"
            v-model="data"
            @update="update"
            @change="change"
            @start="start"
            @end="end"
            :move="checkMove"
        >
            <li class="item" v-for="(item, ind) in data" :key="ind">{{ind % 2 === 1 ? '禁止拖拽' : ''}}{{ item.name }}</li>
            <!-- <button slot="footer" @click="btnClick">Add</button> -->
            <li>循环外：11</li>
        </le-drag>

        <le-drag class="parents" :disabled="disabled === 2" element="ul" :options="options1" v-model="data1">
            <li v-for="(item, ind) in data1" :key="ind">{{ item.name }}</li>
        </le-drag>

        <le-drag class="parents" ghost-class="ghost" :disabled="disabled === 3" element="ul" :options="options2" v-model="data2">
            <li v-for="(item, ind) in data2" :key="ind">{{ item.name }}</li>
        </le-drag>
    </div>
    <div class="datas">
      <div>{{ data }}</div>
      <div>{{ data1 }}</div>
      <div>{{ data2 }}</div>
    </div>
    <div class="checkbox">
        <le-radio-list label="是否禁用拖拽:" :data-source="radioBox" display-name="name" display-value="code" v-model="disabled"></le-radio-list>
        <le-button value="reset Disabled" @click="disabled = ''"></le-button>
    </div>
  </div>
</template>
<script>
export default {
    name: 'draggable',
    data() {
        return {
            disabled: '',
            radioBox: [
                {name: 'is disabled', code: 1},
                {name: 'is disabled1', code: 2},
                {name: 'is disabled2', code: 3}
            ],
            options: {
                group: 'sameGroup',
                draggable: '.item'
            },
            options1: {
                group: 'sameGroup'
            },
            options2: {
                group: 'sameGroup',
            },
            data: [
                {
                    id: 1,
                    name: '1'
                },
                {
                    id: 2,
                    name: '2'
                },
                {
                    id: 3,
                    name: '3'
                },
                {
                    id: 4,
                    name: '4'
                },
                {
                    id: 5,
                    name: '5'
                }
            ],
            data1: [
                {
                    id: 6,
                    name: '6'
                },
                {
                    id: 7,
                    name: '7'
                },
                {
                    id: 8,
                    name: '8'
                },
                {
                    id: 9,
                    name: '9'
                },
                {
                    id: 10,
                    name: '10'
                }
            ],
            data2: []
        };
    },
    created() {
    },
    methods: {
        checkMove(e) {
            console.log("Future index: " + e.draggedContext.futureIndex);
        },
        update(a) {console.log(a)},
        change(a) {console.log(a)},
        start(a) {console.log(a)},
        end(a) {console.log(a)},
    },
}
</script>
<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.parents {
    width: 200px;
}
.drag-parent {
  .drags {
    display: flex;
    justify-content: center;
  }
  .datas {
    text-align: center;
    display: flex;
    justify-content: center;
    div {
      width: 200px;
    }
  }
  .checkbox {
      text-align: center;
      user-select: none;
  }
  li {
    text-align: center;
    user-select: none;
    cursor: pointer;
    width: 200px;
    height: 50px;
    line-height: 50px;
    background: #f00;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
}
</style>