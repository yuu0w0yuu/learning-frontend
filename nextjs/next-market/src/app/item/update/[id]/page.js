"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../../utils/useAuth";

const UpdateItem = (context) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");

    const router = useRouter();
    const loginUserEmail = useAuth();

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
            const response = await fetch(`http://localhost:3000/api/item/update/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    description: description,
                    image: image,
                    email: loginUserEmail
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
            router.push("/");
        } catch (error) {
            console.error("Error updating item:", error);
        }
    }

    if(loginUserEmail === email){
        return (
            <div>
                <h1>Create Item</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        type="text"
                        name="title"
                        placeholder="title"
                        required
                    />
                    <input 
                        value={price} onChange={(event) => setPrice(event.target.value)}
                        type="text"
                        name="price"
                        placeholder="price"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        name="description"
                        placeholder="description"
                        required
                    ></textarea>
                    <input
                        value={image}
                        onChange={(event) => setImage(event.target.value)}
                        type="text"
                        name="image"
                        placeholder="image URL"
                        required
                    />
                    <button type="submit">Update Item</button>
                </form>
            </div>
        )
    }else{
        return (
            <div>
                <h1>You are not allowed to edit this item.</h1>
            </div>
        )
    }
}

export default UpdateItem;