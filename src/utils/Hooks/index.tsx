import React from 'react';

export const useBetterCallback = (callback: any, values: any) => {
  const self = React.useRef({
    values: values,
    handler: (...args: any[]) => {
      return callback(...args, self.current.values);
    },
  });
  self.current.values = values;
  return self.current.handler;
};
