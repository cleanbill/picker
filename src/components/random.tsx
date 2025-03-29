import { useLocalStorage } from "usehooks-ts";
import type { Chore } from "../types";
import { useState } from "react";

const CrudTable = () => {

    const id: string = crypto.randomUUID();
    const [chores, setChores] = useLocalStorage("chores", [{ id, name: 'vacuum', cost: 2, time: 30 }]);
    const [chore, setChore] = useState(chores[Math.floor(Math.random() * chores.length)]);



    const picked = () => {
        console.log("picked");
    }

    return (
        <>

            (<div onClick={() => picked()} className={"border rounded-4xl bg-amber-400 p-3 text-center m-5 w-fit"}>
                <div className="grid grid-cols-[0fr_3fr] gap-3" >
                    <div className="text-7xl pt-3 text-left">Name:</div>
                    <input disabled={true} className="text-7xl w-200 pb-2 text-amber-700 rounded-2xl p-1" defaultValue={chore.name}></input>
                </div >
                <div className="grid grid-cols-[0fr_1fr_0fr_1fr_1fr] gap-2" key={chore.id}>
                    <div className="text-7xl pt-3 text-left">Time:</div>
                    <input disabled={true} className="text-7xl w-50 text-amber-700 rounded-2xl p-1 pl-2" defaultValue={chore.time}></input>
                    <div className="text-7xl pt-3 text-left">Cost:</div>
                    <input disabled={true} className="text-7xl w-50 text-amber-700 rounded-2xl p-1 pl-2" defaultValue={chore.cost}></input>
                </div >
            </div >)

        </>)
}



export default CrudTable;