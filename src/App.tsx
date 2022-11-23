import { useState } from 'react';
import './App.less';
import TodoDate from './components/TodoDate';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { Todo } from './models/types';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };

  return (
    <div className='layout'>
      <h1>Todo - лист</h1>
      <div className='layout__container'>
        <TodoForm addTodo={addTodo} />
        {todos &&
          todos.map((todo) => {
            return (
              <TodoItem title={todo.title} desc={todo.desc} key={todo.title} />
            );
          })}
      </div>
      <TodoDate />
    </div>
  );
};

export default App;
