# 概念
## DOM（Document Object Model）
- JavaScriptでHTMLを操作するためのインターフェース
  ```
  // documentがDOMインターフェース
  const button = document.getElementById("button-id");
  ```
- 課題：DOMの更新は動作が重く、大規模になるとパフォーマンスが落ちる
  - 仮想DOM：ブラウザ上のリアルDOMとは別に仮想のDOMを用意し、DOM変更操作は最初に仮想DOM側の該当箇所を変更→変更差分を検証→リアルDOMの該当箇所のみを反映する仕組み

## レンダリングと描画
- レンダリング
  - コンポーネントが新しいPropsやStateを受け取った際に、それらを差分として取り込んだ新しい仮想DOMを生成するプロセス
  - 初回起動時・コンポーネントの状態がPropsやStateの更新で変化した時・親コンポーネントが再レンダリングされた時に発生する

- 描画
  - レンダリングで更新されたリアルDOMをブラウザに反映するプロセス

## Props
- 親コンポーネント - 子コンポーネント間の変数や関数の受け渡しに利用するオブジェクト
- 親側
  ```
  <ColorMessage color="blue">元気です</ColorMessage>
  ```
- 小側
  ```
  export const ColorMessage = (props) => {
    const { color, children } = props; //propsの分割代入
    const style = {
      color, //オブジェクト省略記法
      fontSize: "18px",
    };

    return <p stype={style}>{children}</p>;
  };
    ```

## State
- コンポーネント内に閉じたコンポーネントの状態を持つデータ
  - 例：ドロップダウンが開いている状態、ログインユーザ名などの外部データ、など
- 仮想DOMとの差分をとり、実際のDOMを更新し、コンポーネントを再描画するための基本的な方法
- `useState()`関数の戻り値（Stateの実際の値と、Stateを更新するための関数）を配列の分割代入で受け取る
  ```
  const [var, setVar] = useState(0);
  ```
- 例：以下の関数を使うことで、`var`をインクメントできる
  ```
  const setNumber = () => {
    setVar( var + 1);
  }
  ```
- State更新関数は、特定の関数の中で複数定義されている場合、まとめて一括で評価される

  - ボタンのOn/Offで顔文字の表示を切り替えるコード
    ```
    export const App = () => {
      const [isShowFace, setIsShowFace] = useState(true);
      const onClickToggle = () => {
        setIsShowFace(!isShowFace);
      };

      return (
        <>
          <button onClick={onClickToggle}>on/off</button>
          {isShowFace && <p>(*´ω｀)</p>}
        </>
      );
    }
    ```

## Hook
### useEffect
- DOMの更新、つまりコンポーネントがユーザに表示された後に実行したい副作用（APIからのデータ取得、タイマー設定、ローカルストレージ書き込みなど）を定義する
  ```
  useEffect(() => {
    const timer = setInterval(() => {
      // 処理
    }, 1000);

    // コンポーネントがアンマウントされるときにクリーンアップ関数が実行される
    return () => {
      clearInterval(timer);
    };
  }, []);
  ```

- 依存配列に変数が設定されている場合、その変数が変化したタイミングで定義しているcallback関数が実行される
- 依存配列が空の場合、コンポーネントの初回描画（マウント）の時のみ定義しているcallback関数が実行される
- 依存配列自体を省略した場合、描画が起こるたびに定義しているcallback関数が実行される
- 基本的には外部システムとの連携を伴う副作用にのみ使うべき（https://zenn.dev/yend724/articles/20240711-qfbqiba6m9iul2al ）




# 開発環境構築
## インストール
```
mise install
npm install -g typescript
```

## セットアップ

### yarnコマンド
- `yarn create`コマンドは、`create-<starter-kit-package>`のグローバルインストール（あれば最新アップデート）と、`create-<starter-kit-package>`の実行を同時に行うコマンドである
    ```
    例
    yarn create react-app my-app
    ```
- `yarn install`コマンドは、実行ディレクトリにある`package.json`ファイルに記述されているパッケージを`node_modules`ディレクトリにインストールする（結果は`package-lock.json`に記録される）
- `package.json`ファイルが存在しない場合は、`yarn init`コマンドで作成する（依存関係記録のためにあった方がいい）
    ```
    yarn install
    ```
- `install`コマンドオプションの使い分け
    |コマンド|用途|
    |---|---|
    |`yarn install <package>`|`package.json`に対して、本番環境でも使用するローカルインストールパッケージを追加したい時|
    |`yarn install -D <package>`|`package.json`に対して、開発環境でしか使用しないローカルインストールパッケージを追加したい時|
    |`yarn install`|`package.json`を元に`node_modules`を作成・更新したい時|
    |`yarn install -g <package>`|対象パッケージをグローバルインストールしたい（どのディレクトリでも使用できる状態にしたい）時|
    |`yarn install --production`|`npm install -D <package>`で`package.json`に追加したパッケージを除外して`node_module`にパッケージをインストールしたい時|


# 構成
- `src`ディレクトリ
    - コンパイル前のソースを格納
    - React開発の場合、ページコンポーネントは`components`ディレクトリを作成して格納するのが一般的



# 開発Tips
## 流れ
- まずHTMLでデザインする(マークアップ)
- CSSを当てる
- Reactマークアップ（変動する要素はStateを使ってマークアップしておく）
- 大きくなってきたらcomponent分割する
- componentにpropsで変数と関数を渡すようにリファクタする
- stypeもcomponent別にリファクタする


## propsとstate


## デバッグ
 - console.log(変数)で出力
 - alert()で発火