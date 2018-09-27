Vue.component('l-page-home', {
    template: `
        <div>
            这个是home页面<br />
            加载组件:loading <l-loading v-if="loadRely" /><br />
            测试另外一个组件的加载：<l-test v-if="loadRely" />
        </div>
    `,
    data() {
        return {
            loadRely: false,
            relys: [
                'script/component/Loading.js',
                'script/component/test.js'
            ],
        };
    },
    created() {
        Loads.loadElement(this.relys, () => {
            this.loadRely = true;
        });
    }
});