import React, {useState} from 'react';

import { API_URL } from '../../data/ApiPath';

const AddFirm = () => {

  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
      if(category.includes(value)){
        setCategory(category.filter((item) => item !== value));
      }else{
        setCategory([...category, value]);
      }
  }

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage)
  }

  const handleRegionChange = (event) => {
    const value = event.target.value;
      if(region.includes(value)){
        setRegion(region.filter((item) => item !== value));
      }else{
        setRegion([...region, value]);
      }
  }

const handleFirmSubmit = async(e) => {
    e.preventDefault();

  try {
    const loginToken = localStorage.getItem('login');

    if(!loginToken){
      console.error("User not Authenticated");
    }
    const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file)

      category.forEach((value) => {
        formData.append('category', value);
      });

      region.forEach((value)=>{
        formData.append('region', value);
      });

      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method: 'POST',
        headers: {
          'token': `${loginToken}`
        },
        body: formData
      });
      const data = await response.json();
      if(response.ok){
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile("");  
        alert("Firm Added Successfully")
      }else if(data.message === "vendor can have only one firm"){
        alert("Firm exists 🍚 only 1 Firm can be added")
      }
      else{
        alert('Failed to add Firm')
      }
      console.log("this is the firmid", data.firmId)

      const mango = data.firmId;

      localStorage.setItem('firmId', mango);

  } catch (error) {
    console.error("failed to add firm")
  }
  }

  return (
    <div className="firmSection" onSubmit={handleFirmSubmit}>
      <h3>Add New Firm</h3>
      <form className="tableForm">
        <div className="formGroup">
          <label>Firm Name</label>
          <input type="text" name='firmName' placeholder="Enter firm name" value={firmName} onChange={(e) => setFirmName(e.target.value)} />
        </div>
        <div className="formGroup">
          <label>Area</label>
          <input type="text" name='area' placeholder="Enter area" value={area} onChange={(e) => setArea(e.target.value)}/>
        </div>
        <div className="formGroup">
          <label>Category</label>
          <div className="checkInp">
            <div className="checkboxContainer">
              <label>
                <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange}/>
                Veg
              </label>
              <label>
                <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange} />
                Non-Veg
              </label>
            </div>
          </div>
        </div>
        <div className="formGroup">
          <label>Region</label>
          <div className="checkInp">
            <div className="checkboxContainer">
              <label>
                <input type="checkbox" checked={region.includes('south-indian')} value="south-indian" onChange={handleRegionChange} />
                South
              </label>
            </div>
            <div className="checkboxContainer">
              <label>
                <input type="checkbox" checked={region.includes('north-indian')} value="north-indian" onChange={handleRegionChange} />
                North
              </label>
            </div>
            <div className="checkboxContainer">
              <label>
                <input type="checkbox" checked={region.includes('chinese')} value="chinese" onChange={handleRegionChange} />
                Chinese
              </label>
            </div>
            <div className="checkboxContainer">
              <label>
                <input type="checkbox" checked={region.includes('bakery')} value="bakery" onChange={handleRegionChange} />
                Bakery
              </label>
            </div>
          </div>
        </div>
        <div className="formGroup">
          <label>Offer</label>
          <input type="text" placeholder="Enter offer" value={offer} onChange={(e) => setOffer(e.target.value)}/>
        </div>
        <div className="formGroup">
          <label>Firm Image</label>
          <input type="file" onChange={handleImageUpload} />
        </div>
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
