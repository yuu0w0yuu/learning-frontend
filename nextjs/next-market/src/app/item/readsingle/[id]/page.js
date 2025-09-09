import Image from "next/image";
import Link from "next/link";

const getSingleItem = async(id) => {
    const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`);
    const jsonData = await response.json();
    const singleItem = jsonData.Item;
    return singleItem;
}
    
const ReadSingleItem = async (context) => {
    const params = await context.params;
    const singleItem = await getSingleItem(params.id);
    return (
        <div>
            <div>
                <Image src={singleItem.image} width={750} height={500} alt="item-image" priority/>
            </div>
            <div>
                <h1>{singleItem.title}</h1>
                <h2>¥{singleItem.price}</h2>
                <hr/>
                <p>{singleItem.description}</p>
            </div>
            <div>
                <Link href={`/item/update/${singleItem.id}`}>Edit</Link>
                <Link href={`/item/delete/${singleItem.id}`}>Delete</Link>
            </div>
        </div>
    );
};

export default ReadSingleItem;