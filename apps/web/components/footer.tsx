export default function Footer() {
    return (
        <section className="py-10 md:py-20 px-4 xl:px-55 bg-[#FCFBFA]">
            <div className="container mx-auto">
                <div className="border-t border-[#EAE7E7]">
                    <h1 className="text-center font-outfit font-medium text-lg pt-10 text-black md:text-2xl">
                        © <span>{new Date().getFullYear()}</span> Celebrating
                        Omidiji Oluwadare Samuel
                    </h1>
                    <p className="text-black font-outfit font-light mt-4 text-lg md:text-xl text-center">
                        Designed with ❤️ for Samuel
                    </p>
                </div>
            </div>
        </section>
    );
}
