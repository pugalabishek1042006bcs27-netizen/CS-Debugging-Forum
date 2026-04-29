import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    age: '',
    course: '',
    gender: '',
    skills: [],
    address: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const updatedSkills = checked 
        ? [...formData.skills, value] 
        : formData.skills.filter(skill => skill !== value);
      setFormData({ ...formData, skills: updatedSkills });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
    // Redirect to success page
    navigate('/success');
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <label>Student Name: 
          <input type="text" name="studentName" onChange={handleChange} required style={{ width: '100%' }} />
        </label>

        <label>Email: 
          <input type="email" name="email" onChange={handleChange} required style={{ width: '100%' }} />
        </label>

        <label>Age: 
          <input type="number" name="age" onChange={handleChange} required style={{ width: '100%' }} />
        </label>

        <label>Course: 
          <select name="course" onChange={handleChange} required style={{ width: '100%' }}>
            <option value="">--Select Course--</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics">Electronics</option>
          </select>
        </label>

        <div>
          <label>Gender: </label>
          <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
        </div>

        <div>
          <label>Skills: </label>
          <input type="checkbox" name="skills" value="Java" onChange={handleChange} /> Java
          <input type="checkbox" name="skills" value="Python" onChange={handleChange} /> Python
          <input type="checkbox" name="skills" value="React" onChange={handleChange} /> React
        </div>

        <label>Address: 
          <textarea name="address" onChange={handleChange} required style={{ width: '100%', height: '80px' }} />
        </label>

        <button type="submit" style={{ padding: '10px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default Registration;