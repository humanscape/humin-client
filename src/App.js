import './App.css';
import MainPage from './containers/MainPage';
import {Route} from 'react-router-dom';
import InfoPage from './containers/InfoPage';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={MainPage} />
      <Route path="/info" component={InfoPage} />
    </div>
  );
}

export default App;
