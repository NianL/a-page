//视图组件
Vue.component('l-view', {
    props: ['path'],
    render: function (h) {
        return h(this.path);
    },
});