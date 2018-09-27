Vue.component('l-test', {
    template: `
        <div>
            <button @click="aaa">test</button>
        </div>
    `,
    data() {
        return {

        };
    },
    methods: {
        aaa(){
            alert(123);
        }
    }
});