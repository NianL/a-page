Vue.component("l-menu-nav", {
    template: '\
        <div class="l-menu" v-if="data.length>0">\
            <ul class="l-menu-nav" ref="menuNav">\
                <li v-for="item,index in data" \
                    :key="index" \
                    :class="{select:index==current}" \
                    v-text="item.text" \
                    @click="menuClick(index,item)" \
                    @mouseover="menuNavOver" \
                    @mouseout="menuNavOut"></li>\
            </ul>\
            <div class="l-menu-line" :style="c_lineStyle"></div>\
        </div>\
    ',
    props: {
        defaultText: String,
        defaultValue: String,
        data: {
            type: Array,
            default: []
        }
    },
    data: function () {
        return {
            timeOut: null,
            current: null,
            lineStatus: {
                width: 0,
                left: 0
            },
            loadingAnimate: false
        };
    },
    watch: {
        current: function (n, o) {
            var lis = this.$refs.menuNav.querySelectorAll("li");
            if (n != null && o != null && this.loadingAnimate) {
                this.lineStatus = this.getSiteInfo(lis[o]);
                this.menuAnimate(lis[n]);
            } else {
                this.lineStatus = this.getSiteInfo(lis[n]);
            }
        },
        defaultText: function () {
            this.setDefaultItem();
        },
        defaultValue: function () {
            this.setDefaultItem();
        }
    },
    computed: {
        c_lineStyle: function () {
            return {
                "width": this.lineStatus.width.toFixed(0) + "px",
                "margin-left": this.lineStatus.left.toFixed(0) + "px",
            };
        }
    },
    created: function () {
        this.setDefaultItem();
    },
    methods: {
        setDefaultItem: function () {
            var desaultItem = this.defaultText || this.defaultValue;
            if (desaultItem) {
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].text.toLowerCase() == desaultItem.toLowerCase() ||
                        this.data[i].value.toLowerCase() == desaultItem.toLowerCase()
                    ) {
                        this.current = i;
                        break;
                    }
                }
            }
        },
        getSiteInfo: function (e) {
            return {
                width: e.clientWidth,
                left: e.getBoundingClientRect().left - e.parentNode.getBoundingClientRect().left
            }
        },
        menuAnimate: function (e) {
            var _this = this;
            this.loadingAnimate = true;
            this.tween(this.lineStatus, this.getSiteInfo(e), function (active) {
                _this.lineStatus = {
                    width: active.width,
                    left: active.left
                };
            });
        },
        menuNavOver: function (e) {
            clearTimeout(this.timeOut);
            this.menuAnimate(e.currentTarget || e.target);
        },
        menuNavOut: function (e) {
            var _this = this;
            this.timeOut = setTimeout(function () {
                _this.menuAnimate(_this.$refs.menuNav.querySelector(".select"));
            }, 300);
        },
        tween: function (startObj, endObj, callback) {
            function animate() {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate);
                }
            }
            new TWEEN.Tween(startObj)
                .to(endObj, 200)
                .onUpdate(function () {
                    callback(this);
                }).start();

            animate();
        },
        menuClick: function (index, item) {
            this.current = index;
            this.$emit("menu-click", item);
        }
    }
});