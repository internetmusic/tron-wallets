import { useState } from 'react';
import Form from './components/Form/Form';
import List from './components/List/List';
import Table from './components/Table/Table';
import styles from './App.module.scss';

function App() {

  const [adresses, setAdress] = useState([]);
  const [data, setData] = useState([]);

  return (
    <div className={styles.container}>
      <Form add={setAdress} adresses={adresses} />
      <List list={adresses} remove={setAdress} setData={setData} />
      <Table data={data} />
    </div>
  );
}

export default App;
