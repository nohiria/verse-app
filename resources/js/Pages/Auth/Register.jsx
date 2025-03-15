import { useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Register() {
    const { translations } = usePage().props;
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
            <Head title={translations.messages.auth.register} />

            <div className="max-w-md w-full p-8">
                {/* Título */}
                <h1 className="text-3xl font-bold text-white mb-6">
                    {translations.messages.auth.register}
                </h1>

                {/* Formulario */}
                <form onSubmit={submit} className="space-y-4">
                    {/* Nombre */}
                    <div>
                        <InputLabel
                            htmlFor="name"
                            value={translations.messages.auth.name}
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
                            value={translations.messages.auth.email}
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

                    {/* Contraseña */}
                    <div>
                        <InputLabel
                            htmlFor="password"
                            value={translations.messages.auth.password}
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

                    {/* Confirmar Contraseña */}
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value={translations.messages.auth.confirm_password}
                            className="text-gray-300"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2"
                            autoComplete="new-password"
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    {/* Botón de Registro */}
                    <PrimaryButton
                        className="w-full text-lg px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition duration-300"
                        disabled={processing}
                    >
                        {translations.messages.auth.register}
                    </PrimaryButton>
                </form>

                {/* Link a Login */}
                <p className="text-center text-sm text-gray-400 mt-6">
                    {translations.messages.auth.already_registered}{" "}
                    <Link href={route("login")} className="text-blue-500 hover:underline">
                        {translations.messages.auth.login_here}
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}