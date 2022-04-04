import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import es from 'vuetify/lib/locale/es'

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                //primary: '#002E5D',
                secondary: '#00AB84',
                primary: '#345177',
                //primary:'#264392',
                //primary: '#844574',
                //error: '#b62f54'
            },
        },
    },
})


export default new Vuetify({
    lang: {
        locales: { es},
        current: 'es',
    },
});
