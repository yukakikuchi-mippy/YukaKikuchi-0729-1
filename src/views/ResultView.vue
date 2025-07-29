<template>
  <!-- 画面全体のレイアウトコンテナ -->
  <v-container>
    
    <!-- 中央揃え -->
    <v-row justify="center">
      
      <!-- 中央のカラム：画面幅に応じてサイズ調整 -->
      <v-col cols="12" md="6" class="text-center">
        
        <!-- タイトル表示 クイズと同じ -->
        <h2 class="text-h5 font-weight-bold text-center mb-4">
          クイズ結果
        </h2>

        <!-- クイズの点数 -->
        <p class="text-subtitle-1 mb-4">
          あなたの得点：<span class="font-weight-bold" style="color:#eb6100;">{{ score}} </span>点
        </p>

        <!-- 100点の場合 -->
        <v-card class="mx-4 pa-4 mb-8" style="background-color:rgba(252,204,0,0.8)"
          v-if="score === 100">
          <p class="text-subtitle-1 font-weight-bold text-center">
            全問正解おめでとう（・×・）！！！
          </p>
        </v-card>

        <!-- 100点じゃなかったときだけ表示 -->
        <!-- 100点じゃなかったときだけ表示 -->
        <div v-if="score !== 100">

          <!-- タイトル-->
          <h3 class="text-subtitle-1 font-weight-bold mb-2">
            間違えた問題の解説
          </h3>

          <!-- 余白が小さめ＝dense調べた 以降のv-list-...はレクとサイト参考 -->
          <v-list dense>

            <!-- レク参考 wrongAnswersという配列の中の1問ずつを変数wrongで取り出して表示する -->
            <v-list-item
              v-for="wrong in wrongAnswers" 
              :key="wrong.id"                
            >

              <v-list-item-content>

                <!-- 間違えた問題の分 -->
                <v-list-item-title>
                  不正解：{{ wrong.text }}
                </v-list-item-title>

                <!-- ユーザーのこたえ -->
                <v-list-item-subtitle>
                  あなたの答え：{{ showAnswer(wrong.userAnswer) }}
                </v-list-item-subtitle>

                <!-- 正解 -->
                <v-list-item-subtitle>
                  正解：{{ showAnswer(wrong.correctAnswer) }}
                </v-list-item-subtitle>

                <!-- 解説文は、折り返して全文が見えるようにwhite-space調べて入れた） -->
                <v-list-item-subtitle style="white-space: normal; white-space: pre-wrap;">
                  解説：{{ wrong.explanation }}
                </v-list-item-subtitle>

              </v-list-item-content>
            </v-list-item>

          </v-list>
        </div>


        <!-- やり直し用のボタン v-dividerレク参考-->
        <v-divider class="my-3"></v-divider>
        <v-btn style="background-color:#737061; color:white" @click="resetQuiz">もう一度挑戦！</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: 'ResultView',// コンポーネントの名前

  computed: {
    //点数を取得 レク参考
    score() {
      return this.$store.getters['quiz/score'];
    },
    //間違えた問題
    wrongAnswers() {
      return this.$store.getters['quiz/wrongAnswers'];
    }
  },

  methods: {
  //
  resetQuiz() {
    this.$store.commit('quiz/resetQuiz');
    this.$router.push('/'); // もう一度のボタン押したらホーム（クイズ）に戻る
  },

  //間違えた問題の解説の時につかう、
  showAnswer(answer) {
    if (answer === true) {
      return 'はい';
    } else if (answer === false) {
      return 'いいえ';
    } else {
      return '未回答';
    }
  }
}

};
</script>
