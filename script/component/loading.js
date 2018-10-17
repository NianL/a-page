Vue.component('l-loading', {
    template: '\
        <div class="l-loading">\
            <div class="bounce1"></div>\
            <div class="bounce2"></div>\
            <div class="bounce3"></div>\
        </div>\
    ',
    data: function () {
        return {
            styleObj: {}
        };
    },
    props: {
        'size': {
            type: String,
            default: '5'
        }
    },
    created: function () {
        var size = this.size || 5;
        this.styleObj = {
            width: size + "px",
            height: size + "px"
        };
    }
});