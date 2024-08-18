'use client'
import { Input, Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import axios from "axios";

export default function SearchBox({ data, setFilter }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [list, setList] = useState(null)
    const [myTitle, setmyTitle] = useState(null)
    const [myAbout, setMyAbout] = useState(null)
    const [myContent, setMyContent] = useState(null)
    const [myMood, setMyMood] = useState(null)
    const [myName, setMyName] = useState(null)
    const [searchText, setSearchText] = useState("")
    function handlePress(id) {
        setList(id)
        onOpen()
    }
    async function handleAdd() {
        try {
            await axios.post(`https://66bec44542533c403143fe01.mockapi.io/api/user-list/`, {
                title: myTitle,
                about: myAbout,
                content: myContent,
                mood: myMood,
                name: myName,
                create_at: new Date()
            })
            alert("Add successfully")
        } catch (error) {
            console.log(error)
        }
    }
    async function handleSearch() {
        const filtered = []
        if (searchText) {
            data.map((i) => {
                let temp = i.title.toLowerCase().search(searchText.toLowerCase())
                if(temp !== -1){
                    filtered.push(i)
                }
            })
            console.log(filtered)
            setFilter(filtered)
        } else {
            setFilter("")
        }
    }
    return (
        <div className="select-none gap-2 w-[50%] grid sm:grid-cols-2 lg:grid-cols-6 items-center">
            <Input size="sm" onKeyDown={(e) => {(e.key === 'Enter')?handleSearch():(null)}} type="text" label="Search" className="sm:col-span-2 lg:col-span-4" onChange={(e) => setSearchText(e.target.value)} />
            <Button className="sm:col-span-1" onClick={handleSearch}>Filter</Button>
            <Button className="sm:col-span-1" color="success" onPress={handlePress}>Add Todo</Button>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Todo</ModalHeader>
                            <ModalBody>
                                <Input label="Title" onChange={(e) => setmyTitle(e.target.value)} required />
                                <Input label="About" onChange={(e) => setMyAbout(e.target.value)} required />
                                <Textarea label="Content" onChange={(e) => setMyContent(e.target.value)} required />
                                <Input label="Mood" onChange={(e) => setMyMood(e.target.value)} required />
                                <Input label="Your name" onChange={(e) => setMyName(e.target.value)} required />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => { onClose }}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={handleAdd}>
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </div>
    )
}