import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from '../../core/menu';


class Content extends React.Component {
  render() {
    return (
      <div style={{ padding: 24, background: '#fff' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            { 
              routes.map((route: any) => {
                if (route.isLeaf) {
                  return <Route path={route.key} key={route.key} component={route.component} />
                } else {
                  return (
                    route.children.map((cr: any) => {
                      return <Route path={cr.key} key={cr.key} component={cr.component} />
                    })
                  )
                }
              }) 
            }
          </Switch>
        </React.Suspense>
      </div>
    );
  }
}

export default Content;
