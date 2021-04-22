<template>
  <div>
    <div class="le_comps_core_css">
      <!-- <h4 class="le_page_name">title</h4>
      <div class="le_list_breadcrumb_pannel">
        <a href="">Product Management > <b>category</b></a>
      </div>
      <div class="le_list_search_pannel clearfix">
        <le-form ref="form1" labelWidth="120">
          <div class="col3">
            <le-remote-select
              showClear
              label="Country:"
              multiple
              ref="remoteSelect"
              v-model="form.remoteSelect"
              display-name="nodeCode" 
              display-value="nodeCode"
              on required
              msg="Country can not be null"
              :remoteOptions="remoteOptions"
          ></le-remote-select>
          </div>
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
              :inSingleSelect="false"
              :multiple="false"
              label="下拉框："
              msg="select is required"
              :data-source="selectList"
              display-name="name"
              display-value="code"
              placeholder="placeholder"
              v-model="form.select"
              @change="selectChange"
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
          <local-table-list
            :options="list_page_option"
          ></local-table-list>
        </le-form>
        <le-button @click="submit" value="验证"></le-button>
        <le-button @click="reset" value="reset"></le-button>
      </div> -->
      <div class="le_list_search_pannel ">
          <textarea-btn
            label="Component Name:"
            v-model="textarea.welMsg"
            values="goPre"
            values1="goPro"
            :isShowPre="true"
            :isShowPro="false"
            :successValue="preSuccessValue"
            :successValue1="proSuccessValue"
            :errorValue="preErrorValue"
            :errorValue1="proErrorValue"
            @clickHandlePre="handlePre"
            @clickHandlePro="handlePro"
          ></textarea-btn>
      </div>
    </div>
  </div>
</template>
<script>

export default {
    data() {
        return {
          remoteOptions: {
                getUrl: () => {
                    return '/productAPI/admin/catalog/search.jhtm?code.condition=start&type.condition=eq&type.value=1&code.value='
                },
                analysis: (data) => {
                    console.log(data);
                    if (data && data.data && data.data.data) {
                        return data.data.data;
                    }
                    return [];
                }
          },
          textarea:{
              welMsg: "",
          },
          preSuccessValue:"",
          proSuccessValue:"",
          preErrorValue:"",
          proErrorValue:"",
            show:false,
            form: {
                checkBox: '',
                radio: '',
                input: '',
                inputNum: '',
                textarea: '',
                select: '',
                remoteSelect: '',
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
            },
            list_page_option: {
                map: [
                    { key: "companyCode", val: "Company ID" },
                    { key: "companyName", val: "Name" },
                    { key: "status", val: "Status"},
                    { key: "convertCountryName", val: "Country" },
                    { key: "convertStoreTypeName", val: "Store Type" },
                    { key: "storeId", val: "Store Id" },
                    { key: "convertStoreName", val: "Store Name" },
                    { key: "tierName", val: "Tier Name" },
                    { key: "createUser", val: "Created By" },
                    {
                        key: "createTime",
                        val: "Created Time",
                        type: "dateTime"
                    },
                    { key: "modifyUser", val: "Last Updated By" },
                    { key: "updateTime", val: "Updated Time", type: "dateTime" }
                ],
                actions: [
                    { key: "update", val: "Modify", action: this.update }
                ],
                getUrl: () => {
                    return `/ofpaccount_admin/adm/smb/company/findSmbCompanyByPage?storeId=${
                        this.$refs.scopeRef.getValue().store
                    }&tierName=${this.searchModel.tierName}&companyName=${
                        this.searchModel.companyName
                    }`;
                },
                pageOption: {
                    sizeKey: "pageSize",
                    indexKey: "pageNumber",
                    index: 1,
                    size: 20
                },
                analysis: data => {
                    if (data && data.data && data.data.data) {
                        let resultData = data.data.data;
                        const storeIdMapping = [];
                        resultData.map(i => {
                            if (i.storeId) {
                                i.tierName = i.companyTierRule.tierName;
                                storeIdMapping.push(i.storeId);
                                i.convertStoreName = "";
                                i.convertCountryName = "";
                                i.convertStoreTypeName = "";
                            }
                        });
                        this.getAllTableStores(storeIdMapping).then(res => {
                            if (res && res.data) {
                                resultData.map(i => {
                                    for (var convertStoreId in res.data) {
                                        if (i.storeId === convertStoreId) {
                                            i.convertStoreName =
                                                res.data[
                                                    convertStoreId
                                                ].Geo_Store.name;
                                            i.convertCountryName =
                                                res.data[
                                                    convertStoreId
                                                ].Geo_Country.name;
                                            i.convertStoreTypeName =
                                                res.data[
                                                    convertStoreId
                                                ].Geo_BusinessType.name;
                                        }
                                    }
                                });
                            }
                        });
                        return {
                            data: data.data.data,
                            count: data.data.totalCount
                        };
                    } else {
                        return { data: [], count: 0 };
                    }
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
        },
        selectChange(val, list) {
          console.log(val);
          console.log(list);
        },
        handlePre(){
            this.preSuccessValue = "123223,456778";
            this.preErrorValue = "123,4534,63488";
        },
        handlePro(){
            this.proSuccessValue = "123,456,789";
            this.proErrorValue = "123,234,345,456";
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