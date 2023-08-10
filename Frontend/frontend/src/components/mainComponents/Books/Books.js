import React from 'react'
import Table from '../../CustomTable/Table'

const heads = ['One', 'Tow', 'Three', 'Tow', 'Three', 'Tow', 'Three', 'Tow', 'Three']
const recs = [["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "second", "third", "second", "third", "second", "third", "second", "third"], ["first", "asd", "third", "second", "third", "second", "third", "second", "third"]]

const Books = () => {

  const deleteAct = (item) => {
    alert(item)
  }
  const updateAct = (idx) => {
    alert("updateCalled")
  }
  return (
    <div className="component-main-container">
      

      <Table headings={heads} records={recs} isAction={true} deleteAction={deleteAct} updateAction={updateAct} />
    </div>
  )
}

export default Books