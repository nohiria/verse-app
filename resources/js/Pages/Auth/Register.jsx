import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => reset("password", "password_confirmation");
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Registro" />

            <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-lg">
                {/* Título */}
                <h1 className="text-3xl font-bold text-white mb-6">
                    Crear cuenta
                </h1>

                {/* Formulario */}
                <form onSubmit={submit} className="space-y-4">
                    {/* Nombre */}
                    <div>
                        <InputLabel
                            htmlFor="name"
                            value="Nombre"
                            className="text-gray-300"
                        />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                            autoComplete="name"
                            isFocused
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Correo Electrónico"
                            className="text-gray-300"
                        />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Contraseña"
                            className="text-gray-300"
                        />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                            autoComplete="new-password"
                            onChange={(e) => setData("password", e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Confirmar Password */}
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirmar Contraseña"
                            className="text-gray-300"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    {/* Botón de registro */}
                    <PrimaryButton
                        className="w-full text-lg px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition duration-300"
                        disabled={processing}
                    >
                        Registrarse
                    </PrimaryButton>
                </form>

                {/* Iniciar sesión */}
                <p className="text-center text-sm text-gray-400 mt-6">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                        href="/login"
                        className="text-blue-500 hover:underline"
                    >
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}