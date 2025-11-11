// src/components/Auth/RegisterForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { registerUser } from "../../services/auth"; // ajusta la ruta según tu estructura

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccess(false);

    try {
      const response = await registerUser(form);
      console.log("✅ Registro exitoso:", response);
      setSuccess(true);
    } catch (err) {
      setError("No se pudo registrar el usuario. Verifica los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-3xl font-bold mb-2 text-black">¡Comienza ahora!</h1>

      <div>
        <label className="block text-gray-700">Usuario</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Digita tu nombre y apellidos"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Digita tu correo electrónico"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Digita tu contraseña"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition disabled:bg-gray-400"
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && <p className="text-green-600 text-center">¡Registro exitoso!</p>}

      <p className="text-sm text-center mt-2 text-black">
        Ya tengo cuenta{" "}
        <a href="/login" className="text-purple-600 font-medium">
          iniciar sesión
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
