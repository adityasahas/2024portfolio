// @ts-nocheck
"use client"
import React, { useState, useEffect } from "react";
import { Button, Input, Textarea, Link, Progress } from "@nextui-org/react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Image,
} from "@nextui-org/react";
export default function Contact() {
    const socials = [
        {
            name: "GitHub",
            url: "https://github.com/adityasahas",
            icon: FaGithub,
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/adityasahas/",
            icon: FaLinkedin,
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/bababooeyacc/",
            icon: FaInstagram,
        },
        {
            name: "Twitter",
            url: "https://twitter.com/adityasahas",
            icon: FaTwitter,
        },
    ];
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ name: false, email: false, message: false });
    const [progress, setProgress] = useState(0);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    useEffect(() => {
        const fields = [name, email, message];
        const filledFields = fields.filter(Boolean).length;
        const newProgress = (filledFields / fields.length) * 100;
        setProgress(newProgress);
    }, [name, email, message]);

    const validateEmail = (email) => {
        return email.match(
            // Simplified regex for example purposes; consider a more robust validation
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            name: !name,
            email: !email || !validateEmail(email),
            message: !message,
        };
        setErrors(newErrors);

        if (!Object.values(newErrors).some(Boolean) && progress === 100) {
            console.log("Form is valid, proceed with submission.");
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            setName('');
            setEmail('');
            setMessage('');
            onOpen();

        } else {
            console.log("Form has errors or is incomplete.");
        }
    };


    return (
        <>
            <div className="bg-[#131315] transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] rounded-xl max-w-6xl mx-auto mt-10 flex flex-col md:flex-row">
                <div className="flex flex-col md:w-1/2 w-full gap-8 p-6">
                    <h1 className="text-white text-3xl font-bold">Contact</h1>
                    <p className="text-gray-300">
                        If you want to get in touch, talk to me about a project, or just say hi, feel free to reach out to me through any of the following platforms.
                    </p>
                    <div className="mt-4 flex flex-col gap-4">
                        {socials.map((social) => (
                            <Link
                                key={social.name}
                                href={social.url}
                                className="text-white flex items-center gap-2"
                                isExternal
                                showAnchorIcon
                            >
                                <social.icon size={24} color="#FFF" />
                                {social.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col md:w-1/2 w-full gap-8 p-6">
                    <Input
                        label="Name"
                        placeholder="adi"
                        value={name}
                        onChange={handleInputChange(setName)}

                    />
                    <Input
                        label="Email"
                        placeholder="contact@adityasahas.tech"
                        value={email}
                        onChange={handleInputChange(setEmail)}

                    />
                    <Textarea
                        label="Message"
                        placeholder="lets make a project together"
                        value={message}
                        onChange={handleInputChange(setMessage)}

                    />
                    <Progress value={progress} />
                    <Button
                        onClick={handleSubmit}
                        className="bg-white text-black"
                        size="lg"
                        isDisabled={progress < 100}>
                        Send
                    </Button>
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader>Email Sent Successfully</ModalHeader>
                    <ModalBody>
                        <p>
                            Thank you for contacting me. your submission has been received.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="flat"
                            color="danger"
                            onClick={() => onOpenChange()}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
