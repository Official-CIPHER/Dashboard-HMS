import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://hospital-management-system-da7n.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchDoctors();
  }, []);

  // function that delete the doctor
  // Delete a doctor
  const deleteDoctor = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://hospital-management-system-da7n.onrender.com/api/v1/user/doctor/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setDoctors(doctors.filter((doc) => doc._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete doctor");
    }
  };

  // Handle delete button click
  const handleDelete = (id) => {
    // console.log(`Attempting to delete doctor with ID: ${id}`);
    deleteDoctor(id);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="page doctors">
        <h1>DOCTORS</h1>
        <div className="banner">
          {doctors && doctors.length > 0 ? (
            doctors.map((element, index) => {
              return (
                <div className="card" key={index}>
                  <img
                    src={element.docAvatar && element.docAvatar.url}
                    alt="Doctor Avatar"
                  />
                  <h4>{`${element.firstName} ${element.lastName}`}</h4>
                  <div className="details">
                    <p>
                      Email: <span>{element.email}</span>
                    </p>
                    <p>
                      Phone: <span>{element.phone}</span>
                    </p>
                    <p>
                      DOB: <span>{element.dob.substring(0, 10)}</span>
                    </p>
                    <p>
                      Department: <span>{element.doctorDepartment}</span>
                    </p>
                    <p>
                      NIC: <span>{element.nic}</span>
                    </p>
                    <p>
                      Gender: <span>{element.gender}</span>
                    </p>
                  </div>
                  {/* <FaTrash
                    className="delete-icon"
                    onClick={() => handleDelete(element._id)}
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "24px",
                    }}
                  /> */}
                </div>
              );
            })
          ) : (
            <h1>No Register Doctors Found !</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
