import Grid from '../Grid/Grid';
import { DataProvider } from '../../context/DataContext';

const App = () => {
  return (
    <DataProvider>
      <Grid />
    </DataProvider>
  );
}

export default App;
