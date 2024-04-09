
import React, { useState } from "react";
import axios from "axios";

import s from './TrainPage.module.css'
const App = () => {
  const BASE_URL = "https://aiohub.gg";
  const [files, setFiles] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [namespace, setNamespace] = useState("General");

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("length", files.length);
    formData.append("namespace", namespace);


    files.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    });

    try {

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      setIsTraining(true);
      const response = await axios.post(
          `${BASE_URL}/v2/upload_documents`,
          formData
      );
      if (response.data.status === "success") {
        alert("Training completed");
      } else {
        alert("there was an error");
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTraining(false);
    }
  };



  return (
      <div className={s.container}>
        <form onSubmit={handleUpload} className={s.train} >
          <label htmlFor="file-upload" className={s.file_upload}>
            Choose File
            <i className="fa fa-upload"></i>
          </label>
          <input id="file-upload" type="file" multiple style={{ display: "none" }} onChange={handleChange} />

          <select onChange={(e) => setNamespace(e.target.value)}>
            <option>General</option>
            <option>Aetna</option>
            <option>Cigna</option>
            <option>Humana</option>
            <option>Medicare</option>
            <option>BCBS/California</option>
            <option>BCBS/Colorado</option>
            <option>BCBS/Connecticut</option>
            <option>BCBS/Georgia</option>
            <option>BCBS/Illinois</option>
            <option>BCBS/Indiana</option>
            <option>BCBS/Kentucky</option>
            <option>BCBS/Maine</option>
            <option>BCBS/Massachusetts</option>
            <option>BCBS/Missouri</option>
            <option>BCBS/Nevada</option>
            <option>BCBS/NewYork</option>
            <option>BCBS/Ohio</option>
            <option>BCBS/Virginia</option>
            <option>BCBS/Wisconsin</option>
          </select>
          <button type="submit" disabled={isTraining} className={s.btn}>
            {isTraining ? "Training in progress..." : "Train"}
          </button>
        </form>
        {isTraining && <p>Training in progress. Please wait ...</p>}
      </div>
  );
};

export default App;
