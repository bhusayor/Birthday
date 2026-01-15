import Header from "../components/header";
import About from "@/components/about";
import Moment from "../components/moment";
import MessageWall from "@/components/message-wall";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#FCFBFA]">
            <Header />
            <About />
            <Moment />
            <MessageWall />
        </main>
    );
}
