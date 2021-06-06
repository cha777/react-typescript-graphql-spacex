import GlobalStyles from './components/GlobalStyles';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App;
