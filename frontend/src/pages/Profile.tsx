import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile, createProfile, updateProfile } from "../api/profile";
import { getMe } from "../api/auth";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    about: "",
  });

  const [email, setEmail] = useState("");
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((res) => {
        setEmail(res.data.email);
      })
      .catch(() => {
        // token invalid, logout will happen elsewhere
      });
    getProfile()
      .then((res) => {
        setProfile({
          name: res.data.name || "",
          age: res.data.age || "",
          gender: res.data.gender || "",
          phone: res.data.phone || "",
          city: res.data.city || "",
          state: res.data.state || "",
          country: res.data.country || "",
          about: res.data.about || "",
        });
        setEmail(res.data.email);
        setExists(true);
      })
      .catch(() => setExists(false))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: any) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      exists ? await updateProfile(profile) : await createProfile(profile);

      alert("Profile saved successfully");
    } catch {
      alert("Failed to save profile");
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <>
      <Navbar role="USER" />

      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-6 text-2xl font-bold text-blue-900">Your Profile</h1>

        <div className="rounded-2xl bg-white p-6 shadow-md space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Email (read only) */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              value={email}
              disabled
              className="mt-1 w-full rounded-xl border bg-gray-100 px-4 py-3 text-sm text-gray-600"
            />
          </div>

          {/* Age */}
          <div>
            <label className="text-sm text-gray-600">Age</label>
            <input
              name="age"
              type="number"
              value={profile.age}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm text-gray-600">Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-600 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
              <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600">City</label>
              <input
                name="city"
                value={profile.city}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">State</label>
              <input
                name="state"
                value={profile.state}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Country</label>
              <input
                name="country"
                value={profile.country}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* About */}
          <div>
            <label className="text-sm text-gray-600">About You</label>
            <textarea
              name="about"
              rows={4}
              value={profile.about}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-600 focus:outline-none"
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3 font-semibold text-white hover:opacity-95"
          >
            {exists ? "Update Profile" : "Complete Profile"}
          </button>
        </div>
      </div>
    </>
  );
}
