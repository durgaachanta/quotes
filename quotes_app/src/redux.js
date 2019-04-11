import { createStore } from 'redux';

const initialState = {
  quotesBank: [],
};

//actions - update state on initial screen load
export const updateInitialReduxStore = (data) => ({
  type: "UPDATE_REDUX_INITIAL_LOAD",
  payload: data,
});

// add a new author to the redux store
export const addNewAuthorToRedux = (author) => ({
  type: "ADD_NEW_AUTHOR",
  payload: author,
});

//add new quote to the authors store
//update vote
export const addNewQuote = (quote, idx) => ({
  type: "ADD_NEW_QUOTE",
  payload: quote,
  index: idx,
});

//update author
export const updateAuthor = (data, idx) => ({
  type: "UPDATE_AUTHOR",
  payload: data,
  index: idx,
})

export const reducer = (state = initialState, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case "UPDATE_REDUX_INITIAL_LOAD":
      return {
        ...state,
        quotesBank: action.payload,
      }
    case "ADD_NEW_AUTHOR":
      return {
        ...state,
        quotesBank: [...state.quotesBank, action.payload]
      }
    case "ADD_NEW_QUOTE":
      return {
        ...state,
        quotesBank: [...state.quotesBank.slice(0, action.index),
        state.quotesBank[action.index] = action.payload,
        ...state.quotesBank.slice(action.index + 1)],
      }
    case "UPDATE_AUTHOR":
      var test = {
        ...state,
        quotesBank: [...state.quotesBank.slice(0, action.index),
        state.quotesBank[action.index] = action.payload,
        ...state.quotesBank.slice(action.index + 1)

        ],
      };
      console.log(test);
      return {
        ...state,
        quotesBank: [...state.quotesBank.slice(0, action.index),
        state.quotesBank[action.index] = action.payload,
        ...state.quotesBank.slice(action.index + 1)

        ],
      }
    default:
      return state;
  }

}

export const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);