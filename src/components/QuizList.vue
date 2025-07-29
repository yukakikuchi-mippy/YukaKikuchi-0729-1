<template>
  <!-- Vuetifyのレイアウト用コンテナ（全体の枠） -->
  <v-container>

    <!-- 中央揃えにする行 -->
    <v-row justify="center">

      <!-- 中央のカラム：画面幅に応じてサイズ調整 -->
      <v-col cols="12" md="6">

        <!-- タイトル ほぼレクと同じ。1/5とかつけてくてそこを工夫 -->
        <h2 class="text-h5 font-weight-bold text-center mb-4">
          クイズ {{nowIndex+1}} / {{questions.length}}
        </h2>

        <!-- クイズの表示エリア 余白のつけ方は「v-card 余白」でしらべた。pのclassは商品購入の合計金額を参考-->
        <v-card class="mx-4 pa-4 mb-8" style="background-color:rgba(252,204,0,0.8)">
          <p class="text-subtitle-1 font-weight-bold text-center">
            {{ nowQuestion.text }}
          </p>
        </v-card>

        <!-- YesNoボタン v-btn横並びで検索-->
        <div class="d-flex justify-space-between ma-2 pa-2">
         <!--背景をブルーナカラーにしたくて試したけどstyleで断念-->
          <v-btn style="background-color:#15722c; color:white" @click="selectAnswer(true)">はい</v-btn>
          <v-btn style="background-color:#eb6100; color:white" @click="selectAnswer(false)">いいえ</v-btn>
        </div>

        <!-- 5問目のときだけメッセージを表示する-->
        <p v-if="nowIndex === 4" class="text-subtitle-1 font-weight-bold text-center">
          回答が終わったら結果ボタンから点数を確認してみよう！
        </p>

        
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//前回のレク参考
export default {
  name: 'QuizList', // このコンポーネントの名前

  computed: {
    // Vuexストアの state から0からはじまるクイズ番号を取得
    nowIndex() {
      return this.$store.state.quiz.nowIndex;
    },

    // Vuexストアの state からクイズの中身を取得
    questions() {
      return this.$store.state.quiz.questions;
    },

    //表示する問題１問分を取得
    nowQuestion() {
      return this.questions[this.nowIndex];
    },
  },

  methods: {
    // はいかいいえおしたときの
    selectAnswer(userAnswer) {
      // Vuexのサイト調べた
      this.$store.dispatch('quiz/slowAnswer', userAnswer); // 名前空間付きmutation
    }
  }
}
</script>
