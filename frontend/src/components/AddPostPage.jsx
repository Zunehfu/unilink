import React from "react";

export default function AddPostPage({ toggleAddPostVisibility }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
            <div className="rounded-lg w-[400px] bg-slate-300 p-4 ">
                <label htmlFor="yo">What do you have in your mind?</label>
                <i
                    onClick={toggleAddPostVisibility}
                    className="fa-solid fa-xmark relative left-[130px] top-[-10px] cursor-pointer hover:text-green-500"
                ></i>
                <br />
                <textarea className="rounded-lg  resize-none w-full h-60 p-2"></textarea>
                <br />
                <div>Wanna express freely?</div>
                <label htmlFor="hideme">Hide me </label>
                <input type="checkbox" id="hideme" />
                <br />
                <br />
                <div>Choose people that you wanna share with...</div>
                <input type="radio" id="option1" name="options" value="0" />
                <label htmlFor="option1">Share with everyone</label> <br />
                <input type="radio" id="option2" name="options" value="1" />
                <label htmlFor="option2">
                    Share with others from your university
                </label>
                <br />
                <input type="radio" id="option3" name="options" value="2" />
                <label htmlFor="option3">Share with friends</label> <br />
                <input type="radio" id="option4" name="options" value="3" />
                <label htmlFor="option4">
                    Share with friends from your university
                </label>
                <br />
                <button className="bg-green-300 w-20 h-8">Share</button>
            </div>
        </div>
    );
}
