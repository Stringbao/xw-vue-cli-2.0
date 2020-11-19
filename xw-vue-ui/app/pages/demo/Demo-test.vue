<template>
  <div>
    <div class="le_comps_core_css">
      <h4 class="le_page_name">title</h4>
      <div class="le_list_breadcrumb_pannel">
        <a href="">Product Management > <b>category</b></a>
      </div>
      <div class="le_list_search_pannel clearfix">
        <le-form ref="form1" labelWidth="120">
          <div class="col3">
            <le-checkbox-list
              on
              v-show="show"
              required
              label="复选框："
              tip="checkbox's tip"
              :max="2"
              :msg="checkBoxMsg"
              :data-source="checkBoxList"
              display-name="name"
              display-value="code"
              v-model="form.checkBox"
            ></le-checkbox-list>
          </div>
          <div class="col3">
            <le-radio-list
              on
              required
              tip="radio's tip"
              :msg="{ required: 'radio is required' }"
              label="单选框："
              :data-source="radioList"
              display-name="name"
              display-value="code"
              v-model="form.radio"
            ></le-radio-list>
          </div>
          <div class="col3">
            <le-input
              @change="inputChange"
              @focus="inputFocus"
              on
              required
              :rules="inputRules"
              :msg="inputMsg"
              placeholder="input placeholder"
              label="input-名称："
              v-model="form.input"
            ></le-input>
          </div>
          <div class="col3">
            <le-input
              type="password"
              on
              required
              :min="2"
              :max="5"
              :msg="inputNumMsg"
              placeholder="input-number placeholder"
              label="input-数字："
              v-model="form.inputNum"
            ></le-input>
          </div>
          <div class="col3">
            <le-textarea
              on
              required
              :max="5"
              :showClear="true"
              :msg="textareaMsg"
              placeholder="textarea placeholder"
              label="textarea："
              v-model="form.textarea"
            ></le-textarea>
          </div>
          <div class="col3">
            <le-local-select
              on
              required
              enabledInput
              multiple
              label="下拉框："
              msg="select is required"
              :data-source="selectList"
              display-name="name"
              display-value="code"
              placeholder="placeholder"
              v-model="form.select"
            ></le-local-select>
          </div>
          <div class="col3">
            <le-date-picker
              on
              required
              msg="date is required"
              label="日期："
              v-model="form.date"
            ></le-date-picker>
          </div>
          <div class="col3">
            <le-time-picker
                label="时间："
                v-model="form.time"
            ></le-time-picker>
          </div>
          <div class="col3">
            <le-date-time-picker
              on
              required
              msg="datetime is required"
              label="日期时间："
              v-model="form.dateTime"
            ></le-date-time-picker>
          </div>
          <div class="col3">
              <le-upload
                on
                required
                msg="upload is required"
                :options="uploadOptions"
                label="upload："
                v-model="form.upload"
              ></le-upload>
          </div>
          <div class="col3">
              <le-local-upload
                on
                required
                msg="local upload is required"
                :options="localUploadOptions"
                label="local upload："
                v-model="form.localUpload"
              ></le-local-upload>
          </div>
        </le-form>
        <le-button @click="submit" value="验证"></le-button>
        <le-button @click="reset" value="reset"></le-button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
    data() {
        return {
            show:false,
            form: {
                checkBox: '',
                radio: '',
                input: '',
                inputNum: '',
                textarea: '',
                select: '',
                date: '',
                time: '',
                dateTime: '',
                upload: '',
                localUpload: ''
            },
            checkBoxList: [
                {
                    name: '复选框1',
                    code: 'checkBox1'
                },
                {
                    name: '复选框2',
                    code: 'checkBox2'
                },
                {
                    name: '复选框3',
                    code: 'checkBox3'
                }
            ],
            checkBoxMsg: {
                required: 'checkbox is required',
                max: 'checkbox max len is 2'
            },
            radioList: [
                {
                    name: '单选框1',
                    code: 'radio1'
                },
                {
                    name: '单选框2',
                    code: 'radio2'
                },
                {
                    name: '单选框3',
                    code: 'radio3'
                }
            ],
            inputRules: { // 并集，哪个规则return false 即展示对应的errorMsg, 全为true则通过校验
                rule1: (val) => {
                    let reg = /^[\d\w]{5,10}$/; // 字母、数字，5-10
                    return reg.test(val);
                },
                rule2: this.inputRule2
            },
            inputMsg: {
                rule1: '字母、数字，5-10',
                rule2: 'input rule2 error',
                required: 'input-name is required'
            },
            inputNumMsg: {
                min: 'min len is 2',
                max: 'max len is 5',
                required: 'input-num is required'
            },
            textareaMsg: {
                min: 'min len is 2',
                max: 'max len is 5',
                required: 'textarea is required'
            },
            selectList: [
                {
                    name: '下拉框1',
                    code: 'select1'
                },
                {
                    name: '下拉框2',
                    code: 'select2'
                },
                {
                    name: '下拉框3',
                    code: 'select3'
                }
            ],
            uploadOptions: {
                multiple: true, // 是否可以上传多个
                url: "/file/img/upload",
                size: "15",
                vtype: "xlsx",
                msg : "请上传文件!" ,
                tip : "接口上传必传",
                fname: "file",
                analysis: (d) => {
                    return d.data;
                }
            },
            localUploadOptions: {
                size: "15",
                vtype: "xlsx",
                tip : "本地上传必传",
                fname: "file",
                callback: (ck) => {
                    console.log(ck);
                }
            }
        }
    },
    methods: {
        inputChange() {
            console.log('input-change');
        },
        inputFocus() {
            console.log('input-focus');
        },
        inputRule2(value) {
            return true;
        },
        submit(){
            this.$refs['form1'].validate().then(res=>{
                console.log('valid success')
            }).catch(err=>{
                console.log('error')
            })
        },
        reset(){
            this.$refs['form1'].reset();
        }
    },
    mounted(){
        // this.$refs['input1'].focus();
    }
};
</script>
<style lang="scss" scoped>
fieldset:not(:first-child) {
  margin-top: 30px;
}
</style>