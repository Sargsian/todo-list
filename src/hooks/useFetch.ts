import { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from '../models/types';
import { list, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const handleFile = async (appId: string, fileName: string) => {
  try {
    const fileList = await list(ref(storage));
    const file = fileList.items.find(
      (item) => item.name === `${appId}-${fileName}`
    );
    if (file) {
      const fileUrl = getDownloadURL(file);
      return fileUrl;
    }
  } catch (error) {
    return `${error}`;
  }
};

export const useFetch = (api: string) => {
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
          fileName: todos[key].fileName,
          fileRef: await handleFile(todos[key].appId, todos[key].fileName),
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
