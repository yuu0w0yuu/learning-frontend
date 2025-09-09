import "./styles.css";

//テキストボックスの処理を取得し、テキストボックスを初期化する関数
const onClickAdd = () => {
  const inputText = document.getElementById("todo-name-text").value;
  document.getElementById("todo-name-text").value = "";

  //未完了リストに追加
  createIncompleteToDo(inputText);
};

//未完了ToDoを作成する関数
const createIncompleteToDo = (todoName) => {
  //li生成
  const li = document.createElement("li");

  //div生成
  const div = document.createElement("div");
  div.className = "list-row";

  //p生成
  const p = document.createElement("p");
  p.className = "todo-item";
  p.innerText = todoName;

  // 完了ボタン生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "Complete";
  completeButton.addEventListener("click", () => {
    //ボタンが所属する親のliを取得
    const completeTarget = completeButton.closest("li");

    //完了・削除ボタンを削除する
    completeButton.nextElementSibling.remove();
    completeButton.remove();

    //戻すボタンを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    completeTarget.firstElementChild.appendChild(backButton);
    backButton.addEventListener("click", () => {
      const todoName = backButton.previousElementSibling.innerText;
      createIncompleteToDo(todoName);
      //戻すボタンのliタグを削除
      backButton.closest("li").remove();
    });

    //完了エリアに移動
    document.getElementById("complete-list").appendChild(completeTarget);
  });

  //削除ボタン生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => {
    //最も近い親のliを取得し、親のincomplete-listからliを削除する
    const deleteTarget = deleteButton.closest("li");
    document.getElementById("incomplete-list").removeChild(deleteTarget);
  });

  // Append
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);
  document.getElementById("incomplete-list").appendChild(li);
};

document.getElementById("add-button").addEventListener("click", onClickAdd);
