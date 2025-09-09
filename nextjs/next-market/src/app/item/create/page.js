"use client"
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../utils/useAuth";

const CreateItem = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const router = useRouter();
    const { loginUserEmail } = useAuth();

    const handleSubmit = async (event) => {
        try {
            const response = await fetch("http://localhost:3000/api/item/create", {
                method: "POST",
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
            console.error("Error creating item:", error);
        }
    }

    if(loginUserEmail){
        return (
            <div>
                <h1>Create Item</h1>
                <form onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
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
                <button type="submit">Create Item</button>
            </form>
        </div>
        )
    }
}
export default CreateItem