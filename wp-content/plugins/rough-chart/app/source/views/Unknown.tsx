import React from 'react';

interface IProps {}

interface IState {}

class Unlnown extends React.PureComponent<IProps, IState> {
    render(props: IProps, state: IState, context) {
        return (
            '404 - no such view'
        );
    }
}


export default Unlnown
