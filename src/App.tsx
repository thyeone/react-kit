import { useAsyncEffect } from './hooks/useAsyncEffect';

function App() {
  useAsyncEffect(async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await res.json();
    console.log(data);

    return () => {
      console.log('unmount');
    };
  }, []);

  return <></>;
}

export default App;
