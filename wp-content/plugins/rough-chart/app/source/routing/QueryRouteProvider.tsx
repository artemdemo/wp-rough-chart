import React from 'react';
import queryString from 'query-string';
import { onPushState } from './routing';

type TRouteDefinitionKey = {
    origin: string;
    key: string;
    comparison: string;
};

interface IProps {
    routes: {
        [key: string]: {
            component: () => any;
            name?: string;
        };
    };
}
interface IState {
    currentSearch: string;
}

class QueryRouteProvider extends React.PureComponent<IProps, IState> {
    private onPushStateUnbind;
    public state = {
        currentSearch: location.search,
    };

    componentDidMount(): void {
        this.onPushStateUnbind = onPushState((data) => {
            const urlSearchRegex = /(\?\S+)$/gm;
            const match = urlSearchRegex.exec(data.url);
            if (match) {
                this.setState({
                    currentSearch: match[1],
                });
            }
        });

        window.addEventListener('popstate', this.onPopState);
    }

    componentWillUnmount(): void {
        this.onPushStateUnbind();
        window.removeEventListener('popstate', this.onPopState);
    }

    onPopState = () => {
        this.setState({
            currentSearch: location.search,
        });
    };

    parseKey(key: string): TRouteDefinitionKey[] {
        const keyRegex = /([^=&?]+)=([^&]*)/gm;
        let match;
        const result: TRouteDefinitionKey[] = [];
        while ((match = keyRegex.exec(key)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (match.index === keyRegex.lastIndex) {
                keyRegex.lastIndex++;
            }

            const group: TRouteDefinitionKey = {
                origin: '',
                key: '',
                comparison: '',
            };

            match.forEach((match: string, idx) => {
                switch (idx) {
                    case 0:
                        group.origin = match;
                        break;
                    case 1:
                        group.key = match;
                        break;
                    case 2:
                        group.comparison = match;
                        break;
                }
            });
            result.push(group);
        }
        return result;
    }

    render() {
        console.log(queryString.parse(this.state.currentSearch));
        console.log(this.parseKey(Object.keys(this.props.routes)[0]));
        return this.state.currentSearch;
    }
}

export default QueryRouteProvider;
