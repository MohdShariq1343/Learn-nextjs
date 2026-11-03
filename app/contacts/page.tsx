"use client";
export interface Data {
    name: string;
    email: string;
    message: string;
}
// const handleData = (formData: Data) => {
//     const { name, email, message } =  Object.fromEntries(formData.entries());
//     console.log(name, email, message);
// }
export default function Contactpage() {

    return (
        <div>
            <div className="container my-4">
                {/* <form action={handleData}> */}
                <form action="">
                    <div className="mb-3 row justify-content-center">
                        <div className="col-6">
                            <div className="card p-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Name"
                                />
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Name"
                                />
                                <textarea name="message" placeholder="write your message..">

                                </textarea>

                                <div className="mt-3">
                                    <button type="submit" className="btn btn-primary">
                                        Action
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                </form>
            </div>

        </div>

    )
}
