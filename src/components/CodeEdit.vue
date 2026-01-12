<template>
  <div style="width: 100%">
    <VAceEditor
        :options="editOption"
        v-model:value="dataEdit"
        :lang="lang"
        :theme="theme"
        :style="{ minHeight: height }"
    />
    <el-button
        plain
        type="info"
        size="small"
        @click="formatJson"
        v-if="lang === 'json'"
    >
      格式化JSON
    </el-button>
  </div>
</template>

<script setup>
import {computed, onMounted} from 'vue';
import {VAceEditor} from 'vue3-ace-editor';
import ace from 'ace-builds';
// import * as ace from 'ace-builds/src-noconflict/ace';
import {ElMessage} from 'element-plus'

import modeJsonUrl from 'ace-builds/src-noconflict/mode-json?url';
import themeChromeUrl from 'ace-builds/src-noconflict/theme-chrome?url';
import extSearchboxUrl from 'ace-builds/src-noconflict/ext-searchbox?url';
import workerJsonUrl from 'ace-builds/src-noconflict/worker-json?url';
// ace.config.set('basePath', '/ace');
ace.config.setModuleUrl('ace/mode/json', modeJsonUrl);
ace.config.setModuleUrl('ace/theme/chrome', themeChromeUrl);
ace.config.setModuleUrl('ace/ext/searchbox', extSearchboxUrl);
ace.config.setModuleUrl('ace/mode/json_worker', workerJsonUrl);

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/snippets/json';
import 'ace-builds/src-noconflict/snippets/python';
import 'ace-builds/src-noconflict/snippets/html';
import 'ace-builds/src-noconflict/theme-merbivore';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-merbivore';
import 'ace-builds/src-noconflict/worker-json';
import 'ace-builds/src-noconflict/worker-html';

// Props
const props = defineProps({
  lang: {
    type: String,
    default: 'json'
  },
  modelValue: {
    type: [String, Object],
    default: () => '{}'
  },
  theme: {
    type: String,
    default: 'chrome'
  },
  height: {
    type: String,
    default: '200px'
  },
  readOnly: {
    type: Boolean,
    default: false
  }
});

// Emit
const emit = defineEmits(['update:modelValue']);

// State
const dataEdit = computed({
  get() {
    try {
      if (props.lang !== 'json') return props.modelValue
      return typeof props.modelValue === 'object'
          ? JSON.stringify(props.modelValue, null, 4)
          : props.modelValue || '{}';
    } catch (e) {
      return '';
    }
  },
  set(value) {
    if (props.lang !== 'json') {
      emit('update:modelValue', value || '');
    } else {
      try {
        emit('update:modelValue', value);
      } catch (e) {
        emit('update:modelValue', value || '{}');
      }
    }
  }
});

// Computed options for Ace Editor
const editOption = computed(() => ({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  tabSize: 4,
  fontSize: 14,
  useWorker: true,
  showPrintMargin: false,
  enableMultiselect: true,
  readOnly: props.readOnly,
  showFoldWidgets: true,
  fadeFoldWidgets: true,
  wrap: true,
}));

// Methods
function formatJson() {
  if (props.lang === 'json') {
    try {
      const jsObj = JSON.parse(dataEdit.value);
      dataEdit.value = JSON.stringify(jsObj, null, 4);
    } catch (e) {
      ElMessage({
        message: 'JSON 数据格式错误！',
        type: 'info',
        duration: 2000,
      });
    }
  }
}

// Lifecycle hook
onMounted(() => {
  ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict');
});
</script>

<style scoped>
/* 可根据需要添加自定义样式 */
</style>
