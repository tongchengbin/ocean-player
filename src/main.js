import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import './permission' // permission control
const app = createApp(App)
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import "./styles/index.css";
import './styles/var.css';
import "./styles/elementExpand.less";

import * as ElementPlusIconsVue from '@element-plus/icons-vue'



import {
    ElEmpty,
    ElButton,
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElMessage,
    ElMenu,
    ElLink,
    ElMenuItem,
    ElRow,
    ElCol,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElTimeline,
    ElTimelineItem,
    ElCard,
    ElTag,
    ElIcon,
    ElCollapseTransition,
    ElProgress,
    ElTable,
    ElTableColumn,
    ElLoading,
    ElPagination,
    ElAvatar,
    ElTabs,
    ElTabPane,
} from 'element-plus';
app.use(ElLoading);
app.component(ElTabs.name, ElTabs);
app.component(ElTabPane.name, ElTabPane);
app.component(ElAvatar.name, ElAvatar);
app.component(ElPagination.name, ElPagination);
app.component(ElTable.name, ElTable);
app.component(ElTableColumn.name, ElTableColumn);
app.component(ElEmpty.name, ElEmpty);
app.component(ElButton.name, ElButton);
app.component(ElProgress.name, ElProgress);
app.component(ElDialog.name, ElDialog);
app.component(ElForm.name, ElForm);
app.component(ElFormItem.name, ElFormItem);
app.component(ElInput.name, ElInput);
app.component(ElMessage.name, ElMessage);
app.component(ElMenu.name, ElMenu);
app.component(ElMenuItem.name, ElMenuItem);
app.component(ElRow.name, ElRow);
app.component(ElCol.name, ElCol);
app.component(ElDropdownMenu.name, ElDropdownMenu);
app.component(ElTimeline.name, ElTimeline);
app.component(ElTimelineItem.name, ElTimelineItem);
app.component(ElDropdownItem.name, ElDropdownItem);
app.component(ElDropdown.name, ElDropdown);
app.component(ElCard.name, ElCard);
app.component(ElTag.name, ElTag);
app.component(ElIcon.name, ElIcon);
app.component(ElLink.name, ElLink);
app.component(ElCollapseTransition.name, ElCollapseTransition);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.use(router)
app.use(store)

app.mount('#app');
