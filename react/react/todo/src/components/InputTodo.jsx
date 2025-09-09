const style = {
    backgroundColor: "#c6e5d9",
    width: "400px",
    height: "30px",
    padding: "8px",
    margin: "8px",
    borderRadius: "8px",
  };
  
  export const InputTodo = (props) => {
    const { todoText, onChange, onClick, isEnabled } = props;
    return (
      <div style={style}>
        <input placeholder="ToDoを入力" value={todoText} onChange={onChange} />
        <button disabled={isEnabled} onClick={onClick}>
          追加
        </button>
      </div>
    );
  };
  