import styled, { keyframes } from 'styled-components';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { hexToRgba } from '@/electron/renderer/utils';

const overlayShow = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;

export const Dialog = DialogPrimitive.Root;

export const Portal = styled(DialogPrimitive.Portal)`
    margin: none;
`;

export const Overlay = styled(DialogPrimitive.Overlay)`
    position: fixed;
    inset: 0;

    margin: none;

    background: rgba(0, 0, 0, 0.8);

    @media (prefers-reduced-motion: no-preference) {
        animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
`;

export const Content = styled(DialogPrimitive.Content)`
    position: fixed;
    top: 50%;
    left: 50%;

    width: 40rem;
    margin: none;

    display: flex;
    flex-direction: column;

    border-radius: 8px;

    background: ${({ theme }) => theme.colors.surface2};

    transform: translate(-50%, -50%);

    overflow: hidden;
`;

export const Header = styled.div`
    height: 32px;

    padding: 16px;

    background: ${({ theme }) => theme.colors.surface1};

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled(DialogPrimitive.Title)`
    font-size: 0.9em;
    font-weight: normal;
`;

export const Close = styled(DialogPrimitive.Close)`
    border: none;
    outline: none;

    display: flex;
    justify-content: center;
    align-items: center;

    background: none;

    color: ${({ theme }) => theme.colors.subtext0};

    &:hover {
        cursor: pointer;

        color: ${({ theme }) => theme.colors.overlay2};
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    padding: 16px;

    color: ${({ theme }) => theme.colors.overlay2};
`;

export const Group = styled.div`
    display: flex;
    flex-direction: column;

    gap: 16px;

    & + & {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid ${({ theme }) => theme.colors.overlay0};
    }
`;

export const Entry = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Input = styled.div`
    height: 32px;
    max-width: 80%;

    flex-grow: 1;
`;

export const TextInput = styled.input`
    height: 100%;
    width: 100%;

    padding: 8px;

    border: none;
    border-radius: 8px;

    font-family: 'Inter';
    font-size: 0.9em;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};

    background: ${({ theme }) => theme.colors.surface0};

    &::placeholder {
        color: ${({ theme }) => theme.colors.subtext1};
    }
`;

export const FileInput = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const FilePath = styled.p`
    width: 80%;

    font-size: 0.9em;
    color: ${({ theme }) => theme.colors.subtext0};

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const SelectFileButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    padding: 6px;

    font-size: 0.9em;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    text-transform: lowercase;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    border: none;
    border-radius: 8px;

    background: ${({ theme }) => hexToRgba(theme.colors.pink, 0.75)};

    transition: background 0.1s;

    &:hover {
        background: ${({ theme }) => hexToRgba(theme.colors.pink, 0.55)};
    }
`;

export const CreateButton = styled.button`
    height: 40px;
    width: 320px;

    margin: 16px auto 0 auto;

    padding: 9px;

    font-size: 0.9em;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    text-transform: uppercase;

    border: none;
    border-radius: 8px;

    background: ${({ theme }) => hexToRgba(theme.colors.pink, 0.75)};

    transition: background 0.1s;

    &:hover {
        background: ${({ theme }) => hexToRgba(theme.colors.pink, 0.55)};
    }
`;

export const SLabel = styled.label`
    font-size: 0.8em;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
`;

export const InteriorBox = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.overlay0};
    border-radius: 8px;
    margin-bottom: 8px;
    padding: 12px;
    background: ${({ theme }) => theme.colors.surface1};
`;

export const RemoveButton = styled.button`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    border: none;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.text};
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    text-transform: uppercase;
    font-size: 0.9em;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.colors.redAlt || theme.colors.red};
        opacity: 0.85;
    }
`;

export const AddInteriorButton = styled.button`
    margin-top: 8px;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.pink};
    color: ${({ theme }) => theme.colors.text};
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    font-size: 0.9em;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    &:hover {
        background: ${({ theme }) => theme.colors.red || theme.colors.pink};
        opacity: 0.85;
    }
`;
