var PageHome = {
    template: `
        <div>
            这个是home页面<br />
            加载组件:loading <l-loading v-if="importObject.status" /><br />
            测试另外一个组件的加载：<l-test v-if="importObject.status" />
        </div>
    `,
    mixins: [MixinImport],
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    'script/component/loading.js',
                    'script/component/test.js'
                ]
            }
        };
    },
    created() {
        document.title = '首页';
    }
};

Vue.component('l-page-home', PageHome);