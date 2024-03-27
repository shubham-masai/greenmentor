import React, { useState } from 'react';
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import { MdNavigateNext } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const Navigate = useNavigate();

    const data = [
        {
            id: 1,
            title: "Task Mastery",
            description: "Tame your to-do list effortlessly. TaskNinja is your go-to hub for organizing tasks, deadlines, and goals with finesse.",
            image: image1
        },
        {
            id: 2,
            title: "Unified Calendar",
            description: "Seamlessly blend your tasks with your schedule. A unified calendar ensures you stay on top of your commitments, no matter how busy life gets.",
            image: image2
        },
        {
            id: 3,
            title: "Smart Reminders",
            description: "Stay on track with timely reminders and nudges. Never miss an important deadline or overlook a crucial task again.",
            image: image3
        }
    ];

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === data.length - 1 ? 0 : prevSlide + 1));
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? data.length - 1 : prevSlide - 1));
    };

    const handleStart = () => {
        Navigate("/login");
    }
    return (
        <div className="flex justify-center items-center">
            <div className="max-w-[400px] text-center p-8 rounded-lg shadow-lg">
                <img src={data[currentSlide].image} alt={`Slide ${currentSlide + 1}`} className="w-48 h-auto mx-auto mb-4 rounded-md" />
                <h2 className="text-3xl font-poppins font-semibold mb-2">{data[currentSlide].title}</h2>
                <p className="text-lg">{data[currentSlide].description}</p>

                <div className="flex justify-between mt-4">
                    <button className="text-black p-2  mr-4" onClick={handlePrev}>
                        Back
                    </button>
                    {currentSlide === data.length - 1 ? (
                        <button className="bg-customLogo text-white p-1 rounded-full" onClick={handleStart}>
                            Get Started
                        </button>
                    ) : (
                        <button className="bg-customLogo text-white p-2 rounded-full" onClick={handleNext}>
                            <MdNavigateNext size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
