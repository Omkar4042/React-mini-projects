import React from "react";

export default function StudentList() {

  const students = ["Omkar", "Kunal", "Vinay", "Kalpesh"];

  return (

    <div style={{ padding: "20px" }}>

      <h2
        style={{
          backgroundColor: "red",
          padding: "20px",
          marginBottom: "10px",
          textAlign: "center"
        }}
      >
        Student List
      </h2>

      {students.map((name, index) => {

        const backgroundColor = index % 2 === 0 ? "blue" : "orange";

        const style = {
          backgroundColor,
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid black",
          boxShadow: "2px 2px 5px black"
        };

        return (
          <div key={index} style={style}>
            {index + 1}. {name}
          </div>
        );
      })}

    </div>

  );
}