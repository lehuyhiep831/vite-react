import { Route, Routes } from "react-router";
import { market_page, root, todo_page } from "../constants/paths";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Market from "../pages/Market";
import Todo from "../pages/Todo";

function MainRoutes() {
  return (
    <Routes>
      <Route path={root} element={<Root />}>
        <Route element={<Home />} index></Route>
        <Route element={<Market />} path={market_page}></Route>
        <Route element={<Todo />} path={todo_page}></Route>
      </Route>
    </Routes>
  );
}

export default MainRoutes;
