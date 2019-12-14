import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

export interface Props
{
  breakpoint?: Breakpoint,
  mobile: JSX.Element | null,
  desktop: JSX.Element | null,
}

const ResponsiveAdapter: React.FunctionComponent<Props> = (props: React.PropsWithChildren<Props>) =>
{
  const { children, breakpoint, mobile, desktop } = props;

  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down(breakpoint || 'xs'));

  if (children)
  {
      if (matches)
      {
          return (React.cloneElement(mobile, {}, children));
      }
      return (React.cloneElement(desktop, {}, children));
  }
  else 
  {
      if (matches)
      {
          return mobile;
      }
      return desktop;
  }
};

export default ResponsiveAdapter;