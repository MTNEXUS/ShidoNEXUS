import Image from "next/image";

export default function Home() {
  return (
    <div className="flex">
        <h1 className="text-4xl relative pb-4 uppercase">Hello World
        <span className="absolute bottom-2.5 left-1 w-1/4 border-b-2 border-sidebar-primary"></span>
        </h1>
    </div>
  );
}
