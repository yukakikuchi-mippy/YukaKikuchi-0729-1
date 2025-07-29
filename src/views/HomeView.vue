<!-- レクと変わらず（ProductListがQuizListに）-->

<template>
  <v-container>
    <QuizList />
  </v-container>
</template>

<script>
  import QuizList from '@/components/QuizList.vue' // クイズコンポーネントを読み込み

  export default {
    name: 'HomeView', // このファイルの名前（Vue DevToolsなどで表示される）
    components: {
      QuizList,     // 上で読み込んだ ProductList をこのテンプレート内で使えるようにする
    },
  }
</script>