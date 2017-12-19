// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*入口文件*/
/*引入Vue*/
import Vue from "vue";
/*引入路由*/
import router from "./router/index.js";
/*引入主组件*/
import App from "./App.vue";
/*引入element*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/base.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    el:"#root",
    components:{App},
    template:'<App/>',
    router:router,
})
