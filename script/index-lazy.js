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

var ImportFile = {
    pages: {
        'home': ['script/page/home.js'],
        'article': ['script/page/article.js'],
        'article-detail': ['script/page/article-detail.js'],
        'about': ['script/page/about.js'],
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
                    importFile(item, checkStatus);
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

        function importFile(url, callback) {
            var head = document.getElementsByTagName('head')[0];
            var file = null;
            if (url.indexOf('.js') != -1) {
                file = document.createElement('script');
                file.src = url;

            } else if (url.indexOf('.css') != -1) {
                file = document.createElement('link');
                file.href = url;
                file.rel = "stylesheet";
            }
            if (file) {
                if (typeof (callback) == 'function') {
                    file.onload = file.onreadystatechange = function () {
                        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                            callback();
                            file.onload = file.onreadystatechange = null;
                        }
                    };
                }
                head.appendChild(file);
            }
        }

    }
};

var MixinImport = {
    created() {
        ImportFile.load(this.importObject.data, () => {
            this.importObject.status = true;
        });
    }
};

new Vue({
    el: '#app',
    router: Reouter,
    mixins: [MixinImport],
    template: `
        <div v-if="importObject.status">
            <div class="header">
                <l-menu-nav 
                    v-if="currentMenu" 
                    :default-value="currentMenu" 
                    :data="menuData" 
                    @menu-click="menuClick"
                ></l-menu-nav>
            </div>
            <div class="main">
                <component 
                    v-if="currentPage" 
                    :is="currentPage" 
                />
            </div>
        </div>
    `,
    components: {
        'page-view': {
            props: ['path'],
            render: function (h) {
                return h(this.path);
            }
        }
    },
    data() {
        return {
            importObject: {
                status: false,
                data: [
                    'script/tween.js',
                    'script/common.js',
                    'script/component/menu-nav.js'
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
        pageJump(name, params) {
            this.$router.push({
                name: name,
                params: params
            });
        },
        menuClick(item) {
            this.pageJump(item.value);
        }
    }
});