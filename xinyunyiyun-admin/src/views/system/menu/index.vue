<template>
  <div class="menu-page">
    <el-form :model="form">
      <el-form-item label="" :label-width="formLabelWidth">
        <el-upload class="upload-demo" ref="uploadExcel" drag :action="sendURL" :limit=limitNum :auto-upload="false"
          accept=".xlsx" :before-upload="beforeUploadFile" :on-change="fileChange" :on-exceed="exceedFile"
          :on-success="handleSuccess" :on-error="handleError" :file-list="fileList" multiple="false">
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              只能上传xlsx文件，且不超过10M
            </div>
          </template>
        </el-upload>
        <!-- <el-upload darg ref="uploadExcel" action="https://jsonplaceholder.typicode.com/posts/" :limit=limitNum
        :auto-upload="false" accept=".xlsx" :before-upload="beforeUploadFile" :on-change="fileChange"
        :on-exceed="exceedFile" :on-success="handleSuccess" :on-error="handleError" :file-list="fileList">
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <el-button size="small" plain>选择文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xlsx(Excel2007)文件，且不超过10M</div>
      </el-upload> -->
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
        <el-button size="small">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      limitNum: 1,
      formLabelWidth: '0px',
      form: {
        file: '',
        file1: '',
      },
      fileList: [],
      //sendURL:'https://jsonplaceholder.typicode.com/posts/',
      sendURL: 'http://ivapi.xinyunyiyun.cn/admin/userImport'
    }
  },
  methods: {
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$notify.warning({
        title: '警告',
        message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
      });
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log('change')
      console.log(file)
      this.form.file = file.raw;
      this.form.file1 = file.raw;
      console.log(this.form.file)
      console.log(fileList)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log('before upload')
      console.log(file)
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024
      if (extension !== 'xlsx') {
        this.$notify.warning({
          title: '警告',
          message: `只能上传Excel2017（即后缀是.xlsx）的文件`
        });
      }
      if (size > 10) {
        this.$notify.warning({
          title: '警告',
          message: `文件大小不得超过10M`
        });
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      console.log('handleSuccess======', res, file, fileList);
      const { code, msg, data } = res;
      if (code == 1 && data) {
        this.$notify.success({
          title: '成功',
          message: `文件上传成功,成功导入${data?.imported}条数据`
        });
      } else {
        this.$notify.error({
          title: '错误',
          message: msg
        });
      }
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      console.log('handleError======', err, file, fileList)
      this.$notify.error({
        title: '错误',
        message: `文件上传失败`
      });
    },
    uploadFile() {
      this.$refs.uploadExcel.submit()

      // let formData = new FormData()
      // formData.append('file', this.form.file)
      // formData.append('file1', this.form.file)
      // // axios.post('https://jsonplaceholder.typicode.com/posts/', 
      // axios.post(this.sendURL,
      //   formData,
      //   { "Content-Type": "multipart/form-data" }
      // )
      //   .then(res => {
      //     console.log('uploadFile---res=====')
      //     console.log(res)
      //   })
      //   .catch(err => {

      //   })

    }
  }
}
</script>

<style lang="scss" scoped>
.menu-page {
  padding: 10px;
}

.upload-demo {
  width: 100%;
}
</style>