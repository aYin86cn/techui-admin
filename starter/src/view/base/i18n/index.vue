<script setup>
import { lockLang } from "@techui/utils";
import { inject, onMounted, reactive } from 'vue';

const {getSysLang,i18n} = inject('$global')

const state = reactive({
  langs: [
    { label: "简中", value: "cn" },
    { label: "繁中", value: "hk" },
    { label: "English", value: "en" },
  ],
  currentLang: 'cn'
});

onMounted(() => {
  console.log("getSysLang",getSysLang());
  state.currentLang = getSysLang();
  console.log("state.currentLang",state.currentLang);
  
});

const handleLanguageChange = (lang) => {
  console.log("lang",lang);
  
  lockLang(lang)
  setTimeout(() => {
    location.reload();
  }, 300);
};

const getCurrentLangLabel = () => {
  return state.langs.find(lang => lang.value === state.currentLang)?.label || '简中';
};
</script>
<template>
  <div class="language-switcher-demo">
    <div class="header">
      <i class="tui-icon ti-language-switch"></i>
      <h2>{{ i18n("i18n.switch") }}</h2>
    </div>
    <div class="lang-buttons">
      <TuiButton
        v-for="lang in state.langs"
        size="large"
        :key="lang.value"
        :class="{ 'is-active': state.currentLang === lang.value }"
        @click="handleLanguageChange(lang.value)"
      >
        {{ lang.label }}
      </TuiButton>
    </div>
    <p class="current-lang">
      {{ i18n("i18n.current") }}: <span>{{ getCurrentLangLabel() }}</span>
    </p>
    <p class="desc"><i class="tui-icon tis-info-circle"></i>{{ i18n("i18n.description") }}</p>
    <p class="notice"><i class="tui-icon tis-alert-triangle"></i>{{ i18n("i18n.notice") }}</p>
  </div>
</template>
<style lang="less">
.language-switcher-demo {.centerAbsolute; width: 400px; padding: 30px; border-radius: 12px; 
  .bgc(var(--common-bg));
  box-shadow: 0 4px 10px var(--shadow-weak);
  .header { margin:10px 0 0 0; .centerFlex;
    .tui-icon{font-size: 32px; margin-right:10px;}
    h2 { margin: 0; text-align: center; font-size: 24px; font-weight: 600; }
  }
  .lang-buttons { display: flex; flex-direction: column; gap: 12px; margin:40px 0;
    .tui-button {margin:0; width: 100%; }
  }
  .current-lang { margin-top: 20px; text-align: center; font-size: 14px;
    span { font-weight: 600; .fc(var(--primary-base));}
  }
  .desc{font-size: 12px;text-align: center; .fc(var(--primary-base));
    .tui-icon{ vertical-align: bottom; margin-right:5px; }
  }
  .notice{font-size: 12px; text-align: center; .fc(var(--warning-base));
    .tui-icon{ vertical-align: bottom; margin-right:5px; }
  }
}
</style>