<template>
  <div class="selectable-tags">
    <div class="tags-header">
      <div class="tags-title">{{ title }}</div>
      <div class="tags-actions">
        <el-icon
          v-if="allowClear"
          size="small"
          @click="clearSelected"
        >
          <Close />
        </el-icon>
        <el-button
          v-if="allowSelectAll"
          type="text"
          size="small"
          @click="toggleSelectAll"
        >
          {{ isAllSelected ? '取消全选' : '全选' }}
        </el-button>
      </div>
    </div>

    <div class="tags-container">
      <div
        v-for="tag in tags"
        :key="tag.value"
        class="tag-item"
        :class="{
          'is-selected': isSelected(tag.value),
          'is-disabled': tag.disabled
        }"
        @click="handleTagClick(tag)"
      >
        {{ tag.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Close } from '@element-plus/icons-vue'

interface ITag {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface IProps {
  // 标签数据
  tags: ITag[];
  // 是否允许多选
  multiple?: boolean;
  // 已选中的标签值
  modelValue?: string | number | (string | number)[];
  // 是否显示标题
  showHeader?: boolean;
  // 标题文本
  title?: string;
  // 是否允许清除已选
  allowClear?: boolean;
  // 是否允许全选
  allowSelectAll?: boolean;
  // 是否显示底部统计
  showFooter?: boolean;
  // 是否禁用
  disabled?: boolean;
}

// 定义 props
const props = defineProps<Partial<IProps>>();

// 设置默认值
const multiple = props.multiple ?? false;
const title = props.title ?? '标签选择';
const allowClear = props.allowClear ?? true;
const allowSelectAll = props.allowSelectAll ?? true;
const disabled = props.disabled ?? false;
const modelValue = props.modelValue ?? (multiple ? [] : '');

// 事件发射
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | (string | number)[]): void;
  (e: 'change', value: string | number | (string | number)[], tag: ITag): void;
}>();

// 选中的标签值
const selectedValues = ref<(string | number)[]>(Array.isArray(modelValue) ? modelValue : []);

// 是否选中某个标签
const isSelected = (value: string | number) => {
  return selectedValues.value.includes(value);
}

// 处理标签点击
const handleTagClick = (tag: ITag) => {
  if (disabled || tag.disabled) return;

  if (multiple) {
    const index = selectedValues.value.indexOf(tag.value);
    if (index > -1) {
      selectedValues.value.splice(index, 1);
    } else {
      selectedValues.value.push(tag.value);
    }
    emit('update:modelValue', selectedValues.value);
    emit('change', selectedValues.value, tag);
  } else {
    if(selectedValues.value.includes(tag.value)){
      selectedValues.value.shift();
    }else{
      selectedValues.value = [tag.value];
    }
    emit('update:modelValue', selectedValues.value[0]);
    emit('change', selectedValues.value[0], tag);
  }
}

// 清除已选
const clearSelected = () => {
  selectedValues.value = [];
  emit('update:modelValue', multiple ? [] : '');
  emit('change', [], {} as ITag);
}

// 是否全选
const isAllSelected = computed(() => {
  return props.tags.length > 0 && selectedValues.value.length === props.tags.length;
})

// 切换全选状态
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    clearSelected();
  } else {
    selectedValues.value = props.tags.map(tag => tag.value);
    emit('update:modelValue', selectedValues.value);
    emit('change', selectedValues.value, props.tags[0]);
  }
}

// 已选择数量
const selectedCount = computed(() => selectedValues.value.length);
</script>

<style scoped>
.selectable-tags {
  width: 100%;
}

.tags-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.tags-title {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.tags-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.tags-actions .el-icon {
  cursor: pointer;
  color: #909399;
}

.tags-actions .el-icon:hover {
  color: #409EFF;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 4px 0;
}

.tag-item {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  color: #606266;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  cursor: pointer;
  user-select: none;
}

.tag-item:hover:not(.is-disabled) {
  border-color: #c0c4cc;
  color: #303133;
  background-color: #f5f7fa;
}

.tag-item.is-selected {
  background-color: #ecf5ff;
  border-color: #409EFF;
  color: #409EFF;
  font-weight: 500;
}

.tag-item.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
  background-color: #f5f7fa;
}

.tags-footer {
  margin-top: 12px;
  font-size: 12px;
  color: #909399;
  display: flex;
  justify-content: space-between;
}

.selected-count {
  color: #606266;
}
</style>
