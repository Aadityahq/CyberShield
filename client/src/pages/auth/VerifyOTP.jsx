import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../services/api";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("tempEmail") || "";

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  const verify = async () => {
    if (!otp.trim()) {
      toast.error("Enter OTP");
      return;
    }

    setLoading(true);
    try {
      await API.post("/auth/verify-otp", { email, otp: otp.trim() });
      localStorage.removeItem("tempEmail");
      toast.success("Verified! You can now login");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="card w-80">
        <h2 className="text-xl mb-1 font-semibold">Verify Email</h2>
        <p className="text-xs text-gray-500 mb-4">OTP sent to {email}</p>

        <input
          className="input mb-3"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
        />

        <button className="btn btn-primary w-full" onClick={verify} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="mt-3 text-sm text-center">
          Back to{" "}
          <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}
