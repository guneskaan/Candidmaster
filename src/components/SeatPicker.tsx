// src/components/Hero.tsx
import Image from "next/image";
import { Container } from "@/components/Container";
import heroImg from "../../public/img/hero.png";
import SeatButton from "./SeatButton";

export const SeatPicker = () => {
  // Function to generate seat numbers for rows
  const generateSeatButtons = (row: string) => {
    return Array.from({ length: 10 }, (_, index) => (
      <SeatButton key={`${row}${index + 1}`} seatNumber={`${row}${index + 1}`} />
    ));
  };

  return (
    <Container className="flex flex-wrap mt-60">
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <div className="">
          <Image
            src={heroImg}
            height={0}
            width={0}
            style={{ width: "600px", height: "auto" }}
            className="object-cover"
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
        </div>
      </div>
      <div className="flex items-center w-full lg:w-1/2">
        <div className="flex flex-col gap-4"> {/* Use flex-col for vertical stacking */}
          {["A", "B", "C", "D", "E", "F", "G", "H"].map((row) => (
            <div className="flex gap-2" key={row}> {/* Ensure buttons in the same row have some space */}
              {generateSeatButtons(row)}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
