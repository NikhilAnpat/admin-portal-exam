'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import down from "@/public/assets/down.svg";
import up from "@/public/assets/up.svg";
import apiClient from "../config";

const Category: React.FC = () => {

    // Get All SubCategory
    const [categories, setCategories] = useState<any[]>([]);
    const [expandedRows, setExpandedRows] = useState(new Set());

    const getAllCategory = async () => {
        try {
            const resGetAllData = await apiClient.get('/SubCategory/all/Subcategory');

            console.log("API Response:", resGetAllData.data);

            const formattedData = resGetAllData.data.data.map((item: any) => ({
                id: item.category?._id || "N/A",
                name: item.category?.name || "Unnamed Category",
                status: item.category?.__v === 1 ? "Active" : "Inactive",
                subCategories: item.subCategory?.map((subCat: any) => ({
                    id: subCat._id || "N/A",
                    name: subCat.name || "Unnamed Subcategory",
                    status: subCat.__v === 1 ? "Active" : "Inactive",
                })) || [],
                selected: false,
            }));

            console.log("Formatted Data:", formattedData);
            setCategories(formattedData);
        } catch (error) {
            console.error("Error fetching category data:", error);
        }
    };


    const toggleRow = (id: any) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(id)) {
            newExpandedRows.delete(id);
        } else {
            newExpandedRows.add(id);
        }
        setExpandedRows(newExpandedRows);
    };

    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');

    // Add New Category API call
    const addNewCategory = async () => {
        try {
            const response = await apiClient.post('/admin/Category/addCategory', {
                name: categoryName,
                description: categoryDescription,
            });
            console.log(response.data.data);
            return response.data.data._id;
        } catch (error) {
            console.error("Error adding new category", error);
        }
    };

    // Add New Sub-Category API call
    const addNewSubCategory = async (categoryId: any) => {
        try {
            const response = await apiClient.post('/SubCategory/addSubcategory', {
                name: selectedName,
                categoryId: categoryId,
            });
            console.log(response.data.data);
        } catch (error) {
            console.error("Error adding new subcategory", error);
        }
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const newCategoryId = await addNewCategory();

            if (newCategoryId && selectedName) {
                await addNewSubCategory(newCategoryId);
            }

            setCategoryName('');
            setCategoryDescription('');
            setParentCategory('');
            setSelectedName('');
            setParentCategoryId('');

            await getAllCategory();
        } catch (error) {
            console.error("Error adding category or subcategory", error);
        }
    };

    // delete 
    const deleteCategory = async (categoryId: string) => {
        try {
            await apiClient.delete(`/admin/Category/deleteCategory/${categoryId}`);
            console.log("Category deleted successfully");
            getAllCategory();
        } catch (error) {
            console.error("Error deleting category", error);
        }
    };

    const deleteCategorySub = async (categoryId: string) => {
        try {
            await apiClient.delete(`/SubCategory/deleteSubcategory/${categoryId}`);
            console.log("Category deleted successfully");
            getAllCategory();
        } catch (error) {
            console.error("Error deleting category", error);
        }
    };

    // Update category name
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [newCategoryName, setNewCategoryName] = useState("");

    // Update category name
    const updateCategoryName = async (categoryId: string, updatedName: string) => {
        try {
            await apiClient.put(`/admin/Category/updateCategory/${categoryId}`, { name: updatedName });
            console.log("Category updated successfully");
            getAllCategory();
        } catch (error) {
            console.error("Error updating category", error);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, [])

    return (
        <div className="text-black">
            <div className="w-full mt-4 bg-white py-4 px-3 rounded-2xl">
                <div className="ml-4">
                    <h1 className="text-lg font-semibold">Category Management</h1>
                    <p className="text-gray-400 mb-8">
                        create, edit and organize categories to structure product <br /> and
                        the services in the app. Use sub categories for more <br /> specific
                        organization.
                    </p>
                </div>
                <div className="">

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left border-b border-sky-400">
                                <th>
                                    <input
                                        type="checkbox"
                                        className="ml-3 w-4 h-4"
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setCategories(
                                                categories.map((category) => ({
                                                    ...category,
                                                    selected: checked,
                                                }))
                                            );
                                        }}
                                    />
                                </th>
                                <th className="font-normal p-2 pl-8">Category Name</th>
                                <th className="font-normal p-2">Sub-Categories</th>
                                <th className="font-normal p-2">Status</th>
                                <th className="font-normal p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category: any) => (
                                <React.Fragment key={category.id}>
                                    <tr
                                        className={
                                            categories.indexOf(category) % 2 === 0
                                                ? "bg-gray-100 border-b border-gray-400"
                                                : "bg-white border-b border-gray-400"
                                        }
                                    >
                                        <td className="w-12 py-4">
                                            <input type="checkbox" className="ml-3 w-4 h-4" checked={category.selected || false} onChange={(e) => {
                                                const checked = e.target.checked;
                                                setCategories(
                                                    categories.map((cat: any) =>
                                                        cat.id === category.id
                                                            ? { ...cat, selected: checked }
                                                            : cat
                                                    )
                                                );
                                            }}
                                            />
                                        </td>
                                        <td className="p-2 font-semibold pl-8">
                                            {editingCategory === category.id ? (
                                                <input
                                                    type="text"
                                                    value={newCategoryName}
                                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span>{category.name}</span>
                                            )}
                                        </td>

                                        <td
                                            className="p-2"
                                            onClick={() => toggleRow(category.id)}
                                        >
                                            {expandedRows.has(category.id) ? (
                                                <div className="flex gap-3">
                                                    <span>
                                                        {category.subCategories.length}&nbsp;Subcategories
                                                    </span>
                                                    <Image src={up} alt="up Icon" width={24} height={24} className="cursor-pointer" />
                                                </div>
                                            ) : (
                                                <div className="flex gap-3">
                                                    <span>
                                                        {category.subCategories.length}&nbsp;Subcategories
                                                    </span>
                                                    <Image src={down} alt="down Icon" width={24} height={24} className="cursor-pointer" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-2">{category.status}</td>
                                        <td className="pl-5">
                                            {editingCategory === category.id ? (
                                                <button
                                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                                    onClick={() => {
                                                        updateCategoryName(category.id, newCategoryName);
                                                        setEditingCategory(null);
                                                    }}
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                                    onClick={() => {
                                                        setEditingCategory(category.id);
                                                        setNewCategoryName(category.name);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            )}


                                            <button className="bg-red-500 text-white px-4 py-2 rounded"
                                                onClick={() => {
                                                    deleteCategory(category.id);
                                                }} >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedRows.has(category.id) &&
                                        category.subCategories.map((subCategory: any) => (
                                            <tr key={subCategory.id} className="w-full bg-gray-100 border-b border-gray-300">
                                                <td className="w-12 py-4">
                                                    <input
                                                        type="checkbox"
                                                        className="ml-3 w-4 h-4"
                                                    />
                                                </td>
                                                <td className="p-2 font-semibold pl-8 text-gray-400">{subCategory.name}</td>

                                                <td className="pl-6">--</td>
                                                <td className="pl-3">{subCategory.status}</td>
                                                <td className="pl-5">
                                                    <button className="bg-red-500 text-white px-4 py-2 rounded"
                                                        onClick={() => {
                                                            deleteCategorySub(subCategory.id);
                                                        }} >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-full mt-4 bg-white py-4 px-3 rounded-2xl text-black">
                <div className="w-full mt-8 bg-white py-4 px-3 rounded-2xl">
                    <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="categoryName" className="text-sm font-semibold">Category Name</label>
                            <input
                                id="categoryName"
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Enter the name of the new category"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none sm:text-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="categoryDescription" className="text-sm font-semibold">Category Description</label>
                            <textarea
                                id="categoryDescription"
                                value={categoryDescription}
                                onChange={(e) => setCategoryDescription(e.target.value)}
                                rows={4}
                                placeholder="Add a brief description of what this category encompasses."
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none sm:text-sm"
                            />
                        </div>

                        <div className="mb-12">
                            <label htmlFor="parentCategory" className="text-sm font-semibold">Parent Category</label>
                            <p className="text-gray-400 text-sm">Select a parent category to create sub-category</p>
                            <select
                                id="parentCategory"
                                value={parentCategoryId}
                                onChange={(e) => {
                                    const selectedCategory = categories.find(category => category.id === e.target.value);
                                    setParentCategoryId(e.target.value); 
                                    setSelectedName(selectedCategory ? selectedCategory.name : ''); 
                                }}
                                className="mt-1 block w-1/2 px-3 py-2 border border-gray-400 rounded-lg text-gray-500 shadow-sm focus:outline-none sm:text-sm"
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name} 
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#168d9d] text-white px-6 py-2 rounded-md font-semibold mx-auto flex"
                        >
                            Add Category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Category;
