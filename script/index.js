var ImportFile = {
    has: [],
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

new Vue({
    el: '#app',
    router: new VueRouter(),
    template: `
        <div>
            <div class="header">
                <l-menu-nav 
                    v-if="loadRely && pathInfo" 
                    :default-value="pathInfo.value" 
                    :data="menuData" 
                    @menu-click="menuClick"
                ></l-menu-nav>
            </div>
            <div class="main">
                <page-view 
                    v-if="pathInfo" 
                    :path="'l-page-'+pathInfo.value" 
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
            loadRely: false,
            pathInfo: null,
            menuData: [{
                text: '首页',
                value: 'home',
                imports: [
                    'script/page/home.js'
                ]
            }, {
                text: '我的文章',
                value: 'article',
                imports: [
                    'script/page/article.js'
                ]
            }, {
                text: '关于',
                value: 'about',
                imports: [
                    'script/page/about.js'
                ]
            }],
            imports: [
                'script/component/MenuNav.js'
            ]
        }
    },
    watch: {
        $route: function (to) {
            this.loadPage(to.path.substr(1));
        },
    },
    created() {
        ImportFile.load(this.imports, () => {
            this.loadPage(this.$route.path.substr(1));
            this.loadRely = true;
        });
    },
    methods: {
        loadPage(name) {
            var _name = name == '' ? this.menuData[0].value : name;
            var tempItem = this.menuData[0];
            for (var i = 0; i < this.menuData.length; i++) {
                if (_name == this.menuData[i].value) {
                    tempItem = this.menuData[i];
                    break;
                }
            }
            ImportFile.load(tempItem.imports, () => {
                this.pathInfo = tempItem;
            });
        },
        pageJump(value) {
            this.$router.push({
                path: value
            });
        },
        menuClick(item) {
            this.pageJump(item.value);
        }
    }
});