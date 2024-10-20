import { Envelope, Lock } from "@gravity-ui/icons";
import { AuthButton } from "./_components/button";
import { AuthInput } from "./_components/input";

async function submitHandler(formData: FormData) {
  "use server";
  const username = formData.get("username");
  const password = formData.get("password");

  const body = JSON.stringify({ username, password });

  const res = await fetch("http://localhost:8000/v1/auth/signin", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body,
  });

  console.log({ res: res.body });

  const json = await res.json();
  // console.log({ res: res.body. });
}

const AuthPage = () => {
  return (
    <div className="bg-gradient-to-tr from-indigo-500 from-10% to-emerald-500 to-90% w-full h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl pt-40 px-32 pb-8 flex">
        <div></div>
        <div className="text-center">
          <h2 className="font-bold font-sans pb-14 text-gray-700 text-2xl">
            Member Login
          </h2>
          <form action={submitHandler} className="flex flex-col">
            <div className="flex flex-col gap-2 mb-10">
              <AuthInput
                Icon={Envelope}
                type="text"
                placeholder="Username"
                name="username"
              />
              <AuthInput
                Icon={Lock}
                type="password"
                placeholder="Password"
                name="password"
              />
            </div>
            <AuthButton>LOGIN</AuthButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
