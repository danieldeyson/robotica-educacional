import { createBrowserHistory } from 'history';

import configs from '../configs';

const historyConfig = {
  basename: configs.basename,
};
const history = createBrowserHistory(historyConfig);
export default history;
