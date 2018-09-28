var PageHome = {
    template: `
        <div>
            这个是home页面<br />
            加载组件:loading <l-loading v-if="importObject.status" /><br />
            测试另外一个组件的加载：<l-test v-if="importObject.status" />
        </div>
    `,
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    'script/component/Loading.js',
                    'script/component/test.js'
                ]
            }
        };
    },
    created() {
        document.title = '首页';
        ImportFile.load(this.importObject.data, () => {
            this.importObject.status = true;
        });
    }
};

Vue.component('l-page-home', PageHome);