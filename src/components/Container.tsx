import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container(props: Readonly<ContainerProps>) {
  return (
    <div
      className={`container mx-auto xl:px-0 ${
        props.className ? props.className : ""
      }`}
      style={{ padding: '2rem', /* or any padding value you prefer */ }}
    >
      {props.children}
    </div>
  );
}
