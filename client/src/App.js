import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth';
import { AuthContext } from './context/AuthContext';

const theme = createTheme();

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

function App() {
  const { token, login, logout, userId, email } = useAuth();
  const isAuthentificated = !!token;
  const routes = useRoutes(isAuthentificated);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider
          value={{
            token,
            userId,
            login,
            logout,
            isAuthentificated,
            email,
          }}
        >
          <Router>
            <div className="container">{routes}</div>
          </Router>
        </AuthContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
