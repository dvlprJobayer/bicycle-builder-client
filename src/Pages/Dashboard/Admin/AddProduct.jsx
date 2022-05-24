import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axiosBicycle from '../../../api/axiosBicycle';
import Loading from '../../../Components/Loading/Loading';

const AddProduct = () => {

    const [loading, setLoading] = useState(false);

    const imgApiKey = '32a9caee4e9423e3c7f8f8cded35c60f';
    const url = `https://api.imgbb.com/1/upload?key=${imgApiKey}`;

    const [description, setDescription] = useState('');

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        setLoading(true);
        const name = data.name;
        const min = data.min
        const available = data.available
        const price = data.price
        const formData = new FormData();
        formData.append('image', data.img[0]);
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(result => {
            const img = result.data.url;
            if (result.success) {
                axiosBicycle.post('/product', {
                    name,
                    description,
                    img,
                    min,
                    available,
                    price,
                }).then(res => {
                    setLoading(false);
                    toast.success('Successfully product add');
                    reset();
                    console.log(res);
                }).catch(err => {
                    setLoading(false);
                    toast.error('Product add operation failed');
                    console.log(err);
                })
            }
        }).catch(err => {
            setLoading(false);
            toast.error('Product add operation failed');
        })
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-4xl text-center text-primary font-bold'>Add A Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card max-w-md bg-base-100 shadow-xl mx-auto">
                    <div className="card-body">
                        <input {...register("name")} type="text" placeholder="Product Name" className="input input-bordered input-primary w-full text-xl mb-3" />
                        <textarea onChange={e => setDescription(e.target.value)} placeholder="Product Description" className="textarea textarea-primary text-xl mb-3" id="" cols="30" rows="4"></textarea>
                        <input {...register("min")} type="text" placeholder="Minimum Product Quantity" className="input input-bordered input-primary w-full text-xl mb-3" />
                        <input {...register("available")} type="text" placeholder="Available Product Quantity" className="input input-bordered input-primary w-full text-xl mb-3" />
                        <input {...register("price")} type="text" placeholder="Per Unit Price" className="input input-bordered input-primary w-full text-xl mb-3" />
                        <input {...register("img")} type="file" className="input input-bordered input-primary w-full text-xl mb-3" />
                        <input className='btn btn-primary' type="submit" value="Add a Product" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;