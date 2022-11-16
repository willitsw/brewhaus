import React from "react";

const Lot = (props: any) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      gap: 20,
      alignItems: "center",
      margin: 20,
    }}
  >
    <div style={{ width: 150, color: "#e05353" }}>
      <b>Lot {props.number}:</b>
    </div>
    <div style={{ width: 960 }}>
      <b>{props.heading}</b>
      <br />
      {props.text}
    </div>
  </div>
);

export default Lot;
