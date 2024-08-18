'use client'
import { Button } from "@nextui-org/button"
import { Input, Textarea } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { useDebugValue, useEffect, useState } from "react";
import axios from "axios";

export default function TodoList({ data, filter }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [mode, setMode] = useState(null)
    const [focusObj, setFocusObj] = useState({})
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    function handlePress(obj, mode) {
        setFocusObj(obj)
        setMode(mode)
        setTitle(focusObj.title)
        setContent(focusObj.content)
        onOpen()
    }
    async function handleDelete() {
        try {
            await axios.delete(`https://66bec44542533c403143fe01.mockapi.io/api/user-list/${focusObj.id}`)
            alert("The list has deleted")
        } catch (error) {
            console.log(error)
        }
    }
    async function handleEdit() {
        try {
            await axios.put(`https://66bec44542533c403143fe01.mockapi.io/api/user-list/${focusObj.id}`, {
                title: title,
                content: content
            })
            alert("The list has editted")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="grid grid-cols-1 gap-2 justify-center w-[70%] h-fit">
            {
                filter ? (
                    filter.map((todo, index) => (
                        <div key={index} className="grid grid-cols-6 gap-5 bg-slate-300 w-full h-fit items-center rounded-md p-2">
                            <div className="flex col-span-4 justify-center ">
                                <p>{todo.title}</p>
                            </div>
                            <div className="grid gap-2 col-span-2 sm:grid-cols-1 lg:grid-cols-3">
                                <Button color="primary" onPress={() => handlePress(data.find(item => item.id === todo.id), 0)}>
                                    View
                                </Button>

                                <Button color="warning" onPress={() => handlePress(data.find(item => item.id === todo.id), 1)}>
                                    Edit
                                </Button>
                                <Button color="danger" onPress={() => handlePress(data.find(item => item.id === todo.id), 2)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))) : (
                    data.map((todo, index) => (
                        <div key={index} className="grid grid-cols-6 gap-5 bg-slate-300 w-full h-fit items-center rounded-md p-2">
                            <div className="flex col-span-4 justify-center ">
                                <p>{todo.title}</p>
                            </div>
                            <div className="grid gap-2 col-span-2 sm:grid-cols-1 lg:grid-cols-3">
                                <Button color="primary" onPress={() => handlePress(data.find(item => item.id === todo.id), 0)}>
                                    View
                                </Button>

                                <Button color="warning" onPress={() => handlePress(data.find(item => item.id === todo.id), 1)}>
                                    Edit
                                </Button>
                                <Button color="danger" onPress={() => handlePress(data.find(item => item.id === todo.id), 2)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    )))
            }
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" >
                <ModalContent>
                    {(onClose) => {
                        if (mode === 0) {
                            return (
                                <>
                                    <ModalHeader className="flex flex-col gap-1"><p>{`${focusObj.title}`}</p></ModalHeader>
                                    <ModalBody>
                                        <p className="text-right text-sm">
                                            Topic : {`${focusObj.about}`}
                                        </p>
                                        <p>
                                            {`${focusObj.content}`}
                                        </p>
                                        <p className="italic text-sm text-gray-600">
                                            Mood : {`${focusObj.mood}`}<br />
                                            Publish : {`${new Date(focusObj.create_at).getDate()}-${(new Date(focusObj.create_at).getMonth()) + 1}-${new Date(focusObj.create_at).getFullYear()} ${new Date(focusObj.create_at).getHours()}:${(new Date(focusObj.create_at).getMinutes() < 10) ? "0" + String(new Date(focusObj.create_at).getMinutes()) : new Date(focusObj.create_at).getMinutes()}`}
                                        </p>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                    </ModalFooter>
                                </>
                            )
                        } else if (mode === 1) {
                            return (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">{`${focusObj.title}`}</ModalHeader>
                                    <ModalBody>
                                        <Input defaultValue={`${focusObj.title}`} onChange={(e) => setTitle(e.target.value)} />
                                        <Textarea defaultValue={`${focusObj.content}`} onChange={(e) => setContent(e.target.value)} />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancel
                                        </Button>
                                        <Button color="success" onPress={onClose} onClick={handleEdit}>
                                            Save
                                        </Button>
                                    </ModalFooter>
                                </>
                            )
                        } else if (mode === 2) {
                            return (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Delete {`${focusObj.title}`}</ModalHeader>
                                    <ModalBody>
                                        <p>
                                            Are you sure to delete this list?
                                        </p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancel
                                        </Button>
                                        <Button color="danger" onPress={onClose} onClick={handleDelete}>
                                            Delete
                                        </Button>
                                    </ModalFooter>
                                </>
                            )
                        }
                    }}
                </ModalContent>
            </Modal >



        </div>
    )
}