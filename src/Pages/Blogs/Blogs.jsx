import React from 'react';

const Blogs = () => {
    return (
        <div className='container mx-auto mb-8 text-center'>
            <h2 className='text-center text-primary text-4xl mt-6'>What are the different ways to manage a state in a React application?</h2>
            <p className='mt-3 text-lg'>State is a important part of a react application. We can manage state several way in react application. first very easy way to declare a state in my react application using react useState hook. useState hook return a variable and a function. useState hook variable contain state value and useState hook function to use it for update the variable value. useState hook not always good solution. In complex way data pass like props drilling, you need to use contextProvider. Very large application you can use third party library like redux.</p>

            <h2 className='text-center text-primary text-4xl mt-4'>Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</h2>
            <p className='mt-3 text-lg'>
                When we declare a state React engine know you declare a state. When you set directly without using state function React engine can not understand you change the state value. In React mechanism and React algorithm you need to use state function to change state value. when use state function to change a value React engine know to update the value and react engine render that place where the state variable use.
            </p>

            <h2 className='text-center text-primary text-4xl mt-4'>What is a unit test? Why should write unit tests?</h2>
            <p className='mt-3 text-lg'>
                In order to understand unit test first we need to understand what is test. test is layer of our application. A layer based on we can check our code that it is work fine or not. now understand what is unit test. Unit test means a small part of our application test like a function. When we create a module architecture based application which contain lots of module that time we use unit test.
            </p>

            <h2 className='text-center text-primary text-4xl mt-4'>How does prototypical inheritance work?</h2>
            <p className='mt-3 text-lg'>In javascript everything is Object. In Modern JavaScript Class is syntactical sugar. When you want to connect one class to another class you need to use prototypical inheritance. Suppose you have a class name SingerOne and you have another class name SingerTwo and you want to take SingerOne Class property in your SingerTwo Class. Prototypical inheritance is a way you can take one class property to your another class. You can do lots of way. like You can use call, bind property.</p>

            <h2 className='text-center text-primary text-4xl mt-4'>You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h2>
            <p className='mt-3 text-lg'>
                In order to find product by names, first you need to grab the value of search field and then you need to filter over the whole array. When filtering the array you need to check every object name property that search field value contain the name property value using includes function. Those object name property value match the search field value array filter method will return an array matched property value object.
            </p>
        </div>
    );
};

export default Blogs;