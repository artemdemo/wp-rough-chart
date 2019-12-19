import {Component, createRef, Fragment, h} from 'preact';
import jexcel from 'jexcel';

import './Data.less';

interface IProps {}

interface IState {}

class Data extends Component<IProps, IState> {
    tableRef = createRef();

    componentDidMount():void {
        const data = [
            ['Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700'],
            ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777'],
        ];

        jexcel(this.tableRef.current, {
            data:data,
            columns: [
                { type: 'text', title:'Car', width:120 },
                { type: 'dropdown', title:'Make', width:200, source:[ "Alfa Romeo", "Audi", "Bmw" ] },
                { type: 'calendar', title:'Available', width:200 },
                { type: 'image', title:'Photo', width:120 },
                { type: 'checkbox', title:'Stock', width:80 },
                { type: 'numeric', title:'Price', width:100, mask:'$ #.##,00', decimal:',' },
                { type: 'color', width:100, render:'square', }
            ]
        });
    }

    render(props, state, context) {
        return (
            <Fragment>
                <h2>Chart data</h2>
                <div ref={this.tableRef} />
            </Fragment>
        );
    }
}

export default Data;
