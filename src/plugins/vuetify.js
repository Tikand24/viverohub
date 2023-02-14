import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);
import es from 'vuetify/lib/locale/es'

export default new Vuetify({
    theme: { light : true },
    lang: {
        locales: { es },
        current: 'es',
      },
});
