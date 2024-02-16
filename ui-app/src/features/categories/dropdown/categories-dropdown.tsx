import { SelectProps, TreeSelect } from "antd";
import { useEffect, useState } from "react"

const { SHOW_PARENT } = TreeSelect;

const categoriesArray = [
    {
        item: {
            id: "873dfe93-4528-413c-9f2e-05c3e689e32c",
            name: "Test Category",
            image: "Content/Images/Market/TestMarket.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            contentPath: "https://localhost:44355",
            isActive: true,
            parentId: null
        },
        children: [
            {
                item: {
                    id: "37d9e3eb-2e97-427e-b4bc-0932c3fd0f4b",
                    name: "Test Category 2",
                    image: "Content/Images/Market/TestMarket.jpg",
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    contentPath: "https://localhost:44355",
                    isActive: true,
                    parentId: "873dfe93-4528-413c-9f2e-05c3e689e32c"
                },
                children: []
            }, {
                item: {
                    id: "5b673f4d-dd8e-4b68-93b8-efa9b53c5be3",
                    name: "Test Category 3",
                    image: "Content/Images/Market/TestMarket.jpg",
                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    contentPath: "https://localhost:44355",
                    isActive: true,
                    parentId: "873dfe93-4528-413c-9f2e-05c3e689e32c"
                },
                children: []
            }
        ]
    }
]

const mapToTree = (categories) => {
    return categories.map(node => {
        const mappedNode = {
            value: node.item.id,
            title: node.item.name,
            id: node.item.id,
            pId: node.item.parentId,
            children: [],
            rootPId: null
        };
        if (node.children && node.children.length > 0) {
            mappedNode.children = mapToTree(node.children);
        }
        return mappedNode;
    });
}

export const CategoriesDropdown = () => {
    const tProps = {
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: 'Categories',
        style: {
            width: '100%',
        },
        showSearch: false
    };

    const onSelectQ = (a :SelectProps<any, any>['onSelect']) => {
    }

    return (
        <TreeSelect treeData={mapToTree(categoriesArray)} {...tProps} onSelect={onSelectQ} />
    )
}