<template lang="html">
    <div>
    <sui-menu :widths="6">
        <sui-menu-item 
        v-for="option in options" 
        :key="option.label">
        <sui-dropdown :text="option.label">
            <sui-dropdown-menu>
                <sui-dropdown-item v-for="sub in option.subs" :key="sub">{{sub}}</sui-dropdown-item>
            </sui-dropdown-menu>
        </sui-dropdown>
        </sui-menu-item>
        <sui-menu-item>
            Про нас
        </sui-menu-item>
        <sui-menu-item v-if="loggedIn">
            <sui-button icon="user" basic label-position="left" content="Профіль" /> 
        </sui-menu-item>
        <sui-menu-item  v-else>
            <sui-button-group>
                <!-- nuxt-link as sui-button -->
                <sui-button basic primary content="Вхід" />
                <sui-button basic secondary content="Реєстрація" />
            </sui-button-group>
        </sui-menu-item>
    </sui-menu>
    </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          label: "Продаж",
          subs: ["Квартири", "Будинки", "Ділянки", "Коммерційна"],
        },
        {
          label: "Покупка",
          subs: ["Квартири", "Будинки", "Ділянки", "Коммерційна"],
        },
        {
          label: "Аренда",
          subs: ["Кварити", "Будинки", "Коммерційа"],
        },
      ],

      loggedIn: true,
    };
  },
};
</script>

<style scoped>
</style>