import { useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";

export default function Login({ status, canResetPassword }) {
    const { translations } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => reset("password");
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title={translations.messages.auth.login} />

            <div className="max-w-md w-full p-8">
                {/* Título */}
                <h1 className="text-3xl font-bold text-white mb-6">
                    {translations.messages.auth.login}
                </h1>

                {status && <div className="mb-4 text-sm text-green-500">{status}</div>}

                {/* Formulario */}
                <form onSubmit={submit} className="space-y-4">
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
                            isFocused
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
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
                            autoComplete="current-password"
                            onChange={(e) => setData("password", e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Remember Me y Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-gray-300">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData("remember", e.target.checked)}
                            />
                            <span className="ml-2 text-sm">{translations.messages.auth.remember}</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-blue-400 hover:underline"
                            >
                                {translations.messages.auth.forgot}
                            </Link>
                        )}
                    </div>

                    {/* Botón de Login */}
                    <PrimaryButton
                        className="w-full text-lg px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition duration-300"
                        disabled={processing}
                    >
                        {translations.messages.auth.login}
                    </PrimaryButton>
                </form>

                {/* Registro */}
                <p className="text-center text-sm text-gray-400 mt-6">
                    {translations.messages.auth.no_account}{" "}
                    <Link
                        href={route("register")}
                        className="text-blue-500 hover:underline"
                    >
                        {translations.messages.auth.create_here}
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}