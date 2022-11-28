import { Todo } from '../models/types';
import axios from 'axios';

enum methods {
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const useMutate = () => {
  const api =
    'https://todo-backend-4b99f-default-rtdb.europe-west1.firebasedatabase.app/todos';

  const mutateTodo = async (todo: Todo, method: keyof typeof methods) => {
    switch (method) {
      case 'PUT':
        {
          const finalApi = `${api}/${todo.id}.json`;
          await axios.put(finalApi, todo);
        }
        break;
      case 'DELETE':
        {
          const finalApi = `${api}/${todo.id}.json`;
          const res = await axios.delete(finalApi);
          console.log(res);
        }
        break;

      default:
        {
          const finalApi = `${api}.json`;
          await axios.post(finalApi, todo);
        }
        break;
    }
  };
  return { mutateTodo };
};
