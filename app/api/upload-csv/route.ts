import { db, Medication } from "@/lib/data/db";
import { NextRequest, NextResponse } from "next/server";

type ProcessingResponse = {
  count: number,
  invalid: {
    medication: Medication,
    reason: string
  }[]
}

export async function POST(req: NextRequest) {
  const isValid = (med: Medication): boolean => {
    if (med.stock < 4) return false
    // NOTE: price in cents!
    if (med.price > 50000) return false
    return true
  }

  const csv: string = await req.json()

  const meds = csv
    .split("\n")
    .slice(1)

  let count = 0
  const response: ProcessingResponse = {
    count: 0,
    invalid: []
  };

  meds.forEach(m => {
    const entries = m.split(";")
    console.log(entries)
    const newMed: Medication = {
      name: entries[0],
      ean: entries[1],
      stock: Number(entries[2]),
      price: Number(entries[3]) * 100,
    }

    try {
      const created = db.create(newMed)
      const valid = isValid(created)
      if (!valid) throw Error("Medicamento suspeito")
      count++
    } catch (e: any) {
      response.invalid.push({ medication: newMed, reason: `${e.message}` })
    }
  })

  response.count = count

  return NextResponse.json({ data: response }, { status: 200 })
}
