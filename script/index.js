//路由配置，因为加载顺序，未使用component
//name对应ImportFile.pages
var Reouter = new VueRouter({
    routes: [{
        path: '/',
        name: ''
    }, {
        path: '/home',
        name: 'home'
    }, {
        path: '/article',
        name: 'article'
    }, {
        path: '/article/:id',
        name: 'article-detail'
    }, {
        path: '/about',
        name: 'about'
    }]
});

//加载页面和文件
var ImportFile = {
    pages: {
        'home': ['script/page/Home.js'],
        'article': ['script/page/Article.js'],
        'article-detail': ['script/page/ArticleDetail.js'],
        'about': ['script/page/About.js'],
    },
    has: [],
    page(name, callback) {
        this.load(this.pages[name], callback);
    },
    load(imports, callback) {
        var loadIndex = 0;
        if (imports) {
            imports.map((item) => {
                if (this.has.indexOf(item) == -1) {
                    this.has.push(item);
                    Common.importScript(item, checkStatus);
                } else {
                    checkStatus();
                }
            });
        }

        function checkStatus() {
            loadIndex++;
            if (loadIndex == imports.length) {
                callback && callback();
            }
        }
    }
};

//混入对象-自动加载文件
var MixinImport = {
    created() {
        ImportFile.load(this.importObject.data, () => {
            this.importObject.status = true;
        });
    }
};

//初始化
new Vue({
    el: '#app',
    router: Reouter,
    mixins: [MixinImport],
    template: `
        <div>
            <div class="header">
                <l-menu-nav 
                    v-if="importObject.status && currentMenu" 
                    :default-value="currentMenu" 
                    :data="menuData" 
                    @menu-click="menuClick"
                ></l-menu-nav>
            </div>
            <div class="main">
                <page-view 
                    v-if="currentPage" 
                    :path="currentPage" 
                />
            </div>
        </div>
    `,
    components: {
        'page-view': {
            props: ['path'],
            render: function (h) {
                return h(this.path);
            },
        }
    },
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    'script/component/MenuNav.js'
                ]
            },
            currentMenu: null,
            currentPage: null,
            menuData: [{
                text: '首页',
                value: 'home'
            }, {
                text: '我的文章',
                value: 'article'
            }, {
                text: '关于',
                value: 'about'
            }]
        }
    },
    watch: {
        $route: function (to) {
            this.loadPage(to.name);
        },
    },
    created() {
        this.loadPage(this.$route.name);
    },
    methods: {
        loadPage(name) {
            var _name = name == '' ? this.menuData[0].value : name;
            ImportFile.page(_name, () => {
                this.currentMenu = _name.split('-')[0];
                this.currentPage = 'l-page-' + _name;
            });
        },
        pageJump(value) {
            this.$router.push({
                name: value
            });
        },
        menuClick(item) {
            this.pageJump(item.value);
        }
    }
});