import React from 'react';
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
} from './styles';

const { API } = window;

export const CreateModal = (): JSX.Element => {
    const {
        createProject,
        createModalState: state,
        setCreateModalOpen,
        setCreateModalName,
        setCreateModalInterior,
        setCreateModalPath,
        setCreateModalMapDataFile,
        setCreateModalMapTypesFile,
    } = useProject();

    const selectProjectPath = async (): Promise<void> => {
        const result: Result<string, string> = await API.invoke(ProjectAPI.SELECT_PROJECT_PATH);

        if (isErr(result)) {
            return console.warn(unwrapResult(result));
        }

        setCreateModalPath(unwrapResult(result));
    };

    const selectMapData = async (): Promise<void> => {
        const result: Result<string, string> = await API.invoke(ProjectAPI.SELECT_MAP_DATA_FILE);

        if (isErr(result)) {
            return console.warn(unwrapResult(result));
        }

        setCreateModalMapDataFile(unwrapResult(result));
    };

    const selectMapTypes = async (): Promise<void> => {
        const result: Result<string, string> = await API.invoke(ProjectAPI.SELECT_MAP_TYPES_FILE);

        if (isErr(result)) {
            return console.warn(unwrapResult(result));
        }

        setCreateModalMapTypesFile(unwrapResult(result));
    };

    return (
        <Dialog open={state.open}>
            <Portal>
                <Overlay />
                <Content>
                    <Header>
                        <Title>New project</Title>
                        <Close onClick={() => setCreateModalOpen(false)}>
                            <FaTimes size={18} />
                        </Close>
                    </Header>
                    <Form>
                        <Group>
                            <Entry>
                                <SLabel>Project name:</SLabel>
                                <Input>
                                    <TextInput
                                        type="text"
                                        placeholder="Project name"
                                        value={state.name}
                                        onChange={e => setCreateModalName(e.target.value)}
                                    />
                                </Input>
                            </Entry>
                            <Entry>
                                <SLabel>Project path:</SLabel>
                                <Input>
                                    <FileInput>
                                        <FilePath>{state.path}</FilePath>
                                        <SelectFileButton type="button" onClick={selectProjectPath}>
                                            Select directory
                                        </SelectFileButton>
                                    </FileInput>
                                </Input>
                            </Entry>
                        </Group>
                        <Group>
                            <Entry>
                                <SLabel>Interior name:</SLabel>
                                <Input>
                                    <TextInput
                                        type="text"
                                        placeholder="Interior name"
                                        value={state.interior}
                                        onChange={e => setCreateModalInterior(e.target.value)}
                                    />
                                </Input>
                            </Entry>
                            <Entry>
                                <SLabel>#map path:</SLabel>
                                <Input>
                                    <FileInput>
                                        <FilePath>{state.mapDataFilePath}</FilePath>
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
                                        <FilePath>{state.mapTypesFilePath}</FilePath>
                                        <SelectFileButton type="button" onClick={selectMapTypes}>
                                            Select file
                                        </SelectFileButton>
                                    </FileInput>
                                </Input>
                            </Entry>
                        </Group>
                        <CreateButton type="button" onClick={createProject}>
                            Create project
                        </CreateButton>
                    </Form>
                </Content>
            </Portal>
        </Dialog>
    );
};
