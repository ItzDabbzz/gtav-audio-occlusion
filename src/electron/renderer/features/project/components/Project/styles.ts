import styled from 'styled-components';

export const Interiors = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProjectHistoryContainer = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 2em auto 1em auto;
    padding: 0;
    background: none;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;


export const ProjectHistoryTitle = styled.h3`
    margin: 0 0 1em 0;
    font-size: 1em;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    align-self: flex-start;
    padding-left: 1.5em;
`;

export const ProjectHistoryList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

export const ProjectHistoryItem = styled.li`
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 0.5em 1.2em;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.surface1};
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    transition: background 0.12s, box-shadow 0.12s;
    font-size: 0.95em;
    min-height: 36px;

    &:hover {
        background: ${({ theme }) => theme.colors.surface2};
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
`;

export const ProjectHistoryName = styled.span`
    font-weight: 600;
    font-size: 0.98em;
    color: ${({ theme }) => theme.colors.text};
    min-width: 90px;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const ProjectHistoryPath = styled.span`
    font-size: 0.88em;
    color: ${({ theme }) => theme.colors.subtext1};
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const ProjectHistoryButton = styled.button`
    background: ${({ theme }) => theme.colors.pink};
    color: ${({ theme }) => theme.colors.text};
    border: none;
    border-radius: 7px;
    padding: 0.25em 1em;
    font-size: 0.93em;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, filter 0.15s;

    &:hover {
        background: ${({ theme }) => theme.colors.pinkAlt || theme.colors.pink};
        filter: brightness(1.1);
    }
`;

export const ProjectHistoryRemoveButton = styled.button`
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.subtext1};
    font-size: 1.1em;
    margin-left: 0.5em;
    cursor: pointer;
    border-radius: 50%;
    width: 2em;
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.12s, color 0.12s;

    &:hover {
        background: ${({ theme }) => theme.colors.overlay1};
        color: ${({ theme }) => theme.colors.pink};
    }
`;

export const AddInteriorButton = styled.button`
    background: ${({ theme }) => theme.colors.pink};
    color: #fff;
    border: none;
    border-radius: 7px;
    padding: 0.5em 1.4em;
    font-size: 1em;
    font-weight: 600;
    margin-bottom: 1em;
    cursor: pointer;
    transition: background 0.15s, filter 0.15s;

    &:hover {
        background: ${({ theme }) => theme.colors.pinkAlt || theme.colors.pink};
        filter: brightness(1.1);
    }
`;

export const RemoveInteriorButton = styled.button`
    background: ${({ theme }) => theme.colors.overlay1};
    color: ${({ theme }) => theme.colors.pink};
    border: none;
    border-radius: 7px;
    padding: 0.4em 1.2em;
    font-size: 0.95em;
    font-weight: 500;
    margin-top: 0.5em;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;

    &:hover {
        background: ${({ theme }) => theme.colors.pink};
        color: #fff;
    }
`;