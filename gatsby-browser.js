import React from 'react';

import RootStore, { ApplicationContext } from './src/state/RootStore';

export const wrapRootElement = ({ element }) => (
  <ApplicationContext.Provider value={new RootStore()}>
    {element}
  </ApplicationContext.Provider>
);
