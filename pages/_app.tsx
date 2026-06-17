import '../styles/styles.css';
import '../styles/global.css';
import "../styles/footer.css";
import "../styles/terms.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'jquery';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import type { AppProps } from 'next/app'
import HydrationBoundary from '../components/HydrationBoundary';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <HydrationBoundary>
        <Component {...pageProps} />
      </HydrationBoundary>
    </ErrorBoundary>
  );
}

export default MyApp




