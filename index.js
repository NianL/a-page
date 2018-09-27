//文件加载
var Loads = {
    _data: [],
    _rely: { //元素对应的依赖
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
        ],
    },
    element(name, callback) {
        var rely = this._rely[name];
        var loadIndex = 0;
        if (rely) {
            rely.map((item) => {
                if (this._data.indexOf(item) == -1) {
                    this._data.push(item);
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
    },
};

//初始化
new Vue({
    router: new VueRouter(),
    data: {
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
        }]
    },
    watch: {
        $route: function (to, from) {
            this.loadPage(to.path.substr(1));
        },
    },
    computed: {
        c_pathName() {
            if (this.pathName != '') return 'l-page-' + this.pathName;
            else return '';
        }
    },
    mounted() {
        this.loadPage(this.$route.path.substr(1));
    },
    methods: {
        loadPage(name) {
            var _name = name == '' ? this.menuData[0].value : name;
            Loads.element(_name, () => {
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
        }
    }
}).$mount('#app');