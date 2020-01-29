import React from 'react';
import List from './components/List';
import './App.css';

const App: React.FC = () => {
  
  return (
    <div className="App">
      <header className="App-header">Таблица с данными</header>
      <List />
    </div>
  );
}

export default App;
