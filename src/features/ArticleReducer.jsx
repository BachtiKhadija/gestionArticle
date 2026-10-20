const initialState = {
  articles: [
    { id: 10, designation: 'article1', famille: 'informatique' },
    { id: 11, designation: 'article2', famille: 'bureau' }
  ]
};

const ArticleReducer=(state=initialState,action)=>{
 switch (action.type) {
    case ADD_ARTICLE:return {...state,articles: [...state.articles, action.payload]};
    case DELETE_ARTICLE:return { ...state, articles: state.articles.filter(article => article.id !== action.payload.id)};
    case EDIT_ARTICLE:return { ...state,articles: state.articles.map(article =>article.id === action.payload.id? { ...article, ...action.payload } : article)};
    default:return state;
  }
}
export default ArticleReducer;