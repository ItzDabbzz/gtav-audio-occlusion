import React from 'react';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from 'react-icons/tb';
import { ExpandButtonWrapper } from './styles';

type ExpandButtonProps = {
    expanded: boolean;
    onClick: () => void;
};

export const ExpandButton = ({ expanded, onClick }: ExpandButtonProps): JSX.Element => (
    <ExpandButtonWrapper expanded={expanded} onClick={onClick}>
        {expanded ? <TbLayoutSidebarLeftCollapse size={18} /> : <TbLayoutSidebarLeftExpand size={18} />}
        <span>Toggle Sidebar</span>
    </ExpandButtonWrapper>
);
