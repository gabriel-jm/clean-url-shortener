export interface DeleteUrlRegistryRepository {
  delete(id: string): Promise<void>
}
