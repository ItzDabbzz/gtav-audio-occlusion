import React from 'react';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

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
    InteriorBox,
    AddInteriorButton,
    RemoveButton,
} from './styles';

const { API } = window;

export const CreateModal = (): JSX.Element => {
    const {
        createProject,
        createModalState: state,
        setCreateModalOpen,
        setProjectName,
        setProjectPath,
        addInterior,
        updateInterior,
        removeInterior,
    } = useProject();

    const selectProjectPath = async (): Promise<void> => {
        const result: Result<string, string> = await API.invoke(ProjectAPI.SELECT_PROJECT_PATH);

        if (isErr(result)) {
            return console.warn(unwrapResult(result));
        }

        setProjectPath(unwrapResult(result));
    };

    const selectMapData = async (idx: number): Promise<void> => {
        const result: Result<string, string> = await API.invoke(ProjectAPI.SELECT_MAP_DATA_FILE);

        if (isErr(result)) {
            return console.warn(unwrapResult(result));
        }

        updateInterior(idx, { mapDataFilePath: unwrapResult(result) });
    };

    const selectMapTypes = async (idx: number): Promise<void> => {
        const result: Result<string, string> = await API.invoke(ProjectAPI.SELECT_MAP_TYPES_FILE);

        if (isErr(result)) {
            return console.warn(unwrapResult(result));
        }

        updateInterior(idx, { mapTypesFilePath: unwrapResult(result) });
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
                                        onChange={e => setProjectName(e.target.value)}
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
                            <SLabel>Interiors:</SLabel>
                            {state.interiors.map((interior, idx) => (
                                <InteriorBox key={interior.identifier || idx}>
                                    <Entry>
                                        <SLabel>Interior name:</SLabel>
                                        <Input>
                                            <TextInput
                                                type="text"
                                                value={interior.name}
                                                onChange={e =>
                                                    updateInterior(idx, { name: e.target.value })
                                                }
                                            />
                                        </Input>
                                    </Entry>
                                    <Entry>
                                        <SLabel>#map path:</SLabel>
                                        <Input>
                                            <FileInput>
                                                <FilePath>{interior.mapDataFilePath}</FilePath>
                                                <SelectFileButton type="button" onClick={() => selectMapData(idx)}>
                                                    Select file
                                                </SelectFileButton>
                                            </FileInput>
                                        </Input>
                                    </Entry>
                                    <Entry>
                                        <SLabel>#typ path:</SLabel>
                                        <Input>
                                            <FileInput>
                                                <FilePath>{interior.mapTypesFilePath}</FilePath>
                                                <SelectFileButton type="button" onClick={() => selectMapTypes(idx)}>
                                                    Select file
                                                </SelectFileButton>
                                            </FileInput>
                                        </Input>
                                    </Entry>
                                    <Entry>
                                        <RemoveButton type="button" onClick={() => removeInterior(idx)}>
                                            <FaTrash /> Remove
                                        </RemoveButton>
                                    </Entry>
                                </InteriorBox>
                            ))}
                            <AddInteriorButton
                                type="button"
                                onClick={() =>
                                    addInterior({ name: '', mapDataFilePath: '', mapTypesFilePath: '', identifier: crypto.randomUUID() })
                                }
                            >
                                <FaPlus style={{
                                    color: "black",
                                    textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
                                }} /> Add Interior
                            </AddInteriorButton>
                        </Group>
                        <CreateButton type="button" onClick={createProject}>
                            Create project
                        </CreateButton>
                    </Form>
                </Content>
            </Portal>
        </Dialog>

    );};
