import { useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { add } from "./redux/reducers/todoReducer";

const TodoForm = () => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const onSave = () => {
    if (title) {
      dispatch(add({
        title:title,
        status:'unCompleted'
      }));
      setTitle("");
    } else {
      alert("You must enter a title for your todo");
    }
  };

  return (
    <div className="form">
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <button onClick={onSave}>Add</button>
    </div>
  );
};

export default TodoForm;