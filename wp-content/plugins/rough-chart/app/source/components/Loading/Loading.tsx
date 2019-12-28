import React from 'react';
import { t } from "../../services/i18n";

interface IProps {
    show?: boolean;
}

const Loading = (props: IProps) => {
    if (props.show === true || props.show === undefined) {
        return (
            <div>
                {t('loading')}
            </div>
        );
    }
    return null;
};

export default Loading;
