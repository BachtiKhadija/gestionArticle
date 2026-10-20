import { createStore } from "redux";
import ArticleReducer from "./ArticleReducer";
export const Store=createStore(ArticleReducer);