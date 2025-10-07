import React, { useState, ChangeEvent, FormEvent } from "react";

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<LoginFormData>({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Credenciales:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-3xl font-bold mb-2 text-black">¡Bienvenido de vuelta!</h1>

      {/* Usuario */}
      <div>
        <label className="block text-gray-700">Usuario</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Digita tu nombre y apellidos"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
        />
      </div>

      {/* Contraseña */}
      <div>
        <label className="block text-gray-700">Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Digita tu contraseña"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
        />
      </div>

      {/* Recordarme / Olvidar contraseña */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-black">
        
          <a href="/reset-password" >¿Has olvidado tu contraseña?</a>
        </label>
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        Iniciar sesión
      </button>

      <p className="text-sm text-center mt-2 text-black">
        No tengo cuenta{" "}
        <a href="/register" className="text-purple-600 font-medium">
          Registrarme
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
