import ylToast from "./ylToast.vue";
let ConfirmConstructor, instance

const toast = {
  install(Vue) {
    ConfirmConstructor = Vue.extend(ylToast);
    instance = new ConfirmConstructor().$mount();
    document.body.appendChild(instance.$el);

    Vue.prototype.$ylToast = options => {
      Object.assign(instance, options)
      instance.init();
    }
    Vue.prototype.$ylToast.clear = () => {
      instance.clear();
    }
  }
}
export default toast;