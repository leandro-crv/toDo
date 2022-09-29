
import { Provider } from 'react-redux';
import {store,persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';
import ToDo from './components/toDo';
function App() {
  return (
    
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ToDo/>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
