import '../styles/styles.css';
import '../styles/global.css';
import "../styles/footer.css";
import "../styles/terms.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'jquery';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp


