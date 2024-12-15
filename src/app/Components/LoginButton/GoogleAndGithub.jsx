import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const GoogleAndGithub = () => {

    const { data: session, status, update } = useSession();
    const router = useRouter();

    const handleSocialLogin = async (provider) => {
        const response = await signIn(provider, { redirect: false });
        await update();
        toast.success('Successfully logged in. Enjoy your session!');
        router.push('/');

        // if (response?.ok) {

        // } else {
        //     toast.error('Login failed. Please try again.');
        // }
    };

    return (
        <div>
            {/* Google Sign-Up Button */}
            <button
                onClick={() => handleSocialLogin("google")}
                className="flex items-center justify-center w-full border rounded-md py-2 mb-4 text-gray-700 hover:bg-gray-100 transition duration-150">
                <FcGoogle className="w-5 h-5 mr-2" />
                <span className="text-sm sm:text-base">Continue with Google</span>
            </button>

            {/* GitHub Sign-Up Button */}
            {/* <button
                onClick={() => handleSocialLogin("github")}
                className="flex items-center justify-center w-full border rounded-md py-2 mb-4 text-gray-700 hover:bg-gray-100 transition duration-150">
                <FaGithub className="w-5 h-5 mr-2 text-black" />
                <span className="text-sm sm:text-base">Continue with GitHub</span>
            </button> */}
        </div>
    );
};

export default GoogleAndGithub;