import { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from '../models/types';

const api =
  'https://todo-backend-4b99f-default-rtdb.europe-west1.firebasedatabase.app/todos.json';

export const useFetch = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: todos } = await axios.get<{ [key: string]: Todo }>(api);
      const loadedTodos = [];
      for (const key in todos) {
        loadedTodos.push({
          id: key,
          appId: todos[key].appId,
          title: todos[key].title,
          deadline: todos[key].deadline,
          desc: todos[key].desc,
          isDone: todos[key].isDone,
          isDoneLate: todos[key].isDoneLate,
          handInDate: todos[key].handInDate,
        });
      }

      setData(loadedTodos);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};
