import React from "react";
import { useParams } from "react-router";
import authSvc from "service/auth.service";
import { ICredential, LoginResponse } from "types/auth.type";
import { GetDetailPayload } from "types/shared/get-detail.type";

const Profile: React.FC = () => {
    const [me, setMe] = React.useState<ICredential>({ email: "", username: "" });
    const [error, setError] = React.useState<Error | null>(null);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response: any = await authSvc.me();

                const _error = response?.error;
                const { data } = response?.response;
                setMe((prev: ICredential) => (prev = data));

                if (!!_error) throw new Error(_error.message);
            } catch (error: any) {
                setError((prev) => (prev = error.message));
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    console.log("me", me);

    return (
        <div>
            <p>{error?.message}</p>
        </div>
    );
};
export default Profile;
