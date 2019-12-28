import React from 'react';
import styled from 'styled-components';
import NoteModel, { NotificationTypes } from './NoteModel';

const Note = styled.div`
    position: absolute;
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    border: 1px solid black;
    ${(props) => {
        switch (props.type) {
            case NotificationTypes.Error:
                return `
                    background-color: #f4511e;
                    border-color: #c74116;
                `;
            case NotificationTypes.Success:
            default:
                return `
                    background-color: #4CAF50;
                    border-color: #3d9441;
                `;
        }
    }};
`;

interface IProps {
    data: NoteModel;
    index: number;
}
interface IStat {}

class MsgItem extends React.PureComponent<IProps, IStat> {
    render() {
        const { data, index } = this.props;
        return (
            <Note
                type={data.type}
                style={{
                    top: 10 + (15 * index),
                    right: 20 + (5 * index),
                }}
            >
                {this.props.data.msg}
            </Note>
        );
    }
}

export default MsgItem;
