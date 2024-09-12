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

  const loadData = async (e: any) => {
    const file: File = e.target.files[0]
    if (!file) throw new Error("Invalid file");

    const contents = await file.text()
    if (!contents) throw new Error("Couldn't get file contents");

    try {
      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: JSON.stringify(contents)
      })

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { data } = await response.json();
      console.log(data)

      return true

    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

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
      console.log(data)
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
          Fetch Data
        </Button>
        <input onChange={loadData} accept=".csv" type="file" id="medicationCSV" />
      </div>
    </div>
  );
}
