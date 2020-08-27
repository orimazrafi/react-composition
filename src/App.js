import React, { useState } from 'react';
import './App.css';

function App() {
  // give us a way to add functionallity fairly easy to a component we have.
  // const WithBorderGenrerator=InnerComp=>props=>(
  //   <WithBorder color={props.color}>
  //     <InnerComp {...props}/>
  //   </WithBorder>
  // )
  // higher-order-components const TableWithBorder=WithBorderGenrerator(Table) 
  //you need to becareful of props collission
  return (
    <div className="App">
      {/* props.children allow us to have the same style over different content. */}
      <Button>Primary</Button>
      <ElementProp element={
        <div style={{ display: "flex" }}>
          <div>left</div>
          <div>right</div>
        </div>} />
      {/* allow us to have same logic but wrapp it in a different element each time. 
        we could use the logic of the child instead of using the logic of the parent in the case above.*/}
      <RenderProp renderProp={(count) => <span>{count}</span>} />
      <RenderProp />
      {/* could help us render our logic the way we want it. it's kind of help us with giving data,
       whatever data we want to the component. kind of like context*/}
      <CounterProvider   >
        {([count, setCount]) => (
          <>
            {count}
            <button onClick={() => setCount(count + 1)}>increment</button>
          </>
        )}
      </CounterProvider>
      {/* help us render the items different. we could use a deafultProps and override it if needed */}
      <List list={[1, 2, 3]} renderList={(item) => <li key={Math.random()}>{item}</li>} />
      <List list={[1, 2, 3]} renderList={(item) => <li key={Math.random()}> <strong>{item}</strong></li>} />
    </div>
  );
}
const Button = props => <button style={{ background: "blue", padding: "0.5rem 2rem", color: "white" }}>{props.children}</button>
const ElementProp = props => {
  return <>{props.element}</>
}
const RenderProp = props => {
  const count = 2

  return <>{props.renderProp(count)}</>
}
// allow us to have a default case. if we don't pass any prop
RenderProp.defaultProps = {
  renderProp: (count) => <b>{count}</b>
}
const CounterProvider = props => {
  const count = useState(0)
  return props.children(count)
}
const List = props => {
  return <ul>
    {props.list.map(props.renderList)}
  </ul>
}

export default App;
