"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  GetMedicationResponse,
  PostMedicationRequest,
} from "@/app/api/medication/route";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState<GetMedicationResponse | null>(null);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/medication");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { data } = await response.json();
      setData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const createMedication = async () => {
    try {
      const payload: PostMedicationRequest = {
        medication: {
          name: "Paracetamol",
          ean: "123456789",
          stock: 100,
          price: 199,
        },
      };

      const response = await fetch("/api/medication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { data } = await response.json();
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <div>
      <Button onClick={() => router.push("/csv")} variant="link">
        csv
      </Button>
      {data?.medication.map((med) => (
        <div key={med.id}>
          <h2>{med.name}</h2>
          <p>{med.ean}</p>
          <p>{med.stock}</p>
          <p>{med.price}</p>
        </div>
      ))}

      <div className="flex gap-2">
        <Button onClick={createMedication} variant="default">
          New Mock
        </Button>
        <Button onClick={fetchData} variant="secondary">
          Load Data
        </Button>
      </div>
    </div>
  );
}
