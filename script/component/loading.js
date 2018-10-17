Vue.component('l-loading', {
    template: '<div class="l-loading" :style="styleObj">',
    data: function () {
        return {
            styleObj: {}
        };
    },
    props: {
        'size': {
            type: Number,
            default: 3
        }
    },
    created: function () {
        var size = parseInt(this.size) * 5;
        this.styleObj = {
            width: size + 'px',
            height: size + 'px',
            'border-width': (size / 10) + 'px'
        };
    }
});