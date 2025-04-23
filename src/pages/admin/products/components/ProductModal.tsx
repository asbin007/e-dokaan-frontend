import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import { addProduct } from "../../../../store/adminProductSlice"
import { fetchingCategory, resetStatus } from "../../../../store/adminCategorySlice"
import { Status } from "../../../../globals/types"

interface ModalProps{
    closeModal : ()=>void
}

export interface IProduct{
  id?: string,
  productName: string, 
  productDescription: string, 
  productPrice: number, 
  productTotalStock: number, 
  categoryId: string | undefined, 
  productImgUrl: File | string
}

const ProductModal: React.FC<ModalProps> = ({ closeModal }) => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState<IProduct>({
        productName: "", 
        productDescription: "", 
        categoryId: undefined, 
        productImgUrl: "", 
        productPrice: 0, 
        productTotalStock: 0
    })
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setData({
            ...data, 
            [name]: name === "productImgUrl" ? e.target.files[0] as File : value 
        })
    }

    const { items } = useAppSelector((store) => store.category)
    const { status } = useAppSelector((store) => store.adminProducts)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        

        setLoading(true)
        try {
            dispatch(addProduct(data))
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const fetchCategories = () => {
        dispatch(fetchingCategory())
    }

    useEffect(() => {
        fetchCategories()

        if (status === Status.SUCCESS) {
            setLoading(false)
            closeModal()
            dispatch(resetStatus())
        }
    }, [status])

    return (
        <div id="modal" className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" />
            <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Product</h3>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="space-y-4">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
                            <input name="productName" onChange={handleChange} type="text" id="productName" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md" placeholder="Airpods" required />
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Price</label>
                                <input name="productPrice" onChange={handleChange} type="number" id="productPrice" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md" placeholder="999" required min={1} />
                            </div>

                            <div>
                                <label htmlFor="productTotalStock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Stock</label>
                                <input name="productTotalStock" onChange={handleChange} type="number" id="productTotalStock" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md" placeholder="100" required min={1} />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Image</label>
                                <input name="productImgUrl" onChange={handleChange} type="file" id="productImgUrl" className="w-[220px] mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md" required />
                            </div>

                            <div>
                                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                <select onChange={handleChange} name="categoryId" id="categoryId" className="w-[170px] h-[50px] border border-gray-300 dark:border-gray-600 rounded-md">
                                    {items.length > 0 && items.map((item) => (
                                        <option key={item.id} value={item.id}>{item.categoryName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Description</label>
                            <textarea name="productDescription" onChange={handleChange} id="productDescription" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md" placeholder="..." required />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">Cancel</button>
                            <button type="submit" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600" disabled={loading}>
                                {loading ? "Adding.." : "Add"}
                                <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductModal
