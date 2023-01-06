const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "CLEAR_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "GET_REPOSITORIES":
      return {
        ...state,
        repositories: action.payload,
        loading: false,
      };
    case "CLEAR_REPOSITORIES":
      return {
        ...state,
        repositories: action.payload,
        loading: false,
      };
    case "GET_REPOSITORY":
      return {
        ...state,
        repository: action.payload,
        loading: false,
      };
    case "GET_ISSUES":
      return {
        ...state,
        issues: action.payload,
        loading: false,
      };
    case "CLEAR_ISSUES":
      return {
        ...state,
        issues: action.payload,
        loading: false,
      };
    case "GET_ISSUE":
      return {
        ...state,
        issue: action.payload,
        loading: false,
      };
    case "SET_FRIEND":
      return {
        ...state,
        friends: action.payload,
        loading: false,
      };
    case "SET_OPTION":
      return {
        ...state,
        option: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_GITHUBUSER":
      return {
        ...state,
        githubUser: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default githubReducer;
