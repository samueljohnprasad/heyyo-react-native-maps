const useShareableState = () => {
  const [username, setUsername] = useState('Abrar');
  const [count, setCount] = useState(0);
  return {
    username,
    setUsername,
    count,
    setCount,
  };
};
