<template>
  <el-form ref="form" :model="data" label-width="100px">
    <el-form-item :label="$t('分组名称')" prop="title">
      <el-input v-model.trim="title" readonly />
    </el-form-item>

    <el-form-item :label="$t('权限路由')" prop="access">
      <el-tree
        ref="tree"
        class="admin-access"
        :props="props"
        :data="list"
        show-checkbox
        node-key="id"
        :highlight-current="true"
        :default-expand-all="false"
        :expand-on-click-node="false"
        @check-change="treeCheck"
      >
        <template slot-scope="scope">
          <span class="rule-title" :title="scope.data.title">
            {{ scope.data.title }}【{{ scope.data.method }}】
          </span>
        </template>
      </el-tree>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">{{ $t('提交') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getGroupDetail, updateGroupAccess } from '@/api/authGroup'
import { getRuleTreeList } from '@/api/authRule'

export default {
  name: 'AuthGroupAccess',
  components: { },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      id: '',
      title: '',
      data: {
        access: ''
      },
      props: {
        label: 'title'
      },
      list: [],
      checkedids: ''
    }
  },
  watch: {
    item: {
      handler(val, oldVal) {
        if (this.item.dialogVisible == true) {
          this.id = val.id
          this.featchData()
        }
      },
      deep: true
    }
  },
  created() {
    const id = this.item.id
    this.id = id
    this.title = this.item.title

    this.featchData()
  },
  methods: {
    async featchData() {
      await this.fetchRules()

      await this.fetchGroupDetail()
    },
    fetchGroupDetail() {
      const thiz = this

      return getGroupDetail(this.id).then(response => {
        const rule_accesses = response.data.rule_accesses
        this.data.access = rule_accesses.join(',')

        if (rule_accesses.length > 0) {
          rule_accesses.forEach((i, n) => {
            const node = thiz.$refs.tree.getNode(i)
            if (node['isLeaf']) {
              thiz.$refs.tree.setChecked(node, true)
            }
          })
        }
      })
    },
    fetchRules() {
      return getRuleTreeList().then((res) => {
        this.list = res.data.list
      })
    },
    treeCheck() {
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      const HalfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()

      this.checkedids = checkedKeys.concat(HalfCheckedKeys).join(',')
    },
    submit() {
      const thiz = this
      updateGroupAccess(this.id, {
        access: this.checkedids
      }).then(response => {
        this.$message({
          message: this.$t('分组授权成功'),
          type: 'success',
          duration: 2 * 1000,
          onClose() {
            if (thiz.$refs.form !== undefined) {
              thiz.$refs.form.resetFields()
            }
            thiz.item.dialogVisible = false
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.admin-access {
  background-color: #FFFFFF;
  background-image: none;
  border-radius: 5px;
  border: 1px solid #DCDFE6;
  padding: 8px 5px;
}
</style>