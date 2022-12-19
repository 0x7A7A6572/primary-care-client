<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
@import url('./common/base.css');
@import url('./common/reset.css');



#app{
  background: var(--color-mian-bg);
  width: 100vw;
  height: 100vh;
}
</style>
