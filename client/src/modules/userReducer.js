// 액션
const SET_USER = "SET_USER";
const UNSET_USER = "UNSET_USER";
const SET_ADDRESS = "SET_ADDRESS";

// 액션 생성 함수
export const setUser = (data) => {
  return {
    type: SET_USER,
    data,
  };
};

export const unsetUser = () => {
  return {
    type: UNSET_USER,
  };
};

export const setAddress = (data) => {
  return {
    type: SET_ADDRESS,
    data,
  };
};

// 초기 상태
const initialState = {
  data: null,
};

// 리듀서 함수
function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        data: action.data,
      };
    case UNSET_USER:
      return {
        data: null,
      };
    case SET_ADDRESS:
      return {
        data: action.data,
      };
    default:
      return state;
  }
}

export default userReducer;
