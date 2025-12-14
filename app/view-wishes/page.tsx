type wish = {
    id: number;
    name: string;
    message: string;
};

export default async function ViewWishes() {
    const response = await fetch(
        "https://sam-s-birthdayapi-production.up.railway.app/api/v1/birthday-wish"
    );
    const json = await response.json();
    const wishes: wish[] = json.data;
    return (
        <section className="pt-36 pb-10 px-4 min-h-screen xl:px-[220px] bg-[#FCFBFA]">
            <div className="container mx-auto">
                <div className="flex flex-col justify-center sm:flex-row flex-wrap gap-7">
                    {wishes.map((wish) => (
                        <div key={wish.id} className="w-[302px]">
                            <div>
                                <div className="h-[235px] drop-shadow-2xl drop-shadow-[#0000000D] px-7 py-7 flex justify-center bg-white rounded-t-2xl rounded-br-2xl custom-clip">
                                    <p className="text-black text-sm">
                                        {wish.message}
                                    </p>
                                </div>

                                <h2 className="text-black text-center">
                                    {wish.name}
                                </h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
