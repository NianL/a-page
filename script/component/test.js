Vue.component('l-test', {
    template: `
        <div>
            <button @click="aaa">test{{count}}</button>
        </div>
    `,
    data() {
        return {
            count: 0
        };
    },
    methods: {
        aaa() {
            this.count++
        }
    }
});