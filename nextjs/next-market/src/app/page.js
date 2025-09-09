import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

const getAllItems = async () => {
  const response = await fetch("http://localhost:3000/api/item/readall")
  const jsonData = await response.json();
  const allItems = jsonData.allitems;
  return allItems;
}

const ReadAllItems = async () => {
  const allItems = await getAllItems();
  return (
    <div>
      {allItems.map(item => 
        <Link href={`/item/readsingle/${item.id}`} key={item.id}>
          <Image src={item.image} alt={item.title} width={200} height={200} priority/>
          <div>
            <h2>¥{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description.substring(0, 80)}...</p>
          </div>
        </Link>
      )}
    </div>
  );
}

export default ReadAllItems;