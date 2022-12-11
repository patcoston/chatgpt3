import React from 'react'

const App: React.FC = () => {
  const [dots, setDots] = React.useState<{ x: number; y: number }[]>([])
  const [undoStack, setUndoStack] = React.useState<{ x: number; y: number }[]>(
    [],
  )

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // get the coordinates of the click
    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    // create a new dot at the click position
    const dot = {
      x,
      y,
    }

    // add the new dot to the list of dots
    setDots([...dots, dot])
  }

  const handleUndo = () => {
    // remove the last dot from the list of dots
    const newDots = dots.slice(0, -1)

    // add the removed dot to the undo stack
    setUndoStack([...undoStack, dots[dots.length - 1]])

    // update the list of dots
    setDots(newDots)
  }

  const handleRedo = () => {
    // get the last dot from the undo stack
    const dot = undoStack[undoStack.length - 1]

    // remove the dot from the undo stack
    const newUndoStack = undoStack.slice(0, -1)

    // add the dot back to the list of dots
    setDots([...dots, dot])

    // update the undo stack
    setUndoStack(newUndoStack)
  }

  return (
    <div>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
      <div
        style={{ position: 'relative', width: 500, height: 500 }}
        onClick={handleClick}
      >
        {dots.map((dot, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: dot.x - 5,
              top: dot.y - 5,
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: 'black',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default App
