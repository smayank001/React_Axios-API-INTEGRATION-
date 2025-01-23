import { useEffect, useState } from "react";
import { postData } from "../api/PostApi";

export const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  // get the updated data andadd into this field

  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await postData(addData);
    console.log("res", res);

    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  //updatePostData

  const updatePostData = async () => {
    const res = await updateData(updateDataApi.id, addData);
  };

  //form submission

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          id="Add Post "
          name="body"
          placeholder="body"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};
