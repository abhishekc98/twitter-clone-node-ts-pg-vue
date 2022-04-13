import LandingPage from '../components/Landing.vue';
import SignUp from '../components/Signup.vue';
import SignIn from '../components/SignIn.vue';
import HomePage from '../components/Home.vue';
import VueRouter from 'vue-router';
import store from '../store';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/register', component: SignUp },
  { path: '/home', component: HomePage },
  { path: '/login', component: SignIn },

  // otherwise redirect to home
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const privatePages = ['/home'];
  const isLoggedIn = store.state.login.isLoggedIn;
  if (!isLoggedIn && privatePages.includes(to.path)) {
    return next('/login');
  }
  next();
});

export default router;
