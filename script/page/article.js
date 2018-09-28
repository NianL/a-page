var PageArticle = {
    template: `
        <div>
            <ul>
                <li v-for="item in data" @click="viewDetail(item)">文章-{{ item }}</li>
            </ul>
        </div>
    `,
    data() {
        return {
            data: [1, 2, 3]
        }
    },
    created() {
        document.title = '我的文章';
    },
    methods: {
        viewDetail(item) {
            this.$router.push({
                name: 'article-detail',
                params: {
                    id: item
                }
            });
        }
    }
};

Vue.component('l-page-article', PageArticle);