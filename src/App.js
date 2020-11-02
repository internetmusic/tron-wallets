import { useState } from 'react';
import Form from './components/Form/Form';
import List from './components/List/List';
import styles from './App.module.scss';

function App() {

  const [adresses, setAdress] = useState([]);

  return (
    <div className={styles.container}>
      <Form add={setAdress} />
      <List list={adresses} remove={setAdress} />
    </div>
  );
}

export default App;
