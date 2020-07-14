import { createBrowserHistory } from 'history';

import configs from '../config';

const historyConfig = {
  basename: configs.basename,
};
const history = createBrowserHistory(historyConfig);
export default history;
