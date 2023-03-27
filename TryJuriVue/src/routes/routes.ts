import home from './home-content.vue';
import examples from './suspended-examples.vue';
import readme from './suspended-readme.vue';

const routes = [
  { path: '/', component: home },
  { path: '/readme', component: readme },
  { path: '/examples', component: examples },
];

export default routes;
