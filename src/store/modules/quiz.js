
export default {
  namespaced: true, // 名前空間を有効にする

  //アプリケーション全体で利用できるデータの保管場所
  state: {
    nowIndex: 0, // 現在のクイズの番号（0からはじまる）
    //クイズの中身 Vue.js クイズででてきたサイトを参考にした
    questions: [
      {
        id: 1,
        text: 'ミッフィーの顔のバッテン × は、おしゃべりすぎてホッチキスで口を止められたのが由来である(・×・)。',
        correctAnswer: false, //いいえが正解てこと
        explanation: '顔のバッテン × は、上半分が鼻、下半分が口です。まぁこれくらいは常識ですね (・×・)💛',//間違えた時の解説をいれてみた
        userAnswer: null //初期値としてnull
      },
      {
        id: 2,
        text: 'ミッフィーの絵本で使われている色の数は、100色以上である。',
        correctAnswer: false,
        explanation: '絵本で使われている色の数は、白黒除いて6色です。赤、黄、緑、青、茶、灰色で「ブルーナカラー」と呼ばれています。',
        userAnswer: null
      },
      {
        id: 3,
        text: '服を着ていない四足歩行のミッフィーが存在する。',
        correctAnswer: false,
        explanation: '服を着ていない四足歩行のうさぎは存在しますが、ミッフィーではなく、特定の名前がない野生の「うさぎ」です🐰。こちらもとってもきゃわ、、ぬい欲しい、、',
        userAnswer: null
      },
     {
        id: 4,
        text: 'ミッフィーは、普段は無地のワンピースを着ているが、好きな子と遊ぶときには花柄のワンピースを着ている。',
        correctAnswer: false,
        explanation: '好きな子と会うときではなく、お誕生日の日に花柄のワンピースを着ます。特別な日にかわいいワンピース着るミッフィー、、、とってもきゃわいいですね💛',
        userAnswer: null
      },
      {
        id: 5,
        text: 'ミッフィーは、、、実は万引きをしたことがある。',
        correctAnswer: true, //はいが正解
        explanation: '絵本「うさこちゃんと きゃらめる」では、なんとミッフィーはキャラメルをこっそりポケットにいれて持ち帰ってしまった様子が描かれています。誰の説教や罰もなく、ミッフィーの心の揺れだけが細かく描かれた見事な作品！',
        userAnswer: null
      },
    ]
  },

  //stateにあるデータを必要な形に整える
  getters: {
  // 得点の計算（1問20点で満点は100に）
  score(state) {
    // 正解した問題だけを集める
    const correctQuestions = state.questions.filter(function(question) {
      return question.userAnswer === question.correctAnswer;
    });

    // 正解数×20点 を返す
    return correctQuestions.length * 20;
  },

  // 間違えた問題だけを取り出す 上のせいかいのとほぼ同じ
  wrongAnswers(state) {
    const wrongList = state.questions.filter(function(question) {
      return question.userAnswer !== null && question.userAnswer !== question.correctAnswer; //条件をかつには&& 回答済かつ間違っているものにしたかった
    });

    return wrongList;
  }
},

  //stateの中にあるデータを書き換えるための要素
  mutations: {
    //問題の変化
    selectAnswer(state, userAnswer) {
      const question = state.questions[state.nowIndex];//今の問題
    if (!question) {
    return;// 問題がもし存在しないときは何もしない
    }
    if (question.userAnswer !== null) {
    return;// すでに答えている場合も何もしない
    }
    // 回答を記録して、次の問題へ進む
    question.userAnswer = userAnswer;
    state.nowIndex++;
    }
    },
    //クイズのリセット
    resetQuiz(state) {
      state.nowIndex = 0;//０に戻す
      for (let i = 0; i < state.questions.length; i++) {
        state.questions[i].userAnswer = null;//userAnswerはstate.userAnswerは無理だからstate.questions[i：1～4].userAnswer = nullで初期化
      }
    },

  //非同期処理を記載する レク参考
  actions: {
  //少しおいてから回答が保存
  async slowAnswer({ commit }, userAnswer) {
    await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5秒待つ
    commit('selectAnswer', userAnswer); // selectAnswerというmutationに、userAnswerを渡して実行
  }
}

}

