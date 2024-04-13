import React,{ useEffect,useState } from 'react';
import { useLocation, useNavigate, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './LoginPage.css';
import img from "./img1.jpg";
const Login = () => {  

  const [vehicles, setVehicles] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace this URL with your actual API endpoint
    const apiUrl = 'http://10.1.98.143:3000/api/tow/tows/getlocation';
    try {
      const response = await axios.post(apiUrl, { vehicles });
      const data = response.data;
      console.log(data);
      if (data) {
        navigate('/tracking', { state: { data: data } });
      } else {
        setError('Invalid number plate. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred. Please try again later.');
    }
  };
  
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-8 col-xl-7">
          <div className="card login-card">
            <div className="row g-0">
              <div className="col-md-6">
                <img src={img} alt="Vehicle" className="img-fluid rounded-start" />
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div className="card-body">
                  <h1 className="card-title text-center mb-4">Vehicle Tracking System</h1>
                  <p className="text-center mb-5">Welcome Back! Please enter your vehicle's number plate to track your towed vehicle</p>
                  {/* <form>
                    <div className="form-group mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Vehicle Number Plate"
                        value={vehicles}
                        onChange={e => setvehicles(e.target.value)}
                        required
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <Link to="/tracking">
                      <button type="submit" className="btn btn-primary btn-block">Let's Track Your Vehicle</button>
                      </Link>
                    </div>
                  </form> */}
                   <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Vehicle Number Plate"
                        value={vehicles}
                        onChange={e => setVehicles(e.target.value)}
                        required
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary btn-block">Let's Track Your Vehicle</button>
                    </div>
                    {error && <div className="text-danger text-center mt-3">{error}</div>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;