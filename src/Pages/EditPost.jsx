import React, { useState} from 'react';
import { useParams} from "react-router-dom";

const EditPost = () => {
  const { postId } = useParams();
  const [image, setImage] = useState("https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80");
  const oldImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
  const [title, setTitle] = useState("non mauris quis, finibus impedssdfsfasfjsdsakfds sfas fsadfndsak ndsf sla bdsf nlskdnf lskdnf sldf d")
  const [description, setDescription] = useState("eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in, ursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.\n" +
    "\n" +
    "eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in, ursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.\n" +
    "\n" +
    "eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in, ursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.\n" +
    "\n" +
    "eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in, ursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.\n" +
    "\n" +
    "eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in, ursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.\n" +
    "\n" +
    "eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in, ursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.")

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);

    console.log(image, title, description);
    console.log(formData);
  }

  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10">
      <div className="w-xl dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg">
        <h2 className="w-full text-2xl pl-4 mt-2 font-semibold font-['Comic Relief'] mb-8">
          EDIT POST
        </h2>
        {/* Image Upload */}
        <input type="file" className="hidden" id="imageInpute" onChange={(e) => setImage(e.target.files[0])} />
        <label htmlFor="imageInpute" className="cursor-pointer w-[30%] p-4 mb-2 bg-blue-600 rounded-lg" >Change Image</label>

        {/* Image Display */}
        {/* Making this image if this is not url then convort to url */}
        <div className="w-[95%] h-auto flex justify-center items-center">
          <img src={image !== oldImage ? URL.createObjectURL(image) : oldImage} alt="Uploaded Image" className="w-full h-68 object-cover mt-6 rounded-lg" />
        </div>

        {/* Title Text Area */}
        <textarea className="w-full border-1 text-xl px-2 h-auto resize-none pt-2 mt-6 rounded-lg outline-none " maxLength="100" placeholder="Tille" id="title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>

        {/* Description Text Area */}
        <textarea className="w-full border-1 text-xl px-2 h-[60vh] resize-none pt-2 mt-2 rounded-lg outline-none " placeholder="Description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

        <button className="w-[50%] bg-green-300 justify-center flex items-center mx-auto py-2 text-black text-xl mt-2 cursor-pointer hover:bg-green-400 rounded-lg" onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
};

export default EditPost;