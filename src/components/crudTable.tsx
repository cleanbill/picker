import { useLocalStorage } from "usehooks-ts";
import type { Chore } from "../types";
import { useState } from "react";

const CrudTable = () => {

    const [choreIndexEdit, setChoreIndexEdit] = useState(-1);

    const id: string = crypto.randomUUID();

    const [chores, setChores] = useLocalStorage("chores", [{ id, name: 'vacuum', cost: 2, time: 30 }]);

    const changedName = (i: React.ChangeEvent<HTMLInputElement>, index: number) => changed(i, index, 'name');
    const changedCost = (i: React.ChangeEvent<HTMLInputElement>, index: number) => changed(i, index, 'cost');
    const changedTime = (i: React.ChangeEvent<HTMLInputElement>, index: number) => changed(i, index, 'time');

    const changed = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>, index: number, key: 'name' | 'cost' | 'time') => {
        const newChores = chores.map((chore: Chore, i: number) => {
            if (index != i) {
                return chore;
            }
            if (key == 'name') {
                chore.name = value;
            } else if (key == 'time') {
                chore.time = parseInt(value);
            } else if (key == 'cost') {
                chore.cost = parseInt(value);
            }
            return chore;
        });
        setChores([...newChores]);
    }

    const add = () => {
        const newChore = { id: crypto.randomUUID(), name: '', cost: 0, time: 0 };
        setChores([...chores, newChore]);
        setChoreIndexEdit(chores.length);
    }

    const remove = (chore: Chore) => {
        const newChores = chores.filter((c: Chore) => c.id != chore.id);
        setChores([...newChores]);
    }

    return (
        <>

            {chores.map((chore: Chore, index: number) =>
            (<div onClick={() => setChoreIndexEdit(index)} className={choreIndexEdit == index ? "border-4 rounded-4xl bg-amber-100 p-3 text-center m-5" : "border rounded-4xl bg-amber-400 p-3 text-center m-5"}>
                <div className="grid grid-cols-[0fr_3fr] gap-3" key={chore.id}>
                    <div className="text-3xl pt-1 text-left">Name:</div>
                    <input autoFocus={choreIndexEdit == index} onChange={(i: React.ChangeEvent<HTMLInputElement>) => changedName(i, index)} className="text-3xl w-240 pb-2 text-amber-700 rounded-2xl p-1 pl-3" defaultValue={chore.name}></input>
                </div >
                <div className="grid grid-cols-[0fr_1fr_0fr_1fr_1fr] gap-2" key={chore.id}>
                    <div className="text-3xl pt-1 text-left">Time:</div>
                    <input disabled={choreIndexEdit != index} onChange={(i: React.ChangeEvent<HTMLInputElement>) => changedTime(i, index)} className="text-3xl w-50 text-amber-700 rounded-2xl p-1 pl-3" defaultValue={chore.time}></input>
                    <div className="text-3xl pt-1 text-left">Cost:</div>
                    <input disabled={choreIndexEdit != index} onChange={(i: React.ChangeEvent<HTMLInputElement>) => changedCost(i, index)} className="text-3xl w-50 text-amber-700 rounded-2xl p-1 pl-3" defaultValue={chore.cost}></input>
                    <button onClick={() => remove(chore)} className="border-2 ml-64 text-2xl w-10 rounded-4xl hover:bg-amber-300 bg-amber-400 text-center m-1">-</button>
                </div >
            </div >)
            )}
            <button onClick={add} className="border-2 hover:bg-amber-300 text-5xl w-20 float-end rounded-4xl bg-amber-400 p-3 text-center m-5">+</button>
        </>)
}



export default CrudTable;