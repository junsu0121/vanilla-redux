//* data를 수정할 수 있는 것 리듀서 뿐 => 따라서 밖에서 리듀서와 소통할려면 dispatch로 액션함수를 일으켜야함! =>액션을 일으키면 initialState의 값을 액션에 따라 변경하여
// 리턴해줌! (고로 state를 전역에 뿌려줄 수 있음!)
import { createStore } from "redux";

const add = document.getElementById("add");
// html의 id를 통해 가져옴!
const minus = document.getElementById("minus");
const number = document.querySelector("span");
// html의 클래스 이름 및 태그를 갖고 오기 위해서 querySelector 주로 사용!

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";
//액션을 스트링으로 넣게 되면 오타날 확률 커져서, 액션을 정의해줌 ("ADD" 계속 이렇게 쓸 수는 없잖아!)

//reducer
// const reducer = () => {};
// reducer라는 함수를 만들어줌 createStore에 주기 위해!
// reducer는 data를 바꾸고 수정하는 것을 책임짐.
// 유일하게 데이터를 바꿀 수 있는 곳!!
//application의 data를 수정하고 싶으면 modifier를 만들고 state를 인자로 주고 ...modify state return state;
const countModifier = (count = 0, action) => {
  //여기서 state를 initializing 해줌 (state=0)로, 두번째 파라미터로 action을 줌!(action의 도움을 받아 state를 변경하게 해줌!)
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

// const store = createStore(reducer);
//createStore에 reducer라는 함수를 줘야함!
const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);
//.subscribe는 변화가 있으면 알려줌!

// countStore.dispatch({ type: "ADD" });
//store에 dispatch, action을 말하면 => 리덕스는 store에 있는 리듀서를 부르고 => currentState=0, action 일으킴!
//dispatch를 통해 리듀서로 메시지를 보냄!
// console.log(countStore.getState());
//.getState()로 리듀서의 리턴값을 받아옴

const handleAdd = () => {
  countStore.dispatch({ type: ADD });
  //                   액션은 타입 property를 이용
};
const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};
add.addEventListener("click", handleAdd);
//이벤트리스너로 클릭했을시 디스패치 통해 스토어에 액션일으킴!
minus.addEventListener("click", handleMinus);
