type Record<T> = T & { id: string };

export class InMemoryDb<T> {
  private data: Record<T>[] = [];

  // Create a new record
  create(record: T): Record<T> {
    const newRecord: any = { ...record, id: this.generateId() };
    const exists = this.data.find((d: any) => d.name == newRecord.name || d.ean == newRecord.ean)
    if (exists) throw Error("Medicamento duplicado")

    this.data.push(newRecord);
    return newRecord;
  }

  // Read all records
  findAll(): Record<T>[] {
    return [...this.data];
  }

  // Read a single record by ID
  findById(id: string): Record<T> | null {
    return this.data.find((record) => record.id === id) || null;
  }

  // Update a record by ID
  update(id: string, updateData: Partial<T>): Record<T> | null {
    const index = this.data.findIndex((record) => record.id === id);
    if (index === -1) return null;

    const updatedRecord = { ...this.data[index], ...updateData };
    this.data[index] = updatedRecord as Record<T>;
    return updatedRecord as Record<T>;
  }

  // Delete a record by ID
  delete(id: string): boolean {
    const index = this.data.findIndex((record) => record.id === id);
    if (index === -1) return false;

    this.data.splice(index, 1);
    return true;
  }

  // Utility method to generate unique IDs (can be replaced with uuid or similar)
  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
