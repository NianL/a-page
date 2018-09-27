var Config = {};

Config.fileRely = {
    'app': [
        'component/MenuNav.js',
    ],
    'home': [
        'page/home.js',
        'component/Loading.js',
        'component/test.js'
    ],
    'article': [
        'page/article.js'
    ],
    'about': [
        'page/about.js'
    ]
};

new Vue({
    el: '#app',
    router: new VueRouter(),
    template: `
        <div>
            <div class="header">
                <l-menu-nav v-if="loadComponent" :default-value="pathName" :data="menuData" @menu-click="menuClick"></l-menu-nav>
            </div>
            <div class="main">
                <page-view :path="c_pathName" />
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
            loadComponent: false,
            pathName: '',
            menuData: [{
                text: '首页',
                value: 'home'
            }, {
                text: '我的文章',
                value: 'article'
            }, {
                text: '关于',
                value: 'about'
            }],
            loadFile: {
                has: [],
                rely: Config.fileRely
            }
        }
    },
    watch: {
        $route: function (to) {
            this.loadPage(to.path.substr(1));
        },
    },
    computed: {
        c_pathName() {
            if (this.pathName != '') return 'l-page-' + this.pathName;
            else return '';
        }
    },
    created() {
        this.loadElement('app', () => {
            this.loadPage(this.$route.path.substr(1));
            this.loadComponent = true;
        });
    },
    methods: {
        loadPage(name) {
            var _name = name == '' ? this.menuData[0].value : name;
            this.loadElement(_name, () => {
                this.pathName = _name;
            });
        },
        pageJump(value) {
            this.$router.push({
                path: value
            });
        },
        menuClick(item) {
            this.pageJump(item.value);
        },
        loadElement(name, callback) {
            var rely = this.loadFile.rely[name];
            var loadIndex = 0;
            if (rely) {
                rely.map((item) => {
                    if (this.loadFile.has.indexOf(item) == -1) {
                        this.loadFile.has.push(item);
                        Common.importScript(item, checkStatus);
                    } else {
                        checkStatus();
                    }
                });
            }

            function checkStatus() {
                loadIndex++;
                if (loadIndex == rely.length) {
                    callback && callback();
                }
            }
        }
    }
});