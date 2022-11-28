import { useEffect, useState } from 'react';
import './App.less';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { useFetch } from './hooks/useFetch';
import { useMutate } from './hooks/useMutate';
import { Todo } from './models/types';

const App = () => {
  const { data, loading, error, refetch } = useFetch();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(data);
  }, [data]);

  const { mutateTodo } = useMutate();

  console.log(data);

  const addTodo = async (todo: Todo) => {
    await mutateTodo(todo, 'POST');
    refetch();
  };

  const deleteTodoHandler = (appId: string) => {
    const filteredTodos = todos.filter((todo) => todo.appId !== appId);
    setTodos(filteredTodos);
  };

  return (
    <div className='App'>
      <h1>Todo - лист</h1>
      <div className='App_container'>
        <TodoForm addTodo={addTodo} />
        {loading && <div className='App_loading'></div>}
        {!loading && error && <div className='App_errorLoading'>Ошибка!</div>}
        {todos.length > 0 &&
          todos.map((todo: Todo) => {
            return (
              <TodoItem
                todo={todo}
                key={todo.appId}
                deleteTodoHandler={deleteTodoHandler}
              />
            );
          })}
      </div>
    </div>
  );
};

export default App;
