declare var __webpack_public_path__;
import React from 'react';
import { getQuery } from '../routing/routing';
import { getAppData } from '../services/appData';
import RouteProvider from '../routing/QueryRouteProvider';

// I'm setting public path on the fly.
// This way I can be sure that I have the right url to the build folder.
// (because I don't know the site path of the user)
// @docs https://webpack.js.org/guides/public-path/#on-the-fly
__webpack_public_path__ = getAppData().build_folder;

interface IProps {}

interface IState {
    Component: any;
}

class App extends React.PureComponent<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            Component: null,
        };
    }

    componentDidMount(): void {
        const query = getQuery();
        if (query.chart_id === 'new' && query.type) {
            import('./EditChart').then(this.handleViewLoad);
        } else if (query.chart_id) {
            import('./EditChart').then(this.handleViewLoad);
        } else if (!query.chart_id) {
            import('./ChartsList').then(this.handleViewLoad);
        }
    }

    handleViewLoad = (result) => {
        this.setState({
            Component: result.default,
        })
    };

    render() {
        const { Component } = this.state;
        if (Component) {
            return (
                <React.Fragment>
                    <RouteProvider
                        routes={{
                            'chart_id=*&type=*': {
                                component: () => import('./EditChart'),
                                name: 'Edit Chart #1',
                            },
                            'chart_id=*': {
                                component: () => import('./EditChart'),
                                name: 'Edit Chart #2',
                            },
                            '*': {
                                component: () => import('./ChartsList'),
                                name: 'Charts List',
                            },
                        }}
                    />
                    <Component query={getQuery()} />
                </React.Fragment>
            );
        }
        return null;
    }
}


export default App
