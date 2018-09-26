Vue.component('l-loading', {
    template: `
        <div class="l-loading">
            <div :style="styleObj"></div>
            <div :style="styleObj"></div>
            <div :style="styleObj"></div>
        </div>
    `,
    data() {
        return {
            styleObj: {}
        };
    },
    props: ["size"],
    created() {
        var size = this.size || 5;
        this.styleObj = {
            width: size + "px",
            height: size + "px"
        };
    }
});