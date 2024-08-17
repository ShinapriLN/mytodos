'use client'
import { Button } from "@nextui-org/button"
import { Textarea } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { useDebugValue, useEffect, useState } from "react";
import axios from "axios";

export default function TodoList({ data }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [mode, setMode] = useState(null)
    const [focusObj, setFocusObj] = useState({})

    function handlePress(obj, mode) {
        setFocusObj(obj)
        setMode(mode)
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
    return (
        <div className="grid grid-cols-1 gap-2 justify-center w-[70%] h-fit">
            {
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
                            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} >
                                <ModalContent>
                                    {(onClose) => {
                                        if (mode === 0) {
                                            return (
                                                <>
                                                    <ModalHeader className="flex flex-col gap-1"><p>{`${focusObj.title}`}</p></ModalHeader>
                                                    <ModalBody>
                                                        <p>
                                                            {`${focusObj.content}`}
                                                        </p>
                                                        <p>
                                                            {`${focusObj.content}`}
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
                                                        <Textarea defaultValue={`${focusObj.content}`} onChange={(e) => setText(e.target.value)} />
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="success" onPress={onClose}>
                                                            Save
                                                        </Button>
                                                        <Button color="danger" variant="light" onPress={onClose}>
                                                            Close
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
                    </div>
                ))
            }

        </div>
    )
}