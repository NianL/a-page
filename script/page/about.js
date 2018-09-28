var PageAbout = {
    template: `
        <div>
            关于我们
        </div>
    `,
    created() {
        document.title = '关于我们';
    }
};

Vue.component('l-page-about', PageAbout);