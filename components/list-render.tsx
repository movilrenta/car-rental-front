import React from "react";

interface ListItem {
  title: string;
  content?: string;
  subItems?: ListItem[];
}

export const ListRender: React.FC<{ items: ListItem[] }> = ({ items }) => {
  return (
    <ol className="flex flex-col gap-2 p-4 max-w-7xl mx-auto">
      {items.map((item, index) => (
        <li key={index} className="flex flex-col pb-2">
          <h3 className="font-semibold text-lg"><span className="mr-1">{index + 1}.</span>{item.title}</h3>
          {item.content && <p className="md:ps-4">{item.content}</p>}
          {item.subItems &&
            item.subItems.map((subItem, i) => (
              <ul key={i} className="list-disc list-inside md:ps-4">
                <li>{subItem.title}</li>
                {subItem.content && <p>{subItem.content}</p>}
              </ul>
            ))}
        </li>
      ))}
    </ol>
  );
};
