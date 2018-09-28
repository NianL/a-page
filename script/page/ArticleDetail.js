var PageArticleDetail = {
    template: `
        <div>
            文章详情页面：{{ $route.params.id }}
        </div>
    `,
    data() {
        return {

        }
    },
    created() {
        document.title = '文章 - ' + this.$route.params.id;
    }
};

Vue.component('l-page-article-detail', PageArticleDetail);