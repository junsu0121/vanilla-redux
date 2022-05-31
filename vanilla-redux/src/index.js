import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

//action
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

//action creator
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};
const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

//reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    //   추가할때는 무조건 스프레드 이용해서 이전꺼 넣고, 새로운 애 넣어줌
    //  삭제하기 위해 id도 추가
    case "DELETE_TODO":
      const cleaned = state.filter((toDo) => toDo !== parseInt(action.id));
      //                삭제할 todo의 id를 가지지 않는 todo, parseInt로 Html에서 받아오는 스트링 id를 숫자로
      return cleaned;

    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});
const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};
const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};
store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
