import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { isErr, unwrapResult } from '@/electron/common';
import { ProjectAPI } from '@/electron/common/types/project';
import { useProject } from '../../context';
import {
    Dialog,
    Portal,
    Overlay,
    Content,
    Header,
    Title,
    Close,
    Form,
    Group,
    Entry,
    Input,
    TextInput,
    FileInput,
    FilePath,
    SelectFileButton,
    CreateButton,
    SLabel,
} from '../CreateModal/styles';

const { API } = window;

export const AddInteriorModal = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}): JSX.Element => {
    const { addInterior, fetchProject } = useProject();

    const [name, setName] = useState('');
    const [mapDataFilePath, setMapDataFilePath] = useState('');
    const [mapTypesFilePath, setMapTypesFilePath] = useState('');
    const [saving, setSaving] = useState(false);

    const selectMapData = async (): Promise<void> => {
        const result: Result<string, string> = await API.invoke(ProjectAPI.SELECT_MAP_DATA_FILE);
        if (isErr(result)) return console.warn(unwrapResult(result));
        setMapDataFilePath(unwrapResult(result));
    };

    const selectMapTypes = async (): Promise<void> => {
        const result: Result<string, string> = await API.invoke(ProjectAPI.SELECT_MAP_TYPES_FILE);
        if (isErr(result)) return console.warn(unwrapResult(result));
        setMapTypesFilePath(unwrapResult(result));
    };

    const handleAdd = async () => {
        setSaving(true);
        await addInterior({
            identifier: crypto.randomUUID(),
            name,
            mapDataFilePath,
            mapTypesFilePath,
        });
        await fetchProject();
        setSaving(false);
        setName('');
        setMapDataFilePath('');
        setMapTypesFilePath('');
        onClose();
    };

    return (
        <Dialog open={open}>
            <Portal>
                <Overlay />
                <Content>
                    <Header>
                        <Title>Add Interior</Title>
                        <Close onClick={onClose}>
                            <FaTimes size={18} />
                        </Close>
                    </Header>
                    <Form>
                        <Group>
                            <Entry>
                                <SLabel>Interior name:</SLabel>
                                <Input>
                                    <TextInput
                                        type="text"
                                        placeholder="Interior name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </Input>
                            </Entry>
                            <Entry>
                                <SLabel>#map path:</SLabel>
                                <Input>
                                    <FileInput>
                                        <FilePath>{mapDataFilePath}</FilePath>
                                        <SelectFileButton type="button" onClick={selectMapData}>
                                            Select file
                                        </SelectFileButton>
                                    </FileInput>
                                </Input>
                            </Entry>
                            <Entry>
                                <SLabel>#typ path:</SLabel>
                                <Input>
                                    <FileInput>
                                        <FilePath>{mapTypesFilePath}</FilePath>
                                        <SelectFileButton type="button" onClick={selectMapTypes}>
                                            Select file
                                        </SelectFileButton>
                                    </FileInput>
                                </Input>
                            </Entry>
                        </Group>
                        <CreateButton
                            type="button"
                            onClick={handleAdd}
                            disabled={saving || !name || !mapDataFilePath || !mapTypesFilePath}
                        >
                            Add Interior
                        </CreateButton>
                    </Form>
                </Content>
            </Portal>
        </Dialog>
    );
};
