
export default function PersonForm({addPerson, newName, handleChange, newNumber, handleNumberChange}) {
    return (
        <form onSubmit={addPerson}>
            <div>
            name: <input value={newName} onChange={handleChange}/>
            </div>
            <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
            <button type="submit" >add</button>
            </div>
        </form>
    )
}