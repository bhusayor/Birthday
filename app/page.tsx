import Header from "../components/header";
import Moment from "../components/moment";
import MessageWall from "@/components/message-wall";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#FCFBFA]">
            <Header />
            <Moment />
            <MessageWall />
        </main>
    );
}
