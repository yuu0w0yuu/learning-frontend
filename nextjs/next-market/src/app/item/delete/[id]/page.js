"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DeleteItem = (context) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");

    const router = useRouter();

    useEffect(() => {
        const getSingleItem = async () => {
            const params = await context.params;
            const response = await fetch(`http://localhost:3000/api/item/readsingle/${params.id}`);
            const jsonData = await response.json();
            const singleItem = jsonData.Item;

            setTitle(singleItem.title);
            setPrice(singleItem.price);
            setDescription(singleItem.description);
            setImage(singleItem.image);
            setEmail(singleItem.email);
        }
        getSingleItem();
    },[context])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const params = await context.params;
        try {
            const response = await fetch(`http://localhost:3000/api/item/delete/${params.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    email: email
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
            router.push("/");
        } catch (error) {
            console.error("Error updating item:", error);
        }
    }

    return (
        <div>
            <h1>Delete Item</h1>
            <form onSubmit={handleSubmit}>
                <h2>{title}</h2>
                <p>¥{price}</p>
                <p>{description}</p>
                <button type="submit">Delete</button>
            </form>
        </div>
    )
}

export default DeleteItem;